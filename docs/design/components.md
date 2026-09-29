# Component inventory

Owner: Elena (creative). Written 2026-09-28. Built by Mira, gated by Owen, copy gated by Ruth.

Every component below lists purpose, the five states and mobile behaviour. Where a component
already exists in the repo it is named with its path and the entry says what changes.

Two components have their own documents because they carry the argument:
`docs/design/snapshot-result.md` and `docs/design/four-layers-diagram.md`.

**The omission rule applies everywhere.** Any component whose purpose is to show proof renders
nothing at all when it has no data. It does not render a placeholder, a skeleton, a "coming soon"
or a sample. A section with no evidence is a section that is not on the page.

---

## A. Shell

### A1. `SkipLink`
Exists as `.growth-skip` in `growth.css`. First focusable element on every page.

| State | Behaviour |
|---|---|
| Default | Off-screen at `top: -80px`. |
| Hover | None. It is keyboard-only. |
| Focus | Slides to `top: 8px`, `--dur-fast`. `--cta-fill` background, `--cta-text`, `--radius-sm`, ink focus ring. |
| Loading | n/a |
| Empty/error | n/a |

Mobile: identical. Must clear any sticky header.

### A2. `Header`
Replaces `.growth-nav` and `components/shared/Navigation.tsx`.

Purpose: get to the four layer pages, industries, pricing and the snapshot. Six items maximum.
The snapshot CTA is in the header on every page and is the only button in it.

| State | Behaviour |
|---|---|
| Default | White, 1px `--rule-hairline` bottom. Height 72px mobile, 88px desktop. Sticky from scroll position 0 with `backdrop-filter: blur(8px)` and `rgba(255,255,255,0.92)`, `--elev-0` until scrolled, `--elev-2` after 24px. |
| Hover | Nav item: `--ink-500` to `--ink-900`, 140ms. No underline animation. The `.rf-link` 600ms wipe is removed. |
| Focus | Ink ring, 2px, 2px offset. Tab order: skip link, logo, nav items, CTA. The mobile toggle is a real `<button aria-expanded aria-controls>`. |
| Loading | n/a. Server-rendered. |
| Empty/error | n/a |

Mobile: items collapse into a full-height sheet from the top, `--elev-2`, `--dur-slow`, focus
trapped, `Esc` closes, background scroll locked, returns focus to the toggle. The CTA is pinned to
the bottom of the sheet at full width. **The header CTA is not hidden on mobile**, unlike
`.growth-nav-cta` today, which sets `display: none` below 760px and removes the primary action from
60% of traffic.

### A3. `Footer`
Purpose: navigation, the disclosure lines, and the one place the platform names are listed in full.

| State | Behaviour |
|---|---|
| Default | `--surface-invert`, `--text-on-invert`, wrapped in `.on-invert`. Four columns desktop, two mobile. Rules `rgba(255,255,255,0.14)`. |
| Hover | Link `--on-dark-soft` to `--white`, 140ms. |
| Focus | White ring. |
| Loading | n/a |
| Empty/error | n/a |

Must carry, in `text-meta`: "Platform names identify discovery surfaces. They are not customer
logos, certifications or endorsements." (from `docs/repositioning/platform-assets.md`) and
"Countries listed are markets served, not offices."

Mobile: two columns, brand block spans both. No accordions. A footer that has to be opened is a
footer nobody reads.

### A4. `StickyCta`
Exists as `components/shared/StickyCTA.tsx`. One per page, appears after the hero leaves the
viewport, disappears when the final CTA enters it.

| State | Behaviour |
|---|---|
| Default | Bottom bar, white, 1px `--rule-hairline` top, `--elev-2`. One line of context plus one button. |
| Hover | Button to `--cta-fill-hover`. |
| Focus | Ink ring. Reachable in DOM order, placed at the end of `<main>`. |
| Loading | n/a |
| Empty/error | n/a |

Mobile: full width, 64px tall, respects `env(safe-area-inset-bottom)`. Dismissible with an explicit
close that persists for the session. Never covers the final CTA or a form field.

