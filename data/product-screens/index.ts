import type { ProductScreenRegistry } from './types';
import { VISIBILITY_TRACKER } from './visibility-tracker';
import { PROMPT_PANEL } from './prompt-panel';

export * from './types';
export { SAMPLE_BRANDS, type SampleBrand, type SampleDomain } from './sample-entities';

/** The only place a component takes a screen from (ADR-0006 R5). */
export const PRODUCT_SCREENS: ProductScreenRegistry = {
  'scriblr-visibility-tracker': VISIBILITY_TRACKER,
  'scriblr-prompt-panel': PROMPT_PANEL,
};
