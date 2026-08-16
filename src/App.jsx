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
  return (
    <div className="min-h-screen flex flex-col bg-[#f7f8fa] text-slate-900">
      <ScrollToTop />
      <Navbar />
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
