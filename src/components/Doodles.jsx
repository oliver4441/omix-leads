/* ============================================================================
   Doodle kit — hand-drawn SVG marks used as decoration.
   Everything strokes with currentColor so the marks follow the theme, and each
   one is aria-hidden: they are ornament, never information.
   Keep them small, reusable and composable rather than one-off inline SVG.
   ========================================================================== */

function Svg({ viewBox = '0 0 120 120', className = '', style, children, ...rest }) {
  return (
    <svg
      viewBox={viewBox}
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  )
}

/* Curvy arrow used to point at the primary call to action. */
export function ScribbleArrow(props) {
  return (
    <Svg viewBox="0 0 120 90" {...props}>
      <path d="M4 8c14 26 34 46 62 55" strokeDasharray="6 7" />
      <path d="M52 76l17 5-2-18" />
    </Svg>
  )
}

/* Squiggly connector, for linking steps in a process. */
export function Squiggle(props) {
  return (
    <Svg viewBox="0 0 160 20" {...props}>
      <path d="M3 12c10-12 20-12 30 0s20 12 30 0 20-12 30 0 20 12 30 0" />
    </Svg>
  )
}

/* Rough hand-drawn circle, for circling a word or a price. */
export function RoughCircle(props) {
  return (
    <Svg viewBox="0 0 220 110" preserveAspectRatio="none" {...props}>
      <path d="M112 9c44-4 96 12 100 42 5 33-43 55-99 55C57 106 8 92 5 60 3 33 42 14 84 11c14-1 28-2 42-2" />
      <path d="M186 26c8 9 12 18 12 27" opacity=".6" />
    </Svg>
  )
}

/* Crop-mark frame corners — frames a sketch like a viewfinder. */
export function CornerMarks({ className = '' }) {
  const corner = 'absolute h-6 w-6 border-current'
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      <span className={`${corner} left-0 top-0 border-l-[3px] border-t-[3px]`} />
      <span className={`${corner} right-0 top-0 border-r-[3px] border-t-[3px]`} />
      <span className={`${corner} bottom-0 left-0 border-b-[3px] border-l-[3px]`} />
      <span className={`${corner} bottom-0 right-0 border-b-[3px] border-r-[3px]`} />
    </span>
  )
}

/* Little sparkle/starburst flourish. */
export function Starburst(props) {
  return (
    <Svg viewBox="0 0 40 40" {...props}>
      <path d="M20 3v10M20 27v10M3 20h10M27 20h10M9 9l6 6M25 25l6 6M31 9l-6 6M15 25l-6 6" />
    </Svg>
  )
}

/* Underlines — a loose double stroke under a heading. */
export function UnderlineScribble(props) {
  return (
    <Svg viewBox="0 0 240 18" preserveAspectRatio="none" {...props}>
      <path d="M4 8c46-6 116-8 232-3" />
      <path d="M22 15c52-5 118-6 196-2" opacity=".55" />
    </Svg>
  )
}
