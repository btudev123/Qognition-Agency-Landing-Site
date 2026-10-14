import { isAuditRequest, readFunnelContext, type FunnelContext } from './funnelContext';
import { resolveLeadLocale, type LeadLocale } from './leadCopy';

/** Everything /contact derives from its query string, in one place, so the page and
 *  scripts/check-funnel.cjs render the form through the same props. A translated page
 *  links here as /contact?locale=de; the locale is passed through so the form, its
 *  confirmation email and the GHL record use it (Owen F1, 2026-10-14). */
export function contactFormProps(query: Record<string, string | string[] | undefined>): {
  audit: boolean;
  intent: 'audit' | 'contact';
  locale: LeadLocale;
  context: (FunnelContext & { locale: LeadLocale }) | undefined;
} {
  const values = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) if (typeof value === 'string') values.set(key, value);
  const incoming = readFunnelContext(values);
  const locale = resolveLeadLocale(incoming?.locale);
  const context = incoming ? { ...incoming, locale } : undefined;
  // Free AI visibility audit requests arrive tagged asset_id=free-ai-visibility-audit.
  const audit = isAuditRequest(context);
  return { audit, intent: audit ? 'audit' : 'contact', locale, context };
}
