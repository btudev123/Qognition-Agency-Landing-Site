'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from '../components/shared/ScrollReveal';
import MaskReveal from '../components/shared/MaskReveal';
import MagneticBtn from '../components/shared/MagneticBtn';
import { WorkCard, WorkCardFeatured } from '../components/shared/WorkCard';
import { HeroAurora, HeroDashboard } from '../components/HeroAurora';
import ClientPartners from '../components/shared/ClientPartners';
import { CASE_STUDIES } from '../data/work';
import { SPOKES, type SpokeConfig } from '../lib/spokes';
import { CALENDLY_LINK } from '../data/siteConfig';

// ── DATA ──────────────────────────────────────────────────────────────────────

const AI_ENGINES = [
  { name: 'ChatGPT', color: '#10a37f' },
  { name: 'Claude', color: '#d97706' },
  { name: 'Gemini', color: '#4285F4' },
  { name: 'Perplexity', color: '#1fb8cd' },
  { name: 'Google AI', color: '#EA4335' },
];

const TECH_STACK = ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind', 'Framer Motion', 'Shopify Plus', 'Sanity CMS', 'OpenAI', 'Vercel', 'Supabase', 'Ahrefs', 'GA4'];

const METHOD_DATA = [
  { n: '01', title: 'Discovery', timeline: 'WEEK 1–4', blurb: 'Forensic listening — your data, your buyers, and the competitive landscape. No assumptions.' },
  { n: '02', title: 'Strategy', timeline: 'WEEK 5–6', blurb: 'A 90-day blueprint with conversion architecture, channel maths, and deliverables your board can audit.' },
  { n: '03', title: 'Execution', timeline: 'WEEK 7–14', blurb: 'Code, content, and campaigns ship weekly in synced sprints — not quarterly grand reveals.' },
  { n: '04', title: 'Scale', timeline: 'ONGOING', blurb: 'Iteration as a system, not a moment. Every week your moat grows; every quarter your CAC drops.' },
];

