# Design tokens

Owner: Elena (creative). Written 2026-09-28. Implementation file: `app/tokens.css`.

The token file is inert until `app/layout.tsx` imports it last, after `globals.css` and
`growth.css`. That ordering is deliberate: `tokens.css` re-points legacy variable names at the
new ramps, and equal-specificity `:root` blocks are resolved by source order.

```tsx
// app/layout.tsx
import './globals.css';
import './growth.css';
import './tokens.css';   // add, last
```

---

## 1. The three decisions that drive everything else

**1. `--accent` moves from teal-500 to teal-700.** Teal-500 `#14B8A6` is 2.49:1 against white.
It is used as text (`text-[var(--accent)]`) in a large number of components today, and every one
of those is a WCAG AA failure. Re-pointing `--accent` to teal-700 `#0F766E` (5.47:1) fixes all of
them in one line. The brighter teal stays available as `--accent-fill` for graphics, diagram
strokes and the status dot, where it is not text and does not need to pass.

**2. The focus ring is ink, not teal.** A 2px teal-500 ring is 2.49:1 against white and fails
SC 1.4.11 Non-text Contrast. Ink `#0D0C0A` is 19.55:1 against white and clears 3:1 against every
fill in the palette, so one ring colour works everywhere on the light page. Inside the single dark
band, the ring inverts to white.

**3. A card is a 1px border, not a shadow.** On a white page, shadow is reserved for things that
genuinely float: the sticky bar, the mobile nav sheet, a modal. Static content cards get
`--rule-hairline`. This is what keeps a white, typographic site from looking like a dashboard.

---

## 2. Colour

### 2.1 Teal ramp

Ratios computed per WCAG 2.1 relative luminance. AA normal text 4.5:1, AA large text and non-text
UI 3:1, AAA normal text 7:1.

| Token | Hex | vs `#FFFFFF` | vs `#0D0C0A` | Approved use |
|---|---|---|---|---|
| `--teal-50` | `#F0FDFA` | 1.04 | 18.75 | Tint fill for a "present" cell. Background only. |
| `--teal-100` | `#CCFBF1` | 1.13 | 17.35 | Selected row, diagram band fill. Background only. |
| `--teal-200` | `#99F6E4` | 1.26 | 15.51 | Text on the dark band. |
| `--teal-300` | `#5EEAD4` | 1.48 | 13.22 | Accent text on the dark band. Default for that. |
| `--teal-400` | `#2DD4BF` | 1.86 | 10.50 | Accent text on the dark band, smaller sizes. |
| `--teal-500` | `#14B8A6` | **2.49** | 7.86 | Graphic fill, diagram stroke, status dot. **Never text on white.** |
| `--teal-600` | `#0D9488` | 3.74 | 5.22 | Non-text UI boundaries only (passes 3:1, fails 4.5:1). |
| `--teal-700` | `#0F766E` | **5.47** | 3.57 | `--accent`. Accent text on white, primary CTA fill with white text. |
| `--teal-800` | `#115E59` | **7.58** | 2.58 | CTA hover fill. Accent text at `text-meta` size. AAA. |
| `--teal-900` | `#134E4A` | 9.48 | 2.06 | Dark teal panel with white text. |
| `--teal-950` | `#042F2E` | 14.47 | 1.53 | Rules and dividers inside a dark teal panel. |

Verified pairs:

| Foreground | Background | Ratio | Verdict |
|---|---|---|---|
| `#FFFFFF` | `--teal-700` | 5.47 | AA pass (normal text). Primary CTA. |
| `#FFFFFF` | `--teal-800` | 7.58 | AAA pass. CTA hover, contrast increases on hover. |
| `--teal-700` | `#FFFFFF` | 5.47 | AA pass. Inline links, accent text. |
| `--teal-800` | `#FFFFFF` | 7.58 | AAA pass. Accent text at 13px. |
| `--teal-700` | `--teal-50` | 5.25 | AA pass. Accent text inside a tinted cell. |
| `--teal-300` | `--ink-900` | 13.22 | AAA pass. Accent text in the dark band. |
| `--ink-900` | `--teal-500` | 7.86 | AAA pass. Only legitimate text-on-teal-500 pairing. |

### 2.2 Neutral ramp

