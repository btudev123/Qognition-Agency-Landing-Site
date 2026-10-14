# ADR-0006: Product screen component contract

- Status: **accepted (operator, 2026-10-07)**. Fourth amendment accepted by the operator 2026-10-08
  (§12); Owen gates it.
- Date: 2026-09-28. Amended 2026-10-07 (three times) and 2026-10-08 (once). See below.
- Depends on: ADR-0004 (token layer), ADR-0005 (server-first, 40KB budget on `/`), ADR-0008 §5.2
  (no taxonomy import in components)
- Constrains: `components/product-screens/**`, `data/product-screens/**`, and the run state in
  `components/visual/TrackerRunPlayer.tsx` (third amendment; `SectorTabs.tsx` is retired)
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

**Third amendment (operator, hero run).** Full text in §11. Where it conflicts with §2 to §6, §11
wins.
- The hero becomes `scriblr-tracker-run`: one screen, 21 rows, one per taxonomy industry, animated.
- R1 is reaffirmed. The chat-style answer was offered to the operator and rejected (§11.1).
- R4 is relaxed for the run only, under the motion rules in §11.4.
- The five-tab tracker and `SectorTabs` are retired. The prompt panel re-points at the run.

## Amendment, 2026-10-08

**Fourth amendment (operator, no Illustrative label).** Full text in §12. Where it conflicts with
anything above or in §11, §12 wins.
- The visible badge and its banner are removed from every product screen. R3 keeps the type and
  loses the badge.
- The served-page check inverts: it now asserts that no badge renders.
- New rule **R7** carries the disclosure job the badge used to do, through copy.

## Decision

One server component, `<ProductScreen screen={...} />`, renders a screen object from a typed registry
in `data/product-screens/`. Screens are data, never JSX literals. Every screen renders inside a frame
carrying a provenance badge whose text the component owns, driven by a required single-member union on
the type. No time-based state.

> Superseded by §12 (2026-10-08): the frame carries no badge. The required union stays.

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

> Superseded by §12 (2026-10-08): no visible badge. `provenance: 'illustrative'` stays required.

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

**R7. Copy never presents a screen as real.** Added 2026-10-08. Full text in §12.3.

## 2. Products and screens

Third amendment: the Scriblr screens are now `scriblr-tracker-run` (hero) and
`scriblr-prompt-panel` (Snapshot). See §11.

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

> Superseded by §12 (2026-10-08): `ProvenanceBadge.tsx` is deleted and `ProductScreen.tsx` renders no badge.

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

Superseded in part by §11.2: `ScreenId`, `PromptPanelScreen` and the tracker types.

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

Tabs and motion are superseded by §11.4. The tracker below is retired.

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
  > Superseded by §12 (2026-10-08): there is no badge. `SectorTabs` was already retired by §11.
- `SectorTabs` has no timers and imports nothing heavy (no lucide).

**Motion** comes only from the existing `ScrollReveal`. Nothing is added to ADR-0005's budget beyond
`SectorTabs`, which replaces `HeroSnapshotPanel`.

## 6. The gate

Checks 2 and the `SectorTabs` half of 6 are replaced by §11.6. The rest stand.

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
   > Superseded by §12.4 (2026-10-08): inverted. The badge sentence appears in no source file.

## 7. Alternatives rejected

- **Images or Figma exports.** They do not reflow, they drift from the ADR-0004 tokens, and their
  text is invisible to search and to assistants.
- **A `<Disclaimer>` beside each screen.** It can be omitted, so eventually it will be.
  > Moot from §12 (2026-10-08): the operator removed the visible disclosure outright. See §12.5.
- **A lint rule instead of the closed union.** Lint rules can be suppressed with a comment.
- **Five tracker screens, one per sector id** (`scriblr-visibility-tracker-<sector>`).
  - Each would need its own frame and badge, so the disclosure would repeat five times inside one
    hero.
    > Superseded by §12 (2026-10-08): no badge. The registry-type reasons below still hold.
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
- a missing badge (superseded by §12, 2026-10-08: the gate now fails on a badge that is present);
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

