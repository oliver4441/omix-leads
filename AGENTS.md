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
