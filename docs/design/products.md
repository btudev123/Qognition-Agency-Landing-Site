# Product interfaces — G.O.L.E.M, Scriblr, LinkersPro, M.A.R.S

Owner: Elena (creative). Written 2026-09-28.
Depends on [`tokens.md`](./tokens.md) and [`tokens-dark.md`](./tokens-dark.md). Read those first.
Built by Mira as real responsive React, then shown inside device frames on `/` and `/labs`. They are
not images.

**The four names are locked:** G.O.L.E.M (AI visibility tracking) · Scriblr (content production for
AI citation) · **LinkersPro** (AI backlink generation) · M.A.R.S (multi-agent routing, lead routing
and attribution).

An earlier draft of this file called the backlink product *Linkdex*. That was a real third-party SEO
platform brand and carried an unchecked trademark question. **LinkersPro** is the settled name, it
already appears in 38 strings across `data/case-studies/*.ts` as "LinkersPro for earned mention
acquisition", and using it means no content migration. Nothing about the product's role changed.

**These screens sit inside the existing qognitionagency.com visual language, not beside it.** Dark
ground, huge display type, teal accents, bordered card lattices with mono uppercase labels. The
mapping from what is already in the repo to what is specified here is in `tokens-dark.md` §0.2.

---

## 1. The decision everything else follows from

**A metric is an activator that opens the evidence that produced it.**

G.O.L.E.M persists raw answers, cited URLs and model versions, so every number can be re-derived
from a stored answer with a date on it. That is the product's argument and the agency's positioning
in the same sentence. The interface has to make it visible rather than claim it, and there are five
mechanisms that do that. They apply to every screen in every product.

### 1.1 The provenance line

Every metric carries a one-line provenance footer, always visible, never a tooltip, `text-meta` in
mono at `--d-text-faint`:

```
n=384 answers · 8 engines · 16 Aug–12 Sep 2026 · recomputed 12 Sep 09:14 UTC
```

A number without a provenance line is a defect, not a style variation. This is the single highest
-value thing in the whole design and it costs one line of layout.

### 1.2 The Answer Drawer

Every metric, every matrix cell, every bar, every node opens the same drawer. 520px on desktop,
full-height sheet on mobile. Contents, in this order:

| Block | Content |
|---|---|
| Header | `RUN 0f3a91c2` in mono, and a close button. The run ID is selectable text |
| Prompt | Verbatim, mono, `text-body`, on `--d-surface-2`, with a copy button |
| Conditions | Engine · model version string · timestamp with timezone · locale · region · logged-out/logged-in |
| Answer | The stored answer body. **In the specimen this slot is structurally absent — see §2.3** |
| Citations | Every cited URL, in mono, in the order the engine returned them, with the subject domain marked by a 2px `--d-accent` left rule and a `You` chip. Position index shown for each |
| Derivation | One prose sentence: "This run contributes 1 of 384 to the score above, and is counted as *present* because citation 3 resolves to northwind.example." |
| Actions | `Copy run ID` · `Export JSON` · `Re-derive this metric` |

### 1.3 The derivation disclosure

Under every headline metric, a closed `<details>` labelled `HOW THIS IS CALCULATED`. Open, it holds
one sentence of prose and nothing else:

> Visibility score is the share of the 384 stored answers in this window whose citation list
> contains a northwind.example URL. Answers that did not return are excluded from the denominator
> and counted separately.

Not a formula, not a modal, not a help-centre link. One sentence, on the page.

### 1.4 `Re-derive from stored answers`

A real control, in the drawer and on the Archive screen. It recomputes the metric against the stored
archive and renders the same value with a new `recomputed` timestamp. Auditability made operable
rather than asserted. When it is running, the metric does not blank; it dims to `--d-text-muted` and
shows `recomputing` beside it.

### 1.5 Null is not zero

In the type, not the styling:

```ts
score: number | null   // null = never measured. Renders "Not measured", never "0".
```

A 0% visibility score and an unmeasured brand look identical in every competitor's product and they
are completely different facts. `null` renders the **empty state** (§3.5), which names what is
missing and offers the action that fixes it.

---

## 2. The specimen system — how these screens cannot become the next AICitationSimulator

`components/interactive/AICitationSimulator.tsx` is the counter-example and it is worth being exact
about what it does wrong, because "be careful" is not a defence.

It types a query, shows a thinking animation, then renders **a fabricated AI answer that places
Qognition first**, sourced to invented `g2.com/agencies` and `crunchbase.com` citations. Three
separate failures: a fabricated third-party answer, fabricated citations, and the subject of the
fabrication being us. It is a deletion, not a fix (`OPERATOR-DECISIONS.md`, claims defects).

Six structural defences. Not guidelines — four of them are enforceable in code.

### 2.1 The subject is a named fiction on a reserved TLD

One dataset, `data/specimen/`, one subject brand, and every domain in it ends in `.example`, which
RFC 2606 reserves permanently and which can never be registered by anyone.

```
Subject:      Northwind Brokers        northwind.example
Competitors:  Castellan Risk           castellan.example
              Harborline Underwriting  harborline.example
              Ridgeway Group           ridgeway.example
              Pemberton Cole           pemberton.example
Publishers:   insurancejournal.example · riskbulletin.example · statedoi.example
```

No real company is named, no real domain appears, and the impossibility is structural rather than
editorial. Engine names — ChatGPT, Claude, Perplexity, Gemini, AI Overviews, Copilot, Grok, Mistral
— stay real, because naming the surfaces we measure is a fact, not a claim.

### 2.2 The label is inside the frame, not around it

