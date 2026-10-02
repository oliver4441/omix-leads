import { useState } from 'react';
import { Gift, Copy, MessageCircle, CheckCircle, Loader2, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { CornerMarks } from '../components/Doodles';
import '../styles/journal-motion.css';

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
    <div className="hand-page">
      <header className="page-hero">
        <div className="content-wrap">
          <span className="sticky-tag">
            <Gift size={15} aria-hidden="true" style={{ display: 'inline', verticalAlign: '-2px' }} /> Refer and earn
          </span>
          <h1 className="hand-h1 mt-6">Share a code, earn KES 100</h1>
          <p className="hand-lead mt-5 max-w-[58ch]">
            Your friend gets KES 100 off their first order on the OMIX Store. You earn KES 100 once they shop.
            Everybody wins.
          </p>
        </div>
      </header>

      <section className="hand-section content-wrap">
        <div className="narrow-column">
          {result ? (
            <div className="card card-pad relative text-center reveal">
              <CornerMarks />
              <p className="kicker">Your referral code</p>

              <div className="referral-code mt-6">
                <span className="referral-code-value">{result.code}</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="icon-btn"
                  aria-label="Copy referral code to clipboard"
                  title="Copy code"
                >
                  {copied ? <CheckCircle size={20} aria-hidden="true" /> : <Copy size={20} aria-hidden="true" />}
                </button>
              </div>

              <p className="hand-small muted mt-3" role="status" aria-live="polite">
                {copied ? 'Copied to clipboard.' : 'Write it down, or copy it straight to WhatsApp.'}
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
                  <MessageCircle size={18} aria-hidden="true" /> Share on WhatsApp
                </a>
                <button type="button" className="btn btn-secondary" onClick={() => { setResult(null); setForm(initialForm); }}>
                  Get another code
                </button>
              </div>

              <hr className="rule-dashed mt-8" />
              <p className="muted mt-6 text-[15px]">
                Codes are tied to the phone number you gave us, so we can credit the right person.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card card-pad reveal">
              <p className="ink-soft flex items-center gap-2.5">
                <Users size={19} aria-hidden="true" className="mark-accent" />
                Two details and your code is ready.
              </p>

              <div className="field-grid mt-6">
                <div>
                  <label className="field-label" htmlFor="r-name">Your name *</label>
                  <input id="r-name" name="name" required value={form.name} onChange={handleChange} className="field" autoComplete="name" />
                </div>
                <div>
                  <label className="field-label" htmlFor="r-phone">Phone number *</label>
                  <input id="r-phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} className="field" autoComplete="tel" />
                </div>
              </div>

              {error && <p className="notice-error" role="alert">{error}</p>}

              <button type="submit" disabled={loading} className="btn btn-lg mt-7 w-full">
                {loading ? <><Loader2 size={19} className="animate-spin" aria-hidden="true" /> Generating…</> : 'Get my referral code'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