| Token | Hex | vs `#FFFFFF` | Approved use |
|---|---|---|---|
| `--white` | `#FFFFFF` | 1.00 | Page. The default background of every section but one. |
| `--ink-050` | `#F6F5F2` | 1.09 | Zebra rows, inset panels. |
| `--ink-100` | `#E8E5DF` | 1.26 | Hairlines, card borders. Decorative. |
| `--ink-200` | `#D5D1C8` | 1.52 | Structural rules, table grid. |
| `--ink-300` | `#948E85` | **3.25** | Input and control borders. Passes 1.4.11. **Never text.** |
| `--ink-400` | `#757068` | **4.91** | Faint labels, captions. The lowest-contrast text permitted. |
| `--ink-500` | `#5C574F` | 7.16 | Muted prose. AAA. |
| `--ink-700` | `#34312C` | 12.95 | Secondary text, table values. |
| `--ink-900` | `#0D0C0A` | 19.55 | Primary text. Also the dark band background. |

`--ink-400` on `--ink-050` is 4.51:1. Still AA. That is the tightest pairing in the system and no
combination below it is permitted anywhere.

**Replaced:** the old `--text-faint` `#8E8A82` is 3.44:1 against white and is currently applied to
13px captions in `.prose-q figcaption` and `.prose-meta`. That is an AA failure in production today.
`--text-faint` now points at `--ink-400`.

### 2.3 Status colour, and why there is almost none

The snapshot reports whether a brand appears on a surface. The tempting encoding is green for
present, red for absent. It is rejected:

- Red reads as alarm, and "you are invisible in AI search" is precisely the claim CLAUDE.md §4
  forbids. The instrument must read as neutral measurement.
- Colour alone never carries meaning (SC 1.4.1). Every state needs a glyph and a word regardless,
  so the colour is doing no work.

| State | Colour | Glyph | Word |
|---|---|---|---|
| Present | `--teal-800` on `--teal-50` | filled square | the measured fact, e.g. `Position 4` |
| Not found | `--ink-500` on `--white` | hollow square | `Not found` |
| Not checked | `--ink-400` on `--ink-050`, 4px diagonal hatch | dash | `Not checked` |

`--danger` `#9F1239` (8.02:1) exists for exactly two things: form validation messages and system
error states. It never appears in a measurement.

### 2.4 The dark band

There is **one** dark treatment on the site, used at most once per page, for the final CTA.
Background `--ink-900`, text `--white` (19.55), accent text `--teal-300` (13.22), rules
`rgba(255,255,255,0.14)`, focus ring `--white`. Wrap it in `.on-invert` so the focus rule inverts.

`growth.css` currently ships three different dark greens (`#14251E`, `#111f19`, `#183f33`). They
all collapse to this one. See §8.

---

## 3. Type

The scale is fixed and already enforced. `scripts/audit-headings.mjs` fails the build if an
`<h1>`–`<h4>` carries an ad-hoc size, if a heading has no canonical token, or if a `<p>` carries a
size other than `text-body` / `text-meta`. **Nothing in this spec adds a size token.** An earlier
draft proposed a `text-data` token for the measurement table; it was rejected because it would have
required loosening the gate for no real gain. The table uses `text-body leading-snug` for values and
`text-meta` for labels.

| Token | Size | Line height | Tracking | Use |
|---|---|---|---|---|
| `text-display` | `clamp(2.75rem, 6vw, 5rem)` | 1.05 | -0.03em | Homepage H1 only. One per site. |
| `text-h1` | `clamp(2.25rem, 4.5vw, 3.5rem)` | 1.10 | -0.025em | Every other page H1. |
| `text-h2` | `clamp(1.75rem, 3vw, 2.5rem)` | 1.15 | -0.02em | Section headings. |
| `text-h3` | `clamp(1.25rem, 2vw, 1.5rem)` | 1.25 | -0.01em | Sub-headings, card titles. |
| `text-h4` | `1.125rem` (18px) | 1.35 | -0.01em | Dense sub-heads, FAQ questions. |
| `text-body` | `1.0625rem` (17px) | 1.70 | 0 | All prose. |
| `text-meta` | `0.8125rem` (13px) | 1.50 | 0 (0.08em when uppercase) | Labels, captions, eyebrows, table headers. |

Rules:

- **13px is the floor.** No rendered text on the site is smaller than `text-meta`. `growth.css`
  currently ships 9px, 10px and 11px labels in fourteen places. Those are an accessibility problem
  and a credibility problem. They all become `text-meta` with uppercase and `0.08em` tracking.
- Weights: 400 body, 500 for table values and UI labels, 600 for headings. Three weights, no more.
  `next/font` loads Geist at 400/500/600 only.
- Measure: `--measure` 68ch. Prose never exceeds it. Table cells are exempt.
- Line height in tables is `leading-snug` (1.375), not the body 1.7. Prose line height in a data
  cell is the single most common reason a real table starts to look like a marketing graphic.
