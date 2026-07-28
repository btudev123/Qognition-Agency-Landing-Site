import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { LANGUAGE_SEO_PAGES, getLanguageSeoPage } from '../../../data/internationalSeo';
import { breadcrumbSchema } from '../../../lib/schema';
import Section from '../../../components/ui/Section';
import Heading from '../../../components/ui/Heading';
import Badge from '../../../components/ui/Badge';

export const dynamicParams = false;

export const generateStaticParams = () => LANGUAGE_SEO_PAGES.map((language) => ({ language: language.slug }));

export const generateMetadata = async ({ params }: { params: Promise<{ language: string }> }): Promise<Metadata> => {
  const { language } = await params;
  const page = getLanguageSeoPage(language);
  if (!page) return { title: 'Language Not Found', description: 'Language not found.', robots: { index: false } };
  return { title: page.title, description: page.description, alternates: { canonical: `/languages/${page.slug}` } };
};

export default async function Page({ params }: { params: Promise<{ language: string }> }) {
  const { language } = await params;
  const page = getLanguageSeoPage(language);
  if (!page) notFound();

  const path = `/languages/${page.slug}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: page.title,
              description: page.description,
              provider: { '@type': 'Organization', name: 'Qognition', url: 'https://www.qognitionagency.com' },
              availableLanguage: page.language,
              areaServed: page.countries,
              url: `https://www.qognitionagency.com${path}`,
            },
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Languages', path: '/languages' },
              { name: page.language, path },
            ]),
          ]),
        }}
      />
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6">
        <Section spacing="lg">
          <Badge className="mb-4">{page.nativeName}</Badge>
          <Heading level="h1" className="mb-6">{page.title}</Heading>
          <p className="text-body text-[var(--text-muted)] max-w-4xl">{page.intro}</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/free-seo-audit"
              className="inline-flex px-6 py-3 text-sm font-medium bg-[var(--accent)] text-[var(--accent-deep)] rounded-lg hover:brightness-110 transition-all"
            >
              Get Free Localization Audit
            </Link>
            <Link
              href="/global/china-market-entry"
              className="inline-flex px-6 py-3 text-sm font-medium border border-[var(--border)] text-[var(--text)] rounded-lg hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
            >
              China Market Entry
            </Link>
          </div>
        </Section>

        <Section spacing="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-8">
              <Heading level="h2" className="mb-6">Priority Countries</Heading>
              <div className="flex flex-wrap gap-3">
                {page.countries.map((country) => (
                  <span
                    key={country}
                    className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--text-muted)]"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-8">
              <Heading level="h2" className="mb-6">Services</Heading>
              <div className="space-y-3">
                {page.services.map((service) => (
                  <p key={service} className="text-body text-[var(--text-muted)]">{service}</p>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
}
