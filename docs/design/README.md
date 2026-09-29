# Design system, qognitionagency.com

Owner: Elena (creative). Written 2026-09-28, against `CLAUDE.md` as rewritten 2026-09-27.
Built by Mira (`frontend-dev`). Code gated by Owen (`quality`). Copy gated by Ruth (`brand-guard`).

**Nothing here is final until Ruth has reviewed the copy on frame.**

| Document | What it covers |
|---|---|
| [`tokens.md`](./tokens.md) | The light system. Colour with verified contrast ratios, type, spacing, radii, elevation, motion, the `growth.css` migration map, and defects found in current components |
| [`tokens-dark.md`](./tokens-dark.md) | **The dark system, now primary.** Surface ramp, inverted teal ramp, data series palette, measurement states, glow budget, and the `[data-theme="dark"]` scoping |
| [`logo.md`](./logo.md) | The mark, the lockup, responsive behaviour, on-dark and on-light variants, the favicon set, and SVG source |
| [`products.md`](./products.md) | **G.O.L.E.M, Scriblr, LinkersPro, M.A.R.S.** The four product UIs, desktop and mobile, data shapes, five states, and the specimen system that makes fabrication structurally impossible |
| [`labs.md`](./labs.md) | How Qognition Labs appears on the agency site, with copy on frame |
| [`motion.md`](./motion.md) | Parallax amplitude and rate ceilings, scroll choreography, the custom cursor, reduced motion, and the delete list |
| [`mobile.md`](./mobile.md) | Every section at 390px, the replacement for the deleted hero device, sheets, and the 320px floor |
| [`components.md`](./components.md) | Every component for the thirteen routes, with purpose, five states and mobile behaviour, plus the page matrix and the retirement list |
| [`snapshot-result.md`](./snapshot-result.md) | The conversion component. Data contract, desktop and mobile layout, prompt and citation presentation, honesty devices |
| [`four-layers-diagram.md`](./four-layers-diagram.md) | The homepage diagram, as a mechanism rather than decoration |
| [`homepage-wireframe.md`](./homepage-wireframe.md) | Eleven sections with copy on frame |
| `../../app/tokens.css` | The implementation, light ramps plus the `[data-theme="dark"]` block |

---

## Second pass, 2026-09-28

The operator called the minimal homepage bland and asked for the dark design already sitting
orphaned in `app/HomePage.tsx` and `components/HeroAurora.tsx`. That design stays; the targeting
changes to AI SEO for B2B firms. Four things were added:

1. **The dark system is now primary.** Decision H is settled — dark for marketing surfaces, light
   retained for long-form reading, scoped by `[data-theme="dark"]`. `CLAUDE.md` §9 has been updated
   to match. `tokens-dark.md` §0.2 maps every element of the existing visual language to a verified
   token, so this is an extension of what is in the repo rather than a replacement for it.
2. **Four product UIs**, which are the main deliverable, and the specimen system that keeps them
   from becoming the next `AICitationSimulator.tsx`.
3. **A real logo.** There was no vector logo in this repository. `public/favicon.svg` is a 343KB PNG
   in an SVG costume with zero path data.
4. **Motion and mobile**, both of which had ceilings but no system.

**The single most important decision in the second pass:** a metric is an activator that opens the
evidence that produced it. G.O.L.E.M stores raw answers, cited URLs and model versions, so every
number can be re-derived from a stored answer with a date. `products.md` §1 turns that from a claim
into five mechanisms, one of which is a type: `score: number | null`, where `null` renders
"Not measured" and never `0`.

**The second most important:** `products.md` §2.3. The specimen has no code path that can render a
fabricated AI answer, because `AnswerBody` is a discriminated union whose specimen branch is
`{ kind: 'withheld' }`. That is not a policy anyone has to remember. Paired with
`scripts/check-specimen.cjs`, which fails the build on a real TLD in the specimen data or a long
string literal assigned to an `answer`-shaped key under `components/products/`.

---

## The five decisions everything else follows from

**1. The instrument is the identity.** The site has no case studies, no testimonials and no logos it
can publish. What it does have is a measurement it can show people, and a method it can state
without flinching. So the design system is built around one component, `SnapshotResult`, and the
rest of the site is typography and white space that gets out of its way. A brand with nothing to
prove yet should look like it is holding something back, not like it is filling space.

**2. Reproducibility is the credibility device.** Verbatim prompts, copyable, with platform, date,
location, session state and a screenshot per observation. The prospect can rerun the measurement
themselves. Nothing else available to this site buys as much trust for as little.

