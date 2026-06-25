import { Link } from 'react-router-dom';
import { Bell, Store, Gift, Search, Calculator, ArrowRight, Globe, ShoppingCart, Users } from 'lucide-react';
import { OMIX_STORE_URL } from '../lib/constants';

const storeCards = [
  {
    icon: Bell,
    title: 'Deal Alerts',
    desc: 'Get notified about hot deals and price drops on products you love.',
    link: '/deals',
    color: 'bg-red-50 text-red-600',
  },
  {
    icon: Store,
    title: 'Sell on Omix',
    desc: 'List your products and reach thousands of customers across Kenya.',
    link: '/sell',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: Gift,
    title: 'Refer & Earn',
    desc: 'Share your referral code and earn KES 100 for every friend who shops.',
    link: '/referral',
    color: 'bg-pink-50 text-pink-600',
  },
];

const systemsCards = [
  {
    icon: Search,
    title: 'Free Business Audit',
    desc: 'Get a free digital presence score and actionable tips to grow online.',
    link: '/audit',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Calculator,
    title: 'Get a Website Quote',
    desc: 'Custom website pricing — pick features, see your instant quote.',
    link: '/quote',
    color: 'bg-violet-50 text-violet-600',
  },
];

const stats = [
  { value: '5,000+', label: 'Products', icon: ShoppingCart },
  { value: '1,200+', label: 'Happy Customers', icon: Users },
  { value: '47', label: 'Counties Served', icon: Globe },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#ff385c] via-red-500 to-orange-500 text-white">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0tNC0yaC0ydi0yaDJ2MnptLTQgMGgtMnYtMmgydjJ6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            Grow Your Business with Omix
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-90">
            Shop deals, sell products, or get a professional website — all in one place for Kenyan businesses.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={OMIX_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#ff385c] font-semibold px-6 py-3 rounded-full hover:scale-105 transition-transform shadow-lg"
            >
              <ShoppingCart size={20} /> Shop Now
            </a>
            <Link
              to="/audit"
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white font-semibold px-6 py-3 rounded-full hover:bg-white/30 transition-colors border border-white/30"
            >
              <Search size={20} /> Free Audit
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-10 border-b">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2">
              <s.icon className="text-[#ff385c]" size={28} />
              <span className="text-3xl font-bold text-gray-900">{s.value}</span>
              <span className="text-sm text-gray-500">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Store Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Omix Store</h2>
          <p className="text-gray-500 text-center mb-10">Shop, sell, and save — all on the Omix marketplace</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {storeCards.map((card) => (
              <Link
                key={card.title}
                to={card.link}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100 hover:border-[#ff385c]/30"
              >
                <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center mb-4`}>
                  <card.icon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{card.desc}</p>
                <span className="inline-flex items-center gap-1 text-[#ff385c] text-sm font-medium group-hover:gap-2 transition-all">
                  Learn more <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Systems Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Omix Systems</h2>
          <p className="text-gray-500 text-center mb-10">Professional websites & digital solutions for your business</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {systemsCards.map((card) => (
              <Link
                key={card.title}
                to={card.link}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100 hover:border-purple-300"
              >
                <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center mb-4`}>
                  <card.icon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{card.desc}</p>
                <span className="inline-flex items-center gap-1 text-purple-600 text-sm font-medium group-hover:gap-2 transition-all">
                  Get started <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-[#ff385c] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Take Your Business Online?</h2>
          <p className="opacity-90 mb-8">Get a free audit or an instant website quote — no commitment required.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/audit" className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-full hover:scale-105 transition-transform">
              Free Audit
            </Link>
            <Link to="/quote" className="bg-white/20 backdrop-blur font-semibold px-6 py-3 rounded-full hover:bg-white/30 transition-colors border border-white/30">
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
