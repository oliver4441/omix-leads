import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, BookOpen, ChevronRight, Building2, Search, Sparkles, Layers, ShieldCheck, Zap, ExternalLink, CheckCircle2 } from 'lucide-react'
import { articles, categories } from '../data/articles'
import DocsSidebar from '../components/DocsSidebar'

export default function Wiki({ searchFilter }) {
  const { category } = useParams()
  const [localSearch, setLocalSearch] = useState('')
  const searchQuery = (searchFilter !== undefined ? searchFilter : localSearch).toLowerCase()

  const activeCategory = category ? decodeURIComponent(category).replace(/-/g, ' ') : null

  let visibleArticles = articles
  if (activeCategory) {
    visibleArticles = visibleArticles.filter(a => a.category.toLowerCase() === activeCategory.toLowerCase())
  }
  if (searchQuery.trim() !== '') {
    visibleArticles = visibleArticles.filter(a =>
      a.title.toLowerCase().includes(searchQuery) ||
      a.excerpt.toLowerCase().includes(searchQuery) ||
      a.category.toLowerCase().includes(searchQuery)
    )
  }

  const whyArticles = articles.filter(a => a.category === 'Why OMIX')

  return (
    <div className="bg-[#f8fafc] min-h-screen text-slate-800 font-sans">

      {/* Top Breadcrumb & Hero Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-6 md:py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 font-mono">
            <Link to="/wiki" className="hover:text-slate-900 flex items-center gap-1">
              <BookOpen size={14} className="text-emerald-600" /> OMIX Docs
            </Link>
            <ChevronRight size={12} />
            <span className="text-slate-900 font-semibold">{activeCategory ? activeCategory : 'Get Started & Overview'}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-slate-950">
                {activeCategory ? activeCategory : 'OMIX Documentation & System Notes'}
              </h1>
              <p className="mt-2 text-slate-600 text-sm md:text-base max-w-3xl leading-relaxed">
                Discover why leading businesses choose OMIX Digital Solutions for custom SaaS, modular software architecture, payment engines, and production-ready digital products.
              </p>
            </div>

            {/* Direct Scope Callout */}
            <div className="flex-shrink-0 bg-emerald-950 text-white p-4 rounded-xl border border-emerald-800 shadow-sm max-w-xs">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 font-semibold uppercase tracking-wider mb-1">
                <Zap size={14} /> Ready to Build?
              </div>
              <p className="text-xs text-slate-300 mb-2.5">
                Have a product or system to scope? Visit our primary site or talk with our engineering team.
              </p>
              <a
                href="https://omixsystems.store"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1.5 rounded text-xs transition-colors w-full justify-center"
              >
                Visit omixsystems.store <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Documentation Grid Layout */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8">

        {/* Left Documentation Sidebar */}
        <DocsSidebar />

        {/* Center Main Content Area */}
        <main className="flex-1 min-w-0">

          {/* Welcome Banner Card (OpenHands style) if on home overview */}
          {!category && !searchQuery && (
            <div className="mb-8 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white p-6 md:p-8 border border-slate-800 shadow-lg relative overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 opacity-10 pointer-events-none">
                <Building2 size={240} />
              </div>

              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-3 font-semibold">
                <Sparkles size={15} /> 🙌 Welcome to OMIX Documentation & System Guide
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
                Choosing a software partner is an architecture decision.
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl mb-6">
                At <a href="https://omixsystems.store" className="text-emerald-400 font-semibold underline hover:text-emerald-300">OMIX Systems</a>, we build digital infrastructure, custom SaaS platforms, payment integrations, and business systems designed to operate at scale. Explore our guides below to understand our engineering philosophy and capabilities.
              </p>

              {/* 2x2 Quick Navigation Grid */}
              <div className="grid sm:grid-cols-2 gap-4 pt-2">

                <Link
                  to="/wiki/why-choose-omix"
                  className="group bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 p-4 rounded-xl transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-emerald-400 text-sm flex items-center gap-1.5 font-mono">
                      <Sparkles size={14} /> Why Choose OMIX
                    </span>
                    <ArrowRight size={14} className="text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Compare our integrated product model with conventional web agencies.
                  </p>
                </Link>

                <Link
                  to="/wiki/how-omix-builds-production-saas"
                  className="group bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 p-4 rounded-xl transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-emerald-400 text-sm flex items-center gap-1.5 font-mono">
                      <Zap size={14} /> SaaS & Cloud Infrastructure
                    </span>
                    <ArrowRight size={14} className="text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Multi-tenant platforms, auth, billing engines, and cloud deployments.
                  </p>
                </Link>

                <Link
                  to="/wiki/mpesa-and-api-integrations"
                  className="group bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 p-4 rounded-xl transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-emerald-400 text-sm flex items-center gap-1.5 font-mono">
                      <Layers size={14} /> M-PESA & Payment APIs
                    </span>
                    <ArrowRight size={14} className="text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Resilient webhook handling, transaction reconciliations, and APIs.
                  </p>
                </Link>

                <Link
                  to="/wiki/phikila-and-veyra-case-study"
                  className="group bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 p-4 rounded-xl transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-emerald-400 text-sm flex items-center gap-1.5 font-mono">
                      <ShieldCheck size={14} /> Case Studies: Phikila & Veyra
                    </span>
                    <ArrowRight size={14} className="text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Proof in production: how we build and scale our own active software.
                  </p>
                </Link>

              </div>
            </div>
          )}

          {/* Search / Filter Indicator */}
          {searchQuery && (
            <div className="mb-6 bg-slate-100 border border-slate-200 rounded-lg p-3 text-sm flex items-center justify-between font-mono">
              <span>Showing search results for: <strong className="text-emerald-700">"{searchQuery}"</strong></span>
              <span className="text-xs text-slate-500">Found {visibleArticles.length} article(s)</span>
            </div>
          )}

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Link
              to="/wiki"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                !category
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              All Articles ({articles.length})
            </Link>
            {categories.map((c) => {
              const isActive = activeCategory && activeCategory.toLowerCase() === c.toLowerCase()
              return (
                <Link
                  key={c}
                  to={`/category/${encodeURIComponent(c.toLowerCase().replace(/ /g, '-'))}`}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-600 text-white font-semibold'
                      : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {c}
                </Link>
              )
            })}
          </div>

          {/* Article Grid / List */}
          <div className="space-y-4">
            {visibleArticles.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
                <p className="text-slate-600 font-medium">No documentation found matching your search query.</p>
                <Link to="/wiki" className="mt-3 inline-block text-xs font-bold text-emerald-600 hover:underline">
                  Clear filter & view all docs
                </Link>
              </div>
            ) : (
              visibleArticles.map((article) => (
                <article
                  key={article.slug}
                  className="bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-400 hover:shadow-sm transition-all group"
                >
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-mono mb-2">
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {article.category}
                    </span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                    <span>•</span>
                    <span>Published {article.date}</span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-serif font-bold text-slate-950 mt-1">
                    <Link to={`/wiki/${article.slug}`} className="hover:text-emerald-600 transition-colors">
                      {article.title}
                    </Link>
                  </h2>

                  <p className="mt-2 text-slate-600 text-sm leading-relaxed max-w-3xl">
                    {article.excerpt}
                  </p>

                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
                    <Link
                      to={`/wiki/${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors"
                    >
                      Read full doc <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <a
                      href="https://omixsystems.store"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-mono text-slate-400 hover:text-emerald-600 flex items-center gap-1"
                    >
                      omixsystems.store <ExternalLink size={10} />
                    </a>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Why OMIX Comparison Table Section (like OpenHands Component Map) */}
          {!category && !searchQuery && (
            <section className="mt-12 bg-white border border-slate-200 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-600 font-bold mb-2">
                <CheckCircle2 size={16} /> OMIX Delivery Standard vs Generic Agency
              </div>
              <h2 className="text-2xl font-serif font-bold text-slate-950 mb-4">
                Why organizations choose OMIX Systems as their software partner
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-mono">
                      <th className="py-2.5 px-3 font-bold">Requirement</th>
                      <th className="py-2.5 px-3 font-bold text-emerald-700 bg-emerald-50/50">OMIX Systems</th>
                      <th className="py-2.5 px-3 font-bold text-slate-500">Generic Web Agency</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-3 px-3 font-semibold">Core Focus</td>
                      <td className="py-3 px-3 text-emerald-950 font-medium bg-emerald-50/30">Custom Software, SaaS, APIs & Architecture</td>
                      <td className="py-3 px-3 text-slate-500">Brochure websites & design mockups</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-semibold">Integrations</td>
                      <td className="py-3 px-3 text-emerald-950 font-medium bg-emerald-50/30">First-class (M-PESA, Stripe, Webhooks, CRMs)</td>
                      <td className="py-3 px-3 text-slate-500">Third-party plugins, fragile add-ons</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-semibold">Architecture</td>
                      <td className="py-3 px-3 text-emerald-950 font-medium bg-emerald-50/30">Modular, decoupled, multi-tenant ready</td>
                      <td className="py-3 px-3 text-slate-500">Monolithic templates, hard to scale</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-semibold">Ownership & ROI</td>
                      <td className="py-3 px-3 text-emerald-950 font-medium bg-emerald-50/30">Full source ownership, transparent pricing</td>
                      <td className="py-3 px-3 text-slate-500">Hidden recurring licensing fees</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-600">
                  Ready to upgrade your business infrastructure? Get an exact technical scope.
                </p>
                <a
                  href="https://omixsystems.store/#contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xs px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  Discuss Your Project at omixsystems.store <ArrowRight size={14} />
                </a>
              </div>
            </section>
          )}

        </main>
      </div>
    </div>
  )
}
