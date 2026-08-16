import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, ChevronRight, Copy, Check, ExternalLink, Sparkles, MessageSquare, ShieldCheck, Zap } from 'lucide-react'
import { articles } from '../data/articles'
import DocsSidebar from '../components/DocsSidebar'

export default function Article() {
  const { slug } = useParams()
  const article = articles.find(a => a.slug === slug)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!article) return
    document.title = `${article.title} — OMIX Docs & Journal`
    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', article.excerpt)
    window.scrollTo(0, 0)
  }, [article])

  const copyPageUrl = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!article) {
    return (
      <div className="bg-[#f8fafc] min-h-screen">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-12 flex gap-8">
          <DocsSidebar />
          <div className="flex-1 bg-white border border-slate-200 rounded-xl p-8 text-center">
            <h1 className="text-2xl font-serif font-bold text-slate-900">Article or Documentation Not Found</h1>
            <p className="mt-2 text-slate-600 text-sm">The documentation page you are looking for does not exist or has been moved.</p>
            <Link className="inline-flex items-center gap-1.5 mt-5 text-xs font-bold bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-500" to="/wiki">
              ← Return to Documentation Index
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Find index for prev/next articles
  const currentIndex = articles.findIndex(a => a.slug === slug)
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { '@type': 'Organization', name: 'OMIX Systems', url: 'https://omixsystems.store/' },
    publisher: { '@type': 'Organization', name: 'OMIX Systems', url: 'https://omixsystems.store/' },
    mainEntityOfPage: `https://blog.omixsystems.store/wiki/${article.slug}`,
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen text-slate-800 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* Breadcrumb Top Bar */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono overflow-x-auto">
            <Link to="/wiki" className="hover:text-slate-900 flex items-center gap-1 flex-shrink-0">
              <BookOpen size={14} className="text-emerald-600" /> OMIX Docs
            </Link>
            <ChevronRight size={12} />
            <span className="text-slate-600 font-medium flex-shrink-0">{article.category}</span>
            <ChevronRight size={12} />
            <span className="text-slate-900 font-semibold truncate max-w-xs">{article.title}</span>
          </div>

          <button
            onClick={copyPageUrl}
            className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded border border-slate-200 transition-colors"
          >
            {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
            <span>{copied ? 'Copied link' : 'Copy link'}</span>
          </button>
        </div>
      </div>

      {/* Main Documentation View */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8">

        {/* Left Sidebar */}
        <DocsSidebar activeSlug={article.slug} />

        {/* Center Main Article Content */}
        <main className="flex-1 min-w-0 bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm">

          {/* Category Tag & Metadata */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500 mb-4">
            <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              {article.category}
            </span>
            <span>•</span>
            <span>{article.readTime}</span>
            <span>•</span>
            <span>Updated {article.date}</span>
          </div>

          {/* Article Title */}
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-950 leading-tight tracking-tight">
            {article.title}
          </h1>

          {/* Lead Excerpt */}
          <p className="mt-4 text-slate-600 text-lg md:text-xl leading-relaxed border-l-4 border-emerald-500 pl-4 bg-slate-50/80 py-3 rounded-r-lg">
            {article.excerpt}
          </p>

          {/* Content Sections */}
          <div className="mt-10 space-y-8 font-sans">
            {article.sections.map(([heading, body], idx) => (
              <section key={heading} id={`section-${idx}`} className="scroll-mt-24">
                <h2 className="text-xl md:text-2xl font-serif font-bold text-slate-950 mb-3 flex items-center gap-2">
                  <span className="text-emerald-600 font-mono text-sm">#</span> {heading}
                </h2>
                <p className="text-slate-700 text-base leading-relaxed">
                  {body}
                </p>

                {/* Inline Callout Box for OMIX Systems pitch where relevant */}
                {idx === 1 && (
                  <div className="mt-5 bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-xl p-5 border border-slate-800">
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider mb-1">
                      <Sparkles size={14} /> The OMIX Systems Engineering Standard
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Need custom software or SaaS infrastructure like this? OMIX provides end-to-end architecture, API integrations, and cloud deployment.
                    </p>
                    <a
                      href="https://omixsystems.store"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:underline mt-2.5"
                    >
                      Visit omixsystems.store to get started <ExternalLink size={12} />
                    </a>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Article Footer CTA Banner */}
          <div className="mt-12 rounded-2xl bg-slate-950 text-white p-6 md:p-8 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-2">
              <Zap size={15} /> Build with OMIX Digital Solutions
            </div>
            <h3 className="text-2xl font-serif font-bold mb-2">Have a system like this in mind?</h3>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed mb-6">
              Take your project from a raw problem statement into a production-ready digital product with modular architecture and clean APIs.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://omixsystems.store/#contact"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-lg text-xs transition-colors flex items-center gap-1.5"
              >
                Discuss a Project <ArrowRight size={15} />
              </a>
              <a
                href="https://omixsystems.store/#pricing"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium px-4 py-2.5 rounded-lg text-xs transition-colors flex items-center gap-1"
              >
                View Scope Pricing <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Previous / Next Documentation Navigation */}
          <div className="mt-10 pt-6 border-t border-slate-200 grid sm:grid-cols-2 gap-4 text-xs">
            {prevArticle ? (
              <Link
                to={`/wiki/${prevArticle.slug}`}
                className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-slate-50 transition-all text-left block"
              >
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">← Previous Doc</span>
                <span className="font-bold text-slate-900 line-clamp-1">{prevArticle.title}</span>
              </Link>
            ) : <div />}

            {nextArticle ? (
              <Link
                to={`/wiki/${nextArticle.slug}`}
                className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-slate-50 transition-all text-right block ml-auto w-full"
              >
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Next Doc →</span>
                <span className="font-bold text-slate-900 line-clamp-1">{nextArticle.title}</span>
              </Link>
            ) : <div />}
          </div>

        </main>

        {/* Right Sidebar: Table of Contents & Quick Actions */}
        <aside className="w-full lg:w-64 flex-shrink-0 text-slate-700 text-xs py-2 lg:py-0">
          <div className="sticky top-20 space-y-6">

            {/* Table of Contents */}
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3">
                On this page
              </h4>
              <ul className="space-y-2">
                {article.sections.map(([heading], idx) => (
                  <li key={heading}>
                    <a
                      href={`#section-${idx}`}
                      className="text-slate-600 hover:text-emerald-600 transition-colors block truncate"
                    >
                      {heading}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Actions / Share Card */}
            <div className="bg-slate-900 text-slate-200 rounded-xl p-4 border border-slate-800">
              <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-2">
                Why OMIX?
              </h4>
              <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                OMIX delivers custom software, SaaS, and integrations without bloated agency costs.
              </p>
              <a
                href="https://omixsystems.store"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-1.5 px-3 rounded text-[11px] transition-colors"
              >
                Visit omixsystems.store →
              </a>
            </div>

          </div>
        </aside>

      </div>
    </div>
  )
}
