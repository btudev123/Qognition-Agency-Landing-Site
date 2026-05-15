import type { Metadata } from 'next';
import Link from 'next/link';
import { BACKLINK_OPPORTUNITIES } from '../../data/backlinkOpportunities';
import { metadataFor, SITE_URL } from '../../lib/seo';
import SchemaScript from '../SchemaScript';

export const metadata: Metadata = metadataFor({
  title: 'White-Hat Backlink and Authority Roadmap',
  description: 'A white-hat backlink and citation roadmap for Qognition built around audits, case studies, B2B guides, directories, partner citations, and digital PR.',
  path: '/backlink-authority-roadmap'
});

export default function Page() {
  return (
    <>
      <SchemaScript
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'White-Hat Backlink and Authority Roadmap',
          description: 'A practical backlink execution asset for legitimate citations, outreach, partner pages, resource links, podcasts, and digital PR.',
          author: { '@type': 'Organization', name: 'Qognition Agency', url: SITE_URL },
          publisher: { '@type': 'Organization', name: 'Qognition Agency', url: SITE_URL },
          url: `${SITE_URL}/backlink-authority-roadmap`
        }}
      />
      <main className="min-h-screen px-6 pb-28 pt-32 md:px-12">
        <section className="mx-auto max-w-7xl">
          <span className="font-mono text-sm uppercase tracking-widest text-teal-400">Authority Building</span>
          <h1 className="mt-6 font-display text-5xl leading-none text-white md:text-8xl">White-Hat Backlink Roadmap</h1>
          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-gray-300">
            This is the safe execution plan for authority: legitimate citations, useful resources, partner ecosystems, original data, and editorial outreach. No link farms, no fake 1,000-link blasts.
          </p>
        </section>
        <section className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6">
          {BACKLINK_OPPORTUNITIES.map((item) => (
            <article key={item.category} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <p className="text-xs uppercase tracking-widest text-teal-400">{item.category}</p>
                  <h2 className="mt-3 font-display text-3xl text-white">{item.targetType}</h2>
                </div>
                <div className="space-y-4 text-gray-300 lg:col-span-8">
                  <p><strong className="text-white">Targets:</strong> {item.exampleTargets.join(', ')}</p>
                  <p><strong className="text-white">Asset:</strong> {item.recommendedAsset}</p>
                  <p><strong className="text-white">Outreach angle:</strong> {item.outreachAngle}</p>
                  <p><strong className="text-white">Quality bar:</strong> {item.qualityBar}</p>
                </div>
              </div>
            </article>
          ))}
        </section>
        <section className="mx-auto mt-16 flex max-w-7xl flex-col gap-4 rounded-2xl border border-teal-400/20 bg-teal-400/5 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-3xl text-white">Use linkable assets first</h2>
            <p className="mt-2 text-gray-300">The audits, B2B guides, glossary, calculators, and case studies are the pages worth pitching.</p>
          </div>
          <Link href="/free-seo-audit" className="rounded-full bg-teal-400 px-6 py-3 text-center text-sm font-bold uppercase tracking-widest text-black hover:bg-white">
            Open Free Audit
          </Link>
        </section>
      </main>
    </>
  );
}
