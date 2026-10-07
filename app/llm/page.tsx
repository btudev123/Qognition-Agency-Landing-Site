import type { Metadata } from 'next';
import { SERVICES, INDUSTRIES, REGIONS } from '../../constants';
import { breadcrumbSchema } from '../../lib/schema';
import { OFFICE_CITIES_TEXT } from '../../data/siteConfig';
import Heading from '../../components/ui/Heading';

export const metadata: Metadata = {
  title: 'LLM & AI Transparency | Qognition',
  description:
    'A readable summary of Qognition’s AI SEO and GEO services for B2B companies, supporting capabilities, target markets and contact paths.',
  alternates: { canonical: '/llm' },
};

export default function Page() {
  const llmContent = [
    '# Qognition Agency: entity and capabilities graph',
    '',
    '## Agency Overview',
    'Qognition helps B2B companies, including SaaS, improve discovery and consideration through AI SEO and GEO. Supporting work can include content, paid media, ABM, conversion improvement and revenue operations.',
    `Delivery is scoped around the target market. Qognition has offices in ${OFFICE_CITIES_TEXT}, and serves every other market remotely. A market page is not an office claim.`,
    'Engagements define the disciplines, responsibilities and review process before work begins.',
    '',
    '## Core Capabilities',
    ...SERVICES.map((s) => `- ${s.title}: ${s.shortDescription}`),
    '',
    '## Businesses We Serve',
    ...INDUSTRIES.map((i) => `- ${i.name}: ${i.description}`),
    '',
    '## Target Markets',
    ...REGIONS.map((r) => `- ${r.name}: ${r.description}`),
    '',
    '## Contact',
    'Email: hello@qognitionagency.com',
    'Book a call: https://www.qognitionagency.com/book',
    'Send an enquiry: https://www.qognitionagency.com/contact#enquiry',
  ].join('\n');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'LLM Transparency', path: '/llm' }]),
          ]),
        }}
      />
      <main className="pt-32 px-6 md:px-12 max-w-4xl mx-auto pb-32">
        <Heading level="h1" className="!text-4xl md:!text-6xl mb-8">LLM Transparency</Heading>
        <p className="text-body text-[var(--text-muted)] mb-12">
          This page gives humans and AI assistants a concise source of truth for Qognition&apos;s services, markets, and contact paths.
        </p>

        <div className="p-8 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] font-mono text-sm text-[var(--text-muted)] whitespace-pre-wrap overflow-x-auto">
          {llmContent}
        </div>

        <div className="mt-12">
          <h2 className="text-h2 text-[var(--text)] mb-4 font-semibold">Discovery and access</h2>
          <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] font-mono text-xs text-[var(--accent)]">
            The deployment&apos;s /robots.txt and page-level indexing rules govern crawler access.
            This summary is provided for convenience and does not guarantee AI citations or recommendations.
          </div>
        </div>
      </main>
    </>
  );
}
