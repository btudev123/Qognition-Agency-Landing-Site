# Logo, mark and lockup

Owner: Elena (creative). Written 2026-09-28. Built by Mira. Assets land in `public/brand/`.

---

## 1. What is wrong now, and why it is not a styling problem

| # | Finding | Consequence |
|---|---|---|
| 1 | `components/shared/Navigation.tsx:13` renders `<img src="/favicon-192x192.png" width={30} height={30} />` | A 192px raster downsampled to 30px by the browser. Muddy at 1×, worse at 2× because the browser is resampling a compressed PNG, not re-rasterising a vector. |
| 2 | `public/favicon.svg` is 343KB and contains a single `<image href="data:image/png;base64,…">` | It is a PNG in an SVG costume. Zero path data. It cannot scale, cannot be recoloured, cannot be used on dark, and it is 343KB on every page that references it. |
| 3 | `public/qognition-mark.png` is 27KB and is almost entirely empty canvas with a small teal triangle in the lower right | Not a usable mark. |
| 4 | The wordmark is live text, `qognition<span>.</span>`, styled by `.growth-brand` in `growth.css` | Mark and wordmark are two unrelated systems. Changing the mark size does not change the wordmark. They drift at every breakpoint. |
| 5 | `.growth-brand { font-weight: 650 }` | `tokens.md` §3 loads Geist at 400/500/600 through `next/font`. **650 does not exist in the loaded set**, so the browser synthesises or snaps it. The wordmark renders at a weight nobody chose. |
| 6 | `.growth-brand span { margin-left: -9px }` | The teal period is positioned by a negative margin tuned for one font size. At any other size it collides or floats. |

There is no vector logo in this repository. Below is one.

---

## 2. The mark

### 2.1 The judgement on the current mark

The badge is the problem, and it is not the only one.

- **A contained icon inside a rounded square is an app icon, not a brand mark.** It carries its own
  background, so it can never sit in a line of type, never sit on a photo, never sit on the dark
  homepage without cutting a bright teal hole in it. Every use is a rectangle of teal demanding
  attention next to a wordmark that is trying to be quiet.
- **The spiral does not survive 30px.** Four concentric turns at 30px means each turn is under a
  pixel. What renders is a dark blob. That is most of why the operator finds it unaesthetic: they
  are reacting to a form that is no longer visible.
- **The triangle in the lower right is a third element with no job.** At 30px it is three pixels of
  teal on teal.
- The teal field is `#00CBA8`, which is not in the ramp in `tokens.md` §2.1.

The Q is worth keeping. The badge, the spiral and the triangle are not.

### 2.2 The new mark: the open Q

A geometric Q: a circular ring, a straight tail at 45°, and **a notch in the ring where the tail
passes through**. The tail never overlaps the ring; the ring opens to let it out.

Why the notch. Three reasons, in order of how much they matter:

1. **It makes the mark ours.** A ring with a tail is a Q that a dozen companies already own. A ring
   that opens is not.
2. **It solves the two-tone junction.** With an ink ring and a teal tail, an overlap is a muddy
   crossing at any size. A notch means the two strokes never touch, so the two-colour version is as
   clean as the one-colour version.
3. **It says the thing the company says.** The mark does not close around its own answer. On a site
   whose entire argument is "we checked, here is the evidence, here is what we do not know", a
   closed circle is the wrong shape.

Terminals are **butt-cut, not round**, on both the ring and the tail. Square terminals read as a
measurement scale and hold their edge at 16px where round caps go soft.

### 2.3 Geometry, exact

viewBox `0 0 32 32`. All values are final; do not re-derive them.

| Element | Spec |
|---|---|
| Ring | Circle centre `(16, 16)`, radius `10.5`, stroke-width `3.5`, butt caps |
| Notch | `34°` of arc, centred on the `45°` ray (down-right). Arc runs from `62°` to `28°` the long way (`326°`) |
| Arc start | `(20.929, 25.271)` |
| Arc end | `(25.271, 20.929)` |
| Tail | Straight line `(20.5, 20.5) → (26.2, 26.2)`, stroke-width `3.5`, butt caps |
| Tail start | `6.36` units from centre — inside the counter, `2.4` short of the ring's inner edge |
| Tail overhang | `2.18` units past the ring's outer edge along the diagonal |
| Notch clearance | `1.37` units each side of the tail |
| Bounding box | `3.75 → 28.25` on both axes. Optically centred, no nudge required |

### 2.4 SVG source — monochrome

