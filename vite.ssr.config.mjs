// Dedicated config for the build-time prerenderer.
//
// Kept separate from vite.config.js on purpose: mergeConfig CONCATENATES plugin
// arrays, so passing `plugins: []` inline would NOT strip vite-plugin-pwa — it
// would just add nothing to it. Importing the base config and filtering gives a
// deterministic server build with no service-worker generation.
//
// The client build is untouched and still produces the PWA as before.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import baseConfig from './vite.config.js'

const BASE_PLUGINS = Array.isArray(baseConfig.plugins) ? baseConfig.plugins : [baseConfig.plugins]
const isPwaPlugin = (p) =>
  p && (p.name === 'vite-plugin-pwa' || p.name === 'vite-plugin-pwa:generateSW' || p?.api?.__isPwaPlugin)

const plugins = BASE_PLUGINS.filter((p) => !isPwaPlugin(p))

export default defineConfig({
  plugins,
  build: {
    ssr: 'src/entry-server.jsx',
    outDir: '.prerender',
    emptyOutDir: true,
    minify: false,
  },
})