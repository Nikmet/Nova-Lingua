---
name: Nova Lingua
description: Calm corporate-minimal landing for an in-person language school in Tyumen — one cobalt axis, geometric grotesque type, movement only as a response to action.
colors:
  cobalt-50: "#EDF4FE"
  cobalt-100: "#D5E6FC"
  cobalt-200: "#AECEF8"
  cobalt-300: "#7FB0F0"
  cobalt-500-working-cobalt: "#0049A9"
  cobalt-600-hover: "#003A88"
  cobalt-700: "#002B66"
  cobalt-800-ink-navy: "#001C40"
  cobalt-900-brand-base: "#001129"
  neutral-0-background: "#F9FAFC"
  neutral-50-muted: "#F3F5F7"
  neutral-100: "#E9EBEF"
  neutral-200-border: "#DBDEE3"
  neutral-400: "#999FA7"
  neutral-500-muted-foreground: "#6D747C"
  neutral-600: "#575D65"
  neutral-700: "#3B4047"
  neutral-900-foreground: "#15191D"
typography:
  display:
    fontFamily: "Montserrat Alternates, Montserrat, sans-serif"
    fontSize: "clamp(2rem, 2.4vw + 1rem, 3rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Montserrat Alternates, Montserrat, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.04em"
rounded:
  tile: "24px"
  xl: "12px"
  lg: "8px"
  md: "6px"
  full: "9999px"
spacing:
  unit: "4px"
  tile-padding-sm: "28px"
  tile-padding-lg: "40px"
  gap-default: "16px"
  section-py: "120px"
components:
  button-primary:
    backgroundColor: "{colors.cobalt-500-working-cobalt}"
    textColor: "{colors.neutral-0-background}"
    rounded: "{rounded.lg}"
    padding: "12px 22px"
  button-primary-hover:
    backgroundColor: "{colors.cobalt-600-hover}"
  button-pill:
    backgroundColor: "{colors.cobalt-500-working-cobalt}"
    textColor: "{colors.neutral-0-background}"
    rounded: "{rounded.full}"
    padding: "16px 30px"
  button-pill-hover:
    backgroundColor: "{colors.cobalt-600-hover}"
  button-outline:
    backgroundColor: "{colors.neutral-0-background}"
    textColor: "{colors.neutral-900-foreground}"
    rounded: "{rounded.lg}"
    padding: "14px 18px"
  button-outline-hover:
    backgroundColor: "{colors.cobalt-50}"
  badge-level:
    backgroundColor: "{colors.cobalt-100}"
    textColor: "{colors.cobalt-700}"
    rounded: "{rounded.lg}"
    padding: "8px 14px"
  bento-tile-dark:
    backgroundColor: "{colors.cobalt-800-ink-navy}"
    textColor: "{colors.cobalt-50}"
    rounded: "{rounded.tile}"
    padding: "40px"
---

# Design System: Nova Lingua

## 1. Overview

**Creative North Star: "The Standing Appointment"**

Every promise on this page reduces to one idea: the same evening, the same teacher, the same slot, week after week. The visual system says this before the copy does. One chromatic axis, no decoration competing for attention, no scroll choreography — a page that behaves like a kept appointment, not a pitch. This is calm corporate minimalism for adults deciding whether to commit to twelve more Tuesdays: confident and specific, stating facts (group size, schedule, price) instead of selling with enthusiasm.

The system explicitly rejects the two-axis warmth of "friendly EdTech" — soft illustrations, rounded mascot icons, cream-and-blue palettes — because Nova Lingua is a school with a street address and twelve years of history, not an app trying to look approachable. It also rejects any second brand color: hierarchy is built from scale-step and area within one cobalt axis, never from a new hue competing for the eye.

**Key Characteristics:**
- One chromatic axis (cobalt) carrying both interactive color and brand-deep fills; every neutral is cold-tinted toward it, never warm.
- Low density, brand-register spacing (`120px` between sections) — restraint reads as premium, not as emptiness.
- Flat by default. No shadow anywhere at rest; depth comes from color-step and border, not elevation.
- Motion only as a direct response to an action (button press, quiz step advancing) — never ambient or decorative.
- Type carries the same restraint as color: one display family for headlines, one body family for everything else, no third voice.

## 2. Colors

**The One Voice Rule.** The palette is a single hue family read at different lightness and chroma. Nothing in this system is "the second color" — what looks like variety is one axis stepped from near-white to near-black.

