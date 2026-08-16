import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react'
import { articles } from '../data/articles'

export default function Article() {
  const { slug } = useParams()
  const article = articles.find(a => a.slug === slug)

  useEffect(() => {
    if (!article) return
    document.title = `${article.title} — OMIX Journal`
    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', article.excerpt)
  }, [article])

  if (!article) return <div className="max-w-3xl mx-auto px-5 py-24"><h1 className="text-3xl font-serif">Article not found</h1><Link className="inline-flex mt-5 text-sm font-semibold" to="/wiki">← Back to the knowledge base</Link></div>

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { '@type': 'Organization', name: 'OMIX Systems', url: 'https://omixsystems.store/' },
    publisher: { '@type': 'Organization', name: 'OMIX Systems', url: 'https://omixsystems.store/' },
    mainEntityOfPage: `https://blog.omixsystems.store/wiki/${article.slug}`,
  }

  return <article className="bg-white min-h-screen">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <div className="max-w-3xl mx-auto px-5 py-12 md:py-20">
      <Link to="/wiki" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"><ArrowLeft size={15} /> Knowledge Base</Link>
      <div className="mt-10 flex items-center gap-3 text-sm text-slate-500"><span className="font-semibold text-slate-800">{article.category}</span><span>•</span><span>{article.date}</span><span>•</span><span>{article.readTime}</span></div>
      <h1 className="mt-4 text-4xl md:text-6xl leading-tight font-serif font-semibold tracking-tight text-slate-950">{article.title}</h1>
      <p className="mt-6 text-xl leading-8 text-slate-600">{article.excerpt}</p>
      <div className="mt-12 space-y-10">
        {article.sections.map(([heading, body]) => <section key={heading}><h2 className="text-2xl font-serif font-semibold text-slate-950">{heading}</h2><p className="mt-3 text-slate-700 leading-8">{body}</p></section>)}
      </div>
      <div className="mt-16 rounded-2xl border border-slate-200 bg-[#f7f8fa] p-7">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500"><BookOpen size={14} /> Built by OMIX</div>
        <h2 className="mt-3 text-2xl font-serif font-semibold">Have a system like this in mind?</h2>
        <p className="mt-2 text-slate-600">OMIX builds modular digital products, business systems and integrations.</p>
        <a href="https://omixsystems.store/" className="mt-5 inline-flex items-center gap-2 font-semibold text-slate-950">Discuss a project <ArrowRight size={16} /></a>
      </div>
    </div>
  </article>
}
