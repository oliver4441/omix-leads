// Emits static HTML for every public route so crawlers receive real content
// instead of an empty client-rendered shell.
//
// Runs after `vite build`. Uses Vite's own SSR pipeline for the server bundle,
// which means JSX, import.meta.env and CSS imports are all handled exactly as
// they are for the client build — no separate toolchain to keep in sync.
//
// Usage: node scripts/prerender.mjs

import { build } from 'vite'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const ssrOutDir = resolve(root, '.prerender')

// Mirrors the SEO robots directive from src/lib/meta.js.
const INDEXABLE = /index,follow/

async function buildServerBundle() {
  await rm(ssrOutDir, { recursive: true, force: true })
  await build({
    root,
    configFile: resolve(root, 'vite.ssr.config.mjs'),
    logLevel: 'warn',
  })
  return import(pathToFileURL(resolve(ssrOutDir, 'entry-server.js')).href)
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function headTags(meta) {
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="${esc(meta.robots)}" />`,
    `<link rel="canonical" href="${esc(meta.url)}" />`,
    `<meta property="og:type" content="${esc(meta.ogType || 'website')}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${esc(meta.url)}" />`,
    `<meta property="og:site_name" content="OMIX Journal" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
  ]
  if (meta.publishedTime) {
    tags.push(`<meta property="article:published_time" content="${esc(meta.publishedTime)}" />`)
    tags.push(`<meta property="article:section" content="${esc(meta.section)}" />`)
  }
  for (const block of meta.jsonLd || []) {
    // JSON.stringify output can contain `</script>`; escaping the slash keeps
    // the payload from terminating the tag early.
    const json = JSON.stringify(block).replace(/</g, '\\u003c')
    tags.push(`<script type="application/ld+json">${json}</script>`)
  }
  return tags.join('\n    ')
}

// Rewrite the built shell's head so the prerendered page carries its own
// metadata rather than the site-wide defaults.
function injectHead(template, meta) {
  const head = headTags(meta)
  let out = template

  // Drop the shell's defaults — we replace them all. `robots` is included here
  // because the shell ships one; leaving it produces two conflicting tags.
  out = out.replace(/<title>[\s\S]*?<\/title>\s*/i, '')
  out = out.replace(/<meta name="description"[^>]*>\s*/i, '')
  out = out.replace(/<meta name="robots"[^>]*>\s*/i, '')
  out = out.replace(/<link rel="canonical"[^>]*>\s*/i, '')

  return out.replace('</head>', `  ${head}\n  </head>`)
}

function routeToFile(url) {
  const clean = url.replace(/^\/+|\/+$/g, '')
  return clean === '' ? resolve(dist, 'index.html') : resolve(dist, clean, 'index.html')
}

async function main() {
  const { render } = await buildServerBundle()
  const { getPrerenderPaths } = await import(pathToFileURL(resolve(root, 'src/lib/meta.js')).href)

  const template = await readFile(resolve(dist, 'index.html'), 'utf8')
  const paths = getPrerenderPaths()

  let written = 0
  const failures = []

  for (const url of paths) {
    try {
      const { html, meta } = render(url)
      if (!meta) throw new Error('no metadata resolved')

      // renderToString returns the app's markup (the contents of #root), so the
      // only thing to do is drop it inside the shell's existing mount node.
      const page = template.replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div>`
      )

      await mkdir(dirname(routeToFile(url)), { recursive: true })
      await writeFile(routeToFile(url), injectHead(page, meta), 'utf8')
      written++
    } catch (err) {
      failures.push({ url, message: err.message })
    }
  }

  await rm(ssrOutDir, { recursive: true, force: true })

  console.log(`\nprerender: wrote ${written}/${paths.length} static HTML files`)
  for (const f of failures) console.error(`  FAILED ${f.url}: ${f.message}`)
  if (failures.length) process.exitCode = 1
}

main().catch((err) => {
  console.error('prerender failed:', err)
  process.exit(1)
})