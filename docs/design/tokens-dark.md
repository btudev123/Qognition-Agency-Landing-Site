# Dark surface tokens

Owner: Elena (creative). Written 2026-09-28. Extends [`tokens.md`](./tokens.md), does not replace it.
Implementation file: `app/tokens-dark.css`, imported after `app/tokens.css`.

`tokens.md` specifies a white page. The operator has asked for the dark design that already exists
in the repo at `app/HomePage.tsx`. This file is the dark half of the system. Type scale, spacing,
radii, mono discipline and the 13px floor from `tokens.md` are unchanged and still apply. Only
colour and elevation change.

---

## 0. The conflict you have to resolve before this ships

**`CLAUDE.md` §9 says "White background, near-black text, teal accents and CTAs." The operator has
asked for a dark site.** Same repo, two instructions. I am not picking silently.

| | |
|---|---|
| **Decision H** | Does the site go dark? |
| **My recommendation** | Dark for the homepage, `/labs`, all product frames, all layer pages and the final CTA. **Light for long-form reading surfaces only**: `/insights` article bodies, `/case-studies/[slug]` bodies, `/legal/*`. The switch happens at a route boundary, never mid-page. |
| **Why the split** | 17px body at 1.7 line height over 2,000 words is measurably harder to read in light-on-dark for astigmatic readers, which is a large share of a 45+ B2B buyer set. Everything else on this site is short, structured and diagrammatic, where dark is stronger. |
| **What you must do** | If you accept, amend `CLAUDE.md` §9 to say so. A bible that contradicts the shipped site is worse than either choice. |

Both halves of the system are specified. If Decision H goes the other way, `tokens.md` alone ships
and this file is used only for the product frames, which are dark regardless because the products
are dark software.

---

## 1. Surfaces

Four, no more. Depth on a dark page comes from 1px borders, not from stacking greys.

| Token | Hex | vs `#FFFFFF` | Use |
|---|---|---|---|
| `--d-bg` | `#0A0A09` | 19.81 | Page. The deepest surface. Nothing is darker. |
| `--d-surface-1` | `#131312` | 18.59 | Section band, card field, product panel. The default card. |
| `--d-surface-2` | `#1C1C1A` | 17.07 | Raised: drawer, popover, sticky bar, table header, code block. |
| `--d-surface-3` | `#262623` | 15.19 | Hover, selected row, chip fill. Never a resting surface. |

They are warm-neutral, not blue-black. They are the same hue family as `--ink-900 #0D0C0A` in
`tokens.md`, so the two halves of the site are recognisably the same brand.

The orphaned `app/HomePage.tsx` uses `#050505` for its dark sections. That is a cold near-black and
it is off-system. Replace every occurrence with `--d-bg`.

---

## 2. Text on dark

Ratios computed per WCAG 2.1 relative luminance. Every value below is against
**`--d-surface-3` `#262623`, the lightest surface**, so each token is valid on all four surfaces
without a lookup.

| Token | Hex | vs `--d-surface-3` | vs `--d-surface-1` | vs `--d-bg` | Use |
|---|---|---|---|---|---|
| `--d-text` | `#F5F4F1` | 13.81 | 16.90 | 18.01 | Primary text, headings, display. |
| `--d-text-muted` | `#A8A49B` | 6.11 | 7.48 | 7.97 | Secondary prose, table values, card body. AAA on surface-1. |
| `--d-text-faint` | `#918D84` | **4.59** | 5.62 | 5.99 | Labels, captions, eyebrows, provenance lines. **The floor. Nothing below it.** |

`#7C7870` and `#827E76` were both tested and both fail on `--d-surface-3` (4.23 and 4.24). If you
want a fainter label than `--d-text-faint`, the answer is a smaller weight, not a lower contrast.

---

## 3. Teal on dark

The teal ramp is the one from `tokens.md` §2.1, re-verified against dark surfaces. Note the
inversion: **teal-500, which is banned as text on white at 2.49:1, is the strongest workhorse on
dark at 6.11:1.** Teal-700, which is `--accent` on white, is non-text only here.

