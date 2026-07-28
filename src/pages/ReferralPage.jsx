import { useState } from 'react';
import { Gift, Copy, MessageCircle, CheckCircle, Loader2, Users } from 'lucide-react';
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
    <div className="min-h-screen bg-warm py-16 md:py-20 animate-fade-in">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 text-white flex items-center justify-center mx-auto mb-4 shadow-sm animate-scale-in">
            <Gift size={26} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-2">Refer & Earn</h1>
          <p className="text-zinc-500 max-w-md mx-auto">Share your code and earn KES 100 for every friend who shops on Omix!</p>
        </div>

        {result ? (
          <div className="bg-white rounded-2xl shadow-lg border border-zinc-100 p-8 md:p-10 text-center animate-scale-in">
            <div className="w-16 h-16 rounded-full bg-green-50 text-green-500 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={36} />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-2">Your Referral Code</h2>

            <div className="bg-warm rounded-xl p-4 my-6 flex items-center justify-center gap-3 border border-zinc-200">
              <span className="text-2xl font-mono font-bold text-brand tracking-wider">{result.code}</span>
              <button onClick={handleCopy}
                className="p-2 rounded-lg hover:bg-zinc-200 transition-colors text-zinc-500 hover:text-zinc-700"
                title="Copy code">
                {copied ? <CheckCircle size={20} className="text-green-500" /> : <Copy size={20} />}
              </button>
            </div>

            {copied && <p className="text-green-500 text-sm mb-4 animate-fade-in">Copied to clipboard!</p>}

            <p className="text-zinc-500 mb-6">Share your code with friends on WhatsApp!</p>

            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-green-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-600 active:scale-[0.98] transition-all shadow-sm hover:shadow-md"
            >
              <MessageCircle size={18} /> Share on WhatsApp
            </a>

            <div className="mt-8 pt-6 border-t border-zinc-100 text-sm text-zinc-400">
              Your friend gets KES 100 off their first order. You earn KES 100 once they shop. Everybody wins!
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 md:p-8 space-y-5 card-hover">
            <div className="flex items-center gap-2 mb-2">
              <Users className="text-brand" size={20} />
              <span className="text-sm text-zinc-500">Enter your details to get a personalized referral code</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">Your Name *</label>
              <input name="name" required value={form.name} onChange={handleChange}
                className="w-full border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-brand/30 focus:border-brand outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1.5">Phone Number *</label>
              <input name="phone" type="tel" required value={form.phone} onChange={handleChange}
                className="w-full border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-brand/30 focus:border-brand outline-none transition-all" />
            </div>

            {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-xl">{error}</p>}

            <button type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-brand text-white font-semibold py-3 rounded-xl hover:from-brand hover:to-brand-dark active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
              {loading ? <><Loader2 size={18} className="animate-spin" /> Generating...</> : 'Get My Referral Code'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
