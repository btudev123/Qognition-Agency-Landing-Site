'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { CaseStudy } from '../../types';

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

export function WorkCard({ work, index }: { work: CaseStudy; index: number }) {
  const [hover, setHover] = React.useState(false);

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
          src={work.image}
          alt={`${work.client} — ${work.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Pill>{String(index + 1).padStart(2, '0')}</Pill>
          <Pill>{work.industry}</Pill>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        <div className="font-mono text-[11px] tracking-[0.14em] mb-3" style={{ color: 'var(--accent)' }}>
          {work.client.toUpperCase()}
        </div>
        <h3
          className="font-sans font-medium tracking-[-0.025em] leading-tight m-0 text-[var(--ink)]"
          style={{ fontSize: 'clamp(20px, 2vw, 28px)' }}
        >
          {work.title}
        </h3>
        <p className="text-sm leading-relaxed mt-3 text-[var(--text-muted)] line-clamp-2">
          {work.summary || work.challenge}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {work.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 font-mono text-[10px] tracking-[0.08em] uppercase"
              style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div
          className="grid gap-4 mt-6 pt-5"
          style={{
            gridTemplateColumns: `repeat(${Math.min(work.stats.length, 3)}, 1fr)`,
            borderTop: '1px solid var(--border)',
          }}
        >
          {work.stats.slice(0, 3).map((stat) => (
            <div key={stat.label}>
              <div
                className="font-sans font-medium tracking-[-0.025em] leading-none"
                style={{
                  fontSize: 'clamp(18px, 1.6vw, 24px)',
                  color: 'var(--accent)',
                  fontFeatureSettings: '"tnum"',
                }}
              >
                {stat.value}
              </div>
              <div className="font-mono text-[10px] tracking-[0.12em] uppercase mt-1.5" style={{ color: 'var(--text-muted)' }}>
                {stat.label}
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

export function WorkCardFeatured({ work, index }: { work: CaseStudy; index: number }) {
  const [hover, setHover] = React.useState(false);

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
            src={work.image}
            alt={`${work.client} — ${work.title}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <Pill>{String(index + 1).padStart(2, '0')} / Featured</Pill>
            <Pill>{work.industry}</Pill>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 lg:p-12 flex flex-col justify-between">
          <div>
            <div className="font-mono text-[11px] tracking-[0.14em] mb-4" style={{ color: 'var(--accent)' }}>
              {work.client.toUpperCase()}
            </div>
            <h3
              className="font-sans font-medium tracking-[-0.03em] leading-tight m-0 text-[var(--ink)]"
              style={{ fontSize: 'clamp(28px, 3vw, 42px)' }}
            >
              {work.title}
            </h3>
            <p className="text-[15px] leading-relaxed mt-4 text-[var(--text-muted)]">
              {work.summary || work.challenge}
            </p>
          </div>

          <div className="mt-8 pt-6 grid grid-cols-3 gap-6 items-end" style={{ borderTop: '1px solid var(--border)' }}>
            {work.stats.slice(0, 3).map((stat) => (
              <div key={stat.label}>
                <div
                  className="font-sans font-medium tracking-[-0.025em] leading-none"
                  style={{
                    fontSize: 'clamp(22px, 2vw, 32px)',
                    color: 'var(--accent)',
                    fontFeatureSettings: '"tnum"',
                  }}
                >
                  {stat.value}
                </div>
                <div className="font-mono text-[10px] tracking-[0.12em] uppercase mt-2" style={{ color: 'var(--text-muted)' }}>
                  {stat.label}
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
