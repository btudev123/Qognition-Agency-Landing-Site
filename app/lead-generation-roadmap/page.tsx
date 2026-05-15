import Link from 'next/link';
import SchemaScript from '../SchemaScript';
import { breadcrumbSchema, metadataFor } from '../../lib/seo';

export const dynamic = 'force-static';

export const metadata = metadataFor({
  title: '30-Day Lead Generation Roadmap | Qognition Agency',
  description:
    'A practical homepage, funnel, social proof, service-page, SEO, LinkedIn, case-study, and B2B tech-stack roadmap for generating more qualified leads.',
  path: '/lead-generation-roadmap'
});

const mofuKeywords = [
  'performance marketing agency for B2B SaaS',
  'SEO agency for law firms',
  'Google Ads agency for clinics',
  'digital marketing agency for companies entering China',
  'AI search optimization agency for B2B companies'
];

export default function Page() {
  return (
    <>
      <SchemaScript
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Lead Generation Roadmap', path: '/lead-generation-roadmap' }
        ])}
      />
      <main className="min-h-screen pt-32 px-6 md:px-12 pb-28">
        <section className="max-w-7xl mx-auto">
          <span className="text-teal-400 font-mono text-sm uppercase tracking-widest">Immediate Lead Plan</span>
          <h1 className="font-display text-5xl md:text-8xl leading-none mt-6 mb-8">30-Day Roadmap to More Qualified Leads</h1>
          <p className="text-xl text-gray-300 max-w-4xl leading-relaxed">
            A conversion-first plan for making the Qognition website clearer above the fold, easier to trust, easier to act on, and more discoverable across Google, AI search, country pages, and LinkedIn.
          </p>
        </section>

        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <Block title="3-Second Rule Check" items={[
            'Visitor should instantly know Qognition gets qualified leads for B2B, professional services, clinics, SaaS, and market-entry companies.',
            'Above the fold should name the outcome: booked calls, qualified pipeline, SEO, Google Ads, AI search, landing pages, and HubSpot tracking.',
            'Primary CTA should be low-friction: Get Free Growth Audit.'
          ]} />
          <Block title="Low-Friction Lead Magnets" items={[
            'Free Growth Audit: website, SEO, PPC, lead capture, and competitor snapshot.',
            'SEO ROI Calculator: forecast traffic, leads, revenue, and payback.',
            'China Market Entry Audit: for companies entering China or marketing out of China.'
          ]} />
          <Block title="Social Proof Gaps" items={[
            'Add proof-backed testimonials with photos or LinkedIn links where available.',
            'Add certification badges: Google Partner, HubSpot Solutions Partner, Meta Business Partner, Clutch/G2 reviews when available.',
            'Case studies should lead with revenue, leads, CAC, ROAS, or pipeline impact before deliverables.'
          ]} />
          <Block title="Service Page ROI Structure" items={[
            'Open with business outcome, not features.',
            'Show the cost of inaction, expected timeline, proof, process, FAQs, and calculator/resource CTA.',
            'Add examples by industry and location so visitors see relevance quickly.'
          ]} />
        </section>

        <section className="max-w-7xl mx-auto mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Block title="5 MoFu Keywords to Own" items={mofuKeywords} />
          <Block title="4-Week LinkedIn Pillars" items={[
            'Week 1: Founder POV on why most marketing fails to create pipeline.',
            'Week 2: SEO and AI search teardown posts with before/after examples.',
            'Week 3: Paid media waste, landing page economics, and HubSpot attribution.',
            'Week 4: Market-entry content for China, GCC, India, US, UK, Australia, and multilingual growth.'
          ]} />
          <Block title="Recommended B2B Stack" items={[
            'HubSpot for CRM, forms, lifecycle stages, and automated follow-up.',
            'Apollo or Clay for outbound enrichment and account lists.',
            'GA4, Google Search Console, Looker Studio, and PostHog for analytics.',
            'CallRail or WhatConverts for call attribution.',
            'Calendly, Zapier/Make, Leadfeeder/RB2B for routing and visitor intelligence.'
          ]} />
        </section>

        <section className="max-w-7xl mx-auto mt-16 rounded-2xl border border-teal-400/20 bg-teal-400/5 p-8">
          <h2 className="font-display text-4xl mb-6">Exact Homepage Copy</h2>
          <p className="text-2xl text-white mb-4">Get qualified leads online.</p>
          <p className="text-gray-300 mb-6">
            Qognition helps law firms, clinics, consultants, SaaS teams, and B2B companies turn search demand into booked calls with SEO, Google Ads, conversion pages, AI search visibility, and HubSpot tracking.
          </p>
          <Link href="/free-seo-audit" className="inline-flex rounded-full bg-teal-400 px-8 py-4 font-display text-sm uppercase tracking-wider text-black hover:bg-white">
            Get Free Growth Audit
          </Link>
        </section>

        <section className="max-w-7xl mx-auto mt-16">
          <h2 className="font-display text-4xl mb-8">Perfect Case Study Template</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Block title="Before" items={['Baseline traffic, leads, CAC, conversion rate, rankings, funnel screenshots, analytics snapshot.']} />
            <Block title="Intervention" items={['Strategy, timeline, technical fixes, content architecture, landing pages, campaigns, CRM setup.']} />
            <Block title="After" items={['Revenue, leads, ROI, timeline, screenshots, client quote, what changed, next growth lever.']} />
          </div>
        </section>
      </main>
    </>
  );
}

const Block = ({ title, items }: { title: string; items: string[] }) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
    <h2 className="font-display text-2xl mb-5">{title}</h2>
    <div className="space-y-3">
      {items.map((item) => (
        <p key={item} className="text-sm text-gray-300 leading-relaxed">{item}</p>
      ))}
    </div>
  </div>
);
