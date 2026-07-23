import type { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbSchema } from '../../lib/schema';
import Section from '../../components/ui/Section';
import Heading from '../../components/ui/Heading';
import Badge from '../../components/ui/Badge';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '30-Day Lead Generation Roadmap | Qognition',
  description: 'A practical homepage, funnel, social proof, service-page, SEO, LinkedIn, case-study, and B2B tech-stack roadmap for generating more qualified leads.',
  alternates: { canonical: '/lead-generation-roadmap' },
};

const mofuKeywords = [
  'performance marketing agency for B2B SaaS',
  'SEO agency for law firms',
  'Google Ads agency for clinics',
  'digital marketing agency for companies entering China',
  'AI search optimization agency for B2B companies',
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
              { name: 'Lead Generation Roadmap', path: '/lead-generation-roadmap' },
            ]),
          ]),
        }}
      />
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6">
        <Section spacing="lg">
          <Badge className="mb-4">Immediate Lead Plan</Badge>
          <Heading level="h1" className="mb-6">30-Day Roadmap to More Qualified Leads</Heading>
          <p className="text-body text-[var(--text-muted)] max-w-4xl">
            A conversion-first plan for making the Qognition website clearer above the fold, easier to trust, easier to act on, and more discoverable across Google, AI search, country pages, and LinkedIn.
          </p>
        </Section>

        <Section spacing="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Block title="3-Second Rule Check" items={[
              'Visitor should instantly know Qognition gets qualified leads for B2B, professional services, clinics, SaaS, and market-entry companies.',
              'Above the fold should name the outcome: booked calls, qualified pipeline, SEO, Google Ads, AI search, landing pages, and HubSpot tracking.',
              'Primary CTA should be low-friction: Get Free Growth Audit.',
            ]} />
            <Block title="Low-Friction Lead Magnets" items={[
              'Free Growth Audit: website, SEO, PPC, lead capture, and competitor snapshot.',
              'SEO ROI Calculator: forecast traffic, leads, revenue, and payback.',
              'China Market Entry Audit: for companies entering China or marketing out of China.',
            ]} />
            <Block title="Social Proof Gaps" items={[
              'Add proof-backed testimonials with photos or LinkedIn links where available.',
              'Add certification badges: Google Partner, HubSpot Solutions Partner, Meta Business Partner, Clutch/G2 reviews when available.',
              'Case studies should lead with revenue, leads, CAC, ROAS, or pipeline impact before deliverables.',
            ]} />
            <Block title="Service Page ROI Structure" items={[
              'Open with business outcome, not features.',
              'Show the cost of inaction, expected timeline, proof, process, FAQs, and calculator/resource CTA.',
              'Add examples by industry and location so visitors see relevance quickly.',
            ]} />
          </div>
        </Section>

        <Section spacing="lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Block title="5 MoFu Keywords to Own" items={mofuKeywords} />
            <Block title="4-Week LinkedIn Pillars" items={[
              'Week 1: Founder POV on why most marketing fails to create pipeline.',
              'Week 2: SEO and AI search teardown posts with before/after examples.',
              'Week 3: Paid media waste, landing page economics, and HubSpot attribution.',
              'Week 4: Market-entry content for China, GCC, India, US, UK, Australia, and multilingual growth.',
            ]} />
            <Block title="Recommended B2B Stack" items={[
              'HubSpot for CRM, forms, lifecycle stages, and automated follow-up.',
              'Apollo or Clay for outbound enrichment and account lists.',
              'GA4, Google Search Console, Looker Studio, and PostHog for analytics.',
              'CallRail or WhatConverts for call attribution.',
              'Calendly, Zapier/Make, Leadfeeder/RB2B for routing and visitor intelligence.',
            ]} />
          </div>
        </Section>

        <Section spacing="lg">
          <div className="rounded-2xl border border-[var(--accent)]/20 bg-[rgba(var(--accent-rgb),0.04)] p-8">
            <Heading level="h2" className="mb-6">Exact Homepage Copy</Heading>
            <p className="text-body text-[var(--text)] mb-4">Get qualified leads online.</p>
            <p className="text-body text-[var(--text-muted)] mb-6">
              Qognition helps law firms, clinics, consultants, SaaS teams, and B2B companies turn search demand into booked calls with SEO, Google Ads, conversion pages, AI search visibility, and HubSpot tracking.
            </p>
            <Link
              href="/free-seo-audit"
              className="inline-flex rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--accent-deep)] hover:brightness-110 transition-all"
            >
              Get Free Growth Audit
            </Link>
          </div>
        </Section>

        <Section spacing="lg">
          <Heading level="h2" className="mb-8">Perfect Case Study Template</Heading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Block title="Before" items={['Baseline traffic, leads, CAC, conversion rate, rankings, funnel screenshots, analytics snapshot.']} />
            <Block title="Intervention" items={['Strategy, timeline, technical fixes, content architecture, landing pages, campaigns, CRM setup.']} />
            <Block title="After" items={['Revenue, leads, ROI, timeline, screenshots, client quote, what changed, next growth lever.']} />
          </div>
        </Section>
      </main>
    </>
  );
}

const Block = ({ title, items }: { title: string; items: string[] }) => (
  <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6">
    <h2 className="text-h2 text-[var(--text)] mb-5 font-semibold">{title}</h2>
    <div className="space-y-3">
      {items.map((item) => (
        <p key={item} className="text-body text-[var(--text-muted)]">{item}</p>
      ))}
    </div>
  </div>
);
