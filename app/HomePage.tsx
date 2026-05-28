'use client';

import React from 'react';
import Link from 'next/link';
import ScrollReveal from '../components/shared/ScrollReveal';
import MaskReveal from '../components/shared/MaskReveal';
import CountUp from '../components/shared/CountUp';
import Hero3D from '../components/Hero3D';
import { WorkCard, WorkCardFeatured } from '../components/shared/WorkCard';
import { CASE_STUDIES } from '../data/work';
import { SPOKES, type SpokeConfig } from '../lib/spokes';

// ── DATA ──────────────────────────────────────────────────────────────────────

const CLIENT_LOGOS = ['Opal', 'NovaPay', 'Aurelius', 'Helio', 'Daraz', 'Noon', 'Accent Group', 'Rakuten'];

const TECH_STACK = ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind', 'Framer Motion', 'Shopify Plus', 'Sanity CMS', 'OpenAI', 'Vercel', 'Supabase', 'Ahrefs', 'GA4'];

const METHOD_DATA = [
  { n: '01', title: 'Discovery', timeline: 'WEEK 1–4', blurb: 'Forensic listening — your data, your buyers, and the competitive landscape. No assumptions.' },
  { n: '02', title: 'Strategy', timeline: 'WEEK 5–6', blurb: 'A 90-day blueprint with conversion architecture, channel maths, and deliverables your board can audit.' },
  { n: '03', title: 'Execution', timeline: 'WEEK 7–14', blurb: 'Code, content, and campaigns ship weekly in synced sprints — not quarterly grand reveals.' },
  { n: '04', title: 'Scale', timeline: 'ONGOING', blurb: 'Iteration as a system, not a moment. Every week your moat grows; every quarter your CAC drops.' },
];

const HUBS = [
  { code: 'NYC', city: 'New York', region: 'Americas', tz: 'UTC−5' },
  { code: 'LDN', city: 'London', region: 'Europe', tz: 'UTC+0' },
  { code: 'DXB', city: 'Dubai', region: 'MEA', tz: 'UTC+4' },
  { code: 'BLR', city: 'Bangalore', region: 'India', tz: 'UTC+5:30' },
  { code: 'SYD', city: 'Sydney', region: 'APAC', tz: 'UTC+10' },
];

const INDUSTRIES_DATA = [
  { name: 'Law & Legal', note: 'E-E-A-T positioning for high-value matters.', tags: ['Corporate', 'Criminal Defense', 'Family', 'IP'] },
  { name: 'Accounting & CPA', note: 'Compliance becomes high-margin advisory.', tags: ['Chartered', 'Tax', 'Audit', 'Advisory'] },
  { name: 'Financial Services', note: 'Wealth, FinTech, banks — when trust is the moat.', tags: ['Wealth', 'Investment', 'FinTech', 'Banking'] },
  { name: 'Consulting', note: 'Thought leadership and inbound for boutique firms.', tags: ['Strategy', 'Operations', 'HR', 'Transformation'] },
  { name: 'Real Estate', note: 'Luxury developers, commercial brokers, property managers.', tags: ['Commercial', 'Residential', 'PropTech', 'Luxury'] },
  { name: 'Manufacturing', note: 'B2B digital discovery for legacy operators.', tags: ['OEM', 'Industrial', 'Heavy', 'Supply'] },
  { name: 'Coaching & Education', note: 'Personal brand, courses, institutional scale.', tags: ['Coaches', 'EdTech', 'Institutes', 'Creators'] },
  { name: 'Industrial & Trade', note: 'Digital transformation for the backbone.', tags: ['Trade', 'Logistics', 'Heavy', 'Energy'] },
];

const SPOKE_LIST = [
  SPOKES.marketing,
  SPOKES.tech,
  SPOKES.finance,
  SPOKES.automation,
];

