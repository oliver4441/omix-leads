import { Zap, Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react'
import { OMIX_STORE_URL } from '../lib/constants'
import { Link } from 'react-router-dom'

const sections = [
  {
    title: 'Store Leads',
    links: [
      { to: '/deals', label: 'Deal Alerts' },
      { to: '/sell', label: 'Sell on Omix' },
      { to: '/referral', label: 'Refer & Earn' },
      { href: OMIX_STORE_URL, label: 'Shop Omix Store', external: true },
    ],
  },
  {
    title: 'Web Dev Leads',
    links: [
      { to: '/audit', label: 'Free Business Audit' },
      { to: '/quote', label: 'Get a Website Quote' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-14 lg:py-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 bg-gradient-to-br from-brand to-brand-light rounded-xl flex items-center justify-center shadow-sm">
                <Zap className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="font-black text-lg tracking-tight">
                Omix<span className="text-brand">Leads</span>
              </span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
              Growing Omix Store and Omixsystems through smart lead generation across Kenya.
            </p>
          </div>

          {/* Link sections */}
          {sections.map(s => (
            <div key={s.title}>
              <h4 className="font-semibold text-xs text-zinc-400 uppercase tracking-widest mb-4">{s.title}</h4>
              <ul className="space-y-3">
                {s.links.map(l => (
                  <li key={l.label}>
                    {l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors"
                      >
                        {l.label}
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    ) : (
                      <Link
                        to={l.to}
                        className="text-sm text-zinc-400 hover:text-white transition-colors"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-xs text-zinc-400 uppercase tracking-widest mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-zinc-300" />
                </span>
                <a href="tel:+254768213649" className="hover:text-white transition-colors">+254 768 213 649</a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 text-zinc-300" />
                </span>
                <a href="mailto:omixsystems@gmail.com" className="hover:text-white transition-colors">omixsystems@gmail.com</a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-zinc-300" />
                </span>
                <span>Kericho, Kenya</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} OmixSystems Ltd. All rights reserved.
          </p>
          <p className="text-xs text-zinc-600">
            Designed by <span className="text-zinc-400">OmixSystems</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
