import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Gift, Loader2, Tag, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { KENYAN_COUNTIES } from '../lib/constants';
import { CornerMarks } from '../components/Doodles';
import '../styles/journal-motion.css';

const categories = ['Electronics', 'Clothing', 'Shoes', 'Health & Beauty', 'Home & Kitchen', 'Sports', 'Other'];

const hotDeals = [
  { name: 'Wireless Earbuds', price: 'KES 1,299', original: 'KES 3,500', discount: '63% off' },
  { name: "Men's Running Shoes", price: 'KES 2,499', original: 'KES 5,000', discount: '50% off' },
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
    <div className="hand-page">
      <header className="page-hero">
        <div className="content-wrap">
          <span className="sticky-tag">
            <Bell size={15} aria-hidden="true" style={{ display: 'inline', verticalAlign: '-2px' }} /> OMIX Store
          </span>
          <h1 className="hand-h1 mt-6">Deal alerts</h1>
          <p className="hand-lead mt-5 max-w-[58ch]">
            Tell us what you buy and where you are. We send a message when the price drops — nothing else.
          </p>
        </div>
      </header>

      <section className="hand-section content-wrap">
        <div className="split-aside">
          <div>
            {success ? (
              <div className="card card-pad relative reveal">
                <CornerMarks />
                <span className="topic-icon" aria-hidden="true"><CheckCircle2 size={22} /></span>
                <h2 className="hand-h2 mt-5">You are subscribed</h2>
                <p className="hand-lead mt-4">
                  We will alert you about <strong>{form.category}</strong> deals in <strong>{form.county}</strong>.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/referral" className="btn">
                    <Gift size={17} aria-hidden="true" /> Refer a friend and earn
                  </Link>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => { setSuccess(false); setForm(initialForm); }}
                  >
                    Add another category
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card card-pad reveal">
                <div className="field-grid">
                  <div>
                    <label className="field-label" htmlFor="d-name">Your name *</label>
                    <input id="d-name" name="name" required value={form.name} onChange={handleChange} className="field" autoComplete="name" />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="d-phone">Phone number *</label>
                    <input id="d-phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} className="field" autoComplete="tel" />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="d-category">Category *</label>
                    <select id="d-category" name="category" required value={form.category} onChange={handleChange} className="field">
                      <option value="">Select category</option>
                      {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="field-label" htmlFor="d-county">County *</label>
                    <select id="d-county" name="county" required value={form.county} onChange={handleChange} className="field">
                      <option value="">Select county</option>
                      {KENYAN_COUNTIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                {error && <p className="notice-error" role="alert">{error}</p>}

                <button type="submit" disabled={loading} className="btn btn-lg mt-7 w-full">
                  {loading ? <><Loader2 size={19} className="animate-spin" aria-hidden="true" /> Subscribing…</> : 'Subscribe to deal alerts'}
                </button>
              </form>
            )}

            <section className="mt-14">
              <hr className="rule-dashed" />
              <h2 className="hand-h3 mt-10 flex items-center gap-3">
                <Tag size={20} aria-hidden="true" className="mark-accent" /> On the shelf right now
              </h2>
              <div className="hand-grid hand-grid-3 mt-6">
                {hotDeals.map((deal, i) => (
                  <div key={deal.name} className={`card card-pad ${i % 2 ? 'tilt-1' : 'tilt-n1'}`}>
                    <span className="chip chip-accent">{deal.discount}</span>
                    <h3 className="hand-h3 mt-4">{deal.name}</h3>
                    <p className="mt-2">
                      <strong className="mark-ballpoint text-[20px]">{deal.price}</strong>{' '}
                      <s className="muted">{deal.original}</s>
                    </p>
                  </div>
                ))}
              </div>
              <p className="muted mt-5 text-[15px]">
                Sample prices from the OMIX Store catalogue. Availability changes — that is what the alerts are for.
              </p>
            </section>
          </div>

          <aside className="aside-sticky">
            <div className="card card-pad card-postit tilt-1">
              <span className="tack" aria-hidden="true" />
              <p className="kicker">How it works</p>
              <ol className="tool-steps mt-4">
                <li>
                  <span className="tool-step-num">1</span>
                  <div><strong>Pick a category</strong><p className="ink-soft">Electronics, shoes, whatever you actually buy.</p></div>
                </li>
                <li>
                  <span className="tool-step-num">2</span>
                  <div><strong>Pick your county</strong><p className="ink-soft">So we only send deals you can actually get.</p></div>
                </li>
                <li>
                  <span className="tool-step-num">3</span>
                  <div><strong>We message you</strong><p className="ink-soft">One alert per real price drop. No daily noise.</p></div>
                </li>
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
