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
  email: z.string().email('Valid email required').max(254),
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
export type ContactPayload = z.infer<typeof contactSchema>;
export type SpokeId = z.infer<typeof spokeSchema>;
export type LeadIntent = z.infer<typeof intentSchema>;