> Amended by §12.6 (2026-10-08): whether a captured screen carries a visible label is an open
> operator decision for that amendment. §12 does not settle it.

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

---

## 11. The tracker run (third amendment, 2026-10-07)

- Status: **accepted** (Kyle). The operator approved the run on 2026-10-07/08. Owen gates the
  amendment and the build.
- **Authority.** The CLAUDE.md authority block records the decision in its "Hero tracker run"
  bullet. The run is the one exception to §9's "No carousels or auto-rotating sliders", and so to
  R4's ban on auto-advance. It needs a Pause button, pauses on hover and focus, and does not
  auto-advance under reduced motion. The same bullet confirms that Scriblr tracks Claude in
  production.
- **Where it renders.** The homepage hero (`components/home/Hero.tsx`) and `/services/ai-seo`
  (`components/services/ServiceLanding.tsx`, the `'tracker-run'` visual in `data/servicePages.ts`).
  Both render the same unfiltered `scriblr-tracker-run`. A filtered run would be a new screen and a
  new amendment, not a call-site choice.

**Decision.** The homepage hero renders `scriblr-tracker-run`. It is one screen with one frame, one
badge and 21 rows, one per industry in `data/b2b/icp/icp-taxonomy.json`. Motion presents the rows.
The resolved rows are the data. The five-tab tracker is retired and the prompt panel re-points at
the run.

> Superseded by §12 (2026-10-08): one frame, no badge, 21 rows.

### 11.1 R1 stands

The operator was offered a chat-style AI answer (an assistant reply naming firms, in a chat bubble)
and chose this run instead. **R1 is reaffirmed unchanged.**
- No `answer`, `response` or `provider` field.
- No chat bubble, quoted assistant text, assistant chrome, logo or brand colour.
- An assistant appears only as a column label in Scriblr's table.

Why the chat option fails: an invented answer attributed to a named assistant is fabricated output
from a real product (F1). A real answer is an observation and needs a platform, a date and a prompt
set (CLAUDE.md §4), which a looping hero cannot carry.

### 11.2 Types

```ts
// data/product-screens/types.ts
export type ScreenId = 'scriblr-tracker-run' | 'scriblr-prompt-panel';

/** Column order. Engine plus exactly Claude. Run and panel only. */
export const RUN_PLATFORMS = ['ChatGPT', 'Perplexity', 'Gemini', 'Claude', 'Google AI Overviews'] as const;
export type RunPlatform = (typeof RUN_PLATFORMS)[number];
/** Fails to compile if Engine gains a member the run lacks. */
const ENGINE_IN_RUN: Engine extends RunPlatform ? true : never = true;

/** Generic placeholder. Names no entity, has no domain. Not a SampleBrand (§11.3). */
export type RunTrackedBrand = 'Your firm';

export type RunSources =
  | readonly [SourceType]
  | readonly [SourceType, SourceType]
  | readonly [SourceType, SourceType, SourceType];

export interface TrackerRunRow {
  /** Taxonomy industry id, '01' to '21'. Never rendered. */
  readonly industryId: string;
  /** Taxonomy sub-industry id under industryId, e.g. '05.03'. Never rendered. */
  readonly subIndustryId: string;
  /** Copied verbatim from that sub-industry's `ai_prompts` (gate 11.6.b). */
  readonly prompt: string;
  /** Keys in RUN_PLATFORMS order (gate). Never all named, never all absent. */
  readonly states: Readonly<Record<RunPlatform, MentionState>>;
  readonly sourcesCited: RunSources;
}

export interface TrackerRunScreen extends ScreenBase {
  readonly kind: 'tracker-run';
  readonly id: 'scriblr-tracker-run';
  readonly product: 'Scriblr';
  readonly trackedBrand: RunTrackedBrand;
  /** One per taxonomy industry, in taxonomy order (gate). */
  readonly rows: readonly TrackerRunRow[];
}

export interface PromptPanelScreen extends ScreenBase {
  readonly kind: 'prompt-panel';
  readonly id: 'scriblr-prompt-panel';
  readonly product: 'Scriblr';
  /** Run rows to show, by industryId. One to three, unique, each in the run (gate). */
  readonly industryIds: readonly [string] | readonly [string, string] | readonly [string, string, string];
}

export type ProductScreen = TrackerRunScreen | PromptPanelScreen;
```

