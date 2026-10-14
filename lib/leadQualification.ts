import type { LeadPayload } from './validation';

export const QUALIFICATION_VERSION = '2026-10-b2b-v4';

/**
 * Eligibility for human follow-up, never a sales-accepted lifecycle stage.
 *
 * v4, operator 2026-10-14. Every lead now arrives through the five-field /contact form
 * (name, work email, company website, "What do you want help with?", company size), so
 * the score uses only what that form asks. The v3 rule needed business_model === 'b2b'
 * and intent 'consultation' or 'pricing'; the form asks neither and /contact posts
 * intent 'contact', so under v3 no /contact lead could ever be an MQL.
 *
 * MQL = company website + in-band company size + a message + a service request
 * (any intent except newsletter), unless the visitor said outright they are B2C.
 * Fields the form no longer asks are never counted against a lead: an absent or
 * 'unknown' business model is neutral, and revenue only ever helps (older clients).
 */
export function qualifyLead(lead: LeadPayload) {
  const q = lead.qualification;
  const reasons: string[] = [];
  const missing: string[] = [];
  const serviceRequest = lead.intent !== 'newsletter';
  // §2 disqualifies B2C. Only a stated 'b2c' counts; silence is not evidence either way.
  const statedB2c = q?.business_model === 'b2c';
  const company = Boolean(lead.contact.company_url);
  const message = Boolean(lead.contact.message?.trim() || q?.objective?.trim());
  /* Bands are tested by EXCLUSION, not by an allowlist.
   *
   * An earlier allowlist (['20-99', '100-300'], ['3m-10m', '10m-50m', '50m-500m'])
   * silently omitted '301+' and 'over-500m', both inside the ICP locked on 2026-09-28
   * (CLAUDE.md §2: $3M to $1B+, 20 to 10,000+ staff), and graded the larger firm below
   * the smaller one. As an exclusion, a new enum value is in-ICP by default and only the
   * bands §2 disqualifies (below the floor) are named here.
   *
   * 'unknown' does not qualify. Absence of an answer is not evidence of fit. */
  const OUT_OF_BAND_SIZE = ['1-19'];
  const OUT_OF_BAND_REVENUE = ['under-3m'];
  const inBand = (value: string | undefined, out: string[]) => Boolean(value) && value !== 'unknown' && !out.includes(value!);
  const size = inBand(q?.employee_band, OUT_OF_BAND_SIZE);
  // Revenue is no longer asked. A cached older client that still sends it can only gain fit from it.
  const revenue = inBand(q?.revenue_band, OUT_OF_BAND_REVENUE);
  if (company) reasons.push('Company website supplied'); else missing.push('Company website');
  if (size || revenue) reasons.push('Company size fits the stated ICP'); else missing.push('Company size');
  if (message) reasons.push('Said what they want help with'); else missing.push('What they want help with');
  if (serviceRequest) reasons.push('Requested a service conversation'); else missing.push('Service-related buying intent');
  if (q?.business_model === 'b2b') reasons.push('B2B business');
  if (statedB2c) missing.push('B2B fit');
  return {
    version: QUALIFICATION_VERSION,
    eligibility: company && (size || revenue) && message && serviceRequest && !statedB2c ? 'MQL' as const : 'Lead' as const,
    reasons,
    missing,
    review_required: true,
  };
}
