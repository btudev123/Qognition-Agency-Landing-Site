# Motion system

Owner: Elena (creative). Written 2026-09-28. Extends [`tokens.md`](./tokens.md) §7.
Covers the reconnected homepage, the Labs section and the product frames.

**Everything specified here is built from primitives that already exist in this repo.** Nothing new
is invented. The work is mostly deciding what to keep, what to cap and what to delete.

---

## 1. Does the 320ms ceiling still hold?

**Yes, and it was never the right unit for parallax.**

The distinction the previous pass did not make explicit:

| Class | Governed by | Ceiling |
|---|---|---|
| **Discrete motion** — a thing changes state | duration | **320ms.** Unchanged |
| **Continuous motion** — a thing is bound to scroll position | there is no duration | **amplitude and rate.** See §3 |

A parallax transform has no duration to cap. It runs exactly as long as the user scrolls and stops
when they stop. Applying a 320ms number to it is a category error. What it needs instead is a limit
on how far it moves and how fast it moves relative to the scroll, and those are the two numbers in
§3.

So `tokens.md` §7 stands unamended for discrete motion:

| Token | Value | Use |
|---|---|---|
| `--dur-instant` | 80ms | Press / active |
| `--dur-fast` | 140ms | Hover, focus, colour |
| `--dur-base` | 200ms | Accordion, disclosure, small transform, reveal |
| `--dur-slow` | 320ms | Section reveal, sheet open, sparkline draw. **Ceiling** |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Entering, changing |
| `--ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Leaving |

Animatable properties remain `opacity`, `transform`, `color`, `background-color`, `border-color`,
`outline-color`, and for one case `stroke-dashoffset`. Never `height`, `width`, `top`, `left`,
`margin`.

---

## 2. What already exists, and its verdict

| Primitive | Where | Verdict |
|---|---|---|
| `ScrollReveal` | `components/shared/ScrollReveal.tsx` | **Keep.** The section reveal primitive. Retune per §4 |
| `MaskReveal` | `components/shared/MaskReveal.tsx` | **Keep, restricted.** Per-word mask wipe. Headings only, max two per section, never on body copy, never on the header logo |
| `CountUp` | `components/shared/` | **Keep, rationed.** One per screen, on a number that has a provenance line under it |
| `.rf-reveal` | `globals.css:111` | **Fix or delete.** 40px over 1000ms is four times the ceiling, and it sets `opacity: 1` with a 40px offset and no out-state, so content sits 40px low until observed. Replace with 8px / 200ms |
| `.rf-mask` | `globals.css:123` | Keep. Backs `MaskReveal` |
| `rf-orb-drift` a/b/c | `globals.css:195` | **Keep, re-coloured and capped.** See §3.3 |
| `rf-marquee` + edge fades | `globals.css:148`, `WordMarquee` | **Keep, repurposed.** See §6 |
| `rf-pulse` | `globals.css:163` | Keep for the live status dot only. Two uses max per page |
| `.rf-spoke-glow` | `globals.css:270` | **Delete.** The card hover already has an inset glow. Two glow layers on one hover is one too many (`tokens-dark.md` §8) |
| `.rf-work-image` zoom | `globals.css:245` | Keep. `scale(1.04)` on hover is within budget |
| `.rf-section-divider` | `globals.css:254` | Keep. Its `::after` label is 10px and must go to `text-meta` |
| `.roi-slider` | `globals.css:388` | **Delete with the calculators.** Decision G in `README.md`: the seven ROI and traffic calculators output projected numbers with no measurement behind them |
| `hero-wave-1/2/3` | `globals.css:178` | **Delete.** Unused |
| `rf-glow` | `globals.css:213` | **Delete.** Unused |
| `rf-float` | `globals.css:170` | **Delete.** A floating element is decoration with a permanent CPU cost |
| `rf-noise` | `globals.css:220` | Keep if it is actually used; a 2–3% noise overlay on a dark ground genuinely helps banding on large gradients. If unused, delete |
| `rf-gradient-text` / `-dark` | `globals.css:75` | **Delete.** No single foreground colour, so it cannot be AA-verified. Replace with a solid `--d-accent-display` word inside a `--d-text` heading |
| `.rf-cursor-dot` / `-ring` | `globals.css:283` | **Keep the classes, rewrite the behaviour.** §5 |
| `MagneticBtn` | `components/shared/MagneticBtn.tsx` | **Keep, capped at 4px displacement.** A button that moves more than that under the cursor becomes harder to hit, which is a Fitts's law cost paid for a novelty |
| `HeroDashboard` tilt | `components/HeroAurora.tsx:66` | **Keep the mechanism, retarget it.** Spring `{stiffness: 120, damping: 20}`, ±8° / ±6°. Retune to **±4° / ±3°** and apply it to the product device frame, which is the object it was always right for |
| `prefers-reduced-motion` block | `globals.css:461`, `growth.css:138` | Keep. Extend per §7 |

---

## 3. Parallax

### 3.1 The two ceilings

| Ceiling | Value | Why |
|---|---|---|
| **Amplitude** | No element translates more than **80px total** across the full scroll of its section | Beyond that the element visibly detaches from the content it belongs to |
| **Rate** — element movement ÷ scroll distance | **≤ 0.12** for background layers with no text. **≤ 0.06** for anything containing text | Above roughly 0.15 the page reads as sliding rather than scrolling, and text becomes hard to follow while in motion. This is also where motion-sensitivity complaints start |

The giant background words in `app/HomePage.tsx` (`SERVICES` at ±60px, `PROCESS` at ±40px) are
within both. `SERVICES` at 120px total across a ~2000px section is a rate of 0.06 and an amplitude
of 120px — **over the 80px amplitude cap. Reduce to ±40px.** `PROCESS` at ±40px is 80px total,
exactly at the cap. Keep.

### 3.2 What gets parallax, and what does not

| Layer | Parallax | Rate |
|---|---|---|
| Background orbs | Yes | 0.10 |
| Giant background word | Yes | 0.04 |
| Device frames | **No.** They get a tilt on cursor (§4) and nothing on scroll | — |
| Cards, grids, lattices | No | — |
| Headings, body copy, any text the reader reads | **Never** | — |
| Section backgrounds | No | — |

A device frame drifting on scroll while the user is trying to read the numbers inside it is the
single worst motion decision available on this page, and it is the tempting one.

### 3.3 Background orbs

`GradientMesh` in `app/HomePage.tsx` keeps its geometry. Three changes:

1. **Re-colour.** Teal `rgba(20,184,166,0.11)`; replace the violet `rgba(99,58,237,0.09)` and blue
   `rgba(37,99,235,0.06)` with teal at 0.06 and 0.04. Those two are leftovers from the retired
   4-spoke palette and they put two off-brand hues on the page.
2. **Cap alpha at 0.13.** Current peak is 0.13. At the limit, not over.
3. `rf-orb-drift` durations stay long — 18s / 24s / 30s. A slow drift is cheap; a fast one is a
   distraction. Keep `will-change: transform` on exactly these three elements and nowhere else.

### 3.4 No parallax below 1024px

All scroll-linked transforms resolve to `0` under 1024px. Two reasons, and the first is enough:
touch scrolling is momentum-driven and parallax reads as jank rather than depth; and the
compositing cost is paid on the weakest devices in the traffic. Implement as a single
`useParallax()` hook that returns `0` when `matchMedia('(max-width: 1023px)')` matches or when
reduced motion is set, so no component needs to know.

---

## 4. Scroll choreography, homepage

One reveal per section, three staggered children maximum, fires once, first viewport entry only.
Threshold `0.15`, `rootMargin: '0px 0px -10% 0px'`.

| # | Section | What fires | Detail |
|---|---|---|---|
| 1 | Hero | `MaskReveal` on the H1, per line, 2 lines max, 80ms apart. Then `ScrollReveal` on the subhead, CTAs and engine strip at 40ms steps | **The H1 is present in markup at full opacity.** No reveal component may start at `opacity: 0` in the DOM, so the page is readable with JS off |
| 2 | Hero device | The G.O.L.E.M score card fades in at +200ms and the sparkline draws | Sparkline via `stroke-dashoffset`, 320ms. Dots fade after. `CountUp` on the trend value, once |
| 3 | Engine strip | Static. No marquee in the hero | The hero is where a marquee is most tempting and most damaging |
| 4 | Tension / argument band | `MaskReveal` on the H2, one line | |
| 5 | Four-layers diagram | `ScrollReveal` on the container, then the four layer rows at 40ms steps. The connector lines draw via `stroke-dashoffset`, 320ms, after the rows | The diagram is a mechanism, so it assembles in reading order |
| 6 | Method / process | `ScrollReveal` per column, 3 stagger groups. The horizontal timeline rule draws left to right, 320ms | The existing `rf-page-in` on that rule is 1500ms with a 500ms delay. **Cut to 320ms, no delay** |
| 7 | Sector grid | `ScrollReveal` on the container only. **Not per cell** | Eight cells staggering is a list animating, which `tokens.md` §7 bans |
| 8 | **Labs** | `ScrollReveal` on the header, then the four cards in **2 stagger groups by row**, then the frame at +200ms, then the frame's internal choreography (`products.md` §4.4) | The frame's internal motion is the only nested choreography on the page, and it is the payoff |
| 9 | Measurement band | `ScrollReveal`, container only | |
| 10 | FAQ | None. Disclosures animate on open, 200ms | |
| 11 | Final CTA | `MaskReveal` on the H2, 2 lines. Orbs already drifting | |

**Total reveal events on the page: 11 sections, ~26 elements.** If a build produces materially more
than that, something is staggering a list.

---

## 5. The custom cursor

The current implementation is a hazard and the fix is not to delete it.

### 5.1 What is wrong now

`app/HomePage.tsx` sets `cursor: 'none'` on every `Btn` and on `ServiceCard` and `IndustryCell`
links, with a JS-drawn dot and ring replacing it. That means:

- If the cursor JS fails, is blocked, or has not hydrated, **there is no pointer at all** over the
  page's primary controls.
- In Windows High Contrast and forced-colors modes the drawn cursor may not render while the native
  one is still suppressed.
- On hybrid touch-and-trackpad devices the drawn cursor appears and desyncs.
- A ring that lags the true pointer by more than ~200ms is a known trigger for motion sensitivity
  and it is also the thing that makes a custom cursor feel cheap.

### 5.2 The rule

**The custom cursor is an additive layer. It never replaces the native one.**

1. **`cursor: none` is banned.** Delete every instance. The native cursor stays visible at all times.
   The custom layer draws on top of it.
2. **Mount conditions, all four required:** `(pointer: fine)`, `(hover: hover)`, viewport ≥1024px,
   and `prefers-reduced-motion: no-preference`. Fail any one and the component does not mount at
   all — not hidden, not mounted.
3. **Spring, not perpetual lerp.** `{ stiffness: 400, damping: 40 }`, settling in roughly 180ms. The
   ring should arrive, not trail.
4. **`mix-blend-mode: difference`, 1px white ring, no fill.** One implementation reads correctly on
   the dark ground, inside a light product frame and over a teal CTA, with no colour logic.
5. **Three states, no more:**

   | State | Trigger | Treatment |
   |---|---|---|
   | Default | anywhere | 28px ring, 1px |
   | Activator | over a link, button or card | 44px ring, fill `rgba(255,255,255,0.12)`, 140ms |
   | **Labelled** | over a device frame, a metric, a matrix cell or a citation row | 44px ring containing a mono uppercase `text-meta` word: `TRACE` on evidence, `OPEN` on a metric, `READ` on an article card |

6. **The labelled state is the only reason to have a custom cursor at all.** On the product frames
   it announces that a number is an activator, which is precisely the message this design needs to
   deliver and which is otherwise hard to signal without cluttering the UI. If the labelled state is
   cut, cut the cursor with it.
7. **The cursor never carries information that is not in the DOM.** Every element with a cursor
   label also has a visible affordance and an accessible name. The label is a flourish on top of a
   fact, never the fact.
8. Hidden while the drawer or a mobile sheet is open. `z-index` below any modal.
9. Kill switch: `?nocursor=1`, and it unmounts on the first `touchstart` in a session.

### 5.3 `MagneticBtn`

Keep, capped at **4px displacement**, spring `{ stiffness: 300, damping: 25 }`. Past about 6px the
button is actively evading the pointer and hit rate drops. Disabled under the same four mount
conditions as the cursor.

---

## 6. The integration logo strip — a conflict I am not resolving on my own

**The reference site auto-cycles a logo carousel. `CLAUDE.md` §9 bans carousels and
auto-rotating sliders.** Same requirement, two rules, and this is an operator decision.

**My reading.** The ban targets *content* carousels — hero sliders, testimonial rotators — where
rotation hides content behind an affordance most people never operate. A continuous logo marquee
hides nothing **if every logo is also present in the DOM in a static wrapped grid**, which is what
the reduced-motion and mobile treatments render anyway. On that reading a marquee is not a carousel;
it is a static list with a decorative transport.

**My recommendation: build it, with four constraints.**

1. **Engines and data sources only. Never client logos.** The site has no permission-cleared client
   logos (`README.md`, gap 8), and `data/trust.ts` carries five platform "partner" logos marked
   `[UNVERIFIED]` (`OPERATOR-DECISIONS.md`). Those must not go in, in any form.
2. **Labelled `SURFACES WE MEASURE`**, mono uppercase, so it cannot be read as a client roster or a
   partnership claim. A row of logos with no label is read as customers by default.
3. `prefers-reduced-motion` and <768px render a **static wrapped grid**, not a paused marquee. A
   frozen marquee clips half its items off-screen, which is content loss.
4. Reuse `rf-marquee` and the existing edge-fade gradients in `WordMarquee`. Edge fades must be
   re-pointed from `var(--bg)` to `var(--d-bg)` or they will show as light bands on the dark ground.

`[Decision J: does the engine marquee ship, or does CLAUDE.md §9 apply to it? My recommendation
above. It is not mine to decide.]`

---

## 7. `prefers-reduced-motion`

Everything collapses. Nothing disappears.

| Thing | Reduced-motion state |
|---|---|
| All parallax | `0`. Elements render at their mid-scroll position |
| Orb drift | Static, at the animation's midpoint. **Colour is kept.** The orbs are composition, the drift is decoration |
| `ScrollReveal`, `MaskReveal` | Content visible, no transform, no opacity change |
| `CountUp` | Final value, rendered |
| Sparkline draw | Drawn |
| Badge arc sweep | At its final arc |
| Matrix cell stagger | All cells visible |
| Custom cursor | **Unmounted** |
| `MagneticBtn` | No displacement |
| Device frame tilt | None |
| Marquee | **Static wrapped grid**, all items visible. Not a paused strip |
| Hover transitions | Instant, but the state change still happens. Reduced motion is not reduced feedback |
| Disclosure open/close | Instant |

The existing block at `globals.css:461` and the one in `growth.css:138` both use the blunt
`animation-duration: .01ms !important` sweep. That is fine as a floor, but it does **not** handle
parallax (a `transform` bound to scroll position, not an animation) or the cursor (a mounted
component). Those two need the JS-side checks in §3.4 and §5.2.

Content must be readable with JavaScript disabled. **No reveal component may start at `opacity: 0`
in markup.** The current `.rf-reveal` gets this right by accident (it starts at `opacity: 1`) and
wrong in the other direction (a permanent 40px offset). Fix both.

---

## 8. Performance budget

| Limit | Value |
|---|---|
| `will-change` declarations on a page | **6.** Currently the three orbs, and that should be most of it |
| Elements with a scroll-linked transform | 4 |
| Simultaneous transitions on one hover | 2 properties |
| Blur radius on any decorative layer | ≤60px |
| Animated elements in the first viewport | 8 |
| `framer-motion` client components in the first viewport | 3. Everything else is CSS or a Server Component |

Motion must not move LCP past 2.5s on 4G mobile. The hero H1 is server-rendered text at full opacity
and is the LCP candidate; nothing may delay it, including `MaskReveal`, which wraps text that is
already painted.

---

## 9. Conformance

- [ ] No discrete animation exceeds 320ms.
- [ ] No scroll-linked element translates more than 80px total, or at a rate above 0.12 (0.06 with text).
- [ ] No parallax below 1024px.
- [ ] No text element has parallax at any width.
- [ ] `cursor: none` appears nowhere in the codebase.
- [ ] The custom cursor does not mount on touch, below 1024px, or under reduced motion.
- [ ] No list of more than 3 items staggers.
- [ ] No reveal component starts at `opacity: 0` in markup.
- [ ] `prefers-reduced-motion` removes all of it, and removes no content.
- [ ] No gradient text.
- [ ] No typing animation, thinking dots or simulated latency anywhere on the site.
- [ ] `hero-wave-*`, `rf-glow`, `rf-float`, `rf-spoke-glow`, `roi-slider`, `rf-gradient-text*` deleted.
