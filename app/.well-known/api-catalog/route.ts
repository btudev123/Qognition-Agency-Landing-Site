import { SITE_URL } from '../../../lib/seo';

export const dynamic = 'force-static';

export function GET() {
  return Response.json(
    {
      linkset: [
        {
          anchor: `${SITE_URL}/api/audit`,
          'service-desc': [{ href: `${SITE_URL}/.well-known/openapi.json`, type: 'application/vnd.oai.openapi+json' }],
          'service-doc': [{ href: `${SITE_URL}/docs/api`, type: 'text/html' }],
          status: [{ href: `${SITE_URL}/api/health`, type: 'application/json' }]
        }
      ]
    },
    {
      headers: {
        'Content-Type': 'application/linkset+json; charset=utf-8',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400'
      }
    }
  );
}
