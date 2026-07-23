import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { REGIONS } from '../../data/regions';
import { breadcrumbSchema } from '../../lib/schema';
import Section from '../../components/ui/Section';
import Heading from '../../components/ui/Heading';
import Badge from '../../components/ui/Badge';

export const metadata: Metadata = {
  title: 'Regions | Qognition',
  description: 'Qognition delivers digital marketing strategy across the US, UK, UAE, India, Australia, Europe, GCC, and global revenue markets.',
  alternates: { canonical: '/regions' },
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
              '@type': 'CollectionPage',
              name: 'Qognition Regions',
              description: 'Qognition delivers digital marketing strategy across global regions.',
              url: 'https://qognition.com/regions',
            },
            breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Regions', path: '/regions' }]),
          ]),
        }}
      />
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6">
        <Section spacing="lg">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4">Global Regions</Badge>
            <Heading level="h1" className="mb-4">Regions We Serve</Heading>
            <p className="text-body text-[var(--text-muted)] max-w-2xl mx-auto">
              Strategic hubs and service regions for local SEO, paid media, and digital growth.
            </p>
          </div>
        </Section>

        <Section spacing="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {REGIONS.map((region) => (
              <Link
                key={region.slug}
                href={`/regions/${region.slug}`}
                className="group p-7 border border-[var(--border)] rounded-2xl bg-[var(--card-bg)] hover:border-[var(--accent)]/40 transition-all hover:-translate-y-0.5"
              >
                <div className="flex justify-between items-start mb-6">
                  <MapPin size={20} className="text-[var(--accent)]" />
                  <span className="text-xs text-[var(--text-muted)] uppercase tracking-widest">Region</span>
                </div>
                <h2 className="text-h2 text-[var(--text)] mb-3 group-hover:text-[var(--accent)] transition-colors font-semibold">
                  {region.name}
                </h2>
                <p className="text-body text-[var(--text-muted)] mb-5 line-clamp-3">
                  {region.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {region.marketFocus.slice(0, 3).map((focus) => (
                    <span
                      key={focus}
                      className="text-xs px-2.5 py-1 bg-[var(--surface)] border border-[var(--border)] rounded-full text-[var(--text-muted)]"
                    >
                      {focus}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-2 text-[var(--accent)] text-sm">
                  View region <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </Section>
      </main>
    </>
  );
}