This is the canonical mark. Everything else is derived from it.

```svg
<!-- public/brand/mark.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none"
     stroke="currentColor" stroke-width="3.5" stroke-linecap="butt">
  <path d="M20.929 25.271A10.5 10.5 0 1 1 25.271 20.929"/>
  <path d="M20.5 20.5 26.2 26.2"/>
</svg>
```

Two paths. `currentColor` throughout, so it inherits from whatever it sits in and needs no variants
for one-colour use.

### 2.5 SVG source — two-tone, on light

```svg
<!-- public/brand/mark-two-tone-light.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none"
     stroke-width="3.5" stroke-linecap="butt">
  <path d="M20.929 25.271A10.5 10.5 0 1 1 25.271 20.929" stroke="#0D0C0A"/>
  <path d="M20.5 20.5 26.2 26.2" stroke="#0F766E"/>
</svg>
```

Ring `--ink-900 #0D0C0A` (19.55:1 on white). Tail `--accent-deep` teal-700 `#0F766E` (5.47:1 on
white, clears the 3:1 graphic threshold with room). **Not `--accent` `#14B8A6`** — per `CLAUDE.md`
§9 that token is graphics-only at 2.49:1 and the logo tail is a brand element that must hold its
contrast at 16px.

### 2.6 SVG source — two-tone, on dark

```svg
<!-- public/brand/mark-two-tone-dark.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none"
     stroke-width="3.5" stroke-linecap="butt">
  <path d="M20.929 25.271A10.5 10.5 0 1 1 25.271 20.929" stroke="#F5F4F1"/>
  <path d="M20.5 20.5 26.2 26.2" stroke="#2DD4BF"/>
</svg>
```

Ring `--d-text #F5F4F1` (16.90:1 on `--d-surface-1`). Tail `--teal-400 #2DD4BF` (9.98:1). Teal-700
is **2.87:1 on dark and must never be used there** — see `tokens-dark.md` §3.

### 2.7 React component

One component, both variants, both surfaces. Mira builds this, not four files.

```tsx
// components/brand/QMark.tsx
export function QMark({ tone = 'mono' }: { tone?: 'mono' | 'duo' }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" strokeWidth={3.5} strokeLinecap="butt"
         width="1em" height="1em" aria-hidden="true" focusable="false">
      <path d="M20.929 25.271A10.5 10.5 0 1 1 25.271 20.929" stroke="currentColor" />
      <path d="M20.5 20.5 26.2 26.2"
            stroke={tone === 'duo' ? 'var(--logo-accent)' : 'currentColor'} />
    </svg>
  );
}
```

`--logo-accent` is `var(--accent-deep)` on `:root` and `var(--d-accent)` under `[data-theme="dark"]`.
Two declarations, both in `app/tokens.css`. Sizing is `1em`, so the mark scales with `font-size` and
never needs a width prop.

---

## 3. The wordmark

### 3.1 The trailing period: cut it

It does not earn its place.

- A full stop after a wordmark means "full stop", "period", "the last word". That is a claim of
  finality from a company whose entire positioning is that it states what it measured and nothing
  more. It is a small contradiction but it sits in the top-left corner of every page.
- It is a 2015 startup tic. It dates the brand to a decade it is trying not to look like.
- It is implemented as a negative margin tuned to one font size (§1, finding 6), so it is also the
  single most fragile thing in the header.
- Its only job was to put teal in the lockup. The mark's tail does that now, once, and better.

**One teal move per lockup.** That is the rule. The tail is it.

### 3.2 Typographic spec

| Property | Value |
|---|---|
| Font | Geist Sans, via `next/font` |
| Weight | **600** — not 650. 650 is not in the loaded set (`tokens.md` §3) |
| Case | lowercase, `qognition` |
| Size | `0.78 × --logo-size` |
| Tracking | `-0.045em` |
| Colour | `--ink-900` on light, `--d-text` on dark. One colour, never two |
| Gap to mark | `0.32 × --logo-size` |
| Baseline | The mark's optical centre aligns to the **x-height centre** of the wordmark, not the baseline and not the cap centre. Implementation: `align-items: center` on the flex row, plus `translateY(0.055em)` on the mark, where `em` is the wordmark font-size |

At `--logo-size: 28px`: wordmark 21.8px, gap 9px, mark nudged down 1.2px.

The x-height alignment matters because `qognition` is all-lowercase with one ascender (`t`) and one
descender (`q`). Centring on the bounding box puts the mark visibly high.

### 3.3 Live text now, outlines next

