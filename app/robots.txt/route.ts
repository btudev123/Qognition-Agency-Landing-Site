import { SITE_URL } from '../../lib/seo';

export const dynamic = 'force-static';

const sitemapUrls = [
  `${SITE_URL}/sitemap.xml`,
  `${SITE_URL}/sitemaps/services.xml`,
  `${SITE_URL}/sitemaps/resources.xml`,
  `${SITE_URL}/sitemaps/glossary.xml`,
  `${SITE_URL}/sitemaps/directory.xml`,
  `${SITE_URL}/sitemaps/case-studies.xml`,
  `${SITE_URL}/sitemaps/tools.xml`,
  `${SITE_URL}/sitemaps/global.xml`,
  `${SITE_URL}/sitemaps/languages.xml`
];

export function GET() {
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    '',
    'User-agent: Googlebot',
    'Allow: /',
    'Disallow: /api/',
    '',
    'User-agent: Bingbot',
    'Allow: /',
    'Disallow: /api/',
    '',
    'User-agent: GPTBot',
    'Allow: /',
    'Disallow: /api/',
    '',
    'User-agent: CCBot',
    'Allow: /',
    'Disallow: /api/',
    '',
    'User-agent: Google-Extended',
    'Allow: /',
    'Disallow: /api/',
    '',
    'User-agent: ClaudeBot',
    'Allow: /',
    'Disallow: /api/',
    '',
    'User-agent: PerplexityBot',
    'Allow: /',
    'Disallow: /api/',
    '',
    'Content-Signal: ai-train=no, search=yes, ai-input=yes',
    '',
    `Host: ${SITE_URL}`,
    ...sitemapUrls.map((url) => `Sitemap: ${url}`),
    ''
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
