import type { MentionState, SourceType } from '../../data/product-screens/types';

/* ADR-0006 §4.3 and §11. Display-only constants. Not data: no screen field holds them.
 * Every string here is on the served-screen allowlist (scripts/lib/served-screens.mjs),
 * so adding one is a reviewed change. Never add "Live", "Scanning", "Checking",
 * "Loading" or "Real-time" (§11.4.2). */

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
export const RUN_LABEL = 'Sample run';
export const SOURCES_CITED_LABEL = 'Sources cited:';

/** Tracker run chrome (§11). */
export const TRACKED_LABEL = 'Tracking';
export const BREADCRUMB_SEPARATOR = '▸';
export const RUN_CONTROL_LABEL = {
  pause: 'Pause',
  play: 'Play',
  previous: 'Previous',
  next: 'Next',
  /** Prefix of each progress segment's name: "Show" + the industry name, via aria-labelledby. */
  show: 'Show',
  segments: 'Industries',
} as const;
