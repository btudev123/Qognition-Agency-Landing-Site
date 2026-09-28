# Design system, qognitionagency.com

Owner: Elena (creative). Written 2026-09-28, against `CLAUDE.md` as rewritten 2026-09-27.
Built by Mira (`frontend-dev`). Code gated by Owen (`quality`). Copy gated by Ruth (`brand-guard`).

**Nothing here is final until Ruth has reviewed the copy on frame.**

| Document | What it covers |
|---|---|
| [`tokens.md`](./tokens.md) | Colour with verified contrast ratios, type, spacing, radii, elevation, motion, the `growth.css` migration map, and defects found in current components |
| [`components.md`](./components.md) | Every component for the thirteen routes, with purpose, five states and mobile behaviour, plus the page matrix and the retirement list |
| [`snapshot-result.md`](./snapshot-result.md) | The conversion component. Data contract, desktop and mobile layout, prompt and citation presentation, honesty devices |
| [`four-layers-diagram.md`](./four-layers-diagram.md) | The homepage diagram, as a mechanism rather than decoration |
| [`homepage-wireframe.md`](./homepage-wireframe.md) | Eleven sections with copy on frame |
| `../../app/tokens.css` | The implementation. Inert until imported |

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

**3. `--accent` moves from teal-500 to teal-700.** Teal-500 is 2.49:1 against white and is currently
used as text throughout the codebase. One re-point fixes every instance. Full reasoning and the
verified contrast table in `tokens.md` §1 and §2.

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

## Build order for Mira

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
