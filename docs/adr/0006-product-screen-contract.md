# ADR-0006: Product screen component contract

- Status: proposed
- Date: 2026-09-28
- Depends on: ADR-0004 (token layer), ADR-0005 (server-first, 40KB budget on `/`)
- Constrains: `components/product-screens/**`, `data/product-screens/**`
- Deletes: `components/interactive/AICitationSimulator.tsx`
- **Blocked on an operator decision.** See §7. The `ScreenId` union cannot be written until it is answered.
- Interface only. Implementation goes to Mira (`frontend-dev`).

## Decision

One component, `<ProductScreen screen={...} />`, renders a screen object taken from a typed registry
in `data/product-screens/`. Screens are declared as **data, never as JSX literals**. Every screen
renders inside a frame carrying a provenance badge that **cannot be omitted, because it is derived
from a required single-member union on the type rather than passed as a prop.** The component holds
no time-based state, so it ships zero client JS and cannot simulate computation.

---

## 0. Why the counter-example failed

`components/interactive/AICitationSimulator.tsx` is the specification for what must be impossible. A
policy that says "do not fabricate" stops none of the four mechanisms below, which is why the
contract forbids each one structurally.

**F1. It renders a third party's output.** The artefact is a *ChatGPT answer*. Rendering an assistant
answer is a claim about what that assistant says. CLAUDE.md §4: "a sampled AI result is an
observation on a date, not a state."

**F2. It names real third parties as sources.** `g2.com/agencies`, `crunchbase.com`,
`reddit.com/r/marketing`, each with an invented snippet. Real organisations made to appear to say
something.

**F3. It simulates computation.** `scanning 142,000 sources…` driven by `setTimeout`. It asserts a
process that is not running and a number that was not measured.

**F4. The data is inline literals inside the render body.** `const sources = [...]` sits in the
component function. Nothing outside the file can inspect it, gate it, lint it or label it. There is
no seam to attach a control to.

It is also, verified by grep, **imported by nothing.** It is an unmounted loaded gun.

---

## 1. The contract: five rules, one per failure

### R1. A screen renders only first-party UI. (closes F1)

`ProductScreen` renders Qognition's own product chrome. It may never render a third-party surface.

Enforced by the type: there is no `provider`, `assistant` or `answer` field to put "ChatGPT" in. The
`ScreenId` union is closed and contains only Qognition products.

Where a screen legitimately needs to show which assistant a row came from, that is a `platform`
**label on a data row inside our table**, not a rendering of that assistant's interface. The
difference is not cosmetic: a labelled row in our UI says "our tool recorded this"; a rendered
ChatGPT bubble says "ChatGPT said this".

### R2. Every entity in sample data is fictional, and that is typed. (closes F2)

```ts
// data/product-screens/sample-entities.ts
/** Invented. Checked against no real registry on purpose. Adding a member is a reviewed change. */
export type SampleBrand =
  | 'Northgate Mutual' | 'Harbour & Vane' | 'Calderwood Risk'
  | 'Pellman IT Group' | 'Stroud & Fenner';

export type SampleDomain = `${string}.example`;   // RFC 2606 reserved. Cannot resolve.
```

A real company name **cannot be typed into a screen**, because the field is `SampleBrand`, not
`string`. Domains are constrained to the `.example` TLD, which is reserved by RFC 2606 and can never
be a real site.

Qognition's own name and domain are not members of `SampleBrand`. Combined with R1, "an AI answer
ranking Qognition #1" is unrepresentable in this type system. That specific artefact is the one the
counter-example produced, and it is now a compile error.

### R3. Provenance is required, and is a single-member union. (closes the "it looks real" problem)

```ts
// data/product-screens/types.ts
export interface ProductScreen {
  id: ScreenId;
  product: ProductName;
  /** One line, present tense, what this screen shows. Rendered in the frame caption. */
  caption: string;

  /**
   * Non-negotiable. A single-member union, so a screen cannot be constructed without it
   * and cannot be set to anything that reads as real.
   * Widening this union is a deliberate type change that every call site sees.
   */
  provenance: 'illustrative';

  /** Present only when an approved real capture replaces the built UI. See R6. */
  capture?: ScreenCapture;

  rows: readonly SampleRow[];
}
```

`provenance: 'illustrative'` as a **required single-member union** is the load-bearing choice.

Rejected: `isDemo?: boolean`. An optional boolean defaults to "this is real", which is precisely the
failure that shipped. Omission must be impossible, not merely discouraged.

