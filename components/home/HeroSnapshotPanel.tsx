'use client';

import Link from 'next/link';
import { useId, useState } from 'react';

/* The hero's right-hand panel — the interactive one.
 *
 * WHAT THIS IS AND WHY IT IS NOT THE OLD ROI CALCULATOR.
 *
 * The operator approved the live site's hero composition: a dense, interactive
 * card beside the display type, with sector chips, live content, a large figure,
 * a segmented bar and an inline CTA. That composition is kept exactly. What is
 * NOT kept is the old HeroRoiCalculator's OUTPUT, which was a projected revenue
 * figure with no measurement behind it — the claim CLAUDE.md §4 forbids, and the
 * decorative-dashboard-with-invented-metrics pattern §9 bans outright.
 *
 * So every number this panel renders is a fact about OUR OWN METHOD, derived at
 * render time from the data directly below, and never a claim about the reader's
 * position, their competitors' position, or any result. Read that again before
 * adding a figure here. "18 prompts across 5 platforms" is checkable by counting
 * the array. "You are losing $145,152" is not checkable by anyone.
 *
 * The prompts are real buyer prompts for each sector — Family B in
 * docs/seo/b2b-niche-architecture.md, the question the CLIENT'S buyer asks, not
 * the one Qognition targets. Showing them is the entire persuasion: the reader
 * recognises their own buyer's words, and can paste any line into ChatGPT right
 * now and see for themselves. That reproducibility is the offer.
 *
 * CLIENT COMPONENT, deliberately and minimally. One useState over a frozen
 * array, no effects, no observers, no libraries. The interaction IS the design
 * the operator asked for; a server render of four static lists would ship more
 * HTML than this ships JS.
 *
 * The limit line at the bottom is not a disclaimer bolted on. It is the reason
 * the offer converts: a reader told plainly what a thing cannot do believes what
 * they are told it can. Do not move it and do not shrink it.
 */

type Sector = {
  id: string;
  label: string;
  /* Verbatim buyer prompts. Present tense, no Qognition mention, no superlative.
     If you add one, it must be a sentence a real procurement lead would type. */
  prompts: string[];
};

const SECTORS: readonly Sector[] = [
  {
    id: 'manufacturing',
    label: 'Manufacturing',
    prompts: [
      'Find ISO 9001 and AS9100 certified CNC machining suppliers in the Midwest',
      'Which contract manufacturers handle low-volume medical device parts?',
      'Compare injection moulding vendors with ITAR registration',
    ],
  },
  {
    id: 'legal',
    label: 'Legal',
    prompts: [
      'Best commercial litigation firms for mid-market SaaS disputes',
      'Which law firms specialise in cross-border M&A under $50M?',
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

/* Every platform here is one we actually query. Adding a row is a claim. */
const PLATFORMS = ['ChatGPT', 'Perplexity', 'Gemini', 'Claude', 'Google AI'] as const;

/* The four steps the snapshot actually performs, in order. The bar below is a
   description of this process, not a score. */
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
          Free AI visibility snapshot
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
          See what AI says when your buyer asks.
        </h2>
        <p className="text-meta mt-2.5 m-0" style={{ color: 'var(--s-text-muted)' }}>
          Pick your sector. These are real prompts we run — no email required to look.
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
            Prompts we run
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
          Sampled across
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

        {/* ── The figure.
               It is a turnaround commitment we control, NOT a measurement of the
               reader, their competitors or any platform. It was briefly the
               platform count, which was both redundant with the row directly
               above and a number with nothing at stake in it. 48 hours is the
               promise the funnel is actually judged on. Change it here and you
               have changed a service commitment — check /free-ai-audit says the
               same thing. ────────────────────────────────────────────────── */}
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
              48
            </span>{' '}
            hours
          </p>
          {/* Right-aligned only from sm. Below that it wraps to its own line,
              where right alignment reads as a mistake. */}
          <p className="m-0 text-meta sm:text-right" style={{ color: 'var(--s-text-muted)' }}>
            Your prompt set, your competitors,
            <br />
            named and dated.
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

        <Link href="/free-ai-audit" className="rf-btn rf-btn--primary w-full mt-6">
          Get your free snapshot
        </Link>
      </div>

      <p
        className="text-meta px-5 sm:px-6 py-3.5 m-0"
        style={{ borderTop: '1px solid var(--s-rule-hairline)', color: 'var(--s-text-faint)' }}
      >
        A sample of prompts is a sample. It tells you what we observed on one date, not your
        permanent position.
      </p>
    </aside>
  );
}