- **Claude without widening `Engine`.** `Engine` is the observation pipeline's claim about where we
  run prompts (`lib/b2b/panelRun.ts`, `lib/audit/aiVisibility.ts`). Adding Claude there asserts our
  own panel samples it and needs a provider. `RUN_PLATFORMS` is declared once and is `Engine` plus
  exactly Claude. This amends R1's "not a second list" for the run and the panel only.
  §2 lets a screen show only a stated capability. The operator states it: the CLAUDE.md authority
  block ("Hero tracker run") confirms that Scriblr tracks Claude in production.
- **`cited` on the run** means named, with the firm's own site among the sources, because the run
  has no domain.
- **Prompts are copied into the data, never read from the JSON at render.** ADR-0008 §5.2 bars
  components from importing the taxonomy. The gate's equality check gives the same guarantee
  without the import.
- **Industry names** render from `icpIndustryCards()` by `industryId`. There is no label field, so
  there is no second copy.
- **The panel** renders "Your firm", the chosen run rows' prompts, `RUN_PLATFORMS` as chips and
  `PROMPT_STATUS`. It has no Domain term. The hero and the panel show the same prompts by
  construction, as before.

### 11.3 "Your firm"

- R2 exists to stop two things: a real entity named on a screen, and an invented name that collides
  with a real trading name (Quillmark, Stroud). "Your firm" names no entity, so nothing can collide.
  It has no domain, so nothing can resolve. It needs no trading-name check.
- **The `SampleBrand` union is not loosened.** `RunTrackedBrand` is accepted by
  `TrackerRunScreen.trackedBrand` only. Any other screen that names a brand still takes
  `SampleBrand` and `SampleDomain`. Adding "Your firm" to `SAMPLE_BRANDS` is forbidden.
- **The risk is read-through.** "Your firm: Not named" can read as a statement about the visitor.
  Three things carry it: rows are never all absent, the run label reads "Sample run", and the badge
  is always visible. Copy beside the hero may never say the reader's firm is not named. Ruth checks
  this.
  > Superseded by §12 (2026-10-08): the badge is gone. The other two carriers stand, and R7 replaces the third.

### 11.4 Motion

R4 holds for every other screen. For the run:

1. **The resolved state is the data.** The server renders all 21 rows with every state resolved.
   Non-active rows carry `hidden`, and the first row is visible. If JS never runs, the screen is
   complete.
2. **Animation is presentation only.** It changes opacity or transform on content that is already
   resolved, within `docs/design/motion.md` (ceiling `--dur-slow`).
   - The full prompt string is in the DOM throughout. Typing is a visual reveal over it, never a
     sliced string.
   - No interim text or state: no "Checking", "Scanning", "Loading", "Live" or "Real-time", no
     spinner, no empty cell.
   - The row the server rendered is never re-animated.
3. **Reduced motion** means no typing, no shimmer and no auto-advance. Rows change only on Previous
   or Next, instantly.
4. **A rotation control is mandatory** (WCAG 2.2.2). The run follows the WAI-ARIA Authoring
   Practices carousel pattern.
   - It is a visible button whose label toggles between "Pause" and "Play".
   - It comes before the run region in DOM and focus order.
   - **Focus anywhere in the player pauses auto-rotation.** That includes the Pause, Previous and
     Next buttons, the segment rail and the rows. Keyboard focus therefore never sits on a row that
     is swapped out from under it.
   - **Hover over the player pauses auto-rotation too.**
   - **Only the rotation button resumes.** Blur and pointer-leave do not restart the run. A visitor
     who paused by focus or hover sees "Play" and presses it to resume.
5. **The badge and title bar sit outside `[data-run-region]`** and outside any `aria-live` element.
   The disclosure never swaps, fades or re-announces.
   > Superseded by §12 (2026-10-08) for the badge only. The title bar and the "Sample run" label still sit outside both.
