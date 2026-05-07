import { routesForSitemap, renderUrlSet, sitemapIndexes } from '../../../lib/sitemap';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return sitemapIndexes.map((sitemap) => ({ sitemap: `${sitemap}.xml` }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ sitemap: string }> }) {
  const { sitemap } = await params;
  const name = sitemap.replace(/\.xml$/, '');
  const entries = routesForSitemap(name);

  if (!entries.length) {
    return new Response('Not found', { status: 404 });
  }

  return new Response(renderUrlSet(entries), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