`SpecimenFrame` renders a persistent, non-dismissible strip **inside** the device chrome, above the
product UI:

```
SPECIMEN INTERFACE · SAMPLE DATA · NOT A CLIENT RESULT
```

Mono, uppercase, `text-meta`, `0.08em`, `--d-text-faint` on `--d-surface-2`, full width, 28px tall,
with a 4px diagonal hatch (`.d-hatch`) running down the outer 8px of the frame on all four sides.

The reason it is inside: **a screenshot of this screen must carry its own disclaimer.** A caption
under the frame is lost the moment someone crops it into a deck. Ours cannot be cropped off without
cropping the product UI too.

### 2.3 There is no slot that can render a fabricated answer

The strongest of the six. `AnswerBody` takes a discriminated union:

```ts
type AnswerBody =
  | { kind: 'stored';    text: string; runId: string; storedAt: string }
  | { kind: 'withheld';  reason: 'specimen' };
```

The specimen dataset can only produce `{ kind: 'withheld' }`, which renders a fixed-height hatched
block reading:

> **Answer body withheld in the specimen.** The live product stores it verbatim, with the model
> version and timestamp, and re-derives every metric from it.

The specimen still shows the prompt (ours, real), the engine, the model version, the timestamp, the
citation list and the extracted position. Everything the product actually measures. The one thing it
cannot show is a third party's words, which is the one thing nobody may invent. **The component has
no code path that renders invented answer text.** That is not a policy, it is the type.

### 2.4 The specimen is never about Qognition

Hard rule. The simulator's worst move was fabricating a result that favoured us. The specimen
subject is a fictional insurance broker, matching the flagship vertical in `CLAUDE.md` §2, and it is
never the agency. Qognition appears nowhere in the data.

### 2.5 The specimen reads as measured, not as won

The subject brand's specimen numbers are deliberately mid-table: visibility 38.2%, rank 3 of 6,
present on 4 of 8 engines, two fan-out misses shown as misses. A specimen where the subject wins
everything is an advertisement wearing a dashboard. A specimen showing an ordinary account with
visible gaps is the honest demonstration and it is also the better sales argument, because the gaps
are what we are selling the fix for.

### 2.6 A build gate

`scripts/check-specimen.cjs`, added to the gate chain before `next build` alongside the existing
`audit-headings`, `test-growth` and `check-publication`. It fails the build if:

1. Any string literal in `data/specimen/**` matches `\.(com|net|org|io|ai|co|co\.uk|g2|crunchbase)\b`.
2. Any file under `components/products/**` contains a string literal longer than 120 characters
   assigned to a key matching `/answer|response|completion|output/i`.
3. `data/specimen/**` contains the string `qognition` in any case.
4. Any component under `components/products/**` renders outside a `SpecimenFrame` on a route in
   `app/` other than an authenticated product route.

Rule 2 is the one that would have caught `AICitationSimulator.tsx`. Owen owns this gate.

---

## 3. The shared product UI system

All four products are one interface with four datasets. Build the shell once.

### 3.1 Device frames

Two, both `--d-elev-frame`, both on `--d-bg`, radius 12, 1px `--d-rule-hairline`.

**`FrameBrowser`** — content 1440×900 rendered at whatever scale the section gives it.
- Chrome bar 44px, `--d-surface-2`, bottom rule `--d-rule-hairline`.
- Three 10px dots at `--d-text-faint`, 8px apart. **Not traffic-light colours.** Red/amber/green dots
  are a macOS costume; three neutral dots read as a window without the impersonation.
- A URL pill, `--d-surface-1`, radius 4, mono `text-meta`, `--d-text-faint`:
  `golem.qognitionlabs.example/northwind/overview`. Reserved TLD here too.
- Then the specimen strip (§2.2), then the product UI.

**`FramePhone`** — content 390×844.
- Device radius 28, screen radius 20, 4px bezel in `--d-surface-2`.
- **No drawn notch, no drawn island, no drawn buttons.** Every one of those dates the asset to a
  hardware generation, and a design that has to be re-drawn when Apple changes a cutout is a
  liability.
- Status bar 44px: time `09:41` left, three neutral glyphs right, all `--d-text-faint`.
- Then the specimen strip at 24px, then the product UI.

Frames sit on the page at:

| Viewport | Treatment |
|---|---|
| ≥1280px | `FrameBrowser` at 1100px wide, and `FramePhone` at 300px overlapping its lower-right corner by 15%, offset 40px down |
| 1024–1279 | `FrameBrowser` at 100% of the container. Phone frame drops |
| 768–1023 | `FrameBrowser` at 100%, chrome bar shrinks to 36px |
| <768px | **`FramePhone` only, at 100% of the gutter width.** The browser frame is not shrunk; it is replaced by the mobile design of the same screen. See `mobile.md` |

### 3.2 Layout skeleton

Shared by all four products.

```
┌──┬────────────────────────────────────────────────┬─────────────┐
│  │ top bar 56px                                    │             │
│64├────────────────────────────────────────────────┤  drawer     │
│px│                                                 │  520px      │
│  │ content — 12 col, 24px gutter, max 1280         │  (overlay   │
│  │                                                 │   ≤1280)    │
└──┴────────────────────────────────────────────────┴─────────────┘
```

- **Left rail 64px.** Product mark at top (the `QMark` at 20px, `--d-accent`), then 5–6 nav glyphs at
  40×40 with 44×44 hit areas, `--d-text-faint`, active is `--d-accent` with a 2px left rule. Each
  glyph has a visible label on hover *and* an `aria-label`. Below 1024 the rail becomes a 56px
  bottom bar with labels under the glyphs.
