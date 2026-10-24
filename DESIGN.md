# Design

## Palette

Base ~90%: charcoal, steel grey, off-white text. Accent ≤10%: **red** (from garage portfolio refs). Soft alternate section surfaces: slightly lighter charcoal grounds.

**Pairing habits:** Section **grounds** as the default surface (not card chrome everywhere). Interactive controls use stroke/fill differentiation. Two-tier accent — primary CTA (solid red) vs secondary links/text accents. Cyan from the diagnostic-tablet ref stays local to that imagery only; do not promote it to the page theme. Avoid purple gradients and cream/serif “AI default” looks.

## Type pair

- Headings: **Fira Sans Extra Condensed** (Barlow Condensed has no Cyrillic)
- Body: **IBM Plex Sans**

## Focal visual

Real imagery (not scheme-only).

- **Hero:** full-bleed knolling dark-grey SUV studio shot (ref1) as the dominant edge-to-edge plane; brand + short offer + primary CTA in the reading path.
- **Chrome mark:** wrench/gear/piston emblem (ref4).
- **Portfolio / gallery:** refs 1–3, 5–6; reuse allowed to fill ~6–8 slots.
- **Proof / craft stills:** diagnostic tablet (ref2), hands-on engine work (ref3), red garage car (ref5), injectors + red car (ref6).

## Block order

1. Hero (`hero_offer` + primary CTA)
2. Work gallery (`portfolio_project` / media — early, portfolio-primary)
3. Value / benefits — pain↔outcome mirror (`benefit_item` pairs)
4. Services (`service_item`)
5. How it works (`how_it_works_step`)
6. Team (`team_member`)
7. Testimonials (`testimonial`)
8. Price — “from …” ranges (not a ≥2-plan comparison table)
9. FAQ (`faq_item`)
10. Final CTA — repeat primary CTA; form in modal (demo success tip per CONTEXT)

No early marquee. No featured pricing plan. No full `service_area` block (short contacts/NAP only if needed at final CTA). `logo_proof` optional via imagery in gallery/hero, not a separate marquee strip.

## Composition recipes

- **Early proof strip *or* deep gallery:** **deep gallery** early (after hero). Early marquee **off**.
- **Pain↔outcome mirror:** **on** (cold + `professional_service`).
- **Carousel length:** gallery ~6–8 slots with ref reuse; testimonials few slides, manual controls.
- **Featured plan:** **off** (single “from …” pricing, not multi-plan).

## Layout

- Follow implement skill `landing-implement/references/surface/grid.md` (rail, gutter, gaps, breakpoints, child rules).
- Multi-col sections:
  - Hero offer column: `stack` (media full-bleed outside rail as needed)
  - Gallery stills (non-carousel row): `media-row-2`
  - Pain↔outcome: `split-equal`
  - Services: `thirds`
  - How it works: `thirds`
  - Team: `thirds` (or `quad` if four members)
  - Testimonials / price / FAQ / final CTA: `stack` (FAQ as accordion in stack)

## Motion

Id: **`load-atmosphere`** (matches CONTEXT).

- **Phase 1:** Dark garage / metal atmosphere plate (mood from refs 5–6); offer/CTA not the focus of this phase.
- **Phase 2:** Chrome + content; nested hero cascade (headline → support → primary CTA); freeze final frame.
- **Tempo:** within motion.md caps (total ≤ ~2s until offer/CTA readable).
- **Source:** co-designed (load stills are mood plates, not a timed entrance video); no ambient-loop opt-in.
- **`motion_recipes`:** `pointer-reactive-atmosphere`, `carousel-transition`, `how-it-works-stagger`
- **Motion budget:** those three recipes + media-row hover on gallery stills; primary-CTA hover folded into budget (not an extra free beat). CTA and reading path **outside** moving parallax depth planes. `prefers-reduced-motion`: instant final frame; no pointer coupling.

## Enhanced JS

`needs_enhanced_js: true`  
`libs: []` — vanilla layered pointer-parallax; carousel via CSS scroll-snap and/or vanilla controls (no Atropos, no Splide). Matches CONTEXT stack `static-prerender+enhanced-js`.

## Reference lock

Six assets locked:

1. Knolling grey SUV (hero / atmosphere)
2. Diagnostic tablet (proof; cyan UI local only)
3. Hands on engine (portfolio / craft)
4. Wrench + gear emblem (logo / mark)
5. Red sports car, low garage (portfolio + load mood)
6. Injectors FG + red car BG (portfolio + load mood)

Gallery may reuse refs. Load entrance: mood stills only → co-designed phases above.