6. **One `aria-atomic="true"` live region.** It is empty in the served HTML.
   - **Its politeness follows who is driving.** It is `aria-live="off"` while the run auto-rotates,
     so a screen reader is not interrupted every few seconds by content the user did not ask for.
     It is `aria-live="polite"` whenever the run is under user control: paused by the button,
     paused by focus or hover, or under reduced motion.
   - Each row server-renders its summary in `[data-run-summary]`. The player copies the active row's
     summary into the live region once per row, after the row resolves.
   - **User-initiated navigation always announces.** Previous, Next and segment navigation copy the
     new row's summary into the region even while paused. This replaces the earlier "never while
     paused", which left a screen reader user who pressed Next hearing nothing.
   - Auto-rotation writes nothing a screen reader will speak, because the region is `off` while it
     runs. Pausing never announces on its own.
   - It never announces per cell or per character.
   - The summary is the industry name, then each platform with its `MENTION_LABEL`. No counts:
     "named on two of five" is a score (R6).
7. **Motion lives in one client file, `components/visual/TrackerRunPlayer.tsx`.**
   - It receives the server-rendered rows as children and takes no data props.
   - It imports nothing from `data/` or `lib/`, and no animation library.
   - **Its state is the active index, the animation phase and the paused flag**, plus
     presentation-only flags: pointer-over, focus-within, tab-hidden, offscreen and reduced-motion.
     None of them is data. Each one only decides whether, and how, already-resolved rows are shown.
     None reaches the DOM as text, and none changes which states or prompts a row carries.
   - It counts against ADR-0005's 40KB. `SectorTabs` is removed, which frees its bytes.

The run is not the "real interactive demo" in §10. It takes no input and runs no query; it plays
fixed data. F3 is a fake scan presented as real, and rules 2, 5 and 6 above close it.

### 11.5 Mention labels

Settled in §4.3 and unchanged: `cited` and `mentioned` display "Named", `absent` displays "Not
named". Each one renders as a word plus a dot. The run adds no state and no interim label.

### 11.6 The gate

**Data and source** (`scripts/check-b2b.cjs`, replacing check 2 and the `SectorTabs` half of 6):

- a. `run.rows.map(r => r.industryId)` deep-equals the taxonomy's industry ids, in taxonomy order.
  The gate reads the JSON with `fs`. The row count comes from the taxonomy and is never hardcoded.
- b. **Verbatim prompt.** The gate finds the sub-industry whose `id === row.subIndustryId` under the
  industry whose `id === row.industryId`, then asserts `ai_prompts.includes(row.prompt)`. The match
  is exact `===`: no trim, no case folding, no quote normalisation.
- c. The prompt fails on `/\[[^\]]*\]/` (placeholder).
- d. The prompt fails on `/\b[A-Z][a-z]/`. All-caps acronyms (ISO, SOC, ERP) pass. A capitalised
  word is a likely brand or place, so pick another prompt. The check 4 denylist also applies.
- e. `Object.keys(row.states)` deep-equals `RUN_PLATFORMS`. Every value is a `MentionState`. At
  least one is `'absent'` and at least one is not.
- f. `sourcesCited` holds one to three tags with no duplicates. `'own-site'` is present if and only
  if some state is `'cited'`.
- g. As a set, `RUN_PLATFORMS` equals `ENGINES` plus `'Claude'`.
- h. `trackedBrand === 'Your firm'`. The run has no `brand` or `domain` key.
- i. The panel's `industryIds` are unique and each is a run row's `industryId`.
- j. The figure walk (check 5) exempts the keys `industryId`, `subIndustryId` and `industryIds`.
  They are ids and are never rendered.
- k. **The timer ban is scoped to the run's neighbours.** Among files under `components/` that
  import `TrackerRunPlayer` or the screen registry (`data/product-screens`), `TrackerRunPlayer.tsx`
  is the only one allowed a timer (`setTimeout`, `setInterval`, `requestAnimationFrame`). It must
  contain `prefers-reduced-motion`. It may not import from `data/` or `lib/`, and may not import
  `framer-motion` or `motion/`.
  `components/product-screens/` stays server-only (check 6 unchanged).
  - **Out of scope:** the existing timers in `components/shared/StatBand.tsx`,
    `components/shared/ExitIntentPopup.tsx` and `components/shared/CountUp.tsx`. They predate §11,
    render no product screen and import neither the player nor the registry. The rule exists so
    nothing beside a screen can animate, delay or swap its content. A component-wide ban would fail
    the build on unrelated code and would protect no screen. If one of those files ever imports
    the player or the registry, the gate catches it, which is correct.

