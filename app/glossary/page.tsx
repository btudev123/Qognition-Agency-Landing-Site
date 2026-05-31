import Link from 'next/link';
import { GLOSSARY_TERMS } from '../../data/seoExpansion';
import { breadcrumbSchema } from '../../lib/schema';
import Section from '../../components/ui/Section';
import Heading from '../../components/ui/Heading';
import Badge from '../../components/ui/Badge';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Digital Marketing Glossary | 300+ SEO, AI and Growth Terms',
  description:
    'A useful glossary of SEO, AI search, PPC, analytics, content, local SEO, and lead generation terms.',
  alternates: { canonical: '/glossary' },
};

export default function Page() {
  const categories = Array.from(new Set(GLOSSARY_TERMS.map((term) => term.category)));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'DefinedTermSet',
              name: 'Digital Marketing Glossary',
              url: 'https://qognition.com/glossary',
            },
            breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Glossary', path: '/glossary' }]),
          ]),
        }}
      />
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6">
        <Section spacing="lg">
          <div className="max-w-3xl">
            <Badge className="mb-4">Glossary</Badge>
            <Heading level="h1" className="mb-4">Digital Marketing Glossary</Heading>
            <p className="text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl">
              More than 300 definitions across SEO, AI search, paid media, analytics, lead generation, and conversion strategy.
            </p>
          </div>
        </Section>
        <Section spacing="lg">
          <div className="space-y-14">
            {categories.map((category) => (
              <div key={category}>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)] mb-5">
                  {category}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {GLOSSARY_TERMS.filter((term) => term.category === category).map((term) => (
                    <Link
                      key={term.slug}
                      href={`/glossary/${term.slug}`}
                      className="rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-4 py-3 text-sm text-[var(--text-muted)] hover:border-[var(--accent)]/40 hover:text-[var(--text)] transition-all"
                    >
                      {term.term}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </main>
    </>
  );
}
