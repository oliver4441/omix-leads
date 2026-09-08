import React from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Wiki from './pages/Wiki'
import Article from './pages/Article'

function ScrollToTop() {
  const { pathname } = useLocation()
  React.useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  const [darkMode, setDarkMode] = React.useState(() => {
    try { return localStorage.getItem('omix-theme') === 'dark' } catch { return false }
  })

  React.useEffect(() => {
    try { localStorage.setItem('omix-theme', darkMode ? 'dark' : 'light') } catch {}
    document.documentElement.style.colorScheme = darkMode ? 'dark' : 'light'
  }, [darkMode])

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'theme-dark bg-[#0b0d10] text-slate-100' : 'bg-[#f7f8fa] text-slate-900'}`}>
      <ScrollToTop />
      <Navbar darkMode={darkMode} onToggleTheme={() => setDarkMode(v => !v)} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wiki" element={<Wiki />} />
          <Route path="/wiki/:slug" element={<Article />} />
          <Route path="/articles/:slug" element={<Article />} />
          <Route path="/category/:category" element={<Wiki />} />
          <Route path="*" element={<Navigate to="/wiki" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
