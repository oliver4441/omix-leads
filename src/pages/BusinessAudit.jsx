import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, ArrowRight, Search, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { KENYAN_COUNTIES, BUSINESS_INDUSTRIES } from '../lib/constants';

const initialForm = {
  business_name: '',
  phone: '',
  email: '',
  county: '',
  industry: '',
  website_url: '',
};

export default function BusinessAudit() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const calculateScore = () => {
    let score = 10;
    if (form.website_url && form.website_url.trim().length > 5) score += 30;
    if (form.email) score += 10;
    if (form.county) score += 5;
    return Math.min(score, 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const score = calculateScore();
      const hasWebsite = form.website_url && form.website_url.trim().length > 5;

      const { error: auditError } = await supabase.from('business_audits').insert({
        business_name: form.business_name,
        phone: form.phone,
        email: form.email,
        county: form.county,
        industry: form.industry,
        website_url: form.website_url || null,
        score,
      });

      if (auditError) throw auditError;

      const { error: leadError } = await supabase.from('leads').insert({
        name: form.business_name,
        phone: form.phone,
        email: form.email,
        county: form.county,
        industry: form.industry,
        type: 'audit',
        source: 'business_audit',
        status: 'new',
      });

      if (leadError) throw leadError;

      setResult({ score, hasWebsite });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-6">Your Digital Presence Score</h2>
            <div className="relative w-36 h-36 mx-auto mb-8">
              <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                <circle
                  cx="60" cy="60" r="50" fill="none"
                  stroke={result.score >= 50 ? '#22c55e' : '#ff385c'}
                  strokeWidth="10"
                  strokeDasharray={`${(result.score / 100) * 314} 314`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
                {result.score}<span className="text-sm text-gray-400">/100</span>
              </span>
            </div>

            <div className="space-y-3 text-left max-w-xs mx-auto mb-8">
              {[
                { label: 'Website', pass: result.hasWebsite },
                { label: 'Google Business', pass: false },
                { label: 'Social Media', pass: false },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  {item.pass ? (
                    <CheckCircle className="text-green-500 shrink-0" size={20} />
                  ) : (
                    <XCircle className="text-red-400 shrink-0" size={20} />
                  )}
                  <span className={item.pass ? 'text-green-700' : 'text-red-600'}>{item.label}</span>
                </div>
              ))}
            </div>

            <p className="text-gray-500 mb-6">
              {result.score < 50
                ? "Your business has significant room to grow online. Let's build you a professional website!"
                : "You're off to a good start! A professional website can boost your score even higher."}
            </p>

            <Link
              to="/quote"
              className="inline-flex items-center gap-2 bg-purple-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-purple-700 transition-colors"
            >
              Get a Website Quote <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-4">
            <Search size={28} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Free Business Audit</h1>
          <p className="text-gray-500">Find out how visible your business is online — and how to improve.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 space-y-4 border border-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Name *</label>
            <input name="business_name" required value={form.business_name} onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
            <input name="phone" type="tel" required value={form.phone} onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input name="email" type="email" required value={form.email} onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">County *</label>
            <select name="county" required value={form.county} onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none bg-white">
              <option value="">Select county</option>
              {KENYAN_COUNTIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry *</label>
            <select name="industry" required value={form.industry} onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none bg-white">
              <option value="">Select industry</option>
              {BUSINESS_INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website URL (if any)</label>
            <input name="website_url" type="url" value={form.website_url} onChange={handleChange} placeholder="https://..."
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none" />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? <><Loader2 size={18} className="animate-spin" /> Running Audit...</> : 'Run Free Audit'}
          </button>
        </form>
      </div>
    </div>
  );
}
