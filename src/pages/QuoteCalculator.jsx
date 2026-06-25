import { useState, useMemo } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { WEBSITE_FEATURES, KENYAN_COUNTIES, BUSINESS_INDUSTRIES, formatKES } from '../lib/constants';

const initialContact = {
  name: '',
  phone: '',
  email: '',
  county: '',
  industry: '',
  budget_range: '',
};

const budgetRanges = ['Under KES 20,000', 'KES 20,000 – 50,000', 'KES 50,000 – 100,000', 'KES 100,000 – 200,000', 'Over KES 200,000'];

export default function QuoteCalculator() {
  const [selected, setSelected] = useState([]);
  const [contact, setContact] = useState(initialContact);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const total = useMemo(() => {
    return WEBSITE_FEATURES.filter((f) => selected.includes(f.id)).reduce((sum, f) => sum + f.price, 0);
  }, [selected]);

  const toggle = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleChange = (e) => {
    setContact((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selected.length === 0) {
      setError('Please select at least one feature.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const featuresList = WEBSITE_FEATURES.filter((f) => selected.includes(f.id));

      const { error: leadError } = await supabase.from('leads').insert({
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        county: contact.county,
        industry: contact.industry,
        type: 'web_quote',
        source: 'quote_calculator',
        status: 'new',
        features_interest: featuresList.map((f) => f.label),
        estimated_value: total,
        budget_range: contact.budget_range,
      });

      if (leadError) throw leadError;

      setResult({ features: featuresList, total });
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
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Quote is Ready!</h2>
              <p className="text-gray-500">Here's your estimated website cost breakdown.</p>
            </div>

            <div className="space-y-3 mb-6">
              {result.features.map((f) => (
                <div key={f.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">{f.label}</span>
                  <span className="font-medium text-gray-900">{formatKES(f.price)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t-2 border-purple-200">
              <span className="text-lg font-bold text-gray-900">Estimated Total</span>
              <span className="text-2xl font-bold text-purple-600">{formatKES(result.total)}</span>
            </div>

            <p className="text-sm text-gray-500 mt-6 text-center">
              We'll reach out within 24 hours to discuss your project in detail.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Website Quote Calculator</h1>
          <p className="text-gray-500">Pick the features you need and get an instant price estimate.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Features */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">Select Features</h2>
            <div className="space-y-3">
              {WEBSITE_FEATURES.map((feature) => {
                const isActive = selected.includes(feature.id);
                return (
                  <button
                    key={feature.id}
                    type="button"
                    onClick={() => toggle(feature.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left ${
                      isActive ? 'border-purple-500 bg-purple-50' : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        isActive ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
                      }`}>
                        {isActive && <CheckCircle size={12} className="text-white" />}
                      </div>
                      <span className="font-medium text-gray-900">{feature.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-purple-600">{formatKES(feature.price)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Contact + Total */}
          <div className="space-y-6">
            <div className="bg-purple-600 text-white rounded-2xl p-6 text-center">
              <p className="text-sm opacity-80 mb-1">Estimated Total</p>
              <p className="text-4xl font-extrabold">{formatKES(total)}</p>
              <p className="text-sm opacity-80 mt-1">{selected.length} feature{selected.length !== 1 ? 's' : ''} selected</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 space-y-4">
              <h2 className="text-lg font-semibold mb-2">Your Details</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input name="name" required value={contact.name} onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input name="phone" type="tel" required value={contact.phone} onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input name="email" type="email" required value={contact.email} onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">County</label>
                <select name="county" value={contact.county} onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none bg-white">
                  <option value="">Select county</option>
                  {KENYAN_COUNTIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                <select name="industry" value={contact.industry} onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none bg-white">
                  <option value="">Select industry</option>
                  {BUSINESS_INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
                <select name="budget_range" value={contact.budget_range} onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none bg-white">
                  <option value="">Select budget</option>
                  {budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button type="submit" disabled={loading}
                className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? <><Loader2 size={18} className="animate-spin" /> Submitting...</> : 'Get My Quote'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
