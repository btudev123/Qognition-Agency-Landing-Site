# `SnapshotResult` — the conversion component

Owner: Elena (creative). Written 2026-09-28.

This is the component the whole site exists to deliver. Everything else is a route to it. It shows
one prospect's brand against up to three named competitors across four discovery surfaces, and it
has to read as an instrument rather than a marketing graphic.

---

## 1. The idea in one sentence

**A measurement is credible when the reader can reproduce it**, so the component's organising
principle is reproducibility: every cell is traceable to a verbatim prompt, a platform, a date and
a screenshot, and the prompt is presented in a form the reader can copy and run themselves.

That single decision drives the layout. It is why the prompts are not hidden behind "methodology",
why there is a copy button on every prompt, why mono type is rationed to machine-recorded facts,
and why there is no score.

### What makes the reference credible, and what we take from it

`radyant.io` reads as credible for three reasons that are worth taking, and one that is not.

Take: **a subhead that names the actual platforms** rather than saying "AI search", which converts
an abstract claim into a checkable one. Take: **named senior people with the year they started in
search**, because a specific year invites verification and a stock photo does not. Take: **a
numbered manifesto in place of superlatives**, because a list of self-imposed limits is the one
form of self-description a reader cannot dismiss as puffery.

Do not take: their proof pattern is a case-study grid with headline multiples. We do not have
publishable client outcomes yet, and CLAUDE.md §4 forbids presenting anything unmeasured. Our
equivalent of their proof grid is the instrument itself, shown empty and honest.

---

## 2. Data contract

The component renders only what it is given. It computes nothing, infers nothing and never fills a
gap.

```ts
type Surface = 'map_pack' | 'organic_top10' | 'ai_overview' | 'assistant';

type Platform =
  | 'google_search' | 'google_maps'
  | 'google_ai_overview'
  | 'chatgpt' | 'perplexity' | 'gemini' | 'claude' | 'copilot';

/** One thing that was actually run. Every cell points at one of these. */
interface Observation {
  id: string;                 // 'p03'
  surface: Surface;
  platform: Platform;
  /** The exact string that was typed. Rendered verbatim, never edited for length. */
  prompt: string;
  /** ISO 8601 with timezone. Rendered as an absolute date, never "2 days ago". */
  observedAt: string;
  /** Conditions that change the answer. All three are required. */
  conditions: {
    location: string;         // 'Dallas, TX, US'
    session: string;          // 'Logged out, no memory, fresh session'
    platformVersion: string;  // 'ChatGPT, GPT-5.2, web' or 'Not disclosed by platform'
  };
  /** Path under /public/evidence. Absent means no screenshot exists, and the UI says so. */
  screenshot?: string;
  /**
   * Domains the answer cited, in the order the answer cited them.
   * Only meaningful for ai_overview and assistant. Empty array means the answer
   * cited nothing, which is different from "we did not record them" (undefined).
   */
  citedDomains?: string[];
}

type Finding =
  /** Measured, and the brand was there. `detail` is the fact, e.g. 'Position 4'. */
  | { state: 'present'; detail: string; observationId: string }
  /** Measured, and the brand was not there. */
  | { state: 'absent'; observationId: string }
  /** Not measured. `reason` is shown to the reader, verbatim. Never inferred. */
  | { state: 'not_checked'; reason: string };

interface BrandRow {
  name: string;               // real, named. Never 'Competitor A'.
  domain: string;
  isSubject: boolean;         // exactly one row is true
  findings: Record<Surface, Finding>;
}

interface SnapshotResultData {
  subjectBrand: string;
  rows: BrandRow[];           // subject first, then up to 3 competitors
  observations: Observation[];
  /** Human name of whoever ran it. A measurement has an author. */
  measuredBy: string;
  /** Earliest and latest observedAt across the set. */
  window: { from: string; to: string };
}
```

Three contract rules, enforced in the type layer, not by convention:

1. **There is no score field, and there never will be.** A composite 0–100 invites the
   "you are invisible in AI search" framing that CLAUDE.md §4 forbids, and it cannot be derived
   honestly from an n of 3 to 15 prompts. `lib/auditEngine.ts` produces a 0–100 crawl score today.
   That number belongs in the crawl report and must not be piped into this component.