const SPOKE_SERVICES: Record<string, string[]> = {
  marketing: ['AI Search & SGE', 'SEO & Technical', 'Paid Media', 'Content Strategy', 'CRO'],
  tech: ['Marketing Websites', 'Web Apps & SaaS', 'Next.js + Performance', 'Integrations', 'MVP Development'],
  finance: ['Bookkeeping', 'Tax & Planning', 'Fractional CFO', 'Payroll', 'Cash Flow Modeling'],
  automation: ['AI Agents', 'Workflow Automation', 'CRM Automation', 'Data Pipelines', 'No-Code Stack'],
};

// ── PRIMITIVES ────────────────────────────────────────────────────────────────

function Eyebrow({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{
      fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.18em',
      textTransform: 'uppercase', color: color || 'var(--text-muted)',
      display: 'inline-flex', alignItems: 'center', gap: 10,
    }}>
      <span style={{ width: 24, height: 1, background: color || 'var(--text-muted)', display: 'inline-block' }} />
      {children}
    </span>
  );
}

function Btn({ children, variant = 'solid', href }: {
  children: React.ReactNode;
  variant?: 'solid' | 'ghost' | 'accent' | 'onDark';
  href?: string;
}) {
  const styles: Record<string, React.CSSProperties> = {
    solid: { background: 'var(--ink)', color: 'var(--bg)', border: '1px solid var(--ink)' },
    ghost: { background: 'transparent', color: 'var(--ink)', border: '1px solid var(--ink)' },
    accent: { background: 'var(--accent)', color: 'var(--accent-deep)', border: '1px solid var(--accent)' },
    onDark: { background: 'transparent', color: '#F8F8F6', border: '1px solid rgba(255,255,255,0.25)' },
  };
  const base: React.CSSProperties = {
    padding: '15px 24px', fontFamily: 'inherit', fontSize: 14, fontWeight: 500,
    letterSpacing: '-0.005em', borderRadius: 0, display: 'inline-flex',
    alignItems: 'center', gap: 10, transition: 'all 0.3s ease',
    cursor: 'pointer', textDecoration: 'none',
    ...styles[variant],
  };
  if (href) return <Link href={href} style={base}>{children}</Link>;
  return <button style={base}>{children}</button>;
}

