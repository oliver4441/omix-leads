import { useState } from 'react';
import { Store, TrendingUp, ShieldCheck, CheckCircle, Loader2, ArrowUpRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { KENYAN_COUNTIES, BUSINESS_INDUSTRIES } from '../lib/constants';
import { CornerMarks } from '../components/Doodles';
import '../styles/journal-motion.css';

const benefits = [
  { icon: Store, title: 'Easy setup', desc: 'List your first product in minutes — no technical skills needed.' },
  { icon: TrendingUp, title: 'Grow sales', desc: 'Reach buyers across all 47 counties from one shopfront.' },
  { icon: ShieldCheck, title: 'Secure payments', desc: 'M-Pesa and card payments handled for you.' },
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
    <div className="hand-page">
      <header className="page-hero">
        <div className="content-wrap">
          <span className="sticky-tag">
            <Store size={15} aria-hidden="true" style={{ display: 'inline', verticalAlign: '-2px' }} /> OMIX Store
          </span>
          <h1 className="hand-h1 mt-6">Sell on the OMIX Store</h1>
          <p className="hand-lead mt-5 max-w-[58ch]">
            Bring your products to a marketplace where shoppers are already buying. You handle the goods;
            we handle the shopfront and the payments.
          </p>
        </div>
      </header>

      <section className="hand-section content-wrap">
        <div className="hand-grid hand-grid-3">
          {benefits.map((b, i) => (
            <div key={b.title} className={`card card-pad ${i === 1 ? 'card-postit tilt-n1' : 'tilt-1'}`}>
              {i === 1 ? <span className="tack" aria-hidden="true" /> : <span className="tape" aria-hidden="true" />}
              <span className="topic-icon" aria-hidden="true"><b.icon size={20} /></span>
              <h2 className="hand-h3 mt-4">{b.title}</h2>
              <p className="ink-soft mt-2.5">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 narrow-column">
          {success ? (
            <div className="card card-pad relative reveal">
              <CornerMarks />
              <span className="topic-icon" aria-hidden="true"><CheckCircle size={22} /></span>
              <h2 className="hand-h2 mt-5">Application submitted</h2>
              <p className="hand-lead mt-4">
                We will review it and come back to you within 48 hours. Keep an eye on your email.
              </p>
              <a href="https://omixsystems.store" className="btn mt-8" target="_blank" rel="noreferrer">
                Visit the OMIX Store <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card card-pad reveal">
              <h2 className="hand-h3">Apply to sell</h2>
              <p className="ink-soft mt-3">Every field below is only used to review this application.</p>

              <div className="field-grid mt-6">
                <div>
                  <label className="field-label" htmlFor="s-business">Business name *</label>
                  <input id="s-business" name="business_name" required value={form.business_name} onChange={handleChange} className="field" autoComplete="organization" />
                </div>
                <div>
                  <label className="field-label" htmlFor="s-owner">Owner name *</label>
                  <input id="s-owner" name="owner_name" required value={form.owner_name} onChange={handleChange} className="field" autoComplete="name" />
                </div>
                <div>
                  <label className="field-label" htmlFor="s-phone">Phone *</label>
                  <input id="s-phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} className="field" autoComplete="tel" />
                </div>
                <div>
                  <label className="field-label" htmlFor="s-email">Email *</label>
                  <input id="s-email" name="email" type="email" required value={form.email} onChange={handleChange} className="field" autoComplete="email" />
                </div>
                <div>
                  <label className="field-label" htmlFor="s-county">County *</label>
                  <select id="s-county" name="county" required value={form.county} onChange={handleChange} className="field">
                    <option value="">Select county</option>
                    {KENYAN_COUNTIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="field-label" htmlFor="s-industry">Industry *</label>
                  <select id="s-industry" name="industry" required value={form.industry} onChange={handleChange} className="field">
                    <option value="">Select industry</option>
                    {BUSINESS_INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div className="field-span-2">
                  <label className="field-label" htmlFor="s-products">What will you sell? *</label>
                  <textarea
                    id="s-products"
                    name="products_description"
                    required
                    rows={4}
                    value={form.products_description}
                    onChange={handleChange}
                    placeholder="Briefly describe the products you would like to list…"
                    className="field"
                  />
                </div>
              </div>

              {error && <p className="notice-error" role="alert">{error}</p>}

              <button type="submit" disabled={loading} className="btn btn-lg mt-7 w-full">
                {loading ? <><Loader2 size={19} className="animate-spin" aria-hidden="true" /> Sending application…</> : 'Apply to sell'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