---

## B. Primitives

### B1. `Button` — `components/ui/Button.tsx`, needs the fixes in `tokens.md` §10

| Variant | Fill | Text | Hover | Use |
|---|---|---|---|---|
| `primary` | `--cta-fill` | `--cta-text` (5.47:1) | `--cta-fill-hover` (7.58:1) | One per screen. |
| `secondary` | transparent, 1px `--rule-interactive` | `--ink-900` | border `--accent`, text `--accent` | The second CTA. |
| `quiet` | transparent | `--ink-500` | `--ink-900`, background `--ink-050` | Tertiary. |
| `link` | none | `--accent`, underlined at 3px offset | `--accent-deep` | Inline in prose. |

| State | Behaviour |
|---|---|
| Default | `--radius-sm`, `text-meta` (sm) or `text-body` (md, lg), weight 500. Minimum 44px tall. |
| Hover | Fill or border change only, 140ms. No lift, no scale, no brightness filter. |
| Focus | Ink ring 2px at 2px offset. Visible on every variant including `primary`, because the ring sits on the white page not on the fill. |
| Loading | Label is replaced by the same label plus a 16px spinner, width is locked to prevent reflow, `aria-busy="true"`, `disabled`. Label changes to the present participle: `Running snapshot`. |
| Disabled | `--ink-300` text on `--ink-050`, `cursor: not-allowed`, no `opacity`. A disabled submit must still explain why, so it is paired with a `text-meta` line. |

Mobile: full width inside forms and hero CTA stacks, auto width inline. Two stacked CTAs get 12px
between them, never side by side below 380px.

### B2. `Text`, `Heading` — `components/ui/Text.tsx`, `components/ui/Heading.tsx`
Unchanged. They are the enforcement point for `scripts/audit-headings.mjs`. Do not add sizes.

### B3. `Field` (Input, Textarea, Select, Checkbox) — replaces `components/ui/Input.tsx`

| State | Behaviour |
|---|---|
| Default | 1px `--rule-interactive` (3.25:1), `--radius-sm`, 12px 14px padding, 48px tall, `text-body`. Label above, `text-meta` 500, `--ink-700`. Hint below in `text-meta` `--ink-400`. Placeholder is never a substitute for a label. |
| Hover | Border to `--ink-400`. |
| Focus | Ink ring, 2px, 2px offset. `focus:outline-none` is forbidden. Border unchanged so the ring is the only signal and cannot be confused with an error. |
| Loading | On submit, all fields `readonly` (not `disabled`, so values remain readable to assistive tech), `aria-busy` on the form. |
| Error | Border `--danger`, message below in `text-meta` `--danger` with a 12px warning glyph, `aria-invalid="true"`, `aria-describedby` to the message, `role="alert"`. Focus moves to the first invalid field on failed submit. |

Mobile: `font-size: 16px` minimum on inputs or iOS zooms on focus. `text-body` at 17px satisfies
this. Correct `inputmode`, `autocomplete` and `type` on every field (`url`, `email`, `organization`).

### B4. `StatusChip`
Purpose: the three measurement states, and nothing else. Never used for marketing labels.

| State | Rendering |
|---|---|
| present | filled square glyph, `--teal-800` text, `--teal-50` fill, `--radius-pill` |
| not-found | hollow square glyph, `--ink-500` text, white fill, 1px `--ink-200` |
| not-checked | hatched square glyph, `--ink-400` text, `--ink-050` fill with 4px diagonal hatch |

States: default as above. Hover and focus none, it is not interactive. Loading: the `Checking…`
variant with a 2px pulsing bar. Empty: not applicable, a chip with no state is a type error.
Mobile: identical, wraps below the label rather than truncating.

### B5. `Card`
Purpose: a bounded content block. 1px `--rule-hairline`, `--radius-md`, 24px padding, white,
`--elev-0`.

