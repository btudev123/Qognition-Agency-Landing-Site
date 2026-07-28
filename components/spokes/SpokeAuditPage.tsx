'use client';

import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import type { SpokeId } from '../../lib/spokes';
import { SPOKES } from '../../lib/spokes';
import LeadForm from '../shared/LeadForm';
import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';

export default function SpokeAuditPage({ spoke }: { spoke: SpokeId }) {
  const config = SPOKES[spoke];

  const auditContent: Record<SpokeId, {
    title: string;
    h1: string;
    subhead: string;
    cta: string;
    deliverables: string[];
    qualifyingQuestion: string;
    process: { step: string; description: string }[];
    faqs: { question: string; answer: string }[];
  }> = {
    marketing: {
      title: 'Free Marketing & AI Search Audit',
      h1: 'Get a 12-Page Marketing Diagnostic — Free, Within 48 Hours',
      subhead: 'We\'ll review your SEO, paid media, content, conversion paths, and AI search visibility. You\'ll receive a prioritized report with specific, actionable recommendations.',
      cta: 'Get My Free Audit',
      deliverables: [
        'Technical SEO audit with prioritized fix list',
        'Paid media efficiency analysis (wasted spend identification)',
        'Conversion path audit with friction point mapping',
        'Content effectiveness assessment with gap analysis',
        'Competitive positioning review (what your competitors do that you don\'t)',
        'AI search visibility check (are LLMs citing your brand?)',
        'Website performance and Core Web Vitals assessment',
        'CRM and tracking audit (are you capturing what matters?)',
        'Prioritized 90-day action plan with effort × impact scoring',
        '15-minute Loom walkthrough explaining key findings',
      ],
      qualifyingQuestion: 'What\'s your biggest marketing challenge right now?',
      process: [
        { step: '1', description: 'Fill out the form (2 minutes). Tell us about your company and your biggest marketing challenge.' },
        { step: '2', description: 'We review within 24 hours. Our team analyzes your website, SEO, paid media, content, and AI visibility.' },
        { step: '3', description: 'Receive your audit within 48 hours. A 12-page deck with specific, prioritized recommendations.' },
        { step: '4', description: 'Optional: 30-minute walkthrough call to discuss findings and answer questions.' },
      ],
      faqs: [
        { question: 'Is this really free?', answer: 'Yes. No credit card. No commitment. We earn the relationship by proving our value first — the audit is our best sales pitch.' },
        { question: 'What\'s the catch?', answer: 'There isn\'t one. We\'re betting that the quality of this audit proves our value better than any sales pitch ever could. If you like what you see, we\'d love to talk about working together. If not, you still got a valuable diagnostic for free.' },
        { question: 'How long does it take to get my audit?', answer: '48 hours or less. Most audits are delivered within 24 hours. If you need it faster (e.g., for a board meeting or investor update), mention it in the form and we\'ll do our best to expedite.' },
        { question: 'Will you sell my data or spam me?', answer: 'Never. We send one follow-up email to schedule the optional walkthrough call. That\'s it. No auto-sequences. No "check out our blog" drip campaigns. Your data is yours — we don\'t share, sell, or abuse it.' },
        { question: 'What do you need from me to run the audit?', answer: 'Just your website URL and a brief description of your biggest marketing challenge. If you have Google Analytics or ad account access and want to share read-only access, we can go deeper — but it\'s not required.' },
      ],
    },
    tech: {
      title: 'Free Tech & Performance Audit',
      h1: 'Get a Detailed Tech Diagnostic — Free, Within 48 Hours',
      subhead: 'We\'ll analyze your website\'s performance, accessibility, SEO, security, and stack architecture. You\'ll receive a prioritized report with specific, actionable fixes.',
      cta: 'Get My Free Audit',
      deliverables: [
        'Lighthouse performance audit with prioritized fix list',
        'Core Web Vitals assessment (LCP, CLS, INP) with improvement roadmap',
        'SEO technical audit (crawlability, indexability, schema, metadata)',
        'Security header audit and hardening recommendations',
        'Accessibility audit (WCAG 2.1 AA compliance check)',
        'JavaScript bundle analysis with size reduction recommendations',
        'Third-party script impact assessment',
        'Stack architecture review with modernization options',
        'Hosting and CDN configuration review',
        '10-minute Loom walkthrough explaining key findings',
      ],
      qualifyingQuestion: 'What\'s the biggest technical challenge with your website or product?',
      process: [
        { step: '1', description: 'Fill out the form (2 minutes). Share your website URL and your biggest technical challenge.' },
        { step: '2', description: 'We run a comprehensive audit within 24 hours, analyzing your stack from performance to security.' },
        { step: '3', description: 'Receive your audit within 48 hours. A detailed report with prioritized fixes and estimated effort.' },
        { step: '4', description: 'Optional: 30-minute walkthrough call to discuss findings and answer technical questions.' },
      ],
      faqs: [
        { question: 'Is this really free?', answer: 'Yes. No credit card. No commitment. The audit is our best demonstration of technical competence — we earn the relationship by proving we know what we\'re doing.' },
        { question: 'What tech stacks do you audit?', answer: 'We audit any web-based tech stack. We specialize in Next.js, React, and Node.js but can assess any modern web application — WordPress, Shopify, Webflow, custom stacks, you name it. The performance and SEO principles are universal.' },
        { question: 'Will you need access to our codebase?', answer: 'No. We audit from the outside — what your users and search engines see. If you want a deeper code-level review, that\'s available as a follow-up engagement, but the free audit requires no access.' },
        { question: 'How actionable are the recommendations?', answer: 'Very. Every finding includes: what\'s wrong, why it matters, how to fix it, and estimated effort (hours). Your development team can implement the fixes directly from the report — or we can do it for you.' },
      ],
    },
    finance: {
      title: 'Free Finance Health Check',
      h1: 'Get a Finance Health Benchmark — Free, Within 48 Hours',
      subhead: 'We\'ll assess your bookkeeping quality, cash flow health, tax efficiency, and financial operations maturity. You\'ll get a benchmark report with actionable recommendations.',
      cta: 'Get My Free Health Check',
      deliverables: [
        'Bookkeeping quality assessment with accuracy score',
        'Cash flow health indicators (burn rate, runway, working capital)',
        'Tax efficiency review with deduction opportunity estimate',
        'Financial operations maturity benchmark vs. peer companies',
        'Entity structure review with optimization opportunities',
        'Technology stack assessment (accounting, payroll, expense tools)',
        'Investor readiness score (if applicable)',
        'Prioritized recommendations with effort × impact scoring',
        '15-minute Loom walkthrough explaining key findings',
      ],
      qualifyingQuestion: 'What\'s your biggest financial concern or challenge right now?',
      process: [
        { step: '1', description: 'Fill out the form (2 minutes). Tell us about your company stage, revenue, and biggest financial concern.' },
        { step: '2', description: 'We review within 24 hours, analyzing your financial setup against best practices for your stage.' },
        { step: '3', description: 'Receive your health check within 48 hours. A benchmark report with specific recommendations.' },
        { step: '4', description: 'Optional: 30-minute walkthrough call to discuss findings and answer questions.' },
      ],
      faqs: [
        { question: 'Is this really free?', answer: 'Yes. No credit card. No commitment. We earn the relationship by demonstrating our financial expertise. The health check is valuable even if you never work with us.' },
        { question: 'Do you need access to my financial accounts?', answer: 'No. The free health check is based on a conversation about your current setup — what tools you use, how you handle bookkeeping, your entity structure, and your biggest financial concerns. No account access needed.' },
        { question: 'What if my books are a mess?', answer: 'That\'s exactly who this is for. No judgment — we\'ve seen it all. The health check will tell you how far you are from best practice and what it would take to get clean. We\'ve cleaned up books that were 2+ years behind.' },
        { question: 'Is my financial information kept confidential?', answer: 'Absolutely. Everything you share is treated as confidential client information, whether or not you become a client. We\'re happy to sign an NDA if you prefer.' },
      ],
    },
    automation: {
      title: 'Free Automation Opportunity Map',
      h1: 'Get Your Automation Roadmap — Free, Within 72 Hours',
      subhead: 'We\'ll map your current manual processes, identify the highest-ROI automation opportunities, and deliver a prioritized roadmap with estimated time and cost savings.',
      cta: 'Get My Free Automation Map',
      deliverables: [
        'Current process map with pain points and bottlenecks identified',
        'Automation opportunity prioritization matrix (impact × effort)',
        'Estimated hours saved and cost reduction per opportunity',
        'Recommended tool stack for your specific automation needs',
        'AI agent suitability assessment — which processes could AI handle',
        'Integration map showing how your tools could connect',
        '90-day automation roadmap with quick wins identified',
        'Estimated ROI and payback period for each opportunity',
        '10-minute Loom walkthrough explaining key findings',
      ],
      qualifyingQuestion: 'What\'s the most repetitive, time-consuming process in your business right now?',
      process: [
        { step: '1', description: 'Fill out the form (2 minutes). Tell us about your current tools, team size, and biggest operational bottleneck.' },
        { step: '2', description: 'We analyze within 48 hours, mapping your processes and identifying automation opportunities.' },
        { step: '3', description: 'Receive your Automation Opportunity Map within 72 hours. A process diagram with prioritized automation roadmap.' },
        { step: '4', description: 'Optional: 30-minute walkthrough call to discuss findings and answer questions.' },
      ],
      faqs: [
        { question: 'Is this really free?', answer: 'Yes. No credit card. No commitment. The Opportunity Map is our best demonstration of automation expertise — we identify real opportunities with real ROI estimates.' },
        { question: 'What tools and platforms do you work with?', answer: 'All of them. We\'re tool-agnostic — our recommendations are based on your needs, not our partnerships. We work with n8n, Make, Zapier, HubSpot, Airtable, and build custom solutions when off-the-shelf tools fall short.' },
        { question: 'How is this different from other automation consultations?', answer: 'Most "automation consultations" are thinly veiled sales calls for a specific tool. Our Opportunity Map is tool-agnostic and focused on outcomes — hours saved, errors reduced, revenue captured. We recommend the right tool for the job, not the tool we get a commission on.' },
        { question: 'Do I need to be technical to benefit from automation?', answer: 'No. We design automations that work for your team, not just your engineers. Many automations run entirely in the background — your team just experiences less manual work. For automations that involve team interaction, we include training and documentation.' },
      ],
    },
  };

  const content = auditContent[spoke];

  return (
    <main className="min-h-screen">
      {/* Hero — no nav distractions */}
      <section className="relative px-6 md:px-12 pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[var(--accent)]/8 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <ScrollReveal>
              <span className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
                {content.title}
              </span>
            </ScrollReveal>

            <MaskReveal>
              <h1 className="text-display text-[var(--ink)] text-balance font-semibold">
                {content.h1}
              </h1>
            </MaskReveal>

            <ScrollReveal stagger={150}>
              <p className="text-body mt-6 text-[var(--text-muted)] max-w-3xl">
                {content.subhead}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* What You'll Get */}
      <section className="px-6 md:px-12 py-16 sm:py-20 bg-[var(--bg-warm)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
          <ScrollReveal>
            <h2 className="text-h2 text-[var(--ink)] mb-8 font-semibold">
              What you&apos;ll get
            </h2>
            <ul className="space-y-4">
              {content.deliverables.map((d, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check size={20} className="text-[var(--accent)] mt-0.5 shrink-0" />
                  <span className="text-[var(--text-muted)] leading-relaxed">{d}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal stagger={100}>
            <div className="rounded-2xl border border-[var(--accent)]/20 bg-[var(--surface)] p-6 sm:p-8 max-lg:static lg:sticky lg:top-28">
              <h3 className="text-h3 text-[var(--ink)] mb-2 font-semibold">Get your free audit</h3>
              <p className="text-body text-[var(--text-muted)] mb-6">
                Fill out the form. We deliver within 48 hours. No commitment.
              </p>
              <LeadForm
                spoke={spoke}
                intent="audit"
                sourcePage={`/${spoke}/audit`}
                ctaLabel={content.cta}
                qualifyingQuestion={content.qualifyingQuestion}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="px-6 md:px-12 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-h2 text-[var(--ink)] mb-8 text-center font-semibold">
              Who this is for
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <ScrollReveal>
              <div className="rounded-2xl border border-[var(--accent)]/20 bg-[rgba(var(--accent-rgb),0.04)] p-5 sm:p-6">
                <h3 className="text-h3 text-[var(--ink)] mb-2 font-semibold">✅ You if…</h3>
                <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                  <li>• You&apos;re a founder or operator running a business with real revenue</li>
                  <li>• You know there&apos;s room for improvement but don&apos;t know where to start</li>
                  <li>• You value expertise and are willing to invest if the ROI is clear</li>
                  <li>• You want an honest assessment, not a sales pitch</li>
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal stagger={100}>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
                <h3 className="text-h3 text-[var(--ink)] mb-2 font-semibold">❌ Not for you if…</h3>
                <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                  <li>• You&apos;re looking for free work disguised as an audit</li>
                  <li>• You&apos;re not willing to invest in fixing what the audit finds</li>
                  <li>• You need results tomorrow — good work takes time</li>
                  <li>• You&apos;re a student or hobbyist (we serve operating businesses)</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-6 md:px-12 py-16 sm:py-20 bg-[var(--bg-warm)]">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-h2 text-[var(--ink)] mb-12 text-center font-semibold">
              How it works
            </h2>
          </ScrollReveal>
          <div className="space-y-6">
            {content.process.map((step, i) => (
              <ScrollReveal key={step.step} stagger={i * 75}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent)] text-[var(--accent-deep)] flex items-center justify-center font-bold text-sm shrink-0">
                    {step.step}
                  </div>
                  <p className="text-body text-[var(--text-muted)] pt-2">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-12 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="text-h2 text-[var(--ink)] mb-10 text-center font-semibold">
              Common questions
            </h2>
          </ScrollReveal>
          <div className="space-y-6">
            {content.faqs.map((faq, i) => (
              <ScrollReveal key={faq.question} stagger={i * 50}>
                <div>
                  <h3 className="text-h3 text-[var(--ink)] mb-2 font-semibold">{faq.question}</h3>
                  <p className="text-body text-[var(--text-muted)]">{faq.answer}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 md:px-12 py-16 sm:py-20 bg-[var(--bg-warm)]">
        <div className="max-w-xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-h2 text-[var(--ink)] mb-4 font-semibold">
              Ready to get started?
            </h2>
            <p className="text-body text-[var(--text-muted)] mb-8">
              Fill out the form above. We deliver your audit within 48 hours. No commitment, no pitch — just an honest assessment.
            </p>
            <Link
              href={`/${spoke}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:underline"
            >
              ← Back to {config.label}
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
