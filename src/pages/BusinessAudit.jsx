import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, ArrowRight, Search, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { KENYAN_COUNTIES, BUSINESS_INDUSTRIES } from '../lib/constants';
import { CornerMarks } from '../components/Doodles';
import '../styles/journal-motion.css';

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
    const checks = [
      { label: 'Website', pass: result.hasWebsite },
      { label: 'Google Business profile', pass: false },
      { label: 'Social media presence', pass: false },
    ];
    const circumference = 2 * Math.PI * 50;

    return (
      <div className="hand-page">
        <section className="hand-section content-wrap">
          <div className="narrow-column">
            <div className="card card-pad relative text-center reveal">
              <CornerMarks />
              <p className="kicker">Audit result</p>
              <h1 className="hand-h2 mt-4">Your digital presence score</h1>

              <div className="score-dial mt-8">
                <svg viewBox="0 0 120 120" className="score-dial-ring" aria-hidden="true">
                  <circle cx="60" cy="60" r="50" className="score-dial-track" />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    className={`score-dial-value ${result.score >= 50 ? 'is-pass' : 'is-fail'}`}
                    strokeDasharray={`${(result.score / 100) * circumference} ${circumference}`}
                  />
                </svg>
                <span className="score-dial-number">
                  {result.score}
                  <span className="muted text-[18px]">/100</span>
                </span>
              </div>

              <ul className="check-list">
                {checks.map((item) => (
                  <li key={item.label} className={item.pass ? 'is-pass' : 'is-fail'}>
                    {item.pass ? <CheckCircle size={20} aria-hidden="true" /> : <XCircle size={20} aria-hidden="true" />}
                    <span>{item.label}</span>
                    <span className="sr-only">{item.pass ? '— found' : '— missing'}</span>
                  </li>
                ))}
              </ul>

              <p className="hand-lead mt-8">
                {result.score < 50
                  ? 'Your business has real room to grow online. A professional website is the fastest way to close that gap.'
                  : 'You are off to a good start. A properly built website would push this score higher still.'}
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/quote" className="btn">
                  Get a website quote <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <button type="button" className="btn btn-secondary" onClick={() => { setResult(null); setForm(initialForm); }}>
                  Audit another business
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="hand-page">
      <header className="page-hero">
        <div className="content-wrap">
          <span className="sticky-tag">
            <Search size={15} aria-hidden="true" style={{ display: 'inline', verticalAlign: '-2px' }} /> Free · no card
          </span>
          <h1 className="hand-h1 mt-6">Free business audit</h1>
          <p className="hand-lead mt-5 max-w-[58ch]">
            Find out how visible your business is online, and what to fix first. Six fields, one honest score.
          </p>
        </div>
      </header>

      <section className="hand-section content-wrap">
        <div className="narrow-column">
          <form onSubmit={handleSubmit} className="card card-pad reveal">
            <div className="field-grid">
              <div>
                <label className="field-label" htmlFor="a-business">Business name *</label>
                <input id="a-business" name="business_name" required value={form.business_name} onChange={handleChange} className="field" autoComplete="organization" />
              </div>
              <div>
                <label className="field-label" htmlFor="a-phone">Phone *</label>
                <input id="a-phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} className="field" autoComplete="tel" />
              </div>
              <div className="field-span-2">
                <label className="field-label" htmlFor="a-email">Email *</label>
                <input id="a-email" name="email" type="email" required value={form.email} onChange={handleChange} className="field" autoComplete="email" />
              </div>
              <div>
                <label className="field-label" htmlFor="a-county">County *</label>
                <select id="a-county" name="county" required value={form.county} onChange={handleChange} className="field">
                  <option value="">Select county</option>
                  {KENYAN_COUNTIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="field-label" htmlFor="a-industry">Industry *</label>
                <select id="a-industry" name="industry" required value={form.industry} onChange={handleChange} className="field">
                  <option value="">Select industry</option>
                  {BUSINESS_INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div className="field-span-2">
                <label className="field-label" htmlFor="a-site">Website URL (if you have one)</label>
                <input id="a-site" name="website_url" type="url" value={form.website_url} onChange={handleChange} placeholder="https://…" className="field" autoComplete="url" />
              </div>
            </div>

            {error && <p className="notice-error" role="alert">{error}</p>}

            <button type="submit" disabled={loading} className="btn btn-lg mt-7 w-full">
              {loading ? <><Loader2 size={19} className="animate-spin" aria-hidden="true" /> Running the audit…</> : 'Run my free audit'}
            </button>

            <p className="muted mt-4 text-center text-[15px]">
              We score what you tell us — no crawling, no spam, no obligation.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
