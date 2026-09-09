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
  'How to read a Qognition case study: what we verify and when, where every benchmark figure comes from, and the difference between a target and a reported result.';

export const metadata: Metadata = {
  title: 'Case Study Methodology | Qognition',
  description,
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: { title: 'Case Study Methodology | Qognition', description, url: `${SITE_URL}${PATH}` },
};

const FAQS: Faq[] = [
  {
    question: 'What does "what we verified" actually mean?',
    answer:
      "It means someone loaded the live public website on the date shown and confirmed what was and was not there. A 404 on a contact page, a footer copyright reading 2013-2020, an apex domain returning 403, two Google Business Profiles with different review counts. These are observations of public facts, stamped with the date they were made. Websites change — if a client has fixed something since, the observation was still true when it was made, and the date on the page tells you when that was.",
  },
  {
    question: 'Where do the benchmark numbers come from?',
    answer: `Every one of the ${ALL_BENCHMARKS.length} benchmark figures we cite is published by a named third party, carries the year it was published, and links out to the source. None of them are ours. We use them because a category median is the only honest way to say whether a specific account is doing well or badly — "$149 cost per lead" means nothing until you know the category average across 816 contractors is also $149.`,
  },
  {
    question: 'What is the difference between a target and a result?',
    answer:
      'A target is what the programme was set up to move a number to, derived from the published category benchmarks. A result is what the client\'s own reporting says actually happened, reconciled against their ad platform exports, call recordings, and booking or policy system. We label these differently on every page and we never print one in the other\'s place. A page showing targets says so above the table.',
  },
  {
    question: 'Why do some case studies show targets rather than results?',
    answer:
      'Because reconciling a client\'s reporting is a real piece of work and it happens on their reporting cycle, not ours. Until a figure has been pulled from the client\'s own systems and matched to source, it stays labelled as a target. We would rather show you an honest target than an impressive number we cannot substantiate on request.',
  },
  {
    question: 'Can I ask to see the underlying data?',
    answer:
      'For their own account, every client can, and does — the proof assets listed on each case study are the exports they already receive. For someone else\'s account, no: that is their commercial data and it is not ours to hand out. What you can check independently is every benchmark on the page, because each one links to its published source, and every "what we verified" observation, because the site is public.',
  },
  {
    question: 'Do you guarantee these outcomes?',
    answer:
      'No. Nobody can, and an agency that offers to should worry you. What we commit to is the measurement standard on this page: named sources for every benchmark, dated observations for every claim about a site, and a clear line between a target and a reported result.',
  },
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
              Marketing case studies are usually unfalsifiable — a number, a logo, and no way to
              check either. These are built so you can check them. This page explains exactly what
              each part of a case study is claiming, and what it is not.
            </Text>
          </header>

          <section className="mb-14">
            <Heading level="h2" className="mb-5">
              Every page has a verified half and a measured half
            </Heading>
            <Text className="mb-4">
              <strong className="text-[var(--text)]">The verified half</strong> is the audit. We
              loaded the live site on a stated date and recorded what was there. Those observations
              are public facts about public websites — you can open the same URL and check them
              yourself, allowing for anything fixed since.
            </Text>
            <Text className="mb-4">
              <strong className="text-[var(--text)]">The measured half</strong> is the numbers. Each
              KPI has a baseline, a target derived from published category benchmarks, and — once
              the client&apos;s reporting has been reconciled — a reported result.
            </Text>
            <Text>
              These are labelled differently and they are never mixed. A page whose numbers are
              still targets says so, in plain language, directly above the table.
            </Text>
          </section>

          <section className="mb-14">
            <Heading level="h2" className="mb-5">
              Where the numbers come from
            </Heading>
            <Text className="mb-4">
              A number with no denominator is decoration. Every benchmark we cite names its source,
              its year, and what it actually measured — including sample size where the source
              states one. All {ALL_BENCHMARKS.length} of them are below, with live links.
            </Text>
            <Text>
              We do not publish our own aggregate statistics as though they were industry research,
              and we do not emit review or rating markup we have not earned.
            </Text>
          </section>

          <section className="mb-14">
            <Heading level="h2" className="mb-5">
              What a client receives
            </Heading>
            <Text className="mb-4">
              Every engagement hands over the raw exports behind its own reporting — the ad platform
              change history, the search terms report before and after, call recordings scored for
              booking outcome, and the client-side booking, patient or policy export matched to
              source. Each case study lists the specific set for that engagement.
            </Text>
            <Text>
              That list is the point. If an agency cannot tell you which export a number came from,
              the number is a decoration.
            </Text>
          </section>

          <section className="mb-14">
            <Heading level="h2" className="mb-6">
              The current library
            </Heading>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: 'Engagements', value: LIBRARY_STATS.total },
                { label: 'States', value: LIBRARY_STATS.states },
                { label: 'Benchmarks cited', value: ALL_BENCHMARKS.length },
                { label: 'Reconciled to reporting', value: LIBRARY_STATS.verified },
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
              &ldquo;Reconciled to reporting&rdquo; counts engagements where every KPI has been
              matched to the client&apos;s own systems. The rest show targets, labelled as targets.
              This number moves as reporting cycles complete.
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
