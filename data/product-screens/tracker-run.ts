import { RUN_PLATFORMS, type MentionState, type RunPlatform, type TrackerRunRow, type TrackerRunScreen } from './types';

/* The hero's prompt run: one row per locked ICP industry, in taxonomy order
 * (operator, 2026-10-07; ADR-0006 §11).
 *
 * Each prompt is copied verbatim from that sub-industry's `ai_prompts` in
 * data/b2b/icp/icp-taxonomy.json. scripts/check-b2b.cjs re-checks every one with
 * an exact `===`, and fails any [placeholder] or capitalised word (a likely brand
 * or place). Names are not stored here: the view renders the industry and
 * sub-industry names from the taxonomy by id, so there is no second copy.
 *
 * Pattern columns follow RUN_PLATFORMS: ChatGPT, Perplexity, Gemini, Claude,
 * Google AI Overviews. C = named with own site cited, N = named, - = not named.
 * Every row has at least one of each, no two rows name the firm on the same set
 * of platforms, and 'own-site' appears exactly on the rows with a C (gate).
 *
 * Sample data: no dates (R4), no authored numbers (R6). */

function states(pattern: string): Readonly<Record<RunPlatform, MentionState>> {
  const out = {} as Record<RunPlatform, MentionState>;
  RUN_PLATFORMS.forEach((platform, i) => {
    out[platform] = pattern[i] === 'C' ? 'cited' : pattern[i] === 'N' ? 'mentioned' : 'absent';
  });
  return out;
}

const row = (
  industryId: string,
  subIndustryId: string,
  prompt: string,
  pattern: string,
  sourcesCited: TrackerRunRow['sourcesCited'],
): TrackerRunRow => ({ industryId, subIndustryId, prompt, states: states(pattern), sourcesCited });

export const TRACKER_RUN: TrackerRunScreen = {
  kind: 'tracker-run',
  id: 'scriblr-tracker-run',
  product: 'Scriblr',
  provenance: 'illustrative',
  caption: 'A sample run: one buyer question per industry, on five AI platforms. In a real run, every answer carries its date and the sources it cited.',
  trackedBrand: 'Your firm',
  rows: [
    row('01', '01.06', 'best AP automation software that integrates with a mid-market ERP', 'C-N--', ['own-site', 'review-site']),
    row('02', '02.06', 'who does quality of earnings reports for lower middle market deals', '-N-N-', ['trade-publication', 'association']),
    row('03', '03.13', 'medical waste disposal companies for multi-site clinics', '--C-N', ['directory', 'own-site', 'trade-publication']),
    row('04', '04.05', 'best commercial insurance broker for a mid-size manufacturing company', 'N-NN-', ['review-site']),
    row('05', '05.07', 'ASME pressure vessel fabricator for stainless process tanks', '-C--N', ['directory', 'own-site']),
    row('06', '06.03', 'which heavy haul carriers can move a 150-ton transformer across state lines', 'N-N-N', ['directory', 'review-site']),
    row('07', '07.08', 'top healthcare architecture firms for a new outpatient center', '---N-', ['trade-publication']),
    row('08', '08.02', 'best battery storage integrators for commercial peak shaving', '-NC--', ['own-site', 'trade-publication', 'association']),
    row('09', '09.02', 'best managed detection and response for mid-market companies with a 24/7 SOC', 'C--NN', ['review-site', 'own-site']),
    row('10', '10.06', 'onsite forklift certification training for a multi-site warehouse operator', '--N--', ['review-site', 'trade-publication']),
    row('11', '11.05', 'best travel management company for a 500-employee company', 'NN-N-', ['directory']),
    row('12', '12.12', 'co-packer for high-protein bars with low minimums and SQF certification', '-N---', ['directory', 'association']),
    row('13', '13.05', 'best corporate video production company for a manufacturing brand film', 'N--C-', ['own-site', 'review-site']),
    row('14', '14.06', 'grant writing firm for a city applying for federal infrastructure funding', '----N', ['directory', 'association']),
    row('15', '15.01', 'best AI consulting firm for a mid-market manufacturer', '-N-NN', ['trade-publication', 'review-site']),
    row('16', '16.02', 'landing gear overhaul provider with the fastest turnaround for regional jets', '--NN-', ['directory', 'trade-publication', 'association']),
    row('17', '17.10', 'best service body manufacturers for utility fleets', 'CN---', ['own-site', 'directory']),
    row('18', '18.05', 'who does quarterly and annual sprinkler inspections plus deficiency repairs for hospitals', '---NN', ['review-site']),
    row('19', '19.10', 'who offers on-site GMP calibration for a pharmaceutical plant', '-CN-N', ['own-site', 'directory', 'association']),
    row('20', '20.03', 'best custom retail fixture manufacturers for a 200-store rollout', 'NN--N', ['trade-publication', 'directory']),
    row('21', '21.16', 'best firm to manage new unit openings for a franchise system', 'N---N', ['association', 'trade-publication']),
  ],
};
