# ADR-0004: One canonical CSS system

- Status: proposed
- Date: 2026-09-28
- Constrains: `app/globals.css`, `app/growth.css`, `app/tokens.css`, `app/layout.tsx`, `tailwind.config.js`, `components/growth/GrowthPage.module.css`
- Blocks: ADR-0005 (the homepage split assumes one token layer)
- Implementation goes to Mira (`frontend-dev`). Owen (`quality`) reviews each tranche.

## Decision

`app/globals.css` plus `tailwind.config.js` is the canonical system. `app/tokens.css` is **merged
into** `globals.css` rather than imported, and is merged selectively. `app/growth.css` is retired in
tranches and deleted. One breakpoint vocabulary: Tailwind's min-width defaults. `--radius` stays
`0px`; the sharp corner is kept and a named ramp is added around it.

---

## 0. Corrections to the stated problem

Grepped before deciding. Three of the framing facts were wrong and they change the plan.

**There are four stylesheets, not three.** `components/growth/GrowthPage.module.css` (35 lines) is a
CSS Module. It matters because it already consumes `var(--ink)`, `var(--accent-deep)`,
`var(--border)`, `var(--bg-warm)` and `var(--text-muted)`. It is built on `globals.css`. It is proof
that the globals token layer is already the shared substrate under scoped CSS, and that `growth.css`
is the only system that opted out.

**`GrowthPage.tsx` does not consume `growth.css`.** It uses the module above. So
`GrowthLocalizedPage` and every `/growth/*` route are already off `growth.css`. The migration is far
smaller than stated.

**The actual `growth.css` consumers are 8 files:**

```
components/shared/Navigation.tsx      <- in app/layout.tsx, so on every page
components/shared/Footer.tsx          <- in app/layout.tsx, so on every page
components/AcquisitionHome.tsx
components/LocalAuditExperience.tsx
app/about/page.tsx
app/pricing/page.tsx
app/process/page.tsx
app/services/page.tsx
```

Nav and Footer are why `growth.css` is imported globally and why it cannot simply be dropped.

**There are six breakpoint vocabularies, not four.** Listed in §4.

**A fifth stylesheet is already being planned.** `docs/design/tokens-dark.md` (324 lines, untracked,
written 2026-09-28 by Elena) specifies `app/tokens-dark.css`, "imported after `app/tokens.css`". It
also raises **Decision H**: does the site go dark at all? CLAUDE.md §9 says white; the operator has
asked for the dark design in `app/HomePage.tsx`. Elena declined to pick silently and so do I. This
ADR is written to be correct either way, and §2.2 states what is blocked on the answer.

The working tree is therefore not clean, contrary to the brief. `docs/design/tokens-dark.md` is
untracked and is load-bearing for this decision.

---

## 1. Why `globals.css` wins

1. **Tailwind reads it.** `tailwind.config.js` maps `colors.accent → var(--accent)`,
   `borderRadius.DEFAULT → var(--radius)` and eleven other tokens. Retiring `globals.css` means
   rewriting the Tailwind theme and every utility class that resolves through it.
2. **A build gate depends on its type scale.** `scripts/audit-headings.mjs` runs before `next build`
   and enforces the fluid `clamp()` scale declared in `tailwind.config.js`, which `.prose-q` in
   `globals.css` mirrors by hand for Sanity markdown output. `growth.css` has its own px scale that
   the gate does not know about.
3. **`GrowthPage.module.css` already votes for it** (§0).
4. **The rich design lives there.** Every `.rf-*` class and every keyframe the operator wants is in
   `globals.css`. `growth.css` has zero keyframes.

Rejected: making `growth.css` canonical. It has no custom properties at all, so Tailwind cannot
consume it, the type scale gate cannot see it, and the `.rf-*` motion vocabulary would have to be
rebuilt from nothing.

Rejected: keeping both and drawing a boundary. That is the current state. It produced two accent
values, two type scales, two radius conventions and a `body { cursor: auto }` in one file that
silently undoes a decision made in the other.

---

## 2. `tokens.css` is merged, not imported

`app/tokens.css` is good work. Its contrast arithmetic is correct and its ramp is the right shape.
It is also currently inert, and importing it as written is the wrong move.