I am not hand-authoring Geist glyph outlines in a markdown file, and you should not accept any that
appear in one. The honest sequence is:

**Now — live text.** The lockup renders the wordmark as text with the spec above. This is correct in
the browser, where Geist is loaded. It is what ships this week.

**Next — outlined.** A logo must not depend on a webfont for OG images, email signatures, PDFs, press
kits or anyone else's site. Add `scripts/build-logo.mjs`, run once, committed output:

```
Input:   the wordmark spec in §3.2
Tool:    opentype.js  →  Font.getPath('qognition', 0, 0, 100)
Params:  Geist Sans 600, size 100, letter-spacing -0.045em applied per-glyph advance
Output:  public/brand/wordmark.svg           viewBox "0 0 <measured> 100", single <path>
         public/brand/lockup-light.svg       mark + wordmark, both outlined, ink + teal-700
         public/brand/lockup-dark.svg        mark + wordmark, both outlined, #F5F4F1 + teal-400
         public/brand/lockup-mono.svg        currentColor throughout
Rounding: path coordinates to 2dp
```

`[NEEDS DATA: confirmation that the Geist licence permits distributing outlined glyph paths as a
logo asset.]` Geist is OFL-1.1, which does permit it, but the licence text should be checked by
whoever owns legal rather than by me, because a logo is the one asset you cannot quietly swap later.

---

## 4. Clear space and minimum size

**Clear space** = `0.22 × --logo-size` on all four sides. That is the mark's stroke width doubled.
Nothing — no rule, no nav link, no button edge, no viewport edge — enters it.

```css
.logo { padding: calc(var(--logo-size) * 0.22); }
```

**Minimum sizes**

| Form | Minimum | Below that |
|---|---|---|
| Full lockup | 104px wide | Use mark only |
| Mark alone | 16px | Nothing. Do not render the logo |
| Favicon | 16px | n/a |

---

## 5. Responsive behaviour

One variable, `--logo-size`, is the mark height in px. Everything else is a ratio of it. **The
composition changes at exactly one breakpoint.** Swapping the lockup for a mark at three different
widths causes three layout shifts and is the reason header logos look unstable.

| Viewport | `--logo-size` | Composition |
|---|---|---|
| ≥1280px | 30 | Full lockup |
| 1024–1279 | 28 | Full lockup |
| 768–1023 | 26 | Full lockup |
| 360–767 | 24 | Full lockup |
| <360px | 22 | **Mark only.** Wordmark `display: none` |

At the mark-only breakpoint the link keeps `aria-label="Qognition home"` so the accessible name is
unchanged. The `QMark` stays `aria-hidden`; the label is on the anchor.

**Sticky / scrolled nav.** `--logo-size` goes `30 → 24` over 200ms `--ease-standard`. Composition
does not change, so nothing reflows. Transition `font-size` only; do not animate width.

**Footer.** `--logo-size: 36`, `tone="duo"`, inside `[data-theme="dark"]`. The footer is the one place the
lockup is allowed to be larger than the nav, because it is a sign-off rather than a control.

**Mobile nav sheet.** Lockup at `--logo-size: 28`, top-left, with the close button top-right. The
lockup in an open sheet is the same lockup, not a different one.

### 5.1 Lockup component

```tsx
// components/brand/Logo.tsx
export function Logo({ size = 30, tone = 'duo', wordmark = true }: {
  size?: number; tone?: 'mono' | 'duo'; wordmark?: boolean;
}) {
  return (
    <span className="logo inline-flex items-center"
          style={{ '--logo-size': `${size}px`,
                   gap: 'calc(var(--logo-size) * 0.32)' } as React.CSSProperties}>
      <span style={{ fontSize: 'var(--logo-size)',
                     transform: 'translateY(0.055em)', lineHeight: 0 }}>
        <QMark tone={tone} />
      </span>
      {wordmark && (
        <span className="font-sans"
              style={{ fontSize: 'calc(var(--logo-size) * 0.78)',
                       fontWeight: 600, letterSpacing: '-0.045em', lineHeight: 1 }}>
          qognition
        </span>
      )}
    </span>
  );
}
```

Usage in `Navigation.tsx` replaces line 13 entirely:

```tsx
<Link href="/" className="growth-brand" aria-label="Qognition home">
  <Logo />
</Link>
```

and `.growth-brand` in `growth.css` loses its `font-size`, `font-weight`, `letter-spacing`, `gap`,
its `span` rule and its `img` rule. Six declarations delete. The class keeps only whatever layout
role it plays in the nav row.

