import { formatCount, formatWindow } from './case-studies/b2b';
import { getB2BCaseStudy } from './case-studies';

/**
 * Third-party figures and named-client proof lines, cleared by Ruth on 2026-10-08
 * (docs/copy/2026-10/ai-search-is-winning.md §1 F2, D2, D-PROOF). One home, so a
 * figure cannot drift from its source between two pages.
 *
 * G2 rules, all from the gate:
 *   - The wording is the report's own. Never shorten "start their software research
 *     with an AI chatbot more often than Google" to "B2B buyers start with AI".
 *   - Scope is software buying. G2 is named in the sentence every time.
 *   - "One in three" and the 2025 29% figure are declined. Do not add them here.
 *   - Before production a human matches these strings on the report page in a
 *     browser. That blocks production, not preview.
 */
export type ExternalSource = { href: string; label: string };

export const G2_ANSWER_ECONOMY: ExternalSource = {
  href: 'https://learn.g2.com/g2-2026-ai-search-insight-report',
  label: 'Source: G2, "The Answer Economy"',
};

/** F2. Used on `/` (BuyingProblem) and `/services/ai-seo` (whyNow). */
export const G2_SOFTWARE_RESEARCH =
  "In G2's survey of 1,076 B2B decision-makers, fielded in March 2026 and published 15 April 2026, 51% said they start their software research with an AI chatbot more often than Google.";

/** D2. Used on `/services/ai-seo` (whyNow) only, and only after F2. */
export const G2_DIFFERENT_VENDOR =
  'In the same survey, 69% said that an AI chatbot led them to select a different software vendor than initially planned.';

/**
 * D-PROOF, homepage. The figures and dates come from the Brixio record, so the line
 * cannot disagree with the case study it links to. The service mix ("AI SEO, GEO,
 * content and outreach") is named in the sentence: the D1 attribution rule forbids
 * crediting the leads to one service. Never rendered inside the hero <section>
 * (Ruth, 2026-10-08; ADR-0006 §12.3, §12.6).
 *
 * Renders: "Brixio, UAE: 92 qualified leads and 9 sales opportunities, 3 March to
 * 21 September 2026, from AI SEO, GEO, content and outreach. Confirmed by Brixio's
 * own reporting."
 */
export function brixioProof(): { text: string; href: string } | null {
  const s = getB2BCaseStudy('brixio');
  // An open window would print "From <date>", which is not the cleared sentence. Omit, never approximate.
  if (!s || !s.window.end) return null;
  const leads = s.results['qualified-leads'];
  const opps = s.results.opportunities;
  return {
    text:
      `${s.client}, UAE: ${formatCount(leads)} qualified leads and ${formatCount(opps)} sales opportunities, ` +
      `${formatWindow(s)}, from AI SEO, GEO, content and outreach. Confirmed by ${s.client}'s own reporting.`,
    href: `/case-studies/${s.id}`,
  };
}
