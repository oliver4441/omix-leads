/**
 * PWA build verifier — `npm run verify:pwa` (runs at the end of `npm run build`)
 * ---------------------------------------------------------------------------
 * This exists because the PWA failed silently once already: index.html shipped
 * a <script src="/registerSW.js"> while Rolldown skipped the plugin hook that
 * was supposed to write that file, so the app advertised a manifest it did not
 * have and registered a worker that did not exist. Nothing errored; the build
 * was simply not installable.
 *
 * A build that claims to be a PWA now has to prove it.
 */

import { readFile, stat } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')

const failures = []
const notes = []

const exists = async (file) => {
  try {
    await stat(resolve(dist, file))
    return true
  } catch {
    return false
  }
}

/* 1. The service worker must exist and precache something. */
if (!(await exists('sw.js'))) {
  failures.push('dist/sw.js is missing — no service worker was generated')
} else {
  const sw = await readFile(resolve(dist, 'sw.js'), 'utf8')
  if (!/precache/i.test(sw)) failures.push('dist/sw.js has no precache manifest')
  notes.push(`service worker: ${(sw.length / 1024).toFixed(0)} kB`)
}

/* 2. The manifest must exist, be valid JSON, and point at icons that ship. */
if (!(await exists('manifest.webmanifest'))) {
  failures.push('dist/manifest.webmanifest is missing — the app cannot be installed')
} else {
  const raw = await readFile(resolve(dist, 'manifest.webmanifest'), 'utf8')
  let manifest
  try {
    manifest = JSON.parse(raw)
  } catch (err) {
    failures.push(`manifest.webmanifest is not valid JSON: ${err.message}`)
  }

  if (manifest) {
    for (const field of ['name', 'short_name', 'start_url', 'display', 'icons', 'theme_color', 'background_color']) {
      if (!manifest[field]) failures.push(`manifest is missing "${field}"`)
    }

    const sizes = new Set((manifest.icons || []).map((i) => i.sizes))
    if (!sizes.has('192x192')) failures.push('manifest needs a 192×192 icon')
    if (!sizes.has('512x512')) failures.push('manifest needs a 512×512 icon')

    const purposes = new Set((manifest.icons || []).map((i) => i.purpose || 'any'))
    if (!purposes.has('maskable')) {
      failures.push('manifest has no maskable icon — Android will letterbox the icon')
    }

    for (const icon of manifest.icons || []) {
      const file = icon.src.replace(/^\//, '')
      if (!(await exists(file))) failures.push(`manifest references a missing icon: ${icon.src}`)
    }

    for (const shortcut of manifest.shortcuts || []) {
      if (!shortcut.url) failures.push(`shortcut "${shortcut.name}" has no url`)
    }

    notes.push(`manifest: ${manifest.name} · ${(manifest.icons || []).length} icons · ${(manifest.shortcuts || []).length} shortcuts`)
  }
}

/* 3. Every prerendered page must link the manifest and register nothing broken. */
const pages = ['index.html', 'wiki/index.html', 'quote/index.html']
for (const page of pages) {
  if (!(await exists(page))) continue
  const html = await readFile(resolve(dist, page), 'utf8')
  if (!html.includes('rel="manifest"')) failures.push(`${page} does not link the manifest`)
  if (html.includes('/registerSW.js')) {
    failures.push(`${page} references /registerSW.js, which this build no longer emits`)
  }
  if (!html.includes('theme-color')) failures.push(`${page} has no theme-color meta`)
}

/* 4. Share cards. A card that 404s silently degrades every link preview, which
   is exactly the kind of failure nobody notices until someone shares a link. */
if (!(await exists('og/og-default.png'))) {
  failures.push('dist/og/og-default.png is missing — link previews would fall back to nothing')
}

for (const page of ['index.html', 'wiki/index.html', 'quote/index.html', 'wiki/introducing-bifrost/index.html']) {
  if (!(await exists(page))) continue
  const html = await readFile(resolve(dist, page), 'utf8')
  const match = html.match(/<meta property="og:image" content="([^"]+)"/)
  if (!match) {
    failures.push(`${page} has no og:image`)
    continue
  }
  const url = match[1]
  if (!url.startsWith('https://')) {
    failures.push(`${page} og:image is not absolute: ${url}`)
    continue
  }
  const file = `og/${url.split('/og/')[1]}`
  if (!(await exists(file))) failures.push(`${page} points at a missing share card: ${file}`)
  if (!html.includes('summary_large_image')) failures.push(`${page} does not declare the large Twitter card`)
}

/* 5. Icons referenced by the iOS/head markup must exist too. */
for (const file of ['apple-touch-icon.png', 'favicon.svg', 'favicon-96x96.png']) {
  if (!(await exists(file))) failures.push(`${file} is missing`)
}

for (const note of notes) console.log(`  pwa: ${note}`)

if (failures.length) {
  console.error('\nverify-pwa: FAILED')
  for (const f of failures) console.error(`  ✗ ${f}`)
  process.exitCode = 1
} else {
  console.log('verify-pwa: installable — manifest, icons, worker and head tags all present')
}
