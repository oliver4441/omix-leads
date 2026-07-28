import { Link } from 'react-router-dom'
import { Bell, Store, Gift, Search, Calculator, ArrowRight, ShoppingCart, Users, Globe, Star, TrendingUp, Shield } from 'lucide-react'
import { OMIX_STORE_URL } from '../lib/constants'

const storeCards = [
  {
    icon: Bell,
    title: 'Deal Alerts',
    desc: 'Get notified about hot deals and price drops on products you love across Kenya.',
    link: '/deals',
    gradient: 'from-red-500 to-orange-500',
  },
  {
    icon: Store,
    title: 'Sell on Omix',
    desc: 'List your products and reach thousands of customers across all 47 counties.',
    link: '/sell',
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    icon: Gift,
    title: 'Refer & Earn',
    desc: 'Share your referral code and earn KES 100 for every friend who shops or sells.',
    link: '/referral',
    gradient: 'from-pink-500 to-rose-500',
  },
]

const systemsCards = [
  {
    icon: Search,
    title: 'Free Business Audit',
    desc: 'Get a free digital presence score and actionable tips to grow your business online.',
    link: '/audit',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: Calculator,
    title: 'Get a Website Quote',
    desc: 'Custom website pricing — pick features, see your instant quote in KES.',
    link: '/quote',
    gradient: 'from-purple-500 to-indigo-500',
  },
]

const stats = [
  { value: '5,000+', label: 'Products Listed', icon: ShoppingCart },
  { value: '1,200+', label: 'Happy Customers', icon: Users },
  { value: '47', label: 'Counties Served', icon: Globe },
]

const reasons = [
  { icon: Star, title: 'Local Focus', desc: 'Built specifically for Kenyan businesses and shoppers, with M-Pesa and local delivery in mind.' },
  { icon: TrendingUp, title: 'Grow Faster', desc: 'List products, get a website, or find deals — all designed to help you scale.' },
  { icon: Shield, title: 'Trusted Platform', desc: 'Thousands of Kenyan businesses trust Omix for their digital growth.' },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand via-brand-dark to-purple-700 text-white">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Floating gradient orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-white/5 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-32 text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm font-medium mb-6">
              <Star className="w-3.5 h-3.5" />
              Trusted by 1,200+ Kenyan businesses
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-5 drop-shadow-lg animate-slide-up">
            Grow Your Business
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-100">
              with Omix
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Shop deals, sell products, or get a professional website — all in one place for Kenyan businesses.
          </p>

          <div className="flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <a
              href={OMIX_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-white text-brand font-semibold px-6 py-3.5 rounded-xl hover:shadow-xl hover:scale-105 active:scale-[1.02] transition-all shadow-lg"
            >
              <ShoppingCart size={20} />
              Shop Now
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <Link
              to="/audit"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/20 transition-all border border-white/20 hover:border-white/30"
            >
              <Search size={20} />
              Free Audit
            </Link>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/20 transition-all border border-white/20 hover:border-white/30"
            >
              <Calculator size={20} />
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="relative -mt-10 z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl border border-zinc-100 p-6 md:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="flex items-center gap-4 animate-slide-up"
                style={{ animationDelay: `${0.3 + i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-brand-bg flex items-center justify-center shrink-0">
                  <s.icon className="text-brand" size={22} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-zinc-900">{s.value}</div>
                  <div className="text-sm text-zinc-500">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Omix */}
      <section className="py-16 md:py-20 bg-warm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-zinc-900 mb-3">
              Why Omix?
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto">
              Everything you need to grow your business — from shopping to selling to building your online presence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reasons.map((r, i) => (
              <div
                key={r.title}
                className="bg-white rounded-2xl p-6 border border-zinc-100 card-hover"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-bg flex items-center justify-center mb-4">
                  <r.icon className="text-brand" size={20} />
                </div>
                <h3 className="font-semibold text-zinc-900 mb-2">{r.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Store Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-zinc-900 mb-3">
              Omix Store
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto">
              Shop, sell, and save — all on the Omix marketplace.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {storeCards.map((card) => (
              <Link
                key={card.title}
                to={card.link}
                className="group relative bg-white rounded-2xl p-6 border border-zinc-100 card-hover overflow-hidden"
              >
                {/* Gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient} opacity-60`} />
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4 shadow-sm`}>
                  <card.icon size={22} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2 group-hover:text-brand transition-colors">{card.title}</h3>
                <p className="text-sm text-zinc-500 mb-4 leading-relaxed">{card.desc}</p>
                <span className="inline-flex items-center gap-1 text-brand text-sm font-medium group-hover:gap-2 transition-all">
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Systems Section */}
      <section className="py-16 md:py-20 bg-warm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-zinc-900 mb-3">
              Omix Systems
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto">
              Professional websites & digital solutions for your business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {systemsCards.map((card) => (
              <Link
                key={card.title}
                to={card.link}
                className="group relative bg-white rounded-2xl p-6 border border-zinc-100 card-hover overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient} opacity-60`} />
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4 shadow-sm`}>
                  <card.icon size={22} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2 group-hover:text-brand transition-colors">{card.title}</h3>
                <p className="text-sm text-zinc-500 mb-4 leading-relaxed">{card.desc}</p>
                <span className="inline-flex items-center gap-1 text-purple-600 text-sm font-medium group-hover:gap-2 transition-all">
                  Get started <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Ready to Take Your Business Online?
          </h2>
          <p className="text-zinc-400 mb-10 max-w-xl mx-auto">
            Get a free digital audit or an instant website quote — no commitment required, no strings attached.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/audit"
              className="group inline-flex items-center gap-2 bg-white text-zinc-900 font-semibold px-6 py-3.5 rounded-xl hover:shadow-xl hover:scale-105 active:scale-[1.02] transition-all"
            >
              <Search size={18} />
              Free Audit
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/20 transition-all border border-white/20"
            >
              <Calculator size={18} />
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
