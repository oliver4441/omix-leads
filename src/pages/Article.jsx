import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays } from 'lucide-react'
import { articles } from '../data/articles'

export default function Article() {
  const { slug } = useParams()
  const article = articles.find(a => a.slug === slug)
  const index = articles.findIndex(a => a.slug === slug)
  const next = index >= 0 ? articles[index + 1] : null
  useEffect(() => { if (article) { document.title = `${article.title} — OMIX Journal`; const meta = document.querySelector('meta[name="description"]'); if (meta) meta.setAttribute('content', article.excerpt) } }, [article])
  if (!article) return <div className="not-found"><div className="content-wrap"><div className="section-label">404</div><h1>Article not found</h1><p>The article may have moved or the address is incorrect.</p><Link to="/wiki" className="button button-primary">Back to knowledge base <ArrowRight size={16}/></Link></div></div>
  const structuredData = {'@context':'https://schema.org','@type':'Article',headline:article.title,description:article.excerpt,datePublished:article.date,author:{'@type':'Organization',name:'OMIX Systems',url:'https://omixsystems.store/'},publisher:{'@type':'Organization',name:'OMIX Systems',url:'https://omixsystems.store/'},mainEntityOfPage:`https://blog.omixsystems.store/wiki/${article.slug}`}
  return <article className="article-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}} />
    <header className="article-hero"><div className="content-wrap article-hero-inner"><Link to="/wiki" className="back-link"><ArrowLeft size={15}/> Knowledge Base</Link><div className="article-meta"><span>{article.category}</span><span>·</span><span><CalendarDays size={13}/> {article.date}</span><span>·</span><span>{article.readTime}</span></div><h1>{article.title}</h1><p>{article.excerpt}</p></div></header>
    <div className="content-wrap article-layout"><main className="article-content">{article.sections.map(([heading, body], i) => <section key={heading}><div className="section-number">{String(i+1).padStart(2,'0')}</div><div><h2>{heading}</h2><p>{body}</p></div></section>)}<div className="article-cta"><div className="feature-icon"><BookOpen size={18}/></div><div><div className="section-label">Build with OMIX</div><h2>Have a system like this in mind?</h2><p>OMIX builds modular digital products, business systems and integrations.</p><a href="https://omixsystems.store/#contact" className="text-link">Discuss a project <ArrowRight size={15}/></a></div></div>{next && <Link to={`/wiki/${next.slug}`} className="next-article"><div><span>Next article</span><strong>{next.title}</strong></div><ArrowRight size={20}/></Link>}</main></div>
  </article>
}
