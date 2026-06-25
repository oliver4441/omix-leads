import { useState } from 'react';
import { Gift, Copy, MessageCircle, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

function generateCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return `OMIX-${code}`;
}

const STORE_URL = 'https://stor1-web.onrender.com';

const initialForm = { name: '', phone: '' };

export default function ReferralPage() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const code = generateCode();
      const whatsappMessage = `Hey! Shop on Omix Store and get KES 100 off with my code: ${code}. Check it out: ${STORE_URL}`;

      const { error: refError } = await supabase.from('referrals').insert({
        name: form.name,
        phone: form.phone,
        referral_code: code,
        status: 'active',
      });

      if (refError) throw refError;

      const { error: leadError } = await supabase.from('leads').insert({
        name: form.name,
        phone: form.phone,
        type: 'referral',
        source: 'referral_page',
        status: 'new',
        referral_code: code,
      });

      if (leadError) throw leadError;

      setResult({ code, whatsappMessage });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappShareUrl = result
    ? `https://wa.me/?text=${encodeURIComponent(result.whatsappMessage)}`
    : '#';

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center mx-auto mb-4">
            <Gift size={28} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Refer & Earn</h1>
          <p className="text-gray-500">Share your code and earn KES 100 for every friend who shops on Omix!</p>
        </div>

        {result ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Referral Code</h2>

            <div className="bg-gray-50 rounded-xl p-4 my-6 flex items-center justify-center gap-3">
              <span className="text-2xl font-mono font-bold text-[#ff385c] tracking-wider">{result.code}</span>
              <button onClick={handleCopy}
                className="p-2 rounded-lg hover:bg-gray-200 transition-colors text-gray-500 hover:text-gray-700"
                title="Copy code">
                {copied ? <CheckCircle size={20} className="text-green-500" /> : <Copy size={20} />}
              </button>
            </div>

            {copied && <p className="text-green-500 text-sm mb-4">Copied to clipboard!</p>}

            <p className="text-gray-500 mb-6">Share your code with friends on WhatsApp!</p>

            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-600 transition-colors"
            >
              <MessageCircle size={18} /> Share on WhatsApp
            </a>

            <div className="mt-8 pt-6 border-t text-sm text-gray-400">
              Your friend gets KES 100 off their first order. You earn KES 100 once they shop. Everybody wins! 🎉
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 space-y-4 border border-gray-100">
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

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button type="submit" disabled={loading}
              className="w-full bg-[#ff385c] text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? <><Loader2 size={18} className="animate-spin" /> Generating...</> : 'Get My Referral Code'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
