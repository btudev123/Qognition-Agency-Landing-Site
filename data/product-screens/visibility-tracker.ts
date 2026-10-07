import { ENGINES, type Engine } from '../../lib/b2b/observations';
import type { MentionState, VisibilityTrackerRow, VisibilityTrackerScreen } from './types';

/* The hero tracker: one screen, five sector tabs (ADR-0006 §4.2, brief §3.1).
 *
 * Prompts are the HeroSnapshotPanel strings with Ruth's 2026-10-07
 * replacements: no real company or product names, and SaaS prompts that fit
 * one tracked brand. Cell patterns are the brief's, in column order ChatGPT,
 * Perplexity, Gemini, Google AI Overviews. N is named, '-' is not named.
 * No row is all N (gate). Sample data: no dates (R4), no numbers (R6). */

const COLUMNS: readonly Engine[] = ENGINES;

/** 'N-N-' to a full Record<Engine, MentionState>. Every column is filled. */
function states(pattern: string): Readonly<Record<Engine, MentionState>> {
  const out = {} as Record<Engine, MentionState>;
  COLUMNS.forEach((engine, i) => {
    out[engine] = pattern[i] === 'N' ? 'mentioned' : 'absent';
  });
  return out;
}

const row = (
  prompt: string,
  pattern: string,
  sourcesCited: VisibilityTrackerRow['sourcesCited'],
): VisibilityTrackerRow => ({ prompt, states: states(pattern), sourcesCited });

export const VISIBILITY_TRACKER: VisibilityTrackerScreen = {
  kind: 'visibility-tracker',
  id: 'scriblr-visibility-tracker',
  product: 'Scriblr',
  provenance: 'illustrative',
  caption: 'Every answer is stored with its prompt, platform, date and cited sources.',
  tabs: [
    {
      sector: 'saas',
      label: 'B2B SaaS',
      brand: 'Ondrell Software',
      domain: 'ondrell.example',
      rows: [
        row('Compare compliance automation platforms for a first SOC 2 audit', 'N-N-', ['review-site', 'own-site']),
        row('Which compliance platforms support our existing identity provider?', '---N', ['own-site']),
        row('What should a mid-market security team check before switching compliance platforms?', 'NN--', ['trade-publication', 'review-site']),
      ],
    },
    {
      sector: 'manufacturing',
      label: 'Manufacturing',
      brand: 'Thornbury Precision',
      domain: 'thornbury-precision.example',
      rows: [
        row('Find ISO 9001 and AS9100 certified CNC machining suppliers in the Midwest', '-N--', ['directory', 'association']),
        row('Which contract manufacturers handle low-volume medical device parts?', 'N--N', ['trade-publication']),
        row('Compare injection molding vendors with ITAR registration', '--N-', ['directory', 'own-site']),
      ],
    },
    {
      sector: 'legal',
      label: 'Legal',
      brand: 'Corran & Whitlow',
      domain: 'corranwhitlow.example',
      rows: [
        row('Best commercial litigation firms for mid-market SaaS disputes', 'N---', ['directory']),
        row('Which law firms specialize in cross-border M&A under $50M?', '-NN-', ['trade-publication', 'own-site']),
        row('Employment counsel with experience defending WARN Act claims', '---N', ['association']),
      ],
    },
    {
      sector: 'msp',
      label: 'IT and MSP',
      brand: 'Pellman IT Group',
      domain: 'pellman-it.example',
      rows: [
        row('Managed security providers with SOC 2 Type II and 24/7 SOC coverage', '--NN', ['review-site', 'own-site']),
        row('Which MSPs support EHR environments for regional hospital systems?', 'N---', ['trade-publication']),
        row('Compare co-managed IT providers for 200-seat manufacturers', '-N-N', ['directory', 'review-site']),
      ],
    },
    {
      sector: 'logistics',
      label: 'Logistics',
      brand: 'Harbour & Vane',
      domain: 'harbourvane.example',
      rows: [
        row('Third-party logistics providers with FDA-registered cold chain warehousing', '-NN-', ['directory', 'own-site']),
        row('Which freight brokers handle oversize project cargo into Latin America?', '--N-', ['trade-publication']),
        row('Compare 3PLs offering EDI integration with our ERP', 'N---', ['review-site']),
      ],
    },
  ],
};
