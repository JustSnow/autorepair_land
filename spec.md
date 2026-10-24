# Spec

## Problem Statement

Cold visitors looking for auto service do not trust unknown shops: they fear opaque estimates, upsell traps, and unclear next steps. They need proof of real work first, then a clear path to book diagnostics or repair.

## Solution

A single static landing for **AutoRepairServiceLand**: portfolio-first proof (work gallery), then a professional-service selling story (benefits, services, process, team, testimonials, “from …” prices, FAQ), ending in a **Записаться** modal that demonstrates success locally (Russian tip; no backend). Built with Vite to static assets, hosted on GitHub Pages, with README for build and deploy.

## User Stories

1. As a cold visitor, I want a hero with brand, short offer, real car imagery, and a clear primary CTA, so that I know what this shop is within the first viewport.
2. As a cold visitor, I want an early work gallery (including reused reference photos), so that I can judge craft before reading a sales pitch.
3. As a cold visitor, I want paired pain↔outcome benefits, so that my stakes and the shop’s promise are explicit.
4. As a visitor, I want a services list with “from …” prices, so that I can gauge cost range without a full quote.
5. As a visitor, I want a short how-it-works sequence, so that I know what happens after I book.
6. As a visitor, I want to see team faces (placeholders OK), so that the service feels human and professional.
7. As a visitor, I want testimonials and an HTML FAQ, so that common objections are answered without leaving the page.
8. As a visitor, I want «Записаться» from hero, sticky nav CTA, and final CTA to open the same modal form, so that booking intent is always one click away.
9. As a visitor, I want submit to close the modal and show a Russian success tip with no network request, so that the demo feels complete without a backend.
10. As a visitor on mobile or with reduced motion, I want a usable layout and an instant final motion frame, so that the page remains readable and operable.
11. As a sharer/crawler on preview, I want correct `lang`, title, meta, OG/Twitter fields, and `noindex`, so that preview is not indexed and share cards are coherent.
12. As a developer, I want a README for Vite static build and GitHub Pages, so that I can compile and publish without guessing.

## Implementation Decisions

### Landing type and theme

- **Type:** portfolio + selling hybrid — **portfolio primary**, selling secondary.
- **Theme:** `professional_service` ([`themes.md`](../references/shared/themes.md) / skill shared refs).
- **R elements:** `hero_offer`, `benefit_item`, `testimonial`, `cta_form`, `how_it_works_step`, `team_member`.
- **E kept:** `faq_item`, `logo_proof` (via hero/gallery imagery, not a separate marquee), `portfolio_project`, `service_item`.
- **Pricing:** “from …” in services / price section — not a ≥2-plan `pricing_plan` table (no featured plan).
- **Waives:** no full `service_area` block; short contacts only at final CTA if needed.
- **Composition recipes:** early **deep gallery** (not early marquee); **pain↔outcome mirror** on; featured plan off ([`default-blocks.md`](../references/shared/default-blocks.md)).

### Section order and layout

Follow implement `landing-implement/references/surface/grid.md` for rail/gutter/gaps/breakpoints. Multi-col sections declare `layout:`:

1. Hero (`hero_offer` + CTA) — full-bleed focal media; `layout: split-equal` (offer column `stack` in the first track; second track left empty so the focal car stays visible at lg+)
2. Work gallery — carousel presentation; static stills row `media-row-2` where used
3. Value / benefits — pain↔outcome — `split-equal`
4. Services (`service_item`) — `thirds`
5. How it works — `thirds`
6. Team — `thirds` (or `quad` if four)
7. Testimonials — `stack` + carousel container
8. Price “from …” — `stack`
9. FAQ — `stack` (accordion; answers in HTML DOM)
10. Final CTA + modal form — `stack`

**Nav:** compact top links (Услуги, Работы, Как работаем, Цены, FAQ) + **sticky** primary CTA «Записаться» (not a fully sticky header).

### Brand, CTA, form, price, copy

