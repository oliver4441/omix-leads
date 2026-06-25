import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import BusinessAudit from './pages/BusinessAudit'
import QuoteCalculator from './pages/QuoteCalculator'
import DealAlerts from './pages/DealAlerts'
import SellOnOmix from './pages/SellOnOmix'
import ReferralPage from './pages/ReferralPage'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/audit" element={<BusinessAudit />} />
          <Route path="/quote" element={<QuoteCalculator />} />
          <Route path="/deals" element={<DealAlerts />} />
          <Route path="/sell" element={<SellOnOmix />} />
          <Route path="/referral" element={<ReferralPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