- **Top bar 56px**, `--d-surface-1`, bottom rule `--d-rule`. Left: breadcrumb, mono uppercase
  `text-meta`. Right: date-range control, run-set selector, and an `EVIDENCE` toggle that pins the
  provenance lines open across the whole screen.
- **Content** on `--d-bg`. Cards are `--d-surface-1` with `--d-rule-hairline`, radius 8.
- **Drawer** `--d-surface-2`, `--d-elev-overlay`, left rule `--d-rule`. Focus is trapped while open,
  `Esc` closes, focus returns to the activator that opened it.

### 3.3 Type inside a product UI

The scale in `tokens.md` §3 is unchanged and `scripts/audit-headings.mjs` still applies. No new size
token. An earlier draft of that file rejected a `text-data` token and the rejection holds.

| Role | Token |
|---|---|
| Hero metric value | `text-h2`, weight 500, `font-variant-numeric: tabular-nums` |
| Card metric value | `text-h3`, weight 500, tabular |
| Table value | `text-body leading-snug`, weight 500 |
| Table header, label, chip, provenance | `text-meta`, uppercase, `0.08em` |
| Prose inside a product | `text-body` |

**Mono is extended inside the product, and the extension is stated so it stays scarce elsewhere.**
On the marketing site, `tokens.md` §3 permits mono for prompts, domains, timestamps, versions and
positions. Inside a product UI it additionally covers: run IDs, measured percentages, counts, deltas,
durations, locales, and lane counts. It still does not cover headings, prose, button labels or
decoration. The test is unchanged: mono means a machine recorded this.

### 3.4 Charting rules

- **Sampled series are drawn as points on a line with visible dots at each sample, never as a
  spline.** A smooth curve between two weekly samples asserts knowledge of the six days in between
  that we do not have. This is the single most common way a measurement product lies by accident.
- Y axes start at zero unless the axis is explicitly labelled as truncated, in which case the label
  says so in words.
- Every chart has a provenance line (§1.1). No exceptions.
- Every chart reads correctly with colour removed. See `tokens-dark.md` §5.
- No 3D, no donuts with a number in the middle other than the circular badge (§4.2 row A), no area
  fills under a sampled line.
- Axis and grid lines `--d-rule-hairline`. Axis labels `--d-text-faint`.

### 3.5 The five states

Defined once here. Per-component deltas are noted in each product section.

**1. Empty.** No run set exists. Not zero, not a dash, not a skeleton left forever. Shows: the metric
name, the sentence from the derivation disclosure explaining what it *would* measure, and one
primary action `Run first measurement`. Icon-free. The empty state is where a product earns trust,
so it gets real sentences.

**2. Loading.** Skeleton blocks at `--d-surface-2` in the exact geometry of the loaded content, so
nothing moves when data arrives. **No shimmer sweep** — a travelling highlight is decorative motion
that fires on every load. One 1.2s opacity pulse, 0.5 → 0.8, and a mono line stating what is
happening with a real number in it: `Reading 384 stored answers`.

**3. Partial.** Mandatory, and the honest one. Some engines returned, some did not; some prompts ran,
some were rate-limited. The screen renders what it has and states what it does not, at the top of the
affected component, in `text-meta`:
`4 of 8 engines returned in this window. Copilot, Grok, Mistral and Claude: not checked.`
Unreturned cells use the `Not checked` hatch from `tokens-dark.md` §6. **They are never rendered as
zero, absent or "not found".** "Not found" and "not checked" are different facts and conflating them
is the failure this whole product exists to correct.

**4. Populated.** The normal state.

**5. Error.** The run failed. Shows what failed, when, the run ID, and the retry action. Critically:
**a failed refresh never leaves a stale number looking current.** The previous value stays visible,
drops to `--d-text-muted`, and gains a `Last measured 12 Sep` badge plus the `↺ 4d old` stale
treatment. Showing the old number as if it were new is the worse failure of the two.

### 3.6 Accessibility, carried forward

The three findings from the previous pass, and their current status:

- **`--accent` `#14B8A6` at 2.49:1 used as text and as the sitewide focus ring — FIXED.**
  `globals.css` now uses `--accent-deep #0F766E` at 5.47:1, and `CLAUDE.md` §9 records that
  `--accent` is never a focus ring and never text. On dark surfaces the ring inverts to white,
  because teal-700 is 2.87:1 there and fails. See `tokens-dark.md` §0.1 and §4.
- **`Button` primary at 2.20:1 — OPEN.** `components/ui/Button.tsx` still ships
  `bg-[var(--accent)] text-[var(--accent-deep)]`, which is teal-500 on teal-700. Fix before any
  product UI reuses it. On dark the correct pairing is ink on teal-400, 10.64:1 — **not** white on
  teal, which is 1.59:1 and is the easy mistake here.
- **`Input` has no visible focus indicator — OPEN.** `focus:outline-none` with a 20%-opacity ring.
  Remove the `outline-none` and let the global rule apply. Every control inside a product frame
  inherits the 2px / 2px ring.

Product-specific additions:

- Every matrix cell is a `<button>` with an accessible name that states the fact, not the position:
  `ChatGPT, insurance placement prompts, position 3, opens evidence`.
- Every chart has a `<table>` equivalent, visually hidden, containing the same numbers. Not an alt
  text summary — the actual values.
