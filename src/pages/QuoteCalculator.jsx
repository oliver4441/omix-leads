import { useState, useMemo } from 'react';
import { CheckCircle, Loader2, Calculator } from 'lucide-react';
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
      <div className="min-h-screen bg-warm py-16 animate-fade-in">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg border border-zinc-100 p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-green-50 text-green-500 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={36} />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 mb-2">Your Quote is Ready!</h2>
              <p className="text-zinc-500">Here's your estimated website cost breakdown.</p>
            </div>

            <div className="space-y-3 mb-6">
              {result.features.map((f) => (
                <div key={f.id} className="flex justify-between items-center py-2.5 border-b border-zinc-100">
                  <span className="text-zinc-700">{f.label}</span>
                  <span className="font-semibold text-zinc-900">{formatKES(f.price)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t-2 border-brand/30">
              <span className="text-lg font-bold text-zinc-900">Estimated Total</span>
              <span className="text-2xl font-bold text-brand">{formatKES(result.total)}</span>
            </div>

            <p className="text-sm text-zinc-400 mt-8 text-center">
              We'll reach out within 24 hours to discuss your project in detail.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm py-16 md:py-20 animate-fade-in">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="w-14 h-14 rounded-xl bg-brand-bg text-brand flex items-center justify-center mx-auto mb-4 shadow-sm animate-scale-in">
            <Calculator size={26} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-2">Website Quote Calculator</h1>
          <p className="text-zinc-500 max-w-md mx-auto">Pick the features you need and get an instant price estimate.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Features */}
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 md:p-8">
            <h2 className="text-lg font-semibold text-zinc-900 mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-brand-bg text-brand flex items-center justify-center text-xs font-bold">1</span>
              Select Features
            </h2>
            <div className="space-y-2.5">
              {WEBSITE_FEATURES.map((feature) => {
                const isActive = selected.includes(feature.id);
                return (
                  <button
                    key={feature.id}
                    type="button"
                    onClick={() => toggle(feature.id)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border-2 transition-all text-left ${
                      isActive ? 'border-brand bg-brand-bg' : 'border-zinc-100 hover:border-zinc-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                        isActive ? 'border-brand bg-brand' : 'border-zinc-300'
                      }`}>
                        {isActive && <CheckCircle size={11} className="text-white" />}
                      </div>
                      <span className={`text-sm font-medium ${isActive ? 'text-brand-dark' : 'text-zinc-900'}`}>{feature.label}</span>
                    </div>
                    <span className={`text-sm font-semibold ${isActive ? 'text-brand' : 'text-zinc-400'}`}>{formatKES(feature.price)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Contact + Total */}
          <div className="space-y-6">
            {/* Total Display */}
            <div className="bg-gradient-to-br from-brand to-brand-dark text-white rounded-2xl p-6 text-center card-hover">
              <p className="text-sm text-white/80 mb-1">Estimated Total</p>
              <p className="text-4xl font-extrabold">{formatKES(total)}</p>
              <p className="text-sm text-white/70 mt-1">{selected.length} feature{selected.length !== 1 ? 's' : ''} selected</p>
            </div>

            {/* Details Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 md:p-8 space-y-4">
              <h2 className="text-lg font-semibold text-zinc-900 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-brand-bg text-brand flex items-center justify-center text-xs font-bold">2</span>
                Your Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">Full Name *</label>
                  <input name="name" required value={contact.name} onChange={handleChange}
                    className="w-full border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-brand/30 focus:border-brand outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">Phone *</label>
                  <input name="phone" type="tel" required value={contact.phone} onChange={handleChange}
                    className="w-full border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-brand/30 focus:border-brand outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Email *</label>
                <input name="email" type="email" required value={contact.email} onChange={handleChange}
                  className="w-full border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-brand/30 focus:border-brand outline-none transition-all" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">County</label>
                  <select name="county" value={contact.county} onChange={handleChange}
                    className="w-full border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-brand/30 focus:border-brand outline-none transition-all bg-white">
                    <option value="">Select county</option>
                    {KENYAN_COUNTIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">Industry</label>
                  <select name="industry" value={contact.industry} onChange={handleChange}
                    className="w-full border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-brand/30 focus:border-brand outline-none transition-all bg-white">
                    <option value="">Select industry</option>
                    {BUSINESS_INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Budget Range</label>
                <select name="budget_range" value={contact.budget_range} onChange={handleChange}
                  className="w-full border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-brand/30 focus:border-brand outline-none transition-all bg-white">
                  <option value="">Select budget</option>
                  {budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-xl">{error}</p>}

              <button type="submit" disabled={loading}
                className="w-full bg-brand text-white font-semibold py-3 rounded-xl hover:bg-brand-dark active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
                {loading ? <><Loader2 size={18} className="animate-spin" /> Submitting...</> : 'Get My Quote'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