| State | Behaviour |
|---|---|
| Default | Border only. No shadow. |
| Hover | Only if the whole card is a link: border to `--rule-interactive`, `--elev-1`, 140ms. A non-interactive card does not react. |
| Focus | Ink ring on the card when it wraps a link. The link covers the card via a `::after` overlay so the whole surface is clickable while only the title is in the accessibility tree. |
| Loading | Border and a 2px top progress bar. No shimmer. |
| Empty/error | The card is not rendered. |

Mobile: full width, 20px padding, 16px between cards.

### B6. `Table` (measurement base)
Purpose: the shared shell behind `SnapshotResult`, `KpiSection`, `BenchmarkTable` and the pricing
scope table.

Default: `--radius-md`, 1px `--rule-structural`, header row `--ink-050`, `text-meta` uppercase
`0.08em` `--ink-700`, body rows separated by 1px `--rule-hairline`, values `text-body leading-snug`
with `.tabular`. Hover: row `--ink-050`. Focus: the scroll container is `role="region"` with
`tabindex="0"` and an accessible name. Loading: per-cell chips, never a full-table skeleton.
Empty: a single row with the reason, never a blank grid.

Mobile: below 768px a comparison table transposes into per-column blocks. A table that only scrolls
sideways loses the comparison, which is the reason the table exists. See the snapshot spec §4.

### B7. `Disclosure` / `FaqAccordion` — `components/case-studies/FaqAccordion.tsx`
Native `<details>`/`<summary>`. No JS.

Default: closed, 1px `--rule-hairline` top, question `text-h4` 500, 20px vertical padding, plus/minus
glyph right. Hover: question to `--accent`. Focus: ink ring on the summary, full row width. Loading:
n/a. Empty: the FAQ section is omitted when fewer than four questions exist.

Mobile: identical. Glyph stays right-aligned and 44px tall. Question wraps, never truncates.

### B8. `SectionHeader`
Eyebrow (`text-meta` uppercase `0.08em` `--ink-400`), `Heading level="h2"`, lede (`text-body`
`--ink-500`, `max-w-measure`), optional right-aligned link. 12px, 16px, 32px rhythm.

States: default only. The optional link takes `Button variant="link"` states. Mobile: stacks, link
moves below the lede, left aligned.

### B9. `MethodNote`
Purpose: the reusable honesty block. Wherever a number, an observation or a claim appears, this
sits under it.

Default: `--ink-050`, `--radius-md`, 16px padding, 3px `--accent` left rule, `text-meta`
`--ink-500`. Content is always: what was measured, when, on what, and what the limits are.
Hover/focus: none unless it contains a link. Loading: n/a. Empty: **the component cannot be empty.
If there is no method to state, the thing above it should not be on the page.**

Mobile: full width, 16px padding.

### B10. `EvidenceTag`
Purpose: marks a figure as `Target` or `Result`, driven by `caseStudyEvidence()`. Never set per
page.

`Target`: `--ink-050` fill, `--ink-700` text, 1px `--ink-200`, label `TARGET`, with a link to
`/case-studies/methodology`. `Result`: `--teal-50` fill, `--teal-800` text, label
`RESULT, RECONCILED`. States: static. Mobile: sits above the figure rather than beside it.

### B11. `EmptyState` — `components/case-studies/EmptyState.tsx`
Default: `--ink-050`, `--radius-md`, 32px padding, centred, `text-h4` line plus a `text-body` line
plus one action. No illustration, no icon. Hover/focus: on the action only. Loading: replaced by the
loading state of its parent. Mobile: 24px padding, action full width.

### B12. `Prose` — `.prose-q` in `globals.css`
Unchanged except the token re-points. Add: `h2`/`h3` get `scroll-margin-top` equal to header height
plus 24px, tables get `.tabular`, `figcaption` moves from `--text-faint` to `--ink-400`.

---

## C. Shared sections

### C1. `Hero`
Purpose: positioning, one primary CTA, one secondary, and the platform line that makes the claim
checkable.

Default: white, no background graphic, no aurora, no orbs. `Heading variant="display"` on `/` and
`level="h1"` elsewhere, `max-w-[18ch]`. Lede `text-body` `--ink-500` `max-w-measure`. Two CTAs.
Platform row beneath, separated by a 1px `--rule-hairline` and 32px.

