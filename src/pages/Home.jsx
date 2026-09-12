import { Link } from 'react-router-dom'
import { ArrowUpRight, BookOpen, Code2, Cloud, ShieldCheck, Boxes, Building2 } from 'lucide-react'
import { articles } from '../data/articles'
import '../styles/journal-motion.css'

const topics = [
  ['Engineering', Code2, 'Systems, implementation and engineering practice'],
  ['Architecture', Boxes, 'Patterns for reliable software'],
  ['Cloud & Infrastructure', Cloud, 'Deployment, platforms and operations'],
  ['Security', ShieldCheck, 'Practical security thinking'],
  ['Why OMIX', Building2, 'How we approach product engineering'],
]

export default function Home() {
  const latest = [...articles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6)
  const featured = articles.find(a => a.slug === 'introducing-bifrost') || latest[0]

  return <div className="page-shell journal-home">
    <section className="journal-hero">
      <div className="content-wrap journal-hero-grid">
        <div className="journal-hero-copy journal-reveal">
          <p className="journal-kicker">OMIX JOURNAL / ENGINEERING NOTES</p>
          <h1>Build with intent.</h1>
          <p className="journal-lede">Practical notes on software, systems, products and the decisions behind them.</p>
          <div className="hero-actions journal-reveal journal-reveal-delay-1">
            <Link to="/wiki" className="button button-primary">Read the journal <ArrowUpRight size={16} /></Link>
            <a href="https://omixsystems.store" className="button button-secondary">OMIX Systems <ArrowUpRight size={15} /></a>
          </div>
        </div>
        <div className="journal-hero-index journal-reveal journal-reveal-delay-2" aria-label="Journal index">
          <div className="index-line"><span>01</span><span>Engineering</span></div>
          <div className="index-line"><span>02</span><span>Architecture</span></div>
          <div className="index-line"><span>03</span><span>Cloud</span></div>
          <div className="index-line"><span>04</span><span>Security</span></div>
          <div className="index-line"><span>05</span><span>Products</span></div>
        </div>
      </div>
    </section>

    <section className="featured-section journal-featured">
      <div className="content-wrap">
        <div className="journal-section-head">
          <div>
            <p className="journal-kicker">Selected note</p>
            <h2>Worth reading first.</h2>
          </div>
          <span className="journal-count">{articles.length} published notes</span>
        </div>
        <Link to={`/wiki/${featured.slug}`} className="journal-featured-card journal-interactive">
          <div className="journal-featured-copy">
            <div className="article-meta"><span>{featured.category}</span><span>·</span><span>{featured.readTime}</span></div>
            <h3>{featured.title}</h3>
            <p>{featured.excerpt}</p>
            <span className="text-link">Open note <ArrowUpRight size={15} /></span>
          </div>
          <div className="journal-featured-index"><span>OMIX / 01</span><strong>{featured.slug === 'introducing-bifrost' ? 'B' : 'J'}</strong></div>
        </Link>
      </div>
    </section>

    <section id="latest" className="content-section journal-latest">
      <div className="content-wrap journal-latest-grid">
        <div>
          <div className="journal-section-head compact">
            <div>
              <p className="journal-kicker">The latest</p>
              <h2>Recent notes.</h2>
            </div>
            <Link to="/wiki" className="text-link">All notes <ArrowUpRight size={15} /></Link>
          </div>
          <div className="journal-list">
            {latest.map((article, index) => <article key={article.slug} className={`journal-row journal-reveal journal-reveal-delay-${Math.min((index % 3) + 1, 3)}`}>
              <span className="journal-row-number">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <div className="article-meta"><span>{article.category}</span><span>·</span><span>{article.readTime}</span><span>·</span><span>{article.date}</span></div>
                <h3><Link to={`/wiki/${article.slug}`}>{article.title}</Link></h3>
                <p>{article.excerpt}</p>
              </div>
              <ArrowUpRight className="journal-row-arrow" size={18} />
            </article>)}
          </div>
        </div>

        <aside className="journal-aside">
          <div className="journal-aside-block">
            <p className="journal-kicker">Browse</p>
            <h3>Knowledge areas.</h3>
            <div className="topic-list journal-topic-list">
              {topics.map(([name, Icon, desc]) => <Link key={name} to={`/category/${encodeURIComponent(name.toLowerCase().replace(/ /g, '-'))}`}>
                <span className="topic-icon"><Icon size={16} /></span>
                <span><strong>{name}</strong><small>{desc}</small></span>
                <ArrowUpRight size={15} />
              </Link>)}
            </div>
          </div>
          <div className="journal-aside-note">
            <BookOpen size={18} />
            <p>Long-form notes for people building software, products and infrastructure.</p>
          </div>
        </aside>
      </div>
    </section>

    <section id="topics" className="topics-section journal-topics">
      <div className="content-wrap">
        <div className="journal-section-head compact">
          <div>
            <p className="journal-kicker">Explore</p>
            <h2>Five ways into the journal.</h2>
          </div>
        </div>
        <div className="journal-topic-grid">
          {topics.map(([name, Icon, desc], index) => <Link key={name} to={`/category/${encodeURIComponent(name.toLowerCase().replace(/ /g, '-'))}`} className={`journal-topic-card topic-${index + 1} journal-interactive`}>
            <span className="journal-topic-number">0{index + 1}</span>
            <Icon size={20} />
            <h3>{name}</h3>
            <p>{desc}</p>
            <span className="text-link">Explore <ArrowUpRight size={14} /></span>
          </Link>)}
        </div>
      </div>
    </section>

    <section className="network-section journal-network">
      <div className="content-wrap journal-network-grid">
        <div>
          <p className="journal-kicker">The OMIX network</p>
          <h2>The journal is where the reasoning lives.</h2>
        </div>
        <div>
          <p>Explore the products, infrastructure and experiments that turn these ideas into working software.</p>
          <div className="network-actions">
            <a href="https://bifrost.omixsystems.store" className="button button-primary">Explore Bifrost <ArrowUpRight size={16} /></a>
            <a href="https://omixsystems.store/#contact" className="button button-secondary">Start a conversation <ArrowUpRight size={16} /></a>
          </div>
        </div>
      </div>
    </section>
  </div>
}
