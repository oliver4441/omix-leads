import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, ExternalLink, Code2, Cloud, ShieldCheck, Boxes, Building2, Sparkles } from 'lucide-react'
import { articles } from '../data/articles'

const topics = [
  ['Engineering', Code2, 'Systems, architecture and implementation'],
  ['Architecture', Boxes, 'Patterns for reliable software'],
  ['Cloud & Infrastructure', Cloud, 'Deployment, platforms and operations'],
  ['Security', ShieldCheck, 'Practical security thinking'],
  ['Why OMIX', Building2, 'How we approach product engineering'],
]

export default function Home() {
  const latest = [...articles].sort((a,b) => b.date.localeCompare(a.date)).slice(0, 6)
  const featured = articles.find(a => a.slug === 'introducing-bifrost') || latest[0]
  return <div className="page-shell">
    <section className="hero-section">
      <div className="hero-grid" />
      <div className="content-wrap hero-content">
        <div className="eyebrow"><Sparkles size={14}/> OMIX JOURNAL · KNOWLEDGE BASE</div>
        <h1>Ideas, systems and lessons from building software.</h1>
        <p className="hero-copy">Engineering notes, product thinking and practical technology from OMIX Digital Solutions.</p>
        <div className="hero-actions">
          <Link to="/wiki" className="button button-primary">Explore the knowledge base <ArrowRight size={17}/></Link>
          <a href="https://omixsystems.store" className="button button-secondary">Visit OMIX Systems <ExternalLink size={15}/></a>
        </div>
        <div className="hero-meta"><span>8 published notes</span><span>·</span><span>Engineering + products + business</span></div>
      </div>
    </section>

    <section className="featured-section">
      <div className="content-wrap">
        <div className="section-label">Featured</div>
        <Link to={`/wiki/${featured.slug}`} className="featured-card">
          <div><div className="article-meta"><span>{featured.category}</span><span>·</span><span>{featured.readTime}</span></div><h2>{featured.title}</h2><p>{featured.excerpt}</p><span className="text-link">Read the article <ArrowRight size={15}/></span></div>
          <div className="featured-mark"><span>OMIX</span><strong>{featured.slug === 'introducing-bifrost' ? 'B' : 'J'}</strong></div>
        </Link>
      </div>
    </section>

    <section id="latest" className="content-section">
      <div className="content-wrap two-column">
        <div className="main-column">
          <div className="section-heading"><div><div className="section-label">Journal</div><h2>Latest notes</h2></div><Link to="/wiki" className="text-link">View all <ArrowRight size={15}/></Link></div>
          <div className="article-list">{latest.map(a => <article key={a.slug} className="article-card"><div className="article-meta"><span>{a.category}</span><span>·</span><span>{a.readTime}</span><span>·</span><span>{a.date}</span></div><h3><Link to={`/wiki/${a.slug}`}>{a.title}</Link></h3><p>{a.excerpt}</p><Link to={`/wiki/${a.slug}`} className="text-link">Read article <ArrowRight size={14}/></Link></article>)}</div>
        </div>
        <aside className="sidebar">
          <div className="sidebar-card"><div className="section-label">Explore</div><h3>Knowledge areas</h3><div className="topic-list">{topics.map(([name, Icon, desc]) => <Link key={name} to={`/category/${encodeURIComponent(name.toLowerCase().replace(/ /g, '-'))}`}><span className="topic-icon"><Icon size={16}/></span><span><strong>{name}</strong><small>{desc}</small></span><ArrowRight size={15}/></Link>)}</div></div>
        </aside>
      </div>
    </section>

    <section id="topics" className="topics-section"><div className="content-wrap"><div className="section-heading centered"><div><div className="section-label">Topics</div><h2>Built for people who build</h2><p>Browse practical thinking across the systems and products we work on.</p></div></div><div className="topic-grid">{topics.map(([name, Icon, desc]) => <Link key={name} to={`/category/${encodeURIComponent(name.toLowerCase().replace(/ /g, '-'))}`} className="topic-card"><span className="topic-icon large"><Icon size={20}/></span><h3>{name}</h3><p>{desc}.</p><span className="text-link">Explore <ArrowRight size={14}/></span></Link>)}</div></div></section>

    <section className="network-section"><div className="content-wrap network-card"><div><div className="section-label">The OMIX network</div><h2>From an idea to a working digital product.</h2><p>The Journal documents the thinking behind the systems, products and integrations we build.</p></div><div className="network-actions"><a href="https://bifrost.omixsystems.store" className="button button-primary">Explore Bifrost <ArrowRight size={16}/></a><a href="https://omixsystems.store/#contact" className="button button-secondary">Discuss a project <ArrowRight size={16}/></a></div></div></section>
  </div>
}
