# Mobile

Owner: Elena (creative). Written 2026-09-28.
Depends on [`tokens-dark.md`](./tokens-dark.md), [`products.md`](./products.md),
[`motion.md`](./motion.md).

Mobile is likely the majority of the traffic. It currently sees a headline, a paragraph and two
buttons.

---

## 1. The defect

`app/growth.css:137`, inside `@media(max-width:760px)`:

```css
.growth-system { display: none; }
```

`.growth-system` is the hero's connected-buyer-journey panel — the only visual device on the
homepage. Below 760px it is deleted. What remains above the fold is an H1, one paragraph and two
buttons on an empty ground.

Two further deletions in the same rule:

```css
.growth-nav-cta { display: none; }    /* the header CTA, gone on ~60% of traffic */
```

and `.ai-platform { font-size: 10px }`, which is below the 13px floor in `tokens.md` §3.

### The rule that replaces all of this

> **Nothing is deleted on mobile.** If a device does not fit, it is replaced by a smaller true
> device that carries the same fact. `display: none` on a content element at a breakpoint is a
> defect, not a responsive strategy.

The one legitimate exception is a purely decorative layer — background orbs stay, parallax resolves
to zero (`motion.md` §3.4), and the giant background words are dropped because at 390px they are
noise behind text rather than depth behind space.

---

## 2. Breakpoints and base grid

| Range | Name | Gutter | Columns |
|---|---|---|---|
| 320–389 | Small | 16px | 1 |
| 390–767 | Phone | 20px | 1 |
| 768–1023 | Tablet | 32px | 2 |
| 1024–1279 | Laptop | 48px | 12 |
| ≥1280 | Desktop | 48px | 12 |

Everything must be readable and operable at **320px width and 400% zoom**. That is the hard floor
and it is the one people skip.

- Section padding: `py-16` at Phone, per `tokens.md` §4.
- Type: `text-display` bottom of its clamp (2.75rem / 44px). At 390px a 44px display line holds
  about 11 characters, so **the H1 must be written to break at 4–5 words per line.** That is a copy
  constraint, and it belongs to Theo and Ruth as much as to me.
- **13px floor, everywhere.** Every sub-13px declaration in `growth.css` (the 9px, 10px and 11px
  list in `tokens.md` §8) goes to `text-meta`.
- Touch targets ≥44×44 with ≥8px separation. No exceptions, including matrix cells and chart dots.
- Tap highlight: `-webkit-tap-highlight-color: transparent` plus a real `:active` background step.
  Removing the highlight and replacing it with nothing is a common regression.

---

## 3. Header and the persistent CTA

**The header CTA comes back.** If the nav row cannot hold the logo, the language menu, the CTA and
the burger, the language menu goes, not the CTA.

| Element | Phone | Small (<360px) |
|---|---|---|
| Logo | Full lockup, `--logo-size: 24` (`logo.md` §5) | Mark only, 22 |
| Language menu | Moves into the burger sheet | In the sheet |
| CTA | `Get the snapshot`, 44px tall, `--d-cta-fill` | Icon + short label, 44×44 minimum |
| Burger | 44×44 | 44×44 |

`[NEEDS DATA: the 11-locale language menu in Navigation.tsx. The retired bible called premature i18n
a distraction and the current one does not mention locales at all, but localeHomeAlternates() is
live. Decide whether the menu stays before I spend nav width on it.]`

**Sticky bottom CTA bar, mobile only.** 56px, `--d-surface-2`, `--d-elev-overlay`, top rule
`--d-rule`. Appears once the hero leaves the viewport, one primary action plus a text link, and a
dismiss that persists for the session. This is the mobile conversion device and it replaces the
desktop pattern of a CTA repeated down a long page.

It is **not** an exit-intent popup. That was Decision E in the previous pass and the recommendation
stands: remove `ExitIntentPopup`. An interruption on a page whose argument is restraint costs more
trust than it recovers, and on mobile "exit intent" is a guess about a scroll gesture.

---

## 4. Homepage, section by section

### 1. Hero