**Served HTML** (`scripts/lib/served-screens.mjs`):

- **Screen count.** `expected` stays the registry size, which is now two. The run counts as one
  `figure[data-provenance]` with one badge, however many rows it has. Rows are not screens. They are
  validated by a to f above and by `required`.
  > Superseded by §12.4 (2026-10-08): one `figure[data-provenance]` with no badge.
- `required` is the run's prompts plus "Your firm". The tracker's brands and domains leave it.
- `allowed` uses `RUN_PLATFORMS` in place of `ENGINES` and adds the run's industry names. The run's
  chrome strings go into `CHROME`: at least "Pause", "Play", "Previous" and "Next", with the rest
  listed by Mira. "Live", "Scanning", "Checking", "Loading" and "Real-time" may never enter `CHROME`.
- The figure contains exactly one `[data-run-region]` and 21 `[data-run-row]`. Each row has five
  state cells whose text is a `MENTION_LABEL` value, and the prompt in `th[scope="row"]` (the R6
  carve-out).
- No ancestor of the badge carries `aria-live` or `data-run-region`.
  > Superseded by §12.4 (2026-10-08): there is no badge to check. Replaced by the no-badge assertion.
- Exactly one `[aria-live]` in the figure, with no text in the served HTML.
- A `button` reading "Pause" or "Play" comes before `[data-run-region]` in document order.
- **Routes.** Every route that renders the run is held to these checks: `/` and `/services/ai-seo`.
  The second is a different template (`ServiceLanding`), so a passing `/` proves nothing about it.
  As of this edit `scripts/check-served-page.mjs` fetches `ROUTE = '/'` only, so `/services/ai-seo`
  is not yet served-checked. Adding it is part of this build, and Owen does not pass the run until
  it is. The bundle budget stays measured on `/` alone, because ADR-0005 sets it for `/`.

### 11.7 Files

- **New:** `data/product-screens/tracker-run.ts` (`TRACKER_RUN`),
  `components/product-screens/TrackerRunView.tsx` (server), `components/visual/TrackerRunPlayer.tsx`
  (`'use client'`).
- **Retired:** `data/product-screens/visibility-tracker.ts`,
  `components/product-screens/VisibilityTrackerView.tsx`, `components/visual/SectorTabs.tsx`, and
  the types `TRACKER_SECTORS`, `TrackerSector`, `TrackerTab`, `VisibilityTrackerRow` and
  `VisibilityTrackerScreen`.
- `SAMPLE_BRANDS` stays, with no consumer in this build. R2 governs the next screen that names a
  brand.

### 11.8 Alternatives rejected

- **A chat-style AI answer.** Offered to the operator and declined. R1 (§11.1).
- **Widening `Engine` to include Claude.** That changes what the observation pipeline claims to
  sample (§11.2).
- **Reading prompts from the JSON at render.** ADR-0008 §5.2 forbids it, and it adds the taxonomy's
  reach to the RSC payload.
- **Keeping the five-tab tracker as unrendered panel data.** That breaks "every registered screen
  renders on /", and it puts a `SampleBrand` on the same page as "Your firm".
- **A `SampleBrand` per row.** That means 21 names and 21 trading-name checks, and it loses the
  reader's own firm, which is the point of the run.
- **Counting each row as a screen.** That would mean 21 badges inside one hero, the same failure as
  five tracker screens (§7).
  > Superseded by §12 (2026-10-08) as a reason: no badges. Rows are still not screens.

### 11.9 Consequences

**Good.** One source of prompts on `/`, each traceable to a taxonomy id. The motion cannot carry
the data, hide the badge or announce a score.
> Superseded by §12 (2026-10-08) for "hide the badge": there is none.