Rejected: a `label?: string`. An author-supplied label can be softened to "Example view" or
"Preview", which are both weaker than the truth. The badge text is produced by the **component**, not
the data, and authors cannot reword it:

> **Illustrative product interface. Sample data, not client results.**

The badge renders inside the frame, at every viewport, in both light and inverted sections. It is
not a `title` attribute, not a tooltip, not below the fold of the frame.

### R4. No simulated computation. (closes F3)

`ProductScreen` exposes **no time-based state.** No `useState`, no `setTimeout`, no `setInterval`,
no typing effect, no counter, no progress bar, no loading stage.

A screen is a static render of a fixed dataset. If a screen wants to imply progression it does so
with a static "as at {date}" row, never with an animation that mimics work happening.

This is the rule that would have deleted `scanning 142,000 sources…` before it was written, and it
is also what makes R5's server-component guarantee possible.

### R5. Data lives in `data/product-screens/`, never in the component. (closes F4)

```ts
export const PRODUCT_SCREENS: Record<ScreenId, ProductScreen> = { /* ... */ };
```

Components import a screen. They never declare one. This creates the seam that R1 to R4 need: one
directory to review, one place a gate script can read, and a diff in which a copy change appears as
a data change rather than as a JSX edit buried in markup.

---

## 2. The call site

One prop, so there is nothing to get wrong:

```tsx
<ProductScreen screen={PRODUCT_SCREENS.scriblr} frame="laptop" />
```

`frame: 'laptop' | 'phone' | 'none'`.

`frame="none"` still renders the caption and the provenance badge. **The frame is styling; the
provenance is not.** Removing the device chrome must never remove the disclosure, or the first time
someone wants a borderless layout the label goes with it.

The four screens are responsive React components, not images: real `<table>` and `<dl>` markup, the
ADR-0004 token layer for colour, the canonical Tailwind breakpoints. They reflow rather than scale.
A screenshot of a dashboard at 360px is unreadable; a table is not.

---

## 3. Scroll animation without heavy JS

`ProductScreen` is a **server component.** R4 guarantees it has no state, so this is not a
restriction, it is a consequence.

Animation comes from the existing `ScrollReveal` wrapper, which ADR-0005 keeps on the page anyway:

```tsx
<ScrollReveal>                                     {/* client, ~1KB, already paid for */}
  <ProductScreen screen={PRODUCT_SCREENS.mars} />  {/* server, 0KB */}
</ScrollReveal>
```

The reveal is `.rf-reveal` / `.rf-reveal.is-in` in `globals.css`, driven by IntersectionObserver.
No per-screen client boundary, no framer-motion, nothing added to ADR-0005's 40KB budget.

`.rf-reveal` starts at `opacity: 1` in its base rule, so the screen is visible without JS, and it is
already listed in the `prefers-reduced-motion` block at `globals.css:461`.

---

## 4. Swapping in a real screenshot later

The `capture` field, which is why it exists on the type from day one rather than being added when
needed:

```ts
export interface ScreenCapture {
  src: string;
  /** ISO date. CLAUDE.md §4: an observation on a date, not a state. */
  capturedAt: string;
  /** Required literal. You cannot add a capture without asserting you redacted it. */
  redacted: true;
}
```

`ProductScreen` renders `capture.src` through `next/image` when present, and the built UI otherwise.
**The call site does not change.** No page edit, no import change, no prop added.

When `capture` is present the badge changes to:

> **Captured {capturedAt}. Client identifiers removed.**

`redacted: true` as a required literal means adding a screenshot forces an explicit assertion in the
diff that redaction happened. `redacted: false` does not typecheck, so there is no way to add an
unredacted capture "temporarily".

If the capture shows real client data it also needs `provenance` widened to `'captured'`, which is a
type change touching every screen and therefore cannot happen without review. That is deliberate
friction on exactly the change most likely to go wrong.

---

## 5. The gate

Add `scripts/check-product-screens.cjs` to the pre-build gate chain. It fails the build if any file
under `components/product-screens/` contains:

