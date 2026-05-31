import type { Metadata } from 'next';
import Link from 'next/link';
import { LANGUAGE_SEO_PAGES } from '../../data/internationalSeo';
import { breadcrumbSchema } from '../../lib/schema';
import Section from '../../components/ui/Section';
import Heading from '../../components/ui/Heading';
import Badge from '../../components/ui/Badge';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Multilingual SEO | Qognition',
  description: 'Arabic, French, Spanish, Mandarin, Portuguese, Russian, and Japanese SEO and digital marketing pages.',
  alternates: { canonical: '/languages' },
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
              name: 'Qognition Multilingual SEO',
              url: 'https://qognition.com/languages',
            },
            breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Languages', path: '/languages' }]),
          ]),
        }}
      />
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6">
        <Section spacing="lg">
          <div className="max-w-3xl">
            <Badge className="mb-4">Multilingual SEO</Badge>
            <Heading level="h1" className="mb-4">Marketing in Every Priority Language</Heading>
            <p className="text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl">
              Localized SEO, landing pages, paid media, and lead capture for Arabic, French, Spanish, Mandarin, Portuguese, Russian, and Japanese markets.
            </p>
          </div>
        </Section>

        <Section spacing="lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LANGUAGE_SEO_PAGES.map((language) => (
              <Link
                key={language.slug}
                href={`/languages/${language.slug}`}
                className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 hover:border-[var(--accent)]/40 transition-all"
              >
                <p className="text-2xl mb-4">{language.nativeName}</p>
                <h2 className="text-xl font-semibold text-[var(--text)] mb-4">{language.language}</h2>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{language.description}</p>
              </Link>
            ))}
          </div>
        </Section>
      </main>
    </>
  );
}
