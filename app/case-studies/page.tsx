import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getCaseStudies } from '../../lib/sanityContent';
import { breadcrumbSchema } from '../../lib/schema';
import { metadataFor } from '../../lib/seo';
import Heading from '../../components/ui/Heading';

// Title and description come from SEO_OVERRIDES['/case-studies'] in lib/seo.ts.
export const metadata: Metadata = metadataFor({
  title: 'Case Studies | Qognition',
  description: 'Real results for ambitious brands. Explore our portfolio of successful digital marketing campaigns with measurable growth metrics.',
  path: '/case-studies',
});

export default async function Page() {
  const CASE_STUDIES = await getCaseStudies();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: 'Case Studies',
              url: 'https://www.qognitionagency.com/case-studies',
              about: { '@type': 'Organization', name: 'Qognition' },
            },
            breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Case Studies', path: '/case-studies' }]),
          ]),
        }}
      />
      <main className="pt-24 md:pt-32 px-6 md:px-12 max-w-7xl mx-auto min-h-screen pb-32">
        <header className="mb-24 text-center md:text-left">
          <Heading level="h1" className="!text-6xl md:!text-9xl mb-8">Case Studies</Heading>
          <p className="text-body text-[var(--text-muted)] max-w-2xl">
            Real results for ambitious brands. We let the metrics speak for themselves.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-16 md:gap-y-32 max-w-7xl mx-auto pb-32">
          {CASE_STUDIES.map((study, index) => (
            <div key={study.id} className={`group ${index === 0 ? 'md:col-span-2' : ''}`}>
              <Link href={`/case-studies/${study.id}`} className="block">
                <div className="relative overflow-hidden rounded-xl mb-8 aspect-video md:aspect-[16/10]">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10 duration-500" />
                  <div className="absolute top-4 right-4 z-20 w-12 h-12 bg-[var(--surface)] rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowRight className="text-[var(--accent)]" size={20} />
                  </div>
                  <img src={study.image} alt={study.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                    <span className="text-[var(--accent)] text-sm font-bold uppercase tracking-wider">{study.client}</span>
                    <span className="text-xs text-[var(--text-muted)] uppercase tracking-widest">{study.industry}</span>
                  </div>
                  <h3 className="text-h3 text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-300 font-semibold">
                    {study.title}
                  </h3>
                  <div className="flex gap-2 flex-wrap mt-2">
                    {study.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 border border-[var(--border)] rounded-full text-xs text-[var(--text-muted)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
