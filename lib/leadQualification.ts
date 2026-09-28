import type { LeadPayload } from './validation';

export const QUALIFICATION_VERSION = '2026-09-b2b-v2';

/** Eligibility for human follow-up, never a sales-accepted lifecycle stage. */
export function qualifyLead(lead: LeadPayload) {
  const q = lead.qualification;
  const reasons: string[] = [];
  const missing: string[] = [];
  const highIntent = ['consultation', 'pricing', 'audit'].includes(lead.intent);
  const b2b = q?.business_model === 'b2b';
  const company = Boolean(lead.contact.company_url);
  /* Bands are tested by EXCLUSION, not by an allowlist.
   *
   * These two lines used to read:
   *     ['20-99', '100-300'].includes(...)
   *     ['3m-10m', '10m-50m', '50m-500m'].includes(...)
   *
   * which silently omitted '301+' and 'over-500m'. Both are valid enum values in
   * lib/validation.ts, and under the ICP locked on 2026-09-28 (CLAUDE.md §2:
   * $3M to $1B+, 20 to 10,000+ staff) both are squarely inside the band. A firm
   * answering "301+ staff, over $500M revenue" is a LARGER client than one
   * answering "100-300", and it was being graded below it. §2 also says firms
   * above the band stay eligible and route to a qualification call, so the old
   * allowlist contradicted the file it was meant to implement.
   *
   * Written as an exclusion so that widening the band again cannot silently
   * reintroduce the bug: a new enum value is in-ICP by default, and only the
   * bands §2 actually disqualifies are named here. The disqualifiers in §2 are
   * "pre-revenue" and firms below the floor, which is what these two lists are.
   *
   * 'unknown' does not qualify. Absence of an answer is not evidence of fit, and
   * grading it as fit would make the whole test decorative. */
  const OUT_OF_BAND_SIZE = ['1-19'];
  const OUT_OF_BAND_REVENUE = ['under-3m'];
  const size =
    Boolean(q?.employee_band) &&
    q?.employee_band !== 'unknown' &&
    !OUT_OF_BAND_SIZE.includes(q?.employee_band || '');
  const revenue =
    Boolean(q?.revenue_band) &&
    q?.revenue_band !== 'unknown' &&
    !OUT_OF_BAND_REVENUE.includes(q?.revenue_band || '');
  if (b2b) reasons.push('B2B business'); else missing.push('B2B fit');
  if (company) reasons.push('Company website supplied'); else missing.push('Company website');
  if (size || revenue) reasons.push('Company size fits the stated ICP'); else missing.push('Company size or revenue');
  if (highIntent) reasons.push('Requested a service conversation or audit');
  if (!highIntent) missing.push('Service-related buying intent');
  return {
    version: QUALIFICATION_VERSION,
    eligibility: b2b && company && (size || revenue) && highIntent ? 'MQL' as const : 'Lead' as const,
    reasons,
    missing,
    review_required: true,
  };
}