Hover/focus: on the CTAs and platform links only. Loading: n/a, server-rendered, no reveal on the
hero. The first screen must be complete on first paint. Empty: n/a.

Mobile: single column, CTAs stacked full width, display type at the `clamp()` floor of 44px,
`padding-top` clears the header. `components/HeroAurora.tsx` and `components/NoiseLayer.tsx` are
not used.

### C2. `PlatformRow` — `components/shared/AIPlatforms.tsx`
Purpose: name the surfaces. Not a logo wall and not social proof.

Default: label `PLATFORMS WE MEASURE` in `text-meta` uppercase, then the platform names as text
with a 20px mark where a licensed mark exists and a text monogram where it does not. 1px
`--rule-hairline` chips, `--radius-sm`. Hover: border to `--rule-interactive` if linked, otherwise
none. Focus: ink ring. Loading: n/a. Empty: n/a.

Mobile: wraps to three rows, chips shrink to 32px tall, `text-meta` stays 13px. The current 10px
and 11px sizes go.

A required `text-meta` line sits beneath: "Platform names identify discovery surfaces. They are not
customer logos, certifications or endorsements."

### C3. `EvidenceStrip` — **conditional, omitted by default**
Purpose: the proof band under the hero.

`[NEEDS DATA: client logos with written permission to display, or a countable fact with a source.]`
Until that exists this component **renders `null`**. It does not render "Trusted by", a count, a
placeholder row of grey rectangles or a testimonial. `components/shared/ProofBar.tsx` and
`components/shared/ClientPartners.tsx` must be checked for hardcoded claims before reuse.

When data exists: logos at a uniform 28px optical height, greyscale is banned (it misrepresents the
mark), 1px `--rule-hairline` separators, plus a `text-meta` line naming how many clients and since
when. States: default, hover none, focus none (logos are not links unless there is a case study
behind them), loading none, empty renders null. Mobile: two rows of three, never a marquee.

### C4. `LayerCard`
Purpose: one of the four layers, as a card. Used on `/` and in cross-links.

Default: `Card`, `text-meta` uppercase index (`01`–`04`), `Heading level="h3"` with the layer name,
one-line surface definition from CLAUDE.md §1, then the outcome line, then a rule, then three
`text-meta` bullets. Hover: whole card is a link, border to `--rule-interactive`, title to
`--accent`, `--elev-1`. Focus: ink ring on the card. Loading: n/a. Empty: n/a, the four layers
always exist.

Mobile: single column, full width, the `min-height` on the outcome line is removed so cards do not
carry dead space.

### C5. `ProgrammeSteps`
Purpose: how the engagement runs, as phases with named deliverables.

Default: three or four numbered steps. Number in `text-meta` `--accent` above a 1px
`--rule-structural` top rule, `Heading level="h3"`, `text-body` body, then a `text-meta`
deliverable line: `You get: ...`. Hover/focus: none, not interactive. Loading: n/a. Empty: n/a.

Mobile: stacks with 32px gaps, the top rule becomes a left rule so the sequence reads vertically.

### C6. `FitTable` (who it suits, who it does not)
Purpose: qualification, taken from CLAUDE.md §2. Disqualifying is the highest-trust move available
to a site with no case studies.

Default: two columns, `This fits` and `This does not fit`, each a list with a 12px glyph. No red,
no green. The `does not fit` column carries equal visual weight. Hover/focus: none. Loading: n/a.
Empty: n/a.

Mobile: stacks, `does not fit` second, both columns fully visible, neither collapsed.

### C7. `FaqSection` — `components/shared/FAQSection.tsx`
`SectionHeader` plus `Disclosure` list plus `FAQPage` JSON-LD from `components/JsonLd.tsx`.
Minimum four questions or the section is omitted. Answers 40 to 120 words. Mobile: full width.

### C8. `FinalCta`
Purpose: the last, and the only dark band on the page.

