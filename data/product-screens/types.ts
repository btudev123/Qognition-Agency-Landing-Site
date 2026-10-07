/* ADR-0006 §4.2 (second amendment, 2026-10-07). */
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

/** Stored state. Displayed through MENTION_LABEL: cited and mentioned both show "Named". */
export type MentionState =
  | 'cited' // named, and its .example domain cited
  | 'mentioned' // named, not cited
  | 'absent'; // not named

/** Closed. Displayed through SOURCE_TYPE_LABEL. */
export type SourceType =
  | 'own-site' // only on a row with at least one cited or mentioned state (gate)
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
  /** Renders this tracker tab's brand, domain and prompts. No prompt data of its own. */
  readonly sector: TrackerSector;
}

export type ProductScreen = VisibilityTrackerScreen | PromptPanelScreen;

/** Key and id cannot disagree. */
export type ProductScreenRegistry = {
  readonly [K in ScreenId]: Extract<ProductScreen, { id: K }>;
};
