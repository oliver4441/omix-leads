import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Catch render errors silently
try {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
} catch (e) {
  document.getElementById('root').innerHTML =
    '<pre style="color:red;padding:20px;font-size:14px">' +
    (e?.stack || e?.message || String(e) || 'Unknown error') +
    '</pre>'
  console.error('Render error:', e)
}