| | |
|---|---|
| H1 | `text-display` at 44px, weight 500, `-0.035em`. Written to break at 4–5 words per line |
| Lede | `text-body`, `max-w-measure`, `--d-text-muted` |
| CTAs | Two, **stacked full width**, 48px tall, primary first, 12px apart. Not side by side — two 48% buttons at 390px give two 8-character labels |
| Engine strip | Stays. Static wrapped grid of chips, 2 rows, `text-meta`. Never a marquee here (`motion.md` §4) |
| Padding top | One variable, replacing the `160px` / `155px` / `132px` / `117px` ladder currently in `growth.css` |

### 2. Hero device — what replaces `.growth-system`

**A single G.O.L.E.M score card.** Full-bleed to the gutters, roughly 180px tall, `--d-surface-1`,
1px `--d-rule-hairline`, radius 8.

```
┌────────────────────────────────────────────┐
│ VISIBILITY SCORE          SPECIMEN · SAMPLE │  ← text-meta mono, --d-text-faint
│                                             │
│ 38.2%        ╭─╮                            │  ← text-h3 tabular + sparkline
│              │ │  ●─●─●─●─●─●─●─●           │     100% × 56, points not spline
│                                             │
│ n=384 answers · 8 engines · 16 Aug–12 Sep    │  ← provenance line, wraps to 2
│                                             │
│ ┌─────────┐                                 │
│ │ TRACE → │  Northwind Brokers, not a real  │  ← activator + the honesty line
│ └─────────┘  company                        │
└────────────────────────────────────────────┘
```

This is the strongest possible mobile hero device, because it is the product's entire argument in
one card: a number, the evidence behind it, and a control that opens the evidence. It is also
smaller and cheaper than the three-node journey panel it replaces.

The `TRACE` button opens the Answer Drawer as a bottom sheet (§6).

**If G.O.L.E.M is not shippable in time** (`products.md` §9, P1), the fallback is the existing
three-node journey panel, rebuilt at 1 column with 3 nodes, no caption, ~200px. **The fallback is
not deletion.**

### 3. Argument band

Stacks. Eyebrow, H2, paragraph. H2 at `text-h2` bottom of clamp (28px). The current mobile rule
sets `.growth-section h2 { font-size: 34px; letter-spacing: -1.3px }`, which is off-scale in both
values. Use the token.

### 4. Four-layers diagram

The desktop version is a horizontal mechanism. At 390px it becomes a **vertical mechanism, not a
picture of one**:

- Four rows stacked, each 1px `--d-rule-hairline` separated.
- Each row: layer name (`text-h4`), the surface it acts on (`text-meta` mono uppercase), and the one
  example question.
- Connectors become a 2px `--d-accent-graphic` vertical rule running down the left edge through all
  four, with a 8px square node at each row. One line, four nodes — the mechanism survives, the
  diagram's width does not.
- The example question stays. It is the concrete thing in the diagram.

### 5. Method / process

Four stages become a vertical stepper. The horizontal timeline rule rotates to vertical, 1px
`--d-rule-hairline`, with the first node in `--d-accent-graphic`. Stage number in mono, title at
`text-h3`, blurb at `text-body`. The oversized ghost numerals behind each stage
(`rgba(0,0,0,0.038)` at 80px) **drop on mobile** — at 390px they sit directly behind body copy.

### 6. Sector grid

Eight cells become a rule-separated list, one per row: index in mono, name at `text-h4`, note at
`text-body`, chevron right. `border-top` on each, `border-bottom` on the last. This is what
`.growth-sector` already does at ≤760px and it is correct. Keep it, re-colour it.

### 7. Labs section

Per `labs.md` §6:
- Header stacks.
- Four cards become a 1-col rule-separated stack. **Not a horizontal scroll, not a carousel.** Each
  keeps its 16:9 thumbnail at full width.
- **`FrameBrowser` is replaced by `FramePhone` showing the mobile design of the same screen.** A
  1440px UI scaled to 350px is illegible, and shipping an illegible screenshot on the page where we
  argue for honest presentation is a self-inflicted wound.
- Badges stack to a 1-col list at 72px with the sentence beside each.
- "How to read these screens" renders in full. Not behind a disclosure.

### 8. Measurement band

