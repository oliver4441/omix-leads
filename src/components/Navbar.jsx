import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ExternalLink, Search, Sparkles, BookOpen, Layers, Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Navbar({ searchFilter, setSearchFilter, theme, toggleTheme }) {
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  useEffect(() => setOpen(false), [loc.pathname])

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 backdrop-blur-md transition-colors">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        {/* Brand Logo & Title */}
        <div className="flex items-center gap-4">
          <Link to="/wiki" className="flex items-center gap-3 group">
            <img
              src="/omix-logo.svg"
              alt="OMIX Systems"
              className="w-9 h-9 rounded-lg object-cover ring-2 ring-emerald-500/30 group-hover:ring-emerald-400 transition-all"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900 dark:text-white tracking-tight font-serif text-lg">OMIX</span>
                <span className="bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30 uppercase tracking-wider font-semibold">Docs & Journal</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block font-mono">Software Architecture & Systems</p>
            </div>
          </Link>
        </div>

        {/* Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search docs, features, why choose OMIX..."
              value={searchFilter || ''}
              onChange={(e) => setSearchFilter && setSearchFilter(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-200 placeholder-slate-500 pl-9 pr-12 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-sans"
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-1.5 py-0.5 rounded">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Header Links, Theme Toggle & CTA */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-300">
          <Link to="/wiki" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5">
            <BookOpen size={14} /> Documentation
          </Link>
          <Link to="/category/why-omix" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5">
            <Sparkles size={14} className="text-emerald-600 dark:text-emerald-400" /> Why OMIX?
          </Link>
          <Link to="/category/engineering" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5">
            <Layers size={14} /> Engineering
          </Link>
          <a
            href="https://omixsystems.store"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1"
          >
            omixsystems.store <ExternalLink size={12} />
          </a>

          {/* Dark / Light Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors"
            aria-label="Toggle light/dark theme"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-indigo-600" />}
          </button>

          <a
            href="https://omixsystems.store/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3.5 py-1.5 rounded-md text-xs transition-colors flex items-center gap-1.5 shadow-sm"
          >
            Discuss a Project →
          </a>
        </div>

        {/* Mobile menu button & theme toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-600" />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900"
            aria-label="Toggle menu"
          >
            {open ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>

      </div>

      {/* Mobile navigation panel */}
      {open && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-5 py-4 space-y-3 text-sm font-medium">
          <div className="relative w-full mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search docs & articles..."
              value={searchFilter || ''}
              onChange={(e) => setSearchFilter && setSearchFilter(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-200 placeholder-slate-500 pl-9 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <Link to="/wiki" className="block text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 py-1">📚 Documentation Index</Link>
          <Link to="/category/why-omix" className="block text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 py-1">✨ Why Choose OMIX?</Link>
          <Link to="/category/engineering" className="block text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 py-1">⚙️ Engineering & Architecture</Link>
          <Link to="/category/products" className="block text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 py-1">🚀 Products & Case Studies</Link>
          <a href="https://omixsystems.store" className="block text-emerald-600 dark:text-emerald-400 hover:underline py-1 flex items-center gap-1">
            Visit OMIX Systems (omixsystems.store) <ExternalLink size={13} />
          </a>
          <a href="https://omixsystems.store/#pricing" className="block text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 py-1">
            Pricing & Packages
          </a>
          <a
            href="https://omixsystems.store/#contact"
            className="block text-center bg-emerald-500 text-slate-950 font-bold py-2 rounded-lg mt-3"
          >
            Discuss a Project →
          </a>
        </div>
      )}
    </header>
  )
}