**3. `--accent` moves from teal-500 to teal-700.** Teal-500 is 2.49:1 against white and was used as
text, and as the sitewide focus ring, throughout the codebase. **This has shipped.** `globals.css`
now uses `--accent-deep #0F766E` at 5.47:1, and `CLAUDE.md` §9 records that `--accent` is never a
focus ring and never text, with `--accent-fill` reserved for graphics. The ink-ring recommendation in
`tokens.md` §1 decision 2 is **superseded** — teal-700 clears 3:1 with room and one ring colour
already in the file beats a second one that is marginally better on paper. On dark surfaces the ring
inverts to white, because teal-700 is 2.87:1 there and fails. `tokens-dark.md` §0.1 and §4.

**4. A section with no evidence is a section that is not on the page.** `EvidenceStrip` returns
null. `ProofSlot` on the insurance page returns null. The homepage is designed to read correctly
with both absent, and it does.

**5. The one exception to rule 4 is the snapshot specimen**, which shows the empty instrument and
says in `text-body` why it is empty. That is not a placeholder. It shows the thing, admits what is
missing and states the reason, which is what CLAUDE.md §4 asks for. If the operator disagrees, the
section is omitted and the page still works.

---

## What I took from radyant.io, and what I did not

**Took:** a subhead that names the actual platforms, because it converts an abstract claim into a
checkable one. Named senior people with a verifiable specific such as the year they started in
search, because a specific year invites checking and a stock photo does not. A numbered manifesto in
place of superlatives, because a list of self-imposed limits is the one form of self-description a
reader cannot dismiss as puffery. Ours is twelve points, drawn from CLAUDE.md §4 and §10, and each
one is checkable against the site itself. It lives on `/about`. See `components.md` D10.

**Did not take:** their proof pattern, which is a case-study grid with headline multiples. We have
nothing publishable and CLAUDE.md §4 forbids presenting anything unmeasured. Their rotating
manifesto ("Today's belief, 1 of 15") is also out, because rotating content is a carousel wearing a
different hat and CLAUDE.md §9 bans carousels. Ours renders all twelve, at once, in order.

---

## Build order for Mira — second pass

The first-pass order below still applies to the light routes. This runs ahead of it, because the
dark ground and the logo are in front of every other pixel.

| # | Step | Unblocks |
|---|---|---|
| 1 | Append the `[data-theme="dark"]` block to `app/tokens.css` (`tokens-dark.md` §10). Set the attribute on the marketing route group | Everything |
| 2 | `QMark` + `Logo`, the favicon set, delete the 343KB fake SVG (`logo.md` §8) | The header at every width. Smallest change with the most visible effect |
| 3 | Fix the two open accessibility defects: `Button` primary at 2.20:1, `Input` with no focus indicator (`products.md` §3.6) | Every control in every product frame |
| 4 | Re-point `app/HomePage.tsx`'s `#050505` sections, `GradientMesh` colours and the gradient-text headings (`tokens-dark.md` §0.2, §8) | Reconnecting the homepage |
| 5 | Motion cleanup: the delete list in `motion.md` §2, the `.rf-reveal` fix, `cursor: none` removal | The reveal and cursor systems |
| 6 | Product shell: `SpecimenFrame`, `FrameBrowser`, `FramePhone`, `AnswerDrawer`, `ProvenanceLine` (`products.md` §3) | All four products |
| 7 | `scripts/check-specimen.cjs` into the gate chain (`products.md` §2.6) | Owen's review. Land it **before** the first specimen dataset, not after |
| 8 | G.O.L.E.M Overview, then Archive. Desktop and mobile | The Labs section, `/geo`, `/ai-seo` |
| 9 | `LabsSection` + `/labs` (`labs.md` §7) | The proof the site currently has none of |
| 10 | Mobile pass: `growth.css` line 137, the sticky bottom CTA, the 13px floor (`mobile.md`) | The majority of the traffic |
| 11 | Scriblr, then LinkersPro, then M.A.R.S | The rest of `/labs` |

Steps 8–11 are gated on P1 in `products.md` §9: which products are actually shipped. **Do not build
a frame for a product with an `IN BUILD` chip.**

---

## Build order, first pass

1. Import `app/tokens.css` last in `app/layout.tsx`. One line. Everything else depends on it.
2. Fix the defects in `tokens.md` §10. They are contrast failures and broken focus affordances in
   production today, and several are one-line changes.
3. Primitives: `Button`, `Field`, `StatusChip`, `Card`, `Table`, `Disclosure`, `SectionHeader`,
   `MethodNote`.
4. `SnapshotResult`, specimen variant first. It is the longest build and it unblocks `/`, `/audit`,
   `/ai-seo`, `/geo` and `/industries/insurance`.
