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
    return [
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
