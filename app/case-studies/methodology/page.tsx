import type { Metadata } from 'next';
import Link from 'next/link';

import BenchmarkTable from '../../../components/case-studies/BenchmarkTable';
import Breadcrumbs from '../../../components/case-studies/Breadcrumbs';
import FaqAccordion from '../../../components/case-studies/FaqAccordion';
import Heading from '../../../components/ui/Heading';
import Text from '../../../components/ui/Text';
import { ALL_BENCHMARKS, LIBRARY_STATS, type Faq } from '../../../data/case-studies';
import { breadcrumbSchema } from '../../../lib/schema';
import { SITE_URL } from '../../../lib/seo';

const PATH = '/case-studies/methodology';
const description =
  'How to read a Qognition case study: what each client programme records, where every benchmark comes from, and when a target becomes a reported result.';

export const metadata: Metadata = {
  title: 'Case Study Methodology | Qognition',
  description,
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: { title: 'Case Study Methodology | Qognition', description, url: `${SITE_URL}${PATH}` },
};

const FAQS: Faq[] = [
  { question: 'Are these real client programmes?', answer: 'Yes. Every case study in the library is a Qognition client programme. Targets were set at the start of each engagement, and results are published as client reporting confirms them.' },
  { question: 'Where do the benchmark numbers come from?', answer: 'Benchmark rows identify a third-party source and publication year. They describe that source’s sample and method. They are context for discussion, not forecasts for a particular company.' },
  { question: 'What is the difference between a target and a result?', answer: 'A target is the outcome a programme was set up to reach, agreed at the start of the engagement. A result is what the client’s own reporting shows for a defined period. We label them differently and never print one in the other’s place.' },
  { question: 'Why do the case studies show targets rather than results?', answer: 'A figure is published as a result only after it has been confirmed against the client’s own reporting. Until then it stays labelled as a target.' },
  { question: 'Can I inspect the underlying evidence?', answer: 'Every benchmark links to its public source. Client reporting belongs to the client and is not published. When a result is published, it names its measurement method, period and attribution limits.' },
  { question: 'Do you guarantee these outcomes?', answer: 'No. Outcomes depend on the business, competition, implementation and third-party platforms. We agree a scope and measurement approach before work begins.' },
];

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Case Studies', path: '/case-studies' },
              { name: 'Methodology', path: PATH },
            ]),
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: FAQS.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: { '@type': 'Answer', text: faq.answer },
              })),
            },
          ]),
        }}
      />

      <main className="min-h-screen px-6 pb-32 pt-24 md:px-12 md:pt-32">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            items={[
              { name: 'Case Studies', href: '/case-studies' },
              { name: 'Methodology', href: PATH },
            ]}
          />

          <header className="mb-14">
            <Heading level="h1" className="mb-6">
              How to read these case studies
            </Heading>
            <Text>
              Every case study in the library is a client programme. This page explains what each part of a case study claims, where the numbers come from, and when a target becomes a result.
            </Text>
          </header>

          <section className="mb-14">
            <Heading level="h2" className="mb-5">
              Three kinds of information, clearly separated
            </Heading>
            <Text className="mb-4">
              <strong className="text-[var(--text)]">Client programmes</strong> set out the client’s market, the problem the programme addresses, the work and the targets agreed at the start of the engagement.
            </Text>
            <Text className="mb-4">
              <strong className="text-[var(--text)]">Attributed research</strong> links to a named third-party source. Its dates, sample and scope matter: a category benchmark does not predict a particular firm’s outcome.
            </Text>
            <Text>
              <strong className="text-[var(--text)]">Reported results</strong> are figures confirmed against the client’s own reporting for a stated period. A KPI shows as a result only once that has happened; until then it is labelled as a target.
            </Text>
          </section>

          <section className="mb-14">
            <Heading level="h2" className="mb-5">
              Where the numbers come from
            </Heading>
            <Text className="mb-4">
              A number with no denominator is decoration. Every benchmark we cite names its source,
              its year, and what it actually measured, including sample size where the source
              states one. All {ALL_BENCHMARKS.length} of them are below, with live links.
            </Text>
            <Text>
              We do not publish our own aggregate statistics as though they were industry research,
              and we do not emit review or rating markup we have not earned.
            </Text>
          </section>

          <section className="mb-14">
            <Heading level="h2" className="mb-5">
              How a target becomes a result
            </Heading>
            <Text className="mb-4">
              Each programme names the records its results are reported from: search data, dated AI observations, campaign exports and CRM outcomes. Access, reporting responsibilities and attribution limits are agreed for each engagement.
            </Text>
            <Text>
              A figure moves from target to result only when it has been confirmed against those records.
            </Text>
          </section>

          <section className="mb-14">
            <Heading level="h2" className="mb-6">
              The current library
            </Heading>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: 'Client programmes', value: LIBRARY_STATS.total },
                { label: 'States', value: LIBRARY_STATS.states },
                { label: 'Benchmarks cited', value: ALL_BENCHMARKS.length },
                { label: 'Confirmed by client reporting', value: LIBRARY_STATS.verified },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5"
                >
                  <Heading level="h3" className="text-[var(--accent)]">
                    {stat.value}
                  </Heading>
                  <Text size="meta" className="mt-1">
                    {stat.label}
                  </Text>
                </div>
              ))}
            </div>
            <Text size="meta" tone="faint" className="mt-4">
              A programme counts as confirmed when every KPI on it has been checked against the client’s own reporting. The rest show targets, labelled as targets. This number moves as reporting cycles complete.
            </Text>
          </section>

          <section className="mb-14">
            <Heading level="h2" className="mb-6">
              Every benchmark we cite
            </Heading>
            <BenchmarkTable benchmarks={ALL_BENCHMARKS} />
          </section>

          <section className="mb-14">
            <Heading level="h2" className="mb-6">
              Questions
            </Heading>
            <FaqAccordion faqs={FAQS} />
          </section>

          <nav aria-label="Back to the library" className="flex flex-wrap gap-x-6 gap-y-3">
            <Link
              href="/case-studies"
              className="text-body text-[var(--accent)] underline underline-offset-2"
            >
              All {LIBRARY_STATS.total} case studies
            </Link>
            {LIBRARY_STATS.byNiche.map((n) => (
              <Link
                key={n.niche}
                href={`/case-studies/industry/${n.niche}`}
                className="text-body text-[var(--accent)] underline underline-offset-2"
              >
                {n.label} ({n.count})
              </Link>
            ))}
          </nav>
        </div>
      </main>
    </>
  );
}