- **Brand:** AutoRepairServiceLand — full-cycle auto service for passenger-car owners: diagnostics, repair, and scheduled maintenance with a transparent estimate, clear timelines, and online booking.
- **Audience:** cold; honest service without upsell traps or surprise timelines/prices.
- **Primary CTA:** «Записаться» → modal form (name, phone, optional car/service). On submit: close modal + Russian success tip (e.g. «Заявка отправлена»). **No** mailto, Formspree, or backend.
- **Secondary:** clickable phone placeholder `+7 (000) 000-00-00`.
- **Price:** after benefits / in services — “from …” ₽; not in hero. Placeholder amounts OK at implement.
- **Team:** 3 placeholder members.
- **Tone:** вы. **Page copy language:** Russian.
- **Footer:** © AutoRepairServiceLand + note that the form is a demo and data is not sent.

### Visual system

- **Palette:** charcoal / steel / off-white (~90%); accent red (≤10%); soft alternate charcoal grounds. Section grounds default; interactive stroke/fill; two-tier accent. Cyan from diagnostic-tablet ref local to that image only.
- **Type:** Fira Sans Extra Condensed (headings) + IBM Plex Sans (body). Replaces Barlow Condensed, which has no Cyrillic subset.
- **Focal:** hero full-bleed knolling SUV (ref1); logo mark ref4; gallery refs 1–3, 5–6 with reuse (~6–8 slots). Ref1 is only 650×1024, so below 1024px it covers the full hero; at lg+ it is a full-height plane bleeding off the right edge over the full-bleed mood plate (no upscaling). Swap to edge-to-edge cover once a ≥1920px-wide ref1 exists.

### Motion

- Id: `load-atmosphere` (matches CONTEXT).
- Phase 1: dark garage/metal atmosphere (mood refs 5–6). Phase 2: chrome + nested hero cascade; freeze; no ambient loop.
- `motion_recipes: [pointer-reactive-atmosphere, carousel-transition, how-it-works-stagger]`
- Budget: those three + media-row hover; CTA outside parallax planes; `prefers-reduced-motion` → instant final frame.

### Stack and deploy

- Tier: `static-prerender+enhanced-js`
- `enhanced_js: true`
- `libs: []` — vanilla pointer-parallax; carousel via CSS scroll-snap and/or vanilla (no Atropos, no Splide)
- Build: Vite → static
- Host: GitHub Pages
- Deliverable: **README** (local compile + Pages setup)
- Analytics: none
- Backend: none

### Reference lock

1. Knolling grey SUV — hero / atmosphere  
2. Diagnostic tablet — proof (cyan UI local)  
3. Hands on engine — portfolio / craft  
4. Wrench + gear emblem — logo / mark  
5. Red sports car, garage — portfolio + load mood  
6. Injectors + red car — portfolio + load mood  

Gallery may reuse refs. Load stills are mood plates (co-designed entrance), not a timed video sequence.

### SEO contract

```yaml
seo:
  environment: preview
  indexing: noindex
  production_url: null
  canonical_url: null
  html_lang: ru

  keywords:
    primary: "автосервис"
    secondary:
      - "диагностика авто"
      - "ремонт авто"
      - "запись в автосервис"
      - "прозрачная смета"
    intent: commercial

  title: "AutoRepairServiceLand — автосервис, диагностика и ремонт"
  meta_description: "Полный цикл: диагностика, ремонт и ТО с прозрачной сметой и записью онлайн. Посмотрите работы и оставьте заявку — AutoRepairServiceLand."

  open_graph:
    type: website
    title: "AutoRepairServiceLand — автосервис, диагностика и ремонт"
    description: "Полный цикл: диагностика, ремонт и ТО с прозрачной сметой и записью онлайн."
    url: null
    site_name: "AutoRepairServiceLand"
    locale: ru_RU
    image_url: null
    image_alt: "Тёмный SUV в студии в окружении разобранных деталей — AutoRepairServiceLand"

  twitter_card:
    card: summary_large_image
    title: "AutoRepairServiceLand — автосервис, диагностика и ремонт"
    description: "Полный цикл: диагностика, ремонт и ТО с прозрачной сметой и записью онлайн."
    image_url: null
    site: null
    creator: null

  json_ld:
    organization:
      type: Organization
      name: "AutoRepairServiceLand"
      url: null
      logo_url: null
      same_as: []
    web_page:
      name: "AutoRepairServiceLand — автосервис, диагностика и ремонт"
      url: null
    offer: null

  on_page:
    h1: "Честный автосервис с прозрачной сметой"
    faq_in_html: true
```

