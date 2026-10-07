import type { MentionState, SourceType } from '../../data/product-screens/types';

/* ADR-0006 §4.3. Display-only constants. Not data: no screen field holds them. */

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