5. `FourLayersDiagram`.
6. Shell: `Header`, `Footer`, `StickyCta`, `SkipLink`.
7. Homepage sections in wireframe order.
8. Layer page template, then its four instances.
9. `/audit`, then `/pricing`, then `/industries/insurance`.
10. `/case-studies` changes, `/insights`, `/about`, `/contact`.
11. Retirement list, `components.md` §F. Separate PR, separate review.

`growth.css` migration (`tokens.md` §8) can run in parallel with steps 3 to 6. It is mechanical.

---

## NEEDS DATA, consolidated

Nothing below can be guessed, and several block a build step.

**Blocking**

| # | What | Blocks | Where |
|---|---|---|---|
| 1 | Turnaround time for the snapshot, number of prompts run, number of competitors compared | `/audit` cannot ship. Every one of these is a promise on the page | `components.md` D5, wireframe §10 |
| 2 | Scope numbers per pricing tier: locations covered, prompts tracked, assets produced | `/pricing` is a table shape with no content | `components.md` D4 |
| 3 | PPC management fee percentage and monthly minimum, or the decision to say "Request pricing" | `/ppc` pricing block | `components.md` D3 |
| 4 | Which single qualifying question the lead form asks. Recommendation: "Who do you lose deals to?", because it also supplies the snapshot's competitor set | Form field count, and the snapshot data contract | `components.md` D8, snapshot §2 |
| 5 | Team names, roles, photos and one verifiable specific per person | `/about` `PeopleGrid` renders null without them | `components.md` D10 |
| 6 | Real first-90-days deliverables and cadence | Homepage §5 is promises | wireframe §5 |
| 7 | Real response time for `/contact` | `ResponseExpectation` | `components.md` D11 |

**Non-blocking, but each one removes a hole**

| # | What | Effect |
|---|---|---|
| 8 | Client logos with written permission, or one reconciled case study, or one named reference | `EvidenceStrip` stays null until this exists |
| 9 | One insurance case study or named reference | The insurance wedge currently has nothing behind it. The largest single gap on the site |
| 10 | One snapshot with written permission to publish | Replaces the specimen with a real filled-in result |
| 11 | The closed list of permitted `not_checked` reasons | Free text will drift into excuses |
| 12 | A citable, dated source for AI-assisted B2B vendor discovery | Homepage §3 stays argument-only without it, which is acceptable |
| 13 | A real recorded prompt for the four-layers diagram example | Otherwise the example question stays abstract with no date attached |

**Decisions, not data**

| # | Question | My recommendation |
|---|---|---|
| A | The H1 promises placement ("We make sure it says you") while CLAUDE.md §4 forbids promising placement. Same file, first line of the site | Alternate B in the wireframe: "Your buyers are asking ChatGPT who to hire. Most firms have never checked the answer." |
| B | Ship the snapshot specimen, or omit the section | Ship the specimen |
| C | Link the competitor domains in the cited-instead-of-you list | No. It sends the prospect to the competitor |
| D | Load JetBrains Mono via `next/font`, or design to `ui-monospace` | Load it. It is the most credibility-critical text on the site and it currently renders differently on every OS |
| E | Keep `ExitIntentPopup` | Remove it. An exit popup on a page whose whole argument is restraint costs more trust than it recovers |
| F | `components/interactive/AICitationSimulator.tsx` | Delete. A simulator produces an invented AI answer, which is the exact failure mode CLAUDE.md §4 forbids. This one is not a preference |
| G | The seven ROI and traffic calculators | Delete. Every one outputs a projected number with no measurement behind it |
| H | Does the site go dark? | **Settled.** Dark for marketing surfaces, light for long-form reading. `tokens-dark.md` §0 |
| I | Is M.A.R.S internal proof, a client-facing product, or a client view into their own routing? | Open. Design works for the first and third. `products.md` §7 |
| J | Does the engine logo marquee ship, given that `CLAUDE.md` §9 bans auto-rotation? | Open. Recommend shipping it, engines and data sources only, never client logos, labelled `SURFACES WE MEASURE`, static grid under reduced motion and below 768px. `motion.md` §6 |
| K | Merge `/labs`'s "What we will not claim" with the `/about` manifesto into one canonical list? | Open. Recommend merging. `labs.md` §5.4 |

---

## Second-pass NEEDS DATA

Adds to the list above. Full detail in `products.md` §9, `labs.md` §8 and `logo.md` §9.

**Blocking**

