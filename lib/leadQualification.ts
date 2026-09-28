import type { LeadPayload } from './validation';

export const QUALIFICATION_VERSION = '2026-09-b2b-v1';

/** Eligibility for human follow-up, never a sales-accepted lifecycle stage. */
export function qualifyLead(lead: LeadPayload) {
  const q = lead.qualification;
  const reasons: string[] = [];
  const missing: string[] = [];
  const highIntent = ['consultation', 'pricing', 'audit'].includes(lead.intent);
  const b2b = q?.business_model === 'b2b';
  const company = Boolean(lead.contact.company_url);
  const size = ['20-99', '100-300'].includes(q?.employee_band || '');
  const revenue = ['3m-10m', '10m-50m', '50m-500m'].includes(q?.revenue_band || '');
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
