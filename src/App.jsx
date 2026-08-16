import React, { useState, useEffect } from 'react'
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
  const [searchFilter, setSearchFilter] = useState('')
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('omix_docs_theme') || 'dark'
  })

  useEffect(() => {
    localStorage.setItem('omix_docs_theme', theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      <ScrollToTop />
      <Navbar
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home searchFilter={searchFilter} />} />
          <Route path="/wiki" element={<Wiki searchFilter={searchFilter} />} />
          <Route path="/wiki/:slug" element={<Article />} />
          <Route path="/articles/:slug" element={<Article />} />
          <Route path="/category/:category" element={<Wiki searchFilter={searchFilter} />} />
          <Route path="*" element={<Navigate to="/wiki" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