Notes: preview → `noindex`. Absolute `production_url` / canonical / OG/Twitter/JSON-LD URLs and share image absolute HTTPS URL are set at production cutover (hero ref1 as default share asset when URLs exist). No `FAQPage` / `QAPage` JSON-LD. No Offer JSON-LD (only “from …” market copy).

Sources folded in: confirmed `CONTEXT.md`, `DESIGN.md`, reference lock, gap-fill (incl. SEO pass).

## Acceptance Criteria

AC-1: First viewport shows brand AutoRepairServiceLand, H1 matching `seo.on_page.h1`, short offer, primary CTA «Записаться», and full-bleed hero imagery (knolling SUV). Evidence: hero

AC-2: Work gallery appears immediately after hero with ≥6 slots using locked refs (reuse allowed) and carousel/manual controls. Evidence: gallery section

AC-3: Benefits use a pain↔outcome mirror with matching pair count and `layout: split-equal`. Evidence: value section

AC-4: Services section lists items with visible “from …” ₽ ranges; no multi-plan comparison table. Evidence: services / price

AC-5: How-it-works shows 3–5 steps with `how-it-works-stagger` when motion is enabled. Evidence: how-it-works

AC-6: Team section shows 3 members (placeholders OK) with `layout: thirds` or `quad`. Evidence: team

AC-7: Testimonials and FAQ are present; each FAQ Q/A is in HTML without needing JS to read answers. Evidence: testimonials + FAQ

AC-8: Primary CTA label is «Записаться» in hero, sticky nav control, and final CTA; all open the same booking modal. Evidence: hero + nav + final CTA

AC-9: Form fields are name, phone, optional car/service; submit closes modal and shows a Russian success tip; no mailto/network form transport. Evidence: modal form

AC-10: Page is usable on narrow viewports; with `prefers-reduced-motion`, load phases collapse to the final frame and pointer-parallax does not couple. Evidence: layout + motion

AC-11: Stack is `static-prerender+enhanced-js` with `libs: []`; pointer-parallax and carousel work without Atropos/Splide; CTA stays outside moving depth planes. Evidence: Implementation Decisions + runtime

AC-12: `seo.environment` preview uses `noindex`; `html_lang` is `ru`; document title and meta description match the SEO contract; single H1 matches contract. Evidence: `<head>` + hero

AC-13: Open Graph type is `website`; Twitter card is `summary_large_image`; JSON-LD includes Organization + WebPage and does not emit FAQPage/QAPage or Offer. Evidence: `<head>` / JSON-LD

AC-14: README documents Vite build for static output and GitHub Pages setup. Evidence: README

AC-15: Footer includes © AutoRepairServiceLand and demo-form notice. Evidence: footer

AC-16: Motion uses `load-atmosphere` plus recipes `pointer-reactive-atmosphere`, `carousel-transition`, `how-it-works-stagger` within the stated budget. Evidence: DESIGN / implemented motion

## Out of Scope

- Real form backend, CRM, email/SMS transport
- Analytics IDs (Metrika/GA)
- Vendored Atropos, Splide, or other motion/carousel libraries
- `FAQPage` / `QAPage` JSON-LD; sitemap.xml / robots.txt baseline
- Production indexing / canonical until an agreed production URL exists
- A/B frameworks, ads packs, quiz/gamification, multi-location local SEO hub
- Custom domain setup beyond documenting Pages in README

## Further Notes

- CONTEXT and DESIGN are inputs only; **this `spec.md` is the build source of truth** for `landing-implement`.
- Page copy: Russian; artifacts (this spec): English.
- Phone and prices are placeholders until real business data is supplied.
- Share/OG absolute image URLs remain `null` until production URL + asset hosting path are known; prefer hero ref1 as the page-specific share image.
