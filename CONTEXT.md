# Context

## Problem / goal

Landing goal: sale

Cold visitors should trust the shop via portfolio/work proof first, then convert to a service request (hybrid portfolio + selling).

## Landing type

portfolio + selling (hybrid; portfolio primary, selling secondary)

## Theme

`professional_service`

R cells apply: `hero_offer`, `benefit_item`, `testimonial`, `cta_form`, `how_it_works_step`, `team_member`.  
E kept unless later waived: `faq_item`, `logo_proof`, `portfolio_project`, `service_item`; `pricing_plan` when ≥2 plans — otherwise “from …” pricing in services.  
No full `service_area` R; short contacts/NAP only if needed. No explicit waives yet.

## Audience familiarity

cold

Implication: more proof and explanation before a hard sell; depth medium, not a SaaS manual.

## Brand / product

**AutoRepairServiceLand** — full-cycle auto service for passenger-car owners: diagnostics, repair, and scheduled maintenance with a transparent estimate, clear timelines, and online booking, so the visitor understands the work scope, price range, and next step before leaving the car.

## Audience and pain

Passenger-car owners who want honest service without upsell traps or surprise timelines/prices; they do not know the brand yet.

## Primary CTA

Label: **Записаться** → opens a modal form (fields: name, phone, optional car/service).

On submit: close the modal and show a localized (Russian) success tip (e.g. «Заявка отправлена»). No mailto, Formspree, or real backend — demo success only.

Secondary: clickable phone is OK.

## Price

Placement: after benefits / in services. Specificity: “from …” ranges. Not in the hero.

## Constraints

- Tone: **вы** (formal Russian address)
- Page copy language: **Russian**
- Demo form only (fake success tip; no outbound form transport)
- Deliverable for implement: **README** documenting Vite build for static output and GitHub Pages setup
- Parallax intent (recipe `pointer-reactive-atmosphere`) — detail and library consent in DESIGN
- Bans / legal / deadlines: none stated

## Motion

`load-atmosphere`

(Extra motion / parallax recipes belong in DESIGN — not listed here.)

## Deploy and stack

Stack tier: `static-prerender+enhanced-js`

- Build: Vite → static HTML/CSS/JS
- Host: GitHub Pages
- README: how to compile for static and deploy to Pages
- Enhanced JS intent: pointer-parallax (`pointer-reactive-atmosphere`); library consent deferred to DESIGN (preferred: vanilla, `libs: []`)
- Backend: none required (demo form)

## Analytics

none

## Canonical terms

- **Brand:** AutoRepairServiceLand
- **Offer:** full-cycle auto service + transparent estimate + online booking
- **Primary CTA:** Записаться (modal form → RU success tip)
- **Form:** demo-only; no mailto / external endpoint
- **Hybrid order:** portfolio first, then selling
