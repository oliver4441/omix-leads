import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, ExternalLink, Sun, Moon, PenLine } from 'lucide-react'
import { useEffect, useState } from 'react'

const links = [
  { to: '/wiki', label: 'Knowledge Base' },
  { to: '/#latest', label: 'Latest' },
  { to: '/#topics', label: 'Topics' },
  { to: '/#tools', label: 'Work with us' },
]

export default function Navbar({ darkMode, onToggleTheme }) {
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  const navigate = useNavigate()

  useEffect(() => setOpen(false), [loc.pathname])
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* Hash links on the home page route through navigate so they work from any
     page, not just from "/". */
  const goToSection = (e, to) => {
    const hash = to.split('#')[1]
    if (!hash) return
    e.preventDefault()
    setOpen(false)
    navigate(`/#${hash}`)
    requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <nav className="site-nav" aria-label="Main">
      <div className="nav-inner">
        <Link to="/" className="brand" aria-label="OMIX Journal — home">
          <img src="/omix-logo.svg" alt="" className="brand-logo" />
          <span>
            <span className="brand-name">OMIX Journal</span>
            <span className="brand-kicker">Engineering notes</span>
          </span>
        </Link>

        <div className="nav-links">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="wavy-link"
              aria-current={loc.pathname === l.to ? 'page' : undefined}
              onClick={(e) => goToSection(e, l.to)}
            >
              {l.label}
            </Link>
          ))}
          <a href="https://omixsystems.store" className="wavy-link" target="_blank" rel="noreferrer">
            OMIX Systems <ExternalLink size={14} aria-hidden="true" style={{ display: 'inline', verticalAlign: '-2px' }} />
          </a>
          <button
            onClick={onToggleTheme}
            className="icon-btn"
            aria-label={darkMode ? 'Switch to light paper' : 'Switch to chalkboard mode'}
            title={darkMode ? 'Light paper' : 'Chalkboard'}
          >
            {darkMode ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <Link to="/quote" className="btn btn-accent btn-sm">
            <PenLine size={17} aria-hidden="true" /> Get a quote
          </Link>
        </div>

        <div className="mobile-actions">
          <button
            onClick={onToggleTheme}
            className="icon-btn"
            aria-label={darkMode ? 'Switch to light paper' : 'Switch to chalkboard mode'}
          >
            {darkMode ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="icon-btn"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-nav">
          <Link to="/">Home</Link>
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={(e) => goToSection(e, l.to)}>
              {l.label}
            </Link>
          ))}
          <Link to="/quote">Get a quote</Link>
          <Link to="/audit">Free business audit</Link>
          <a href="https://omixsystems.store" target="_blank" rel="noreferrer">
            OMIX Systems <ExternalLink size={16} aria-hidden="true" />
          </a>
        </div>
      )}
    </nav>
  )
}