**Why not import it.** It re-points `--accent` across 370 `var(--accent)` call sites in TSX and every
`rounded` utility in the repo, in one commit, with no diff to review. Owen cannot review a cascade.
A restyle that produces no line-level diff is not reviewable, which means it is not shippable.

It also carries a change that is not an accessibility fix: `--bg` moves from `#F8F5EF` (warm cream,
what ships today) to `#FFFFFF`. That is a brand decision travelling inside an accessibility file, and
it is now contested (§2.2). It does not ride along.

**Merge these:** the teal and neutral ramps, the semantic role names, the focus ring block, `.tabular`
and `.fact`, the reduced-motion addendum, `--accent → teal-700`, the new `--accent-fill → teal-500`,
`--text-faint → ink-400`, and the elevation and motion scales.

**Do not merge in the same commit:** `--bg → #FFFFFF`. Blocked on Decision H, not merely separate.

### 2.2 What is blocked on Decision H

`docs/design/tokens-dark.md` asks whether the site goes dark, and recommends dark everywhere except
long-form reading surfaces. Until that is answered:

- **Blocked:** the value of `--bg`. If the site stays light it becomes `#FFFFFF`; if it goes dark it
  becomes `--d-bg #0A0A09` on the dark routes. Leaving it at today's `#F8F5EF` is the only choice
  that does not pre-empt the answer, so it stays until Decision H lands.
- **Not blocked:** everything else in T1. The teal ramp, the neutral ramp, the focus ring fix and
  the radius ramp are all correct under either outcome. The dark spec explicitly reuses the same
  warm-neutral hue family and the same type, spacing and radius scales.

**Import order, stated once so the dark half has somewhere to attach.** `tokens-dark.md` assumes a
chain of `globals.css → growth.css → tokens.css → tokens-dark.css`. Two of those files do not
survive this ADR. The rule that does survive:

```
app/globals.css     canonical: Tailwind directives, :root light tokens, .rf-* classes
app/tokens-dark.css optional second layer: dark surface + text tokens, scoped to
                    [data-theme="dark"] rather than :root
```

**Dark tokens must be scoped to an attribute, not to `:root`.** Elena's recommendation is a
per-route split (dark homepage, light article bodies), and a `:root`-scoped dark layer cannot express
that without fighting the cascade on every light page. An attribute set on the route group's layout
element can. This is the one thing about the dark work that should be decided now, because getting it
wrong means the per-route split becomes an `!important` war later.

There is never a fourth stylesheet import in `app/layout.tsx`. Two files, maximum.

**Do not merge at all:** `--radius → 4px` (§3), and the `min-width: 640 / 1024` `--gutter` and
`--section-y` queries as written (they get restated against the canonical breakpoints in §4).

### 2.1 The real defect

`--accent: #14B8A6` is **2.49:1 on white**. It is used as text, and worse than that:

```css
/* app/globals.css:65-71 */
a:focus-visible, button:focus-visible, input:focus-visible, [tabindex]:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}
```

That is the **global focus ring**, on every focusable element on the site, at 2.49:1 against white.
It fails WCAG 2.1 SC 1.4.11 (non-text contrast, 3:1). CLAUDE.md §9 requires "accessible contrast and
visible focus states, WCAG AA minimum". This is the highest-severity item in this ADR and it is one
declaration. It ships in tranche T0, alone, ahead of any refactor.

The text failures, verified: `.prose-q a { color: var(--accent) }` (every markdown link on every
insight and blog page), `.prose-q li::marker`, `.prose-q blockquote` border, and 18 inline
`color: 'var(--accent)'` sites in TSX.

`app/growth.css` already independently uses `#0f766e` for its accent text and its `:focus-visible`
outline. `#0f766e` is `--teal-700`. The repo has already converged on the right value in one file
and not the other; `tokens.css` is codifying that, not inventing it.

Out of scope, recorded so it is not lost: `lib/leadDelivery.ts` uses `#14B8A6` as link text in the
internal lead email (lines 92, 95). Internal recipients, no public AA duty, but it is the same bug.
Hand to Luke with the CRM work, not here.

