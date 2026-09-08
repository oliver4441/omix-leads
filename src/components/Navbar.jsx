import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ExternalLink, Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Navbar({ darkMode, onToggleTheme }) {
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  useEffect(() => setOpen(false), [loc.pathname])

  return <nav className="site-nav">
    <div className="nav-inner">
      <Link to="/" className="brand" aria-label="OMIX Journal home">
        <img src="/omix-logo.svg" alt="OMIX Systems" className="brand-logo" />
        <div><div className="brand-name">OMIX Journal</div><div className="brand-kicker">Knowledge Base</div></div>
      </Link>
      <div className="desktop-nav">
        <Link to="/wiki">Knowledge Base</Link>
        <a href="/#topics">Topics</a>
        <a href="/#latest">Latest</a>
        <a href="https://omixsystems.store" className="nav-external">OMIX Systems <ExternalLink size={13}/></a>
        <button onClick={onToggleTheme} className="theme-toggle" aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} title={darkMode ? 'Light mode' : 'Dark mode'}>{darkMode ? <Sun size={17}/> : <Moon size={17}/>}</button>
      </div>
      <div className="mobile-actions"><button onClick={onToggleTheme} className="theme-toggle" aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>{darkMode ? <Sun size={17}/> : <Moon size={17}/>}</button><button onClick={() => setOpen(!open)} className="menu-toggle" aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button></div>
    </div>
    {open && <div className="mobile-nav"><Link to="/wiki">Knowledge Base</Link><Link to="/">Home</Link><a href="/#topics">Topics</a><a href="/#latest">Latest</a><a href="https://omixsystems.store">OMIX Systems <ExternalLink size={14}/></a></div>}
  </nav>
}
