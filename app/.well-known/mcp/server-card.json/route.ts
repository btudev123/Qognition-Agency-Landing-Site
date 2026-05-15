import { SITE_URL } from '../../../../lib/seo';

export const dynamic = 'force-static';

export function GET() {
  return Response.json(
    {
      schemaVersion: '0.1',
      serverInfo: {
        name: 'Qognition Website Agent Tools',
        version: '1.0.0'
      },
      description:
        'Public browser-exposed Qognition tools for audits, case-study discovery, resource discovery, and strategy-call routing. This is a public no-auth discovery card, not a protected MCP server.',
      transport: {
        type: 'webmcp',
        endpoint: SITE_URL
      },
      capabilities: {
        tools: ['run_qognition_audit', 'find_case_studies', 'find_resources', 'book_strategy_call'],
        resources: [`${SITE_URL}/llm.txt`, `${SITE_URL}/sitemap.xml`, `${SITE_URL}/.well-known/api-catalog`]
      }
    },
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400'
      }
    }
  );
}
