import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      /* Both injection points are disabled on purpose.
       *
       * Under Vite 8/Rolldown this plugin's generateBundle hook is skipped
       * ("assigns to bundle variable ... will be ignored"), so the manifest and
       * the registerSW helper were never written to dist — yet the <script> tag
       * for registerSW.js was still injected into index.html, pointing at a 404.
       * The result was an app that looked installable and was not.
       *
       * The plugin still generates a correct service worker (dist/sw.js), so we
       * keep it for precaching and own the other two pieces ourselves:
       *   - the manifest is a static file: public/manifest.webmanifest
       *   - registration lives in src/lib/pwa.js
       * scripts/verify-pwa.mjs fails the build if any of the three go missing. */
      injectRegister: false,
      manifest: false,
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest,woff2}'],
        // Serve the cached app shell for client-side routes while offline.
        navigateFallback: '/index.html',
        // Never let the shell swallow these: they must always hit the network.
        navigateFallbackDenylist: [/^\/api\//, /^\/sw\.js$/, /^\/workbox-/, /\.(?:png|svg|webmanifest)$/],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
      },
      devOptions: {
        // Intentionally off: a worker during development serves stale shells and
        // makes HMR edits look like they were ignored. Test installability with
        // `npm run build && npm run preview`.
        enabled: false,
      },
    }),
  ],
  server: {
    // Allow sandbox preview hosts (e.g. *.e2b.app) to reach the dev server.
    allowedHosts: ['.e2b.app'],
    headers: {
      'Cross-Origin-Embedder-Policy': 'credentialless',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
  preview: {
    // Same allowance for the production build served by `vite preview`, which is
    // where the install prompt can actually be exercised.
    allowedHosts: ['.e2b.app'],
  },
})
