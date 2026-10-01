// Build-time server entry. Bundled by Vite in SSR mode, then executed by
// scripts/prerender.mjs to emit real static HTML for every public route.
//
// Rendering goes through the SAME <App /> the browser uses, wrapped in a
// StaticRouter. That means the markup a crawler reads is the actual application
// output — not a hand-maintained duplicate that can drift.

import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App.jsx'
import { getMeta } from './lib/meta.js'

export function render(url) {
  const meta = getMeta(url)
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  )
  return { html, meta }
}