Two columns become one. The four measurement rows stay as a definition list.

### 9. FAQ

Already correct as `<details>`. Two fixes: summary hit area to the full row at 48px minimum, and the
`+` glyph gets a real `aria-expanded` on the summary. `text-meta` floor on the answer body, which is
currently 14px — that one is fine.

### 10. Final CTA

H2 at `text-h2`, two stacked full-width buttons. The desktop version's `clamp(56px, 9vw, 180px)`
display size is off-scale (`tokens-dark.md` §9) and must come through the type scale at every width.

### 11. Footer

The current mobile rule gives `grid-template-columns: 1fr 1fr` with the first cell spanning both.
Keep the structure. Fix: `.growth-footer-grid h3` at 11px and `.growth-footer-bottom` at 10px both
go to `text-meta`; `.growth-footer-grid > div > a` at 12px goes to `text-meta`; link rows get 44px
minimum height, which at 14px `margin-bottom` they currently miss.

---

## 5. Product screens on mobile

Per-product detail is in `products.md` §4.5, §5.5, §6.6 and §7.5. The four rules that govern all of
them:

1. **No horizontally scrolled tables.** A table that scrolls sideways hides half its data behind an
   affordance most people do not find, and these tables exist specifically so that everything is
   visible. Tables become stacked cards or definition lists.
2. **No shrunken desktop layouts.** Every product screen has a designed mobile layout. Where the
   geometry cannot survive — LinkersPro's prospect graph is the clear case — the visualisation is
   **replaced by a list that carries every encoding as a chip**, not by a pinch-zoom canvas.
3. **Vertical is sometimes better, and we should notice.** M.A.R.S's attribution path as a vertical
   timeline is clearer than its horizontal desktop version. Consider using the vertical treatment at
   every width rather than maintaining two.
4. **Five states at every width** (`products.md` §3.5). The partial state's sentence wraps; it never
   truncates. A truncated "4 of 8 engines returned…" is worse than no sentence.

---

## 6. Sheets and drawers

The Answer Drawer, the mobile nav and any filter panel all use one sheet component.

| Property | Value |
|---|---|
| Height | 92vh, or content height if shorter |
| Surface | `--d-surface-2`, `--d-elev-overlay`, top radius 16 |
| Handle | 36×4 `--d-rule-strong`, top centre, decorative |
| **Close** | An explicit 44×44 close button, always. **Never drag-only.** A drag-to-dismiss-only sheet is unusable with a switch, a keyboard or one hand full |
| Scrim | `rgba(10,10,9,0.72)`, tappable to close |
| Motion | 320ms `--ease-standard` in, 200ms `--ease-exit` out. Reduced motion: instant |
| Focus | Trapped. `Esc` closes. Focus returns to the activator |
| Scroll | Body scroll locked while open, restored to the same offset on close |

---

## 7. Performance on mobile

`CLAUDE.md` §12.6 in the retired bible set LCP < 2.5s on 4G and the target is still right.

- The LCP candidate is the hero H1, server-rendered text at full opacity. Nothing may delay it.
- The hero score card is a Server Component with no client JS until the `TRACE` button is pressed.
- Product frames below the fold are lazy-mounted on intersection, not on hydration.
- Device frame chrome is CSS, not an image.
- No parallax, no custom cursor, no magnetic buttons below 1024px — all of that JS never mounts
  (`motion.md` §3.4, §5.2).
- Thumbnails in the Labs cards: AVIF via `next/image`, lazy below the fold, explicit
  width/height so CLS stays under 0.05.

---

## 8. Conformance

- [ ] No content element is hidden by a media query. `display: none` at a breakpoint is reviewed as a defect.
- [ ] The header CTA is present at every width.
- [ ] Readable and operable at 320px and at 400% zoom.
- [ ] No rendered text below 13px at any width.
- [ ] Every touch target ≥44×44 with ≥8px separation.
- [ ] No table scrolls horizontally.
- [ ] No carousel, no horizontal card scroll.
- [ ] Every sheet has an explicit close button.
- [ ] Every product screen has a designed mobile layout, not a scaled desktop one.
- [ ] Every section in §4 has a visual device, or a stated reason it does not.
