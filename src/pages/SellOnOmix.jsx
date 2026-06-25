import { useState } from 'react';
import { Store, TrendingUp, ShieldCheck, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { KENYAN_COUNTIES, BUSINESS_INDUSTRIES } from '../lib/constants';

const benefits = [
  { icon: Store, title: 'Easy Setup', desc: 'List your first product in minutes — no tech skills needed.' },
  { icon: TrendingUp, title: 'Grow Sales', desc: 'Reach thousands of buyers across all 47 counties.' },
  { icon: ShieldCheck, title: 'Secure Payments', desc: 'M-Pesa & card payments handled securely for you.' },
];

const initialForm = {
  business_name: '',
  owner_name: '',
  phone: '',
  email: '',
  county: '',
  industry: '',
  products_description: '',
};

export default function SellOnOmix() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: vendorError } = await supabase.from('vendor_applications').insert({
        business_name: form.business_name,
        owner_name: form.owner_name,
        phone: form.phone,
        email: form.email,
        county: form.county,
        industry: form.industry,
        products_description: form.products_description,
        status: 'pending',
      });

      if (vendorError) throw vendorError;

      const { error: leadError } = await supabase.from('leads').insert({
        name: form.business_name,
        phone: form.phone,
        email: form.email,
        county: form.county,
        industry: form.industry,
        type: 'vendor_application',
        source: 'sell_on_omix',
        status: 'new',
      });

      if (leadError) throw leadError;

      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto mb-4">
            <Store size={28} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sell on Omix</h1>
          <p className="text-gray-500">Join hundreds of Kenyan businesses selling on the Omix marketplace.</p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {benefits.map((b) => (
            <div key={b.title} className="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-100">
              <b.icon className="text-[#ff385c] mx-auto mb-3" size={28} />
              <h3 className="font-semibold text-gray-900 mb-1">{b.title}</h3>
              <p className="text-sm text-gray-500">{b.desc}</p>
            </div>
          ))}
        </div>

        {success ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted! 🎉</h2>
            <p className="text-gray-500 mb-2">We'll review your application and get back to you within 48 hours.</p>
            <p className="text-sm text-gray-400">Check your email for a confirmation.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 space-y-4 border border-gray-100 max-w-lg mx-auto">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Name *</label>
              <input name="business_name" required value={form.business_name} onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#ff385c] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name *</label>
              <input name="owner_name" required value={form.owner_name} onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#ff385c] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input name="phone" type="tel" required value={form.phone} onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#ff385c] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input name="email" type="email" required value={form.email} onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#ff385c] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">County *</label>
              <select name="county" required value={form.county} onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#ff385c] outline-none bg-white">
                <option value="">Select county</option>
                {KENYAN_COUNTIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Industry *</label>
              <select name="industry" required value={form.industry} onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#ff385c] outline-none bg-white">
                <option value="">Select industry</option>
                {BUSINESS_INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Products Description *</label>
              <textarea name="products_description" required rows={3} value={form.products_description} onChange={handleChange}
                placeholder="Briefly describe what you'd like to sell..."
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#ff385c] outline-none resize-none" />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button type="submit" disabled={loading}
              className="w-full bg-[#ff385c] text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? <><Loader2 size={18} className="animate-spin" /> Applying...</> : 'Apply to Sell'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
