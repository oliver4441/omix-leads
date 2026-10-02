/**
 * App icon generator — `npm run icons`
 * -------------------------------------------------------------------------
 * Produces every raster icon the PWA manifest and iOS need, from geometry
 * defined here, so the brand set can be regenerated instead of hand-edited.
 *
 * Design intent: the OMIX knot from the brand mark, redrawn in the hand-drawn
 * design system — a wobbly marker ring on warm paper with a pencil border and
 * a correction-marker spark. Deliberately geometric: no text, because an icon
 * is read at 48px long before it is read at 512px.
 *
 * Variants
 *   tile      rounded paper tile + pencil border  → purpose "any"
 *   maskable  full-bleed paper, art in the safe zone → purpose "maskable"
 */

import { Resvg } from '@resvg/resvg-js'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = resolve(root, 'public')

/* --------------------------------------------------------------- palette -- */
const PAPER = '#fdfbf7'
const INK = '#2d2d2d'
const BLUE = '#2d5da1'
const RED = '#ff4d4d'
const GRAIN = '#e5e0d8'

/* ------------------------------------------------------------ geometry ----- */
const SIZE = 512

/* Deterministic jitter: the same seed always draws the same "hand". */
function mulberry32(seed) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/* Catmull-Rom through the jittered points, emitted as cubic béziers. */
function smoothClosed(points) {
  const n = points.length
  let d = `M${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n]
    const p1 = points[i]
    const p2 = points[(i + 1) % n]
    const p3 = points[(i + 2) % n]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += `C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  return `${d}Z`
}

/* An irregular ring: uneven radius, uneven stroke weight, never a circle.
   The inner edge is derived from the outer one so the wall stays even — two
   independently jittered paths produce a spiky hole at small sizes. */
function wobblyRing({ cx, cy, r, wall, seed, steps = 36 }) {
  const rand = mulberry32(seed)
  const phase = rand() * Math.PI * 2
  const outer = []
  const inner = []
  for (let i = 0; i < steps; i++) {
    const a = (i / steps) * Math.PI * 2
    const low = Math.sin(3 * a + phase) * 0.019 + Math.cos(2 * a + phase * 1.7) * 0.013
    const noise = (rand() - 0.5) * 0.016
    const ro = r * (1 + low + noise)
    const w = wall * (1 + Math.sin(2 * a + phase * 0.6) * 0.15 + (rand() - 0.5) * 0.07)
    outer.push([cx + Math.cos(a) * ro, cy + Math.sin(a) * ro])
    inner.push([cx + Math.cos(a) * (ro - w), cy + Math.sin(a) * (ro - w)])
  }
  return `${smoothClosed(outer)} ${smoothClosed(inner)}`
}

/* Hand-drawn exclamation mark — the same flourish that rotates in the hero.
   Used instead of a generic sparkle: it is the design system's own signature
   and it survives being scaled to 48px, where a starburst turns to mush.
   Returns the stroked stem and the separate dot. */
function bang({ x, y, h, seed = 5 }) {
  const rand = mulberry32(seed)
  const lean = 0.1
  const stemTop = [x + h * lean, y]
  const stemBottom = [x - h * 0.04, y + h * 0.62]
  const cx1 = x + h * 0.13 + (rand() - 0.5) * h * 0.04
  const cy1 = y + h * 0.2
  const cx2 = x - h * 0.09
  const cy2 = y + h * 0.45
  const stem = `M${stemTop[0].toFixed(1)} ${stemTop[1].toFixed(1)}C${cx1.toFixed(1)} ${cy1.toFixed(1)} ${cx2.toFixed(1)} ${cy2.toFixed(1)} ${stemBottom[0].toFixed(1)} ${stemBottom[1].toFixed(1)}`

  const dotY = y + h * 0.88
  const dotR = h * 0.16
  const steps = 14
  const pts = []
  for (let i = 0; i < steps; i++) {
    const a = (i / steps) * Math.PI * 2
    const r = dotR * (1 + (rand() - 0.5) * 0.12)
    pts.push([x - h * 0.02 + Math.cos(a) * r, dotY + Math.sin(a) * r])
  }
  return { stem, dot: smoothClosed(pts) }
}

