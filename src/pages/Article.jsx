import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, Clock } from 'lucide-react'
import { articles } from '../data/articles'
import { BRAND_URL, SITE_URL, SITE_NAME, categorySlug, clearJsonLd, setCanonical, setJsonLd, setOgImage, upsertMeta, upsertProperty } from '../lib/seo'
import { UnderlineScribble, CornerMarks } from '../components/Doodles'
import '../styles/journal-motion.css'

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
    setOgImage(`/og/wiki-${article.slug}.png`, `${article.title} — ${article.category} note from the OMIX Journal`)

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

  if (!article) {
    return (
      <div className="hand-page grid min-h-[70vh] place-items-center px-5 py-20">
        <div className="max-w-lg text-center">
          <span className="sticky-tag">404 — note not found</span>
          <h1 className="hand-h2 mt-6">This note is not in the notebook.</h1>
          <p className="hand-lead mt-4">It may have been renamed, moved, or the address has a typo in it.</p>
          <Link to="/wiki" className="btn mt-8">
            Back to the knowledge base <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <article className="hand-page">
      <header className="page-hero">
        <div className="content-wrap">
          <Link to="/wiki" className="back-link">
            <ArrowLeft size={16} aria-hidden="true" /> Knowledge Base
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link to={`/category/${categorySlug(article.category)}`} className="chip chip-accent">
              {article.category}
            </Link>
            <span className="muted inline-flex items-center gap-1.5">
              <CalendarDays size={14} aria-hidden="true" /> {article.date}
            </span>
            <span className="muted inline-flex items-center gap-1.5">
              <Clock size={14} aria-hidden="true" /> {article.readTime}
            </span>
          </div>
          <h1 className="hand-h1 mt-5 max-w-[24ch]">{article.title}</h1>
          <UnderlineScribble className="mt-2 h-3 w-56 mark-accent" aria-hidden="true" />
          <p className="hand-lead mt-6 max-w-[62ch]">{article.excerpt}</p>
        </div>
      </header>

      <div className="content-wrap hand-section">
        <main className="reading-column">
          {article.sections.map(([heading, body], i) => (
            <section key={heading} className="reading-section">
              <span className="reading-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div className="prose-hand">
                <h2 className={i === 0 ? 'hand-h3 drop-cap' : 'hand-h3'}>{heading}</h2>
                <p>{body}</p>
              </div>
            </section>
          ))}

          {related.length > 0 && (
            <section className="mt-14">
              <hr className="rule-dashed" />
              <div className="section-head mt-10">
                <div>
                  <p className="kicker">Related knowledge</p>
                  <h2 className="hand-h3">More from {article.category}</h2>
                </div>
              </div>
              <div className="hand-grid hand-grid-3">
                {related.map((item, i) => (
                  <Link key={item.slug} to={`/wiki/${item.slug}`} className={`card card-pad card-interactive ${i % 2 ? 'tilt-1' : 'tilt-n1'}`}>
                    <span className="muted text-[15px]">{item.readTime}</span>
                    <h3 className="hand-h3 mt-2.5">{item.title}</h3>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="article-cta-card">
            <CornerMarks />
            <span className="topic-icon" aria-hidden="true"><BookOpen size={20} /></span>
            <div>
              <p className="kicker">Build with OMIX</p>
              <h2 className="hand-h3 mt-2">Have a system like this in mind?</h2>
              <p className="ink-soft mt-2.5 max-w-[54ch]">
                OMIX builds modular digital products, business systems and integrations.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/quote" className="btn">
                  Price your project <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <a href="https://omixsystems.store/#contact" className="btn btn-secondary" target="_blank" rel="noreferrer">
                  Talk to us
                </a>
              </div>
            </div>
          </div>

          {next && (
            <Link to={`/wiki/${next.slug}`} className="next-note">
              <span className="kicker">Next note</span>
              <strong className="hand-h3">{next.title}</strong>
              <ArrowRight size={22} aria-hidden="true" />
            </Link>
          )}
        </main>
      </div>
    </article>
  )
}
