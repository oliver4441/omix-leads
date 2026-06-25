import { Zap, Phone, Mail, MapPin } from 'lucide-react'
import { OMIX_STORE_URL } from '../lib/constants'

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#ff385c] rounded-lg flex items-center justify-center"><Zap className="w-4 h-4 text-white" /></div>
              <span className="font-black text-lg">Omix<span className="text-[#ff385c]">Leads</span></span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">Growing Omix Store and Omixsystems through smart lead generation.</p>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-3 text-zinc-300 uppercase tracking-wider">Store Leads</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><a href="/deals" className="hover:text-white">Deal Alerts</a></li>
              <li><a href="/sell" className="hover:text-white">Sell on Omix</a></li>
              <li><a href="/referral" className="hover:text-white">Refer & Earn</a></li>
              <li><a href={OMIX_STORE_URL} target="_blank" className="hover:text-white">Shop on Omix Store</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-3 text-zinc-300 uppercase tracking-wider">Web Dev Leads</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><a href="/audit" className="hover:text-white">Free Business Audit</a></li>
              <li><a href="/quote" className="hover:text-white">Get a Website Quote</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-3 text-zinc-300 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> +254 768 213 649</li>
              <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> omixsystems@gmail.com</li>
              <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Kericho, Kenya</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-800 mt-8 pt-6 text-center text-xs text-zinc-500">OmixSystems Ltd. All rights reserved.</div>
      </div>
    </footer>
  )
}
