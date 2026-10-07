import { isPreviewDeployment } from '../../lib/deploymentMode';
import { SITE_URL } from '../../lib/seo';
export const dynamic = 'force-static';
export function GET() {
  if (isPreviewDeployment()) return new Response('User-agent: *\nDisallow: /\n', {headers: {'Content-Type':'text/plain; charset=utf-8','X-Robots-Tag':'noindex, nofollow'}});
  const restricted = ['Allow: /', 'Disallow: /api/', 'Disallow: /studio/'];
  const body = [
    '# Qognition: public search discovery is allowed.',
    'User-agent: *', ...restricted, '',
    '# Search discovery. Training permissions are a separate decision.',
    ...['OAI-SearchBot', 'Claude-SearchBot', 'PerplexityBot'].flatMap(bot => [`User-agent: ${bot}`, ...restricted, '']),
    '# Preserve the existing training policy; this is not required for search inclusion.',
    ...['GPTBot', 'ClaudeBot', 'Google-Extended'].flatMap(bot => [`User-agent: ${bot}`, ...restricted, '']),
    `Sitemap: ${SITE_URL}/sitemap.xml`, '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' } });
}
