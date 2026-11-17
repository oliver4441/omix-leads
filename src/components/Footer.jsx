import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { categories } from '../data/articles'
import { categorySlug } from '../lib/seo'

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
              A technical publication by OMIX Digital Solutions, covering software engineering, architecture,
              AI infrastructure, payments and business technology.
            </p>
            <a className="btn btn-secondary btn-sm mt-5" href="https://omixsystems.store/" target="_blank" rel="noreferrer">
              OMIX Digital Solutions <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>

          <div>
            <p className="footer-heading">Browse topics</p>
            <div className="footer-links">
              {categories.map((category) => (
                <Link key={category} className="strike-link" to={`/category/${categorySlug(category)}`}>
                  {category}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="footer-heading">Publication</p>
            <div className="footer-links">
              <Link className="strike-link" to="/wiki">All articles</Link>
              <Link className="strike-link" to="/about">About the Journal</Link>
              <Link className="strike-link" to="/editorial-policy">Editorial policy</Link>
              <Link className="strike-link" to="/privacy">Privacy policy</Link>
              <Link className="strike-link" to="/terms">Terms of use</Link>
              <a className="strike-link" href="mailto:omixsystems@gmail.com">Contact the editors</a>
            </div>
          </div>
        </div>

        <div className="footer-meta">
          <span>© {new Date().getFullYear()} OMIX Digital Solutions. OMIX Journal is a company publication.</span>
          <span className="flex flex-wrap gap-x-5 gap-y-1">
            <Link to="/about" className="strike-link">About</Link>
            <Link to="/editorial-policy" className="strike-link">Publishing standards</Link>
            <Link to="/privacy" className="strike-link">Privacy</Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