| Token | Hex | vs `--d-surface-3` | Verdict on dark |
|---|---|---|---|
| `--teal-200` | `#99F6E4` | 13.15 | Display type on dark. |
| `--teal-300` | `#5EEAD4` | 11.12 | **`--d-accent-display`.** Accent words inside display headings, CTA hover fill. |
| `--teal-400` | `#2DD4BF` | **8.16** | **`--d-accent`.** Every accent text, data mark, active state, primary CTA fill. The default. |
| `--teal-500` | `#14B8A6` | 6.11 | **`--d-accent-graphic`.** Diagram strokes, sparkline, bar fills, status dot. Passes as text too. |
| `--teal-600` | `#0D9488` | 4.05 | **Non-text only on dark.** Fails AA on `--d-surface-3`. Borders and fills. |
| `--teal-700` | `#0F766E` | 2.87 | **Nothing on dark.** It is the light-page accent. Do not use it here. |

Verified pairs:

| Foreground | Background | Ratio | Verdict |
|---|---|---|---|
| `--d-bg #0A0A09` | `--teal-400` | **10.64** | AAA. **Primary CTA on dark.** Ink text on teal fill. |
| `--d-bg #0A0A09` | `--teal-300` | 13.39 | AAA. CTA hover. Contrast increases on hover, as it must. |
| `--teal-400` | `--d-surface-1` | 9.98 | AAA. Accent text, metric values, active nav. |
| `--teal-400` | `--d-bg` | 10.64 | AAA. |
| `--d-text` | `--teal-400` | 1.59 | **Fails. Never white text on a teal fill on dark.** |

That last row is the mistake to watch for. On the light page the primary CTA is white on teal-700.
On the dark page it inverts: **ink on teal-400**. They are not the same button with a different
background.

---

## 4. Rules and boundaries on dark

| Token | Value | Composite vs `--d-surface-1` | Use |
|---|---|---|---|
| `--d-rule-hairline` | `rgba(255,255,255,0.09)` | 1.26 | Card borders, grid lines, dividers. **Decorative. Never the sole indicator of a control.** |
| `--d-rule` | `rgba(255,255,255,0.16)` | 1.60 | Structural rules, table grid, section dividers. Also decorative. |
| `--d-rule-strong` | `rgba(255,255,255,0.34)` | **3.05** | Input borders, unchecked controls, secondary button border, any boundary that is the only thing telling you a control exists. Clears 3:1 on all four surfaces (3.05 / 3.09 / 3.06). |
| `--d-focus-ring` | `#FFFFFF` | 15.19 | 2px solid, 2px offset. Clears on every surface. |

The bordered card grid the operator asked for is `--d-rule-hairline` on a `--d-surface-1` field,
with the grid drawn as a single shared 1px lattice (border-top + border-left on the container,
border-right + border-bottom on each cell) so seams never double up. That is already the pattern in
`app/HomePage.tsx` `FourSpokes` and it is correct. Keep it, swap the colour.

---

## 5. Data series palette

Five series, maximum. Used in the product UIs for competitor leaderboards, citation category stacks
and the scatter. On `--d-surface-1`.

| Slot | Token | Hex | Ratio | Assignment rule |
|---|---|---|---|---|
| 1 | `--d-series-1` | `#2DD4BF` teal-400 | 9.98 | **Always the subject brand. Never anything else.** |
| 2 | `--d-series-2` | `#A78BFA` violet-400 | 6.83 | Rank 2 |
| 3 | `--d-series-3` | `#FBBF24` amber-400 | 11.14 | Rank 3 |
| 4 | `--d-series-4` | `#7DD3FC` sky-300 | 11.15 | Rank 4 |
| 5 | `--d-series-5` | `#F9A8D4` pink-300 | 10.25 | Rank 5 |
| — | `--d-text-faint` | `#918D84` | 4.59 | Rank 6 and beyond, collapsed into one "Other" row |

Rules, all mandatory:

- **Colour never carries meaning alone (SC 1.4.1).** Every series also carries its name as a label,
  and every bar carries its value as text. If you delete the colour the chart still reads.
- Series are assigned **by rank, deterministically**. Not by hash, not by index of first appearance.
  A competitor that moves from rank 3 to rank 2 changes colour, and that is correct, because the
  colour encodes rank.
