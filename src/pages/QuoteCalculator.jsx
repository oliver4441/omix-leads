import { useState, useMemo } from 'react';
import { CheckCircle, Loader2, Calculator, ArrowUpRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { WEBSITE_FEATURES, KENYAN_COUNTIES, BUSINESS_INDUSTRIES, formatKES } from '../lib/constants';
import { CornerMarks, Starburst } from '../components/Doodles';
import '../styles/journal-motion.css';

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
      <div className="hand-page">
        <section className="hand-section content-wrap">
          <div className="narrow-column">
            <div className="card card-pad relative reveal">
              <CornerMarks />
              <div className="text-center">
                <span className="stat-blob mx-auto mark-accent">
                  <CheckCircle size={34} aria-hidden="true" />
                </span>
                <h1 className="hand-h2 mt-6">Your quote is ready</h1>
                <p className="hand-lead mt-4">
                  Here is the estimated cost, item by item. We will be in touch within 24 hours to talk it through.
                </p>
              </div>

              <ul className="quote-lines">
                {result.features.map((f) => (
                  <li key={f.id}>
                    <span>{f.label}</span>
                    <span>{formatKES(f.price)}</span>
                  </li>
                ))}
              </ul>

              <div className="quote-total">
                <span>Estimated total</span>
                <strong>{formatKES(result.total)}</strong>
              </div>

              <p className="muted mt-8 text-center text-[16px]">
                This is a working estimate, not a final invoice — scope changes get priced openly before we build.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href="https://omixsystems.store/#contact" className="btn" target="_blank" rel="noreferrer">
                  Discuss the project <ArrowUpRight size={17} aria-hidden="true" />
                </a>
                <button type="button" className="btn btn-secondary" onClick={() => { setResult(null); setSelected([]); setContact(initialContact); }}>
                  Price another project
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
            <Calculator size={15} aria-hidden="true" style={{ display: 'inline', verticalAlign: '-2px' }} /> Instant estimate
          </span>
          <h1 className="hand-h1 mt-6">Website quote calculator</h1>
          <p className="hand-lead mt-5 max-w-[58ch]">
            Pick the features you need and watch the number build up. No email gate, no sales call required.
          </p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="content-wrap hand-section quote-layout">
        <div className="card card-pad">
          <h2 className="hand-h3 flex items-center gap-3">
            <span className="step-chip">1</span> What do you need?
          </h2>
          <p className="ink-soft mt-3">
            Tap everything that applies. Prices are real starting points, not teasers.
          </p>

          <fieldset className="feature-picks">
            <legend className="sr-only">Website features</legend>
            {WEBSITE_FEATURES.map((feature) => {
              const isActive = selected.includes(feature.id);
              return (
                <button
                  key={feature.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => toggle(feature.id)}
                  className="feature-pick"
                >
                  <span className="feature-pick-label">
                    <CheckCircle size={17} aria-hidden="true" />
                    {feature.label}
                  </span>
                  <span className="feature-pick-price">{formatKES(feature.price)}</span>
                </button>
              );
            })}
          </fieldset>
        </div>

        <div className="quote-side">
          <div className="quote-running" aria-live="polite">
            <span className="kicker">Estimated total</span>
            <strong>{formatKES(total)}</strong>
            <p className="muted">
              {selected.length} feature{selected.length === 1 ? '' : 's'} selected
            </p>
            <Starburst className="quote-running-mark hidden md:block" aria-hidden="true" />
          </div>

          <div className="card card-pad">
            <h2 className="hand-h3 flex items-center gap-3">
              <span className="step-chip">2</span> Where do we send it?
            </h2>

            <div className="field-grid mt-6">
              <div>
                <label className="field-label" htmlFor="q-name">Full name *</label>
                <input id="q-name" name="name" required value={contact.name} onChange={handleChange} className="field" autoComplete="name" />
              </div>
              <div>
                <label className="field-label" htmlFor="q-phone">Phone *</label>
                <input id="q-phone" name="phone" type="tel" required value={contact.phone} onChange={handleChange} className="field" autoComplete="tel" />
              </div>
              <div className="field-span-2">
                <label className="field-label" htmlFor="q-email">Email *</label>
                <input id="q-email" name="email" type="email" required value={contact.email} onChange={handleChange} className="field" autoComplete="email" />
              </div>
              <div>
                <label className="field-label" htmlFor="q-county">County</label>
                <select id="q-county" name="county" value={contact.county} onChange={handleChange} className="field">
                  <option value="">Select county</option>
                  {KENYAN_COUNTIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="field-label" htmlFor="q-industry">Industry</label>
                <select id="q-industry" name="industry" value={contact.industry} onChange={handleChange} className="field">
                  <option value="">Select industry</option>
                  {BUSINESS_INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div className="field-span-2">
                <label className="field-label" htmlFor="q-budget">Budget range</label>
                <select id="q-budget" name="budget_range" value={contact.budget_range} onChange={handleChange} className="field">
                  <option value="">Select budget</option>
                  {budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>

            {error && <p className="notice-error" role="alert">{error}</p>}

            <button type="submit" disabled={loading} className="btn btn-lg mt-6 w-full">
              {loading ? <><Loader2 size={19} className="animate-spin" aria-hidden="true" /> Sending…</> : 'Get my quote'}
            </button>

            <p className="muted mt-4 text-center text-[15px]">
              We only use these details to reply about this quote.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