function WordMarquee({ items, speed = 60, size = 22, dark = false }: {
  items: string[]; speed?: number; size?: number; dark?: boolean;
}) {
  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', padding: '14px 0' }}>
      <div style={{ display: 'inline-flex', gap: 56, animation: `rf-marquee ${speed}s linear infinite` }}>
        {[0, 1].map((loop) => (
          <div key={loop} style={{ display: 'inline-flex', gap: 56, alignItems: 'center' }}>
            {items.map((t, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 56 }}>
                <span style={{
                  fontFamily: 'inherit', fontSize: size, fontWeight: 500, letterSpacing: '-0.015em',
                  color: dark ? '#F8F8F6' : 'var(--ink)', opacity: 0.85,
                }}>{t}</span>
                <span style={{ color: 'var(--accent)', fontSize: size * 0.6 }}>·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. HERO
// ═══════════════════════════════════════════════════════════════════════════════

function Hero() {
  return (
    <section className="relative pt-6 sm:pt-8 pb-16 sm:pb-20 overflow-hidden">
      <Hero3D />

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-10">
        {/* Headline */}
        <div className="max-w-[56rem]">
          <ScrollReveal className="mb-6">
            <Eyebrow>Operating Partner for Founders</Eyebrow>
          </ScrollReveal>

          <h1
            className="font-sans font-medium m-0 leading-[0.88] tracking-[-0.05em]"
            style={{
              color: 'var(--ink)',
              fontSize: 'clamp(52px, 9.5vw, 168px)',
            }}
          >
            <MaskReveal>The</MaskReveal><br />
            <MaskReveal delay={0.10}>Operating</MaskReveal><br />
            <MaskReveal delay={0.20}>Partner</MaskReveal><br />
            <span className="inline-flex items-baseline gap-4 sm:gap-6 flex-wrap">
              <MaskReveal delay={0.30}>for Founders.</MaskReveal>
            </span>
          </h1>
        </div>

        {/* Sub copy + CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 mt-14 sm:mt-16 items-end">
          <div className="lg:col-span-7">
            <ScrollReveal stagger={4}>
              <p className="text-lg sm:text-[22px] leading-relaxed tracking-[-0.005em] max-w-[600px] m-0" style={{ color: 'var(--ink-soft)' }}>
                We run{' '}
                <strong style={{ color: 'var(--ink)' }}>marketing</strong>,{' '}
                <strong style={{ color: 'var(--ink)' }}>tech</strong>,{' '}
                <strong style={{ color: 'var(--ink)' }}>finance</strong>, and{' '}
                <strong style={{ color: 'var(--ink)' }}>automation</strong>{' '}
                so founders can build the business — not manage vendors.
              </p>
              <div className="flex flex-wrap gap-3 mt-8 sm:mt-9">
                <Btn variant="accent" href="/contact">Book strategy call →</Btn>
                <Btn variant="ghost" href="/free-seo-audit">Get free audit</Btn>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal stagger={5} className="lg:col-span-5">
            <div className="grid gap-3 font-mono text-xs tracking-[0.08em]" style={{ color: 'var(--text-muted)' }}>
              <div className="h-px" style={{ background: 'var(--border)' }} />
              {[
                ['ONE SLA', 'Marketing · Tech · Finance · Automation'],
                ['HUBS', 'LDN · NYC · DXB · BLR · SYD · 24h coverage'],
                ['MODEL', 'Retainers · Projects · Operating partner'],
              ].map(([k, v]) => (
                <div key={k} className="grid gap-4 pb-3" style={{ gridTemplateColumns: '90px 1fr', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ color: 'var(--accent)' }}>{k}</span>
                  <span style={{ color: 'var(--ink)' }}>{v}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Metrics band */}
        <div className="mt-20 sm:mt-24 pt-6 sm:pt-8" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-8 gap-2">
            <Eyebrow>Live impact</Eyebrow>
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.14em]" style={{ color: 'var(--text-faint)' }}>
              UPDATED · 29 MAY 2026
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {[
              { to: 500, prefix: '$', suffix: 'M+', label: 'Revenue driven' },
              { to: 4.2, suffix: '×', decimals: 1, label: 'Avg. ROAS' },
              { to: 142, suffix: '', label: 'Campaigns shipped' },
            ].map((d, i) => (
              <ScrollReveal
                key={i}
                stagger={i + 1}
                className="py-8 px-0 sm:px-8"
                style={{ borderLeft: i > 0 ? '1px solid var(--border)' : 'none' }}
              >
                <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.14em] uppercase" style={{ color: 'var(--text-muted)' }}>
                  {String(i + 1).padStart(2, '0')} · {d.label}
                </div>
                <div
                  className="font-sans font-medium leading-none mt-5 tracking-[-0.045em]"
                  style={{ color: 'var(--ink)', fontSize: 'clamp(40px, 5vw, 88px)', fontFeatureSettings: '"tnum"' }}
                >
                  <CountUp to={d.to} prefix={d.prefix} suffix={d.suffix} decimals={d.decimals || 0} />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Logo marquee */}
        <div className="mt-16 sm:mt-20 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="grid grid-cols-[90px_1fr] sm:grid-cols-[140px_1fr] gap-6 items-center">
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.14em] uppercase" style={{ color: 'var(--text-muted)' }}>
              Trusted by
            </span>
            <WordMarquee items={CLIENT_LOGOS} size={22} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2. FOUR SPOKES
// ═══════════════════════════════════════════════════════════════════════════════

function FourSpokes() {
  return (
    <section className="py-24 sm:py-32" style={{ background: 'var(--ink)', color: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24 mb-16 sm:mb-20 items-end">
          <ScrollReveal className="lg:col-span-5">
            <Eyebrow color="var(--accent)">The operating system</Eyebrow>
            <h2
              className="font-sans font-medium leading-[0.96] tracking-[-0.04em] m-0 mt-4"
              style={{ fontSize: 'clamp(40px, 5vw, 80px)', color: 'var(--bg)' }}
            >
              <MaskReveal>Four functions.</MaskReveal><br />
              <MaskReveal delay={0.1}>One partner.</MaskReveal>
            </h2>
          </ScrollReveal>
          <ScrollReveal stagger={3} className="lg:col-span-7">
            <p className="text-base sm:text-[17px] leading-relaxed max-w-[500px] ml-auto text-left lg:text-right m-0" style={{ color: '#a8a294' }}>
              Founders waste 40% of their time coordinating vendors. We consolidate four functions into one operating partnership — one SLA, one relationship, one standard of execution.
            </p>
          </ScrollReveal>
        </div>

        {/* Spokes grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ borderTop: '1px solid #2a2520', borderLeft: '1px solid #2a2520' }}>
          {SPOKE_LIST.map((spoke, i) => (
            <ScrollReveal key={spoke.id} stagger={(i % 2) + 1}>
              <SpokeCard spoke={spoke} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpokeCard({ spoke, index }: { spoke: SpokeConfig; index: number }) {
  const [hover, setHover] = React.useState(false);
  const services = SPOKE_SERVICES[spoke.id] || [];

  return (
    <Link
      href={`/${spoke.id}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex flex-col text-left cursor-pointer relative overflow-hidden p-8 sm:p-10 min-h-[380px] transition-colors duration-300"
      style={{
        borderRight: '1px solid #2a2520',
        borderBottom: '1px solid #2a2520',
        background: hover ? '#0f0f0d' : 'transparent',
        textDecoration: 'none',
        color: 'var(--bg)',
      }}
    >
      {/* Spoke indicator */}
      <div className="flex justify-between items-start mb-10">
        <div className="flex items-center gap-3">
          <div
            className="w-2.5 h-2.5 rounded-full transition-all duration-500"
            style={{ background: hover ? spoke.accent : 'rgba(255,255,255,0.3)' }}
          />
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase" style={{ color: hover ? spoke.accent : '#6a6660' }}>
            {spoke.primaryBuyer}
          </span>
        </div>
        <span
          className="font-mono text-sm transition-all duration-300"
          style={{ color: '#6a6660', transform: hover ? 'translateX(6px)' : 'translateX(0)' }}
        >
          →
        </span>
      </div>

      {/* Spoke name */}
      <h3
        className="font-sans font-medium tracking-[-0.035em] leading-none m-0"
        style={{ fontSize: 'clamp(32px, 4vw, 52px)', color: 'var(--bg)' }}
      >
        {spoke.label}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed mt-4 mb-0 max-w-[360px] flex-1" style={{ color: '#a8a294' }}>
        {spoke.description}
      </p>

      {/* Services list */}
      <div className="mt-8 grid gap-2">
        {services.map((s) => (
          <div
            key={s}
            className="flex items-center gap-3 transition-all duration-500"
            style={{ opacity: hover ? 1 : 0.5, transform: hover ? 'translateX(0)' : 'translateX(-4px)' }}
          >
            <div className="w-1 h-1 rounded-full" style={{ background: spoke.accent }} />
            <span className="font-mono text-[10px] tracking-[0.10em] uppercase" style={{ color: '#d0cec8' }}>
              {s}
            </span>
          </div>
        ))}
      </div>

      {/* Pricing model */}
      <div className="mt-8 pt-5" style={{ borderTop: '1px solid #2a2520' }}>
        <span className="font-mono text-[10px] tracking-[0.14em] uppercase" style={{ color: hover ? spoke.accent : '#6a6660' }}>
          {spoke.pricingModel}
        </span>
      </div>
    </Link>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3. METHODOLOGY
// ═══════════════════════════════════════════════════════════════════════════════

function Methodology() {
  return (
    <section className="py-24 sm:py-32" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24 mb-20">
          <ScrollReveal className="lg:col-span-5">
            <Eyebrow>The methodology</Eyebrow>
            <h2
              className="font-sans font-medium leading-[0.96] tracking-[-0.04em] m-0 mt-4"
              style={{ fontSize: 'clamp(40px, 5vw, 80px)' }}
            >
              <MaskReveal>How we win.</MaskReveal>
            </h2>
          </ScrollReveal>
          <ScrollReveal stagger={3} className="lg:col-span-7">
            <p className="text-base sm:text-lg leading-relaxed max-w-[540px] m-0" style={{ color: 'var(--text-muted)' }}>
              A four-stage operating system that ships in weeks, not quarters. Each stage has a discrete deliverable, a senior accountable owner, and a measurable exit criterion.
            </p>
          </ScrollReveal>
        </div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-14 h-px hidden lg:block" style={{ background: 'var(--border)' }} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {METHOD_DATA.map((m, i) => (
              <ScrollReveal key={m.n} stagger={i + 1}>
                <div className="relative pt-16 lg:pt-20">
                  <div
                    className="absolute top-12 lg:top-[50px] left-0 w-3.5 h-3.5 rounded-full"
                    style={{
                      background: 'var(--bg)',
                      border: `2px solid ${i === 0 ? 'var(--accent)' : 'var(--ink)'}`,
                    }}
                  />
                  <div className="font-mono text-[11px] tracking-[0.14em]" style={{ color: 'var(--text-muted)' }}>
                    {m.n} · {m.timeline}
                  </div>
                  <h3
                    className="font-sans font-medium tracking-[-0.03em] leading-none mt-5 m-0"
                    style={{ fontSize: 'clamp(32px, 3.4vw, 44px)', color: 'var(--ink)' }}
                  >
                    {m.title}.
                  </h3>
                  <p className="text-sm leading-relaxed mt-4 m-0" style={{ color: 'var(--text-muted)' }}>{m.blurb}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Tech ticker */}
        <ScrollReveal className="mt-24 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[160px_1fr] gap-8 items-center">
            <Eyebrow>Powered by</Eyebrow>
            <WordMarquee items={TECH_STACK} size={16} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 4. SELECTED WORKS
// ═══════════════════════════════════════════════════════════════════════════════

function SelectedWorks() {
  const featured = CASE_STUDIES[0];
  const gridWorks = CASE_STUDIES.slice(1, 5);

  return (
    <section className="py-24 sm:py-32" style={{ background: 'var(--ink)', color: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24 mb-16 items-end">
          <ScrollReveal className="lg:col-span-5">
            <Eyebrow color="var(--accent)">Selected works</Eyebrow>
            <h2
              className="font-sans font-medium leading-[0.96] tracking-[-0.04em] m-0 mt-4"
              style={{ fontSize: 'clamp(40px, 5vw, 80px)', color: 'var(--bg)' }}
            >
              <MaskReveal>Receipts,</MaskReveal><br />
              <MaskReveal delay={0.1}>not promises.</MaskReveal>
            </h2>
          </ScrollReveal>
          <ScrollReveal stagger={2} className="lg:col-span-7">
            <p className="text-base sm:text-[17px] leading-relaxed max-w-[480px] ml-auto text-left lg:text-right m-0" style={{ color: '#a8a294' }}>
              Real work, real numbers. Each engagement ships with measurable outcomes — picked for the gap between starting point and result.
            </p>
            <div className="text-left lg:text-right mt-6">
              <Btn variant="onDark" href="/case-studies">All case studies →</Btn>
            </div>
          </ScrollReveal>
        </div>

        {featured && (
          <ScrollReveal className="mb-4">
            <WorkCardFeatured work={featured} index={0} />
          </ScrollReveal>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {gridWorks.map((work, i) => (
            <ScrollReveal key={work.id} stagger={(i % 2) + 1}>
              <WorkCard work={work} index={i + 1} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-16 pt-12" style={{ borderTop: '1px solid #2a2520' }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-3">
              <div className="font-mono text-[11px] tracking-[0.14em] uppercase" style={{ color: 'var(--accent)' }}>
                From our clients
              </div>
              <div className="mt-2 text-sm" style={{ color: '#a8a294' }}>
                Sarah Jenkins<br />
                Global CMO, Noon Group
              </div>
            </div>
            <div className="lg:col-span-9">
              <blockquote
                className="font-sans font-normal m-0 leading-[1.1] tracking-[-0.03em]"
                style={{ fontSize: 'clamp(24px, 3vw, 48px)', color: 'var(--bg)' }}
              >
                &quot;Qognition&apos;s architectural approach to SEO is simply unrivaled. They didn&apos;t just optimize our site —{' '}
                <span style={{ color: 'var(--accent)' }}>they restructured our entire digital footprint for the AI era.&quot;</span>
              </blockquote>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 5. COVERAGE
// ═══════════════════════════════════════════════════════════════════════════════

function Coverage() {
  return (
    <section className="py-24 sm:py-32" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10">
        <ScrollReveal>
          <Eyebrow>Coverage</Eyebrow>
          <h2
            className="font-sans font-medium leading-[0.96] tracking-[-0.04em] m-0 mt-4"
            style={{ fontSize: 'clamp(40px, 5vw, 80px)' }}
          >
            <MaskReveal>Industries we</MaskReveal><br />
            <MaskReveal delay={0.1}>dominate. Globally.</MaskReveal>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mt-14">
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: 'var(--border)', border: '1px solid var(--border)' }}>
              {INDUSTRIES_DATA.map((ind, i) => (
                <ScrollReveal key={ind.name} stagger={(i % 2) + 1}>
                  <IndustryCell ind={ind} i={i} />
                </ScrollReveal>
              ))}
            </div>
            <div className="mt-6">
              <Btn variant="ghost" href="/industries">All sectors →</Btn>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ScrollReveal stagger={2}>
              <div className="rf-studio-border p-6 sm:p-8" style={{ background: 'var(--surface)' }}>
                <div className="font-mono text-[11px] tracking-[0.14em] mb-5" style={{ color: 'var(--accent)' }}>
                  FIVE HUBS · 24H COVERAGE
                </div>
                <HubMap />
                <div className="mt-6 grid gap-0" style={{ borderTop: '1px solid var(--border)' }}>
                  {HUBS.map((h) => (
                    <div
                      key={h.code}
                      className="grid gap-4 py-3.5 items-baseline"
                      style={{ gridTemplateColumns: '50px 1fr auto', borderBottom: '1px solid var(--border)' }}
                    >
                      <span className="font-mono text-[11px] tracking-[0.14em]" style={{ color: 'var(--accent)' }}>{h.code}</span>
                      <span className="text-sm font-medium tracking-[-0.015em]">{h.city}</span>
                      <span className="font-mono text-[10px]" style={{ color: 'var(--text-muted)' }}>{h.tz}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function IndustryCell({ ind, i }: { ind: typeof INDUSTRIES_DATA[0]; i: number }) {
  const [hover, setHover] = React.useState(false);
  return (
    <Link
      href="/industries"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex flex-col justify-between text-left cursor-pointer p-6 sm:p-8 min-h-[180px] transition-colors duration-400"
      style={{
        background: hover ? 'var(--ink)' : 'var(--bg)',
        color: hover ? 'var(--bg)' : 'var(--ink)',
        textDecoration: 'none',
      }}
    >
      <div>
        <div className="font-mono text-[11px] tracking-[0.14em]" style={{ color: hover ? 'var(--accent)' : 'var(--text-muted)' }}>
          {String(i + 1).padStart(2, '0')} / 08
        </div>
        <h3 className="font-sans text-lg sm:text-xl font-medium tracking-[-0.02em] leading-tight mt-4 mb-1.5">
          {ind.name}
        </h3>
        <div className="text-[13px] leading-relaxed" style={{ color: hover ? '#a8a294' : 'var(--text-muted)' }}>{ind.note}</div>
      </div>
      <div className="font-mono text-[11px] tracking-[0.14em] mt-5 flex justify-between" style={{ color: hover ? 'var(--accent)' : 'var(--text-muted)' }}>
        <span>{ind.tags[0]} · {ind.tags[1]}</span>
        <span className="transition-transform duration-400" style={{ transform: hover ? 'translateX(6px)' : 'translateX(0)' }}>↗</span>
      </div>
    </Link>
  );
}

function HubMap() {
  const hubs = [
    { name: 'New York', code: 'NYC', x: 285, y: 225, region: 'Americas' },
    { name: 'London', code: 'LDN', x: 500, y: 185, region: 'Europe' },
    { name: 'Dubai', code: 'DXB', x: 615, y: 255, region: 'MEA' },
    { name: 'Bangalore', code: 'BLR', x: 705, y: 295, region: 'India' },
    { name: 'Sydney', code: 'SYD', x: 875, y: 420, region: 'APAC' },
  ];
  return (
    <svg viewBox="0 0 1000 520" width="100%" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
      <g fill="var(--border)">
        {[[200, 130, 110, 90], [240, 250, 90, 110], [510, 170, 75, 60], [560, 280, 130, 130], [680, 200, 160, 110], [820, 230, 80, 60], [880, 400, 60, 40]].map(([cx, cy, rx, ry], i) => (
          <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill="rgba(10,10,10,0.04)" />
        ))}
      </g>
      {hubs.map((h) => (
        <g key={h.code}>
          <circle cx={h.x} cy={h.y} r="12" fill="var(--accent)" opacity="0.12">
            <animate attributeName="r" values="10;22;10" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.2;0;0.2" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx={h.x} cy={h.y} r="4" fill="var(--accent)" />
          <text x={h.x + 14} y={h.y + 4} fill="var(--ink)" fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="600">{h.code}</text>
          <text x={h.x + 14} y={h.y + 20} fill="var(--text-muted)" fontFamily="JetBrains Mono, monospace" fontSize="9">{h.name}</text>
        </g>
      ))}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 6. FINAL CTA
// ═══════════════════════════════════════════════════════════════════════════════

function FinalCTA() {
  return (
    <section className="py-24 sm:py-32" style={{ background: 'var(--accent)' }}>
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <ScrollReveal className="lg:col-span-7">
            <h2
              className="font-sans font-medium leading-[0.9] tracking-[-0.045em] m-0"
              style={{ fontSize: 'clamp(48px, 7vw, 128px)', color: 'var(--ink)' }}
            >
              <MaskReveal>Ready</MaskReveal><br />
              <MaskReveal delay={0.1}>to build?</MaskReveal>
            </h2>
          </ScrollReveal>
          <ScrollReveal stagger={3} className="lg:col-span-5">
            <p className="text-lg leading-relaxed m-0" style={{ color: 'var(--accent-deep)' }}>
              Start with a free audit. No pitch. No commitment. A real analysis of where you are and what to do next — delivered within 48 hours.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Btn variant="solid" href="/contact">Book strategy call →</Btn>
              <Btn variant="ghost" href="/free-seo-audit">Get free audit</Btn>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ASSEMBLY
// ═══════════════════════════════════════════════════════════════════════════════

export default function HomePage() {
  return (
    <main className="rf-page-wrap" style={{ paddingTop: 80 }}>
      <Hero />
      <FourSpokes />
      <Methodology />
      <SelectedWorks />
      <Coverage />
      <FinalCTA />
    </main>
  );
}
