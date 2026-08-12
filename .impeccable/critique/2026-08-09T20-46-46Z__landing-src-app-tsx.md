---
target: landing/src/App.tsx (assembled landing page)
total_score: 33
p0_count: 2
p1_count: 1
timestamp: 2026-08-09T20-46-46Z
slug: landing-src-app-tsx
---
#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3/4 | Quiz progress bar under-reports on last question (88% while counter reads "8 из 8") |
| 2 | Match Between System and Real World | 4/4 | n/a — concrete local facts throughout (address, schedule, since-2012) |
| 3 | User Control and Freedom | 3/4 | No back button mid-quiz to revise an answer |
| 4 | Consistency and Standards | 2/4 | Every CTA ("Записаться", hero pill, quiz result CTA) links to `#zayavka`, which doesn't exist anywhere in the DOM |
| 5 | Error Prevention | 4/4 | n/a — no live form yet to make an error in |
| 6 | Recognition Rather Than Recall | 4/4 | n/a — linear, logical section order |
| 7 | Flexibility and Efficiency of Use | 3/4 | Quiz has no skip/back |
| 8 | Aesthetic and Minimalist Design | 3/4 | Strong intent (verified zero box-shadow, single chromatic axis) undercut by a broken mobile hero |
| 9 | Help Users Recognize/Diagnose/Recover from Errors | 3/4 | n/a currently — no error states exist yet |
| 10 | Help and Documentation | 4/4 | n/a — self-explanatory, no help needed |
| **Total** | | **33/40** | Strong for a brand-register landing; two conversion/device-breaking gaps keep it out of the top band |

#### Anti-Patterns Verdict

**Start here.** Does this look AI-generated?

**LLM assessment (Assessment A):** No / borderline-no. Zero gradient text, zero border-left accent stripes, a single cobalt hue axis carried through every surface, and locally specific copy (Максима Горького, 74; вт/чт 19:00; work-since-2012) that defeats the category-reflex test — nothing about this palette or layout is guessable from "language school landing" alone. The hero stat-tile pair and the "3 мин" dark tile are recognizably bento/stat-card shaped (a common AI-slop tell), but they're restrained in count (2, not a repeating grid of 4-6) and carry real numbers, so they read as intentional rather than templated filler.

**Deterministic scan (Assessment B):** `detect.mjs --json` against `landing/src` returned exit 0 (clean, `[]`) for static-pattern findings. The browser-injected runtime detector (`detect.js` via the live-server overlay) found 3 items, all confirmed with source locations:
- **overused-font** (slop, warning): Montserrat is 79% of text — `landing/src/index.css:77-91`. **False positive in context**: DESIGN.md's "Single-Voice Rule" explicitly mandates one body typeface family; this is documented intent, not accidental sameness.
- **layout-transition** (quality, warning): `transition-[width]` on the quiz progress-bar fill — `landing/src/components/sections/Quiz.tsx:132`. Real hit, and one Assessment A's LLM review missed: DESIGN.md/Impeccable's shared laws forbid animating layout properties; width-transitions also cause the progress-bar/counter mismatch Assessment A flagged independently.
- **repeating-stripes-gradient** (slop, advisory): decorative `repeating-linear-gradient` placeholder stripes — `Hero.tsx:13` (missing `hero-classroom.png`) and `Quiz.tsx:90` (dark-tile background texture). Real hit: these are literal unfinished-asset placeholders, and the detector correctly reads them as decorative filler.

Manual computed-style sweep (desktop 1280px and mobile 375px) confirmed: 0 elements with `box-shadow`, 0 gradient-text, 0 glassmorphism/backdrop-filter, 0 genuine asymmetric border-stripes (3 initially-flagged elements were full-perimeter avatar ring borders, not directional stripes — a detector false positive, correctly ruled out by the sub-agent).

**Visual overlays:** Browser-side injection succeeded and produced verbatim console findings (see above); the overlay session was torn down after evidence collection, so there is no persistent `[Human]`-tagged tab left open to view — the findings above are the full output that overlay reported.

#### Overall Impression

The design system is being followed with real discipline — this is not a case of "the DESIGN.md says one thing, the code does another." The One Voice Rule, the Transient-Only shadow rule, and the flat/bordered surface language all check out under direct inspection, not just by reading the source. The gap is entirely in the last mile: this page's one and only conversion action (`#zayavka`) doesn't exist, and the mobile experience — the device most of this audience will actually arrive on — breaks visibly in the hero. The biggest opportunity is closing those two gaps before anything else; everything else here is refinement.

#### What's Working

- **The comparison table's hierarchy-through-weight** (`Comparison.tsx` lines 46-47): "usual" rows sit in low-contrast `#999FA7`, "Nova Lingua" rows in full-weight `text-foreground font-medium` — zero second hue, pure scale-step contrast, a textbook execution of DESIGN.md's One Voice Rule, and it's also the page's strongest emotional beat: it names the exact failure modes a lapsed learner would recognize ("группа плывёт", "переносится за час до начала").
- **The quiz's fixed-height card** (`min-h-[360px]`, `Quiz.tsx:103`) genuinely prevents layout jump across its three phases (idle/active/done) — verified by DOM inspection, not just assumed from the CSS.
- **Zero box-shadow anywhere on the page**, confirmed programmatically across every rendered element at two viewport widths — a documented hard constraint (the Transient-Only Rule) that most implementations violate by accident on at least a focus ring or a card, and this one doesn't.

