import type { Metadata } from 'next';
import { SERVICES, INDUSTRIES, REGIONS } from '../../constants';
import { breadcrumbSchema } from '../../lib/schema';
import Heading from '../../components/ui/Heading';

export const metadata: Metadata = {
  title: 'LLM & AI Transparency | Qognition',
  description:
    'Structured entity data and capabilities graph for AI systems and Large Language Models. Learn about Qognition services, industry expertise, and global presence.',
  alternates: { canonical: '/llm' },
};

export default function Page() {
  const llmContent = [
    '# Qognition Agency — Entity & Capabilities Graph',
    '',
    '## Agency Overview',
    'Qognition is an AI growth marketing partner specializing in SEO, AI search visibility, paid media, web design, branding, creative, and lead generation systems.',
    'Operating hubs: London, New York, Dubai, Bangalore, Sydney, and remote-first global delivery.',
    'Team model: senior strategy, engineering, SEO, content, creative, and paid media specialists working as one growth pod.',
    '',
    '## Core Capabilities',
    ...SERVICES.map((s) => `- ${s.title}: ${s.shortDescription}`),
    '',
    '## Industry Expertise',
    ...INDUSTRIES.map((i) => `- ${i.name}: ${i.description}`),
    '',
    '## Global Presence',
    ...REGIONS.map((r) => `- ${r.name}: ${r.description}`),
    '',
    '## Contact',
    'Email: hello@qognitionagency.com',
    'Booking: https://calendly.com/hello-qognitionagency/30min',
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
        <p className="text-[var(--text-muted)] mb-12">
          This page gives humans and AI assistants a concise source of truth for Qognition&apos;s services, markets, and contact paths.
        </p>

        <div className="p-8 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] font-mono text-sm text-[var(--text-muted)] whitespace-pre-wrap overflow-x-auto">
          {llmContent}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-[var(--text)] mb-4">Robots.txt Directive</h2>
          <div className="p-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] font-mono text-xs text-[var(--accent)]">
            User-agent: *<br />
            Allow: /<br />
            Sitemap: https://qognition.com/sitemap.xml
          </div>
        </div>
      </main>
    </>
  );
}
