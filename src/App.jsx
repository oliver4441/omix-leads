import React, { useState } from 'react'
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

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 font-sans">
      <ScrollToTop />
      <Navbar searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
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