- The drawer traps focus, closes on `Esc`, returns focus to its activator.
- Colour is never the only carrier. Every state has a glyph and a word.
- All targets ≥44×44 with ≥8px separation, including matrix cells. That sets the matrix row height
  at 48px minimum and is a layout constraint, not a nicety.

---

## 4. G.O.L.E.M — AI visibility, with the answers kept

> **Positioning line on frame:** "Every number here was derived from an answer we still have."

Nav rail: `Overview · Engines · Competitors · Citations · Fan-out · Archive`.

Two screens are designed for the marketing site: **Overview**, because it is the product, and
**Archive**, because it is the argument.

### 4.1 Data shape

```ts
type EngineId = 'chatgpt' | 'claude' | 'perplexity' | 'gemini'
              | 'ai-overviews' | 'copilot' | 'grok' | 'mistral';

type CellState = 'present' | 'not-found' | 'not-checked' | 'error';

interface Run {
  runId: string;              // 'r_0f3a91c2'
  promptId: string;           // 'p03'
  promptText: string;         // verbatim, ours
  engine: EngineId;
  modelVersion: string;       // 'gpt-5.2-2026-07-11' — recorded, never inferred
  ranAt: string;              // ISO 8601 with offset
  locale: string;             // 'en-US'
  region: string;             // 'US-TX'
  session: 'logged-out' | 'logged-in';
  answer: AnswerBody;         // §2.3 — 'stored' | 'withheld'
  citations: Citation[];      // in the order the engine returned them
  subjectPosition: number | null;   // null = not cited
  state: CellState;
}

interface Citation {
  index: number;
  url: string;
  domain: string;
  category: 'owned' | 'competitor' | 'social' | 'google' | 'institutional' | 'other';
  isSubject: boolean;
}

interface Metric {
  value: number | null;       // null = never measured. §1.5
  unit: '%' | 'pts' | 'count';
  runSetId: string;           // no runSetId, no render
  n: number;
  windowStart: string;
  windowEnd: string;
  recomputedAt: string;
  derivation: string;         // one prose sentence, rendered verbatim in §1.3
  staleDays: number;
}

interface FanoutNode {
  rewrite: string;            // the search the engine actually issued
  engine: EngineId;
  outcome: 'cited' | 'not-cited' | 'competitor-cited' | 'no-sources';
  citedDomains: string[];
  gapQuestion: string | null; // the question we have no page for
}
```

`Metric.runSetId` being required is the type-level version of §1.5. A metric literally cannot be
constructed without pointing at the runs it came from.

### 4.2 Overview — desktop, 1440

**Row A — the headline band.** Three cards, `--d-surface-1`, in a 12-col grid.

*Cols 1–5, Visibility score.* The largest thing on the screen.
- Label, mono uppercase `text-meta` `--d-text-faint`: `VISIBILITY SCORE`
- Value `38.2` at `text-h2`, weight 500, tabular, `--d-text`. Unit `%` at `text-h3`,
  `--d-text-muted`, baseline-aligned.
- Sparkline 240×48 beneath. `--d-accent-graphic` stroke 2, **with a 3px dot at every sample**, on a
  1px `--d-rule-hairline` baseline. Eight samples across the window. Points, not a spline (§3.4).
  Each dot is a 24×24 hit area opening the drawer filtered to that run set.
- Provenance line (§1.1).
- `HOW THIS IS CALCULATED` disclosure (§1.3), closed.
- The card as a whole is not clickable; its parts are. A card-wide click target with clickable
  children inside it is a mis-click generator.

*Cols 6–8, Trend.*
- `+4.1` at `text-h3`, `--d-accent`, with `pts` in `--d-text-muted`.
- Below: `vs 19 Jul–15 Aug 2026`, mono, `--d-text-faint`. **The comparison window is stated, always.**
  A delta with an unnamed baseline is not a measurement.
- `CountUp` fires here, once, and nowhere else on the screen. See `motion.md`.

*Cols 9–12, Coverage badge.* The circular badge device from the reference, used honestly.
- 96px ring, 6px stroke, track `--d-rule-hairline`, arc `--d-accent-graphic`, arc length = 6/8.
- Centre: `6/8` at `text-h3` tabular. Label beneath: `ENGINES RETURNING`.
- **The badge contains a count of things that exist.** Not "5x more data sources", not "10x quicker".
  If a badge has no countable fact behind it, the badge is cut, not filled. That rule applies to every
  circular badge on the site.

**Row B — the engine matrix.** The signature component.

8 rows × N prompt-group columns. Row height 48px minimum (§3.6).

- Row header, 200px: engine name at `text-body` weight 500, and **underneath it the model version
  string in mono `text-meta` at `--d-text-faint`**: `gpt-5.2-2026-07-11`.
  Nobody else shows this. It is the most persuasive 13px on the site, because it is the thing you can
  only display if you actually stored it.
- Column headers: prompt group name, mono uppercase, plus `n=` per column.
- Cells per `tokens-dark.md` §6: present / not found / not checked / stale, each with fill, glyph and
  word. Present cells carry the fact in mono: `Pos 3`.
- Every cell is a button → drawer.
- Grid drawn as one shared 1px lattice (`tokens-dark.md` §4), never per-cell borders.
- Hover: cell background to `--d-surface-3`, 140ms, and the row and column headers both brighten to
  `--d-text`. Cross-highlighting the headers is what makes a matrix readable at this density.

**Row C left, cols 1–6 — Competitor share of voice.**

- Horizontal bars, 6 rows maximum, row 7+ collapsed into `Other (4 brands)`.
- Sorted by share, descending. Colour by rank per `tokens-dark.md` §5.
- **The subject row is always rendered, always in `--d-series-1` teal, always with a `YOU` chip and a
  2px `--d-accent` left rule — even when it is last.** A leaderboard that only shows you when you are
  winning is a marketing graphic.