Default: `--surface-invert`, `.on-invert`, `Heading level="h2"` in `--white`, lede in
`--on-dark-soft`, primary button `--teal-300` fill with `--ink-900` text (13.22:1) because
`--cta-fill` at 5.47:1 against ink loses too much on dark, secondary as a white-bordered ghost.
Hover: `--teal-200`. Focus: white ring. Loading: button loading state. Empty: n/a.

Mobile: stacked, 64px vertical padding, buttons full width.

### C9. `CrossLinks` — `components/shared/CrossLinks.tsx`
Three related pages, `text-h4` titles with a one-line reason to go there. Layer pages always link
the sibling layers plus the industry page. States: hover title to `--accent`, ink focus ring.
Mobile: stacked list with 1px rules, not cards.

### C10. `CalBooking` — `components/shared/CalBooking.tsx`
Unchanged behaviour. The comment about `booking_widget_view` not being a booking is load-bearing
per CLAUDE.md §8 and stays.

Default: the iframe in a `--radius-md` bordered container with a visible `text-meta` label above:
`Booking opens in an embedded calendar`. Loading: a 320px-tall bordered box with `Loading the
calendar` in `--ink-400`, replaced on load. Error: if the iframe fails, a plain mailto and a direct
Cal link. **An embed that fails silently is a lost booking**, so the fallback is required, not
optional. Mobile: full width, minimum 560px tall, never inside a scroll container.

---

## D. Page components

### D1. `/` Homepage
See `docs/design/homepage-wireframe.md`. Components: `Hero`, `PlatformRow`, `EvidenceStrip`
(omitted), `BuyingProblem`, `FourLayersDiagram`, `ProgrammeSteps`, `IndustryGrid`,
`SnapshotResult variant="specimen"`, `FitTable`, `FaqSection`, `FinalCta`.

**`BuyingProblem`** — purpose: state the problem in the buyer's words before naming the offer.
Three blocks: what the buyer does now, why it stops working, what it costs. `text-h3` per block,
`text-body` beneath. No statistics unless sourced and dated. States: static. Mobile: stacked, 32px
gaps.

**`IndustryGrid`** — purpose: the vertical wedge. Insurance first and visibly deeper than the other
two. Default: three `Card`s, insurance spanning two columns on desktop. Hover: card link states.
Focus: ink ring. Loading: n/a. Empty: a vertical with no page is not listed. Mobile: stacked,
insurance first.

### D2. `/seo`, `/local-seo`, `/ai-seo`, `/geo` — one template, four instances

| Component | Purpose | States | Mobile |
|---|---|---|---|
| `LayerHero` | `h1` naming the surface and the buyer outcome, one CTA, one secondary | static; CTA states | single column, CTAs stacked |
| `SurfaceDefinition` | the CLAUDE.md §1 definition verbatim, in a `MethodNote` | static | full width |
| `FourLayersDiagram emphasis="<layer>"` | where this layer sits | see its spec | stacked |
| `WhatWeDo` | the work, as a list of concrete activities, not benefits | static | stacked, 1px rules between items |
| `MeasuredBy` | how progress on this layer is measured and what we will not promise | static | full width |
| `Deliverables` | what arrives, by cadence | static | stacked |
| `FaqSection` | 4 to 6 questions | native disclosure | full width |
| `CrossLinks` | sibling layers plus insurance | hover, focus | stacked list |
| `FinalCta` | snapshot | button states | stacked |

`MeasuredBy` is the component that keeps these pages honest. For `/ai-seo` and `/geo` it must say,
in `text-body`: what is sampled, how often, that a sample is an observation on a date, and that no
placement is promised. It renders on all four layer pages with layer-specific content.

### D3. `/ppc`
`LayerHero`, `WhatWeDo`, `ChannelList` (Google Ads, LinkedIn, Meta, Bing, as text), `PricingModel`,
`MeasuredBy`, `FaqSection`, `FinalCta`.

