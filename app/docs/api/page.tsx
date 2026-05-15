import type { Metadata } from 'next';
import Link from 'next/link';
import { metadataFor } from '../../../lib/seo';

export const metadata: Metadata = metadataFor({
  title: 'Qognition API Documentation',
  description: 'Public no-auth API documentation for Qognition audit and agent discovery endpoints.',
  path: '/docs/api'
});

export default function Page() {
  return (
    <main className="min-h-screen px-6 pb-28 pt-32 md:px-12">
      <section className="mx-auto max-w-5xl">
        <span className="font-mono text-sm uppercase tracking-widest text-teal-400">API Documentation</span>
        <h1 className="mt-6 font-display text-5xl leading-none text-white md:text-8xl">Qognition Public API</h1>
        <p className="mt-8 text-xl leading-relaxed text-gray-300">
          These public no-auth endpoints help agents and visitors discover Qognition audit tools, machine-readable metadata, and service documentation.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-5">
          {[
            ['POST /api/audit', 'Runs a fast SEO, AI, branding, social, or LLM audit for a public URL and returns a branded report.'],
            ['GET /api/health', 'Returns basic API health status.'],
            ['GET /api/integrations/status', 'Checks whether HubSpot and Resend env vars are configured without exposing secrets.'],
            ['GET /.well-known/api-catalog', 'Returns the RFC 9727 API catalog as application/linkset+json.'],
            ['GET /.well-known/openapi.json', 'Returns the OpenAPI service description.'],
            ['GET /.well-known/agent-skills/index.json', 'Returns the agent skills discovery index.'],
            ['GET /.well-known/mcp/server-card.json', 'Returns the public WebMCP discovery card.']
          ].map(([title, description]) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="font-display text-2xl text-white">{title}</h2>
              <p className="mt-3 text-gray-400">{description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/.well-known/openapi.json" className="rounded-full bg-teal-400 px-6 py-3 text-sm font-bold uppercase tracking-widest text-black hover:bg-white">
            OpenAPI JSON
          </Link>
          <Link href="/free-seo-audit" className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white hover:border-teal-400 hover:text-teal-300">
            Run Audit
          </Link>
        </div>
      </section>
    </main>
  );
}
