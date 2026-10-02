import React from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import InstallBanner from './components/InstallBanner'
import Home from './pages/Home'
import Wiki from './pages/Wiki'
import Article from './pages/Article'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import QuoteCalculator from './pages/QuoteCalculator'
import BusinessAudit from './pages/BusinessAudit'
import DealAlerts from './pages/DealAlerts'
import ReferralPage from './pages/ReferralPage'
import SellOnOmix from './pages/SellOnOmix'
import { ScribbleArrow } from './components/Doodles'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  React.useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname, hash])
  return null
}

function NotFound() {
  return (
    <section className="hand-page grid min-h-[70vh] place-items-center px-5 py-20">
      <div className="relative max-w-xl text-center">
        <span className="sticky-tag">404 — page not found</span>
        <h1 className="hand-h1 mt-7">This page is a blank sheet.</h1>
        <p className="hand-lead mt-5">
          The page you asked for does not exist, or it has been moved somewhere else in the notebook.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link to="/wiki" className="btn">Open the knowledge base</Link>
          <Link to="/" className="btn btn-secondary">Back to the journal</Link>
        </div>
        <ScribbleArrow className="scribble-arrow-accent pointer-events-none absolute -bottom-24 left-1/2 hidden h-20 w-24 -translate-x-1/2 -scale-y-100 md:block" />
      </div>
    </section>
  )
}

export default function App() {
  const [darkMode, setDarkMode] = React.useState(() => {
    try { return localStorage.getItem('omix-theme') === 'dark' } catch { return false }
  })

  React.useEffect(() => {
    try { localStorage.setItem('omix-theme', darkMode ? 'dark' : 'light') } catch {}
    document.documentElement.classList.toggle('theme-dark', darkMode)
    document.documentElement.style.colorScheme = darkMode ? 'dark' : 'light'
    /* Match the installed app's status bar / title bar to the active theme.
       index.html sets the same value before first paint. */
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', darkMode ? '#1b1c1a' : '#fdfbf7')
  }, [darkMode])

  return (
    <div className="flex min-h-screen flex-col">
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollToTop />
      <Navbar darkMode={darkMode} onToggleTheme={() => setDarkMode((v) => !v)} />
      <main id="main" className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wiki" element={<Wiki />} />
          <Route path="/wiki/:slug" element={<Article />} />
          <Route path="/articles/:slug" element={<Article />} />
          <Route path="/category/:category" element={<Wiki />} />
          <Route path="/quote" element={<QuoteCalculator />} />
          <Route path="/audit" element={<BusinessAudit />} />
          <Route path="/deal-alerts" element={<DealAlerts />} />
          <Route path="/referral" element={<ReferralPage />} />
          <Route path="/sell" element={<SellOnOmix />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <InstallBanner />
    </div>
  )
}
