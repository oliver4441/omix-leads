import { Link, useLocation } from 'react-router-dom'
import { articles } from '../data/articles'
import { BookOpen, Sparkles, Layers, PackageCheck, ExternalLink, ChevronRight, MessageSquare, ShieldCheck, Zap } from 'lucide-react'

export default function DocsSidebar({ activeSlug }) {
  const location = useLocation()

  // Categorize articles into docs groups
  const getStarted = articles.filter(a => a.category === 'Why OMIX')
  const engineering = articles.filter(a => a.category === 'Engineering')
  const products = articles.filter(a => a.category === 'Products' || a.category === 'Business Technology')

  const isLinkActive = (slug) => {
    return location.pathname === `/wiki/${slug}` || location.pathname === `/articles/${slug}` || activeSlug === slug
  }

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 text-slate-700 text-sm py-6 lg:py-8 lg:pr-6 border-b lg:border-b-0 lg:border-r border-slate-200">
      <div className="sticky top-20 space-y-8">

        {/* Navigation Group: GET STARTED / WHY OMIX */}
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3 font-mono">
            <Sparkles size={13} className="text-emerald-600" /> Get Started & Why OMIX
          </div>
          <ul className="space-y-1 font-medium text-xs">
            <li>
              <Link
                to="/wiki"
                className={`flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
                  location.pathname === '/wiki' && !activeSlug
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>Documentation Overview</span>
                <ChevronRight size={12} className="opacity-50" />
              </Link>
            </li>
            {getStarted.map((art) => (
              <li key={art.slug}>
                <Link
                  to={`/wiki/${art.slug}`}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
                    isLinkActive(art.slug)
                      ? 'bg-emerald-50 text-emerald-900 font-semibold border-l-2 border-emerald-500'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span className="truncate">{art.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation Group: CAPABILITIES & ENGINEERING */}
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3 font-mono">
            <Layers size={13} className="text-slate-500" /> Capabilities & Engineering
          </div>
          <ul className="space-y-1 font-medium text-xs">
            {engineering.map((art) => (
              <li key={art.slug}>
                <Link
                  to={`/wiki/${art.slug}`}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
                    isLinkActive(art.slug)
                      ? 'bg-emerald-50 text-emerald-900 font-semibold border-l-2 border-emerald-500'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span className="truncate">{art.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation Group: PRODUCTS & CASE STUDIES */}
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3 font-mono">
            <PackageCheck size={13} className="text-slate-500" /> Products & Case Studies
          </div>
          <ul className="space-y-1 font-medium text-xs">
            {products.map((art) => (
              <li key={art.slug}>
                <Link
                  to={`/wiki/${art.slug}`}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
                    isLinkActive(art.slug)
                      ? 'bg-emerald-50 text-emerald-900 font-semibold border-l-2 border-emerald-500'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span className="truncate">{art.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* OMIX Store Conversion Box in Sidebar */}
        <div className="rounded-xl bg-gradient-to-br from-slate-950 to-slate-900 text-white p-4 text-xs border border-slate-800 shadow-md">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-semibold mb-1">
            <Zap size={13} /> Built by OMIX Systems
          </div>
          <h4 className="font-serif font-bold text-sm text-white mb-1.5">Need custom software?</h4>
          <p className="text-slate-300 leading-5 text-[11px] mb-3">
            SaaS platforms, M-PESA APIs, and custom enterprise software delivered with speed & scale.
          </p>
          <div className="space-y-1.5">
            <a
              href="https://omixsystems.store"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-1.5 px-3 rounded text-center block text-[11px] transition-colors"
            >
              Visit omixsystems.store →
            </a>
            <a
              href="https://omixsystems.store/#pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 py-1 px-3 rounded text-center block text-[10px] font-mono transition-colors"
            >
              View Pricing Packages
            </a>
          </div>
        </div>

      </div>
    </aside>
  )
}