**`PricingModel`** — purpose: state the percentage-of-spend model and the monthly minimum without
inventing figures. Default: a two-row definition list, `Management fee` and `Monthly minimum`.
`[NEEDS DATA: the percentage and the minimum, or the decision to say "Request pricing" here too.]`
Until supplied, the component renders the model shape with `Request pricing` and no numbers. States:
static plus its CTA. Mobile: stacked definition list.

### D4. `/pricing`

| Component | Purpose | States | Mobile |
|---|---|---|---|
| `ScopeTable` | the tiers, differentiated by scope only: locations covered, prompts tracked, assets produced. No prices. | `Table` states; no hover emphasis on any tier, because there is no recommended tier without data | transposes to one block per tier, scope rows as label/value pairs |
| `WhatIsIncluded` | the fixed list that is in every tier, so scope reads as the only variable | static | stacked |
| `WhatIsNotIncluded` | the honest exclusions. Ranking guarantees, placement promises, media spend. | static | stacked |
| `PricingRequestForm` | `LeadForm intent="pricing"` | see D8 | full width |
| `FaqSection` | price objections | disclosure | full width |

No "most popular" flag, no crossed-out anchor price, no annual toggle. `[NEEDS DATA: the exact
scope numbers per tier: locations, prompts tracked, assets produced.]` Without them the table is a
shape with no content and the page should not ship.

### D5. `/audit` — the snapshot page
The highest-value page on the site.

| Component | Purpose | States | Mobile |
|---|---|---|---|
| `AuditHero` | what the snapshot is, what arrives, in how long. No nav links in the hero. | static | form or its anchor visible above the fold |
| `SnapshotRequestForm` | the request. See D8. | full | full width, 4 fields |
| `WhatYouGet` | the deliverable, itemised: surfaces checked, prompts run, competitors compared, screenshot count, format, turnaround | static | stacked checklist |
| `SnapshotResult variant="specimen"` | the instrument itself | see its spec | per-surface blocks |
| `MethodAndLimits` | `MethodNote`, expanded: what we check, what we do not, why a sample is not a state | static | full width |
| `WhoItIsFor` | `FitTable` | static | stacked |
| `ProcessSteps` | request, we run it, you get it, optional walkthrough call | static | stacked |
| `FaqSection` | "is it really free", "what is the catch", "will you spam me" | disclosure | full width |

`[NEEDS DATA: turnaround time for the snapshot, prompt count, and number of competitors included.]`
Every one of those is a promise and none may be guessed.

### D6. `/industries/insurance` — flagship, deepest page
`IndustryHero`, `BuyerLanguage`, `SurfaceMap`, `ProofSlot` (conditional), `ObjectionList`,
`FourLayersDiagram`, `FaqSection`, `FinalCta`.

**`BuyerLanguage`** — purpose: prove we know their world by using their words. Distinguishes our
buyer (owner, CEO, marketing lead) from their buyer (risk manager, CFO, operations lead) explicitly,
per CLAUDE.md §2. Default: two labelled columns. States: static. Mobile: stacked with headers.

**`SurfaceMap`** — purpose: the four layers rendered for this vertical: what a commercial insurance
buyer actually searches and asks. Default: four rows, surface plus example query type. The queries
are illustrative and labelled as such unless recorded. States: static. Mobile: stacked.

**`ObjectionList`** — the real sales objections with real answers. Default: `Disclosure` list styled
differently from the FAQ so the two are not confused: no rule, `--ink-050` block per item.

**`ProofSlot`** — `[NEEDS DATA: one insurance case study or one named reference.]` Renders `null`
until then. This is the single largest gap on the site: the entire wedge is "we prove in insurance"
and there is nothing here to prove it with.

### D7. `/case-studies`
Existing components largely stand: `IndexFilters`, `StudyGrid`, `CaseStudyCard`, `EmptyState`,
`Breadcrumbs`, `KpiSection`, `BenchmarkTable`, `PlaybookSections`, `NicheServiceBadges`.

Changes:
- `CaseStudyCard` gets `EvidenceTag` on the card face, not only on the detail page. A reader
  scanning the index must be able to see which records are targets before clicking.
- `IndexFilters` gains an evidence filter with the options `All`, `Results reconciled`, `Targets`.
  Building the filter that lets a prospect see only verified records is a trust move, not a risk.