---

## 6. Favicon set

Delete first:

- `public/favicon.svg` — 343KB, fake vector. **Do not ship it.**
- `public/qognition-mark.png` — near-empty canvas.
- `public/favicon-192x192.png` — replaced.

### 6.1 `public/favicon.svg` — real vector, chrome-aware

A browser tab sits on light or dark chrome depending on the user's OS theme, and we do not control
it. The SVG carries both.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <style>
    .ring { stroke: #0D0C0A; }
    .tail { stroke: #0F766E; }
    @media (prefers-color-scheme: dark) {
      .ring { stroke: #F5F4F1; }
      .tail { stroke: #2DD4BF; }
    }
  </style>
  <g stroke-width="3.5" stroke-linecap="butt">
    <path class="ring" d="M20.929 25.271A10.5 10.5 0 1 1 25.271 20.929"/>
    <path class="tail" d="M20.5 20.5 26.2 26.2"/>
  </g>
</svg>
```

Roughly 520 bytes. It replaces 343KB.

### 6.2 Raster set

All generated from `mark.svg` by `scripts/build-icons.mjs` (sharp or resvg). Never hand-exported.

| File | Size | Field | Mark | Mark size |
|---|---|---|---|---|
| `favicon.ico` | 16, 32, 48 | transparent | ink `#0D0C0A`, mono | 100% of canvas |
| `apple-touch-icon.png` | 180 | opaque `#0A0A09` | `#F5F4F1` ring, `#2DD4BF` tail | 108px (60%) |
| `icon-192.png` | 192 | opaque `#0A0A09` | as above | 115px (60%) |
| `icon-512.png` | 512 | opaque `#0A0A09` | as above | 307px (60%) |
| `maskable-512.png` | 512 | opaque `#0A0A09` | as above | 205px (40%) |

**The tile goes from teal field to ink field.** That is deliberate. A saturated teal square is the
loudest thing on a home screen and it is the opposite of the restraint the brand is built on. Ink
field with a teal tail is the same brand, quieter, and it matches the dark site.

Maskable at 40% is conservative on purpose: the maskable safe zone is the inner 80% circle, and
Android crops aggressively on some launchers.

`manifest.webmanifest`: `theme_color: "#0A0A09"`, `background_color: "#0A0A09"`, `icon-512` with
`purpose: "any"`, `maskable-512` with `purpose: "maskable"`. Two separate entries; one entry with
`"any maskable"` gets padded twice on Android.

---

## 7. Misuse

Not a style guide for its own sake. Each of these has already happened somewhere in this repo or is
one commit away.

- Do not put the mark back in a container. No rounded square, no circle, no pill.
- Do not fill the ring.
- Do not close the notch.
- Do not add the triangle back.
- Do not render the wordmark in any weight but 600, or any case but lowercase.
- Do not set the mark and the wordmark at independently chosen sizes. `--logo-size` or nothing.
- Do not use teal-700 on dark or teal-400 on light.
- Do not use the mark as a bullet, a list glyph, a loading spinner or a cursor.
- Do not animate the mark on page load. `MaskReveal` on the header logo is a 300ms delay on the
  first thing a returning visitor looks for.
- Do not raster the lockup for the web. SVG or live text.

---

## 8. Files Mira creates

```
public/brand/mark.svg
public/brand/mark-two-tone-light.svg
public/brand/mark-two-tone-dark.svg
public/brand/wordmark.svg           (from build-logo.mjs)
public/brand/lockup-light.svg       (from build-logo.mjs)
public/brand/lockup-dark.svg        (from build-logo.mjs)
public/brand/lockup-mono.svg        (from build-logo.mjs)
public/favicon.svg                  (replaces the 343KB file)
public/favicon.ico
public/apple-touch-icon.png
public/icon-192.png
public/icon-512.png
public/maskable-512.png
components/brand/QMark.tsx
components/brand/Logo.tsx
scripts/build-logo.mjs
scripts/build-icons.mjs
```

---

## 9. NEEDS DATA

| # | What | Blocks |
|---|---|---|
| L1 | Confirmation that Geist's OFL-1.1 licence permits distributing outlined glyph paths as a logo asset, signed off by whoever owns legal | The outlined lockup. The live-text lockup ships without it |
| L2 | Whether an existing trademark filing covers the current spiral mark | If it does, changing the mark has a cost outside design and is not mine to decide |
| L3 | Is there any printed or off-site collateral using the current mark | Determines whether this is a swap or a transition |