**Unpleasant.**
- The hero now ships a timer, against the spirit of R4, under rules the gate can only partly
  verify. The pause and reduced-motion behaviour need a browser test, not a grep.
- "Your firm" read-through risk (§11.3).
- A Claude column claims a Scriblr capability that rests on the operator's statement (CLAUDE.md
  authority block, "Hero tracker run"), not on a capture. If that changes, §11.11 applies.
- The run renders on two templates, so every served-HTML check runs twice (§11.6).
- Hero and Snapshot copy that names four platforms will disagree with a five-column screen. Mira
  and Theo reconcile it. The comment on `Engine` saying it matches the hero panel becomes false, so
  Luke updates the comment and not the type.

### 11.10 Rollback

Delete the three new files. Restore `types.ts`, `index.ts`, `prompt-panel.ts`,
`PromptPanelView.tsx`, `visibility-tracker.ts`, `VisibilityTrackerView.tsx`, `SectorTabs.tsx`,
`components/home/Hero.tsx` and both gate files from `e616b21`. There is no data migration and no URL
change.

### 11.11 What would make this wrong later

- **Ruth, or a prospect on a call, reads "Your firm" as a claim about their firm.** Swap in a
  `SampleBrand` per row. That is a data change; the types already allow it on other screens.
- **Scriblr does not sample Claude.** Drop the column, which sets `RUN_PLATFORMS` to `ENGINES`.
- **`Engine` gains Claude.** `RUN_PLATFORMS` collapses into `ENGINES` and the second list goes.
- **The taxonomy is re-locked with new ids or prompts.** Gate a and b fail, which is correct. Update
  the data.
- **An accessibility complaint about the live region or the motion.** Make autoplay off by default.
  Pause is already required.
- **The hero's client JS crosses the ADR-0005 budget.** Drop the typing reveal before anything else.

---

## 12. No Illustrative label (fourth amendment, 2026-10-08)

- Status: **accepted (operator, 2026-10-08)**. Kyle records it. Mira changes the gates in parallel.
  Owen gates both and checks Mira's change against §12.4.
- **Authority.** CLAUDE.md authority block, "Operator decisions, 2026-10-08 (after the second
  preview)", bullet "No 'Illustrative' label on product screens". It overrides:
  - R3's visible badge (§1);
  - the badge placement in `docs/design/2026-10-visual-upgrade.md` §1.6, and the "Badge" rows in that
    brief's §2 screen tables;
  - the badge rules in §11 (§11.3 third carrier, §11.4 rule 5, §11.6 badge checks);
  - the served-page check "one visible badge per screen".

**Decision.** Product screens render with no visible provenance badge or banner. Every data rule
stays. The disclosure job moves from a label on the screen to a rule on the copy around it (R7).

"Badge and banner" here means the sentence "Illustrative product interface. Sample data, not client
results." and the full-width box that holds it (brief §1.6). Both go.

### 12.1 What is removed

- `components/product-screens/ProvenanceBadge.tsx` is deleted.
- `ProductScreen.tsx` neither imports nor renders a badge.
- The badge sentence appears in no source file and in no served page.
- Every placement rule that existed to protect the badge: never a tooltip, every viewport, top row
  under the title bar, outside `SectorTabs`, outside `[data-run-region]` and `aria-live`.

### 12.2 What stays mandatory

Unchanged by this amendment, and still enforced at compile time or at the gate:

1. **R1.** Never a third-party AI answer. No `answer`, `response` or `provider` field. An assistant
   is a column label only.
2. **R2.** `SampleBrand` is the closed `SAMPLE_BRANDS` union on `${string}.example` domains.
   Qognition is not a member. Every member stays [UNVERIFIED: trading-name check].
3. **`RunTrackedBrand = 'Your firm'`** on the run only, and never added to `SAMPLE_BRANDS` (§11.3).
4. **R6.** No figures. No `number` fields, no score, count, percentage, rank or delta. A future
   figure still comes by amendment with a visible `SAMPLE` label; that label is a figure rule, not
   the screen badge, and §12 does not remove it.
5. **Verbatim prompts.** Gate §11.6 b to d: exact match against the taxonomy's `ai_prompts`, no
   placeholders, no capitalised words.
