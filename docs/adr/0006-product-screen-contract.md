# ADR-0006: Product screen component contract

- Status: **accepted (operator, 2026-10-07)**
- Date: 2026-09-28. Amended 2026-10-07 (twice, see below).
- Depends on: ADR-0004 (token layer), ADR-0005 (server-first, 40KB budget on `/`)
- Constrains: `components/product-screens/**`, `data/product-screens/**`, and the tab state in
  `components/visual/SectorTabs.tsx`
- Visual source: `docs/design/2026-10-visual-upgrade.md` §3 (Ruth-reviewed, 2026-10-07)
- Interface only. Implementation goes to Mira (`frontend-dev`). Gate goes to Owen (`quality`).

## Amendments, 2026-10-07

**First amendment.** The operator approved illustrative product screens for the visual upgrade
(CLAUDE.md authority block, 2026-10-07), which unblocks the old §7.
- **Product names corrected.** The nameable in-house engines are **LinkersPro**, **Scriblr** (AI
  citation and GEO tracking) and **M.A.R.S.** (CLAUDE.md §1, `docs/icp-positioning.md`). Linkdex and
  G.O.L.E.M are removed and may not appear in a screen.
- **New rule R6** (no client-result metrics).
- **File layout and types** for two Scriblr screens.
- **`capture` deferred** (§9).
- **`AICitationSimulator.tsx` is already deleted.** Verified: nothing in `components/` or `app/`
  references it.

