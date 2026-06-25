import { Link, useLocation } from 'react-router-dom'
import { Zap, Building2, ShoppingCart, Megaphone, Users, BarChart3 } from 'lucide-react'

export default function Navbar() {
  const loc = useLocation()
  const isAdmin = loc.pathname.startsWith('/admin')
  if (isAdmin) return null

  const links = [
    { to: '/audit', label: 'Free Audit', icon: Building2 },
    { to: '/quote', label: 'Get Quote', icon: Zap },
    { to: '/deals', label: 'Deal Alerts', icon: Megaphone },
    { to: '/sell', label: 'Sell on Omix', icon: ShoppingCart },
    { to: '/referral', label: 'Refer & Earn', icon: Users },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#ff385c] rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-lg text-zinc-900">Omix<span className="text-[#ff385c]">Leads</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <Link key={l.to} to={l.to}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${loc.pathname === l.to ? 'bg-[#ff385c]/10 text-[#ff385c]' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'}`}>
                <l.icon className="w-3.5 h-3.5" /> {l.label}
              </Link>
            ))}
          </div>
          <Link to="/admin/login" className="flex items-center gap-1.5 px-4 py-2 bg-zinc-900 text-white text-sm font-bold rounded-lg hover:bg-zinc-800 transition-colors">
            <BarChart3 className="w-3.5 h-3.5" /> Dashboard
          </Link>
        </div>
        <div className="flex md:hidden gap-1 pb-3 overflow-x-auto -mx-4 px-4">
          {links.map(l => (
            <Link key={l.to} to={l.to}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${loc.pathname === l.to ? 'bg-[#ff385c]/10 text-[#ff385c]' : 'text-zinc-500'}`}>
              <l.icon className="w-3 h-3" /> {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
