# ADR-0005: Homepage client/server split

- Status: proposed
- Date: 2026-09-28
- Depends on: ADR-0004 (one token layer, one breakpoint vocabulary)
- Constrains: `app/page.tsx`, `components/AcquisitionHome.tsx`, `app/HomePage.tsx`, `components/HeroAurora.tsx`, `components/CustomCursor.tsx`
- Implementation goes to Mira (`frontend-dev`). Owen (`quality`) reviews per section.

## Decision

`app/HomePage.tsx` is **not reconnected.** It is harvested. `components/AcquisitionHome.tsx` stays
the `/` entry and stays a server component. The rich design is added to it section by section as
server-rendered markup plus a small number of named client islands. **framer-motion is not added to
the `/` bundle.** The two parallax transforms become CSS `animation-timeline: view()` behind a
`@supports`, with a static fallback. Budget: **40KB gzip** of route-specific client JS on `/`.

---

## 0. Corrections to the stated problem

Grepped before deciding. Two load-bearing numbers in the brief are wrong, and both make the job
smaller.

**Not "~23 components each holding their own `useState` hover flag".** `app/HomePage.tsx` contains
exactly **3** `useState` calls, at lines 71, 349 and 628, in `Btn`, `ServiceCard` and `IndustryCell`.
Those three components render many times, producing roughly 23 hover *instances* from 3
declarations. The fix is 3 edits.

**framer-motion's footprint inside the file is exactly 2 elements.** `motion.div` appears at lines
299 and 430 only, both the parallax ghost wordmarks. Everything else that looks animated is not
framer-motion at all:

- `ScrollReveal` (54 lines) and `MaskReveal` (69 lines) are IntersectionObserver plus the
  `.rf-reveal.is-in` / `.rf-mask.is-in` classes in `globals.css`. Zero dependencies.
- `GradientMesh` is three divs running `animation: rf-orb-drift-*` from `tailwind.config.js`. Pure
  CSS. It has no reason to be in a client tree and never did.
- `WordMarquee` is `@keyframes rf-marquee`. Pure CSS.

So the entire framer-motion dependency on `/` would exist to serve two decorative background
translations. `MagneticBtn` (`useMotionValue` / `useSpring`) and `HeroAurora` do use it genuinely,
and they are the real cost, not the parallax.

---

## 1. Why harvest rather than reconnect

Three reasons, in order of severity. The first is not a performance argument.

**1. The file's content is off-positioning and in places violates §4.**
`HomePage.tsx:280` is `function FourSpokes()`. `INDUSTRIES_DATA` covers Law & Legal, Accounting &
CPA, Financial Services. That is the hub-and-spokes model CLAUDE.md declares retired and lists as
anti-pattern #1. `METHOD_DATA` promises "every quarter your CAC drops", which is an unmeasured
outcome claim under §4. `TECH_STACK` advertises "Framer Motion" as a selling point. Reconnecting the
file wholesale reintroduces a retired positioning and at least one claims violation.

The operator wants the *design*. The design is separable from the copy, and separating it is most of
this work.

**2. `StatBand` is imported at line 13 and renders `null` by design.** Its stats were fabricated and
removed. Reconnecting buys an import and a client boundary for a component that renders nothing.

**2b. Its colour literals are off-system.** The file hardcodes `#050505` three times for its dark
sections, plus `#FAFAF8` nine times and `#0f0e0c` once. `docs/design/tokens-dark.md` calls `#050505`
a cold near-black that is off-brand and specifies `--d-bg #0A0A09` instead. Every harvested section
adopts the ADR-0004 token, never the literal. No hex values move from `HomePage.tsx` into
`AcquisitionHome.tsx`.

**3. Three `cursor: 'none'` declarations** at lines 101, 357 and 634, with `CustomCursor` unmounted.
Reconnecting ships a cursorless desktop homepage. `app/growth.css:2` (`body { cursor: auto }`)
currently masks this only because those lines are unreachable, and ADR-0004 deletes that file.

---

## 2. The split

### Server components (default, no `'use client'`)

`Hero` markup, the section that replaces `FourSpokes`, `Methodology`, `SelectedWorks`, `Coverage`,
`FinalCTA`, `WordMarquee`, `GradientMesh`, `Eyebrow`, `ServiceCard`, `IndustryCell`.