- Value in mono at the bar end: `24.1%`, and `n=` per row.
- Tie-break rule stated in the provenance line: `ties broken alphabetically by domain`.

**Row C right, cols 7–12 — Citation sources by category.**

- A single 100%-width stacked bar, 24px tall, six segments: Owned, Competitor, Social, Google
  properties, Institutional, Other.
- Beneath it a legend table: category · count · share · top three domains in mono.
- Each domain row is an activator → drawer filtered to answers citing that domain.
- **Owned is `--d-accent`; every other category is a neutral step of the `--d-surface` ramp plus its
  label.** Using five bright colours here would compete with the leaderboard, which is the chart that
  needs colour. One chart per screen gets the colour budget.

**Row D — the query fan-out tree.** Full width.

The engine rewrites a prompt into several searches before answering. Showing those rewrites is the
most concrete thing G.O.L.E.M has, because it turns "AI visibility" from an abstraction into a list
of specific searches with specific outcomes.

- Two levels. Root = the prompt, verbatim, mono, `text-body`. Children = 4–8 rewrites, mono.
- Connectors are **orthogonal — right angles only, 1px `--d-rule-hairline`**. Never bezier curves.
  Right angles read as a data structure; curves read as decoration, and this diagram is evidence.
- Each rewrite carries an outcome chip: `CITED` (teal, filled square) · `NOT CITED` (muted, hollow) ·
  `COMPETITOR CITED` (muted, hollow, plus the competitor domain in mono) · `NO SOURCES` (hatch).
- **Under every miss, the content gap is named:**
  `No page answers: "how does surplus lines placement work in Texas"` — with a `Send to Scriblr`
  action. That hand-off is the reason the four products are one system rather than four screenshots.
- Wins get a 2px `--d-accent` left rule on the chip. Misses get `--d-text-faint` and a hollow glyph.

### 4.3 Archive — the screen that settles arguments

A table, and it should look like one.

| Column | Treatment |
|---|---|
| Run ID | mono, selectable |
| Ran at | mono, ISO with offset |
| Engine | text |
| Model version | mono — the column that makes the point |
| Prompt | mono, truncated at 1 line with the full text in the drawer |
| Locale / region | mono |
| Answer | `2.4 KB stored` in the product; `withheld` with the hatch in the specimen |
| Citations | count, mono |
| Position | mono or `—` |
| | `Re-derive` action |

- Zebra rows at `--d-surface-1`, header row `--d-surface-2` sticky.
- Filter bar above: engine, date range, prompt, outcome. Filters are reflected in the URL so a
  filtered view is linkable. A view you cannot send to someone is not evidence.
- Footer: `384 runs · 2.1 MB of stored answers · oldest 16 Aug 2026 · retention 24 months`.
  `[NEEDS DATA: actual retention policy]`

This screen is the second frame in the Labs section (`labs.md` §4) and it does more work there than
the Overview does.

### 4.4 What animates, and how

Full choreography in `motion.md`. For this screen specifically:

| Element | Motion | Trigger | Duration |
|---|---|---|---|
| Frame | `ScrollReveal`, opacity 0→1 + translateY 8→0 | first entry, once | 200ms |
| Sparkline | Path draws left to right via `stroke-dashoffset`; the 8 dots fade in after | frame reveal + 120ms | 320ms path, dots 120ms |
| Trend value | `CountUp` from 0 | with the sparkline | 320ms |
| Coverage badge arc | Arc sweeps from 0 to 6/8 | with the sparkline | 320ms |
| Matrix cells | Opacity 0→1 in **three stagger groups**, 40ms step — by row band, not per cell | frame reveal + 200ms | 200ms each |
| Everything else | Nothing | | |

**No typing animation. No auto-cycling prompts. No thinking dots. No fake latency.** Those are the
devices `AICitationSimulator` used to make a fabrication feel live, and they are banned from every
product frame on this site. A product screen that animates itself into looking busy is claiming
activity it is not performing.

`prefers-reduced-motion`: the sparkline renders drawn, the badge renders at its final arc, the trend
renders at its final value, the cells render visible. Nothing moves. Nothing is missing.

### 4.5 Mobile, 390

Full section-by-section treatment in `mobile.md`. The structure:

- **Score card** full width. Value at `text-h3` (not `text-h2` — 40px+ numerals crowd a 390px
  column), sparkline 100%×56, provenance line wrapping to two lines, disclosure closed.
- **Trend and coverage badge** side by side, 50/50. Badge drops to 72px.
- **Engine matrix becomes 8 stacked cards.** One card per engine: engine name, model version in
  mono, then the prompt-group cells as a 2-column grid of chips. **The matrix is not horizontally
  scrolled.** A horizontally scrolled table hides half the data behind an affordance most people do
  not find, and this table's whole point is that you can see all of it.
- **Leaderboard** bars full width, stacked, subject row pinned to the top *and* shown in rank
  position, with the pinned copy labelled `YOU · RANK 3`.
- **Citations** stacked bar full width; legend becomes a definition list.
- **Fan-out** becomes an indented list, max depth 2, with a 1px `--d-rule-hairline` left rule per
  level. Connectors drop; indentation carries the structure.
- **Drawer** becomes a bottom sheet at 92vh with a drag handle **and** a close button. Never
  drag-only.
- Five states unchanged. Partial state's sentence wraps rather than truncating.

---

