import type { Metadata } from 'next';
import Link from 'next/link';
import { BACKLINK_OPPORTUNITIES } from '../../data/backlinkOpportunities';
import Heading from '../../components/ui/Heading';
import Badge from '../../components/ui/Badge';

export const metadata: Metadata = {
  title: 'White-Hat Backlink and Authority Roadmap | Qognition',
  description: 'A white-hat backlink and citation roadmap for Qognition built around audits, case studies, B2B guides, directories, partner citations, and digital PR.',
  alternates: { canonical: '/backlink-authority-roadmap' },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: 'White-Hat Backlink and Authority Roadmap',
              description: 'A practical backlink execution asset for legitimate citations, outreach, partner pages, resource links, podcasts, and digital PR.',
              author: { '@type': 'Organization', name: 'Qognition', url: 'https://qognition.com' },
              publisher: { '@type': 'Organization', name: 'Qognition', url: 'https://qognition.com' },
              url: 'https://qognition.com/backlink-authority-roadmap',
            },
          ]),
        }}
      />
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Badge className="mb-4">Authority Building</Badge>
          <Heading level="h1" className="mb-6">White-Hat Backlink Roadmap</Heading>
          <p className="text-body text-[var(--text-muted)] max-w-3xl">
            This is the safe execution plan for authority: legitimate citations, useful resources, partner ecosystems, original data, and editorial outreach. No link farms, no fake 1,000-link blasts.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-6">
            {BACKLINK_OPPORTUNITIES.map((item) => (
              <article key={item.category} className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                  <div className="lg:col-span-4">
                    <p className="text-meta uppercase text-[var(--accent)]">{item.category}</p>
                    <h2 className="text-h2 mt-3 text-[var(--text)] font-semibold">{item.targetType}</h2>
                  </div>
                  <div className="space-y-4 text-[var(--text-muted)] lg:col-span-8">
                    <p><strong className="text-[var(--text)]">Targets:</strong> {item.exampleTargets.join(', ')}</p>
                    <p><strong className="text-[var(--text)]">Asset:</strong> {item.recommendedAsset}</p>
                    <p><strong className="text-[var(--text)]">Outreach angle:</strong> {item.outreachAngle}</p>
                    <p><strong className="text-[var(--text)]">Quality bar:</strong> {item.qualityBar}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 flex flex-col gap-4 rounded-2xl border border-[var(--accent)]/20 bg-[rgba(var(--accent-rgb),0.04)] p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <Heading level="h2">Use linkable assets first</Heading>
              <p className="text-body mt-2 text-[var(--text-muted)]">The audits, B2B guides, glossary, calculators, and case studies are the pages worth pitching.</p>
            </div>
            <Link
              href="/free-seo-audit"
              className="rounded-lg bg-[var(--accent)] px-6 py-3 text-center text-sm font-medium text-[var(--accent-deep)] hover:brightness-110 transition-all shrink-0"
            >
              Open Free Audit
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