6. **`provenance: 'illustrative'`** stays a required, single-member union on `ScreenBase`. It is now
   an internal type marker, not a disclosure.
   - It renders only as `figure[data-provenance="illustrative"]`, which the served check uses to
     find screens. A data attribute is not shown to sighted users and is not announced by assistive
     technology, so nobody may cite it as a disclosure.
   - It stays because it is the only thing in code that separates an illustrative screen from the
     deferred captured screen (§9), and widening it is still a reviewed type change.
7. **R4 and §11.4.** No dates, the motion rules, the Pause control, and the title bar and "Sample
   run" label outside the run region.
8. **"Sample run" (`RUN_LABEL`)** stays. It is the run's date substitute under R4, not the
   Illustrative label, and the operator's decision names only the Illustrative label. It is now the
   only on-screen cue, so removing it is a new operator decision and reopens §12 (§12.8).
9. **§2.** Copy never calls a screen a screenshot.
10. **Gate.** §6 checks 1 and 3 to 6, and §11.6 a to k, all stand.

### 12.3 R7. Copy never presents a screen as real

This mattered before. With the badge gone it is the main disclosure left, so it is now a rule.

No copy may present a product screen as a real result, a client's data, or a live run. That covers
the screen's caption and chrome, the section around it, alt and aria text, and any ad, deck, social
post or proposal that reuses the screen.

- **Not a real result.** No wording that makes the screen an observation. CLAUDE.md §4: a real
  observation needs a platform, a date and a prompt set, and a screen carries none of them.
- **Not client data.** No "a client's dashboard", "from a recent engagement", or any line that ties
  the screen to a named or unnamed client.
- **Not a live run, and not about the reader.**
  - Banned in and beside a screen, in any case: "Live", "Scanning", "Checking", "Loading",
    "Real-time" (also "realtime" and "live data"), "screenshot", "your results", "your report",
    "your score".
  - No sentence says the reader's firm is, or is not, named (§11.3).
- **The 2026-10-08 messaging ("AI search is winning") sits next to the hero.** Its fear lines stay
  general ("buyers ask AI who to hire") and never point at the screen as evidence about the reader.
  CLAUDE.md already bars stating "you are invisible" as fact.
- **Allowed:** describing the capability in the present tense, for example "Scriblr records which
  platforms name a firm for each prompt."

**Enforcement.**
- Caption and `CHROME`: the gate. Captions already fail on digits. They now also fail on the banned
  words above. `CHROME` already excludes them (§11.6).
- The surrounding section: the served check (§12.4).
- Everything off the site: Ruth reviews it.

### 12.4 Gate changes

Mira makes these in parallel. Owen checks her change against this list, and does not pass the build
until each item holds.

