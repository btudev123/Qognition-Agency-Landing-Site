/** Explicit, reviewed exceptions. All other legacy URLs retain their existing indexing. */
export const LEGACY_REVIEWS: Record<string, { indexable: boolean; reviewedAt: string; reason: string }> = {
  '/free-llm-audit': { indexable: false, reviewedAt: '2026-09-24', reason: 'Same review offer and component as /free-ai-audit; URL remains accessible for existing links.' },
};
export function isLegacyIndexable(path: string) { return LEGACY_REVIEWS[path]?.indexable !== false; }
export function isExistingRedirect(path: string) {
  return /^\/(marketing|tech|finance|automation)(\/|$)/.test(path)
    || ['/locations/usa','/locations/uk','/locations/uae-ksa','/locations/india','/locations/australia', '/resources/2026-guide-ai-seo-sge','/resources/technical-seo-audit-checklist-nextjs','/resources/free-seo-audit-checklist','/resources/free-seo-audit','/resources/free-ai-audit','/resources/branding-audit','/resources/social-media-audit','/resources/free-llm-audit','/free-seo-audit','/free-llm-audit','/branding-audit','/social-media-audit'].includes(path);
}
