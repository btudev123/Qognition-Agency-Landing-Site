import { SITE_URL } from '../../../lib/seo';

export const dynamic = 'force-static';

export function GET() {
  return Response.json(
    {
      openapi: '3.1.0',
      info: {
        title: 'Qognition Public Audit API',
        version: '1.0.0',
        description: 'Public no-auth endpoints for running fast website SEO, AI, branding, social, and LLM audits.'
      },
      servers: [{ url: SITE_URL }],
      paths: {
        '/api/audit': {
          post: {
            operationId: 'runAudit',
            summary: 'Run an instant Qognition audit',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: ['url', 'email'],
                    properties: {
                      url: { type: 'string', format: 'uri' },
                      email: { type: 'string', format: 'email' },
                      auditType: { type: 'string', enum: ['seo', 'ai', 'branding', 'social', 'llm'], default: 'seo' },
                      source: { type: 'string' }
                    }
                  }
                }
              }
            },
            responses: {
              '200': { description: 'Audit report generated' },
              '400': { description: 'Invalid request' },
              '422': { description: 'Target URL could not be audited' }
            }
          }
        },
        '/api/health': {
          get: {
            operationId: 'getHealth',
            summary: 'Check API health',
            responses: { '200': { description: 'Healthy' } }
          }
        },
        '/api/integrations/status': {
          get: {
            operationId: 'getIntegrationStatus',
            summary: 'Check HubSpot and Resend configuration status',
            responses: { '200': { description: 'Integration configuration status without exposing secrets' } }
          }
        }
      }
    },
    {
      headers: {
        'Content-Type': 'application/vnd.oai.openapi+json; charset=utf-8',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400'
      }
    }
  );
}
