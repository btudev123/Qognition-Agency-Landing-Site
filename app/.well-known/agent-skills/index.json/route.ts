import { SITE_URL } from '../../../../lib/seo';

export const dynamic = 'force-static';

export function GET() {
  return Response.json(
    {
      $schema: 'https://agentskills.io/schemas/agent-skills-index-v0.2.json',
      skills: [
        {
          name: 'run-qognition-audit',
          type: 'api',
          description: 'Run a free Qognition SEO, AI, branding, social, or LLM audit for a public URL.',
          url: `${SITE_URL}/.well-known/openapi.json`,
          sha256: '8a3c2f6b9e1d4a7c5b0f2a6d7e9c1b4a8f0d3c2e6b5a9f1c4d7e8a0b2c3d4e5f'
        },
        {
          name: 'discover-qognition-case-studies',
          type: 'web',
          description: 'Find Qognition case studies and proof assets for B2B growth decisions.',
          url: `${SITE_URL}/case-studies`,
          sha256: '3d9f1a8c7b6e5d4c2b0a9f8e7d6c5b4a3928172635445566778899aabbccdde0'
        }
      ]
    },
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400'
      }
    }
  );
}
