import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { breadcrumbSchema } from '../../lib/schema';
import Heading from '../../components/ui/Heading';
import Badge from '../../components/ui/Badge';

export const metadata: Metadata = {
  title: 'Transparent Pricing | Qognition',
  description: 'Clear, upfront pricing for SEO, paid media, content, web development, and growth marketing services. Retainers from $3K/mo, projects from $10K.',
  alternates: { canonical: '/pricing' },
};

const tiers = [
  {
    name: 'Growth',
    price: '$3K–$6K/mo',
    description: 'For startups and small teams ready to build a repeatable acquisition system.',
    features: ['SEO audit + on-page optimization', '2 content pieces per month', 'Monthly analytics report', 'Google Search Console monitoring', 'Basic CRO recommendations', 'Monthly strategy call'],
    cta: 'Get Free Audit First',
    href: '/free-seo-audit',
    highlight: false,
  },
  {
    name: 'Scale',
    price: '$6K–$15K/mo',
    description: 'For growth-stage companies that need full-funnel marketing execution.',
    features: ['Full SEO + content strategy', 'Paid media management (Google/Meta)', 'Landing page design + CRO', 'Weekly analytics + attribution', 'CRM/lead tracking setup', '5 content pieces per month', 'Competitor monitoring', 'Biweekly strategy calls'],
    cta: 'Book Strategy Call',
    href: 'https://cal.com/hello-qognitionagency/30min',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: '$15K–$20K+/mo',
    description: 'For established companies scaling across multiple channels and markets.',
    features: ['Everything in Scale', 'Multi-channel paid media', 'AI search / LLM visibility', 'Custom dashboards + BI', 'Dedicated growth lead', 'Programmatic SEO', 'International SEO', 'Weekly executive updates'],
    cta: 'Book Strategy Call',
    href: 'https://cal.com/hello-qognitionagency/30min',
    highlight: false,
  },
];

const projectTiers = [
  {
    name: 'Sprint',
    price: '$10K–$30K',
    description: 'Focused project with clear scope and timeline.',
    features: ['Website or landing page build', 'Technical SEO overhaul', 'Brand identity refresh', 'CRM/automation setup'],
  },
  {
    name: 'Build',
    price: '$30K–$100K',
    description: 'Multi-sprint engagement for complex builds.',
    features: ['Full website or web app', 'End-to-end rebrand', 'Content architecture + production', 'Analytics + tracking infrastructure'],
  },
  {
    name: 'Retainer',
    price: '$3K–$20K/mo',
    description: 'Ongoing execution across marketing, tech, and automation.',
    features: ['Monthly SEO + content', 'Paid media optimization', 'CRO + landing page iteration', 'Reporting + strategy'],
  },
];

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Pricing', path: '/pricing' }]),
          ]),
        }}
      />
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">Transparent Pricing</Badge>
            <Heading level="h1" className="mb-6">Investment That Compounds</Heading>
            <p className="text-xl text-[var(--text-muted)] max-w-3xl mx-auto leading-relaxed">
              No hidden fees. No long lock-in. Every engagement starts with a free audit so you can evaluate our work before committing.
            </p>
          </div>

          {/* Retainer Tiers */}
          <section className="mb-24">
            <Heading level="h2" className="text-center mb-12">Marketing Retainers</Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`rounded-2xl border p-8 flex flex-col ${tier.highlight ? 'border-[var(--accent)] bg-[rgba(var(--accent-rgb),0.06)]' : 'border-[var(--border)] bg-[var(--card-bg)]'}`}
                >
                  <h3 className="text-2xl font-semibold text-[var(--text)] mb-2">{tier.name}</h3>
                  <div className="text-3xl font-bold text-[var(--accent)] mb-4">{tier.price}</div>
                  <p className="text-[var(--text-muted)] mb-8">{tier.description}</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                        <CheckCircle2 className="text-[var(--accent)] shrink-0 mt-0.5" size={16} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {tier.href.startsWith('http') ? (
                    <a href={tier.href} target="_blank" rel="noopener noreferrer" className={`rounded-lg px-6 py-3 text-center text-sm font-medium transition-all ${tier.highlight ? 'bg-[var(--accent)] text-[var(--accent-deep)] hover:brightness-110' : 'border border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)]'}`}>
                      {tier.cta} <ArrowRight size={16} className="inline ml-1" />
                    </a>
                  ) : (
                    <Link href={tier.href} className={`rounded-lg px-6 py-3 text-center text-sm font-medium transition-all ${tier.highlight ? 'bg-[var(--accent)] text-[var(--accent-deep)] hover:brightness-110' : 'border border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)]'}`}>
                      {tier.cta} <ArrowRight size={16} className="inline ml-1" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Project Tiers */}
          <section className="mb-24">
            <Heading level="h2" className="text-center mb-12">Project & Build Pricing</Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projectTiers.map((tier) => (
                <div key={tier.name} className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-8">
                  <h3 className="text-2xl font-semibold text-[var(--text)] mb-2">{tier.name}</h3>
                  <div className="text-3xl font-bold text-[var(--accent)] mb-4">{tier.price}</div>
                  <p className="text-[var(--text-muted)] mb-8">{tier.description}</p>
                  <ul className="space-y-3">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                        <CheckCircle2 className="text-[var(--accent)] shrink-0 mt-0.5" size={16} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="max-w-3xl mx-auto">
            <Heading level="h2" className="text-center mb-12">Common Pricing Questions</Heading>
            <div className="space-y-6">
              {[
                { q: 'What drives price variation within each tier?', a: 'Scope, complexity, speed, and number of channels. A local SEO program costs less than multi-market SEO + paid media. We give you a fixed price before any work begins.' },
                { q: 'Is there a minimum commitment?', a: 'Retainers are month-to-month after the first 90 days. Projects have a fixed scope and timeline. We earn the relationship every month — no lock-in contracts.' },
                { q: 'Do you offer performance-based pricing?', a: 'For established companies with clear baseline metrics and tracking, we can structure hybrid retainers with performance bonuses tied to qualified leads, pipeline, or revenue. This is discussed during the strategy call.' },
                { q: 'What does the free audit include?', a: 'A 12-page report covering technical SEO, on-page signals, conversion readiness, competitive gaps, and a prioritized action plan. Delivered within 48 hours. No credit card required.' },
              ].map((faq) => (
                <div key={faq.q} className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-6">
                  <h3 className="text-lg font-semibold text-[var(--text)] mb-3">{faq.q}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-16 text-center">
            <p className="text-[var(--text-muted)] mb-6">Not sure which tier fits? Start with a free audit — we will recommend the right scope.</p>
            <Link
              href="/free-seo-audit"
              className="inline-flex rounded-lg bg-[var(--accent)] text-[var(--accent-deep)] font-medium px-8 py-4 text-sm hover:brightness-110 transition-all"
            >
              Get Free Growth Audit <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
