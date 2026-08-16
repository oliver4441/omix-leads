import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, ExternalLink, Search, Code2, Cloud, ShieldCheck, Boxes } from 'lucide-react'

const articles = [
  { category: 'Engineering', title: 'Designing modular software systems that can evolve', excerpt: 'Why clear boundaries, contracts and small deployable modules make digital products easier to maintain.', date: 'Engineering note' },
  { category: 'Architecture', title: 'APIs as the connective tissue of a modern product', excerpt: 'A practical look at integration boundaries, authentication, data contracts and reliable services.', date: 'Architecture note' },
  { category: 'Products', title: 'What we learn from building digital products', excerpt: 'Notes on product decisions, trade-offs and the systems behind Veyra, Phikila and future OMIX products.', date: 'Product note' },
  { category: 'Business Technology', title: 'When a business needs software instead of another spreadsheet', excerpt: 'Signals that a workflow has become complex enough to justify a purpose-built system.', date: 'Business note' },
]

const topics = [
  ['Engineering', Code2], ['Architecture', Boxes], ['Cloud & Infrastructure', Cloud], ['Security', ShieldCheck],
]

export default function Home() {
  return (
    <div>
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 md:py-28">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold tracking-[0.18em] uppercase text-slate-500 mb-5">OMIX JOURNAL · KNOWLEDGE BASE</p>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl leading-[0.98] tracking-tight text-slate-950 mb-7">Ideas, engineering notes and lessons from building software.</h1>
            <p className="text-lg md:text-xl leading-8 text-slate-600 max-w-2xl mb-9">A wiki-style publication from OMIX Digital Solutions covering software engineering, architecture, product development, cloud systems and business technology.</p>
            <div className="flex flex-wrap gap-3">
              <a href="https://omixsystems.store" className="inline-flex items-center gap-2 rounded-lg bg-slate-950 text-white px-5 py-3 font-semibold hover:bg-slate-800 transition-colors">Visit OMIX Systems <ArrowRight size={17} /></a>
              <a href="https://admin.omixsystems.store" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 hover:border-slate-500 transition-colors">Gideon Langat <ExternalLink size={16} /></a>
            </div>
          </div>
        </div>
      </section>
      <section className="border-b border-slate-200 bg-[#f7f8fa]"><div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 grid lg:grid-cols-[1fr_320px] gap-10"><div><div className="flex items-center justify-between mb-6"><h2 className="font-serif text-3xl text-slate-950">Latest notes</h2><span className="text-sm text-slate-500">Curated by OMIX</span></div><div className="space-y-4">{articles.map((a) => <article key={a.title} className="bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-400 transition-colors"><div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3"><span>{a.category}</span><span>·</span><span>{a.date}</span></div><h3 className="font-serif text-2xl text-slate-950 mb-2">{a.title}</h3><p className="text-slate-600 leading-7 max-w-2xl">{a.excerpt}</p><button className="mt-4 text-sm font-semibold text-slate-900 inline-flex items-center gap-1">Read note <ArrowRight size={14} /></button></article>)}</div></div><aside className="lg:border-l lg:border-slate-200 lg:pl-8"><div className="sticky top-24"><h2 className="text-xs font-bold tracking-[0.18em] uppercase text-slate-500 mb-4">Explore the wiki</h2><div className="space-y-2">{topics.map(([name, Icon]) => <a key={name} href="#topics" className="flex items-center justify-between p-3 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 transition-colors"><span className="flex items-center gap-3 font-medium"><Icon size={17} className="text-slate-500" />{name}</span><ArrowRight size={15} className="text-slate-400" /></a>)}</div><div className="mt-8 rounded-xl bg-slate-950 text-white p-6"><p className="text-xs uppercase tracking-wider text-slate-400 mb-2">Build with OMIX</p><h3 className="font-serif text-2xl mb-3">Have a system to build?</h3><p className="text-sm leading-6 text-slate-300 mb-5">Take the conversation from an idea to a practical digital product.</p><a href="https://omixsystems.store/#contact" className="inline-flex items-center gap-2 font-semibold text-white">Discuss a project <ArrowRight size={15} /></a></div></div></aside></div></section>
      <section id="topics" className="bg-white border-b border-slate-200"><div className="max-w-7xl mx-auto px-5 sm:px-8 py-16"><div className="flex items-center gap-3 mb-8"><BookOpen size={21} /><h2 className="font-serif text-3xl">Knowledge areas</h2></div><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{topics.map(([name, Icon]) => <div key={name} className="border border-slate-200 rounded-xl p-6"><Icon size={22} className="mb-5 text-slate-500" /><h3 className="font-semibold mb-2">{name}</h3><p className="text-sm leading-6 text-slate-600">Notes, guides and practical thinking around {name.toLowerCase()}.</p></div>)}</div></div></section>
      <section className="bg-slate-50"><div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 text-center"><Search className="mx-auto mb-4 text-slate-500" /><h2 className="font-serif text-3xl text-slate-950 mb-3">The Journal is part of the OMIX network.</h2><p className="text-slate-600 max-w-2xl mx-auto mb-7">Learn from the work, explore our products, or work with the company behind them.</p><div className="flex flex-wrap justify-center gap-3"><a href="https://omixsystems.store" className="rounded-lg bg-slate-950 text-white px-5 py-3 font-semibold">OMIX Systems</a><a href="https://phikila.com" className="rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold">Phikila</a><a href="https://web-jade-one-82.vercel.app/?type=series" className="rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold">Veyra</a></div></div></section>
    </div>
  )
}
