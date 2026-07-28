import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Zap, Building2, ShoppingCart, Megaphone, Users, BarChart3, Menu, X } from 'lucide-react'

export default function Navbar() {
  const loc = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isAdmin = loc.pathname.startsWith('/admin')
  if (isAdmin) return null

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [loc.pathname])

  const links = [
    { to: '/audit', label: 'Free Audit', icon: Building2 },
    { to: '/quote', label: 'Get Quote', icon: Zap },
    { to: '/deals', label: 'Deal Alerts', icon: Megaphone },
    { to: '/sell', label: 'Sell on Omix', icon: ShoppingCart },
    { to: '/referral', label: 'Refer & Earn', icon: Users },
  ]

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-zinc-100'
        : 'bg-white/70 backdrop-blur-sm border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-brand to-brand-light rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <Zap className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-black text-xl tracking-tight text-zinc-900">
              Omix<span className="text-brand">Leads</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {links.map(l => {
              const active = loc.pathname === l.to
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-brand-bg text-brand shadow-sm'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                  }`}
                >
                  <l.icon className={`w-3.5 h-3.5 ${active ? 'text-brand' : ''}`} />
                  {l.label}
                </Link>
              )
            })}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <Link
              to="/admin/login"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-900 text-white text-sm font-semibold rounded-xl hover:bg-zinc-800 transition-all hover:shadow-md active:scale-[0.98]"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Dashboard
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl text-zinc-600 hover:bg-zinc-100 transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden animate-fade-in">
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setOpen(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl animate-slide-up max-h-[80vh] overflow-y-auto">
            <div className="p-5 pb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Navigation</span>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-100 transition-colors"
                >
                  <X className="w-4 h-4 text-zinc-400" />
                </button>
              </div>
              <div className="space-y-1">
                {links.map(l => {
                  const active = loc.pathname === l.to
                  return (
                    <Link
                      key={l.to}
                      to={l.to}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        active
                          ? 'bg-brand-bg text-brand'
                          : 'text-zinc-700 hover:bg-zinc-50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        active ? 'bg-brand text-white' : 'bg-zinc-100 text-zinc-500'
                      }`}>
                        <l.icon className="w-4 h-4" />
                      </div>
                      <span>{l.label}</span>
                    </Link>
                  )
                })}
              </div>
              <hr className="my-4 border-zinc-100" />
              <Link
                to="/admin/login"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-zinc-900 text-white hover:bg-zinc-800 transition-colors"
              >
                <BarChart3 className="w-4 h-4" />
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
