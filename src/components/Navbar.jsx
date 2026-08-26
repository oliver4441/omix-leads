import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ExternalLink, Calculator } from 'lucide-react'
import { useState, useEffect } from 'react'

const leadTools = [
  ['Get a Quote', '/quote'],
  ['Refer a Friend', '/referral'],
  ['Sell on OMIX', '/sell-on-omix'],
  ['Business Audit', '/business-audit'],
  ['Deal Alerts', '/deal-alerts'],
  ['Admin', '/admin'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  useEffect(() => setOpen(false), [loc.pathname])

  return <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3">
        <img src="/omix-logo.svg" alt="OMIX Systems" className="w-10 h-10 rounded-lg object-cover ring-1 ring-slate-200" />
        <div><div className="font-serif font-bold text-lg leading-none">OMIX Journal</div><div className="text-[10px] uppercase tracking-wider text-slate-500 mt-1">Knowledge Base</div></div>
      </Link>
      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"><a href="#topics" className="hover:text-slate-950">Topics</a><a href="#latest" className="hover:text-slate-950">Latest</a><Link to="/quote" className="inline-flex items-center gap-1.5 rounded-lg bg-slate-950 text-white px-4 py-2 hover:bg-slate-800 transition-colors">Get a Quote</Link><a href="https://omixsystems.store" className="inline-flex items-center gap-1.5 text-slate-950">OMIX Systems <ExternalLink size={13}/></a></div>
      <button onClick={() => setOpen(!open)} className="md:hidden w-10 h-10 grid place-items-center" aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button>
    </div>
    {open && <div className="md:hidden border-t border-slate-200 bg-white px-5 py-5 space-y-4 text-sm font-medium"><a className="block" href="#topics">Topics</a><a className="block" href="#latest">Latest</a><div className="pt-2 border-t border-slate-100"><p className="text-xs uppercase tracking-wider text-slate-400 mb-2">Lead tools</p>{leadTools.map(([label, to]) => <Link key={to} className="block py-1" to={to}>{label}</Link>)}</div><a className="block" href="https://omixsystems.store">OMIX Systems →</a></div>}
  </nav>
}
