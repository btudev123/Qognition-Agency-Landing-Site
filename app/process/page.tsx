import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Search, BarChart3, PenTool, Wrench, Monitor, RefreshCw } from 'lucide-react';
import { breadcrumbSchema } from '../../lib/schema';
import Heading from '../../components/ui/Heading';
import Badge from '../../components/ui/Badge';

export const metadata: Metadata = {
  title: 'How We Work | Qognition Engagement Model',
  description: 'Our engagement model: Free audit → Strategy call → Execute → Optimize. We operate as your growth partner, not a vendor.',
  alternates: { canonical: '/process' },
};

const phases = [
  {
    icon: Search,
    title: 'Audit & Discovery',
    timeline: 'Week 1',
    description: 'We review your website, SEO, paid media, conversion paths, CRM tracking, and competitive landscape. You receive a prioritized report within 48 hours.',
    deliverables: ['Technical SEO audit', 'Conversion audit', 'Competitive gap analysis', 'Prioritized action plan'],
  },
  {
    icon: BarChart3,
    title: 'Strategy Workshop',
    timeline: 'Week 2',
    description: 'We map your highest-intent keywords, buyer journeys, funnel stages, and revenue attribution model. The output is a 90-day roadmap with measurable milestones.',
    deliverables: ['Keyword + funnel map', '90-day roadmap', 'Attribution model', 'Tech stack recommendations'],
  },
  {
    icon: PenTool,
    title: 'Build & Execute',
    timeline: 'Weeks 3–12',
    description: 'We ship in weekly sprints: content, landing pages, paid campaigns, technical fixes, tracking, and conversion experiments. Every sprint has a measurable owner and quality bar.',
    deliverables: ['Weekly sprint delivery', 'Content + landing pages', 'Paid campaign launches', 'CRM + tracking setup'],
  },
  {
    icon: Monitor,
    title: 'Measure & Report',
    timeline: 'Ongoing',
    description: 'We connect rankings, traffic, leads, pipeline, and revenue in a single dashboard. Reports show what moved the needle — not vanity metrics.',
    deliverables: ['Weekly performance dashboards', 'Monthly executive summaries', 'Attribution reporting', 'Pipeline tracking'],
  },
  {
    icon: RefreshCw,
    title: 'Optimize & Scale',
    timeline: 'Ongoing',
    description: 'We use data to decide the next sprint: double down on what works, cut what does not, and expand into new channels or markets when the unit economics make sense.',
    deliverables: ['A/B test results', 'Channel expansion plan', 'Budget reallocation', 'Quarterly strategy refresh'],
  },
];

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'How We Work', path: '/process' }]),
          ]),
        }}
      />
      <main className="min-h-screen pt-36 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4">Engagement Model</Badge>
            <Heading level="h1" className="mb-6">How We Work</Heading>
            <p className="text-body text-[var(--text-muted)] max-w-3xl mx-auto">
              We operate as your growth partner, not a vendor. Every engagement follows a proven process designed to create measurable pipeline within 90 days.
            </p>
          </div>

          {/* Phases Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-[44px] top-0 bottom-0 w-px bg-[var(--border)]" />

            <div className="space-y-12">
              {phases.map((phase, index) => (
                <div key={phase.title} className="relative flex flex-col md:flex-row gap-6 md:gap-12">
                  {/* Icon */}
                  <div className="flex-shrink-0 flex items-start">
                    <div className="w-12 h-12 md:w-[88px] md:h-[88px] rounded-2xl border border-[var(--accent)]/20 bg-[rgba(var(--accent-rgb),0.08)] flex items-center justify-center z-10">
                      <phase.icon className="text-[var(--accent)]" size={32} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                      <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-wider">0{index + 1}</span>
                      <h2 className="text-h2 text-[var(--text)] font-semibold">{phase.title}</h2>
                      <span className="text-xs font-medium text-[var(--text-muted)] bg-[var(--surface)] border border-[var(--border)] rounded-full px-3 py-1 sm:ml-auto">
                        {phase.timeline}
                      </span>
                    </div>
                    <p className="text-body text-[var(--text-muted)] mb-6">{phase.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {phase.deliverables.map((d) => (
                        <span key={d} className="text-xs text-[var(--text-muted)] bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-2">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 text-center rounded-2xl border border-[var(--accent)]/20 bg-[rgba(var(--accent-rgb),0.04)] p-12">
            <Heading level="h2" className="mb-4">Ready to start?</Heading>
            <p className="text-body text-[var(--text-muted)] mb-8 max-w-xl mx-auto">
              Every engagement begins with a free audit. No commitment. No pitch. Just an honest assessment of where you are and what would move the needle.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/free-seo-audit"
                className="rounded-lg bg-[var(--accent)] text-[var(--accent-deep)] font-medium px-8 py-4 text-sm hover:brightness-110 transition-all inline-flex items-center gap-2"
              >
                Get Free Growth Audit <ArrowRight size={16} />
              </Link>
              <Link
                href="/pricing"
                className="rounded-lg border border-[var(--border)] text-[var(--text)] font-medium px-8 py-4 text-sm hover:border-[var(--accent)] transition-all"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
