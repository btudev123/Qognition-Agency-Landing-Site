'use client';

import Link from 'next/link';
import { useId, useState } from 'react';


type Sector = {
  id: string;
  label: string;
  /* Verbatim buyer prompts. Present tense, no Qognition mention, no superlative.
     If you add one, it must be a sentence a real procurement lead would type. */
  prompts: string[];
};

const SECTORS: readonly Sector[] = [
  {
    id: 'saas',
    label: 'B2B SaaS',
    prompts: [
      'Compare procurement software for a multi-site manufacturing business',
      'Which compliance platforms support our existing identity provider?',
      'What should a mid-market finance team evaluate before changing payroll software?',
    ],
  },
  {
    id: 'manufacturing',
    label: 'Manufacturing',
    prompts: [
      'Find ISO 9001 and AS9100 certified CNC machining suppliers in the Midwest',
      'Which contract manufacturers handle low-volume medical device parts?',
      'Compare injection molding vendors with ITAR registration',
    ],
  },
  {
    id: 'legal',
    label: 'Legal',
    prompts: [
      'Best commercial litigation firms for mid-market SaaS disputes',
      'Which law firms specialize in cross-border M&A under $50M?',
      'Employment counsel with experience defending WARN Act claims',
    ],
  },
  {
    id: 'msp',
    label: 'IT and MSP',
    prompts: [
      'Managed security providers with SOC 2 Type II and 24/7 SOC coverage',
      'Which MSPs support Epic environments for regional hospital systems?',
      'Compare co-managed IT providers for 200-seat manufacturers',
    ],
  },
  {
    id: 'logistics',
    label: 'Logistics',
    prompts: [
      'Third-party logistics providers with FDA-registered cold chain warehousing',
      'Which freight brokers handle oversize project cargo into Latin America?',
      'Compare 3PLs offering EDI integration with NetSuite',
    ],
  },
] as const;

const PLATFORMS = ['ChatGPT', 'Perplexity', 'Gemini', 'Claude', 'Google AI'] as const;

const STEPS = ['Prompt set', 'Run', 'Crawl', 'Report'] as const;

