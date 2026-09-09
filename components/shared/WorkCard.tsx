'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { ResolvedCaseStudy, Kpi } from '../../data/case-studies';
import { nicheLabel, serviceLabel } from '../../data/case-studies';

/** Prefer the client's reported figure; fall back to the benchmark-derived target. */
const kpiValue = (kpi: Kpi) => kpi.actual ?? kpi.target;

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] uppercase"
      style={{
        border: '1px solid var(--ink)',
        color: 'var(--ink)',
        background: 'var(--bg)',
      }}
    >
      <span className="w-1 h-1 rounded-full" style={{ background: 'var(--accent)' }} />
      {children}
    </span>
  );
}

export function WorkCard({ work, index }: { work: ResolvedCaseStudy; index: number }) {
  const [hover, setHover] = React.useState(false);
  const kpis = work.kpis.slice(0, 3);

  return (
    <Link
      href={`/case-studies/${work.id}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="block group rf-studio-border"
      style={{ textDecoration: 'none', color: 'inherit', background: 'var(--surface)' }}
    >
      {/* Image */}
      <div className="rf-work-image" style={{ aspectRatio: '16/10' }}>
        <Image
          src={work.image.src}
          alt={work.image.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Pill>{String(index + 1).padStart(2, '0')}</Pill>
          <Pill>{nicheLabel(work.niche)}</Pill>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        <div className="font-mono text-[11px] tracking-[0.14em] mb-3" style={{ color: 'var(--accent)' }}>
          {work.client.toUpperCase()}
        </div>
        <h3
          className="text-h3 font-sans m-0 text-[var(--ink)] font-semibold"
          style={{ fontSize: 'clamp(20px, 2vw, 28px)' }}
        >
          {work.headline}
        </h3>
        <p className="text-body mt-3 text-[var(--text-muted)] line-clamp-2">
          {work.coreProblem}
        </p>

        {/* Services */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {work.services.map((service) => (
            <span
              key={service}
              className="px-2 py-1 font-mono text-[10px] tracking-[0.08em] uppercase"
              style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
            >
              {serviceLabel(service)}
            </span>
          ))}
        </div>

        {/* KPIs — actual where reported, otherwise the benchmark-derived target */}
        <div
          className="grid gap-4 mt-6 pt-5"
          style={{
            gridTemplateColumns: `repeat(${Math.min(kpis.length, 3)}, 1fr)`,
            borderTop: '1px solid var(--border)',
          }}
        >
          {kpis.map((kpi) => (
            <div key={kpi.label}>
              <div
                className="font-sans font-medium tracking-[-0.025em] leading-none"
                style={{
                  fontSize: 'clamp(18px, 1.6vw, 24px)',
                  color: 'var(--accent)',
                  fontFeatureSettings: '"tnum"',
                }}
              >
                {kpiValue(kpi)}
              </div>
              <div className="font-mono text-[10px] tracking-[0.12em] uppercase mt-1.5" style={{ color: 'var(--text-muted)' }}>
                {kpi.label}{!kpi.actual && ' (target)'}
              </div>
            </div>
          ))}
          <div className="flex items-end justify-end">
            <span
              className="font-mono text-[11px] tracking-[0.14em] inline-flex items-center gap-2 transition-transform duration-400"
              style={{
                color: 'var(--accent)',
                transform: hover ? 'translateX(6px)' : 'translateX(0)',
              }}
            >
              VIEW
              <span className="w-7 h-7 rounded-full inline-flex items-center justify-center text-sm" style={{ border: '1px solid currentColor' }}>↗</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function WorkCardFeatured({ work, index }: { work: ResolvedCaseStudy; index: number }) {
  const [hover, setHover] = React.useState(false);
  const kpis = work.kpis.slice(0, 3);

  return (
    <Link
      href={`/case-studies/${work.id}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="block group rf-studio-border"
      style={{ textDecoration: 'none', color: 'inherit', background: 'var(--surface)' }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image */}
        <div className="rf-work-image" style={{ minHeight: 320 }}>
          <Image
            src={work.image.src}
            alt={work.image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <Pill>{String(index + 1).padStart(2, '0')} / Featured</Pill>
            <Pill>{nicheLabel(work.niche)}</Pill>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 lg:p-12 flex flex-col justify-between">
          <div>
            <div className="font-mono text-[11px] tracking-[0.14em] mb-4" style={{ color: 'var(--accent)' }}>
              {work.client.toUpperCase()}
            </div>
            <h3
              className="text-h3 font-sans m-0 text-[var(--ink)] font-semibold"
              style={{ fontSize: 'clamp(28px, 3vw, 42px)' }}
            >
              {work.headline}
            </h3>
            <p className="text-body mt-4 text-[var(--text-muted)]">
              {work.coreProblem}
            </p>
          </div>

          <div className="mt-8 pt-6 grid grid-cols-3 gap-6 items-end" style={{ borderTop: '1px solid var(--border)' }}>
            {kpis.map((kpi) => (
              <div key={kpi.label}>
                <div
                  className="font-sans font-medium tracking-[-0.025em] leading-none"
                  style={{
                    fontSize: 'clamp(22px, 2vw, 32px)',
                    color: 'var(--accent)',
                    fontFeatureSettings: '"tnum"',
                  }}
                >
                  {kpiValue(kpi)}
                </div>
                <div className="font-mono text-[10px] tracking-[0.12em] uppercase mt-2" style={{ color: 'var(--text-muted)' }}>
                  {kpi.label}{!kpi.actual && ' (target)'}
                </div>
              </div>
            ))}
            <span
              className="font-mono text-[11px] tracking-[0.14em] inline-flex items-center gap-2 transition-transform duration-400 justify-end"
              style={{
                color: 'var(--accent)',
                transform: hover ? 'translateX(6px)' : 'translateX(0)',
              }}
            >
              READ CASE
              <span className="w-9 h-9 rounded-full inline-flex items-center justify-center text-sm" style={{ border: '1px solid currentColor' }}>↗</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