- `EmptyState` copy when filters match nothing: `No case studies match those filters yet.` plus a
  reset action. Never "check back soon".

States for `IndexFilters`: default (all active), hover (chip border), focus (ink ring), loading
(chips disabled with `aria-busy` while the list updates), empty (the `EmptyState` renders and the
filters stay interactive). Mobile: filters become a horizontally scrollable chip row with the count
pinned above, 44px tall.

### D8. `LeadForm` / `SnapshotRequestForm` — `components/shared/LeadForm.tsx`
Purpose: the one capture, four fields maximum, posting to `/api/lead`.

Fields: `Name`, `Work email`, `Company website`, and one qualifying field. `lib/leadQualification.ts`
constrains how short this can be, so the fourth field is the one that carries the MQL signal.
`[NEEDS DATA: which single qualifying question the operator wants. My recommendation, because it
also supplies the snapshot's competitor set: "Who do you lose deals to?"]`

| State | Behaviour |
|---|---|
| Default | Stacked fields, labels above, one submit. Honeypot present and `aria-hidden`. Consent line in `text-meta` beneath the button, not a checkbox unless EU traffic requires it. |
| Hover | Field border `--ink-400`. Button `--cta-fill-hover`. |
| Focus | Ink ring. First field focusable but not autofocused, which would skip the page on load. |
| Loading | Button `aria-busy`, label to `Running your snapshot`, fields `readonly`, no layout shift. |
| Success | Inline replacement of the form with a confirmation block: what happens next, by when, from whom, and the Cal link. No redirect, no page change. The `duplicate` response from `/api/lead` renders the same confirmation, because to the user it is the same outcome. |
| Error | Field-level messages for validation. A form-level `role="alert"` for a server failure, with a mailto fallback so the lead is not lost. |

Mobile: full width, 48px fields, 16px minimum font size, correct keyboards, submit within thumb
reach, never inside a horizontally scrolling container.

### D9. `/insights`
`ArticleList`, `ArticleCard`, `ArticleHeader`, `Prose`, `AuthorBox`, `UpdatedStamp`,
`TableOfContents` on posts over 1200 words.

`AuthorBox`: a named person, their role, and what they do here. Real photo or no photo. A generic
avatar is worse than nothing. `UpdatedStamp`: `Published 12 Mar 2026. Last reviewed 18 Sep 2026 by
<name>.` Required on every post per CLAUDE.md §7.

States: `ArticleCard` hover border and title colour, ink focus ring, list loading uses three
bordered placeholder rows with no shimmer, empty renders `EmptyState`. Mobile: single column cards,
TOC collapses into a `<details>` above the body.

### D10. `/about`
`AboutHero`, `PeopleGrid`, `PrinciplesList`, `HowWeWork`, `FinalCta`.

**`PeopleGrid`** — named senior people, following the reference's device and CLAUDE.md's rule
against stock photography. Each entry: real photo or no photo at all, name, role, one line of what
they are responsible for, and a verifiable specific such as the year they started in search.
`[NEEDS DATA: names, roles, photos and one verifiable specific per person.]` Renders `null` if
empty. A team page with no team is worse than no team page.

States: static, or card link states if people have pages. Mobile: two columns at 480px+, one below.

**`PrinciplesList`** — our equivalent of the reference's manifesto, and the reason it works: a list
of self-imposed limits is the one form of self-description a reader cannot dismiss as puffery.
Twelve numbered points, drawn from CLAUDE.md §4 and §10, each checkable against the site itself.

Default: numbered list, index in `text-meta` `--accent`, statement in `text-h4` weight 500, 1px
`--rule-hairline` between. No cards, no icons. States: static. Mobile: single column, index above
the statement.

Draft copy, for Ruth:

