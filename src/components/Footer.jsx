import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import StoreBadges from './StoreBadges'

const network = [
  ['OMIX Systems', 'https://omixsystems.store'],
  ['Gideon Langat', 'https://admin.omixsystems.store'],
  ['Decimal', 'https://decimal.omixsystems.store'],
  ['Bifrost', 'https://bifrost.omixsystems.store'],
  ['Aide', 'https://aide.omixsystems.store'],
  ['Pulse — Developer Portfolio', 'https://marvel-254.github.io/pulse/'],
  ['ThreadMyMail — AI Email Harness', 'https://threadmymail.omixsystems.store'],
]

const tools = [
  ['Get a quote', '/quote'],
  ['Free business audit', '/audit'],
  ['Deal alerts', '/deal-alerts'],
  ['Sell on OMIX Store', '/sell'],
  ['Refer & earn', '/referral'],
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="content-wrap">
        <div className="footer-grid">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <img src="/omix-logo.svg" alt="" className="brand-logo" />
              <span className="brand-name">OMIX Journal</span>
            </div>
            <p className="max-w-sm text-[17px] ink-soft">
              A knowledge base from OMIX Digital Solutions — written notes on software, systems and the reasoning
              behind them. Part of the wider OMIX product and company network.
            </p>
          </div>

          <div>
            <p className="footer-heading">OMIX Network</p>
            <div className="footer-links">
              {network.map(([label, href]) => (
                <a key={href} className="strike-link" href={href} target="_blank" rel="noreferrer">
                  {label} ↗
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="footer-heading">Work with us</p>
            <div className="footer-links">
              {tools.map(([label, to]) => (
                <Link key={to} className="strike-link" to={to}>
                  {label}
                </Link>
              ))}
            </div>
            <a className="btn btn-secondary btn-sm mt-5" href="https://omixsystems.store/#contact" target="_blank" rel="noreferrer">
              Discuss a project <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <StoreBadges />
          </div>
        </div>

        <div className="footer-meta">
          <span>© {new Date().getFullYear()} OMIX Digital Solutions. All rights reserved.</span>
          <span className="flex flex-wrap gap-x-5 gap-y-1">
            <Link to="/wiki" className="strike-link">Knowledge Base</Link>
            <Link to="/admin" className="strike-link">Admin</Link>
            <span>Sketchbook edition — hand-drawn in Nairobi</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