- Teal is reserved. A competitor never renders teal, in any chart, ever. That is what stops a
  screenshot being misread about who is winning.
- Ties are broken alphabetically by domain, and the tie is stated in the chart's provenance line.

---

## 6. Measurement states on dark

`tokens.md` §2.3 rejected red/green for measurement and that holds. Ported to dark:

| State | Fill | Text | Glyph | Word |
|---|---|---|---|---|
| Present | `rgba(45,212,191,0.14)` | `--teal-400` | filled square | the measured fact, e.g. `Pos 3` |
| Not found | `--d-surface-2` | `--d-text-muted` | hollow square | `Not found` |
| Not checked | `--d-surface-1` + 4px diagonal hatch `rgba(255,255,255,0.06)` | `--d-text-faint` | en dash | `Not checked` |
| Stale | as its underlying state, at 60% | `--d-text-faint` | `↺` | `<n>d old` |

**Stale is new and it is required.** A dashboard that renders a three-week-old number identically to
a fresh one is the quiet version of the claim `CLAUDE.md` §4 forbids. Anything past its window
dims and states its age.

Process status, which is a genuine state rather than a measurement, may use colour:

| State | Colour | Glyph |
|---|---|---|
| Queued | `--d-text-faint` | hollow square |
| Running | `--teal-500` | half-filled square |
| Done | `--teal-300` | filled square |
| Needs a human | `#FBBF24` | triangle |
| Failed | `--d-danger #FDA4AF` (9.83) | cross |

---

## 7. Elevation on dark

Shadow does almost nothing on `#0A0A09`. Depth comes from surface + border. Two exceptions:

| Token | Value | Use |
|---|---|---|
| `--d-elev-frame` | `0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.07)` | **Device frames only.** The one place something genuinely floats off the page. |
| `--d-elev-overlay` | `0 16px 48px rgba(0,0,0,0.6)` | Drawer, mobile sheet, popover, sticky bar. |

Everything else: `none`. A shadow on a static dark card is invisible work.

---

## 8. Glow, and its budget

The operator's reference uses light bloom, and the orphaned code has three orb-drift blobs and
`inset 0 0 80px` card glows. Glow is allowed, with a budget, because uncontrolled bloom is how a
dark site ends up looking like a crypto landing page.

- **Maximum three background orbs per page.** Radial gradient, `filter: blur(40–60px)`, peak alpha
  **≤ 0.13**. The existing `GradientMesh` in `app/HomePage.tsx` is at 0.13 / 0.09 / 0.06 and is
  within budget. Keep its geometry, re-point its colours: teal `rgba(20,184,166,0.11)`, and replace
  the violet `rgba(99,58,237,0.09)` and blue `rgba(37,99,235,0.06)` with teal at 0.06 and 0.04. The
  violet and blue are leftovers from the retired 4-spoke palette.
- **Orbs are `aria-hidden`, `pointer-events: none`, and never sit under body copy.** Only under
  headings and empty space.
- **Card hover glow: one property, `background`, one step to `--d-surface-3`.** The existing
  `boxShadow: inset 0 0 80px rgba(20,184,166,0.06)` on `ServiceCard` is at the limit; keep it at or
  below 0.06 and drop the separate `rf-spoke-glow` ::before halo. Two glow layers on one hover is
  one too many.
- **No glow on text. Ever.** `text-shadow` with a teal bloom cannot be contrast-checked.
- **`rf-gradient-text` and `rf-gradient-text-dark` stay banned.** A gradient headline has no single
  foreground colour, so it cannot be verified against AA, so it cannot ship on a site whose
  accessibility bar is AA. Where the orphaned code uses gradient text (`PARTNERS`, `Ready`),
  replace with a solid `--teal-300` word inside a `--d-text` heading. Same visual idea, checkable.

---

## 9. Display type on dark

The scale in `tokens.md` §3 is unchanged. Two dark-specific notes:

- **Optical weight drops on dark.** Light text on a dark field looks heavier than the same weight on
  white. At `text-display` and `text-h1`, drop from 600 to **500**. At `text-h2` and below, keep 600.
  This is one line in the dark stylesheet, not a new token.