export default function HeroSnapshotPanel() {
  const [active, setActive] = useState(0);
  const panelId = useId();
  const sector = SECTORS[active];

  return (
    <aside
      aria-labelledby={`${panelId}-heading`}
      className="w-full overflow-hidden"
      style={{
        background: 'var(--s-surface-1)',
        border: '1px solid var(--s-rule)',
        boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 12px 32px -18px rgba(0,0,0,0.18)',
      }}
    >
      {/* ── Header rule ─────────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between gap-3 px-5 sm:px-6 py-3.5"
        style={{ borderBottom: '1px solid var(--s-rule-hairline)' }}
      >
        <span
          /* Wraps rather than truncating. At 360 the tracking pushes this past
             the available width and `truncate` rendered "FREE AI VISIBILITY
             SNAPSH…", which loses the word the offer turns on. */
          className="font-mono text-meta tracking-[0.14em] uppercase"
          style={{ color: 'var(--s-text-faint)' }}
        >
          Your buyers’ questions
        </span>
        {/* Two uses of rf-pulse maximum per page (docs/design/motion.md §2).
            This is one; the other is nowhere. */}
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{
            background: 'var(--s-accent-graphic)',
            animation: 'rf-pulse 2s ease-in-out infinite',
          }}
          aria-hidden="true"
        />
      </div>

      <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-5 sm:pb-6">
        <h2 id={`${panelId}-heading`} className="text-h3 font-sans m-0">
          Start with the questions behind the shortlist.
        </h2>
        <p className="text-meta mt-2.5 m-0" style={{ color: 'var(--s-text-muted)' }}>
          Pick a sector to see example buyer questions. These are prompts we would test, not answers we observed.
        </p>

        {/* ── Sector chips ──────────────────────────────────────────────── */}
        <div
          role="tablist"
          aria-label="Sector"
          className="flex flex-wrap gap-2 mt-5"
        >
          {SECTORS.map((s, i) => {
            const on = i === active;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                id={`${panelId}-tab-${s.id}`}
                aria-selected={on}
                tabIndex={on ? 0 : -1}
                onKeyDown={(event) => {
                  let next: number | undefined;
                  if (event.key === 'ArrowRight') next = (i + 1) % SECTORS.length;
                  if (event.key === 'ArrowLeft') next = (i - 1 + SECTORS.length) % SECTORS.length;
                  if (event.key === 'Home') next = 0;
                  if (event.key === 'End') next = SECTORS.length - 1;
                  if (next === undefined) return;
                  event.preventDefault();
                  setActive(next);
                  document.getElementById(`${panelId}-tab-${SECTORS[next].id}`)?.focus();
                }}
                aria-controls={`${panelId}-prompts`}
                onClick={() => setActive(i)}
                className="font-sans text-meta rounded-full px-3.5 py-1.5 transition-colors duration-150"
                style={{
                  background: on ? 'var(--s-accent)' : 'transparent',
                  color: on ? 'var(--s-cta-fg)' : 'var(--s-text-muted)',
                  border: `1px solid ${on ? 'var(--s-accent)' : 'var(--s-rule)'}`,
                }}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* ── Prompts ───────────────────────────────────────────────────── */}
        <div
          id={`${panelId}-prompts`}
          role="tabpanel"
          aria-labelledby={`${panelId}-tab-${sector.id}`}
          className="mt-5"
          style={{ background: 'var(--s-surface-2)', border: '1px solid var(--s-rule-hairline)' }}
        >
          <p
            className="font-mono text-meta tracking-[0.14em] uppercase px-4 pt-3.5 pb-2 m-0"
            style={{ color: 'var(--s-text-faint)' }}
          >
            Example buyer questions
          </p>
          <ul className="list-none p-0 m-0 px-4 pb-4 grid gap-2.5">
            {sector.prompts.map((p, i) => (
              <li key={p} className="flex gap-3 items-start">
                <span
                  className="font-mono text-meta flex-shrink-0 tabular-nums pt-px"
                  style={{ color: 'var(--s-accent)' }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="text-meta min-w-0"
                  style={{ color: 'var(--s-text)', textWrap: 'pretty' }}
                >
                  “{p}”
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Platforms ─────────────────────────────────────────────────── */}
        <p
          className="font-mono text-meta tracking-[0.14em] uppercase mt-6 mb-2.5 m-0"
          style={{ color: 'var(--s-text-faint)' }}
        >
          Platforms we would test
        </p>
        <ul className="list-none p-0 m-0 flex flex-wrap gap-x-4 gap-y-1.5">
          {PLATFORMS.map((name) => (
            <li
              key={name}
              className="inline-flex items-center gap-1.5 text-meta"
              style={{ color: 'var(--s-text-muted)' }}
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
                className="flex-shrink-0"
              >
                <path
                  d="M1.5 6.5 4.5 9.5 10.5 3"
                  stroke="var(--s-accent-graphic)"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
              {name}
            </li>
          ))}
        </ul>

        {/* Example count, not a delivery promise or measured outcome. */}
        <div
          className="mt-6 pt-5 flex items-end justify-between gap-4 flex-wrap"
          style={{ borderTop: '1px solid var(--s-rule-hairline)' }}
        >
          <p className="m-0 text-body leading-none" style={{ color: 'var(--s-text-muted)' }}>
            <span
              className="font-sans tabular-nums"
              style={{
                color: 'var(--s-accent-display)',
                fontSize: 'clamp(2.25rem, 5vw, 3rem)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              {sector.prompts.length}
            </span>{' '}
            example questions
          </p>
          {/* Right-aligned only from sm. Below that it wraps to its own line,
              where right alignment reads as a mistake. */}
          <p className="m-0 text-meta sm:text-right" style={{ color: 'var(--s-text-muted)' }}>
            Your free audit uses your buyers&apos;
            <br />
            questions, not these.
          </p>
        </div>

        {/* ── Process bar. A description of the four steps, not a score. ─── */}
        {/* Two columns below sm. At 360 four columns gave each label ~68px and
            "Prompt set" truncated. */}
        <ol
          className="list-none p-0 m-0 grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-3 mt-4"
          aria-label="What happens"
        >
          {STEPS.map((step) => (
            <li key={step} className="min-w-0">
              <span
                className="block h-1"
                style={{ background: 'var(--s-accent-graphic)' }}
                aria-hidden="true"
              />
              <span
                className="block font-mono text-meta mt-1.5"
                style={{ color: 'var(--s-text-faint)', fontSize: '0.6875rem' }}
              >
                {step}
              </span>
            </li>
          ))}
        </ol>

        <Link href="#book" className="rf-btn rf-btn--primary w-full mt-6">
          Book a call
        </Link>
      </div>

      <p
        className="text-meta px-5 sm:px-6 py-3.5 m-0"
        style={{ borderTop: '1px solid var(--s-rule-hairline)', color: 'var(--s-text-faint)' }}
      >
        These are examples. A free AI visibility audit records the actual answers, the sources they cited and the date we ran them.
      </p>
    </aside>
  );
}