**Second amendment (Ruth's visual review).**
- **Tabs.** The tracker is one screen holding five sector tabs. Tab state lives outside the
  contract's directories (§5).
- **Brands.** Ondrell Software and Thornbury Precision are added. Northgate Mutual is replaced by
  **Varrowfield Group**, because it reads as Northwestern Mutual.
- **Sources cited.** A closed `SourceType` union is added, and an own-site rule with it.
- **Display constants.** The "Fixed" status and the Named / Not named mapping are display-only (§4.3).
- **Removed fields.**
  - The summary strip (`summarise`, `SampleMetric`), because Ruth's review says no score of any kind.
  - `competitorsNamed`, which is not in the approved strings.
  - `PromptPanelEntry`. The panel now reads its prompts from the tracker, so the two screens cannot
    drift apart.

## Decision

One server component, `<ProductScreen screen={...} />`, renders a screen object from a typed registry
in `data/product-screens/`. Screens are data, never JSX literals. Every screen renders inside a frame
carrying a provenance badge whose text the component owns, driven by a required single-member union on
the type. No time-based state.

---

## 1. The rules

The counter-example these rules close was `AICitationSimulator.tsx`:
- F1: it rendered a ChatGPT answer.
- F2: it named real third parties as sources.
- F3: it faked a scan with `setTimeout`.
- F4: it held its data as literals inside the render body.

**R1. First-party UI only. Never render a third-party AI answer.** (F1)
- A screen shows Scriblr's own chrome. There is no `answer`, `response` or `provider` field.
- An assistant appears only as a **text label on a column or chip in our table**, never as a chat
  bubble, quoted assistant text, or that assistant's interface.
- No assistant logos or brand colours.
- The assistant vocabulary is the existing `Engine` type in `lib/b2b/observations.ts` (ChatGPT,
  Perplexity, Gemini, Google AI Overviews), not a second list.

**R2. Sample brands are a closed union on `.example` domains.** (F2)
- `SampleBrand` is derived from one `as const` array, so the type and the gate read the same list.
  Qognition is not a member.
- Domains are `${string}.example` (RFC 2606).
- Prompt text may not name a real company or product either. That is why "Epic" and "NetSuite" were
  replaced in the brief.
- Adding a member is a reviewed change.
- Every member is **[UNVERIFIED: trading-name check]** until Iris runs it.

**R3. `provenance: 'illustrative'` is required, plus a visible badge.**
- It is a single-member union. A `isDemo?: boolean` flag would default to "real" when omitted, and an
  author-written label would get softened to "Preview".
- The badge text is fixed in `ProvenanceBadge.tsx`:

  > **Illustrative product interface. Sample data, not client results.**

- The badge renders inside the frame at every viewport, in light and dark sections, including
  `frame="none"`. It is never a tooltip.

**R4. No time-based state.** (F3)
- No timers, `requestAnimationFrame`, typing effect, counter, progress bar, loading stage, or
  auto-rotating tabs (CLAUDE.md §9).
- No dates in screen data, because a dated fictional run reads as an observation (CLAUDE.md §4).
  Where the real product shows a run date, the screen prints "Sample run".
- The **only** state permitted is the user-selected tab index in `components/visual/SectorTabs.tsx`
  (§5). Nothing under `components/product-screens/` holds state.

**R5. Screens are data, not JSX literals.** (F4)
Components import from `PRODUCT_SCREENS`. They never declare rows, prompts, brands or tags.

**R6. No client-result metrics. No numbers at all.**
- Screen data has **no `number` fields**.
- Screens render no score, percentage, share of voice, rank, trend arrow, delta or count derived from
  the sample rows. A "prompts with a mention" count beside one brand is a visibility score in all but
  name.
- Digits that sit inside a prompt string ("ISO 9001", "SOC 2") are part of the buyer's question, not
  a metric. They are allowed.
- If a future screen genuinely needs a figure, it comes by amendment as a value derived from the rows
  with a visible `SAMPLE` label. Never as an authored number.

## 2. Products and screens

| Product | Nameable | Screens in this build |
|---|---|---|
| Scriblr | Yes. AI citation and GEO tracking, in production use (operator, 2026-10-07) | `scriblr-visibility-tracker` (hero, five tabs), `scriblr-prompt-panel` (Snapshot, ≥1024px only) |
| LinkersPro | Yes. Authority and link acquisition | None |
| M.A.R.S. | Yes. Lead routing, outreach, booking attribution | None |

- A screen depicts only a capability stated for that product in CLAUDE.md §1.
- A LinkersPro or M.A.R.S. screen is a new `ScreenId` with that capability sentence cited in the PR.
- [UNVERIFIED: that Scriblr's real UI uses this layout.] The screens show the capability. Copy must
  never call them screenshots.

## 3. File layout

```
data/product-screens/
  sample-entities.ts       SAMPLE_BRANDS, SampleBrand, SampleDomain
  types.ts                 §4.2, including TRACKER_SECTORS
  visibility-tracker.ts    the one VisibilityTrackerScreen (five tabs, three rows each)
  prompt-panel.ts          the one PromptPanelScreen (sector: 'msp')
  index.ts                 PRODUCT_SCREENS registry

components/product-screens/          server components only, no 'use client', no hooks
  ProductScreen.tsx        frame, title bar, badge, caption; switches on screen.kind
  ProvenanceBadge.tsx      the only file containing the badge sentence; takes no props
  VisibilityTrackerView.tsx  context <dl> and table per tab; passes the panels to SectorTabs
  PromptPanelView.tsx      resolves its tracker tab, renders prompt, platform chips and status
  labels.ts                §4.3 display constants

components/visual/SectorTabs.tsx     'use client'. Active index and keyboard pattern only (§5)
```

Accessibility:
- Mention states render as a word plus a dot, never the dot alone (WCAG 1.4.1).
- Focus indicators use `--accent-deep` (CLAUDE.md §9).
- Markup is a real `<table>`, reflowing to stacked rows below 640px as the brief specifies.

## 4. Types

### 4.1 `data/product-screens/sample-entities.ts`

```ts
/** Invented. Every member is [UNVERIFIED: trading-name check]. Adding one is a reviewed change. */
export const SAMPLE_BRANDS = [
  'Ondrell Software',   // tab: saas           ondrell.example
  'Thornbury Precision',  // tab: manufacturing  thornbury-precision.example
  'Corran & Whitlow',      // tab: legal          corranwhitlow.example
  'Pellman IT Group',     // tab: msp            pellman-it.example
  'Harbour & Vane',       // tab: logistics      harbourvane.example
  'Calderwood Risk',      // unused in this build
  'Varrowfield Group',    // unused in this build. Replaces Northgate Mutual
] as const;
export type SampleBrand = (typeof SAMPLE_BRANDS)[number];

/** RFC 2606 reserved TLD. Cannot resolve. */
export type SampleDomain = `${string}.example`;
```

On 2026-10-07, a search of `app components data lib docs scripts` for "Varrowfield" returned no
hits. That only shows the name is unused in this repo. It is not a trading-name check.

### 4.2 `data/product-screens/types.ts`

```ts
import type { Engine } from '../../lib/b2b/observations';
import type { SampleBrand, SampleDomain } from './sample-entities';

/** The in-house engines nameable on the site. CLAUDE.md §1. */
export type ProductName = 'Scriblr' | 'LinkersPro' | 'M.A.R.S.';

/** Closed. One member per built screen. */
export type ScreenId = 'scriblr-visibility-tracker' | 'scriblr-prompt-panel';

/** Single-member on purpose. Widening it is a reviewed type change. */
export type Provenance = 'illustrative';

/** Tab order. Ids match the existing hero sector ids. */
export const TRACKER_SECTORS = ['saas', 'manufacturing', 'legal', 'msp', 'logistics'] as const;
export type TrackerSector = (typeof TRACKER_SECTORS)[number];

/** Stored state. Displayed through MENTION_LABEL (§4.3): cited and mentioned both show "Named". */
export type MentionState =
  | 'cited'      // named, and its .example domain cited
  | 'mentioned'  // named, not cited
  | 'absent';    // not named

/** Closed. Displayed through SOURCE_TYPE_LABEL (§4.3). */
export type SourceType =
  | 'own-site'           // only on a row with at least one cited or mentioned state (gate)
  | 'directory'
  | 'trade-publication'
  | 'review-site'
  | 'association';

interface ScreenBase {
  readonly id: ScreenId;
  readonly product: ProductName;
  /** One line, present tense. No digits, no '%'. */
  readonly caption: string;
  readonly provenance: Provenance;
}

export interface VisibilityTrackerRow {
  /** Sample buyer prompt (Family B). Verbatim. No real company or product names. */
  readonly prompt: string;
  /** Every Engine is a column, so every row fills every column. */
  readonly states: Readonly<Record<Engine, MentionState>>;
  /** "Sources cited:" tags. One or two, no duplicates. */
  readonly sourcesCited: readonly [SourceType] | readonly [SourceType, SourceType];
}

export interface TrackerTab {
  readonly sector: TrackerSector;
  /** Tab label, e.g. 'B2B SaaS', 'IT and MSP'. */
  readonly label: string;
  readonly brand: SampleBrand;
  readonly domain: SampleDomain;
  readonly rows: readonly VisibilityTrackerRow[];
}

export interface VisibilityTrackerScreen extends ScreenBase {
  readonly kind: 'visibility-tracker';
  readonly id: 'scriblr-visibility-tracker';
  readonly product: 'Scriblr';
  /** One per TrackerSector, in TRACKER_SECTORS order (gate). */
  readonly tabs: readonly TrackerTab[];
}

export interface PromptPanelScreen extends ScreenBase {
  readonly kind: 'prompt-panel';
  readonly id: 'scriblr-prompt-panel';
  readonly product: 'Scriblr';
  /**
   * The panel has no prompt data of its own. It renders this tracker tab's brand, domain and
   * prompts, with all four Engine labels as platform chips. The panel and the hero therefore
   * show the same fixed set by construction.
   */
  readonly sector: TrackerSector;
}

export type ProductScreen = VisibilityTrackerScreen | PromptPanelScreen;

/** Key and id cannot disagree. */
export type ProductScreenRegistry = {
  readonly [K in ScreenId]: Extract<ProductScreen, { id: K }>;
};
```

```ts
// data/product-screens/index.ts
export const PRODUCT_SCREENS: ProductScreenRegistry = { /* two entries */ };
```

### 4.3 `components/product-screens/labels.ts` (display-only, not data)

```ts
import type { MentionState, SourceType } from '../../data/product-screens/types';

export const MENTION_LABEL = {
  cited: 'Named',
  mentioned: 'Named',
  absent: 'Not named',
} as const satisfies Record<MentionState, 'Named' | 'Not named'>;

export const SOURCE_TYPE_LABEL = {
  'own-site': 'Own site',
  directory: 'Directory',
  'trade-publication': 'Trade publication',
  'review-site': 'Review site',
  association: 'Association',
} as const satisfies Record<SourceType, string>;

/** Every prompt in an illustrative set is fixed. A constant, never a field. */
export const PROMPT_STATUS = 'Fixed';
export const PROMPT_SET_NOTE = 'Fixed before the baseline run.';
export const RUN_LABEL = 'Sample run';
export const SOURCES_CITED_LABEL = 'Sources cited:';
```

The `cited` / `mentioned` distinction is kept in the data because it is what Scriblr records and it
drives the own-site rule. The public display collapses both to "Named", per Ruth's review.

## 5. Call sites, tabs and motion

```tsx
<ProductScreen screen={PRODUCT_SCREENS['scriblr-visibility-tracker']} frame="none" />
<ProductScreen screen={PRODUCT_SCREENS['scriblr-prompt-panel']} frame="none" />
```

`frame: 'laptop' | 'phone' | 'none'`. The props are unchanged.

**Tabs.**
- `VisibilityTrackerView` (server) renders one panel per tab and passes them as children to
  `components/visual/SectorTabs.tsx`.
- `SectorTabs` (`'use client'`) holds only the active index and the keyboard pattern copied from
  `HeroSnapshotPanel`, and toggles panels with the `hidden` attribute.
- The badge and title bar sit outside `SectorTabs`, so switching tabs never hides the disclosure.
- `SectorTabs` has no timers and imports nothing heavy (no lucide).

**Motion** comes only from the existing `ScrollReveal`. Nothing is added to ADR-0005's budget beyond
`SectorTabs`, which replaces `HeroSnapshotPanel`.

## 6. The gate

Owen appends one block to **`scripts/check-b2b.cjs`**, which is already in `gates` and already loads
TypeScript through `scripts/lib/load-typescript.cjs`. A separate file is his call. The block
requires `data/product-screens/index.ts`, `sample-entities.ts` and `types.ts`, then asserts:

1. **Provenance.** Every screen has `provenance === 'illustrative'`, and `screen.id` equals its
   registry key.
2. **Tabs.**
   - The tracker's `tabs.map(t => t.sector)` deep-equals `TRACKER_SECTORS`.
   - Every `tab.brand` is in `SAMPLE_BRANDS`, and every `tab.domain` ends in `.example`.
   - The prompt panel's `sector` is in `TRACKER_SECTORS`.
3. **Rows.** For every tracker row:
   - `sourcesCited` has no duplicates.
   - `'own-site'` appears only if at least one state is not `'absent'`.
   - The row is not all-named, meaning at least one state is `'absent'` (Ruth: never an all-N row).
4. **No real names or domains.** Walk every string in every screen and fail on either of these:
   - any domain-like token (`/\b[\w-]+\.(com|io|ai|co|net|org|app|uk|de)\b/i`);
   - a case-sensitive, whole-word match against `Qognition`, `Northgate`, `Epic`, `NetSuite`, or the
     competitors in CLAUDE.md §1 (Thrive, Gorilla 76, First Page Sage, RevenueZen, Siana, Bluelinks,
     The ABM Agency, ChoiceLocal, Scorpion, Spiral, Carnegie, Fintel Connect).
5. **No numbers (R6).** The walk fails on any `number` value. Captions fail on `/[0-9%]/`.
6. **Server-only components (R4).**
   - No file under `components/product-screens/` contains `'use client'`, `useState`, `useEffect`,
     `useReducer`, `setTimeout`, `setInterval`, `requestAnimationFrame` or a domain-like literal.
   - `components/visual/SectorTabs.tsx` contains no `setTimeout`, `setInterval` or
     `requestAnimationFrame`.
7. **Badge cannot be dropped (R3).** The badge sentence appears in `ProvenanceBadge.tsx` and in no
   other file, and `ProductScreen.tsx` imports `ProvenanceBadge`.

## 7. Alternatives rejected

- **Images or Figma exports.** They do not reflow, they drift from the ADR-0004 tokens, and their
  text is invisible to search and to assistants.
- **A `<Disclaimer>` beside each screen.** It can be omitted, so eventually it will be.
- **A lint rule instead of the closed union.** Lint rules can be suppressed with a comment.
- **Five tracker screens, one per sector id** (`scriblr-visibility-tracker-<sector>`).
  - Each would need its own frame and badge, so the disclosure would repeat five times inside one
    hero.
  - The registry's `Extract<ProductScreen, { id: K }>` collapses to `never` when one interface owns
    five ids, so the registry type would get harder to read.
  - One screen with a `tabs` array keeps the `ScreenId` union and the registry type unchanged.
- **The prompt panel holding its own copy of the prompts.** Two copies drift. The panel points at
  the tracker tab instead.
- **A derived summary strip.** It was in the first amendment and is removed: Ruth's review says no
  score.

## 8. Consequences

**Good.** Each of these fails at compile time or at the gate, not in review:
- a real brand;
- an assistant answer;
- an animation or auto-rotating tab;
- a missing badge;
- an invented figure;
- an all-named row;
- "Own site" on a row where nothing named the brand.

**Unpleasant.**
- Invented brands with no figures persuade less than a real logo and a percentage. CLAUDE.md §4 made
  that trade; this ADR enforces it.
- A new sample brand means editing two files. The friction is intended.
- The denylist is not exhaustive. R2 and review carry the rest.
- `SectorTabs` sits outside the contract's directories but is governed by R4 and gate check 6.
- [UNVERIFIED: trading-name check] on all seven `SAMPLE_BRANDS`. Iris owns it. Renaming a member
  fixes any clash and touches only data.

## 9. Rollback

Additive. To roll back:
- delete `components/product-screens/`, `data/product-screens/` and `components/visual/SectorTabs.tsx`;
- restore `components/home/HeroSnapshotPanel.tsx` from git;
- remove the gate block from `scripts/check-b2b.cjs`.

There is no data migration and no URL change.

**Deferred, not rejected:** a `capture` field for a real, redacted screenshot. It would need a
`redacted: true` required literal, `provenance` widened to `'captured'`, and the badge "Captured
{date}. Client identifiers removed." It comes as its own amendment when the first real capture
exists.

## 10. What would make this wrong later

- **A screen needs to be a real interactive demo.** Write a separate `<ProductDemo>` contract. Do not
  relax R4 in place.
- **Real client screenshots become routine.** Build the deferred `capture` design.
- **A screen needs a figure.** Add a derived, `SAMPLE`-labelled value by amendment. Never allow
  authored numbers.
- **A prospect on a call notices that Scriblr's real UI diverges from these screens.** The fix is
  the `capture` path, not a new caption.
- **The `Engine` list changes** (for example, Claude is added as a sampled surface). Every tracker
  row must then fill the new column. That is correct, and is a data change, not a contract change.
- **A fourth product ships.** Not a trigger. It costs one `ProductName` member and one `ScreenId`.
