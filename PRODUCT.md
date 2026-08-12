# Product

## Register

brand

Repo note: Nova Lingua is a monorepo with two future surfaces, developed as separate projects per [ADR 0004](docs/adr/0004-landing-and-admin-are-separate-projects.md) — the landing (`landing/`, brand register, design IS the product) and an admin app (not yet started, product register, design SERVES the product). This file's register default is brand, scoped to the landing. When the admin project starts, give it its own PRODUCT.md with `register: product`.

## Users

Adults in Tyumen (18+) deciding whether to commit to in-person language lessons — English, Spanish, Chinese, or Russian as a foreign language. They land here mid-decision, not mid-purchase: the page's job is to move them from "maybe" to booking a free trial lesson. Two recurring visitor shapes: someone who tried and dropped a language before (online classes, big groups, inconsistent scheduling) and is skeptical it'll stick this time; and someone unsure of their level, hesitant to commit before knowing where they'd start.

## Product Purpose

A single conversion surface: get the visitor to submit the three-field Заявка (name, contact, Язык) and book a free trial lesson. Everything on the page exists to remove a specific reason people abandon language learning — group size, teacher turnover, inconsistent schedule, easy-to-cancel online lessons — and show it's solved here, in person, at Максима Горького, 74. The self-assessment quiz is a stated objection-removal device, not a lead-qualification tool: its result never reaches the Заявка or the admin (see `CONTEXT.md`).

Secondary purpose: this is a portfolio piece for EasyBusiness, demonstrating production-grade landing craft for prospective clients, not a real client engagement (see `CONTEXT.md`).

Success: trial-lesson signups, and a page that reads as premium, unhurried work when shown as a portfolio example.

## Brand Personality

Calm corporate minimalism: one cobalt axis on a cold neutral, geometric grotesque type, movement only as a response to action. Confident and specific rather than warm-and-friendly — the page states facts (group size, schedule, price) instead of selling with enthusiasm. Fixed as documented in `design/design-system.md` section 1.

## Anti-references

- Warm/paper-toned neutrals and cream accents — tried and rejected; they split the palette across two chromatic axes and diluted the brand.
- A second brand color for hierarchy — hierarchy comes from scale-step and area within the single cobalt axis, never a new hue.
- The reference palette's pastels `#A8D0EF` / `#99C3E4` — ~2.5:1 on white, unusable as interactive color. The nearby in-scale steps `cobalt-200`/`cobalt-300` stayed but only as light-theme surface or dark-theme accent, never as small interactive text.
- Generic SaaS/EdTech warmth (soft illustrations, rounded mascot-style icons, "friendly" gradients) — this is a school with a 74 Maxima Gorkogo address and 12 years of history, not an app.

## Design Principles

- One CTA, said the same way everywhere: "Записаться на бесплатное пробное." It names what the visitor gets, never the action they take.
- Show the real people. Every teacher who might take the visitor's class is named and pictured — the page never hides behind stock generality.
- Low density, space as the argument. Brand register: `py-24`…`py-32` between sections, not the product app's `py-4`…`py-6`. Restraint reads as premium here.
- One chromatic axis, no decorative second color. Hierarchy is scale-step and area, never hue.
- Motion only as a response to action — appearing sections, button feedback. No scroll choreography, no decoration-motion.
- Honesty over conversion-optimization tricks. The level quiz can honestly tell someone they're a beginner; the trial lesson has no fine print about payment ("если не подошло, вы ничего не должны").

## Accessibility & Inclusion

WCAG 2.1 AA minimum, with several pairs already exceeding it to AAA (documented in `design/design-system.md` section 10):
- Contrast: `foreground`/`background` 17.0:1, `muted-foreground`/`background` 4.9:1, white on `primary` 8.3:1, `primary` on `background` 8.0:1, status soft-backgrounds 6.0–6.8:1.
- Status is never color-only: icon + word together, verified by desaturating (grayscale) and confirming badges stay distinguishable.
- Focus ring always visible on every interactive element, via the single `.nl-focus` utility: `outline: 3px solid var(--ring)` at 2px offset on `:focus-visible`, with `.nl-focus-light` recolouring it for controls on a brand-deep fill. No element restates the rule and none ships without it.
- Forms: label linked via `htmlFor`, errors via `aria-describedby`, invalid fields via `aria-invalid`.
- `prefers-reduced-motion: reduce` keeps opacity transitions, drops transform/movement.
- Logo is an `<img>` with meaningful `alt`, never a background image.