## 5. Scriblr — content production for AI citation

> **Positioning line on frame:** "The rubric scores this draft. It does not predict the outcome."

Nav rail: `Questions · Briefs · Drafts · Published · Coverage`.

### 5.1 The honesty device for this product

A "citation-readiness score" is one word away from a promise of citation, which `CLAUDE.md` §4
forbids. The fix is on the frame, not in a footnote. The score's label is:

```
READINESS RUBRIC · SCORES THIS DRAFT, NOT THE OUTCOME
```

and each of its five sub-scores names the rule it checks, so the number is visibly a checklist result
about our own document rather than a forecast about someone else's system.

### 5.2 Data shape

```ts
interface Brief {
  questionId: string;
  question: string;             // verbatim buyer question
  provenance: {
    source: 'golem-fanout' | 'sales-call' | 'support-ticket' | 'manual';
    runIds: string[];           // links back to G.O.L.E.M
    observedAt: string;
    engines: EngineId[];
  };
  entities: EntityRequirement[];
  readiness: ReadinessScore;
  stage: 'question' | 'brief' | 'draft' | 'review' | 'published' | 'measured';
}

interface EntityRequirement {
  name: string;
  type: 'organisation' | 'standard' | 'product' | 'place' | 'role' | 'regulation';
  necessity: 'required' | 'recommended';
  status: 'covered' | 'missing' | 'ambiguous';
  coveringSentence: string | null;
}

interface ReadinessScore {
  total: number;                // 0–100, sum of the five below
  parts: {
    directAnswer: number;       // answer present in the first 120 words
    entityCoverage: number;     // required entities covered
    claimSourcing: number;      // every number has a cited source
    extractability: number;     // heading is a question, answer is one paragraph
    freshness: number;          // named reviewer and review date present
  };
}
```

`claimSourcing` is the sub-score that matters most, because it is the same rule
`CLAUDE.md` §4 imposes on us. The tool we sell enforces on clients the discipline we hold ourselves
to, and that is worth saying on the frame.

### 5.3 Brief screen — desktop, 1440

**Cols 1–3, The question.**
- Verbatim, mono, `text-h4`, on `--d-surface-2`, with a 2px `--d-accent` left rule.
- Under it, provenance: `From 3 fan-out misses · ChatGPT, Perplexity · 12 Sep 2026` with the run IDs
  as activators opening the G.O.L.E.M drawer. **A brief that cannot name why it exists is a content
  calendar entry.**
- Under that, the competing pages currently answering this question, by domain, in mono, from the
  same runs.

**Cols 4–8, Entity coverage checklist.**
- Rows: glyph · entity name · type chip · necessity chip · status.
- Three statuses, and `ambiguous` is the interesting one: the entity appears but is not
  disambiguated (a bare "Lloyd's" with no qualifier, a product name that collides). Rendered with
  the `Not checked` hatch plus the word `Ambiguous`, because it is genuinely a third state.
- Each row expands to show the covering sentence from the draft, verbatim, or the empty state.
- Group header per type, with counts: `STANDARDS · 2 of 4 covered`.

**Cols 9–12, Readiness rubric.**
- Circular badge, 96px, total out of 100, `--d-accent-graphic` arc.
- The five sub-scores as a small horizontal bar stack beneath, each labelled with its rule in
  `text-meta`, each with its own value in mono.
- The label from §5.1 sits directly under the badge, not at the bottom of the card.

**Full-width band, the pipeline.**
- Six lanes: Question → Brief → Draft → Review → Published → **Measured**.
- Lane header: name, count, median days in lane, all mono.
- Cards: question truncated to two lines, owner as an initials chip (no avatars — avatars in a
  specimen are invented people), date.
- **The Measured lane links back to G.O.L.E.M and states the gap honestly:**
  `0 of 4 published pages have a post-publication run.` A content tool whose last lane is "Published"
  is a content tool that never learns whether it worked. This lane is the system's integrity and it
  should be uncomfortable when it is empty.

### 5.4 States

Per §3.5, with two deltas:
- **Empty** is per-lane. An empty Draft lane says `No drafts. Briefs move here when an owner is
  assigned.` and offers the action.
- **Partial** applies to the rubric: if the draft has not been parsed, sub-scores render `Not
  checked` individually rather than the total rendering 0.

### 5.5 Mobile, 390

- Single column, in the order above.
- The question card is full-bleed to the gutters, since it is the anchor.
- Readiness badge drops to 72px and moves directly under the question.
- Entity checklist becomes a disclosure list, grouped by type, collapsed by default with counts in
  the summary. `2 of 4 covered` in the summary line so the state is readable without opening.
- **The pipeline becomes a vertical stepper with counts, not a horizontal kanban.** A kanban at
  390px is six columns of nothing.

---

## 6. LinkersPro — AI backlink generation

> **Positioning line on frame:** "We find and track. We do not place."

Nav rail: `Prospects · Graph · Outreach · Earned · Sources`.

### 6.1 The honesty devices for this product

Two, and both are load-bearing because "AI backlink generation" is a phrase that can read as link
buying.

1. **The product does not claim to place links.** Its lanes end in `Published` or `Declined / No
   reply`, both visible. There is no "guaranteed placements" number anywhere.
2. **The timeline is labelled `SEQUENCE, NOT CAUSATION`.** A chart with earned mentions on one track
   and visibility runs on another is a causal claim unless it says otherwise. It says otherwise, on
   the frame, in `text-meta`.

### 6.2 Prospect graph — the layout decision

**Concentric rings, deterministic. Not a force simulation.**

