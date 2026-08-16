import { Link, useParams } from 'react-router-dom'
import { ArrowRight, BookOpen, ChevronRight, Building2 } from 'lucide-react'
import { articles, categories } from '../data/articles'

export default function Wiki() {
  const { category } = useParams()
  const activeCategory = category ? decodeURIComponent(category).replace(/-/g, ' ') : null
  const visible = activeCategory ? articles.filter(a => a.category.toLowerCase() === activeCategory.toLowerCase()) : articles
  const whyArticles = articles.filter(a => a.category === 'Why OMIX')

  return (
    <div className="bg-[#f7f8fa] min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-5 py-14">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-5"><BookOpen size={16} /> OMIX Journal <ChevronRight size={14} /> Knowledge Base</div>
          <h1 className="text-4xl md:text-6xl font-serif font-semibold tracking-tight text-slate-950">Knowledge Base</h1>
          <p className="mt-4 max-w-2xl text-slate-600 text-lg">Engineering notes, product thinking, business technology and practical reasons to choose OMIX as a technical partner.</p>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-5 py-10 grid lg:grid-cols-[220px_1fr] gap-10">
        <aside>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Browse</p>
          <nav className="space-y-1">
            <Link to="/wiki" className={`block rounded-lg px-3 py-2 text-sm ${!category ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-white'}`}>All articles</Link>
            {categories.map(c => <Link key={c} to={`/category/${encodeURIComponent(c.toLowerCase().replace(/ /g, '-'))}`} className={`block rounded-lg px-3 py-2 text-sm ${c === 'Why OMIX' ? 'font-semibold text-slate-900 bg-white' : 'text-slate-600 hover:bg-white'}`}>{c}</Link>)}
          </nav>
          <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">Need a system built?<br /><a className="font-semibold text-slate-900 hover:underline" href="https://omixsystems.store/">Talk to OMIX →</a></div>
        </aside>
        <main>
          {!category && <section className="mb-8 rounded-2xl bg-slate-950 text-white p-7 md:p-9"><div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400"><Building2 size={15} /> Why OMIX</div><h2 className="mt-3 text-3xl md:text-4xl font-serif">Choosing a software partner is an architecture decision.</h2><p className="mt-3 max-w-2xl text-slate-300 leading-7">Compare our delivery philosophy, integration-first approach and post-launch mindset before you choose a provider.</p><Link to="/category/why-omix" className="mt-5 inline-flex items-center gap-2 font-semibold">Explore Why OMIX <ArrowRight size={16} /></Link></section>}
          <div className="space-y-4">
            {visible.map(article => <article key={article.slug} className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 hover:border-slate-300 transition-colors">
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500"><span className="font-semibold text-slate-700">{article.category}</span><span>•</span><span>{article.readTime}</span></div>
              <h2 className="mt-3 text-2xl md:text-3xl font-serif font-semibold text-slate-950"><Link to={`/wiki/${article.slug}`} className="hover:underline">{article.title}</Link></h2>
              <p className="mt-3 text-slate-600 max-w-3xl leading-7">{article.excerpt}</p>
              <Link to={`/wiki/${article.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">Read article <ArrowRight size={15} /></Link>
            </article>)}
          </div>
          {!category && whyArticles.length > 0 && <section className="mt-10 border-t border-slate-200 pt-8"><h2 className="font-serif text-3xl mb-2">Why companies choose OMIX</h2><p className="text-slate-600 mb-5">Start with these practical guides.</p><div className="grid md:grid-cols-2 gap-4">{whyArticles.map(a => <Link key={a.slug} to={`/wiki/${a.slug}`} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-400"><span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{a.category}</span><h3 className="mt-2 font-serif text-xl">{a.title}</h3><span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">Read <ArrowRight size={14} /></span></Link>)}</div></section>}
        </main>
      </div>
    </div>
  )
}