---

## 3. Radius: keep 0px, add a ramp

**Keep `--radius: 0px` and `--radius-lg: 0px`.** The sharp corner is deliberate and three
independent sources agree on it: `globals.css`, `GrowthPage.module.css` (`border-radius: 0` set
explicitly on form inputs), and the operator. `tokens.css` proposing 4px is Elena importing
`growth.css`'s button radius, which is the aesthetic we are retiring.

**Adopt the ramp names anyway**, so that a component can opt in where a square corner is wrong:

```css
--radius-none: 0px;
--radius-sm:   0px;   /* buttons, inputs, chips */
--radius-md:   0px;   /* cards, panels, tables */
--radius-lg:   0px;   /* modals, the snapshot panel */
--radius-pill: 999px; /* status chips, avatars, dots. The only non-zero step. */
--radius:      var(--radius-none);   /* Tailwind `rounded`. Unchanged behaviour. */
```

The ramp exists and today every step but `pill` resolves to zero. If the operator ever reverses on
sharp corners, that is five edits here instead of two hundred across components. That is the escape
hatch, and it is the reason to take the names now rather than later.

Rejected: `--radius: 4px`. Tailwind's `borderRadius.DEFAULT` maps to it, so every `rounded` in the
repo changes with no diff, and the one visual decision the design is actually confident about gets
flattened by a file nobody imported on purpose.

---

## 4. One breakpoint vocabulary

Found, all currently live:

| # | Source | Vocabulary |
|---|---|---|
| 1 | JSX via Tailwind defaults | min-width 640 / 768 / 1024 / 1280 / 1536 |
| 2 | `app/globals.css:51` | max-width 1023 |
| 3 | `app/growth.css:136-138` | max-width 1200 / 1020 / 760 |
| 4 | `components/growth/GrowthPage.module.css:34-35` | max-width 900 / 600 |
| 5 | `app/tokens.css` | min-width 640 / 1024 |
| 6 | `components/shared/FloatingWhatsApp.tsx:64` | max-width 1023 (styled-jsx) |

**Canonical: Tailwind's min-width defaults, mobile-first.** It is the vocabulary the majority of the
JSX already uses, it costs no config change, and `tokens.css` already agrees with it.

Mapping for the migration. Each of these inverts a max-width rule into a min-width rule, which is a
behaviour change per rule. Convert by hand, never by `sed`:

```
760  -> 640     1020 -> 1024     1200 -> 1280
600  -> 640      900 -> 768      1023 -> 1024
```

`globals.css:51` (`@media (max-width: 1023px) { body { cursor: auto } }`) is deleted outright, not
converted. `body` already sets `cursor: auto` eleven lines above it, so the block is a no-op.

---

## 5. The `.growth-system` mobile defect

`app/growth.css:137`, inside `@media(max-width:760px)`:

```css
.growth-system { display: none; }
```

`.growth-system` is the `<aside aria-label="How discovery connects to revenue">` in
`components/AcquisitionHome.tsx`. It is the buyer-journey diagram, and with `StatBand` rendering
`null` and `HeroAurora` orphaned it is **the only visual device on the live homepage**. Below 760px
the homepage is a wall of text. CLAUDE.md §9 asks for diagrams and evidence; §2 sells into US and
Australia where mobile is the majority of traffic.

### The fix

Do not hide it. Do not lazy-mount it. Do not put it behind a "show diagram" toggle. It is content.

The aside is already a vertical stack: `.growth-system-node` rows joined by `.growth-system-line`
connectors. It is natively linear and works at 360px without a grid. What breaks at small widths is
type size and padding, not layout. Replace the rule with:

```css
/* at the small breakpoint, in place of display:none */
.growth-system        { padding: 18px; }
.growth-query         { margin: 24px 0 18px; }
.growth-query p       { font-size: 22px; letter-spacing: -0.6px; }
.growth-system-caption{ max-width: none; }
```

`.growth-hero-grid` already collapses to `1fr` at that breakpoint, and the aside follows the H1 and
CTA block in DOM order, so the reading order becomes headline, CTA, diagram. That is the right
order.

### Regression guard