| # | What | Blocks |
|---|---|---|
| P1 | Which of G.O.L.E.M, Scriblr, LinkersPro and M.A.R.S are in use on client accounts, which are internal only, which are in build | Every status chip, and the "Shipped, not promised" strapline. **`/labs` cannot ship without it.** A product with an `IN BUILD` chip gets a card and no frame |
| P2 | The engine list G.O.L.E.M tracks today, and whether all 8 are live | The matrix row count. It must not show 8 aspirationally |
| P5 | Which authority metric and provider LinkersPro uses, and whether the licence permits displaying it in a product UI | LinkersPro's scatter y axis cannot be labelled |
| B1 | Does qognitionlabs.com exist and ship today | The outbound link, and whether Labs reads as a division or an aspiration |
| L1 | Geist OFL-1.1 sign-off for distributing outlined glyph paths as a logo asset | The outlined lockup. The live-text lockup ships without it |

**Non-blocking**

| # | What | Effect |
|---|---|---|
| P3 | Real model version strings per engine | The model-version row is the most persuasive 13px in the design |
| P4 | Answer retention policy | The Archive footer |
| P6 | Decision I above | M.A.R.S's data model |
| P7 | The real speed-to-lead SLA, and whether it is measured | The clock |
| P8 | Numeric lead score, or the boolean rule in `lib/leadQualification.ts` | The lanes. The rule is the better design either way |
| P9 | Prompt set size per pricing tier | Matrix column count. Already open as item 2 above |
| P10 | Is `Send to Scriblr` a real integration or a proposal | If a proposal, the control renders disabled. Never ship a control that does nothing |
| B2 | Count of stored answers to date | The third circular badge. Cut until it exists |
| L2 | Any trademark filing covering the current spiral mark | Whether changing the mark has a cost outside design |
| M1 | The 11-locale language menu in `Navigation.tsx` | It costs nav width on mobile that the header CTA needs |

---

## Conformance checklist

Run against any page before it is called done.

- [ ] Every heading uses a canonical token. `node scripts/audit-headings.mjs` passes.
- [ ] No rendered text below 13px.
- [ ] Every text and background pair is in the verified table in `tokens.md` §2.
- [ ] Focus is visible on every interactive element, at 2px ink, 2px offset.
- [ ] Every component has all five states implemented, including the empty one.
- [ ] No number on the page lacks a source, a date and a method.
- [ ] No section is filled with a placeholder. Sections without evidence return null.
- [ ] Mono type appears only on prompts, domains, timestamps, versions and positions.
- [ ] No animation exceeds 320ms. `prefers-reduced-motion` removes all of it.
- [ ] Readable and operable at 320px width and 400% zoom.
- [ ] No carousel, no auto-rotation, no stock photography of people.
- [ ] Ruth has reviewed the copy on frame.

### Second-pass additions

Dark surfaces (`tokens-dark.md` §11):

- [ ] No teal-700 on a dark surface. No white text on a teal fill — ink on teal, always.
- [ ] No text below `--d-text-faint #918D84`.
- [ ] Teal is not used for any data series but the subject brand.
- [ ] Every chart reads correctly with all colour removed.
- [ ] Three background orbs maximum, peak alpha ≤ 0.13, never under body copy.
- [ ] No gradient text. No inline heading sizes.

Product screens (`products.md`):

- [ ] Every metric has a visible provenance line. No number renders without a `runSetId`.
- [ ] `null` renders "Not measured", never `0`.
- [ ] "Not checked" and "not found" are never conflated.
- [ ] A failed refresh never leaves a stale number looking current.
- [ ] Every screen implements the partial state.
- [ ] The specimen strip is inside the device chrome, so a crop carries its own disclaimer.
- [ ] Every domain in the specimen ends in `.example`. Qognition appears nowhere in it.
- [ ] No component has a code path that renders a fabricated AI answer.
- [ ] `scripts/check-specimen.cjs` passes.
- [ ] No typing animation, thinking dots or simulated latency anywhere.
- [ ] Every circular badge contains a count of things that exist. No multiples, no projections.

Motion (`motion.md` §9) and mobile (`mobile.md` §8):

- [ ] No scroll-linked element moves more than 80px total, or above rate 0.12 (0.06 with text).
- [ ] No parallax below 1024px. No parallax on any text element at any width.
- [ ] `cursor: none` appears nowhere in the codebase.
- [ ] No content element is hidden by a media query.
- [ ] The header CTA is present at every width.
- [ ] Readable and operable at 320px and at 400% zoom.
- [ ] No table scrolls horizontally. Every sheet has an explicit close button.
- [ ] Every product screen has a designed mobile layout, not a scaled desktop one.

Logo (`logo.md` §7):

- [ ] `public/favicon.svg` is real vector under 1KB, not the 343KB base64 PNG.
- [ ] Mark and wordmark are driven by one `--logo-size` variable.
- [ ] The wordmark renders at weight 600, which is a weight `next/font` actually loads.