- **Tracking opens by 0.005em** at `text-display` on dark, for the same reason.
- The orphaned homepage sets ad-hoc sizes up to `clamp(56px, 9vw, 180px)` inline. 180px is outside
  the scale and `scripts/audit-headings.mjs` will reject it. The "huge display type" the operator
  wants is already available: `text-display` tops out at 5rem / 80px, and at 80px with 500 weight and
  -0.035em on a black field it reads considerably bigger than 80px on white. If you still want
  bigger after seeing it built, raise the `text-display` clamp ceiling in `tailwind.config.js` to
  `6.5rem` — one value, in the scale, gate intact. **Do not set a size inline.**

---

## 10. `app/tokens-dark.css`

```css
/* app/tokens-dark.css — import after tokens.css */

:root,
.on-dark {
  /* surfaces */
  --d-bg:              #0A0A09;
  --d-surface-1:       #131312;
  --d-surface-2:       #1C1C1A;
  --d-surface-3:       #262623;

  /* text */
  --d-text:            #F5F4F1;
  --d-text-muted:      #A8A49B;
  --d-text-faint:      #918D84;

  /* accent */
  --d-accent:          var(--teal-400);   /* #2DD4BF — default accent text */
  --d-accent-display:  var(--teal-300);   /* #5EEAD4 — accent word in display */
  --d-accent-graphic:  var(--teal-500);   /* #14B8A6 — strokes, dots, fills */

  /* cta */
  --d-cta-fill:        var(--teal-400);
  --d-cta-fill-hover:  var(--teal-300);
  --d-cta-text:        var(--d-bg);

  /* rules */
  --d-rule-hairline:   rgba(255,255,255,0.09);
  --d-rule:            rgba(255,255,255,0.16);
  --d-rule-strong:     rgba(255,255,255,0.34);
  --d-focus-ring:      #FFFFFF;

  /* series */
  --d-series-1: #2DD4BF;
  --d-series-2: #A78BFA;
  --d-series-3: #FBBF24;
  --d-series-4: #7DD3FC;
  --d-series-5: #F9A8D4;

  /* status */
  --d-danger:          #FDA4AF;
  --d-warn:            #FBBF24;
  --d-hatch:           rgba(255,255,255,0.06);

  /* elevation */
  --d-elev-frame:      0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.07);
  --d-elev-overlay:    0 16px 48px rgba(0,0,0,0.6);
}

.on-dark {
  background: var(--d-bg);
  color: var(--d-text);
}

.on-dark :focus-visible {
  outline: 2px solid var(--d-focus-ring);
  outline-offset: 2px;
}

/* measurement hatch, shared by "not checked" cells and specimen frame edges */
.d-hatch {
  background-image: repeating-linear-gradient(
    45deg,
    var(--d-hatch) 0 1px,
    transparent 1px 4px
  );
}
```

Tailwind additions, additive only, no existing key changed:

```js
// tailwind.config.js -> theme.extend.colors
'd-bg':        'var(--d-bg)',
'd-1':         'var(--d-surface-1)',
'd-2':         'var(--d-surface-2)',
'd-3':         'var(--d-surface-3)',
'd-text':      'var(--d-text)',
'd-muted':     'var(--d-text-muted)',
'd-faint':     'var(--d-text-faint)',
'd-accent':    'var(--d-accent)',
'd-rule':      'var(--d-rule-hairline)',
'd-rule-2':    'var(--d-rule)',
'd-rule-3':    'var(--d-rule-strong)',
```

---

## 11. Conformance additions for dark surfaces

Add to the checklist in `README.md`:

- [ ] No teal-700 anywhere on a dark surface.
- [ ] No white text on a teal fill. Ink on teal, always.
- [ ] No text below `--d-text-faint #918D84`.
- [ ] Teal is not used for any series but the subject brand.
- [ ] Every chart reads correctly with all colour removed.
- [ ] Background orbs: three maximum, peak alpha ≤ 0.13, never under body copy.
- [ ] No gradient text.
- [ ] No inline heading sizes. Everything through the scale.
