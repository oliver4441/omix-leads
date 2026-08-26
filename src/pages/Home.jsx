import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, ExternalLink, Code2, Cloud, ShieldCheck, Boxes, Building2, Calculator, Gift, Store, Search, Bell } from 'lucide-react'
import { articles } from '../data/articles'

const topics = [
  ['Engineering', Code2], ['Architecture', Boxes], ['Cloud & Infrastructure', Cloud], ['Security', ShieldCheck], ['Why OMIX', Building2],
]

export default function Home() {
  const latest = articles.slice(-6).reverse()
  return (
    <div>
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 md:py-28">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold tracking-[0.18em] uppercase text-slate-500 mb-5">OMIX JOURNAL · KNOWLEDGE BASE</p>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl leading-[0.98] tracking-tight text-slate-950 mb-7">Ideas, engineering notes and lessons from building software.</h1>
            <p className="text-lg md:text-xl leading-8 text-slate-600 max-w-2xl mb-9">A wiki-style publication from OMIX Digital Solutions covering engineering, architecture, products, business technology and how we work.</p>
            <div className="flex flex-wrap gap-3">
              <a href="https://omixsystems.store" className="inline-flex items-center gap-2 rounded-lg bg-slate-950 text-white px-5 py-3 font-semibold hover:bg-slate-800 transition-colors">Visit OMIX Systems <ArrowRight size={17} /></a>
              <Link to="/category/why-omix" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 hover:border-slate-500 transition-colors">Why choose OMIX? <ArrowRight size={16} /></Link>
              <a href="https://admin.omixsystems.store" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 hover:border-slate-500 transition-colors">Gideon Langat <ExternalLink size={16} /></a>
            </div>
          </div>
        </div>
      </section>
      <section id="latest" className="border-b border-slate-200 bg-[#f7f8fa]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 grid lg:grid-cols-[1fr_320px] gap-10">
          <div>
            <div className="flex items-center justify-between mb-6"><h2 className="font-serif text-3xl text-slate-950">Latest notes</h2><span className="text-sm text-slate-500">Curated by OMIX</span></div>
            <div className="space-y-4">
              {latest.map(a => <article key={a.slug} className="bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-400 transition-colors"><div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3"><span>{a.category}</span><span>·</span><span>{a.readTime}</span></div><h3 className="font-serif text-2xl text-slate-950 mb-2"><Link to={`/wiki/${a.slug}`} className="hover:underline">{a.title}</Link></h3><p className="text-slate-600 leading-7 max-w-2xl">{a.excerpt}</p><Link to={`/wiki/${a.slug}`} className="mt-4 text-sm font-semibold text-slate-900 inline-flex items-center gap-1">Read article <ArrowRight size={14} /></Link></article>)}
            </div>
          </div>
          <aside className="lg:border-l lg:border-slate-200 lg:pl-8"><div className="sticky top-24"><h2 className="text-xs font-bold tracking-[0.18em] uppercase text-slate-500 mb-4">Explore the wiki</h2><div className="space-y-2">{topics.map(([name, Icon]) => <Link key={name} to={`/category/${encodeURIComponent(name.toLowerCase().replace(/ /g, '-'))}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 transition-colors"><span className="flex items-center gap-3 font-medium"><Icon size={17} className="text-slate-500" />{name}</span><ArrowRight size={15} className="text-slate-400" /></Link>)}</div><div className="mt-8 rounded-xl bg-slate-950 text-white p-6"><p className="text-xs uppercase tracking-wider text-slate-400 mb-2">Build with OMIX</p><h3 className="font-serif text-2xl mb-3">Have a system to build?</h3><p className="text-sm leading-6 text-slate-300 mb-5">Take the conversation from an idea to a practical digital product.</p><a href="https://omixsystems.store/#contact" className="inline-flex items-center gap-2 font-semibold text-white">Discuss a project <ArrowRight size={15} /></a></div></div></aside>
        </div>
      </section>
      <section id="topics" className="bg-white border-b border-slate-200"><div className="max-w-7xl mx-auto px-5 sm:px-8 py-16"><div className="flex items-center gap-3 mb-8"><BookOpen size={21} /><h2 className="font-serif text-3xl">Knowledge areas</h2></div><div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">{topics.map(([name, Icon]) => <Link key={name} to={`/category/${encodeURIComponent(name.toLowerCase().replace(/ /g, '-'))}`} className="border border-slate-200 rounded-xl p-6 hover:border-slate-400"><Icon size={22} className="mb-5 text-slate-500" /><h3 className="font-semibold mb-2">{name}</h3><p className="text-sm leading-6 text-slate-600">Notes, guides and practical thinking around {name.toLowerCase()}.</p></Link>)}</div></div></section>
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
          <div className="flex items-center gap-3 mb-3"><Calculator size={21} /><h2 className="font-serif text-3xl">Lead tools</h2></div>
          <p className="text-slate-600 mb-8 max-w-2xl">Everything you need to start a project, refer a client, or sell with OMIX.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              ['Get a Quote', 'Estimate your project cost in minutes.', '/quote', Calculator],
              ['Refer a Friend', 'Earn rewards when referrals convert.', '/referral', Gift],
              ['Sell on OMIX', 'List your products on the OMIX marketplace.', '/sell-on-omix', Store],
              ['Free Business Audit', 'See where your digital presence can improve.', '/business-audit', Search],
              ['Deal Alerts', 'Get notified about limited-time offers.', '/deal-alerts', Bell],
              ['Admin', 'Staff dashboard for lead management.', '/admin', Building2],
            ].map(([title, desc, to, Icon]) => (
              <Link key={to} to={to} className="group border border-slate-200 rounded-xl p-6 hover:border-slate-400 transition-colors">
                <Icon size={22} className="mb-4 text-slate-500" />
                <h3 className="font-semibold mb-2 flex items-center justify-between">{title}<ArrowRight size={15} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" /></h3>
                <p className="text-sm leading-6 text-slate-600">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-slate-50"><div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 text-center"><h2 className="font-serif text-3xl text-slate-950 mb-3">The Journal is part of the OMIX network.</h2><p className="text-slate-600 max-w-2xl mx-auto mb-7">Learn from the work, explore our products, or work with the company behind them.</p><div className="flex flex-wrap justify-center gap-3"><a href="https://omixsystems.store" className="rounded-lg bg-slate-950 text-white px-5 py-3 font-semibold">OMIX Systems</a><a href="https://phikila.com" className="rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold">Phikila</a><a href="https://web-jade-one-82.vercel.app/?type=series" className="rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold">Veyra</a></div></div></section>
    </div>
  )
}
