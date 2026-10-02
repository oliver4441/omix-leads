# OMIX Journal design-agent rules

## Required design skills
For every UI, UX, visual, responsive, interaction, animation, or frontend redesign task in this repository, use these installed skills before changing the interface:

1. `.opencode/skills/design-taste-frontend/SKILL.md` — editorial anti-slop direction and design read.
2. `.opencode/skills/ui-ux-pro-max/SKILL.md` — UI/UX system, accessibility, responsive and visual-quality review.
3. `.opencode/skills/web-animation-skills/` — web motion, timing, interaction and animation patterns.
4. `.opencode/skills/motion-design-skills/` — motion composition and animation craft.

The source repositories are:
- https://github.com/Leonxlnx/taste-skill
- https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- https://github.com/iart-ai/motion-skills

## Blog-specific direction
Read the task as an editorial engineering journal, not a generic SaaS dashboard. Preserve the OMIX identity and existing content architecture while improving hierarchy, typography, spacing, interaction quality, accessibility and perceived polish.

For motion:
- Prefer purposeful, short transitions over decorative animation.
- Respect `prefers-reduced-motion`.
- Avoid animation that delays reading or navigation.
- Keep mobile performance a first-class constraint.
- Verify hover/focus/touch states and route transitions.

For UI/UX:
- Use one coherent visual system per surface.
- Maintain keyboard accessibility and visible focus states.
- Do not introduce arbitrary gradients, excessive glass effects, or generic AI-purple styling.
- Do not add dependencies when native CSS is sufficient.
- Run lint/build after frontend changes.

Before a substantial redesign, state the design read internally from the skills and apply the relevant rules rather than mixing unrelated aesthetics.

## Hand-drawn design system (current direction)
The interface now uses the sketchbook/hand-drawn style. Before changing any UI:

1. Tokens and primitives live in `src/styles/design-system.css` — colours, wobbly
   radii, hard offset shadows, spacing and every `.btn` / `.card` / `.field`
   variant. Add a new token there rather than a one-off value in a component.
2. Shared page layouts live in `src/styles/journal-surfaces.css` (chrome, page
   headers, reading column, admin, form surfaces). Prefer extending those
   classes over inventing page-local CSS.
3. Motion lives in `src/styles/journal-motion.css` and must stay inside the
   `prefers-reduced-motion` opt-out.
4. Decorative SVG lives in `src/components/Doodles.jsx`; ornament is always
   `aria-hidden` and strokes with `currentColor`.
5. Tailwind utilities are for layout only. Never reach for `bg-white`,
   `text-slate-*` or a static colour utility — they cannot follow the
   `.theme-dark` token swap and produce half-themed components.
6. Fonts (Kalam + Patrick Hand) are self-hosted through `@fontsource` packages
   imported in `src/main.jsx`. Do not add a Google Fonts `<link>`.

## PWA rules
- The manifest is a static file (`public/manifest.webmanifest`). `vite-plugin-pwa`
  cannot emit files under Vite 8/Rolldown — do not re-enable `injectRegister` or
  `manifest` in `vite.config.js` without proving the files land in `dist/`.
- Registration lives in `src/lib/pwa.js`; install UI is `src/components/InstallBanner.jsx`
  (one global banner — do not add a second install affordance elsewhere).
- Icons are generated (`npm run icons` from `scripts/generate-icons.mjs`), never
  hand-edited. Keep the maskable variant's artwork inside the 80% safe zone.
- Never enable `devOptions` for the service worker: it serves stale shells and
  makes HMR look broken.
- `npm run build` runs `scripts/verify-pwa.mjs`; treat a failure as a build break,
  not a warning. It also checks that every og:image resolves.
- Share cards are generated (`npm run og`), never committed. Shared geometry for
  icons and cards lives in `scripts/lib/handdrawn.mjs`; TTF copies in
  `scripts/fonts/` exist only for build-time rendering (both fonts are OFL, licences
  included) — the app itself loads its fonts from `@fontsource`.
