import { Link } from 'react-router-dom'
import {
  ArrowUpRight, BookOpen, Code2, Boxes, Building2, ShieldCheck, FileText,
} from 'lucide-react'
import { publicArticles as articles, categories } from '../data/articles'
import { categorySlug } from '../lib/seo'
import { ScribbleArrow, Squiggle, CornerMarks, Starburst } from '../components/Doodles'
import '../styles/journal-motion.css'

/* Category copy lives next to the data it describes, derived from the real
   categories list — so a new category can never produce a dead topic link. */
const categoryMeta = {
  Engineering: { icon: Code2, blurb: 'How systems get built, module by module.' },
  Products: { icon: Boxes, blurb: 'Field notes from shipping real products.' },
  'Business Technology': { icon: Building2, blurb: 'Operational workflows, offline support and connected business data.' },
  'AI & Automation': { icon: Boxes, blurb: 'Model gateways, agent workflows and practical automation.' },
  'Payments & Integrations': { icon: ShieldCheck, blurb: 'Payment lifecycles, webhooks and dependable service integrations.' },
}

export default function Home() {
  const latest = [...articles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6)
  const featured = articles.find((a) => a.slug === 'introducing-bifrost') || latest[0]
  const countFor = (name) => articles.filter((a) => a.category === name).length

  return (
    <div className="hand-page">
      {/* ------------------------------------------------------------ hero */}
      <section className="hero-hand">
        <div className="content-wrap hero-hand-grid">
          <div className="reveal">
            <span className="sticky-tag">OMIX Journal — engineering notes</span>
            <h1 className="hand-h1 mt-7">
              Build with <span className="marker-underline">intent</span>
              <span className="hero-bang bob-slow" aria-hidden="true">!</span>
            </h1>
            <p className="hand-lead mt-7 max-w-[34ch]">
              Practical notes on software, systems, products — and the decisions behind them.
            </p>
            <div className="hero-hand-actions reveal reveal-d1">
              <Link to="/wiki" className="btn btn-lg">
                Read the journal <ArrowUpRight size={20} aria-hidden="true" />
              </Link>
              <a href="https://omixsystems.store" className="btn btn-secondary btn-lg" target="_blank" rel="noreferrer">
                OMIX Systems <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <ScribbleArrow className="hero-hand-arrow hidden md:block" />
            </div>
          </div>

          <aside className="hero-hand-index tilt-1 reveal reveal-d2">
            <CornerMarks />
            <span className="tack" aria-hidden="true" />
            <p className="kicker">The index</p>
            <ul className="hero-index-list">
              {categories.map((name, i) => (
                <li key={name}>
                  <span className="hero-index-num">{String(i + 1).padStart(2, '0')}</span>
                  <Link to={`/category/${categorySlug(name)}`} className="wavy-link">
                    {name}
                  </Link>
                  <span className="muted">{countFor(name)}</span>
                </li>
              ))}
            </ul>
            <p className="hero-index-foot">
              <Starburst className="bob mark-accent h-5 w-5" /> {articles.length} notes and counting
            </p>
            <span className="hero-hand-blob hidden md:block" aria-hidden="true" />
          </aside>
        </div>
      </section>

      {/* ----------------------------------------------------------- stats */}
      <section className="band band-sunken">
        <div className="content-wrap hand-section">
          <div className="stat-row">
            {[
              [articles.length, 'published notes'],
              [categories.length, 'knowledge areas'],
              [latest[0]?.date ? new Date(`${latest[0].date}T00:00:00`).toLocaleDateString('en', { month: 'short', year: 'numeric' }) : '—', 'latest article'],
              ['Kericho, Kenya', 'publisher base'],
            ].map(([value, label], i) => (
              <div key={label} className={`stat-item ${i % 2 ? 'tilt-1' : 'tilt-n1'}`}>
                <span className="stat-blob jiggle">
                  <strong>{value}</strong>
                </span>
                <span className="kicker">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- featured */}
      <section className="hand-section">
        <div className="content-wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Selected note</p>
              <h2 className="hand-h2">Worth reading first.</h2>
            </div>
            <Link to="/wiki" className="text-link">
              All notes <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>

          <Link to={`/wiki/${featured.slug}`} className="featured-note card card-pad card-interactive reveal">
            <span className="tape" aria-hidden="true" />
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="chip chip-accent">{featured.category}</span>
                <span className="muted">{featured.readTime} · {featured.date}</span>
              </div>
              <h3 className="featured-note-title">{featured.title}</h3>
              <p className="hand-lead drop-cap">{featured.excerpt}</p>
              <span className="text-link">
                Open the note <ArrowUpRight size={17} aria-hidden="true" />
              </span>
            </div>
            <div className="featured-note-mark" aria-hidden="true">
              <span>OMIX / 01</span>
              <strong>{featured.slug === 'introducing-bifrost' ? 'B' : 'J'}</strong>
            </div>
          </Link>
        </div>
      </section>

      {/* ---------------------------------------------------------- latest */}
      <section id="latest" className="band band-paper">
        <div className="content-wrap hand-section split-aside">
          <div>
            <div className="section-head">
              <div>
                <p className="kicker">The latest</p>
                <h2 className="hand-h2">Recent notes.</h2>
              </div>
            </div>
            <div className="note-list">
              {latest.map((article, index) => (
                <article key={article.slug} className={`note-row reveal reveal-d${Math.min((index % 3) + 1, 3)}`}>
                  <span className="note-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 muted text-[15px]">
                      <span className="ink-soft">{article.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.readTime}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.date}</span>
                    </div>
                    <h3 className="note-row-title">
                      <Link to={`/wiki/${article.slug}`}>{article.title}</Link>
                    </h3>
                    <p className="ink-soft">{article.excerpt}</p>
                  </div>
                  <ArrowUpRight className="note-row-arrow" size={20} aria-hidden="true" />
                </article>
              ))}
            </div>
          </div>

          <aside className="aside-sticky reveal reveal-d2">
            <div className="card card-pad card-postit tilt-n1">
              <span className="tack" aria-hidden="true" />
              <p className="kicker">Note from the desk</p>
              <p className="mt-3 text-[19px]">
                Every note here is written by the people who build the systems. No ghostwriters, no filler.
              </p>
            </div>

            <div className="bubble mt-10">
              <BookOpen size={19} aria-hidden="true" className="mark-accent" />
              <p className="mt-3 text-[18px]">
                Long-form notes for people building software, products and infrastructure.
              </p>
            </div>

            <div className="mt-10">
              <p className="kicker mb-4">Browse</p>
              <div className="aside-links">
                {categories.map((name) => {
                  const Icon = categoryMeta[name]?.icon || Code2
                  return (
                    <Link key={name} to={`/category/${categorySlug(name)}`} className="jiggle">
                      <span className="aside-icon"><Icon size={17} aria-hidden="true" /></span>
                      {name}
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </Link>
                  )
                })}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ---------------------------------------------------------- topics */}
      <section id="topics" className="band band-sunken">
        <div className="content-wrap hand-section">
          <div className="section-head">
            <div>
              <p className="kicker">Explore</p>
              <h2 className="hand-h2">Browse by subject.</h2>
            </div>
          </div>
          <div className="topic-grid">
            {categories.map((name, index) => {
              const Icon = categoryMeta[name]?.icon || Code2
              return (
                <Link
                  key={name}
                  to={`/category/${encodeURIComponent(name.toLowerCase().replace(/ /g, '-'))}`}
                  className={`topic-card card card-pad card-interactive ${index % 2 ? 'tilt-1' : 'tilt-n1'}`}
                >
                  {index % 2 ? <span className="tape" aria-hidden="true" /> : <span className="tack" aria-hidden="true" />}
                  <span className="topic-icon"><Icon size={22} aria-hidden="true" /></span>
                  <h3 className="hand-h3 mt-5">{name}</h3>
                  <p className="ink-soft mt-2.5">{categoryMeta[name]?.blurb}</p>
                  <span className="text-link mt-5">
                    {countFor(name)} note{countFor(name) === 1 ? '' : 's'} <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- publication */}
      <section id="standards" className="hand-section">
        <div className="content-wrap">
          <div className="section-head">
            <div>
              <p className="kicker">How we publish</p>
              <h2 className="hand-h2">Useful explanations, not filler.</h2>
            </div>
            <p className="hand-lead max-w-[42ch]">Articles should explain a real problem, show their reasoning, acknowledge limitations and point readers to sources they can verify.</p>
          </div>
          <div className="hand-grid hand-grid-2">
            <Link to="/about" className="card card-pad card-interactive">
              <span className="topic-icon"><BookOpen size={21} aria-hidden="true" /></span>
              <h3 className="hand-h3 mt-4">About the Journal</h3>
              <p className="ink-soft mt-2.5">Who publishes this knowledge base, what it covers and how it relates to OMIX Digital Solutions.</p>
              <span className="text-link mt-5">Read about the publication <ArrowUpRight size={16} aria-hidden="true" /></span>
            </Link>
            <Link to="/editorial-policy" className="card card-pad card-interactive">
              <span className="topic-icon"><FileText size={21} aria-hidden="true" /></span>
              <h3 className="hand-h3 mt-4">Editorial policy</h3>
              <p className="ink-soft mt-2.5">Our standards for research, technical verification, authorship, AI assistance, corrections and commercial transparency.</p>
              <span className="text-link mt-5">Read our publishing standards <ArrowUpRight size={16} aria-hidden="true" /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- network */}
      <section className="band band-ink">
        <div className="content-wrap hand-section">
          <div className="section-head">
            <div>
              <p className="kicker">The OMIX network</p>
              <h2 className="hand-h2">The journal is where the reasoning lives.</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to="/wiki" className="btn btn-secondary">
                Browse all articles <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <hr className="rule-dashed" />
          <p className="hand-lead mt-7 max-w-[60ch]">
            Explore the engineering ideas, trade-offs and references behind software and digital systems.
          </p>
        </div>
      </section>
    </div>
  )
}
