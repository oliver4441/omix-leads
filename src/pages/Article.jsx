import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays } from 'lucide-react'
import { articles } from '../data/articles'
import { BRAND_URL, SITE_URL, SITE_NAME, categorySlug, clearJsonLd, setCanonical, setJsonLd, upsertMeta, upsertProperty } from '../lib/seo'

export default function Article() {
  const { slug } = useParams()
  const article = articles.find(a => a.slug === slug)
  const index = articles.findIndex(a => a.slug === slug)
  const next = index >= 0 ? articles[index + 1] : null
  const related = article ? articles.filter(a => a.slug !== article.slug && a.category === article.category).slice(0, 3) : []

  useEffect(() => {
    if (!article) {
      document.title = `Article not found — ${SITE_NAME}`
      upsertMeta('description', 'The requested OMIX Journal article could not be found.')
      setCanonical(`${SITE_URL}/wiki`)
      clearJsonLd('article-jsonld')
      clearJsonLd('breadcrumb-jsonld')
      return
    }

    const url = `${SITE_URL}/wiki/${article.slug}`
    document.title = `${article.title} — ${SITE_NAME}`
    upsertMeta('description', article.excerpt)
    upsertMeta('robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1')
    upsertProperty('og:type', 'article')
    upsertProperty('og:title', article.title)
    upsertProperty('og:description', article.excerpt)
    upsertProperty('og:url', url)
    upsertProperty('og:site_name', SITE_NAME)
    upsertProperty('article:published_time', article.date)
    upsertProperty('article:section', article.category)
    upsertMeta('twitter:card', 'summary')
    upsertMeta('twitter:title', article.title)
    upsertMeta('twitter:description', article.excerpt)
    setCanonical(url)

    setJsonLd('article-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.excerpt,
      datePublished: article.date,
      dateModified: article.date,
      inLanguage: 'en',
      author: { '@type': 'Organization', name: 'OMIX Systems', url: `${BRAND_URL}/` },
      publisher: { '@type': 'Organization', name: 'OMIX Systems', url: `${BRAND_URL}/` },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      articleSection: article.category,
      keywords: [article.category, 'OMIX', 'software engineering', 'digital products'],
    })

    setJsonLd('breadcrumb-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Knowledge Base', item: `${SITE_URL}/wiki` },
        { '@type': 'ListItem', position: 2, name: article.category, item: `${SITE_URL}/category/${categorySlug(article.category)}` },
        { '@type': 'ListItem', position: 3, name: article.title, item: url },
      ],
    })

    return () => {
      clearJsonLd('article-jsonld')
      clearJsonLd('breadcrumb-jsonld')
    }
  }, [article])

  if (!article) return <div className="not-found"><div className="content-wrap"><div className="section-label">404</div><h1>Article not found</h1><p>The article may have moved or the address is incorrect.</p><Link to="/wiki" className="button button-primary">Back to knowledge base <ArrowRight size={16}/></Link></div></div>

  return <article className="article-page">
    <header className="article-hero"><div className="content-wrap article-hero-inner"><Link to="/wiki" className="back-link"><ArrowLeft size={15}/> Knowledge Base</Link><div className="article-meta"><span>{article.category}</span><span>·</span><span><CalendarDays size={13}/> {article.date}</span><span>·</span><span>{article.readTime}</span></div><h1>{article.title}</h1><p>{article.excerpt}</p></div></header>
    <div className="content-wrap article-layout"><main className="article-content">
      {article.sections.map(([heading, body], i) => <section key={heading}><div className="section-number">{String(i+1).padStart(2,'0')}</div><div><h2>{heading}</h2><p>{body}</p></div></section>)}
      {related.length > 0 && <section className="mt-10"><div className="section-label">Related knowledge</div><div className="grid md:grid-cols-3 gap-4 mt-4">{related.map(item => <Link key={item.slug} to={`/wiki/${item.slug}`} className="border border-slate-200 rounded-xl p-4 hover:border-slate-400"><span className="text-xs text-slate-500">{item.readTime}</span><h3 className="mt-2 font-semibold">{item.title}</h3></Link>)}</div></section>}
      <div className="article-cta"><div className="feature-icon"><BookOpen size={18}/></div><div><div className="section-label">Build with OMIX</div><h2>Have a system like this in mind?</h2><p>OMIX builds modular digital products, business systems and integrations.</p><a href="https://omixsystems.store/#contact" className="text-link">Discuss a project <ArrowRight size={15}/></a></div></div>
      {next && <Link to={`/wiki/${next.slug}`} className="next-article"><div><span>Next article</span><strong>{next.title}</strong></div><ArrowRight size={20}/></Link>}
    </main></div>
  </article>
}
