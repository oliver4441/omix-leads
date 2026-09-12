import React from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Wiki from './pages/Wiki'
import Article from './pages/Article'

function ScrollToTop() {
  const { pathname } = useLocation()
  React.useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [pathname])
  return null
}

function NotFound() {
  return (
    <section className="min-h-[60vh] grid place-items-center bg-[#f7f8fa] px-5">
      <div className="max-w-xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">404</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-serif font-semibold text-slate-950">Page not found</h1>
        <p className="mt-4 text-slate-600">The page you requested does not exist or may have moved.</p>
        <a href="/wiki" className="mt-7 inline-flex rounded-lg bg-slate-950 px-5 py-3 font-semibold text-white">Open the Knowledge Base</a>
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
    document.documentElement.classList.toggle('dark', darkMode)
    document.documentElement.style.colorScheme = darkMode ? 'dark' : 'light'
  }, [darkMode])

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'theme-dark' : ''}`}>
      <ScrollToTop />
      <Navbar darkMode={darkMode} onToggleTheme={() => setDarkMode(v => !v)} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wiki" element={<Wiki />} />
          <Route path="/wiki/:slug" element={<Article />} />
          <Route path="/articles/:slug" element={<Article />} />
          <Route path="/category/:category" element={<Wiki />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