2. **`not_checked` is a first-class state, not a fallback.** A missing `Finding` is a type error,
   not an empty cell.
3. **Competitors are named.** "Competitor A" is what a marketing graphic does. If a name cannot be
   published, the snapshot is not published.

`[NEEDS DATA: who supplies the three competitors.]` Either the prospect names them on the request
form (one field, "Who do you lose deals to?") or we pick them from the SERP. The form is better,
because the comparison then reflects their actual competitive set and they cannot dismiss it. Needs
an operator decision before the form is built, because it changes the field count.

---

## 3. Desktop layout, ≥1024px

Container: `max-w-wide` (1320px), the panel itself `max-w-content` (1200px), `--radius-lg`, 1px
`--rule-structural` border, `--elev-0`. White. The panel never carries a shadow.

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│  MEASURED BY RACHEL SUMMERS  ·  12–14 OCT 2026  ·  9 PROMPTS  ·  DALLAS, TX          [meta]│
│  ──────────────────────────────────────────────────────────────────────────────────────── │
│                                                                                            │
│  Who appeared, by surface                                                       [h3]       │
│                                                                                            │
│  ┌──────────────────┬──────────────┬──────────────┬──────────────┬──────────────┐         │
│  │                  │ MAP PACK     │ ORGANIC      │ GOOGLE AI    │ ASSISTANTS   │  [meta, │
│  │                  │ Google Maps  │ TOP 10       │ OVERVIEW     │ ChatGPT,     │   upper,│
│  │                  │              │ Google       │              │ Perplexity   │   .08em]│
│  ├──────────────────┼──────────────┼──────────────┼──────────────┼──────────────┤         │
│  ┃ Acme Brokers     │ ■ Pack #2    │ ■ Position 4 │ □ Not found  │ □ Not found  │         │
│  ┃ YOUR BRAND       │ p01          │ p02          │ p04          │ p06, p07     │         │
│  ├──────────────────┼──────────────┼──────────────┼──────────────┼──────────────┤         │
│  │ Northgate Risk   │ ■ Pack #1    │ ■ Position 2 │ ■ Cited      │ ■ Named 2/2  │         │
│  │ northgaterisk.com│ p01          │ p02          │ p04          │ p06, p07     │         │
│  ├──────────────────┼──────────────┼──────────────┼──────────────┼──────────────┤         │
│  │ Harbor & Vance   │ □ Not found  │ ■ Position 7 │ ■ Cited      │ ■ Named 1/2  │         │
│  ├──────────────────┼──────────────┼──────────────┼──────────────┼──────────────┤         │
│  │ Sable Commercial │ ▨ Not checked│ ■ Position 9 │ □ Not found  │ ▨ Not checked│         │
│  │                  │ No local     │              │              │ Out of scope │         │
│  │                  │ listing to   │              │              │ for a free   │         │
│  │                  │ check        │              │              │ snapshot     │         │
│  └──────────────────┴──────────────┴──────────────┴──────────────┴──────────────┘         │
│                                                                                            │
│  An AI answer changes with the account, the location, the time and the model version.      │
│  This is what these prompts returned on these dates. It is not a ranking and not a state.   │
│  Citation order is the order the answer listed sources. It is not a ranking either.  [meta] │
│                                                                                            │
│  ▸ The 9 prompts we ran, verbatim                                                          │
│  ▸ What the AI answers cited instead of Acme Brokers  (6 domains)                          │
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

Specifics:

- Real `<table>`. `<caption class="sr-only">`, `scope="col"` on the surface headers, `scope="row"`
  on the brand cell. This is tabular data and a div grid would be a defect.
- **Column headers carry the surface and the platform**, on two lines. "AI Overview" alone is
  ambiguous. This is also where CLAUDE.md's four-layer vocabulary gets reinforced, so the wording
  is fixed: `MAP PACK / Google Maps`, `ORGANIC TOP 10 / Google`, `GOOGLE AI OVERVIEW`,
  `ASSISTANTS / ChatGPT, Perplexity`.
- **The subject row** is marked three ways, never by colour alone: a 3px `--accent` left rule, a
  `YOUR BRAND` label in `text-meta` under the name, and `aria-current="true"` on the row. It sits
  first. It is not tinted, because a tinted row reads as "highlighted for effect".
