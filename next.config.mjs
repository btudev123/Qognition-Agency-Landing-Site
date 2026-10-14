/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: { NEXT_PUBLIC_QOGNITION_PREVIEW: process.env.VERCEL_ENV !== 'production' && (process.env.VERCEL_ENV === 'preview' || process.env.QOGNITION_PREVIEW_MODE === '1') ? '1' : '0' },
  poweredByHeader: false,
  outputFileTracingIncludes: { '/growth/[[...segments]]': ['./data/growth/geography/*.jsonl.gz', './data/growth/geography/manifest.json', './data/growth/geography/global-candidates.json'] },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'ph-files.imgix.net' },
      { protocol: 'https', hostname: 'ph-avatars.imgix.net' },
      { protocol: 'https', hostname: 'api.producthunt.com' }
    ]
  },
  // Anti-framing only (Anton, 2026-10-14). There is no full CSP on this site; do
  // not read this one header as one. frame-ancestors 'self' stops another origin
  // from framing any page (clickjacking on /contact and /book), and
  // X-Frame-Options covers browsers that ignore frame-ancestors.
  // All routes, /studio included: Sanity is configured without the presentation
  // tool or any preview pane, so nothing frames this site, not even itself. If a
  // Sanity presentation tool or the sanity.io dashboard ever needs to frame
  // /studio or a page, scope that route here; do not drop the header.
  // This does not affect the frames we embed (Cal.com, Tally): it governs who may
  // frame us, not what we frame.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
  async redirects() {
    // Retired 4-spoke model → 11-category services taxonomy.
    // 301s preserve link equity (no route deletion). Specific sub-service
    // mappings MUST come before the wildcard hub fallbacks (first match wins).
    const spokeRedirects = [
      // ── Marketing sub-services ──
      { source: '/marketing/seo', destination: '/services/seo', permanent: true },
      { source: '/marketing/ai-seo', destination: '/services/ai-seo', permanent: true },
      { source: '/marketing/paid-media', destination: '/services/ppc', permanent: true },
      { source: '/marketing/content', destination: '/services/content', permanent: true },
      { source: '/marketing/email-lifecycle', destination: '/services/email-automation', permanent: true },
      { source: '/marketing/brand-strategy', destination: '/services/branding-creative', permanent: true },
      { source: '/marketing/visual-identity', destination: '/services/branding-creative/visual-identity', permanent: true },
      { source: '/marketing/cro', destination: '/services/cro-analytics', permanent: true },
      { source: '/marketing/social', destination: '/services/smm', permanent: true },
      { source: '/marketing/audit', destination: '/free-ai-audit', permanent: true },
      // ── Tech sub-services (web-dev survives; rest map to nearest) ──
      { source: '/tech/websites', destination: '/services/web-development', permanent: true },
      { source: '/tech/web-apps', destination: '/services/web-development', permanent: true },
      { source: '/tech/mobile-app-development', destination: '/services/web-development/mobile-app-development', permanent: true },
      { source: '/tech/ecommerce', destination: '/services/web-development/ecommerce-web-design', permanent: true },
      { source: '/tech/nextjs-seo', destination: '/services/web-development/nextjs-seo', permanent: true },
      { source: '/tech/performance', destination: '/services/web-development/web-performance', permanent: true },
      { source: '/tech/integrations', destination: '/services/web-development', permanent: true },
      { source: '/tech/mvp', destination: '/services/web-development', permanent: true },
      { source: '/tech/ai-agents', destination: '/services/email-automation', permanent: true },
      { source: '/tech/audit', destination: '/free-ai-audit', permanent: true },
      // ── Automation sub-services (email-automation survives) ──
      { source: '/automation/workflow-automation', destination: '/services/email-automation', permanent: true },
      { source: '/automation/crm-automation', destination: '/services/email-automation/crm-setup-management', permanent: true },
      { source: '/automation/ai-agents', destination: '/services/email-automation', permanent: true },
      { source: '/automation/integrations', destination: '/services/email-automation', permanent: true },
      { source: '/automation/data-pipelines', destination: '/services/cro-analytics', permanent: true },
      { source: '/automation/no-code-stack', destination: '/services/web-development', permanent: true },
      { source: '/automation/audit', destination: '/free-ai-audit', permanent: true },
      // ── Spoke hubs + wildcard fallbacks (LAST) ──
      { source: '/marketing', destination: '/services', permanent: true },
      { source: '/marketing/:path*', destination: '/services', permanent: true },
      { source: '/tech', destination: '/services/web-development', permanent: true },
      { source: '/tech/:path*', destination: '/services/web-development', permanent: true },
      { source: '/automation', destination: '/services/email-automation', permanent: true },
      { source: '/automation/:path*', destination: '/services/email-automation', permanent: true },
      // Finance fully retired → services hub
      { source: '/finance/audit', destination: '/free-ai-audit', permanent: true },
      { source: '/finance', destination: '/services', permanent: true },
      { source: '/finance/:path*', destination: '/services', permanent: true },
    ];
    return [
      ...spokeRedirects,
      // ── One machine-readable self-description ────────────────────────────
      // /llm.txt was a static file (public/llm.txt) advertised in every page's
      // Link header until 2026-10-06. It drifted from the site (invented offices,
      // prices, the retired spokes). The header now names /llms.txt, which
      // app/llms.txt/route.ts builds from lib/llms.ts, and this sends anything
      // that cached the old address there. permanent: true is a 308.
      // Rollback: delete this entry and restore public/llm.txt.
      { source: '/llm.txt', destination: '/llms.txt', permanent: true },
      // The privacy notice lives at /legal/privacy. These are the addresses people and
      // consent tools guess. permanent: true is a 308.
      { source: '/privacy', destination: '/legal/privacy', permanent: true },
      { source: '/privacy-policy', destination: '/legal/privacy', permanent: true },
      // ── Recovered ranking asset ──────────────────────────────────────────
      // /glossary/ai-seo-and-sge-strategy-audit was deleted from the glossary
      // data but still holds ~1,497 impressions/quarter at avg position 7.9 for
      // "sge seo audits" and "sge ai seo audits" (Search Console, 25 Jun–24 Sep
      // 2026). It currently returns 404, so that demand is being thrown away.
      // Point it at the audit offer, which is the matching intent.
      // TODO: re-point to /audit when the snapshot page ships. Re-point, never
      // chain. Better still, restore a real definitional page at this URL that
      // links to the audit, since the query is informational-commercial.
      {
        source: '/glossary/ai-seo-and-sge-strategy-audit',
        destination: '/free-ai-audit',
        permanent: true
      },
      {
        source: '/glossary/ai-seo-and-sge-strategy-strategy',
        destination: '/free-ai-audit',
        permanent: true
      },
      {
        source: '/locations/usa',
        destination: '/regions/usa',
        permanent: true
      },
      {
        source: '/locations/uk',
        destination: '/regions/uk',
        permanent: true
      },
      {
        source: '/locations/uae-ksa',
        destination: '/regions/uae-ksa',
        permanent: true
      },
      {
        source: '/locations/india',
        destination: '/regions/india',
        permanent: true
      },
      {
        source: '/locations/australia',
        destination: '/regions/australia',
        permanent: true
      },
      {
        source: '/resources/2026-guide-ai-seo-sge',
        destination: '/free-ai-audit',
        permanent: true
      },
      {
        source: '/resources/technical-seo-audit-checklist-nextjs',
        destination: '/free-ai-audit',
        permanent: true
      },
      {
        source: '/resources/free-seo-audit-checklist',
        destination: '/free-ai-audit',
        permanent: true
      },
      {
        source: '/resources/free-seo-audit',
        destination: '/free-ai-audit',
        permanent: true
      },
      {
        source: '/resources/free-ai-audit',
        destination: '/free-ai-audit',
        permanent: true
      },
      {
        source: '/resources/branding-audit',
        destination: '/free-ai-audit',
        permanent: true
      },
      {
        source: '/resources/social-media-audit',
        destination: '/free-ai-audit',
        permanent: true
      },
      {
        source: '/resources/free-llm-audit',
        destination: '/free-ai-audit',
        permanent: true
      },
      // ── Retired standalone audits → single AI Search Visibility Report ──
      {
        source: '/free-seo-audit',
        destination: '/free-ai-audit',
        permanent: true
      },
      {
        source: '/free-llm-audit',
        destination: '/free-ai-audit',
        permanent: true
      },
      {
        source: '/branding-audit',
        destination: '/free-ai-audit',
        permanent: true
      },
      {
        source: '/social-media-audit',
        destination: '/free-ai-audit',
        permanent: true
      }
    ];
  }
};

export default nextConfig;