- **Mono means machine-recorded fact.** `--font-mono` is permitted for verbatim prompts, domains
  and URLs, timestamps, platform version strings and positions. It is banned for headings, prose,
  labels and decoration. This is the device that makes the snapshot read as measurement, so it has
  to stay scarce to keep working.

`[NEEDS DATA: decision on JetBrains Mono.]` `--font-mono` names 'JetBrains Mono' first, but only
Geist is loaded through `next/font`. Today the mono stack silently falls back to `ui-monospace`,
which renders as SF Mono on macOS, Consolas on Windows and DejaVu Sans Mono on Linux. Three
different looks for the most credibility-critical text on the site. Either load JetBrains Mono at
400 weight, latin subset, through `next/font` (adds roughly 18KB woff2), or delete it from the
stack and design to `ui-monospace`. Pick one. I recommend loading it.

---

## 4. Spacing

Base 4px, Tailwind defaults. What matters is the rhythm on top of it.

| Role | Mobile | ≥640px | ≥1024px | Tailwind |
|---|---|---|---|---|
| Section padding (`--section-y`) | 64px | 96px | 128px | `py-16 sm:py-24 lg:py-32` |
| Page gutter (`--gutter`) | 20px | 32px | 48px | `px-5 sm:px-8 lg:px-12` |
| Content container | 100% | 100% | 1200px | `max-w-[1200px] mx-auto` |
| Wide container (nav, footer, tables) | 100% | 100% | 1320px | `max-w-[1320px] mx-auto` |

Vertical rhythm inside a section, fixed:

| Relationship | Gap |
|---|---|
| Eyebrow to heading | 12px |
| Heading to lede | 16px |
| Lede to content | 32px |
| Item to item in a list or grid | 24px |
| Label to its value | 4px |
| Content to the section rule below it | 48px |

Generous spacing is the section padding, not the gaps inside a component. Tight groups and loud
gaps between them is what reads as considered. Even spacing everywhere reads as a template.

---

## 5. Radii

| Token | Value | Use |
|---|---|---|
| `--radius-none` | 0 | Full-bleed rules, section dividers, the dark band. |
| `--radius-sm` | 4px | Buttons, inputs, chips, badges. |
| `--radius-md` | 8px | Cards, panels, the measurement table. |
| `--radius-lg` | 12px | The snapshot panel, modals. Two components, no more. |
| `--radius-pill` | 999px | Status chips only. |