**`scripts/check-b2b.cjs`, check 7, inverted:**
- `components/product-screens/ProvenanceBadge.tsx` does not exist.
- `ProductScreen.tsx` does not import `ProvenanceBadge`.
- No file under `components/` or `app/` contains the badge sentence or its tail ("product interface.
  Sample data, not client results."). The tail check exists because the component split the sentence
  across two text nodes.
- Every screen `caption` fails on the R7 banned words, case-insensitive and whole-word.

**`scripts/lib/served-screens.mjs`, on `/` and on `/services/ai-seo`:**
- **No badge rendered.** No element on the page has text containing `BADGE_SENTENCE` or its tail, and
  no `figure[data-provenance]` contains the word "Illustrative" in visible text.
- **Screen count unchanged.** `figure[data-provenance]` count equals the registry size. The run
  counts as one figure with no badge.
- **"Tracked brand" outside a figure still fails.** The reason changes: chrome rendered outside a
  figure escapes every per-screen string check.
- **R7 section scan.** For each `figure[data-provenance]`, take its nearest `section` ancestor. That
  section's visible text outside the figure fails on the R7 banned words, case-insensitive and
  whole-word. This one is new. If Mira's parallel change does not include it, it is the next gate
  item, not an optional one.
- Every other §11.6 served check stands: one `[data-run-region]`, 21 `[data-run-row]`, five state
  cells per row, one empty `[aria-live]`, and Pause before the region.
- The `check-served-page.mjs` success line stops reporting "visible badge(s)".

### 12.5 Alternatives

- **Keep the badge.** This was the status quo. The operator removed it after the second preview,
  having been told the hero can then read as real data.
- **A smaller disclosure,** such as a "Sample data" line in the figcaption or a footnote. Not
  adopted: a smaller Illustrative label is still the label the operator removed. It is the first
  fallback if §12.8 fires, and needs an operator decision.
- **Screen-reader-only text.** Rejected. It gives assistive-technology users a disclosure that
  sighted users do not get. A disclaimer hidden on purpose also reads worse if found than a visible
  one, or none.
- **Drop `provenance` as well.** Rejected. It renders nothing, costs nothing, and is the only code
  path that keeps illustrative and captured screens apart (§9).

### 12.6 Consequences

**Good.**
- The hero reads as product, not as a disclaimer.
- One component and its icon import leave the server render. It was a server component, so the
  ADR-0005 client budget does not change.
- Every data rule that made the badge safe to remove is still enforced in code.

**Unpleasant. The operator accepted these risks.**
- **Read as real data.** Without the label, the hero can read as real data about the visitor
  ("Your firm: Not named") or as a client's data. The operator was told this before deciding
  (authority block). This ADR records the risk; it does not mitigate it away.
- **Thinner carriers for "Your firm".** The §11.3 read-through risk now rests on two on-screen
  carriers (never an all-absent row, and "Sample run") plus R7.
- **R7 is mostly enforced by people.** The gate reaches the caption, the chrome and the enclosing
  section on two routes. Ads, decks, social posts and proposals that reuse a screen depend on Ruth.
- **The answer on a call.** When a prospect asks "is this real?", the answer is: an illustrative
  interface with sample data. Nobody may answer otherwise. Rafael's materials need that line.
- **The design brief is stale.** `docs/design/2026-10-visual-upgrade.md` §1.6 and its "Badge"
  rows still specify the badge until the brief's owner marks them superseded. This ADR does not
  edit the brief.
- **Two documents in flight.** Until Owen checks Mira's gate change against §12.4, the ADR and the
  gate may disagree.
- **The capture path loses its contrast (§9).** Before, illustrative and captured screens each
  carried a distinct label. Whether a future capture carries one is an open operator decision for
  that amendment.

### 12.7 Rollback

- Restore `components/product-screens/ProvenanceBadge.tsx` and its import and render in
  `ProductScreen.tsx`.
- Restore check 7 in `scripts/check-b2b.cjs` and the R3 badge checks in
  `scripts/lib/served-screens.mjs` and `scripts/check-served-page.mjs`.
- Source: `786944c`, the last commit containing the badge at the time of writing. Confirm with
  `git log -1 -- components/product-screens/ProvenanceBadge.tsx`.
- If those gate files have changed since, restore the badge blocks by hand rather than checking out
  whole files, or the rollback reverts unrelated gate work.
- Strike the §12 notes above. R3's badge half returns as written.
- R7 stays on rollback. It costs nothing with a badge present.
- There is no data migration and no URL change. The badge took no props, and screen data never
  carried it.

### 12.8 What would make this wrong later

- **Someone reads a screen as real.** One report from a prospect, client, Ruth or Rafael that a
  reader took the hero as their own result or as client data is enough. Take it to the operator
  with the §12.5 smaller disclosure first, then the full rollback.
- **A complaint or ad-platform flag that a page or ad using a screen misrepresents a result.**
  Restore a visible label in that channel at minimum, the same day, and take it to the operator.
- **A relaxation of R2, R4, R6 or §11.3.** Any amendment that allows dates, figures, real brands or
  a named firm on a screen must reopen §12. The missing badge is safe only because those rules hold.
- **"Sample run" is proposed for removal.** It is the last on-screen cue, so reopen §12 first.
- **The capture path (§9) is built.** Decide its label, and whether its presence changes what an
  unlabelled illustrative screen implies.
- **Screens are reused routinely off the site** (ads, decks, social). The gate does not reach
  there. That needs a per-channel label rule, not more Ruth review.