#### Priority Issues

- **[P0] Every CTA points to a dead anchor.** `#zayavka` doesn't exist anywhere in the DOM — the header "Записаться," the hero's "Бесплатное пробное" pill, and the quiz result's "Записаться на пробное" all resolve to nothing. Per PRODUCT.md this anchor *is* the page's entire stated purpose (booking the free trial lesson); right now every path to it dead-ends. **Fix**: stub a real `#zayavka` section (even a minimal placeholder form/contact block) so the page's one conversion path actually resolves. **Suggested command**: `/impeccable craft zayavka-form`.

- **[P0] Mobile hero layout is broken, not just cramped.** At 375px, the hero grid computes to `grid-template-columns: 0px 311px` instead of collapsing to one column, because `HeroPhoto`'s `col-start-2 row-start-1 row-span-2` (`Hero.tsx:6`) forces an implicit second track even under `grid-cols-1`. The message card shrinks to ~80px wide while its `h-[399px]` fixed height stays fixed, so content overflows (`scrollHeight: 962px`) and visibly bleeds over the photo. **Fix**: scope `col-start-*`/`row-start-*`/`row-span-*` placement to the `md:` breakpoint only, and swap the fixed height for `h-auto md:h-[399px]`. **Suggested command**: `/impeccable adapt hero`.

- **[P1] Decorative placeholder stripes read as unfinished, and the detector flags them as a slop pattern.** `repeating-linear-gradient` stripes stand in for the missing `hero-classroom.png` (`Hero.tsx:13`) and as a dark-tile background texture in the quiz (`Quiz.tsx:90`). This is a known gap (the real photo exceeded the design-tool's 256KB file-read cap during import), but as shipped it reads as generic decorative filler exactly where DESIGN.md calls for photography of real teachers. **Fix**: source and drop in the actual `hero-classroom.png` at `landing/public/assets/`, and reconsider whether the quiz section needs a textured background at all versus the flat Ink Navy fill used elsewhere. **Suggested command**: `/impeccable polish hero`.

- **[P2] Quiz progress bar animates a layout property.** `transition-[width]` (`Quiz.tsx:132`) violates the shared design law against animating layout-affecting CSS properties, and is the direct cause of the progress-bar/counter mismatch (bar shows 88% while the counter reads "8 из 8", because the bar computes from the pre-answer index). **Fix**: animate `transform: scaleX(...)` with a fixed-width track instead of `width`, and derive the fill fraction from `(index + 1) / total` so it matches the counter. **Suggested command**: `/impeccable optimize quiz`.

- **[P3] Quiz has no accessibility scaffolding.** Answer buttons carry no `aria-*` attributes, the progress bar has no `role="progressbar"`/`aria-valuenow`, and question changes aren't announced via `aria-live`. This is the page's only interactive component, and PRODUCT.md sets an explicit WCAG 2.1 AA bar — a screen-reader user currently gets no structured signal of quiz progress or of reaching the result screen. **Fix**: add `role="progressbar"` + `aria-valuenow/min/max` to the progress track, `aria-live="polite"` around the question text, and `aria-pressed`/descriptive `aria-label`s on the three answer buttons. **Suggested command**: `/impeccable harden quiz`.

#### Persona Red Flags

**The skeptical returning dropout** (tried and abandoned a language course before): would likely click a CTA early just to test whether this school is "real" before reading further — hits the dead `#zayavka` anchor, which reads exactly like the "nothing happens, easy to disappear" pattern they're trying to escape from their last attempt.

**The mobile visitor scanning quickly**: the most damaged persona here — their very first screen, the hero, renders with overlapping and overflowing text on any viewport under ~768px due to the grid-column bug above. This is likely the majority of this audience's first touch.

**The first-timer unsure of their level**: the quiz gives no per-answer confirmation (no checkmark, no pulse, no brief pause) before the question swaps out — a hesitant visitor can't tell whether their tap actually registered before the interface has already moved on, at exactly the moment DESIGN.md itself calls out as needing reassurance.

#### Minor Observations

- Quiz has no way to step back one question if misclicked.
- Nav items "Программы", "Преподаватели", "Отзывы", "Вопросы" point to sections not yet built — expected per current scope (blocks up through the quiz only), but worth tracking so they don't ship unresolved.
- `neutral-400` contrast (~2.5–3:1) in the comparison table's "usual" column is intentional per DESIGN.md (deliberately low-contrast to read as the lesser option), not a bug.
- The `overused-font` detector finding (Montserrat 79% of text) is a false positive against this project's documented Single-Voice Rule — worth adding to `.impeccable/critique/ignore.md` if it keeps resurfacing on future runs.

#### Questions to Consider

- If the hero card breaks on the single most common device class for a local Tyumen business (mobile), was this actually checked below 768px before being called done?
- The quiz is framed as the page's signature, differentiated component — why does it currently give less per-answer feedback than a plain radio-button form would?
- Should `#zayavka` exist as a real (even minimal) section now, so this portfolio piece doesn't visibly dead-end on the one action it exists to drive?
