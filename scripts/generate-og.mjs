/**
 * Open Graph card generator — `npm run og` (also runs during `npm run build`)
 * ---------------------------------------------------------------------------
 * Emits one 1200×630 share card per public route into dist/og/, drawn in the
 * hand-drawn design system: warm paper, dot grain, pencil border, marker type
 * and the ring + exclamation mark used everywhere else.
 *
 * Cards are generated rather than committed, so adding an article or category
 * cannot leave a stale or missing preview behind. Titles are wrapped against
 * the real font metrics (opentype.js) rather than a guess, and the type size
 * steps down until the whole title fits inside the card.
 */

import { Resvg } from '@resvg/resvg-js'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import opentype from 'opentype.js'
import { readFileSync } from 'node:fs'
import { grain, bang, wobblyRing, wobblyTile, wavyLine, esc } from './lib/handdrawn.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const fontsDir = resolve(root, 'scripts/fonts')
const dist = resolve(root, 'dist')
const outDir = resolve(dist, 'og')

/* --------------------------------------------------------------- palette -- */
const PAPER = '#fdfbf7'
const INK = '#2d2d2d'
const INK_SOFT = '#55534f'
const INK_FAINT = '#6f6b64'
const BLUE = '#2d5da1'
const RED = '#ff4d4d'
const POSTIT = '#fff9c4'

/* ---------------------------------------------------------------- canvas -- */
const W = 1200
const H = 630
const PAD = 84
const CONTENT_W = W - PAD * 2

/* --------------------------------------------------------------- fonts ---- */
const load = (file) => opentype.parse(readFileSync(resolve(fontsDir, file)).buffer)
const MARKER = load('Kalam-Bold.ttf')
const BODY = load('PatrickHand-Regular.ttf')

const width = (font, text, size) => font.getAdvanceWidth(text, size)

/* '2026-08-16' reads like a database on a share card. */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
function humanDate(iso) {
  const [y, m, d] = String(iso).split('-').map(Number)
  if (!y || !m || !d) return iso
  return `${d} ${MONTHS[m - 1]} ${y}`
}

/**
 * Greedy wrap against real font metrics. Returns null when the text cannot fit
 * in `maxLines`, so the caller can try a smaller size.
 */
function wrap(font, text, size, maxWidth, maxLines) {
  const words = String(text).split(/\s+/).filter(Boolean)
  const lines = []
  let line = ''

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word
    if (width(font, candidate, size) <= maxWidth) {
      line = candidate
      continue
    }
    if (line) lines.push(line)
    line = word
    if (lines.length > maxLines) return null
  }
  if (line) lines.push(line)
  if (lines.length > maxLines) return null
  return lines
}

/** Pick the largest size at which the title fits the card. */
function fitTitle(font, text, maxWidth, maxLines, sizes) {
  for (const size of sizes) {
    const lines = wrap(font, text, size, maxWidth, maxLines)
    if (lines) return { size, lines }
  }
  // Nothing fits: clamp to the smallest size with an ellipsis on the last line.
  const size = sizes[sizes.length - 1]
  const lines = wrap(font, text, size, maxWidth, maxLines + 1) || [text]
  const kept = lines.slice(0, maxLines)
  kept[maxLines - 1] = `${kept[maxLines - 1].replace(/[.,;:]$/, '')}…`
  return { size, lines: kept }
}

/* ------------------------------------------------------------------ marks -- */
function mark(cx, cy, scale) {
  const ring = wobblyRing({ cx, cy, r: 46 * scale, wall: 15 * scale, seed: 11 })
  const b = bang({ x: cx + 58 * scale, y: cy - 54 * scale, h: 30 * scale })
  return `<path d="${ring}" fill="${BLUE}" fill-rule="evenodd"/>
  <path d="${b.stem}" fill="none" stroke="${RED}" stroke-width="${9 * scale}" stroke-linecap="round"/>
  <path d="${b.dot}" fill="${RED}"/>`
}

/* The sticky-note tag that labels every card. */
function tag(label, { x = PAD, y = 78 } = {}) {
  const size = 27
  const spacing = 1.5
  /* Measure the string that is actually drawn — uppercase is wider. */
  const text = label.toUpperCase()
  const textWidth = width(BODY, text, size) + Math.max(0, text.length - 1) * spacing
  const padX = 22
  const w = textWidth + padX * 2
  const h = 52
  return `<g transform="rotate(-1.4 ${x + w / 2} ${y + h / 2})">
    <rect x="${x}" y="${y}" width="${w.toFixed(1)}" height="${h}" rx="10" fill="${POSTIT}" stroke="${INK}" stroke-width="3"/>
    <text x="${(x + padX).toFixed(1)}" y="${y + 36}" font-family="Patrick Hand" font-size="${size}" fill="${INK}" letter-spacing="${spacing}">${esc(text)}</text>
  </g>`
}