All of these are static markup over module-scope data. After §3 removes their hover state, none has
a reason to be a client component.

**The pattern the whole split depends on:** a client component may wrap server children.
`ScrollReveal` and `MaskReveal` stay client, but they receive `{children}` from a server parent, so
the revealed content stays server-rendered:

```tsx
// server file
<ScrollReveal>            {/* client wrapper, ~1KB */}
  <MethodologySection />  {/* server, 0KB */}
</ScrollReveal>
```

If a section is authored the other way round, with the wrapper inside a client section, the whole
section client-renders and the budget in §5 fails. That inversion is the single most likely mistake
in this refactor and is what Owen should look for first.

### Client islands (named, and that is the complete list)

| Component | Why it must be client |
|---|---|
| `ScrollReveal` | IntersectionObserver. Wrapper only, never content. |
| `MaskReveal` | IntersectionObserver. Wrapper only, never content. |
| `HeroRoiCalculator` | Genuinely interactive. `next/dynamic`, `ssr: false`, below the fold. |
| Booking widget in `FinalCTA` | Third-party iframe embed. |

Nothing else. If a fifth island appears in review, it needs a reason in the PR description.

**Open question for the operator, not an architecture call:** `HeroRoiCalculator` (517 lines) outputs
a projected number. Under CLAUDE.md §4 that is a claim, and it is the kind that has to be labelled as
a projection wherever it appears. Whether an ROI calculator belongs on `/` at all is a claims
question before it is a bundle question. I have kept it in the plan as a lazy island so the answer
either way is cheap.

### Not reconnected

- **`HeroAurora`** (`components/HeroAurora.tsx`). `backdropFilter: blur(22px)` at that radius is a
  known mobile paint cost, and the cursor-driven 3D tilt is pointer-only, so it is invisible to the
  majority of traffic while costing all of it the JS. Its data at line 60 is also retired-model
  content (`{ label: 'Marketing', accent: '#14B8A6' }`). If the operator wants it, it belongs in a
  desktop-only below-fold section and needs its own decision.
- **`CustomCursor`.** Delete the three `cursor: 'none'` declarations with it.
- **`AICitationSimulator`.** See ADR-0006. Currently imported by nothing; it should be deleted, not
  left loaded.

---

## 3. Hover states move to CSS

**Rule: hover state never crosses the client boundary.** If a section needs `'use client'` only to
hold a hover flag, that is a bug, not a requirement.

The three `useState(false)` flags become `:hover` and `:focus-visible` on the element, with the
hover styling moved into a `.rf-*` class in `globals.css`:

- `IndustryCell` (line 628): the grid cell that inverts on hover is a `background` and `color` swap.
  Trivially `:hover`.
- `ServiceCard` (line 349): its glow is **already** entirely CSS. `globals.css` defines
  `.rf-spoke-glow::before` with `opacity: 0` and `.rf-spoke-glow:hover::before` with `opacity: 1`.
  The `useState` there is redundant with a class that already works.
- `Btn` (line 71): background and arrow-translate on hover.

**Add `:focus-visible` alongside every `:hover`.** The current implementation responds to
`onMouseEnter` only, so these cards are today entirely invisible to keyboard users. That is a WCAG
2.4.7 gap the refactor closes for free, and it is a reason to do this beyond bundle size.

---

## 4. The two parallax transforms

They do not justify framer-motion.

**Decision: CSS scroll-driven animation.**

```css
.rf-ghost-parallax { /* static position, this is the fallback */ }

@supports (animation-timeline: view()) {
  .rf-ghost-parallax {
    animation: rf-ghost-drift linear both;
    animation-timeline: view();
    animation-range: entry 0% exit 100%;
  }
}
```

Outside the `@supports` block the wordmark renders static at its mid-scroll position. It is a
decorative background element, so non-support costs a user nothing. [UNVERIFIED: Safari 26 and
Firefox support for `animation-timeline: view()` as of 2026-09. Chromium has shipped it. Check
caniuse before Mira implements; the decision does not change either way because the fallback is
free, but the expected coverage should be in the PR.]

