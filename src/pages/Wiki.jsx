import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, BookOpen, ChevronRight, Building2, PenLine } from 'lucide-react'
import { articles, categories } from '../data/articles'
import { SITE_URL, SITE_NAME, categorySlug, setCanonical, setJsonLd, setOgImage, upsertMeta, upsertProperty } from '../lib/seo'
import { Squiggle, CornerMarks } from '../components/Doodles'
import '../styles/journal-motion.css'

export default function Wiki() {
  const { category } = useParams()
  const activeCategory = category ? decodeURIComponent(category) : null
  const activeCategoryName = activeCategory ? categories.find(c => categorySlug(c) === categorySlug(activeCategory)) : null
  const visible = activeCategoryName ? articles.filter(a => a.category === activeCategoryName) : articles
  const whyArticles = articles.filter(a => a.category === 'Why OMIX')

  useEffect(() => {
    const title = activeCategoryName ? `${activeCategoryName} — ${SITE_NAME}` : `Knowledge Base — ${SITE_NAME}`
    const description = activeCategoryName
      ? `OMIX Journal articles about ${activeCategoryName.toLowerCase()}, software engineering and digital products.`
      : 'Engineering notes, product thinking, business technology and practical software architecture from OMIX.'
    const url = activeCategoryName ? `${SITE_URL}/category/${categorySlug(activeCategoryName)}` : `${SITE_URL}/wiki`
    document.title = title
    upsertMeta('description', description)
    upsertMeta('robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1')
    upsertProperty('og:type', 'website')
    upsertProperty('og:title', title)
    upsertProperty('og:description', description)
    upsertProperty('og:url', url)
    upsertProperty('og:site_name', SITE_NAME)
    upsertMeta('twitter:card', 'summary')
    upsertMeta('twitter:title', title)
    upsertMeta('twitter:description', description)
    setCanonical(url)
    setOgImage(
      activeCategoryName
        ? `/og/category-${categorySlug(activeCategoryName)}.png`
        : '/og/og-default.png',
      activeCategoryName
        ? `${activeCategoryName} — ${visible.length} notes in the OMIX Journal`
        : 'The OMIX Journal knowledge base',
    )
    setJsonLd('wiki-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: title,
      description,
      url,
      isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
      mainEntity: { '@type': 'ItemList', itemListElement: visible.map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE_URL}/wiki/${a.slug}`, name: a.title })) },
    })
    return () => document.getElementById('wiki-jsonld')?.remove()
  }, [activeCategoryName, visible])

  return (
    <div className="hand-page">
      <header className="page-hero">
        <div className="content-wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <BookOpen size={16} aria-hidden="true" />
            <Link to="/">OMIX Journal</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>{activeCategoryName || 'Knowledge Base'}</span>
          </nav>
          <h1 className="hand-h1">{activeCategoryName || 'The knowledge base'}</h1>
          <p className="hand-lead max-w-[62ch]">
            Engineering notes, product thinking, business technology and practical reasons to choose OMIX
            as a technical partner.
          </p>
        </div>
      </header>

      <div className="content-wrap hand-section split-aside">
        <aside className="lg:order-none order-2">
          <div className="aside-sticky">
            <p className="kicker mb-4">Browse the shelves</p>
            <nav className="category-nav" aria-label="Article categories">
              <Link to="/wiki" aria-current={!activeCategoryName ? 'page' : undefined}>
                All notes <span>{articles.length}</span>
              </Link>
              {categories.map((c) => (
                <Link key={c} to={`/category/${categorySlug(c)}`} aria-current={c === activeCategoryName ? 'page' : undefined}>
                  {c} <span>{articles.filter(a => a.category === c).length}</span>
                </Link>
              ))}
            </nav>

            <div className="card card-pad card-postit tilt-n1 mt-10">
              <span className="tack" aria-hidden="true" />
              <p className="kicker">Need a system built?</p>
              <p className="mt-3 text-[18px]">Tell us what the business needs and we will scope it honestly.</p>
              <Link to="/quote" className="text-link mt-4">
                Get a quote <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </aside>

        <main>
          {!activeCategoryName && (
            <section className="wiki-feature-card mb-10">
              <CornerMarks />
              <span className="chip chip-accent">
                <Building2 size={15} aria-hidden="true" /> Why OMIX
              </span>
              <h2 className="hand-h2 mt-5">Choosing a software partner is an architecture decision.</h2>
              <p className="hand-lead mt-4 max-w-[58ch]">
                Compare our delivery philosophy, integration-first approach and post-launch mindset before
                you choose a provider.
              </p>
              <Link to="/category/why-omix" className="btn btn-secondary mt-7">
                Explore Why OMIX <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </section>
          )}

          <div className="section-head">
            <div>
              <p className="kicker">{activeCategoryName ? 'Category' : 'Everything published'}</p>
              <h2 className="hand-h3">
                {visible.length} note{visible.length === 1 ? '' : 's'} on the shelf
              </h2>
            </div>
            <Squiggle className="hidden h-4 w-40 self-end mark-ballpoint lg:block" aria-hidden="true" />
          </div>

          <div className="article-shelf">
            {visible.map((article, index) => (
              <article key={article.slug} className={`shelf-card card card-pad card-interactive reveal reveal-d${Math.min((index % 3) + 1, 3)}`}>
                <div className="flex flex-wrap items-center gap-2.5 text-[15px]">
                  <span className="chip">{article.category}</span>
                  <span className="muted">{article.date}</span>
                  <span className="muted" aria-hidden="true">·</span>
                  <span className="muted">{article.readTime}</span>
                </div>
                <h3 className="shelf-card-title">
                  <Link to={`/wiki/${article.slug}`}>{article.title}</Link>
                </h3>
                <p className="ink-soft">{article.excerpt}</p>
                <span className="text-link mt-4">
                  Read the note <ArrowRight size={16} aria-hidden="true" />
                </span>
              </article>
            ))}

            {visible.length === 0 && (
              <div className="empty-state">
                <PenLine size={26} aria-hidden="true" className="mx-auto mark-accent" />
                <h2 className="hand-h3 mt-4">This shelf is empty</h2>
                <p className="mt-2">That knowledge area does not exist — or nothing has been filed under it yet.</p>
                <Link to="/wiki" className="btn mt-6">Back to all notes</Link>
              </div>
            )}
          </div>

          {!activeCategoryName && whyArticles.length > 0 && (
            <section className="mt-14">
              <hr className="rule-dashed" />
              <div className="section-head mt-10">
                <div>
                  <p className="kicker">Start here</p>
                  <h2 className="hand-h3">Why companies choose OMIX</h2>
                </div>
              </div>
              <div className="hand-grid hand-grid-2">
                {whyArticles.map((a, i) => (
                  <Link key={a.slug} to={`/wiki/${a.slug}`} className={`card card-pad card-interactive ${i % 2 ? 'tilt-1' : 'tilt-n1'}`}>
                    <span className="kicker">{a.category}</span>
                    <h3 className="hand-h3 mt-3">{a.title}</h3>
                    <span className="text-link mt-4">
                      Read <ArrowRight size={15} aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}
