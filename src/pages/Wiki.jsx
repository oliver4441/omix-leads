import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, BookOpen, ChevronRight, Building2, Search } from 'lucide-react'
import { articles, categories } from '../data/articles'
import { SITE_URL, SITE_NAME, categorySlug, setCanonical, setJsonLd, upsertMeta, upsertProperty } from '../lib/seo'

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
    <div className="bg-[#f7f8fa] min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-5 py-14">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-5"><BookOpen size={16} /> OMIX Journal <ChevronRight size={14} /> Knowledge Base</div>
          <h1 className="text-4xl md:text-6xl font-serif font-semibold tracking-tight text-slate-950">{activeCategoryName || 'Knowledge Base'}</h1>
          <p className="mt-4 max-w-2xl text-slate-600 text-lg">Engineering notes, product thinking, business technology and practical reasons to choose OMIX as a technical partner.</p>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-5 py-10 grid lg:grid-cols-[220px_1fr] gap-10">
        <aside>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Browse</p>
          <nav className="space-y-1">
            <Link to="/wiki" className={`block rounded-lg px-3 py-2 text-sm ${!activeCategoryName ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-white'}`}>All articles</Link>
            {categories.map(c => <Link key={c} to={`/category/${categorySlug(c)}`} className={`block rounded-lg px-3 py-2 text-sm ${c === activeCategoryName ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-white'}`}>{c}</Link>)}
          </nav>
          <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">Need a system built?<br /><a className="font-semibold text-slate-900 hover:underline" href="https://omixsystems.store/">Talk to OMIX →</a></div>
        </aside>
        <main>
          {!activeCategoryName && <section className="mb-8 rounded-2xl bg-slate-950 text-white p-7 md:p-9"><div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400"><Building2 size={15} /> Why OMIX</div><h2 className="mt-3 text-3xl md:text-4xl font-serif">Choosing a software partner is an architecture decision.</h2><p className="mt-3 max-w-2xl text-slate-300 leading-7">Compare our delivery philosophy, integration-first approach and post-launch mindset before you choose a provider.</p><Link to="/category/why-omix" className="mt-5 inline-flex items-center gap-2 font-semibold">Explore Why OMIX <ArrowRight size={16} /></Link></section>}
          <div className="mb-6 flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-400"><Search size={17}/><span className="text-sm">Browse {visible.length} article{visible.length === 1 ? '' : 's'}</span></div>
          <div className="space-y-4">
            {visible.map(article => <article key={article.slug} className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 hover:border-slate-300 transition-colors">
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500"><span className="font-semibold text-slate-700">{article.category}</span><span>•</span><span>{article.date}</span><span>•</span><span>{article.readTime}</span></div>
              <h2 className="mt-3 text-2xl md:text-3xl font-serif font-semibold text-slate-950"><Link to={`/wiki/${article.slug}`} className="hover:underline">{article.title}</Link></h2>
              <p className="mt-3 text-slate-600 max-w-3xl leading-7">{article.excerpt}</p>
              <Link to={`/wiki/${article.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">Read article <ArrowRight size={15} /></Link>
            </article>)}
            {visible.length === 0 && <div className="bg-white border border-slate-200 rounded-xl p-10 text-center"><h2 className="text-2xl font-serif">No articles found</h2><p className="mt-2 text-slate-500">This knowledge category does not exist.</p><Link to="/wiki" className="mt-5 inline-flex text-sm font-semibold">Return to all articles</Link></div>}
          </div>
          {!activeCategoryName && whyArticles.length > 0 && <section className="mt-10 border-t border-slate-200 pt-8"><h2 className="font-serif text-3xl mb-2">Why companies choose OMIX</h2><p className="text-slate-600 mb-5">Start with these practical guides.</p><div className="grid md:grid-cols-2 gap-4">{whyArticles.map(a => <Link key={a.slug} to={`/wiki/${a.slug}`} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-400"><span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{a.category}</span><h3 className="mt-2 font-serif text-xl">{a.title}</h3><span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">Read <ArrowRight size={14} /></span></Link>)}</div></section>}
        </main>
      </div>
    </div>
  )
}