Mira must not be the only thing standing between this and a repeat. Add a literal check to the
existing gate chain:

```
scripts/test-growth.cjs  ->  fail if any file in app/*.css matches
                             /\.growth-system\s*\{[^}]*display\s*:\s*none/
```

Crude, and sufficient. [UNVERIFIED: whether `scripts/test-growth.cjs` is the right host. It is
currently a growth-route publication test, not a CSS linter. `scripts/audit-headings.mjs` parses TSX,
not CSS, so neither is a natural fit. Jonas picks the host; `package.json` `gates` is the insertion
point either way.]

The general rule this encodes, for review rather than for a script: **no `display: none` inside a
width media query for an element that carries an `aria-label`.** If it is worth labelling for a
screen reader it is worth rendering on a phone.

---

## 6. Migration, in tranches

Each tranche is one commit, independently shippable, independently revertable.

**T0 (blocking, ships alone, no refactor).**
The focus ring fix (§2.1) and the `.growth-system` fix (§5). Both are one-rule changes to live
defects. Nothing else rides along.

**T1: merge tokens into `globals.css :root`.**
Zero classname changes anywhere. The visible diff is the palette correction. Keep the pre-merge
`:root` block commented immediately below the new one for one release, so rollback is a comment
swap rather than a revert. Delete `app/tokens.css` **after** this lands, not before, or the contrast
arithmetic in its comments is lost with nothing having absorbed it.

**T2: `Navigation.tsx` and `Footer.tsx` to canonical.**
Highest traffic, and the only two reasons `growth.css` is imported in `app/layout.tsx`. When these
land, remove the `import './growth.css'` from `layout.tsx` and import it from the six remaining
pages instead. Site-wide blast radius drops to six routes in one commit.

**T3: the remaining six consumers.**
`AcquisitionHome.tsx`, `LocalAuditExperience.tsx`, and the four static pages. Then delete
`app/growth.css`.

**T4: dependency cleanup.**
`lenis` (^1.3.23) and `styled-components` (^6.4.4) are declared in `package.json` and have **zero**
source usages anywhere in `app/`, `components/` or `lib/`. Verified by grep. Remove both.

`components/growth/GrowthPage.module.css` is left alone. It is already on the canonical token layer.
Only its two breakpoints (900 / 600) get converted, in T3.

---

## 7. Rollback

Per tranche, `git revert` of a single commit. No tranche depends on a later one having landed.

T1 additionally keeps the superseded `:root` block in place as a comment for one release, so the
palette can be restored without a revert if something visual is found in production that preview
missed.

`app/tokens.css` is not deleted until T1 has shipped and held, so the pre-merge state is
reconstructible from the file itself for the whole window in which it might be wanted.

---

## 8. Consequences

**Good.** One accent value, one type scale, one radius convention, one breakpoint vocabulary. The
focus ring passes 1.4.11. Mobile visitors see the homepage diagram. Two unused dependencies leave.

**Unpleasant.** T2 and T3 touch Nav and Footer, which are on every page, so a mistake there is a
sitewide mistake. Preview deploys are the only verification available (CLAUDE.md §6: builds are
verified on Vercel, not locally), so each tranche needs a real preview walk, not a green build.

The 370 `var(--accent)` call sites are not audited individually. T1 corrects them all at once by
re-pointing the variable. Any site that genuinely wanted the brighter teal as a **fill** will go
slightly darker and must be moved to `--accent-fill` by inspection afterwards. That cleanup is real
and is not scheduled here.

## 9. What would make this wrong later

- **Decision H is answered "dark".** This is not a future trigger, it is an open question right now
  (§2.2). The answer does not invalidate this ADR, but it does set `--bg` and it makes the
  `[data-theme="dark"]` scoping rule in §2.2 immediately load-bearing rather than precautionary.
  Nobody should write `app/tokens-dark.css` before Decision H is on the record.
- **Tailwind 4.** `@theme` replaces `tailwind.config.js` and the custom-property bridge changes
  shape entirely.
- **The operator reverses on sharp corners.** This is not a trigger to revisit. The radius ramp in
  §3 exists precisely to absorb it in five lines.
</content>
</invoke>