/* --------------------------------------------------------------- the card -- */
function card({ tagLabel, title, meta, subtitle }) {
  const titleTop = 196
  const sizes = [76, 70, 64, 58, 52, 46]
  const { size, lines } = fitTitle(MARKER, title, CONTENT_W, 3, sizes)
  const lineHeight = size * 1.16

  const titleSvg = lines
    .map((line, i) => {
      const y = titleTop + size * 0.9 + i * lineHeight
      return `<text x="${PAD}" y="${y.toFixed(1)}" font-family="Kalam" font-weight="700" font-size="${size}" fill="${INK}">${esc(line)}</text>`
    })
    .join('\n  ')

  const lastLine = lines[lines.length - 1]
  const lastLineY = titleTop + size * 0.9 + (lines.length - 1) * lineHeight
  const underlineW = Math.min(width(MARKER, lastLine, size), CONTENT_W)
  const underline = wavyLine({ x0: PAD, y: lastLineY + 16, len: underlineW * 0.72, amp: size * 0.085, period: 40 })

  const subtitleY = lastLineY + 62
  const subtitleSvg = subtitle
    ? `<text x="${PAD}" y="${subtitleY.toFixed(1)}" font-family="Patrick Hand" font-size="33" fill="${INK_SOFT}">${esc(subtitle)}</text>`
    : ''

  const metaY = 556

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>${grain({ spacing: 34, radius: 2.2 })}</defs>

  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  <rect width="${W}" height="${H}" fill="url(#grain)"/>
  <path d="${wobblyTile({ w: W, h: H, inset: 26, seed: 3, radius: 96 })}" fill="none" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>

  ${tag(tagLabel)}

  ${titleSvg}
  <path d="${underline}" fill="none" stroke="${RED}" stroke-width="${Math.max(5, size * 0.09).toFixed(1)}" stroke-linecap="round"/>
  ${subtitleSvg}

  <line x1="${PAD}" y1="${metaY - 44}" x2="${W - PAD}" y2="${metaY - 44}" stroke="${INK}" stroke-width="2" stroke-dasharray="10 9" opacity="0.4"/>
  <text x="${PAD}" y="${metaY}" font-family="Patrick Hand" font-size="30" fill="${INK_FAINT}">${esc(meta)}</text>

  ${mark(1080, 128, 1.05)}
</svg>`
}

/* ----------------------------------------------------------------- routes -- */
async function main() {
  const { articles, categories } = await import(pathToFileURL(resolve(root, 'src/data/articles.js')).href)
  const { categorySlug } = await import(pathToFileURL(resolve(root, 'src/lib/seo.js')).href)

  const cards = []

  cards.push({
    file: 'og-default.png',
    alt: 'OMIX Journal — practical notes on software, systems and products',
    svg: card({
      tagLabel: 'OMIX Journal',
      title: 'Build with intent.',
      subtitle: 'Practical notes on software, systems and products.',
      meta: 'blog.omixsystems.store',
    }),
  })

  for (const article of articles) {
    cards.push({
      file: `wiki-${article.slug}.png`,
      alt: `${article.title} — ${article.category} note from the OMIX Journal`,
      svg: card({
        tagLabel: article.category,
        title: article.title,
        meta: `${humanDate(article.date)} · ${article.readTime} · OMIX Journal`,
      }),
    })
  }

  for (const category of categories) {
    const count = articles.filter((a) => a.category === category).length
    cards.push({
      file: `category-${categorySlug(category)}.png`,
      alt: `${category} — ${count} notes in the OMIX Journal`,
      svg: card({
        tagLabel: 'Knowledge base',
        title: category,
        subtitle: categoryBlurb[category],
        meta: `${count} note${count === 1 ? '' : 's'} · OMIX Journal`,
      }),
    })
  }

  await rm(outDir, { recursive: true, force: true })
  await mkdir(outDir, { recursive: true })

  const renderer = (svg) =>
    new Resvg(svg, {
      fitTo: { mode: 'width', value: W },
      font: { fontFiles: [resolve(fontsDir, 'Kalam-Bold.ttf'), resolve(fontsDir, 'Kalam-Regular.ttf'), resolve(fontsDir, 'PatrickHand-Regular.ttf')], loadSystemFonts: false },
    })
      .render()
      .asPng()

  let bytes = 0
  for (const { file, svg } of cards) {
    const png = renderer(svg)
    bytes += png.length
    await writeFile(resolve(outDir, file), png)
  }

  console.log(`og: wrote ${cards.length} share cards to dist/og (${(bytes / 1024).toFixed(0)} kB total)`)
}

const categoryBlurb = {
  Engineering: 'How systems get built, module by module.',
  Products: 'Field notes from shipping real products.',
  'Business Technology': 'Tools that change how a business runs.',
  'Why OMIX': 'How we work, and why it matters.',
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