- **Cell anatomy.** Glyph, then the fact, then the observation ids.
  - Glyph: filled square `--accent-fill` for present, hollow square `--ink-300` for not found,
    hatched square `--ink-300` for not checked. 10px, `aria-hidden`, with the word beside it.
  - Fact: `text-body leading-snug font-medium` in `--ink-900`. Present facts are specific:
    `Pack #2`, `Position 4`, `Cited`, `Named 2/2`.
  - Observation ids: `text-meta .fact` in `--ink-400`, each a button that opens the detail row.
- **Not checked** cells get `--ink-050` with a 4px diagonal hatch at `--ink-100`, the words
  `Not checked` in `--ink-400`, and the reason underneath in `text-meta`. They are visually the
  quietest cell in the table, and they are never counted in any tally or summary sentence.
- **No totals row. No column summary. No percentage anywhere.** With n=1 to 2 prompts per surface,
  any rate is a fabrication.
- Column widths: brand `280px` fixed, the four surfaces equal at `1fr`. Below 1200px the table
  scrolls inside its own panel (`overflow-x: auto`, `min-width: 960px`), never the page body. The
  brand column is `position: sticky; left: 0` with a right hairline so the row stays identifiable
  while scrolling.

### Expanding a cell

Clicking an observation id expands a full-width detail row directly beneath the brand row, pushing
the table down. Not a modal, not a tooltip. A modal hides the comparison you just built.

```
  ├──────────────────┴──────────────┴──────────────┴──────────────┴──────────────┤
  │  p06  ·  CHATGPT  ·  14 OCT 2026, 09:12 CDT                          [close ×]│
  │                                                                               │
  │  PROMPT, VERBATIM                                                    [copy ⧉] │
  │  ┌──────────────────────────────────────────────────────────────────────────┐ │
  │  │ who are the best commercial insurance brokers in dallas for a            │ │
  │  │ mid-size construction company                                            │ │
  │  └──────────────────────────────────────────────────────────────────────────┘ │
  │                                                                               │
  │  CONDITIONS                                                                   │
  │  Location  Dallas, TX, US                                                     │
  │  Session   Logged out, no memory, fresh session                               │
  │  Version   ChatGPT, GPT-5.2, web                                              │
  │                                                                               │
  │  CITED INSTEAD OF ACME BROKERS                                                │
  │  The answer named these sources, in this order. Order is not a ranking.       │
  │  1  northgaterisk.com          2  insurancejournal.com                        │
  │  3  harborvance.com            4  reddit.com/r/insurance                      │
  │  5  dallaschamber.org          6  clutch.co                                   │
  │                                                                               │
  │  [ Screenshot: 2026-10-14_chatgpt_p06_acme-brokers.png ]           [view ↗]    │
  └───────────────────────────────────────────────────────────────────────────────┘
```

- The prompt sits in an inset `--ink-050` block, `--radius-sm`, `.fact` mono, wrapping at the real
  line breaks, never truncated and never ellipsised. A truncated prompt is an unverifiable prompt.
- The copy button copies the prompt only, no attribution suffix. Confirmation is the button label
  changing to `Copied` for 2s, with `aria-live="polite"`.
- **Cited domains** are bare registrable domains in `.fact` mono, numbered in citation order, in a
  two-column grid. No favicons, no logos, no link cards. They are not hyperlinked by default: this
  is a record of what an answer said, not a set of recommendations, and linking them sends the
  prospect to the competitor. `[NEEDS DATA: operator decision on whether competitor domains are
  linked. My recommendation is no.]`
- The sentence "Order is not a ranking" is required and non-removable. It is the single most
  common misreading of a citation list.
- If `screenshot` is absent, the block reads `No screenshot recorded for this observation.` in
  `--ink-400`. It does not disappear, because an absent screenshot is information.

---

## 4. Mobile layout, <768px

A four-column comparison table does not survive a 375px viewport. Horizontal scroll is the usual
answer and it is the wrong one here: the reader loses the comparison, which is the entire point.

**The table transposes into one block per surface.** The buyer's question on mobile is "who shows
up in ChatGPT", asked one surface at a time.

