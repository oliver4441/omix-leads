import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

/* Self-hosted handwritten faces: bundled by Vite from node_modules, so there is
   no third-party font request and the PWA can cache them offline. */
import '@fontsource/kalam/latin-400.css'
import '@fontsource/kalam/latin-700.css'
import '@fontsource/patrick-hand/latin-400.css'

/* Order matters: Tailwind + base defaults, then the design system, then the
   shared surfaces built from it. */
import './index.css'
import './styles/design-system.css'
import './styles/journal-surfaces.css'

import App from './App.jsx'
import { registerServiceWorker } from './lib/pwa.js'

/* Registration is deliberately after mount: the worker only affects the next
   navigation, and nothing about first paint should wait on it. */
registerServiceWorker()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
