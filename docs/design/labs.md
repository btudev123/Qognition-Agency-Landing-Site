# Qognition Labs on the agency site

Owner: Elena (creative). Written 2026-09-28.
Depends on [`tokens-dark.md`](./tokens-dark.md) and [`products.md`](./products.md).
**Every line of copy on frame in this document is unreviewed until Ruth (`brand-guard`) clears it.**

---

## 1. What this section has to do

The site's problem is that it argues for AI search visibility without being able to show a single
publishable client result (`README.md`, decision 4 and gaps 8–10). Labs is the way out of that, and
it is a better way than a case study would be.

> We could not show you our clients' results. So we are showing you the instruments, the stored
> answers they run on, and the reason every number in them can be re-derived.

That is the section's whole job. It converts "AI-native" from an adjective into four things a
prospect can look at. It is the only proof on the site that does not require someone else's
permission to publish.

**What it is not.** It is not a product launch, it is not a pricing page for software, and it is not
a claim that the tools are available to buy. Nobody is being sold G.O.L.E.M. They are being shown
what their retainer is run on.

---

## 2. Where it lives

| Surface | Treatment |
|---|---|
| Homepage | One section, after the method/process section and before the final CTA. Four product cards plus one G.O.L.E.M frame. |
| `/labs` | The full page. One block per product, desktop and mobile frames, the data each screen shows, and the specimen rules stated openly. |
| `/geo`, `/ai-seo` | One G.O.L.E.M frame each, cropped to the component that page is about — the engine matrix on `/geo`, the fan-out tree on `/ai-seo`. Not the whole overview again. |
| `/audit` | The specimen snapshot already specified in `snapshot-result.md`. Labs does not duplicate it; it links to it once. |
| Nav | `Labs` as a top-level item. It is a differentiator, not a footer link. |

**Relationship to qognitionlabs.com.** The agency site presents Labs as a division and links out
exactly once, in the section footer. It never mirrors the Labs site's content, because two pages
saying the same thing on two domains is the thin-content pattern `CLAUDE.md` §7 exists to prevent.

`[NEEDS DATA: does qognitionlabs.com exist and ship today, what is on it, and is the link live? If
it does not exist, the outbound link is cut and the section stands alone. Do not link to a holding
page.]`

---

## 3. The status chip — the thing that makes "Shipped, not promised" survivable

The Labs strapline is *"Precision-engineered. Shipped, not promised."* It is a good line and it is
also a trap: the moment one of the four products is a roadmap item, the line is a claim we fail, on
the page where we are arguing that we do not overclaim.

So every product card carries a status chip, and the chip is the first thing under the name.

| Chip | Meaning | Treatment |
|---|---|---|
| `IN USE ON CLIENT ACCOUNTS` | Running against real client data today | `--d-accent` text, 1px `--d-accent` border, filled square glyph |
| `INTERNAL ONLY` | We run it, clients do not see it | `--d-text-muted`, `--d-rule-strong` border, half-filled square |
| `IN BUILD` | Not shipped | `--d-text-faint`, `--d-rule-strong` border, hollow square, plus the expected quarter in mono |

Mono, uppercase, `text-meta`, `0.08em`, radius `--radius-pill`.

**A product with an `IN BUILD` chip gets a card and no frame.** It is named, its purpose is stated,
and the screen is not shown, because showing a UI for something that does not run is the same
category of error as showing a metric that was not measured. When it ships, the frame appears.

This chip is what lets us use the strapline. It makes "shipped" a claim with a visible referent
rather than a mood.

`[NEEDS DATA: P1 in products.md §9 — which of the four is in which state. Blocking for /labs.]`

---

## 4. Homepage section — layout and copy on frame

Dark ground, `--d-bg`. Full-bleed. Section padding per `tokens.md` §4.

### Block 1 — the header

```
QOGNITION LABS                                        ← eyebrow, mono uppercase, --d-text-faint
                                                         with a 24px rule to its left, per the
                                                         existing Eyebrow primitive

We build the instruments                              ← h2, text-h2, weight 600, --d-text
we run your account with.                                "instruments" in --d-accent-display

Four tools, built in-house, running on the accounts   ← lede, text-body, --d-text-muted,
we manage. The reason we can tell you what an AI          max-w-measure
answered is that we kept the answer.

Precision-engineered. Shipped, not promised.          ← strapline, text-meta mono uppercase,
                                                         --d-text-faint, under a 1px rule
```

Layout: 12-col. Eyebrow + h2 in cols 1–5, lede in cols 7–12, bottom-aligned. That is the existing
asymmetric section-head pattern from `app/HomePage.tsx` and it should stay.

### Block 2 — the four cards

A 2×2 bordered lattice. Same construction as `FourSpokes` in `app/HomePage.tsx`: one shared 1px
`--d-rule-hairline` grid, `border-top` + `border-left` on the container, `border-right` +
`border-bottom` on each cell. Never per-card borders.

Each card, in this order:

| Element | Spec |
|---|---|
| Top row | Status chip (§3) left, index `01 / 04` mono right |
| Name | `text-h3`, weight 600, `--d-text`. G.O.L.E.M keeps its dots |
| Purpose | One line, `text-body`, `--d-text-muted`, max 2 lines at every width |
| Capabilities | Three bullets, `text-meta` mono uppercase, `--d-text-faint`, each with a 4px `--d-accent-graphic` square |
| Thumbnail | A **real crop of the product's own specimen frame**, 16:9, at the card's inner width, top-aligned to the card's lower edge and clipped. Not an icon. Not an illustration |
| Hover | Background to `--d-surface-3`, 140ms. Thumbnail opacity 0.8 → 1. Nothing else |

Card copy on frame:

```
01 / 04   G.O.L.E.M
          Tracks what AI engines answer about you, and keeps the answers.
          · 8 ENGINES, ONE MATRIX
          · EVERY METRIC TRACES TO A STORED ANSWER
          · MODEL VERSION RECORDED ON EVERY RUN

02 / 04   Scriblr
          Turns a buyer question we watched an engine miss into a page that answers it.
          · BRIEFS ANCHORED TO A REAL QUESTION
          · ENTITY COVERAGE CHECKED, NOT GUESSED
          · EVERY CLAIM NEEDS A SOURCE TO PASS

03 / 04   LinkersPro
          Finds the publications AI engines already cite, and tracks what we earn there.
          · PROSPECTS RANKED BY RELEVANCE AND AUTHORITY
          · KNOWS WHICH DOMAINS ENGINES ACTUALLY CITE
          · DECLINED AND NO-REPLY SHOWN, NOT HIDDEN

04 / 04   M.A.R.S
          Routes the work and the leads, and records which touch actually got the booking.
          · ROUTING BY DEPENDENCY, GATES LAST
          · ATTRIBUTION STORED DURABLY, NOT PER SESSION
          · SPEED-TO-LEAD MEASURED AGAINST A STATED TARGET
```

Every one of those bullets is checkable against the built screen. That is the test any replacement
copy has to pass.

### Block 3 — the G.O.L.E.M frame

One `FrameBrowser` (`products.md` §3.1) showing the **Overview** screen, with the specimen strip
inside the chrome. On ≥1280px a `FramePhone` overlaps its lower-right corner.

Above the frame, a single line, `text-meta`, `--d-text-faint`:

```
SPECIMEN DATA. NORTHWIND BROKERS IS NOT A REAL COMPANY. SEE "HOW TO READ THESE SCREENS" →
```

Below the frame, three short blocks in a 3-col row, each a sentence and a circular badge:

| Badge | Label | Sentence |
|---|---|---|
| `8` | `ENGINES` | "ChatGPT, Claude, Perplexity, Gemini, AI Overviews, Copilot, Grok and Mistral, measured on the same prompt set." |
| `100%` | `RE-DERIVABLE` | "Every number on this screen can be recomputed from the answers we stored, and the button that does it is on the screen." |
| `[NEEDS DATA]` | `ANSWERS STORED` | "A count of stored answers to date." **Cut this badge until the number exists.** |

**Badge rule, restated because it is the one most likely to be broken:** a circular badge contains a
count of things that exist. Not a multiple, not a "5x", not a projection. If there is no countable
fact, the badge is cut, not filled. The reference site's "10x quicker analysis" is exactly the badge
we are not making.

### Block 4 — the section CTA

Two actions, left-aligned, in a row:

- Primary: `See the archive screen` — a text link that scrolls to the Archive frame on `/labs`.
  **This is the right primary action and it is counter-intuitive.** The Archive is a table of run
  IDs and timestamps. It is the least glamorous screen and the most persuasive one, because it is
  the one nobody can fake and the one a sceptical buyer actually wants.
- Secondary: `Book a walkthrough` → the booking route.

Then, on its own line, `text-meta`: `Qognition Labs → qognitionlabs.com` (conditional on the NEEDS
DATA in §2).

---

## 5. `/labs` — the full page

### 5.1 Section order

1. **Hero.** `text-h1`, one sentence, no device. Sub-line naming the four products.
2. **How to read these screens.** Placed *above* the first frame, not in a footnote. See §5.2.
3. **G.O.L.E.M.** Overview frame, then Archive frame, then the data it shows in prose.
4. **Scriblr.** Brief frame, then the pipeline, in prose.
5. **LinkersPro.** Prospect graph frame, then the outreach pipeline.
6. **M.A.R.S.** Board frame, then the attribution path.
7. **How the four connect.** One diagram. See §5.3.
8. **What we will not claim.** See §5.4.
9. Final CTA.

### 5.2 "How to read these screens"

The trust asset of the page, and it goes first. Copy on frame:

```
HOW TO READ THESE SCREENS

These are the real interfaces, running on sample data.

The company in them, Northwind Brokers, does not exist. Neither do its competitors. Every
domain on these screens ends in .example, a suffix reserved so that it can never belong to
anyone.

The engines are real. ChatGPT, Claude, Perplexity, Gemini, AI Overviews, Copilot, Grok and
Mistral are the surfaces we measure, and naming them is a fact rather than a claim.

You will not see an AI answer on these screens. The live product stores every answer
verbatim, with the model version and the timestamp, and re-derives every metric from it. The
specimen shows the prompt, the conditions, the citations and the position, and withholds the
answer body, because we will not put words in a third party's mouth to sell you something.

The numbers are ordinary on purpose. Northwind is third of six and is missing from half the
engines. A demonstration where the customer wins everything is an advertisement with a grid
on it.
```