/* Pencil border tile with uneven corners. */
function wobblyTile(inset, seed = 3) {
  const rand = mulberry32(seed)
  const s = inset
  const e = SIZE - inset
  const corner = 74
  const pts = []
  const push = (x, y) => pts.push([x + (rand() - 0.5) * 7, y + (rand() - 0.5) * 7])
  push(s + corner, s)
  push((s + e) / 2, s + (rand() - 0.5) * 8)
  push(e - corner, s)
  push(e, s + corner)
  push(e - (rand() - 0.5) * 8, (s + e) / 2)
  push(e, e - corner)
  push(e - corner, e)
  push((s + e) / 2, e + (rand() - 0.5) * 8)
  push(s + corner, e)
  push(s, e - corner)
  push(s + (rand() - 0.5) * 8, (s + e) / 2)
  push(s, s + corner)
  return smoothClosed(pts)
}

/* Grain: the notebook dot grid, faint enough to survive scaling down. */
function grain() {
  return `<pattern id="grain" width="32" height="32" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="2.4" fill="${GRAIN}"/>
    </pattern>`
}

/* ------------------------------------------------------------- variants --- */
function art({ scale = 1 }) {
  const cx = SIZE / 2
  const cy = SIZE / 2
  const r = 124 * scale
  /* The bang sits on the up-right diagonal with clear air around it: placed any
     closer it fuses with the ring and reads as a smudge at small sizes. */
  return {
    ring: wobblyRing({ cx, cy, r, wall: 42 * scale, seed: 11 }),
    bang: bang({ x: cx + 150 * scale, y: cy - 138 * scale, h: 78 * scale }),
  }
}

function tileSvg() {
  const { ring, bang: b } = art({ scale: 1 })
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>${grain()}</defs>
  <rect width="${SIZE}" height="${SIZE}" rx="96" fill="${PAPER}"/>
  <rect width="${SIZE}" height="${SIZE}" rx="96" fill="url(#grain)"/>
  <path d="${wobblyTile(30)}" fill="none" stroke="${INK}" stroke-width="17" stroke-linejoin="round"/>
  <path d="${ring}" fill="${BLUE}" fill-rule="evenodd"/>
  <path d="${b.stem}" fill="none" stroke="${RED}" stroke-width="23" stroke-linecap="round"/>
  <path d="${b.dot}" fill="${RED}"/>
</svg>`
}

function maskableSvg() {
  const { ring, bang: b } = art({ scale: 0.72 })
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <rect width="${SIZE}" height="${SIZE}" fill="${PAPER}"/>
  <path d="${ring}" fill="${BLUE}" fill-rule="evenodd"/>
  <path d="${b.stem}" fill="none" stroke="${RED}" stroke-width="17" stroke-linecap="round"/>
  <path d="${b.dot}" fill="${RED}"/>
</svg>`
}

/* Favicon: same mark, no tile — it is already framed by the browser tab. */
function faviconSvg() {
  const { ring, bang: b } = art({ scale: 0.92 })
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <rect width="${SIZE}" height="${SIZE}" rx="120" fill="${PAPER}"/>
  <path d="${ring}" fill="${BLUE}" fill-rule="evenodd"/>
  <path d="${b.stem}" fill="none" stroke="${RED}" stroke-width="24" stroke-linecap="round"/>
  <path d="${b.dot}" fill="${RED}"/>
</svg>`
}

/* ------------------------------------------------------------- rendering -- */
function render(svg, size) {
  return new Resvg(svg, {
    fitTo: { mode: 'width', value: size },
    background: 'rgba(0,0,0,0)',
  })
    .render()
    .asPng()
}

const targets = [
  ['pwa-192x192.png', tileSvg(), 192],
  ['pwa-512x512.png', tileSvg(), 512],
  ['pwa-maskable-192x192.png', maskableSvg(), 192],
  ['pwa-maskable-512x512.png', maskableSvg(), 512],
  ['apple-touch-icon.png', tileSvg(), 180],
  ['favicon-96x96.png', tileSvg(), 96],
]

async function main() {
  await mkdir(outDir, { recursive: true })

  for (const [name, svg, size] of targets) {
    await writeFile(resolve(outDir, name), render(svg, size))
    console.log(`icons: ${name} (${size}×${size})`)
  }

  await writeFile(resolve(outDir, 'favicon.svg'), faviconSvg())
  console.log('icons: favicon.svg (scalable)')

  await writeFile(resolve(outDir, 'icon.svg'), tileSvg())
  console.log('icons: icon.svg (master source)')
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
