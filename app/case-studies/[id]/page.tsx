import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

import B2BCaseStudyView from '../../../components/case-studies/B2BCaseStudyView';
import Breadcrumbs from '../../../components/case-studies/Breadcrumbs';
import FaqAccordion from '../../../components/case-studies/FaqAccordion';
import { truncate } from '../../../components/case-studies/format';
import KpiSection from '../../../components/case-studies/KpiSection';
import NicheServiceBadges from '../../../components/case-studies/NicheServiceBadges';
import {
  PlaybookStrategy,
  PlaybookTimeline,
} from '../../../components/case-studies/PlaybookSections';
import StudyGrid from '../../../components/case-studies/StudyGrid';
import Heading from '../../../components/ui/Heading';
import Text from '../../../components/ui/Text';
import {
  B2B_CASE_STUDIES,
  CASE_STUDIES,
  getB2BCaseStudy,
  getCaseStudy,
  nicheLabel,
  relatedCaseStudies,
  serviceLabel,
  SERVICE_SPOKE_HREF,
} from '../../../data/case-studies';
import { breadcrumbSchema } from '../../../lib/schema';
import { SITE_URL } from '../../../lib/seo';

export const dynamicParams = false;

/* The 45 and the four named B2B programmes share this URL space. Ids are unique across both
   lists; scripts/check-industry-gate.cjs asserts it. */
export const generateStaticParams = () =>
  [...B2B_CASE_STUDIES, ...CASE_STUDIES].map((study) => ({ id: study.id }));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const b2b = getB2BCaseStudy(id);
  if (b2b) {
    const path = `/case-studies/${b2b.id}`;
    const description = truncate(b2b.summary);
    return {
      title: { absolute: `${b2b.headline} | Qognition` },
      description,
      alternates: { canonical: `${SITE_URL}${path}` },
      openGraph: { title: b2b.headline, description, url: `${SITE_URL}${path}`, type: 'article' },
    };
  }
  const study = getCaseStudy(id);
  if (!study) return { title: 'Case study not found | Qognition' };

  const path = `/case-studies/${study.id}`;
  const description = truncate(`Client programme: ${study.client}, ${study.market}. ${study.coreProblem}`);

  return {
    // absolute: the root layout's '%s | Qognition' template would otherwise double the suffix.
    title: { absolute: `${study.headline} | Qognition` },
    description,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: {
      title: study.headline,
      description,
      url: `${SITE_URL}${path}`,
      type: 'article',
      images: [{ url: `${SITE_URL}${study.image.src}`, alt: study.image.alt }],
    },
  };
}

