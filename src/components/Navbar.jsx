import { Link, useLocation } from 'react-router-dom'
import { BookOpen, Menu, X, ExternalLink } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  useEffect(() => setOpen(false), [loc.pathname])

  return <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-slate-950 text-white grid place-items-center"><BookOpen size={17}/></div><div><div className="font-serif font-bold text-lg leading-none">OMIX Journal</div><div className="text-[10px] uppercase tracking-wider text-slate-500 mt-1">Knowledge Base</div></div></Link>
      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"><a href="#topics" className="hover:text-slate-950">Topics</a><a href="#latest" className="hover:text-slate-950">Latest</a><a href="https://omixsystems.com" className="inline-flex items-center gap-1.5 text-slate-950">OMIX Systems <ExternalLink size={13}/></a></div>
      <button onClick={() => setOpen(!open)} className="md:hidden w-10 h-10 grid place-items-center" aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button>
    </div>
    {open && <div className="md:hidden border-t border-slate-200 bg-white px-5 py-5 space-y-4 text-sm font-medium"><a className="block" href="#topics">Topics</a><a className="block" href="#latest">Latest</a><a className="block" href="https://omixsystems.com">OMIX Systems →</a><a className="block" href="https://admin.omixsystems.store">Gideon Langat →</a></div>}
  </nav>
}
