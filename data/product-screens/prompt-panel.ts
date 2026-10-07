import type { PromptPanelScreen } from './types';

/* Snapshot band, >=1024px only. It points at the tracker's 'msp' tab rather
 * than holding prompts, so the panel and the hero show one fixed set by
 * construction (ADR-0006 §4.2; Ruth, 2026-10-07). */
export const PROMPT_PANEL: PromptPanelScreen = {
  kind: 'prompt-panel',
  id: 'scriblr-prompt-panel',
  product: 'Scriblr',
  provenance: 'illustrative',
  caption: 'Changing any of them needs a recorded reason.',
  sector: 'msp',
};