Five short paragraphs, `text-body`, `max-w-measure`, on `--d-surface-1` with a 2px `--d-accent` left
rule. It is the most persuasive copy in the section and it is entirely made of things we are
choosing not to do.

### 5.3 "How the four connect" — one diagram

An orthogonal-connector diagram, same drawing rules as the fan-out tree (`products.md` §4.2 Row D):
right angles, 1px `--d-rule-hairline`, no curves.

```
        G.O.L.E.M                      Scriblr                    LinkersPro
   watches the answers   ──gap──▶   writes the page   ──needs──▶  earns the citation
        │         ▲                        │                            │
        │         └────────── measures again ◀───────────────────────────┘
        │
        └──▶  M.A.R.S  ──▶  routes the work, and records which touch got the booking
```

Three labelled edges, each stating the actual hand-off:

| Edge | Label on frame |
|---|---|
| G.O.L.E.M → Scriblr | `A fan-out miss becomes a brief.` |
| Scriblr → LinkersPro | `A published page becomes something worth citing.` |
| Back to G.O.L.E.M | `Then we measure it again, on the same prompt set.` |

That loop is the argument for buying the retainer rather than the tools, and it is the one thing on
the page that four separate screenshots cannot say.

### 5.4 "What we will not claim"

Short, five lines, `text-body`, on `--d-surface-1`. Drawn directly from `CLAUDE.md` §4, so it is
checkable against the rest of the site.

```
WHAT THESE TOOLS DO NOT DO

They do not guarantee a ranking, a citation or a placement in any AI system. We do not
control those systems.

They do not predict what an engine will say next. A measurement is an observation on a date,
with a platform, a prompt set and stated limits.

They do not turn a readiness score into a promise. Scriblr's rubric scores our draft. It
says nothing about the outcome.

They do not show causation. LinkersPro's timeline shows the order things happened in, which
is not the same claim.

They do not fill a gap with a placeholder. Where we have not measured something, the screen
says "not checked", which is a different fact from "not found".
```

A list of self-imposed limits is the one form of self-description a reader cannot dismiss as
puffery. It is the same device as the manifesto on `/about` (`components.md` D10) and the two should
not repeat each other's lines — `[NEEDS DATA: decision on whether this block and the /about
manifesto are merged into one canonical list rendered in two places, which is what I would do.]`

---

## 6. Mobile

Full treatment in `mobile.md`. Section-specific:

- Header block stacks: eyebrow, h2, lede, strapline. h2 at `text-h2` bottom of its clamp.
- **The 2×2 card lattice becomes a 1-col stack, not a horizontal scroll and not a carousel.**
  Each card keeps its thumbnail at 16:9 full width. The lattice becomes `border-top` on each card
  with `border-bottom` on the last — a rule-separated list, which is what the existing
  `.growth-pillar` mobile treatment already does correctly.
- **The `FrameBrowser` is replaced by `FramePhone` showing the mobile design of the same screen.**
  Not a shrunk desktop frame. A 1440px UI at 350px is illegible and shipping it would undercut the
  section's entire argument about honesty.
- The three badge blocks stack to a 1-col list, badges at 72px, sentence beside each rather than
  beneath.
- "How to read these screens" stays in full. It is not truncated behind a disclosure. It is the
  reason the section works.
- Section CTA becomes two full-width stacked buttons, primary first, 48px tall.

---

## 7. What Mira builds

```
components/labs/LabsSection.tsx          homepage section
components/labs/ProductCard.tsx          status chip, name, purpose, bullets, thumbnail crop
components/labs/StatusChip.tsx           the three states in §3
components/labs/HowToRead.tsx            §5.2, used on /labs and linked from the homepage
components/labs/ConnectionDiagram.tsx    §5.3, SVG, orthogonal connectors, aria-described
components/labs/BadgeStat.tsx            circular badge, count only, cuts itself if value is null
app/labs/page.tsx
```

`BadgeStat` **returns null when its value is null.** Not a dash, not a zero, not a skeleton. Same
rule as `EvidenceStrip` and `ProofSlot` in the previous pass: a section with no evidence is a
section that is not on the page.

---

## 8. NEEDS DATA

Items P1–P10 in `products.md` §9 all apply. In addition:

| # | What | Blocks |
|---|---|---|
| B1 | Does qognitionlabs.com exist and ship today, and what is on it | The outbound link, and whether Labs reads as a division or an aspiration |
| B2 | A count of stored answers to date | The third circular badge. Cut until it exists |
| B3 | Decision on merging this page's "What we will not claim" with the `/about` manifesto | Duplication risk across two indexable pages |
| B4 | Whether `Labs` goes in the top-level nav, which costs a slot | Nav IA |
| B5 | Ruth's review of every line of copy on frame in §4 and §5 | **Nothing here is final without it** |