const HUBS = [
  { code: 'NYC', city: 'New York', tz: 'UTC−5' },
  { code: 'LDN', city: 'London', tz: 'UTC+0' },
  { code: 'DXB', city: 'Dubai', tz: 'UTC+4' },
  { code: 'BLR', city: 'Bangalore', tz: 'UTC+5:30' },
  { code: 'SYD', city: 'Sydney', tz: 'UTC+10' },
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

const SPOKE_LIST = [SPOKES.marketing, SPOKES.tech, SPOKES.finance, SPOKES.automation];

const SPOKE_SERVICES: Record<string, string[]> = {
  marketing: ['AI Search & SGE', 'SEO & Technical', 'Paid Media', 'Content Strategy', 'CRO'],
  tech: ['Marketing Websites', 'Web Apps & SaaS', 'Next.js + Performance', 'Integrations', 'MVP Development'],
  finance: ['Bookkeeping', 'Tax & Planning', 'Fractional CFO', 'Payroll', 'Cash Flow Modeling'],
  automation: ['AI Agents', 'Workflow Automation', 'CRM Automation', 'Data Pipelines', 'No-Code Stack'],
};

const SPOKE_RGB: Record<string, string> = {
  marketing: '20, 184, 166',
  tech: '37, 99, 235',
  finance: '5, 150, 105',
  automation: '245, 158, 11',
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

function Btn({ children, variant = 'solid', href, external = false }: {
  children: React.ReactNode;
  variant?: 'solid' | 'ghost' | 'accent' | 'onDark';
  href?: string;
  external?: boolean;
}) {
  const [hover, setHover] = React.useState(false);

  const styles: Record<string, React.CSSProperties> = {
    solid: {
      background: hover ? 'var(--accent)' : 'var(--ink)',
      color: hover ? '#fff' : 'var(--bg)',
      border: `1px solid ${hover ? 'var(--accent)' : 'var(--ink)'}`,
    },
    ghost: {
      background: hover ? 'rgba(0,0,0,0.05)' : 'transparent',
      color: 'var(--ink)',
      border: '1px solid var(--border-strong)',
    },
    accent: {
      background: 'var(--accent)',
      color: '#fff',
      border: '1px solid var(--accent)',
      boxShadow: hover ? '0 0 28px rgba(20,184,166,0.4)' : 'none',
    },
    onDark: {
      background: hover ? 'rgba(255,255,255,0.1)' : 'transparent',
      color: '#FAFAF8',
      border: '1px solid rgba(255,255,255,0.18)',
    },
  };

  const base: React.CSSProperties = {
    padding: '15px 28px', fontFamily: 'inherit', fontSize: 14, fontWeight: 500,
    letterSpacing: '-0.005em', borderRadius: 0, display: 'inline-flex',
    alignItems: 'center', gap: 10, transition: 'all 0.25s ease',
    cursor: 'none', textDecoration: 'none',
    ...styles[variant],
  };

  const props = {
    style: base,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
  };

  if (href && external) return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
  if (href) return <Link href={href} {...props}>{children}</Link>;
  return <button {...props}>{children}</button>;
}

function WordMarquee({ items, speed = 60, size = 22, dark = false }: {
  items: string[]; speed?: number; size?: number; dark?: boolean;
}) {
  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', padding: '14px 0', position: 'relative' }}>
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
        background: 'linear-gradient(to right, var(--bg), transparent)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
        background: 'linear-gradient(to left, var(--bg), transparent)', pointerEvents: 'none',
      }} />
      <div style={{ display: 'inline-flex', gap: 56, animation: `rf-marquee ${speed}s linear infinite` }}>
        {[0, 1].map((loop) => (
          <div key={loop} style={{ display: 'inline-flex', gap: 56, alignItems: 'center' }}>
            {items.map((t, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 56 }}>
                <span style={{
                  fontFamily: 'inherit', fontSize: size, fontWeight: 500, letterSpacing: '-0.015em',
                  color: dark ? '#F8F8F6' : 'var(--ink)', opacity: 0.8,
                }}>{t}</span>
                <span style={{ color: 'var(--accent)', fontSize: size * 0.6, opacity: 0.7 }}>·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── GRADIENT MESH — used in dark CTA section ──────────────────────────────────

function GradientMesh({ className }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className || ''}`} aria-hidden="true">
      <div style={{
        position: 'absolute', top: '-10%', right: '-5%', width: '55%', height: '70%',
        background: 'radial-gradient(circle, rgba(20,184,166,0.13) 0%, transparent 65%)',
        filter: 'blur(40px)', animation: 'rf-orb-drift 18s ease-in-out infinite', willChange: 'transform',
      }} />
      <div style={{
        position: 'absolute', bottom: '-15%', left: '-8%', width: '50%', height: '65%',
        background: 'radial-gradient(circle, rgba(99,58,237,0.09) 0%, transparent 65%)',
        filter: 'blur(50px)', animation: 'rf-orb-drift-b 24s ease-in-out infinite 4s', willChange: 'transform',
      }} />
      <div style={{
        position: 'absolute', top: '30%', left: '30%', width: '40%', height: '50%',
        background: 'radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 65%)',
        filter: 'blur(60px)', animation: 'rf-orb-drift-c 30s ease-in-out infinite 10s', willChange: 'transform',
      }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. HERO — aurora mesh + floating glass operating-system dashboard
// ═══════════════════════════════════════════════════════════════════════════════

function Hero() {
  return (
    <section
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 104, paddingBottom: 72 }}
    >
      {/* Animated teal aurora / mesh background */}
      <HeroAurora />

      {/* Content — copy left, glass dashboard right (stacks on mobile/tablet) */}
      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-5 sm:px-10 grid items-center gap-12 lg:gap-16 lg:grid-cols-[1.05fr_0.95fr]">

        {/* Left — copy */}
        <div className="text-center lg:text-left">
          <ScrollReveal className="mb-7 sm:mb-9">
            <div className="inline-flex items-center gap-3">
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px',
                border: '1px solid var(--border-strong)', background: 'rgba(20,184,166,0.08)', borderRadius: 100,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', animation: 'rf-pulse 2s ease-in-out infinite' }} />
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent-deep)' }}>
                  AI-Native Operating Partner
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Headline */}
          <h1
            className="font-sans font-medium m-0 leading-[0.9] tracking-[-0.045em]"
            style={{ fontSize: 'clamp(44px, 7.2vw, 116px)', color: 'var(--ink)' }}
          >
            <MaskReveal>THE OPERATING</MaskReveal>
            <br />
            <MaskReveal delay={0.1}>
              <span className="rf-gradient-text">SYSTEM</span>
            </MaskReveal>
          </h1>

          <ScrollReveal stagger={3} className="mt-6 sm:mt-8">
            <p className="font-sans font-medium tracking-[-0.02em] leading-[1.05]" style={{ fontSize: 'clamp(22px, 3vw, 34px)', color: 'var(--ink)' }}>
              Four functions. One partner.
            </p>
          </ScrollReveal>

          <ScrollReveal stagger={4} className="mt-5">
            <p
              className="text-base sm:text-[19px] leading-relaxed tracking-[-0.005em] max-w-[540px] mx-auto lg:mx-0 m-0"
              style={{ color: 'var(--ink-soft)' }}
            >
              We run{' '}
              <strong style={{ color: 'var(--ink)' }}>marketing</strong>,{' '}
              <strong style={{ color: 'var(--ink)' }}>tech</strong>,{' '}
              <strong style={{ color: 'var(--ink)' }}>finance</strong>, and{' '}
              <strong style={{ color: 'var(--ink)' }}>automation</strong>{' '}
              so founders can build the business — not manage vendors.
            </p>
          </ScrollReveal>

          {/* CTAs */}
          <ScrollReveal stagger={5} className="mt-8 sm:mt-10">
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <MagneticBtn>
                <Btn variant="solid" href={CALENDLY_LINK} external>Book a call →</Btn>
              </MagneticBtn>
              <MagneticBtn>
                <Btn variant="ghost" href="/free-seo-audit">Get free audit</Btn>
              </MagneticBtn>
            </div>
          </ScrollReveal>

          {/* AI engines strip */}
          <ScrollReveal stagger={6} className="mt-9 sm:mt-11">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6">
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase" style={{ color: 'var(--text-muted)' }}>
                We optimize for
              </span>
              {AI_ENGINES.map((ai) => (
                <div key={ai.name} className="inline-flex items-center gap-1.5">
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: ai.color, flexShrink: 0 }} />
                  <span className="font-mono text-[11px] tracking-[0.04em]" style={{ color: 'var(--ink-soft)' }}>
                    {ai.name}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Right — floating glass dashboard */}
        <ScrollReveal stagger={4}>
          <HeroDashboard />
        </ScrollReveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2. FOUR SPOKES
// ═══════════════════════════════════════════════════════════════════════════════

function FourSpokes() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={sectionRef}
      className="py-24 sm:py-32 relative overflow-hidden"
      style={{ background: '#050505', color: '#FAFAF8', borderTop: '1px solid var(--border)' }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '40%', height: '100%',
          background: 'radial-gradient(ellipse at 80% 50%, rgba(20,184,166,0.07) 0%, transparent 60%)',
          filter: 'blur(40px)',
        }} />
      </div>

      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 flex items-center pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <span style={{
          fontSize: 'clamp(120px, 22vw, 320px)', fontWeight: 700,
          letterSpacing: '-0.07em', lineHeight: 1,
          color: 'rgba(255,255,255,0.02)', whiteSpace: 'nowrap',
          userSelect: 'none', paddingLeft: '5%',
        }}>
          FOUR SPOKES
        </span>
      </motion.div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24 mb-16 sm:mb-20 items-end">
          <ScrollReveal className="lg:col-span-5">
            <Eyebrow color="var(--accent)">The operating system</Eyebrow>
            <h2
              className="font-sans font-medium leading-[0.96] tracking-[-0.04em] m-0 mt-4"
              style={{ fontSize: 'clamp(40px, 5vw, 80px)', color: '#FAFAF8' }}
            >
              <MaskReveal>Four functions.</MaskReveal><br />
              <MaskReveal delay={0.1}>One partner.</MaskReveal>
            </h2>
          </ScrollReveal>
          <ScrollReveal stagger={3} className="lg:col-span-7">
            <p className="text-base sm:text-[17px] leading-relaxed max-w-[500px] ml-auto text-left lg:text-right m-0" style={{ color: 'rgba(255,255,255,0.78)' }}>
              Founders waste 40% of their time coordinating vendors. We consolidate four functions into one operating partnership — one SLA, one relationship, one standard of execution.
            </p>
          </ScrollReveal>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderLeft: '1px solid rgba(255,255,255,0.06)' }}
        >
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
  const rgb = SPOKE_RGB[spoke.id] || '255,255,255';

  return (
    <Link
      href={`/${spoke.id}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="rf-spoke-glow flex flex-col text-left cursor-none relative overflow-hidden p-8 sm:p-10 min-h-[380px]"
      style={{
        '--spoke-glow': `rgba(${rgb}, 0.12)`,
        borderRight: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: hover ? 'rgba(255,255,255,0.025)' : 'transparent',
        textDecoration: 'none', color: '#FAFAF8',
        transition: 'background 0.5s ease, box-shadow 0.5s ease',
        boxShadow: hover ? `inset 0 0 80px rgba(${rgb}, 0.06)` : 'none',
      } as React.CSSProperties}
    >
      <div className="flex justify-between items-start mb-10" style={{ position: 'relative', zIndex: 1 }}>
        <div className="flex items-center gap-3">
          <div
            className="w-2.5 h-2.5 rounded-full transition-all duration-500"
            style={{ background: hover ? spoke.accent : 'rgba(255,255,255,0.2)', boxShadow: hover ? `0 0 12px ${spoke.accent}80` : 'none' }}
          />
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase" style={{ color: hover ? spoke.accent : 'rgba(255,255,255,0.58)' }}>
            {spoke.primaryBuyer}
          </span>
        </div>
        <span
          className="font-mono text-sm transition-all duration-300"
          style={{ color: 'rgba(255,255,255,0.58)', transform: hover ? 'translateX(6px)' : 'translateX(0)' }}
        >
          →
        </span>
      </div>

      <h3
        className="font-sans font-medium tracking-[-0.035em] leading-none m-0"
        style={{ fontSize: 'clamp(32px, 4vw, 52px)', color: '#FAFAF8', position: 'relative', zIndex: 1 }}
      >
        {spoke.label}
      </h3>

      <p className="text-sm leading-relaxed mt-4 mb-0 max-w-[360px] flex-1" style={{ color: 'rgba(255,255,255,0.74)', position: 'relative', zIndex: 1 }}>
        {spoke.description}
      </p>

      <div className="mt-8 grid gap-2" style={{ position: 'relative', zIndex: 1 }}>
        {services.map((s, idx) => (
          <div
            key={s}
            className="flex items-center gap-3"
            style={{
              opacity: hover ? 1 : 0.35,
              transform: hover ? 'translateX(0)' : 'translateX(-4px)',
              transition: `opacity 0.4s ease ${idx * 0.04}s, transform 0.4s ease ${idx * 0.04}s`,
            }}
          >
            <div className="w-1 h-1 rounded-full" style={{ background: spoke.accent }} />
            <span className="font-mono text-[10px] tracking-[0.10em] uppercase" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {s}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative', zIndex: 1 }}>
        <span className="font-mono text-[10px] tracking-[0.14em] uppercase" style={{ color: hover ? spoke.accent : 'rgba(255,255,255,0.25)' }}>
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
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgTextY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 relative overflow-hidden" style={{ borderTop: '1px solid var(--border)' }}>
      <motion.div
        style={{ y: bgTextY }}
        className="absolute inset-0 flex items-center pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <span style={{
          fontSize: 'clamp(100px, 20vw, 280px)', fontWeight: 700,
          letterSpacing: '-0.07em', lineHeight: 1,
          color: 'rgba(0,0,0,0.028)', whiteSpace: 'nowrap',
          userSelect: 'none', paddingLeft: '3%',
        }}>
          PROCESS
        </span>
      </motion.div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-10">
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
          <div className="absolute left-0 right-0 top-14 hidden lg:block overflow-hidden" style={{ height: 1 }}>
            <div
              className="h-full"
              style={{
                background: 'linear-gradient(to right, var(--accent), var(--border))',
                transformOrigin: 'left',
                animation: 'rf-page-in 1.5s cubic-bezier(0.22,1,0.36,1) both',
                animationDelay: '0.5s',
              }}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {METHOD_DATA.map((m, i) => (
              <ScrollReveal key={m.n} stagger={i + 1}>
                <div className="relative pt-16 lg:pt-20">
                  <div
                    className="absolute top-12 lg:top-[50px] left-0 w-3.5 h-3.5 rounded-full"
                    style={{
                      background: 'var(--bg)',
                      border: `2px solid ${i === 0 ? 'var(--accent)' : 'rgba(0,0,0,0.15)'}`,
                      boxShadow: i === 0 ? '0 0 16px rgba(20,184,166,0.35)' : 'none',
                    }}
                  />
                  <div style={{
                    position: 'absolute', top: -10, left: 0,
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 80, fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 1,
                    color: 'rgba(0,0,0,0.038)', userSelect: 'none', pointerEvents: 'none',
                  }}>
                    {m.n}
                  </div>
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
    <section
      className="py-24 sm:py-32 relative overflow-hidden"
      style={{ background: '#050505', color: '#FAFAF8', borderTop: '1px solid var(--border)' }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div style={{
          position: 'absolute', bottom: 0, left: 0, width: '50%', height: '60%',
          background: 'radial-gradient(ellipse at 20% 80%, rgba(20,184,166,0.05) 0%, transparent 60%)',
          filter: 'blur(50px)',
        }} />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24 mb-16 items-end">
          <ScrollReveal className="lg:col-span-5">
            <Eyebrow color="var(--accent)">Selected works</Eyebrow>
            <h2
              className="font-sans font-medium leading-[0.96] tracking-[-0.04em] m-0 mt-4"
              style={{ fontSize: 'clamp(40px, 5vw, 80px)', color: '#FAFAF8' }}
            >
              <MaskReveal>Receipts,</MaskReveal><br />
              <MaskReveal delay={0.1}>not promises.</MaskReveal>
            </h2>
          </ScrollReveal>
          <ScrollReveal stagger={2} className="lg:col-span-7">
            <p className="text-base sm:text-[17px] leading-relaxed max-w-[480px] ml-auto text-left lg:text-right m-0" style={{ color: 'rgba(255,255,255,0.74)' }}>
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

        <ScrollReveal className="mt-16 pt-12" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-3">
              <div className="font-mono text-[11px] tracking-[0.14em] uppercase" style={{ color: 'var(--accent)' }}>
                From our clients
              </div>
              <div className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.74)' }}>
                Sarah Jenkins<br />
                Global CMO, Noon Group
              </div>
            </div>
            <div className="lg:col-span-9">
              <blockquote
                className="font-sans font-normal m-0 leading-[1.1] tracking-[-0.03em]"
                style={{ fontSize: 'clamp(24px, 3vw, 48px)', color: '#FAFAF8' }}
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
    <section className="py-24 sm:py-32 relative overflow-hidden" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-10">
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
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-px"
              style={{ background: 'var(--border)', border: '1px solid var(--border)' }}
            >
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
      className="flex flex-col justify-between text-left cursor-none p-6 sm:p-8 min-h-[180px]"
      style={{
        background: hover ? '#0f0e0c' : 'var(--bg)',
        color: hover ? '#FAFAF8' : 'var(--ink)',
        textDecoration: 'none',
        transition: 'background 0.4s ease',
      }}
    >
      <div>
        <div className="font-mono text-[11px] tracking-[0.14em]" style={{ color: hover ? 'var(--accent)' : 'var(--text-muted)' }}>
          {String(i + 1).padStart(2, '0')} / 08
        </div>
        <h3 className="font-sans text-lg sm:text-xl font-medium tracking-[-0.02em] leading-tight mt-4 mb-1.5">
          {ind.name}
        </h3>
        <div className="text-[13px] leading-relaxed" style={{ color: hover ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)' }}>
          {ind.note}
        </div>
      </div>
      <div className="font-mono text-[11px] tracking-[0.14em] mt-5 flex justify-between" style={{ color: hover ? 'var(--accent)' : 'var(--text-muted)' }}>
        <span>{ind.tags[0]} · {ind.tags[1]}</span>
        <span style={{ display: 'inline-block', transition: 'transform 0.4s ease', transform: hover ? 'translateX(6px)' : 'translateX(0)' }}>↗</span>
      </div>
    </Link>
  );
}

function HubMap() {
  const hubs = [
    { name: 'New York', code: 'NYC', x: 285, y: 225 },
    { name: 'London', code: 'LDN', x: 500, y: 185 },
    { name: 'Dubai', code: 'DXB', x: 615, y: 255 },
    { name: 'Bangalore', code: 'BLR', x: 705, y: 295 },
    { name: 'Sydney', code: 'SYD', x: 875, y: 420 },
  ];
  return (
    <svg viewBox="0 0 1000 520" width="100%" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
      <g>
        {[[200,130,110,90],[240,250,90,110],[510,170,75,60],[560,280,130,130],[680,200,160,110],[820,230,80,60],[880,400,60,40]].map(([cx,cy,rx,ry],i) => (
          <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill="rgba(0,0,0,0.03)" />
        ))}
      </g>
      {hubs.map((h) => (
        <g key={h.code}>
          <circle cx={h.x} cy={h.y} r="16" fill="none" stroke="rgba(20,184,166,0.18)">
            <animate attributeName="r" values="10;36;10" dur="2.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0;0.4" dur="2.8s" repeatCount="indefinite" />
          </circle>
          <circle cx={h.x} cy={h.y} r="8" fill="none" stroke="rgba(20,184,166,0.38)">
            <animate attributeName="r" values="6;20;6" dur="2.8s" repeatCount="indefinite" begin="0.4s" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur="2.8s" repeatCount="indefinite" begin="0.4s" />
          </circle>
          <circle cx={h.x} cy={h.y} r="4" fill="var(--accent)" />
          <circle cx={h.x} cy={h.y} r="8" fill="rgba(20,184,166,0.12)" />
          <text x={h.x+14} y={h.y+4} fill="#0D0C0A" fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="600">{h.code}</text>
          <text x={h.x+14} y={h.y+20} fill="#9B9790" fontFamily="JetBrains Mono, monospace" fontSize="9">{h.name}</text>
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
    <section
      className="py-24 sm:py-36 relative overflow-hidden"
      style={{ background: '#050505', borderTop: '1px solid var(--border)' }}
    >
      <GradientMesh />
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <ScrollReveal className="lg:col-span-7">
            <h2
              className="font-sans font-medium leading-[0.9] tracking-[-0.045em] m-0"
              style={{ fontSize: 'clamp(56px, 9vw, 180px)' }}
            >
              <MaskReveal>
                <span className="rf-gradient-text-dark">Ready</span>
              </MaskReveal><br />
              <MaskReveal delay={0.1}>
                <span style={{ color: '#FAFAF8' }}>to build?</span>
              </MaskReveal>
            </h2>
          </ScrollReveal>
          <ScrollReveal stagger={3} className="lg:col-span-5">
            <p className="text-lg leading-relaxed m-0" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Start with a free audit. No pitch. No commitment. A real analysis of where you are and what to do next — delivered within 48 hours.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <MagneticBtn>
                <Btn variant="accent" href={CALENDLY_LINK} external>Book a call →</Btn>
              </MagneticBtn>
              <MagneticBtn>
                <Btn variant="onDark" href="/free-seo-audit">Get free audit</Btn>
              </MagneticBtn>
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
    <main className="rf-page-wrap" style={{ paddingTop: 0 }}>
      <Hero />
      <ClientPartners />
      <FourSpokes />
      <Methodology />
      <SelectedWorks />
      <Coverage />
      <FinalCTA />
    </main>
  );
}