A force-directed graph settles differently on every load, so the same data produces a different
picture each time, which means it cannot be re-derived — and re-derivability is this company's whole
argument. It also jiggles, which is decorative motion with a CPU cost.

- Centre: subject brand.
- Ring 1: domains already citing you, in G.O.L.E.M answers.
- Ring 2: domains citing your competitors but not you. **The opportunity ring, and the reason the
  product exists.**
- Ring 3: topically relevant, citing neither.
- Position within a ring: by angle, sorted by authority, clockwise from 12 o'clock. Deterministic.

Encodings, every one of which appears in a mandatory legend:

| Channel | Meaning |
|---|---|
| Ring | Citation relationship (above) |
| Node size | Referring domains. Four fixed steps, not continuous — continuous area is unreadable |
| Node fill | Ring membership, using the surface ramp, not the series palette |
| **Node stroke, 2px `--d-accent`** | **This domain has appeared in a G.O.L.E.M answer's citation list** |

That last encoding is the cross-product argument in one visual channel: the graph knows which domains
AI engines actually cite, because another product of ours recorded it.

### 6.3 Relevance × authority scatter, cols 8–12

- x = topical relevance, 0–1, **our rubric, named on the axis**: `TOPICAL RELEVANCE (QOGNITION RUBRIC)`.
- y = domain authority, **third-party, attributed on the axis**.
  `[NEEDS DATA: which authority metric and which provider — Ahrefs DR, Moz DA and Majestic TF are all
  licensed, and the provider must be named on the axis label. Also whether the licence permits
  displaying the metric in a product UI.]`
- Quadrants labelled in `text-meta` at `--d-text-faint`, and named in words rather than
  "high/high": `RELEVANT AND STRONG` · `RELEVANT, SMALL` · `STRONG, OFF-TOPIC` · `NEITHER`.
- Points are activators. Point stroke carries the same "cited by an engine" encoding as the graph.

### 6.4 Outreach pipeline, full-width band

Lanes: `Identified → Qualified → Contacted → Replied → Published → Declined / No reply`.

- **The last lane is visible and its count is as large as the others.** Hiding it is how outreach
  dashboards lie. In the specimen, `Declined / No reply` is the largest lane, because that is true of
  outreach and pretending otherwise is the thing we are differentiating against.
- Per-lane: count, median days in lane, both mono.
- Cards: domain in mono, contact **role** not name (the specimen must not invent people), last touch
  date, and the touch count.

### 6.5 Earned mention timeline, full-width

- Horizontal axis, 12 months, month ticks at `--d-rule-hairline`.
- Track 1: earned mentions as dots, y-position = the ring the domain came from, colour = ring.
- Track 2, directly beneath, sharing the axis: G.O.L.E.M run markers as 1px vertical ticks.
- Label, `text-meta`, `--d-text-faint`, immediately under the axis:
  `TIMELINE SHOWS SEQUENCE, NOT CAUSATION.`
- Hover a mention → drawer with the publication, the date, the anchor context, and any G.O.L.E.M runs
  that later cited it.

### 6.6 Mobile, 390

- **The graph is replaced, not shrunk.** A node graph at 390px is unreadable, and a pinch-zoom node
  graph is worse. Mobile gets a ranked list grouped by ring, with the same encodings as leading
  chips: ring name as a group header, node-size step as a `●●●○` glyph, and the teal `CITED BY AN
  ENGINE` chip. Every fact in the graph survives; only the geometry goes.
- Scatter becomes a two-column sortable list with the quadrant as a chip.
- Pipeline becomes a vertical stepper. `Declined / No reply` stays visible.
- Timeline becomes a reverse-chronological list with month dividers and inline run markers.

---

## 7. M.A.R.S — multi-agent routing

> **Positioning line on frame:** "The routing system that runs the accounts."

Nav rail: `Board · Lanes · Attribution · SLA`.

**Decision I, for the operator.** M.A.R.S is currently the agency's internal routing system. Shown on
the site it is strong AI-native proof — "here is the machine that runs your account" — but it is not a
client-facing product. `[NEEDS DATA: is M.A.R.S positioned as (a) internal proof, (b) a client-facing
product, or (c) a client-facing view into their own account's routing?]` The design below works for
(a) and (c). If (b), the lead-scoring and attribution screens need a client's data model, not ours.

### 7.1 Agent routing board, cols 1–7

- Rows = specialist roles, not people: Search · Content · Creative · Performance · Lifecycle ·
  Brand gate. Roles, because naming staff in a specimen invents people.
- Columns = stage: Queued · Running · Blocked · In gate · Done.
- Header states the routing rule in mono uppercase: `ROUTE BY DEPENDENCY · GATES RUN LAST`.
- Cards: work item, assigned role, the dependency it waits on, elapsed time in mono.
- **Dependency edges drawn as short right-angle connectors between rows.** The rule "search before
  content" becomes a visible line rather than a claim about method. Same orthogonal-connector rule
  as the fan-out tree (§4.2 Row D).
- Status glyphs per `tokens-dark.md` §6 process states.

### 7.2 Lead qualification lanes, cols 8–12

**Grounded in the code, not invented.** `lib/leadQualification.ts` does not produce a numeric score.
It produces a boolean classification from four predicates:

```
eligibility = b2b && company && (size || revenue) && highIntent  ?  'MQL'  :  'Lead'
   size    ∈ { '20-99', '100-300' }
   revenue ∈ { '3m-10m', '10m-50m', '50m-500m' }
```

So the lanes are **rule lanes, not score bands**:

