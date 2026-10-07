import type { PromptPanelScreen } from './types';

/* Snapshot band, >=1024px only. It points at run rows by industry id rather than
 * holding prompts, so the panel and the hero show the same fixed prompts by
 * construction (ADR-0006 §11.2). Technology and IT services first, as the
 * panel's earlier IT and MSP set was; not insurance, because the Evidence band on
 * the same page shows real insurance clients (Ruth, 2026-10-07). */
export const PROMPT_PANEL: PromptPanelScreen = {
  kind: 'prompt-panel',
  id: 'scriblr-prompt-panel',
  product: 'Scriblr',
  provenance: 'illustrative',
  caption: 'Changing any of them needs a recorded reason.',
  industryIds: ['09', '01', '05'],
};
