import { z } from 'zod';

export const spokeSchema = z.enum([
  'marketing',
  'tech',
  'finance',
  'automation',
  'unsure',
]);

export const intentSchema = z.enum([
  'audit',
  'consultation',
  'pricing',
  'contact',
  'newsletter',
]);

const normalizeCompanyUrl = (value: unknown) => {
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  if (!trimmed) return '';
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120),
  email: z.string().trim().email('Valid email required').max(254),
  company: z.string().max(200).optional(),
  company_url: z.preprocess(
    normalizeCompanyUrl,
    z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  ),
  phone: z.string().max(30).optional(),
  message: z.string().max(5000).optional(),
});

export const utmSchema = z
  .object({
    source: z.string().max(200).optional(),
    medium: z.string().max(200).optional(),
    campaign: z.string().max(200).optional(),
    term: z.string().max(200).optional(),
    content: z.string().max(200).optional(),
  })
  .optional();

export const leadSchema = z.object({
  service: spokeSchema,
  intent: intentSchema,
  source_page: z.string().min(1).max(500),
  utm: utmSchema,
  contact: contactSchema,
  /** CRM tag, e.g. "lead magnet for ai readiness". Falls back to a funnel-derived tag. */
  tag: z.string().max(120).optional(),
  /**
   * Meta deduplication key. The browser pixel fires `Lead` with this as its
   * `eventID` and the server fires the same `Lead` with it as `event_id`, so
   * Meta counts the conversion once instead of twice. Optional: a visitor with
   * JS-blocked tags still submits, their event just won't have a browser twin.
   */
  event_id: z.string().max(64).optional(),
  submission_id: z.string().min(8).max(80).regex(/^[a-zA-Z0-9_-]+$/).optional(),
  context: z.object({
    locale: z.enum(['en', 'de', 'fr', 'nl', 'sv', 'da', 'nb', 'fi', 'ar', 'it', 'zh-Hans']).optional(),
    stage: z.enum(['tofu', 'mofu', 'bofu']).optional(),
    page_id: z.string().max(240).optional(),
    pillar: z.enum(['ai-search', 'demand', 'abm', 'revenue-systems']).optional(),
    service_id: z.string().max(100).optional(),
    industry_id: z.string().max(100).optional(),
    subindustry_id: z.string().max(100).optional(),
    niche_id: z.string().max(100).optional(),
    subniche_id: z.string().max(100).optional(),
    country_id: z.string().max(100).optional(),
    region_id: z.string().max(100).optional(),
    city_id: z.string().max(100).optional(),
    asset_id: z.string().max(100).optional(),
  }).optional(),
  qualification: z.object({
    business_model: z.enum(['b2b', 'b2c', 'mixed', 'unknown']).optional(),
    role: z.string().max(120).optional(),
    employee_band: z.enum(['1-19', '20-99', '100-300', '301+', 'unknown']).optional(),
    revenue_band: z.enum(['under-3m', '3m-10m', '10m-50m', '50m-500m', 'over-500m', 'unknown']).optional(),
    revenue_basis: z.enum(['annual-revenue', 'arr', 'unknown']).optional(),
    objective: z.string().max(1000).optional(),
    timeframe: z.enum(['now', '1-3-months', '3-6-months', 'researching']).optional(),
  }).optional(),
  consent: z.object({
    email_marketing: z.boolean(),
    analytics: z.boolean(),
    advertising: z.boolean(),
    policy_version: z.string().min(1).max(50),
    /** When the visitor made the cookie choice; empty when no choice was made and the region default applied. */
    recorded_at: z.union([z.string().datetime(), z.literal('')]),
    /** Optional for older clients. Absent is treated as a region default, never as explicit. */
    basis: z.enum(['explicit', 'region_default']).optional(),
  }).optional(),
  attribution: z.object({
    first_touch: utmSchema,
    last_touch: utmSchema,
    landing_page: z.string().max(500).optional(),
    referrer_host: z.string().max(250).optional(),
  }).optional(),
  honeypot: z.preprocess(
    (value) => {
      if (typeof value !== 'string') return undefined;
      return value.trim() === '' ? undefined : value;
    },
    z.string().max(500).optional(),
  ),
  metadata: z
    .object({
      spoke_visited_first: z.string().max(50).optional(),
      pages_viewed: z.number().int().positive().optional(),
      time_on_site: z.number().int().positive().optional(),
      referrer: z.string().max(500).optional(),
    })
    .optional(),
});

export type LeadPayload = z.infer<typeof leadSchema>;

/**
 * Consent evidence the server derives itself (country from x-vercel-ip-country, the Sec-GPC
 * header). Never part of the client payload, so it is not in the submission digest either.
 */
export type ServerConsentEvidence = { basis: 'explicit' | 'region_default' | 'unknown'; country: string | null; gpc: boolean };
export type ContactPayload = z.infer<typeof contactSchema>;
export type SpokeId = z.infer<typeof spokeSchema>;
export type LeadIntent = z.infer<typeof intentSchema>;
