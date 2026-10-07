/* ADR-0006 §4.2 (second amendment) and §11.2 (third amendment, the tracker run, 2026-10-07). */
import type { Engine } from '../../lib/b2b/observations';

/** The in-house engines nameable on the site. CLAUDE.md §1. */
export type ProductName = 'Scriblr' | 'LinkersPro' | 'M.A.R.S.';

/** Closed. One member per built screen. */
export type ScreenId = 'scriblr-tracker-run' | 'scriblr-prompt-panel';

/** Single-member on purpose. Widening it is a reviewed type change. */
export type Provenance = 'illustrative';

/**
 * Column order. Engine plus exactly Claude. Run and panel only (ADR-0006 §11.2).
 * `Engine` is not widened: it is the observation pipeline's claim about where we sample.
 */
export const RUN_PLATFORMS = ['ChatGPT', 'Perplexity', 'Gemini', 'Claude', 'Google AI Overviews'] as const;
export type RunPlatform = (typeof RUN_PLATFORMS)[number];
/** Fails to compile if Engine gains a member the run lacks. */
const ENGINE_IN_RUN: Engine extends RunPlatform ? true : never = true;
void ENGINE_IN_RUN;

/** Stored state. Displayed through MENTION_LABEL: cited and mentioned both show "Named". */
export type MentionState =
  | 'cited' // named, with the firm's own site among the sources
  | 'mentioned' // named, own site not cited
  | 'absent'; // not named

/** Closed. Displayed through SOURCE_TYPE_LABEL. */
export type SourceType =
  | 'own-site' // run: present if and only if some state is 'cited' (gate)
  | 'directory'
  | 'trade-publication'
  | 'review-site'
  | 'association';

/** Generic placeholder. Names no entity, has no domain. Not a SampleBrand (§11.3). */
export type RunTrackedBrand = 'Your firm';

export type RunSources =
  | readonly [SourceType]
  | readonly [SourceType, SourceType]
  | readonly [SourceType, SourceType, SourceType];

interface ScreenBase {
  readonly id: ScreenId;
  readonly product: ProductName;
  /** One line, present tense. No digits, no '%'. */
  readonly caption: string;
  readonly provenance: Provenance;
}

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

/** Key and id cannot disagree. */
export type ProductScreenRegistry = {
  readonly [K in ScreenId]: Extract<ProductScreen, { id: K }>;
};
