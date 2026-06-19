/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'ph-files.imgix.net' },
      { protocol: 'https', hostname: 'ph-avatars.imgix.net' },
      { protocol: 'https', hostname: 'api.producthunt.com' }
    ]
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
      { source: '/marketing/audit', destination: '/free-seo-audit', permanent: true },
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
      { source: '/tech/audit', destination: '/free-seo-audit', permanent: true },
      // ── Automation sub-services (email-automation survives) ──
      { source: '/automation/workflow-automation', destination: '/services/email-automation', permanent: true },
      { source: '/automation/crm-automation', destination: '/services/email-automation/crm-setup-management', permanent: true },
      { source: '/automation/ai-agents', destination: '/services/email-automation', permanent: true },
      { source: '/automation/integrations', destination: '/services/email-automation', permanent: true },
      { source: '/automation/data-pipelines', destination: '/services/cro-analytics', permanent: true },
      { source: '/automation/no-code-stack', destination: '/services/web-development', permanent: true },
      { source: '/automation/audit', destination: '/free-seo-audit', permanent: true },
      // ── Spoke hubs + wildcard fallbacks (LAST) ──
      { source: '/marketing', destination: '/services', permanent: true },
      { source: '/marketing/:path*', destination: '/services', permanent: true },
      { source: '/tech', destination: '/services/web-development', permanent: true },
      { source: '/tech/:path*', destination: '/services/web-development', permanent: true },
      { source: '/automation', destination: '/services/email-automation', permanent: true },
      { source: '/automation/:path*', destination: '/services/email-automation', permanent: true },
      // Finance fully retired → services hub
      { source: '/finance', destination: '/services', permanent: true },
      { source: '/finance/:path*', destination: '/services', permanent: true },
    ];
    return [
      ...spokeRedirects,
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
        destination: '/free-seo-audit',
        permanent: true
      },
      {
        source: '/resources/free-seo-audit-checklist',
        destination: '/free-seo-audit',
        permanent: true
      },
      {
        source: '/resources/free-seo-audit',
        destination: '/free-seo-audit',
        permanent: true
      },
      {
        source: '/resources/free-ai-audit',
        destination: '/free-ai-audit',
        permanent: true
      },
      {
        source: '/resources/branding-audit',
        destination: '/branding-audit',
        permanent: true
      },
      {
        source: '/resources/social-media-audit',
        destination: '/social-media-audit',
        permanent: true
      },
      {
        source: '/resources/free-llm-audit',
        destination: '/free-llm-audit',
        permanent: true
      }
    ];
  }
};

export default nextConfig;
