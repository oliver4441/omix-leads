import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ExternalLink, Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Navbar({ darkMode, onToggleTheme }) {
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  useEffect(() => setOpen(false), [loc.pathname])

  return <nav className="site-nav sticky top-0 z-50 backdrop-blur-xl">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3 min-w-0">
        <img src="/omix-logo.svg" alt="OMIX Systems" className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 dark-ring" />
        <div className="min-w-0"><div className="font-serif font-bold text-lg leading-none">OMIX Journal</div><div className="text-[10px] uppercase tracking-wider text-slate-500 mt-1">Knowledge Base</div></div>
      </Link>
      <div className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-600">
        <Link to="/#topics" className="nav-link">Topics</Link>
        <Link to="/#latest" className="nav-link">Latest</Link>
        <a href="https://omixsystems.store" className="nav-link inline-flex items-center gap-1.5">OMIX Systems <ExternalLink size={13}/></a>
        <button onClick={onToggleTheme} className="theme-toggle" aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} title={darkMode ? 'Light mode' : 'Dark mode'}>{darkMode ? <Sun size={17}/> : <Moon size={17}/>}</button>
      </div>
      <div className="flex items-center gap-2 md:hidden">
        <button onClick={onToggleTheme} className="theme-toggle" aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>{darkMode ? <Sun size={17}/> : <Moon size={17}/>}</button>
        <button onClick={() => setOpen(!open)} className="w-10 h-10 grid place-items-center rounded-lg hover:bg-slate-100 dark-hover" aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button>
      </div>
    </div>
    {open && <div className="mobile-menu md:hidden px-5 py-5 space-y-2 text-sm font-medium">
      <Link className="block rounded-lg px-3 py-2" to="/#topics">Topics</Link>
      <Link className="block rounded-lg px-3 py-2" to="/#latest">Latest</Link>
      <a className="block rounded-lg px-3 py-2" href="https://omixsystems.store">OMIX Systems →</a>
      <a className="block rounded-lg px-3 py-2" href="https://admin.omixsystems.store">Gideon Langat →</a>
    </div>}
  </nav>
}