| Lane | Rule |
|---|---|
| MQL | All four predicates true |
| Lead — size or revenue below range | `b2b && company && highIntent`, size and revenue both false |
| Lead — intent not stated | `highIntent` false |
| Lead — not B2B or no company | `b2b` or `company` false |

Each card shows the four predicates as four small chips, filled or hollow, with the word. That is a
better design than a score anyway: a lane that names its rule tells a salesperson what to do next,
and a number labelled `68` does not.

`[NEEDS DATA: whether a numeric score is wanted here, or the boolean rule stays. If a score is
introduced, the band thresholds must live in `lib/leadQualification.ts` and be read from there, not
duplicated in the UI.]`

### 7.3 Attribution path, full-width band

A single lead's path as a horizontal sequence of touch chips: first touch → n intermediate → last
touch → booking.

Each chip: channel · source · date · captured click ID in mono, truncated
(`gclid TeSt‑oNlY‑…`).

**The device that makes this screen worth building:** every touch states whether it was stored
durably or only for the session.

| Storage | Treatment |
|---|---|
| Durable (lead record) | normal chip, `--d-surface-2`, mono ID shown |
| Session only | the `Not checked` hatch, label `SESSION ONLY — LOST AT 30 MIN` |

`CLAUDE.md` §8 says attribution must outlive the session because a multi-week consideration purchase
loses first touch if it lives in `sessionStorage`. This chip renders that engineering rule as a
visible product fact. It is the kind of detail that makes a screen look like real software, because
it only exists if someone actually hit the problem.

Also on this band: `walkthrough_booked` shown as **server-side confirmed**, with a note in `text-meta`
that a booking-link click is not a booking (`CLAUDE.md` §8). If the specimen shows a booking that was
only a widget view, it is labelled `BOOKING WIDGET VIEWED · NOT A BOOKING`.

### 7.4 Speed-to-lead clock

- Large elapsed value, mono, `text-h2`, tabular: `00:04:12`.
- SLA target beside it in `text-meta`: `TARGET 00:15:00`.
- Distribution strip below: the last 30 responses as 30 vertical ticks, 3px wide, 32px tall, height
  proportional to response time, `--d-accent-graphic` for met and `--d-text-faint` for missed.
- **Counts stated in words beneath**, because colour is not the only carrier:
  `26 of the last 30 met the 15-minute target. Slowest: 41 minutes, 8 Sep.`
- `[NEEDS DATA: the actual speed-to-lead SLA, and whether it is measured today.]`

### 7.5 Mobile, 390

- Board becomes one column grouped by **stage**, with the role as a chip on each card. Grouping by
  stage rather than role is correct on mobile because stage is what you act on.
- Lanes become a stacked list with the rule as the group header and the predicate chips wrapping.
- **The attribution path becomes a vertical timeline, and it is better than the desktop version.**
  A long horizontal sequence is the one thing mobile genuinely improves. Consider using the vertical
  treatment at every width.
- Clock full width at the top, distribution strip beneath at 100% width.

---

## 8. File naming

Extends `tokens.md` §11.

```
Specimen data          data/specimen/<product>.ts
                       data/specimen/northwind.ts        (the shared subject)

Product components     components/products/<product>/<Screen>.tsx
                       components/products/shared/SpecimenFrame.tsx
                       components/products/shared/FrameBrowser.tsx
                       components/products/shared/FramePhone.tsx
                       components/products/shared/AnswerDrawer.tsx
                       components/products/shared/ProvenanceLine.tsx

Static exports         public/products/<product>_<screen>_<surface>_<width>.png
                       public/products/golem_overview_desktop_1440.png
                       public/products/golem_archive_desktop_1440.png
                       public/products/golem_overview_mobile_390.png

Design exports         docs/design/exports/<product>_<screen>_<state>_<width>.png
                       docs/design/exports/golem_overview_partial_1440.png
```

Every static export must be regenerated from the live component, never hand-edited. A hand-edited
product screenshot is a fabrication by another name, and it is exactly how `AICitationSimulator`
would come back.

---

## 9. NEEDS DATA

| # | What | Blocks |
|---|---|---|
| P1 | Which of the four products are shipped and in use on client accounts today, which are in build, which are internal only | The status chip on every product card. Without it, "Shipped, not promised" is a claim we cannot support. **Blocking for `/labs`** |
| P2 | The real engine list G.O.L.E.M tracks today, and whether all 8 are live | The matrix has 8 rows. If only 5 are live, it has 5 rows and 3 `Not checked`. It must not show 8 aspirationally |
| P3 | The real model version strings recorded per engine | The model-version row is the most persuasive element in the design. Fictional version strings in the specimen are acceptable only if they are obviously synthetic; real ones are better |
| P4 | Answer retention policy and storage duration | The Archive footer states it |
| P5 | Which authority metric and provider LinkersPro uses, and whether the licence permits displaying it | The scatter's y axis cannot be labelled |
| P6 | Is M.A.R.S internal proof, a client-facing product, or a client view into their own routing (Decision I) | The M.A.R.S screens' data model |
| P7 | The real speed-to-lead SLA, and whether it is measured today | The clock |
| P8 | Whether a numeric lead score is wanted, or the boolean rule in `lib/leadQualification.ts` stays | The lanes |
| P9 | The prompt set size in the standard tracked scope, per pricing tier | The matrix column count, and it is already open as item 2 in `README.md` |
| P10 | Whether `Send to Scriblr` from a fan-out miss is a real integration today or a design proposal | If it is a proposal, the action renders disabled with `Coming` rather than as a working control. Do not show a control that does nothing |