### Primary
- **Working Cobalt** (`#0049A9`): the only interactive color. Every button, link, active nav state, focus ring, and progress fill in the system. Pulled with an eyedropper directly from the logo mark — it is not a chosen brand blue, it *is* the brand mark's color extended into UI.
- **Cobalt 600, hover state** (`#003A88`): the one-step-darker hover/active target for anything filled in Working Cobalt. Never used at rest.
- **Cobalt 700** (`#002B66`): text color on cobalt-tinted soft surfaces (badges, the level-quiz result chip) — where Working Cobalt itself would be too loud for body-sized text.
- **Ink Navy** (`#001C40`), also called brand-deep: the filled dark tile. Used for the hero's message card and any bento tile that needs to read as "the brand speaking," white/cobalt-tinted text sits on top. This is the same axis as Working Cobalt, stepped to its darkest practical value — not a second color, the ink the mark is drawn in.
- **Brand Base** (`--brand-base`, `#001129`): one step below Ink Navy, footer only. It exists because the footer sits directly under the brand-deep Заявка panel and would otherwise merge into it — the step is separation, not a new color.
- **Cobalt 50 / 100 / 200 / 300** (`#EDF4FE` / `#D5E6FC` / `#AECEF8` / `#7FB0F0`): light-theme hover surfaces, soft badge backgrounds, and secondary text sitting on Ink Navy tiles (e.g. the eyebrow line above H1). Never used as small interactive text at these steps — see the Named Rule below.