> 1. No number appears on this site that we did not measure.
> 2. We do not guarantee rankings, citations or placement in any AI system. We do not control them.
> 3. A sampled AI answer is an observation on a date, not a state. We publish the platform, the date and the prompt set.
> 4. We publish the prompts we used, verbatim, so you can run them yourself.
> 5. A case-study figure is labelled a target until the client's own reporting is reconciled against it.
> 6. We name the domains an AI cited instead of you. Citation order is not a ranking, and we say so.
> 7. Countries we serve are markets, not offices. We do not claim buildings we do not have.
> 8. Where we have no evidence for a section, we leave the section out.
> 9. We tell you what we did not check, and why.
> 10. We will tell you when this work is not worth doing for you.
> 11. Our reports say what moved and what did not.
> 12. The word "guarantee" does not appear in our proposals.

Twelve, not fifteen. Three more would be padding, and padding is the thing this list exists to
refuse.

**`HowWeWork`** — the engagement shape, cadence, who you talk to, what you are expected to do.
Static. Mobile: stacked.

### D11. `/contact`
`ContactHero`, `ContactForm`, `DirectDetails`, `ResponseExpectation`, `MarketsNote`.

`DirectDetails`: email and phone as real text, selectable, `tel:` and `mailto:` linked.
`ResponseExpectation`: `[NEEDS DATA: real response time.]` States: form states as D8.
`MarketsNote`: `text-meta`, "US and Australia. These are markets we serve, not office locations."
Mobile: form first, details below, both full width.

---

## E. Page to component matrix

| | Header | Hero | Platform row | Evidence strip | Four layers | Snapshot | Programme | Fit | FAQ | Final CTA | Footer |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/` | ● | display | ● | omitted | ● | specimen | ● | ● | ● | ● | ● |
| `/seo` | ● | h1 | | | emphasis | | ● | | ● | ● | ● |
| `/local-seo` | ● | h1 | | | emphasis | | ● | | ● | ● | ● |
| `/ai-seo` | ● | h1 | ● | | emphasis | specimen | ● | | ● | ● | ● |
| `/geo` | ● | h1 | ● | | emphasis | specimen | ● | | ● | ● | ● |
| `/ppc` | ● | h1 | | | | | ● | ● | ● | ● | ● |
| `/pricing` | ● | h1 | | | | | | ● | ● | ● | ● |
| `/audit` | ● | h1, no nav | ● | | | specimen | ● | ● | ● | ● | ● |
| `/industries/insurance` | ● | h1 | ● | omitted | ● | specimen | ● | ● | ● | ● | ● |
| `/case-studies` | ● | h1 | | | | | | | | ● | ● |
| `/insights` | ● | h1 | | | | | | | | ● | ● |
| `/about` | ● | h1 | | | | | | | | ● | ● |
| `/contact` | ● | h1 | | | | | | | | | ● |

---

## F. Components to retire

These exist in the repo, belong to the retired four-spoke model or contradict the brand direction,
and must not be carried into the new pages. Deleting them is a separate ticket for Mira.

`components/spokes/*` (all), `components/shared/SpokeHero.tsx`, `components/shared/SpokeLayout.tsx`,
`components/HeroAurora.tsx`, `components/NoiseLayer.tsx`, `components/CustomCursor.tsx`,
`components/shared/MagneticBtn.tsx`, `components/shared/MaskReveal.tsx`,
`components/shared/CountUp.tsx` (an animated number implies precision it does not have),
`components/shared/FloatingWhatsApp.tsx`, `components/shared/ExitIntentPopup.tsx`
(`[operator decision: CLAUDE.md no longer mentions exit intent. I would remove it. An exit popup on
a page whose whole argument is restraint costs more trust than it recovers.]`),
`components/interactive/AICitationSimulator.tsx` (**a simulator produces an invented AI answer,
which is the exact failure mode CLAUDE.md §4 forbids. This one is not optional.**),
`components/interactive/calculators/*` for the retired spokes: `AutomationRoiCalculator`,
`FinanceHealthScore`, `RoasCalculator`, `GoogleAdsCalculator`, `TrafficEstimator`,
`SeoRoiCalculator` and `components/shared/HeroRoiCalculator.tsx` (**every one of these outputs a
projected number with no measurement behind it**).
