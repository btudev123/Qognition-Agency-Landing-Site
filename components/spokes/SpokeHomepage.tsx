'use client';

import Link from 'next/link';
import { ArrowRight, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import type { SpokePageData, SubService } from '../../data/spoke-services';
import type { SpokeId } from '../../lib/spokes';
import { SPOKES } from '../../lib/spokes';
import LeadForm from '../shared/LeadForm';
import CalendlyEmbed from '../shared/CalendlyEmbed';
import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';
import CountUp from '../shared/CountUp';

/* ── Shared sub-components ─────────────────────────────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
      {children}
    </span>
  );
}

function Btn({
  href,
  children,
  variant = 'primary',
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}) {
  const primary =
    'inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--accent-deep)] hover:brightness-110 transition-all';
  const secondary =
    'inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-6 py-3 text-sm font-medium text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all';

  if (href.startsWith('http')) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={variant === 'primary' ? primary : secondary}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={variant === 'primary' ? primary : secondary}>
      {children}
    </Link>
  );
}

/* ── Hero ──────────────────────────────────────────────────── */

function SpokeHeroSection({ data }: { data: SpokePageData }) {
  const config = SPOKES[data.spoke];
  return (
    <section className="relative min-h-[90vh] flex items-center px-6 md:px-12 pt-32 pb-20 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[var(--accent)]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--accent)]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <ScrollReveal>
          <Eyebrow>{data.hero.badge}</Eyebrow>
        </ScrollReveal>

        <MaskReveal>
          <h1 className="text-display text-[var(--ink)] max-w-5xl text-balance font-semibold">
            {data.hero.h1}
          </h1>
        </MaskReveal>

        <ScrollReveal stagger={150}>
          <p className="text-body mt-8 text-[var(--text-muted)] max-w-3xl">
            {data.hero.subhead}
          </p>
        </ScrollReveal>

        <ScrollReveal stagger={300}>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Btn href={`/${data.spoke}/audit`}>{data.hero.cta}</Btn>
            <Btn href={config.calLink} variant="secondary">
              {data.hero.secondaryCta} <ArrowRight size={16} />
            </Btn>
          </div>
        </ScrollReveal>

        {/* Stats row */}
        <ScrollReveal stagger={450}>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-t border-[var(--border)]">
            {data.hero.stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-semibold text-[var(--ink)]">
                  <CountUp to={parseFloat(stat.value)} suffix={stat.value.replace(/[\d.]+/, '')} />
                </div>
                <div className="text-sm text-[var(--text-muted)] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ── Pain Points ───────────────────────────────────────────── */

function SpokePainsSection({ data }: { data: SpokePageData }) {
  return (
    <section className="px-6 md:px-12 py-16 sm:py-20 md:py-32 bg-[var(--bg-warm)]">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <Eyebrow>The Problem</Eyebrow>
          <h2 className="text-display text-[var(--ink)] mt-4 max-w-3xl font-semibold">
            You&apos;re not alone. These are the patterns we fix.
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.pains.map((pain, i) => (
            <ScrollReveal key={pain.title} stagger={i * 100}>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 h-full flex flex-col">
                <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] font-bold text-sm mb-6">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-h3 text-[var(--ink)] mb-4 font-semibold">{pain.title}</h3>
                <p className="text-body text-[var(--text-muted)] mb-4 flex-1">{pain.why}</p>
                <div className="border-t border-[var(--border)] pt-4 mt-auto">
                  <p className="text-meta font-medium text-[var(--accent)] uppercase">The Cost</p>
                  <p className="text-body text-[var(--text-muted)] mt-1">{pain.cost}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Process ───────────────────────────────────────────────── */

function SpokeProcessSection({ data }: { data: SpokePageData }) {
  return (
    <section className="px-6 md:px-12 py-16 sm:py-20 md:py-32">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <Eyebrow>How We Work</Eyebrow>
          <h2 className="text-display text-[var(--ink)] mt-4 max-w-3xl font-semibold">
            Three steps from where you are to where you want to be.
          </h2>
        </ScrollReveal>

        <div className="mt-16 relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-[44px] top-0 bottom-0 w-px bg-[var(--border)]" />

          <div className="space-y-12">
            {data.process.map((step, i) => (
              <ScrollReveal key={step.title} stagger={i * 100}>
                <div className="relative flex flex-col md:flex-row gap-6 md:gap-12">
                  <div className="flex-shrink-0 flex items-start">
                    <div className="w-12 h-12 md:w-[88px] md:h-[88px] rounded-2xl border border-[var(--accent)]/20 bg-[rgba(var(--accent-rgb),0.08)] flex items-center justify-center z-10">
                      <span className="text-[var(--accent)] font-mono text-lg font-semibold">{step.step}</span>
                    </div>
                  </div>
                  <div className="flex-1 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
                    <h3 className="text-h3 text-[var(--ink)] mb-3 font-semibold">{step.title}</h3>
                    <p className="text-body text-[var(--text-muted)] mb-6">{step.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {step.deliverables.map((d) => (
                        <span key={d} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                          <Check size={16} className="text-[var(--accent)] mt-0.5 shrink-0" />
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Outcomes / Proof ──────────────────────────────────────── */

function SpokeOutcomesSection({ data }: { data: SpokePageData }) {
  if (!data.outcomes.length) return null;
  return (
    <section className="px-6 md:px-12 py-24 md:py-32 bg-[var(--ink)] text-white">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <span className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
            Client Outcomes
          </span>
          <h2 className="text-display text-white mt-4 max-w-3xl font-semibold">
            Real results. Real clients. Real numbers.
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.outcomes.map((outcome, i) => (
            <ScrollReveal key={outcome.label} stagger={i * 100}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                <div className="text-5xl font-semibold text-[var(--accent)] mb-4">{outcome.metric}</div>
                <p className="text-body text-white/80 mb-6">{outcome.label}</p>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-body text-white/50">{outcome.client}</p>
                  <p className="text-meta text-white/30 mt-0.5">{outcome.industry}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Proof Bar ───────────────────────────────────────────────── */

function SpokeProofBarSection({ data }: { data: SpokePageData }) {
  if (!data.proofLogos.length) return null;
  return (
    <section className="px-6 md:px-12 py-16 sm:py-20 bg-[var(--surface)] border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto text-center">
        <ScrollReveal>
          <p className="text-meta font-medium text-[var(--text-muted)] uppercase mb-8">
            Trusted by ambitious companies
          </p>
        </ScrollReveal>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {data.proofLogos.map((logo, i) => (
            <ScrollReveal key={logo.name} stagger={i * 60}>
              <span className="text-lg font-semibold text-[var(--text-muted)]/60 tracking-tight">
                {logo.name}
              </span>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Team ────────────────────────────────────────────────────── */

function SpokeTeamSection({ data }: { data: SpokePageData }) {
  if (!data.teamMember) return null;
  return (
    <section className="px-6 md:px-12 py-16 sm:py-20 md:py-32">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <Eyebrow>Who You&apos;ll Work With</Eyebrow>
          <h2 className="text-display text-[var(--ink)] mt-4 max-w-3xl font-semibold">
            Led by practitioners, not account managers.
          </h2>
        </ScrollReveal>
        <ScrollReveal stagger={100}>
          <div className="mt-12 rounded-2xl border border-[var(--accent)]/20 bg-[rgba(var(--accent-rgb),0.04)] p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
            <div className="w-20 h-20 rounded-full bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold text-[var(--accent)]">
                {data.teamMember.name.split(' ').map((n) => n[0]).join('')}
              </span>
            </div>
            <div>
              <h3 className="text-h3 text-[var(--ink)] mb-1 font-semibold">{data.teamMember.name}</h3>
              <p className="text-body font-medium text-[var(--accent)] mb-4">{data.teamMember.role}</p>
              <p className="text-body text-[var(--text-muted)] max-w-2xl">{data.teamMember.focus}</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ── Services Grid ─────────────────────────────────────────── */

function SpokeServicesSection({ data }: { data: SpokePageData }) {
  const services = data.subServices.filter((s) => s.slug !== 'audit');
  return (
    <section className="px-6 md:px-12 py-16 sm:py-20 md:py-32">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <Eyebrow>What We Offer</Eyebrow>
          <h2 className="text-display text-[var(--ink)] mt-4 max-w-3xl font-semibold">
            Everything you need, nothing you don&apos;t.
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <ScrollReveal key={svc.slug} stagger={i * 50}>
              <Link
                href={`/${data.spoke}/${svc.slug}`}
                className="group block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 hover:border-[var(--accent)]/40 transition-all duration-300 h-full"
              >
                <h3 className="text-h3 text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors mb-3 font-semibold">
                  {svc.title}
                </h3>
                <p className="text-body text-[var(--text-muted)] mb-4">{svc.summary}</p>
                <div className="flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
                  Learn more <ArrowRight size={14} />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Pricing ───────────────────────────────────────────────── */

function SpokePricingSection({ data }: { data: SpokePageData }) {
  return (
    <section className="px-6 md:px-12 py-16 sm:py-20 md:py-32 bg-[var(--bg-warm)]">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="text-display text-[var(--ink)] mt-4 max-w-3xl font-semibold">
            Transparent pricing. No surprises.
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.pricing.tiers.map((tier, i) => (
            <ScrollReveal key={tier.name} stagger={i * 100}>
              <div
                className={`rounded-2xl border p-6 sm:p-8 h-full flex flex-col ${
                  tier.highlighted
                    ? 'border-[var(--accent)] bg-[rgba(var(--accent-rgb),0.04)] ring-1 ring-[var(--accent)]/20'
                    : 'border-[var(--border)] bg-[var(--surface)]'
                }`}
              >
                {tier.highlighted && (
                  <span className="inline-block self-start text-xs font-semibold bg-[var(--accent)] text-[var(--accent-deep)] px-3 py-1 rounded-full mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className="text-h3 text-[var(--ink)] mb-2 font-semibold">{tier.name}</h3>
                <div className="text-3xl font-bold text-[var(--ink)] mb-2">{tier.price}</div>
                <p className="text-body text-[var(--text-muted)] mb-6">{tier.description}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                      <Check size={16} className="text-[var(--accent)] mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Btn href={`/${data.spoke}/audit`}>{tier.cta}</Btn>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal>
          <p className="text-body text-center text-[var(--text-muted)] mt-8">{data.pricing.note}</p>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ── FAQ ────────────────────────────────────────────────────── */

function SpokeFAQSection({ data }: { data: SpokePageData }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-6 md:px-12 py-16 sm:py-20 md:py-32">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="text-display text-[var(--ink)] mt-4 font-semibold">
            You ask. We answer.
          </h2>
        </ScrollReveal>

        <div className="mt-12 space-y-3">
          {data.faqs.map((faq, i) => (
            <ScrollReveal key={faq.question} stagger={i * 50}>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-lg font-medium text-[var(--ink)] pr-4">{faq.question}</span>
                  {openIndex === i ? (
                    <ChevronUp size={20} className="text-[var(--text-muted)] shrink-0" />
                  ) : (
                    <ChevronDown size={20} className="text-[var(--text-muted)] shrink-0" />
                  )}
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-5">
                    <p className="text-body text-[var(--text-muted)]">{faq.answer}</p>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Guarantee ─────────────────────────────────────────────── */

function SpokeGuaranteeSection({ data }: { data: SpokePageData }) {
  return (
    <section className="px-6 md:px-12 py-24 md:py-32 bg-[var(--accent)]/5">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">⚡</span>
          </div>
          <h2 className="text-h2 text-[var(--ink)] mb-6 font-semibold">
            {data.guarantee.headline}
          </h2>
          <p className="text-body text-[var(--text-muted)] max-w-2xl mx-auto">
            {data.guarantee.body}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ── Final CTA ─────────────────────────────────────────────── */

function SpokeFinalCTA({ data }: { data: SpokePageData }) {
  const config = SPOKES[data.spoke];
  return (
    <section className="px-6 md:px-12 py-16 sm:py-20 md:py-32">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="text-display text-[var(--ink)] mb-4 text-center font-semibold">
            Ready to get started?
          </h2>
          <p className="text-body text-[var(--text-muted)] max-w-2xl mx-auto mb-12 text-center">
            Every engagement begins with a free audit. No commitment. No pitch. Just an honest assessment of where you are and what would move the needle.
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Lead Form */}
          <ScrollReveal>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
              <h3 className="text-h3 text-[var(--ink)] mb-2 font-semibold">
                Get your free assessment
              </h3>
              <p className="text-body text-[var(--text-muted)] mb-6">
                Fill out the form. We&apos;ll deliver a personalized audit within 48 hours.
              </p>
              <LeadForm
                spoke={data.spoke}
                intent="audit"
                sourcePage={`/${data.spoke}`}
                ctaLabel={data.hero.cta}
                qualifyingQuestion={`What's your biggest ${config.label.toLowerCase()} challenge?`}
              />
            </div>
          </ScrollReveal>
          {/* Calendly */}
          <ScrollReveal stagger={100}>
            <div className="rounded-2xl border border-[var(--accent)]/20 bg-[rgba(var(--accent-rgb),0.02)] overflow-hidden">
              <div className="px-6 pt-6 pb-2">
                <h3 className="text-h3 text-[var(--ink)] mb-1 font-semibold">
                  Or book a call directly
                </h3>
                <p className="text-body text-[var(--text-muted)]">
                  Pick a time that works for you. No back-and-forth.
                </p>
              </div>
              <CalendlyEmbed url={config.calLink} />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ── Lead Capture Block ─────────────────────────────────────── */

function SpokeLeadCapture({ data }: { data: SpokePageData }) {
  const config = SPOKES[data.spoke];
  return (
    <section className="px-6 md:px-12 py-16 sm:py-20 md:py-32 bg-[var(--bg-warm)]">
      <div className="max-w-xl mx-auto">
        <ScrollReveal>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
            <h3 className="text-h3 text-[var(--ink)] mb-2 text-center font-semibold">
              Want the full picture?
            </h3>
            <p className="text-body text-[var(--text-muted)] mb-6 text-center">
              Get a free, personalized assessment delivered within 48 hours. No commitment.
            </p>
            <LeadForm
              spoke={data.spoke}
              intent="audit"
              sourcePage={`/${data.spoke}`}
              ctaLabel={data.hero.cta}
              qualifyingQuestion={`What's your biggest ${config.label.toLowerCase()} challenge?`}
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ── Full Spoke Homepage ───────────────────────────────────── */

export default function SpokeHomepage({ data }: { data: SpokePageData }) {
  return (
    <main>
      <SpokeHeroSection data={data} />
      <SpokePainsSection data={data} />
      <SpokeProcessSection data={data} />
      <SpokeOutcomesSection data={data} />
      <SpokeProofBarSection data={data} />
      <SpokeTeamSection data={data} />
      <SpokeServicesSection data={data} />
      <SpokeLeadCapture data={data} />
      <SpokePricingSection data={data} />
      <SpokeFAQSection data={data} />
      <SpokeGuaranteeSection data={data} />
      <SpokeFinalCTA data={data} />
    </main>
  );
}

/* ── Sub-Service Page ──────────────────────────────────────── */

export function SubServicePage({
  spoke,
  service,
}: {
  spoke: SpokeId;
  service: SubService;
}) {
  const config = SPOKES[spoke];

  return (
    <main className="min-h-screen">
      {/* 1. Hero */}
      <section className="relative px-6 md:px-12 pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[var(--accent)]/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <ScrollReveal>
            <Link
              href={`/${spoke}`}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors mb-6"
            >
              ← {config.label}
            </Link>
          </ScrollReveal>

          <MaskReveal>
            <h1 className="text-display text-[var(--ink)] max-w-4xl text-balance font-semibold">
              {service.h1}
            </h1>
          </MaskReveal>

          <ScrollReveal stagger={150}>
            <p className="text-body mt-6 text-[var(--text-muted)] max-w-3xl">
              {service.summary}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${spoke}/audit`}
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[var(--accent-deep)] hover:brightness-110 transition-all"
              >
                Get Free {config.label} Audit
              </Link>
              <a
                href={config.calLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-6 py-3 text-sm font-medium text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
              >
                Book Strategy Call <ArrowRight size={16} />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. Rich Body Copy */}
      {service.longDescription && (
        <section className="px-6 md:px-12 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="prose prose-lg prose-slate max-w-none text-[var(--text-muted)] leading-relaxed whitespace-pre-line">
                {service.longDescription}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* 3. Problem / Approach / Who This Is For */}
      <section className="px-6 md:px-12 py-16 sm:py-20 bg-[var(--bg-warm)]">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Problem + Approach (existing two-column) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
            {service.problem && (
              <ScrollReveal>
                <Eyebrow>The Problem</Eyebrow>
                <h2 className="text-h2 text-[var(--ink)] mt-4 mb-6 font-semibold">
                  The way it&apos;s usually done
                </h2>
                <p className="text-body text-[var(--text-muted)]">{service.problem}</p>
              </ScrollReveal>
            )}

            <ScrollReveal stagger={100}>
              <Eyebrow>Our Approach</Eyebrow>
              <h2 className="text-h2 text-[var(--ink)] mt-4 mb-6 font-semibold">
                How we fix it
              </h2>
              <p className="text-body text-[var(--text-muted)] mb-6">{service.description}</p>
              <ul className="space-y-3">
                {service.approach.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-[var(--text-muted)]">
                    <span className="w-6 h-6 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-xs font-bold text-[var(--accent)] shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* Who This Is For */}
          {(service.whoItsFor?.length ?? 0) > 0 && (
            <ScrollReveal>
              <div className="rounded-2xl border border-[var(--accent)]/20 bg-[rgba(var(--accent-rgb),0.04)] p-6 sm:p-8">
                <h3 className="text-h3 text-[var(--ink)] mb-4 font-semibold">Who this is for</h3>
                <ul className="space-y-2">
                  {(service.whoItsFor ?? []).map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[var(--text-muted)]">
                      <Check size={18} className="text-[var(--accent)] mt-0.5 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* 4. Case Study Snippet */}
      {service.caseStudySnippet && (
        <section className="px-6 md:px-12 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 md:p-10">
                <Eyebrow>Client Result</Eyebrow>
                <div className="mt-4 text-4xl md:text-5xl font-semibold text-[var(--accent)]">
                  {service.caseStudySnippet.metric}
                </div>
                <p className="text-body mt-4 text-[var(--text)]">
                  {service.caseStudySnippet.context}
                </p>
                <p className="text-body mt-2 text-[var(--text-muted)]">
                  — {service.caseStudySnippet.client}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* 5. Deliverables + Timeline + KPIs */}
      <section className="px-6 md:px-12 py-16 sm:py-20 bg-[var(--bg-warm)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
          <ScrollReveal>
            <Eyebrow>What You Get</Eyebrow>
            <h2 className="text-h2 text-[var(--ink)] mt-4 mb-6 font-semibold">
              Deliverables
            </h2>
            <ul className="space-y-4">
              {service.deliverables.map((d, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check size={20} className="text-[var(--accent)] mt-0.5 shrink-0" />
                  <span className="text-[var(--text-muted)] leading-relaxed">{d}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal stagger={100}>
            <Eyebrow>Timeline</Eyebrow>
            <h2 className="text-h2 text-[var(--ink)] mt-4 mb-6 font-semibold">
              How long it takes
            </h2>
            <div className="rounded-2xl border border-[var(--accent)]/20 bg-[rgba(var(--accent-rgb),0.04)] p-6 mb-6">
              <p className="text-body font-medium text-[var(--ink)]">{service.timeline}</p>
            </div>

            {service.kpis.length > 0 && (
              <>
                <h3 className="text-h3 text-[var(--ink)] mb-4 font-semibold">How We Measure Success</h3>
                <div className="grid grid-cols-2 gap-2">
                  {service.kpis.map((kpi) => (
                    <span
                      key={kpi}
                      className="text-xs font-medium text-[var(--text-muted)] bg-[var(--surface)] border border-[var(--border)] rounded-lg px-3 py-2 text-center"
                    >
                      {kpi}
                    </span>
                  ))}
                </div>
              </>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* 6. Service FAQ */}
      {(service.faqs?.length ?? 0) > 0 && (
        <section className="px-6 md:px-12 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="text-display text-[var(--ink)] mt-4 mb-10 font-semibold">
                Common questions about {service.title}
              </h2>
            </ScrollReveal>
            <div className="space-y-6">
              {(service.faqs ?? []).map((faq, i) => (
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
      )}

      {/* 7. Related Services + CTA */}
      <section className="px-6 md:px-12 py-16 sm:py-20 bg-[var(--bg-warm)]">
        <div className="max-w-7xl mx-auto">
          {/* Related Services Links */}
          {(service.relatedServices?.length ?? 0) > 0 && (
            <ScrollReveal>
              <div className="mb-12">
                <Eyebrow>Explore Related Services</Eyebrow>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(service.relatedServices ?? []).map((rs) => (
                    <Link
                      key={rs.href}
                      href={rs.href}
                      className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4 text-sm font-medium text-[var(--ink)] hover:border-[var(--accent)]/40 hover:text-[var(--accent)] transition-all"
                    >
                      {rs.label} →
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Final CTA: LeadForm + CalendlyEmbed */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
                <h3 className="text-h3 text-[var(--ink)] mb-2 font-semibold">
                  Get your free assessment
                </h3>
                <p className="text-body text-[var(--text-muted)] mb-6">
                  We&apos;ll review your current setup and send a personalized report within 48 hours.
                </p>
                <LeadForm
                  spoke={spoke}
                  intent="audit"
                  sourcePage={`/${spoke}/${service.slug}`}
                  ctaLabel={`Get Free ${config.label} Audit`}
                  qualifyingQuestion={`What's your biggest ${config.label.toLowerCase()} challenge?`}
                />
              </div>
            </ScrollReveal>
            <ScrollReveal stagger={100}>
              <div className="rounded-2xl border border-[var(--accent)]/20 bg-[rgba(var(--accent-rgb),0.02)] overflow-hidden">
                <div className="px-6 pt-6 pb-2">
                  <h3 className="text-h3 text-[var(--ink)] mb-1 font-semibold">
                    Or book a call directly
                  </h3>
                  <p className="text-body text-[var(--text-muted)]">
                    Pick a time that works for you. No back-and-forth.
                  </p>
                </div>
                <CalendlyEmbed url={config.calLink} />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