`--radius` (Tailwind's `rounded`) moves from `0px` to `4px`. This is a visible change everywhere
`rounded` is used today. It is deliberate: 0px on a white typographic site reads as unfinished
rather than as precise, and the codebase already contradicts itself with `rounded-xl` in
`KpiSection.tsx` and 4–8px radii in `growth.css`.

---

## 6. Elevation

| Token | Value | Use |
|---|---|---|
| `--elev-0` | none | **Default.** Every static content card. Border only. |
| `--elev-1` | `0 1px 2px rgba(13,12,10,0.06)` | Hover state on an interactive card. |
| `--elev-2` | `0 4px 12px rgba(13,12,10,0.08)` | Sticky CTA bar, mobile nav sheet. |
| `--elev-3` | `0 12px 32px rgba(13,12,10,0.12)` | Modal, popover, dropdown. |

A shadow on a static content card is a defect, not a style choice.

---

## 7. Motion

| Token | Value | Use |
|---|---|---|
| `--dur-instant` | 80ms | Press / active state. |
| `--dur-fast` | 140ms | Hover, focus, colour change. |
| `--dur-base` | 200ms | Accordion, disclosure, small transform. |
| `--dur-slow` | 320ms | Section reveal, mobile sheet open. **Ceiling.** |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Everything entering or changing. |
| `--ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Things leaving. |

- Animatable properties: `opacity`, `transform`, `color`, `background-color`, `border-color`,
  `outline-color`. Never `height`, `width`, `top`, `left`, `margin`.
- Reveal on scroll: `opacity 0 → 1` plus `translateY(8px → 0)`, 200ms, fires once, first viewport
  only. The current `.rf-reveal` uses 40px over 1000ms, which is four times the ceiling.
- Stagger: maximum 3 items, 40ms step. Never stagger a list.
- `prefers-reduced-motion: reduce` collapses everything to instant. Content must be present and
  readable with JavaScript disabled, so no reveal component may start at `opacity: 0` in markup.

**Removed from the system.** These exist in `globals.css` and `tailwind.config.js` and have no
place on a measurement-credibility site: `rf-marquee`, `rf-float`, `rf-orb-drift` a/b/c, `rf-glow`,
`rf-pulse`, `rf-noise`, `rf-cursor-dot` / `rf-cursor-ring`, `rf-page-wrap`, `rf-mask`,
`rf-gradient-text` and `rf-gradient-text-dark`, `rf-spoke-glow`, `marquee` / `marquee-slow`
animations. Gradient text in particular cannot be contrast-checked, which makes it unshippable
under an AA requirement. Deleting them is a separate cleanup ticket for Mira, not a prerequisite.

---

## 8. `growth.css` palette migration

`growth.css` hardcodes roughly fifty hex values, and they are a **warm olive and sage palette**,
not the white / near-black / teal system the brand direction specifies. Examples: `#f8f5ef` page,
`#dedbd2` borders, `#eceee5` and `#edeee5` section fills, `#14251E` and `#111f19` dark bands,
`#66716a` and `#566059` body text, `#a9b8aa` and `#8cbaa3` on dark, `#b9e5ca` for the footer
button. Only `#0f766e`, `#14b8a6` and `#0d0c0a` are on-system.

Mapping for the migration. Replace the literal, do not add a variable alongside it.

| Current literals | Replace with |
|---|---|
| `#f8f5ef`, `#f8f5eff5`, `#fffdf8`, `#fdfcf7`, `#f8f8f2`, `#f4f3eb` | `var(--white)` |
| `#edeee5`, `#eceee5`, `#e7ede5` | `var(--ink-050)` |
| `#dedbd2`, `#d9ddd1`, `#dde1d5`, `#dfdfd5`, `#c8cec0` | `var(--rule-hairline)` |
| `#aebdad`, `#b4c8b9` | `var(--rule-structural)` |
| `#151915`, `#23382e`, `#263f31`, `#35433a` | `var(--ink-900)` |
| `#566059`, `#66716a`, `#5d6b60`, `#627061`, `#627065`, `#4b5a50`, `#5a665c` | `var(--ink-500)` |
| `#7b8c80`, `#667567`, `#47625b` | `var(--ink-400)` |
| `#0f766e` | `var(--accent)` (unchanged value) |
| `#09574f` | `var(--cta-fill-hover)` |
| `#14b8a6` | `var(--accent-fill)` |
| `#356653`, `#67ae8e` | `var(--accent)` |
| `#14251E`, `#111f19`, `#183f33` | `var(--surface-invert)` |
| `#f2f1e8`, `#f2f5e9`, `#e8eee4`, `#d7e2d5` | `var(--text-on-invert)` |
| `#a9b8aa`, `#8cbaa3`, `#93ad9a`, `#98ad9e`, `#8da592`, `#7f9988`, `#b2c8b8` | `var(--on-dark-soft)` |
| `#69d5bc`, `#8bddb4`, `#b9e5ca` | `var(--text-accent-invert)` |
| `#113827` (text on `#b9e5ca`) | `var(--cta-text)` on `var(--cta-fill)` |

Also in `growth.css`, independent of colour:

- `:focus-visible { outline: 2px solid #0f766e; outline-offset: 5px; }` — teal-700 at 5.47:1 does
  pass 3:1, so this one is not a failure, but it must move to `var(--focus-ring)` for consistency
  with the ink ring everywhere else. Offset drops from 5px to 2px.
- All `font-size` values below 13px become `text-meta`. Affected selectors: `.growth-eyebrow` (11px),
  `.growth-system-top` (9px), `.growth-query > span` (9px), `.growth-node-number` (10px),
  `.growth-system-caption` (10px), `.ai-platforms-label` (10px), `.growth-card-top > span` (11px),
  `.growth-pillar ul` (11px), `.growth-sector-index` (10px), `.growth-process-grid li > span` (11px),
  `.growth-footer-grid h3` (11px), `.growth-footer-bottom` (10px), `.rf-img-placeholder::after`
  (10px), `.rf-section-divider::after` (10px).
- `.growth-hero { padding-top: 160px }` and `.growth-page { padding-top: 155px }` are compensating
  for an absolutely positioned nav. Keep the compensation, express it as one variable.

---

## 9. Tailwind config additions

Additive only. No existing key changes, so the typography gate is unaffected.

```js
// tailwind.config.js -> theme.extend
colors: {
  // keep every existing key, add:
  'accent-fill':  'var(--accent-fill)',
  'accent-on':    'var(--accent-on)',
  'accent-tint':  'var(--accent-tint)',
  'rule':         'var(--rule-hairline)',
  'rule-strong':  'var(--rule-structural)',
  'rule-ui':      'var(--rule-interactive)',
  'invert':       'var(--surface-invert)',
  'on-invert':    'var(--text-on-invert)',
  danger:         'var(--danger)',
  'danger-tint':  'var(--danger-tint)',
},
borderRadius: {
  DEFAULT: 'var(--radius-sm)',
  md:      'var(--radius-md)',
  lg:      'var(--radius-md)',   // legacy `rounded-lg` lands on 8px
  xl:      'var(--radius-lg)',
  pill:    'var(--radius-pill)',
},
boxShadow: {
  none: 'none',
  1: 'var(--elev-1)',
  2: 'var(--elev-2)',
  3: 'var(--elev-3)',
},
transitionDuration: {
  instant: '80ms', fast: '140ms', base: '200ms', slow: '320ms',
},
transitionTimingFunction: {
  standard: 'cubic-bezier(0.2, 0, 0, 1)',
  exit:     'cubic-bezier(0.4, 0, 1, 1)',
},
maxWidth: { content: '1200px', wide: '1320px', measure: '68ch' },
```

---

## 10. Defects in current components, for Mira

Found while reading the code for this spec. Each is a real AA failure or a broken affordance today.

| File | Problem | Fix |
|---|---|---|
| `components/ui/Button.tsx` | `primary` is `bg-[var(--accent)] text-[var(--accent-deep)]`. With the old tokens that is teal-500 on teal-700: **2.20:1**. | `bg-[var(--cta-fill)] text-[var(--cta-text)] hover:bg-[var(--cta-fill-hover)]`. Drop `hover:brightness-110`, which cannot be contrast-checked. |
| `components/ui/Button.tsx` | `sizeClasses` uses `text-sm` / `text-base`, which are outside the canonical scale. The gate does not catch it because `<button>` is not `<p>` or a heading. | `text-meta` for `sm`, `text-body` for `md` and `lg`. |
| `components/ui/Input.tsx` | `focus:outline-none` with only a 20%-opacity accent ring. No visible focus indicator that meets 3:1. | Remove `focus:outline-none`. Let the global `:focus-visible` ink ring apply. |
| `components/ui/Input.tsx` | Error text is `text-red-400` (`#F87171`, **3.01:1** on white) and the border is `red-500/50`. | `text-[var(--danger)]` and `border-[var(--danger)]`. |
| `components/ui/Input.tsx` | Label is `text-sm`, off-scale. | `text-meta font-medium`. |
| `components/ui/Input.tsx` | Error is rendered but not associated with the input. | Add `aria-invalid`, `aria-describedby` pointing at the error `id`, and `role="alert"` on the message. |
| `app/globals.css` | Focus ring is `2px solid var(--accent)` at teal-500, **2.49:1**. | Handled by `tokens.css`. Delete the old rule when convenient. |
| `app/globals.css` | `.prose-q figcaption` and `.prose-meta` use `--text-faint` at **3.44:1**. | Handled by the `--text-faint` re-point. |
| `app/globals.css` | `.rf-reveal` sets `opacity: 1` with `transform: translateY(40px)` and never reaches the "out" state, so content sits 40px low until observed. | Replace with the 8px / 200ms reveal, or delete. |
| `app/globals.css` | `::-webkit-scrollbar { width: 4px }`. A 4px scrollbar is below the 24px target-size guidance and is hard to grab. | Remove the override. |
| `components/ui/Section.tsx` | `lg` is `py-16 md:py-24`, below the section rhythm. | `py-16 sm:py-24 lg:py-32`, container `max-w-content`. |

---

## 11. Asset file naming

Screenshots are load-bearing evidence on this site, so their file names carry the provenance.

```
public/evidence/<surface>/<yyyy-mm-dd>_<platform>_<prompt-id>_<brand-slug>.png
```

- `<surface>`: `map-pack` | `organic` | `ai-overview` | `assistant`
- `<platform>`: `google` | `chatgpt` | `perplexity` | `gemini` | `claude` | `copilot`
- `<prompt-id>`: the id from the prompt set, e.g. `p03`
- `<brand-slug>`: the brand the screenshot is evidence about

Example: `public/evidence/assistant/2026-10-12_chatgpt_p03_acme-brokers.png`

Diagrams and static UI exports:

```
public/diagrams/<name>_<variant>_<width>.svg     four-layers_desktop_1200.svg
docs/design/exports/<component>_<state>_<width>.png
```

Never commit an evidence screenshot without a matching entry in the prompt set. A screenshot with
no recorded prompt, date and platform is not evidence.
