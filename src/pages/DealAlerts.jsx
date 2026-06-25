import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Gift, Loader2, Flame, Tag } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { KENYAN_COUNTIES } from '../lib/constants';

const categories = ['Electronics', 'Clothing', 'Shoes', 'Health & Beauty', 'Home & Kitchen', 'Sports', 'Other'];

const hotDeals = [
  { name: 'Wireless Earbuds', price: 'KES 1,299', original: 'KES 3,500', discount: '63% off' },
  { name: 'Men\'s Running Shoes', price: 'KES 2,499', original: 'KES 5,000', discount: '50% off' },
  { name: 'Portable Blender', price: 'KES 1,799', original: 'KES 3,200', discount: '44% off' },
];

const initialForm = { name: '', phone: '', category: '', county: '' };

export default function DealAlerts() {
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
      const { error: alertError } = await supabase.from('deal_alerts').insert({
        name: form.name,
        phone: form.phone,
        category: form.category,
        county: form.county,
      });

      if (alertError) throw alertError;

      const { error: leadError } = await supabase.from('leads').insert({
        name: form.name,
        phone: form.phone,
        county: form.county,
        type: 'deal_alert',
        source: 'deal_alerts_page',
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
          <div className="w-14 h-14 rounded-xl bg-red-50 text-[#ff385c] flex items-center justify-center mx-auto mb-4">
            <Bell size={28} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Deal Alerts</h1>
          <p className="text-gray-500">Never miss a deal — get alerts straight to your phone.</p>
        </div>

        {success ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-50 text-green-500 flex items-center justify-center mx-auto mb-4">
              <Bell size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">You're Subscribed! 🔔</h2>
            <p className="text-gray-500 mb-6">
              You'll receive deal alerts for <strong>{form.category}</strong> in <strong>{form.county}</strong>.
            </p>
            <Link
              to="/referral"
              className="inline-flex items-center gap-2 bg-[#ff385c] text-white font-semibold px-6 py-3 rounded-full hover:bg-red-600 transition-colors"
            >
              <Gift size={18} /> Refer a Friend & Earn
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 space-y-4 border border-gray-100 max-w-lg mx-auto mb-12">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
              <input name="name" required value={form.name} onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#ff385c] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input name="phone" type="tel" required value={form.phone} onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#ff385c] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select name="category" required value={form.category} onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#ff385c] outline-none bg-white">
                <option value="">Select category</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">County *</label>
              <select name="county" required value={form.county} onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#ff385c] outline-none bg-white">
                <option value="">Select county</option>
                {KENYAN_COUNTIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button type="submit" disabled={loading}
              className="w-full bg-[#ff385c] text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? <><Loader2 size={18} className="animate-spin" /> Subscribing...</> : 'Subscribe to Deal Alerts'}
            </button>
          </form>
        )}

        {/* Hot Deals Preview */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Flame className="text-orange-500" size={24} /> Hot Deals Right Now
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {hotDeals.map((deal) => (
              <div key={deal.name} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">{deal.discount}</span>
                  <Tag size={16} className="text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{deal.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-[#ff385c]">{deal.price}</span>
                  <span className="text-sm text-gray-400 line-through">{deal.original}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
