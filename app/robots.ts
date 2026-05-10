import type { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/']
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'Google-Extended'],
        allow: '/',
        disallow: ['/api/']
      }
    ],
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/sitemaps/services.xml`,
      `${SITE_URL}/sitemaps/resources.xml`,
      `${SITE_URL}/sitemaps/glossary.xml`,
      `${SITE_URL}/sitemaps/directory.xml`,
      `${SITE_URL}/sitemaps/global.xml`,
      `${SITE_URL}/sitemaps/languages.xml`
    ],
    host: SITE_URL
  };
}