/** Consistent section wrapper — heading plus body, so the page reads as one rhythm. */
function Section({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16 md:mb-24">
      {eyebrow && (
        <p className="mb-2 text-meta font-semibold uppercase tracking-wide text-[var(--accent)]">
          {eyebrow}
        </p>
      )}
      <Heading level="h2" className="mb-6">
        {title}
      </Heading>
      {children}
    </section>
  );
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const b2b = getB2BCaseStudy(id);
  if (b2b) return <B2BCaseStudyView study={b2b} />;
  const study = getCaseStudy(id);
  if (!study) notFound();

  const path = `/case-studies/${study.id}`;
  const related = relatedCaseStudies(study, 3);

  /**
   * Article + BreadcrumbList + FAQPage.
   *
   * Deliberately NO Review and NO AggregateRating. No client quotes have been collected for this
   * programme, and a fabricated review node in structured data is the exact defect this library
   * was built to replace. Do not add one without a real, attributable, on-file quote.
   */
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: study.headline,
      description: `Client programme: ${study.client}, ${study.market}. ${study.coreProblem}`,
      image: `${SITE_URL}${study.image.src}`,
      author: { '@type': 'Organization', name: 'Qognition', url: SITE_URL },
      publisher: { '@type': 'Organization', name: 'Qognition', url: SITE_URL },
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${path}` },
      about: { '@type': 'Thing', name: `${nicheLabel(study.niche)} search and acquisition` },
      url: `${SITE_URL}${path}`,
    },
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Case Studies', path: '/case-studies' },
      { name: nicheLabel(study.niche), path: `/case-studies/industry/${study.niche}` },
      { name: study.client, path },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: study.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen px-6 pb-32 pt-24 md:px-12 md:pt-32">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            items={[
              { name: 'Case Studies', href: '/case-studies' },
              {
                name: nicheLabel(study.niche),
                href: `/case-studies/industry/${study.niche}`,
              },
              { name: study.client, href: path },
            ]}
          />

          {/* ── Hero ─────────────────────────────────────────────────────── */}
          <header className="mb-12">
            <NicheServiceBadges niche={study.niche} services={study.services} />
            <Heading level="h1" className="mb-5 mt-5">
              {study.headline}
            </Heading>
            <p className="text-body text-[var(--text-muted)]">
              <span className="font-medium text-[var(--text)]">{study.client}</span> ·{' '}
              {study.market} · client programme
            </p>
            <Text className="mt-4">Targets were set at the start of the engagement. Results are published as client reporting confirms them.</Text>
          </header>

          <figure className="mb-14">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-[var(--bg-warm)]">
              <Image
                src={study.image.src}
                alt={study.image.alt}
                width={study.image.width ?? 1600}
                height={study.image.height ?? 1000}
                sizes="(min-width: 960px) 896px, 100vw"
                priority
                className="h-full w-full object-cover"
              />
            </div>
          </figure>

          <Section title="Business context">
            <Text className="max-w-3xl">{study.snapshot}</Text>
          </Section>

          <Section title="Programme focus">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <Text>{study.startingPosition}</Text>
            </div>
            <Text size="meta" className="mt-3">
              Client website:{' '}
              <a
                href={`https://${study.domain}`}
                target="_blank"
                rel="nofollow noopener"
                className="text-[var(--accent)] underline underline-offset-2"
              >
                {study.domain}
              </a>
            </Text>
          </Section>

          <Section title="The problem">
            <Text className="mb-5 max-w-3xl text-[var(--text)]">{study.coreProblem}</Text>
            <Text className="max-w-3xl">{study.diagnosis}</Text>
          </Section>

          <section className="mb-16 md:mb-24">
            <div className="rounded-xl border-l-2 border-[var(--accent)] bg-[var(--bg-warm)] py-5 pl-6 pr-5">
              <p className="mb-2 text-meta font-semibold uppercase tracking-wide text-[var(--accent)]">
                Market context
              </p>
              <Text>{study.differentiator}</Text>
            </div>
          </section>

          <Section title="Approach">
            <PlaybookStrategy playbooks={study.playbooks} />
          </Section>

          <Section title="Sequence">
            <PlaybookTimeline playbooks={study.playbooks} />
          </Section>

          {/* Evidence rule lives inside KpiSection — it branches on study.evidence. */}
          <Section title="Targets">
            <KpiSection study={study} />
          </Section>

          <Section title="Objections this answers">
            <ul className="space-y-3">
              {study.playbooks
                .flatMap((pb) => pb.objections)
                .filter((o, i, arr) => arr.indexOf(o) === i)
                .map((objection) => (
                  <li
                    key={objection}
                    className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4 text-body italic text-[var(--text-muted)]"
                  >
                    &ldquo;{objection}&rdquo;
                  </li>
                ))}
            </ul>
          </Section>

          <Section title="How results are reported">
            <Text className="mb-5 max-w-3xl">
              A target becomes a result on this page only when it is confirmed against records like these.
            </Text>
            <ul className="space-y-2">
              {study.playbooks
                .flatMap((pb) => pb.proofAssets)
                .filter((a, i, arr) => arr.indexOf(a) === i)
                .map((asset) => (
                  <li key={asset} className="flex gap-3 text-body text-[var(--text-muted)]">
                    <CheckCircle2
                      size={18}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-[var(--accent)]"
                    />
                    <span>{asset}</span>
                  </li>
                ))}
            </ul>
          </Section>

          <Section title="Work streams">
            <ul className="space-y-2">
              {study.engines.map((engine) => (
                <li key={engine} className="text-body text-[var(--text-muted)]">
                  {engine}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Questions about this programme">
            <FaqAccordion faqs={study.faqs} />
          </Section>

          {/* ── Internal linking spine ───────────────────────────────────── */}
          <section className="mb-16 md:mb-24">
            <Heading level="h2" className="mb-6">
              Related case studies
            </Heading>
            <StudyGrid
              studies={related}
              emptyTitle="No comparable case study yet"
              emptyMessage={`This is currently our only ${nicheLabel(study.niche)} case study in the library.`}
            />
            <nav aria-label="Explore the library" className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              <Link
                href={`/case-studies/industry/${study.niche}`}
                className="text-body text-[var(--accent)] underline underline-offset-2"
              >
                All {nicheLabel(study.niche)} case studies
              </Link>
              <Link
                href={`/case-studies/location/${study.state.toLowerCase()}`}
                className="text-body text-[var(--accent)] underline underline-offset-2"
              >
                All {study.stateName} case studies
              </Link>
              {study.services.map((service) => (
                <Link
                  key={service}
                  href={`/case-studies/service/${service}`}
                  className="text-body text-[var(--accent)] underline underline-offset-2"
                >
                  All {serviceLabel(service)} case studies
                </Link>
              ))}
              {study.services.map((service) => (
                <Link
                  key={`spoke-${service}`}
                  href={SERVICE_SPOKE_HREF[service]}
                  className="text-body text-[var(--accent)] underline underline-offset-2"
                >
                  {serviceLabel(service)} services
                </Link>
              ))}
              <Link
                href="/case-studies/methodology"
                className="text-body text-[var(--accent)] underline underline-offset-2"
              >
                How we measure this
              </Link>
            </nav>
          </section>

          <section className="rounded-xl border border-[var(--border)] bg-[var(--bg-warm)] p-8 text-center md:p-12">
            <Heading level="h2" className="mb-3">
              What would help your buyers choose you?
            </Heading>
            <Text className="mx-auto mb-6 max-w-xl">
              Tell us about your business, current search visibility and the enquiries you want to attract. We will discuss a scope based on your evidence and priorities.
            </Text>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-body font-medium text-[var(--on-accent,#fff)] transition-opacity hover:opacity-90"
            >
              Book a call <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/contact#enquiry" className="mt-4 block text-[var(--accent)]">Send an enquiry</Link>
          </section>
        </div>
      </article>
    </>
  );
}