### Neutral
- **Neutral 0, background** (`#F9FAFC`): page background. Not `#fff` — every neutral in this system carries a trace of cobalt chroma (0.002–0.016) so the page never reads as generically white.
- **Neutral 50, muted** (`#F3F5F7`): nested surface inside the page — the header shell, the stat tile in the hero.
- **Neutral 100** (`#E9EBEF`): row and section dividers where full-strength border would be too heavy (comparison table's inner rules).
- **Neutral 200, border** (`#DBDEE3`): the standard 1px border on cards, the hero photo frame, and the comparison table's outer rules.
- **Neutral 400** (`#999FA7`): **not a text color.** It lands at 2.6:1 on the background and was previously used for the comparison table's "before" column, which failed AA for body copy. The lesser option now reads in `muted-foreground` (4.9:1); the contrast between the two columns comes from weight and from the Nova side sitting at full-strength `foreground`, not from pushing the "before" side past legibility. Neutral 400 survives only as a non-text value.
- **Neutral 500, muted-foreground** (`#6D747C`): secondary text, captions, the stat labels under hero numbers.
- **Neutral 600** (`#575D65`): body copy that needs to be quieter than primary body text but still legible-first (card descriptions, quiz result body).
- **Neutral 700** (`#3B4047`): nav link color at rest, one step short of full-strength text.
- **Neutral 900, foreground** (`#15191D`): default body and heading text. Never pure black.

## 3. Typography

**Display Font:** Montserrat Alternates (600/700), with Montserrat as fallback
**Body Font:** Montserrat (400/500/600), with system sans-serif fallback

**Character:** Montserrat Alternates' characteristic alternate letterforms echo the logo's geometry, so headlines feel drawn from the same hand as the mark — but its quirks work only at size, which is why it's display-only. Montserrat carries every other weight of the page: full Cyrillic support, calm at both paragraph and table density.

### Hierarchy
- **Display** (600–700, `clamp(2rem, 2.4vw + 1rem, 3rem)` down to `clamp(2.25rem, 2.8vw + 1rem, 3.5rem)` for H1, line-height 1.08–1.1, tracking −0.02em): every section headline and the hero H1. One scale for both — this page doesn't stack multiple display sizes.
- **Title** (600, 1.25rem, line-height 1.3, tracking −0.01em): card and tile headlines one level below a section heading — program cards, quiz idle-state title.
- **Body** (400, 0.9375–1.0625rem depending on context, line-height 1.55–1.6): paragraph copy throughout. Line length capped conversationally around 65–75ch via `max-w` on paragraph containers, never by hard wrapping.
- **Label** (500, 0.75rem, tracking 0.04em, uppercase): eyebrow lines above headings, the comparison table's column headers, the quiz's "Самооценка уровня" kicker.
- **Figure** (Montserrat + `tabular-nums lining-nums`, size varies by context): every number that needs to align in a column or read as data rather than prose — hero stats, prices, the quiz question counter.

**The Single-Voice Rule.** No third typeface, ever. If a component needs to feel more "technical" (a token name, a raw value), the fallback is the system `ui-monospace` stack, reserved for documentation contexts, never shipped on the landing itself.

## 4. Elevation

Flat by default. Every block already built on the landing — the header shell, hero tiles, comparison rows, the quiz card — sits at rest with either a 1px border or a filled background and zero `box-shadow`. Depth comes from color-step (a cobalt-800 tile reads as "in front of" a background-0 page) and from border, not from cast shadow.

The wider design system keeps a shadow vocabulary in reserve, tinted toward Ink Navy rather than black (`oklch(23.1% 0.0771 255.4 / .07–.20)` at three strengths) for the components the landing doesn't have yet: dropdowns, toasts, modals. None of those exist on the page today — this section documents the reserve, not current usage.

**The Transient-Only Rule.** Shadow is reserved for surfaces that float temporarily above the page and disappear on their own (popover, toast, modal). A surface that's part of the permanent layout — a card, a tile, a section — never gets a shadow. If you're reaching for `box-shadow` on something that stays on screen, use a border or a fill-color step instead.

### Shadow Vocabulary (reserved, not yet in use)
- **xs** (`0 1px 2px 0 oklch(23.1% 0.0771 255.4 / .07)`): buttons and inputs, if a future interactive surface needs it.
- **md** (`0 4px 12px -2px oklch(23.1% 0.0771 255.4 / .12), 0 2px 4px -2px oklch(23.1% 0.0771 255.4 / .07)`): popovers and dropdowns.
- **lg** (`0 12px 32px -8px oklch(23.1% 0.0771 255.4 / .20), 0 4px 8px -4px oklch(23.1% 0.0771 255.4 / .10)`): toasts and modals.

## 5. Components

**Stated, not persuading.** Every component on this page presents information plainly — no extra flourish trying to convince the visitor. A button says what happens when you press it; a tile states a fact. Confidence here means restraint, not decoration.

### Buttons
- **Shape:** two shapes carry meaning. `8px` radius (`rounded-lg`) is the header CTA, quiz answer options, and outline buttons — "in-flow" actions. Full pill (`rounded-full`) is reserved for the single highest-priority CTA per view (hero primary CTA, quiz result CTA) — the pill shape marks "this is the one to press."
- **Primary:** `background: #0049A9`, `color: #F9FAFC`, `padding: 12px 22px` (pill variant: `16px 30px`). Font: Montserrat 600, 0.875–1rem.
- **Hover / Focus:** background steps to `#003A88` on hover, 150ms ease-out-quart. Press feedback is `scale(0.97)` at 120ms — the only layout-adjacent motion in the system, and it's transform-only; it drops under `prefers-reduced-motion`.
- **Focus, page-wide:** one indicator for every interactive element, applied via the `.nl-focus` utility: `outline: 3px solid var(--ring)` at `outline-offset: 2px` on `:focus-visible`. Buttons, links, tabs, accordion triggers, inputs and the language select all use the same class — no element restates the rule, and nothing is allowed to ship without it. On a brand-deep fill, where `--ring` only reaches ~2:1, add `.nl-focus-light`: it recolours the same outline to `--brand-deep-fg` by setting a variable, so the two classes can never fight over source order.
- **Outline (quiz answers):** `background: #F9FAFC`, `border: 1px solid #DBDEE3`, `color: #15191D`, left-aligned text (these are choices, not commands — the left alignment and outline shape signal "pick one" rather than "go"). Hover: `background: #EDF4FE`, `border-color: #AECEF8`.
- **Icon button (arrow "↗"):** square (`8px` radius) for in-flow contexts, circular for the hero's high-priority slot, filled `#0049A9`.

### Cards / Containers (bento tiles)
- **Corner Style:** `24px` radius (`rounded-tile`) on every section-level block — hero photo frame, stat tiles, program cards, the "why abandon" bento. This radius is reserved for tile-scale surfaces; nothing smaller uses it.
- **Background:** three registers, chosen by the fact being stated. `#001C40` (Ink Navy) for the brand speaking directly (hero message, "3 min" stat). `#F3F5F7` (muted) or `#EDF4FE` (cobalt-50) for supporting facts. `--card` (`#FDFDFE`) for content that needs to read as a distinct object (quiz card, teacher card), with a `#DBDEE3` border wherever it sits on a light surface. `--card` is *not* pure white: at zero chroma it would be the only untinted value in the system and reads colder than the page around it. Pure `#FFFFFF` appears nowhere.
- **Shadow Strategy:** none. See Elevation.
- **Border:** `1px solid #DBDEE3` on white/bordered variants; filled tiles carry no border, the color-step against the page background is the boundary.
- **Internal Padding:** large tiles (hero message, bento heroes) get `40px`; standard tiles get `28px`. Never the same padding on every tile regardless of size.

### Inputs / Fields
- The landing currently has no live form field (the Заявка form lives past the quiz, out of scope for this document). When built, follow the design-system.md spec: label above field via `htmlFor`, `1px solid #DBDEE3` border, focus ring `#0049A9` at 3px, error text under the field via `aria-describedby`, invalid state via `aria-invalid`, never a placeholder standing in for a label.

### Navigation
- **Style:** header nav links sit in `#3B4047` at rest, 0.875rem Montserrat 500, no underline; hover moves to full-strength foreground. The header shell itself is a rounded (`16px`) `#F3F5F7` bar with a `#E9EBEF` border, sticky at the top with a gradient fade behind it so content scrolling underneath doesn't hard-cut against the bar.
- **Active/current section:** not yet implemented (no scroll-spy); nav links are plain anchors to in-page sections.
- **Mobile:** nav links wrap onto multiple lines and stay centered rather than collapsing into a hamburger menu — the nav list is short enough (5 items) that this holds up down to small viewports.

### Signature Component: The Self-Assessment Quiz
The one interactive, stateful component on the page, and the only place the interface directly responds to the visitor rather than just presenting facts. Three phases in one fixed-height card (`min-h-360px]`) so the surrounding layout never jumps: idle (pitch + "Пройти тест"), active (progress bar in `#E9EBEF`/`#0049A9`, question in Title-scale type, three outline-button answers), done (level badge in Cobalt-100/Cobalt-700, result title/body, primary CTA + quiet "Пройти заново" text link). Question transitions fade+rise 8px over 200ms, matching the design system's quiz-step motion token; respects `prefers-reduced-motion` by dropping the transform and keeping only the fade.

## 6. Do's and Don'ts

### Do:
- **Do** keep every interactive color on the Working Cobalt axis (`#0049A9` default, `#003A88` hover). No second accent hue, ever, even for a "special" CTA.
- **Do** use `24px` tile radius for anything section-scale, and reserve `8px`/pill for buttons only — don't blur the two scales.
- **Do** state facts plainly in copy and components alike: numbers, schedule, price, group size. Confidence over persuasion.
- **Do** keep sections at brand-register density (`120px` vertical padding between sections). This is a landing, not a dashboard — space is the argument.
- **Do** animate only `transform` and `opacity`, only as a direct response to a user action (press, quiz-step advance, section entering view once).
- **Do** show real teachers with names and real credentials when that section is built — never stock-photo generality.

### Don't:
- **Don't** introduce a second brand color for hierarchy or "visual interest." Hierarchy comes from scale-step and area within the cobalt axis, never a new hue.
- **Don't** use warm or paper-toned neutrals, or a cream accent — tried in an earlier draft and rejected for splitting the palette across two chromatic axes.
- **Don't** use the reference palette's pastels `#A8D0EF` / `#99C3E4` as interactive color — roughly 2.5:1 on white, below AA. The in-scale replacements `cobalt-200`/`cobalt-300` exist but only as light-theme surface fill or dark-theme accent, never as small interactive text.
- **Don't** reach for generic SaaS/EdTech warmth: soft illustrations, rounded mascot-style icons, "friendly" gradients. This is a school with a street address, not an app.
- **Don't** add `box-shadow` to any surface that's part of the permanent layout (cards, tiles, sections). Shadow is reserved for transient overlays only (see Elevation).
- **Don't** use `border-left`/`border-right` as a colored accent stripe on any card or callout. Not used anywhere in this system; if a component needs emphasis, use a full border, a background tint, or a leading numeral/icon instead.
- **Don't** use gradient text (`background-clip: text` with a gradient fill). Emphasis comes from weight or the display typeface switch, never a decorative gradient.
- **Don't** encode status with color alone. Icon + word together, always — verified by desaturating the page and confirming meaning survives.
