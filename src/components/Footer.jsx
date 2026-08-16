import { ArrowUpRight, ExternalLink, Sparkles, MessageCircle, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 mt-auto">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Col 1: About OMIX */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img src="/omix-logo.svg" alt="OMIX Systems" className="w-8 h-8 rounded-md object-cover ring-1 ring-slate-700" />
              <span className="font-serif font-bold text-white text-lg tracking-tight">OMIX SYSTEMS</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[12px]">
              Optimal Modular Integration Experts. Building cloud software, multi-tenant SaaS, M-PESA APIs, and digital infrastructure for high-growth organizations.
            </p>
            <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <MapPin size={12} /> Kericho, Kenya — Shipped Worldwide
            </div>
          </div>

          {/* Col 2: Documentation & Articles */}
          <div>
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-200 mb-3">Documentation</h4>
            <ul className="space-y-2 text-[12px]">
              <li><a href="/wiki/why-choose-omix" className="hover:text-emerald-400 transition-colors">Why Choose OMIX?</a></li>
              <li><a href="/wiki/how-omix-builds-production-saas" className="hover:text-emerald-400 transition-colors">Building Production SaaS</a></li>
              <li><a href="/wiki/mpesa-and-api-integrations" className="hover:text-emerald-400 transition-colors">M-PESA & API Integrations</a></li>
              <li><a href="/wiki/phikila-and-veyra-case-study" className="hover:text-emerald-400 transition-colors">Phikila & Veyra Case Studies</a></li>
              <li><a href="/wiki/building-software-in-kenya-for-the-world" className="hover:text-emerald-400 transition-colors">Global Delivery from Kenya</a></li>
            </ul>
          </div>

          {/* Col 3: OMIX Platforms & Products */}
          <div>
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-200 mb-3">OMIX Ecosystem</h4>
            <ul className="space-y-2 text-[12px]">
              <li><a href="https://omixsystems.store" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1">OMIX Systems Main Site <ExternalLink size={11} /></a></li>
              <li><a href="https://phikila.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1">Phikila School Platform <ExternalLink size={11} /></a></li>
              <li><a href="https://web-jade-one-82.vercel.app/?type=series" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1">Veyra Cinematic Streaming <ExternalLink size={11} /></a></li>
              <li><a href="https://omixsystems.store/#pricing" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1">Pricing & Fixed Packages <ExternalLink size={11} /></a></li>
            </ul>
          </div>

          {/* Col 4: Contact & Direct Scope */}
          <div className="space-y-3">
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-200">Start Your Project</h4>
            <p className="text-slate-400 text-[12px]">Discuss your software idea or schedule an architecture scope call.</p>
            <div className="space-y-2">
              <a
                href="https://omixsystems.store/#contact"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1.5 rounded text-xs transition-colors"
              >
                Start Scope at omixsystems.store <ArrowUpRight size={13}/>
              </a>
              <div className="flex items-center gap-3 text-[11px] pt-1">
                <a href="https://wa.me/254732649442" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 flex items-center gap-1">
                  <MessageCircle size={12} /> WhatsApp
                </a>
                <span>•</span>
                <a href="mailto:omixsystems@gmail.com" className="hover:text-emerald-400 flex items-center gap-1">
                  <Mail size={12} /> Email
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-800/80 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>© {new Date().getFullYear()} OMIX Digital Solutions. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="https://omixsystems.store" className="hover:underline">omixsystems.store</a>
            <span>•</span>
            <a href="https://blog.omixsystems.store" className="hover:underline">blog.omixsystems.store</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