```
┌────────────────────────────────────┐
│ MEASURED BY RACHEL SUMMERS         │  meta, --ink-400
│ 12–14 OCT 2026 · 9 PROMPTS         │
│ DALLAS, TX                         │
├────────────────────────────────────┤
│                                    │
│ Who appeared, by surface      [h3] │
│                                    │
│ ┌────────────────────────────────┐ │
│ │ MAP PACK                 [meta]│ │  surface block
│ │ Google Maps                    │ │  1px --rule-structural, --radius-md
│ │ ──────────────────────────────  │ │
│ │ ┃ Acme Brokers      ■ Pack #2  │ │  subject row, 3px --accent left rule
│ │ ┃ YOUR BRAND           p01     │ │
│ │   Northgate Risk    ■ Pack #1  │ │
│ │   Harbor & Vance    □ Not found│ │
│ │   Sable Commercial  ▨ Not check│ │
│ │     No local listing to check  │ │
│ │ ──────────────────────────────  │ │
│ │ ▸ Prompt p01                   │ │
│ └────────────────────────────────┘ │
│                                    │
│ ┌────────────────────────────────┐ │
│ │ ORGANIC TOP 10                 │ │
│ │ ...                            │ │
│ └────────────────────────────────┘ │
│                                    │
│ ┌────────────────────────────────┐ │
│ │ GOOGLE AI OVERVIEW             │ │
│ └────────────────────────────────┘ │
│                                    │
│ ┌────────────────────────────────┐ │
│ │ ASSISTANTS                     │ │
│ │ ChatGPT, Perplexity            │ │
│ └────────────────────────────────┘ │
│                                    │
│ An AI answer changes with the      │
│ account, location, time and model  │
│ version. This is what these        │
│ prompts returned on these dates.   │
│ It is not a ranking.         [meta]│
└────────────────────────────────────┘
```

- Order of the four blocks on mobile is fixed and **not** the desktop column order. Lead with the
  surfaces the offer leads with, per CLAUDE.md §1 emphasis order: Google AI Overview, Assistants,
  Map Pack, Organic Top 10. On desktop the columns read left to right as a familiar progression
  from classic to AI, which is the right reading order for a comparison. On mobile the reader may
  stop after the first block, so the AI surfaces go first.
- Each brand row is a two-line flex row: name on the left wrapping to two lines maximum, finding on
  the right. `min-height: 48px`, which also satisfies the 44px touch target.
- The prompt disclosure per block is a `<details>` element, closed by default, native, no JS.
- 320px is the narrowest supported width. At 320px the finding wraps below the brand name rather
  than truncating. Nothing truncates.

**768–1023px:** the desktop table, at `min-width: 960px` inside a scrolling panel with the sticky
brand column, plus a `text-meta` hint `Scroll to see all four surfaces` that is removed once the
panel has been scrolled.

---

## 5. Honesty devices, in order of importance

1. **Method strip above the table.** Named measurer, date range, prompt count, location. Not
   optional and not collapsible.
2. **Verbatim prompts, copyable.** The prospect can rerun them. Nothing else on the site buys as
   much trust for as little.
3. **`Not checked` reads as a limit, not a gap.** The reason is always shown. Acceptable reasons
   are concrete: `Out of scope for a free snapshot`, `No local listing to check`,
   `Platform did not return an answer on 14 Oct`. `[NEEDS DATA: the closed list of permitted
   not-checked reasons.]` They must be a fixed enum, not free text, or they will drift into excuses.
4. **Conditions, per observation.** Location, session state, platform version. These are the three
   variables that change the answer, so omitting them makes the result unverifiable.
5. **The limits sentence.** Fixed copy, cannot be removed by a prop.
6. **Absolute dates.** `14 Oct 2026, 09:12 CDT`. Never "2 days ago", which implies the finding is
   still true.
7. **No score, no gauge, no percentage, no trend arrow, no sparkline.** There is one date range.
   A trend needs two measurements and we have one.

---

## 6. The five states