**`prefers-reduced-motion` gap that must ship with it.** The existing block at `globals.css:461`
sets `animation-duration: 0.01ms !important`. That does **not** stop a scroll-driven timeline, which
has no duration. Add explicitly:

```css
@media (prefers-reduced-motion: reduce) {
  * { animation-timeline: none !important; }
}
```

This is a real hole the current block cannot cover, and CLAUDE.md §9 requires `prefers-reduced-motion`
be respected.

**Rejected: a hand-rolled `useScroll` hook.** Smaller than framer-motion, but it still forces
`'use client'` onto the two largest sections (`FourSpokes`, `Methodology`), which is the cost we are
actually trying to avoid. A 2KB hook that client-renders two sections is worse than a CSS property
that client-renders none.

**Rejected: keeping framer-motion.** It drags `MagneticBtn` and `HeroAurora` in by association, and
it re-legitimises reaching for it the next time something needs to move. Once it is in the `/` graph
the budget in §5 stops being enforceable.

---

## 5. Client JS budget for `/`

**Target: 40KB gzip of route-specific client JS**, measured as the `/` row of `next build`'s First
Load JS minus the shared-by-all chunk.

40KB fits `ScrollReveal` + `MaskReveal` + the lazily-loaded calculator + the booking embed's loader,
and nothing else. framer-motion alone does not fit. The budget is set at the level where **the wrong
decision fails the gate rather than requiring someone's judgement in review.** That is the point of
the number; it is not a performance target derived from a field measurement.

[UNVERIFIED: the current First Load JS figure for `/`. Jonas should capture it from a Vercel build
before T1 of ADR-0004 lands. A budget without a baseline is decoration, and if today's figure is
already above 40KB the number needs renegotiating on evidence, not assertion.]

Enforcement runs **after** `next build`, so it is a new step in `package.json`, not an addition to
the existing `gates` script (which runs before the build).

CLAUDE.md §6: build verification happens on Vercel. The gate must therefore fail the Vercel build,
not a local one.

---

## 6. Sequencing and rollback

The split lands **one section per commit.** Each commit replaces exactly one block of
`AcquisitionHome.tsx` with its richer server-rendered equivalent.

Rollback is a single `git revert` per section, and reverting any one section returns that block to
the current text-only version, which is always a valid page. **There is no big-bang cutover**, so
there is no state in which `/` is half-migrated and broken.

Suggested order, lowest risk first: `Coverage`, `Methodology`, `SelectedWorks`, the services grid,
`Hero`, `FinalCTA`. Hero last because it owns LCP and the H1, and because the H1 is governed by
CLAUDE.md §1 and `scripts/audit-headings.mjs`.

`app/HomePage.tsx` is deleted only after the last section is harvested. Until then it is the
reference and it costs nothing, being unreachable.

---

## 7. Consequences

**Good.** `/` stays a server-rendered page. The rich design arrives without framer-motion, lenis or
a custom cursor. Three hover interactions become keyboard-accessible. The reduced-motion block
actually covers the motion that ships.

**Unpleasant.** Each section has to be re-copywritten, not just re-laid-out, because the source
content is off-positioning (§1.1). That work is Theo's and it is not scoped here; the design work
will block on it section by section. Whoever sequences this should start the copy before the
markup, not after.

Scroll-driven CSS is harder to debug than framer-motion and has no devtools timeline in every
browser. That is a real cost paid by Mira, accepted in exchange for the bundle.

The 40KB budget will eventually be hit by something legitimate and someone will want to raise it.
Raising it should require an ADR amendment, otherwise it decays into a suggestion.

## 8. What would make this wrong later

- **`/` needs genuinely interactive data.** A live snapshot result rendering inline on the homepage
  changes the island count and the budget must be renegotiated deliberately, in a new ADR, not
  quietly exceeded.
- **Scroll-driven animations turn out to be unsupported on Safari in a way that matters visually**
  rather than just decoratively, i.e. someone builds a section where the parallax carries meaning.
  It must not; the fallback being acceptable is a constraint on what gets built, not a prediction.
- **React Server Components change shape in Next 17+** such that the wrapper-passes-children pattern
  in §2 stops being free.
</content>
</invoke>
