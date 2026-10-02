/* ============================================================================
   Hand-drawn geometry shared by the build-time image generators
   (scripts/generate-icons.mjs, scripts/generate-og.mjs).

   Everything here is deterministic: geometry is jittered from an explicit seed
   so a rebuild produces byte-identical artwork and diffs stay meaningful.
   ========================================================================== */

/** Deterministic PRNG — same seed, same drawing, every build. */
export function mulberry32(seed) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Catmull-Rom through the points, emitted as cubic béziers. */
export function smoothClosed(points, tension = 6) {
  const n = points.length
  let d = `M${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n]
    const p1 = points[i]
    const p2 = points[(i + 1) % n]
    const p3 = points[(i + 2) % n]
    const c1 = [p1[0] + (p2[0] - p0[0]) / tension, p1[1] + (p2[1] - p0[1]) / tension]
    const c2 = [p2[0] - (p3[0] - p1[0]) / tension, p2[1] - (p3[1] - p1[1]) / tension]
    d += `C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  return `${d}Z`
}

/**
 * An irregular ring — never a circle.
 * The inner edge is derived from the outer one so the wall stays even; two
 * independently jittered paths produce a spiky hole at small sizes.
 */
export function wobblyRing({ cx, cy, r, wall, seed, steps = 36 }) {
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

/**
 * Hand-drawn exclamation mark — the flourish from the hero, the icon and now
 * every share card. Returns the stroked stem and the separate dot.
 */
export function bang({ x, y, h, seed = 5 }) {
  const rand = mulberry32(seed)
  const lean = 0.1
  const stem = [
    [x + h * lean, y],
    [x + h * 0.13 + (rand() - 0.5) * h * 0.04, y + h * 0.2],
    [x - h * 0.09, y + h * 0.45],
    [x - h * 0.04, y + h * 0.62],
  ]
  const d = `M${stem[0][0].toFixed(1)} ${stem[0][1].toFixed(1)}C${stem[1][0].toFixed(1)} ${stem[1][1].toFixed(1)} ${stem[2][0].toFixed(1)} ${stem[2][1].toFixed(1)} ${stem[3][0].toFixed(1)} ${stem[3][1].toFixed(1)}`

  const dotY = y + h * 0.88
  const dotR = h * 0.16
  const steps = 14
  const pts = []
  for (let i = 0; i < steps; i++) {
    const a = (i / steps) * Math.PI * 2
    const r = dotR * (1 + (rand() - 0.5) * 0.12)
    pts.push([x - h * 0.02 + Math.cos(a) * r, dotY + Math.sin(a) * r])
  }
  return { stem: d, dot: smoothClosed(pts) }
}

/** Pencil border tile with uneven corners, fitted to a w×h box. */
export function wobblyTile({ w, h, inset = 0, seed = 3, radius = 74 }) {
  const rand = mulberry32(seed)
  const s = inset
  const e = w - inset
  const b = h - inset
  const corner = radius
  const pts = []
  const jx = () => (rand() - 0.5) * 7
  const jy = () => (rand() - 0.5) * 7
  pts.push([s + corner + jx(), s + jy()])
  pts.push([(s + e) / 2, s + jy()])
  pts.push([e - corner + jx(), s + jy()])
  pts.push([e + jx(), s + corner])
  pts.push([e + jx(), (s + b) / 2])
  pts.push([e + jx(), b - corner])
  pts.push([e - corner + jx(), b + jy()])
  pts.push([(s + e) / 2, b + jy()])
  pts.push([s + corner + jx(), b + jy()])
  pts.push([s + jx(), b - corner])
  pts.push([s + jx(), (s + b) / 2])
  pts.push([s + jx(), s + corner])
  return smoothClosed(pts)
}

/** A wavy underline, as an open path from x0 to x0+len at baseline y. */
export function wavyLine({ x0, y, len, amp = 6, period = 38, seed = 9 }) {
  const rand = mulberry32(seed)
  let d = `M${x0.toFixed(1)} ${y.toFixed(1)}`
  let x = x0
  let up = true
  while (x < x0 + len) {
    const step = period * (0.86 + rand() * 0.28)
    const mid = x + step / 2
    const yMid = y + (up ? -amp : amp)
    const yEnd = y + (rand() - 0.5) * 2.4
    d += `Q${mid.toFixed(1)} ${yMid.toFixed(1)} ${(x + step).toFixed(1)} ${yEnd.toFixed(1)}`
    x += step
    up = !up
  }
  return d
}

/** The notebook-paper dot grid, as an SVG <pattern> body. */
export function grain({ spacing = 32, radius = 2.4, color = '#e5e0d8' }) {
  return `<pattern id="grain" width="${spacing}" height="${spacing}" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="${radius}" fill="${color}"/>
    </pattern>`
}

/** Escape a string for use inside SVG text/markup. */
export function esc(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