| State | Behaviour |
|---|---|
| **Default** | As drawn. Mixed findings. Detail rows collapsed. Panel border `--rule-structural`. |
| **Hover** | Row: background `--ink-050`, 140ms. Observation id button: underline appears, colour to `--accent`. Copy button: border to `--rule-interactive`. Cells themselves do not respond to hover, only the things that do something. |
| **Focus** | Every observation id, every disclosure and every copy button is tabbable in DOM order. 2px ink ring, 2px offset, `--radius-sm`. The scrolling table panel gets `tabindex="0"` and `role="region"` with an accessible name so keyboard users can scroll it. Expanding a cell moves focus to the detail row heading. Closing returns focus to the trigger. |
| **Loading** | Surfaces are checked sequentially, so the table renders immediately with the **real brand names** and each cell showing a `Checking…` chip in `--ink-400` on `--ink-050` with a 2px pulsing bar at `--dur-slow`. Cells resolve one at a time, top to bottom, left to right. `aria-live="polite"` announces each surface as it completes: `Map pack complete`. No skeleton shimmer, no spinner, no fake progress bar. If a surface takes longer than 20s the chip becomes `Still checking` with an elapsed counter. Never a progress percentage, because the duration is not known. |
| **Empty / error** | Four distinct cases, below. |

### Empty and error cases

| Case | Rendering |
|---|---|
| No competitors supplied | Table renders with one row, the subject. Header of the missing rows is replaced by an inline prompt: `Add up to three competitors to see this as a comparison.` plus a field. The single-row table is still a valid result. |
| A surface could not be checked at all | That whole column is `not_checked` with one shared reason, and the column header gets a `Not checked` chip so the reader sees it before reading four cells. |
| Target URL unreachable (`AuditError` from `normalizeTargetUrl` / fetch) | The component does not render. The form shows the error inline: `We could not reach {domain}. Check the address and try again.` Never a half-populated table. |
| Snapshot exists but is older than 30 days | A `--ink-050` band above the method strip: `Measured {date}. AI answers change. Ask for a fresh run.` plus a link. The data still renders. Stale data is shown and labelled, never hidden. |

### The specimen variant

`variant="specimen"` is the default rendering on `/` and `/audit` until there is a snapshot we have
**written permission to publish**.

It renders the full instrument with every cell in a fifth visual state: empty, hatched at 50%
opacity, with the brand column reading `Your brand`, `Competitor 1`, `Competitor 2`,
`Competitor 3`. Above it, in `text-body`, not `text-meta`:

> This is the form the result takes. It is empty because we do not publish a client's snapshot
> without written permission, and we do not have one to publish yet. Yours arrives filled in.

That paragraph is the section. It is not a placeholder: it shows the instrument, admits what is
missing and says why, which is the behaviour CLAUDE.md §4 asks for. The alternative, omitting the
section entirely, loses the single strongest thing the site has to show.

`[NEEDS DATA: one published snapshot with written client permission, or a permitted anonymised
example where the subject is anonymised and the competitors are real.]` Until that exists the
specimen ships. Operator decision on which: I recommend the specimen.

---

## 7. Accessibility

- Semantic `<table>`, `<caption>`, `scope`, `aria-current` on the subject row.
- Every state has a glyph and a word. Colour carries nothing on its own (SC 1.4.1).
- The hatch pattern on `not_checked` is a CSS `repeating-linear-gradient`, present in forced-colors
  mode and in print.
- Detail rows are `aria-expanded` / `aria-controls` disclosures. Focus moves in and returns out.
- `aria-live="polite"` for the loading sequence and the copy confirmation. Never `assertive`.
- Screenshots have alt text stating what they show and when:
  `ChatGPT answer to prompt p06, 14 Oct 2026. Acme Brokers is not named.`
- Touch targets 44px minimum. The observation id buttons are small text, so they get
  `py-2 -my-2 px-1 -mx-1` to reach target size without changing the visual rhythm.
- The table must be readable at 400% zoom at 320px width (SC 1.4.10). The mobile per-surface layout
  is what satisfies this, so its breakpoint is driven by available width, not device.
- Print stylesheet: all detail rows expanded, screenshots omitted, prompt text and conditions kept.
  Prospects forward this to a colleague as a PDF.

---

## 8. What this component must never do

- Show a score, grade, percentage or gauge.
- Show a competitor as "Competitor A".
- Animate a number counting up. `components/shared/CountUp.tsx` must not be used here.
- Use red for a finding.
- Say "invisible", "nowhere", "missing from AI search" or any absolute state derived from a sample.
- Infer a `not_checked` cell as absent in any summary sentence.
- Sit inside a carousel.
- Round or reword a prompt.