1. a string literal matching `/\.(com|io|ai|co|net|org)\b/`, a real domain (catches F2);
2. `setTimeout` or `setInterval` (catches F3);
3. `useState`, `useEffect` or `'use client'` (catches F3 and F4, and enforces §3's server guarantee).

Three greps. Crude, and exactly sufficient: every one of the counter-example's four failures trips at
least one, and each rule has a clean escape hatch (real domains belong in `data/`, animation belongs
in `ScrollReveal`).

[UNVERIFIED: whether this should be a fourth script or an addition to `scripts/test-growth.cjs`.
`package.json`'s `gates` script is the insertion point either way. Jonas owns the decision.]

**Immediate, in the same PR as the contract:** delete
`components/interactive/AICitationSimulator.tsx`. It is imported by nothing (verified). Leaving it on
disk means someone eventually mounts it. Owen should see the deletion and the contract together, so
the reason is on the record next to the rule.

---

## 6. Alternatives rejected

**Images or Figma exports in device frames.** Cheapest, and rejected. They do not reflow, they blur
on retina at the sizes a hero needs, they cannot use the ADR-0004 token layer so they drift from the
site's palette on every rebrand, and their text is invisible to search and to assistants, which is a
direct cost given what this agency sells.

**A `<Disclaimer>` component placed next to each screen.** Rejected because it is omittable. Every
disclosure mechanism that can be forgotten will eventually be forgotten, usually by the person in the
biggest hurry. The badge has to be structurally inseparable from the render.

**A lint rule instead of the type constraints in R2.** Rejected. Lint rules are suppressible with a
comment and are usually suppressed at 6pm. `SampleBrand` being a closed union is not suppressible.

**One component per product (`<GolemScreen>`, `<ScriblrScreen>`, ...).** Rejected. Four components
means four places the provenance badge can drift or be dropped, and four datasets to audit. One
component with a registry means the disclosure is written once.

---

## 7. Blocking: the product names do not match the repo

I have not picked, because these names are already in published copy and a rename is a content
migration, not a constant change. `data/case-studies/*.ts` ships these in `engines:` fields today:

| Brief says | Repo ships | Status |
|---|---|---|
| **Scriblr** = content for AI citation | `'Scriblr for AI citation tracking'` | **Conflict.** Repo has Scriblr doing tracking, the brief gives tracking to G.O.L.E.M |
| **Linkdex** = AI backlink generation | `'LinkersPro for earned mention acquisition'` | **Conflict.** Different name, adjacent role |
| **M.A.R.S** = multi-agent routing, lead routing and attribution | `'M.A.R.S. for quote routing, speed-to-lead response and bind attribution'` | Compatible |
| **G.O.L.E.M** = AI visibility tracking | **Appears nowhere in the repo** | Unresolved. Its stated role is the one Scriblr already holds |

Two further notes for whoever answers:

- "Linkdex" was a real third-party SEO platform brand. [UNVERIFIED: current trademark status. Check
  before it appears on a public page, not after.]
- CLAUDE.md §4 forbids presenting a capability we cannot demonstrate. A product screen for a tool
  that does not exist yet is a product claim, whatever the badge says. Which of the four are built,
  and which are roadmap, is part of the same answer.

`ScreenId` is written once this is settled. Nothing else in the contract depends on it.

---

## 8. Consequences

**Good.** The failure mode cannot recur by construction rather than by vigilance: a real company
name is a compile error, an assistant UI has no field to live in, an animation trips the gate, and a
missing disclosure is unrepresentable. Four server components, zero client JS, inside ADR-0005's
budget. Real screenshots swap in without touching a page.

**Unpleasant.** `SampleBrand` as a closed union means every new sample entity is a two-file change,
which will feel like friction to whoever is writing the fifth screen at speed. That friction is the
feature, and it will be argued about.

Invented brand names in a screen are less persuasive than a real logo. That is the trade. CLAUDE.md
§4 already made it and this ADR only enforces it.

The gate's domain regex will produce false positives on legitimate prose. The fix is to move the
prose to `data/`, which is where R5 wanted it.

## 9. Rollback

The registry and component are additive; nothing existing depends on them. Rollback is a directory
delete plus removing one line from `gates`. The `AICitationSimulator` deletion reverts independently
of everything else.

## 10. What would make this wrong later

- **A screen needs to be genuinely interactive**, a working demo the prospect drives. R4 forbids it,
  correctly. The answer is then a separate `<ProductDemo>` with its own contract and its own
  disclosure rules. **Do not relax R4 in place.** R4 is the rule that closed F3, and F3 is the
  failure that is hardest to spot in review.
- **Real client screenshots become routine** rather than exceptional. At that point `provenance`
  widens, the badge logic grows a branch, and the redaction assertion should probably become a
  reviewed checklist rather than a type literal.
- **A fifth product ships.** That is fine and costs one registry entry. It is not a trigger.
</content>
</invoke>
