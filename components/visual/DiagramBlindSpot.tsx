import type { CSSProperties, ReactNode } from 'react';

/* The buying-problem diagram (brief §2.3). Inline SVG, server-rendered, no motion.
 *
 * Every colour is an --s-* role, so the one drawing serves light and dark
 * grounds. Labels are real <text> at 14 viewBox units in mono uppercase, and
 * each variant is only shown at widths where it renders at >= 0.9 of its
 * viewBox width, which keeps labels at or above the 13px mono floor:
 *   horizontal  720 x 300, from 768px
 *   vertical    300 x 440, below 768px
 * Swapping variants by width is a substitution, not a hide: the same title and
 * description reach assistive tech at every width.
 *
 * Roles (brief §1.2, Ruth 2026-10-07): dashed means unknown, and the one
 * unknown is YOUR FIRM? in the shortlist. YOUR ANALYTICS is the emphasised
 * node, drawn solid in --s-accent. */

const DESC =
  'A buyer can ask ChatGPT, Perplexity or Google’s AI Mode for a shortlist before visiting a single vendor site. The answer draws on your pages and on what other sites say about you.';
const TITLE = 'Where an AI answer sits in the buying journey, and the part your analytics can see';

const LABEL: CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 14,
  letterSpacing: '0.14em',
  fill: 'var(--s-text-muted)',
};
const NODE: CSSProperties = { fill: 'var(--s-surface-1)', stroke: 'var(--s-rule-strong)', strokeWidth: 1 };
const EMPHASIS: CSSProperties = { fill: 'var(--s-surface-1)', stroke: 'var(--s-accent)', strokeWidth: 1.5 };
const FLOW: CSSProperties = { fill: 'none', stroke: 'var(--s-accent-graphic)', strokeWidth: 1.5 };
const BAR: CSSProperties = { fill: 'none', stroke: 'var(--s-rule-strong)', strokeWidth: 1 };
const UNKNOWN: CSSProperties = { fill: 'none', stroke: 'var(--s-accent-graphic)', strokeWidth: 1.5, strokeDasharray: '4 4' };

function Node({
  x, y, w, label, emphasis = false,
}: { x: number; y: number; w: number; label: string; emphasis?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={40} style={emphasis ? EMPHASIS : NODE} />
      <text
        x={x + w / 2}
        y={y + 20}
        textAnchor="middle"
        dominantBaseline="central"
        style={emphasis ? { ...LABEL, fill: 'var(--s-accent)' } : LABEL}
      >
        {label}
      </text>
    </g>
  );
}

function Svg({
  id, width, height, className, children,
}: { id: string; width: number; height: number; className: string; children: ReactNode }) {
  return (
    <svg
      role="img"
      aria-labelledby={`${id}-t ${id}-d`}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={{ overflow: 'visible' }}
    >
      <title id={`${id}-t`}>{TITLE}</title>
      <desc id={`${id}-d`}>{DESC}</desc>
      <defs>
        <marker
          id={`${id}-arrow`}
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="8"
          markerHeight="8"
          markerUnits="userSpaceOnUse"
          orient="auto"
        >
          <path d="M0 0 L8 4 L0 8 z" style={{ fill: 'var(--s-accent)' }} />
        </marker>
      </defs>
      {children}
    </svg>
  );
}

/** `idPrefix` keeps title, desc and marker ids unique when a layout places two instances. */
export default function DiagramBlindSpot({ idPrefix = 'q-blindspot' }: { idPrefix?: string }) {
  const h = `${idPrefix}-h`;
  const v = `${idPrefix}-v`;
  return (
    <>
      {/* Horizontal, from 768px. */}
      <Svg id={h} width={720} height={260} className="hidden md:block w-full h-auto max-w-[720px]">
        <Node x={0} y={20} w={150} label="YOUR PAGES" />
        <Node x={0} y={80} w={150} label="OTHER SITES" />
        <path d="M150 40 H172 V100 H150" style={FLOW} />
        <path d="M172 70 H198" style={FLOW} markerEnd={`url(#${h}-arrow)`} />
        <Node x={200} y={50} w={140} label="AI ANSWER" />
        <Node x={190} y={200} w={160} label="BUYER QUESTION" />
        <path d="M270 200 V93" style={FLOW} markerEnd={`url(#${h}-arrow)`} />
        <path d="M340 70 H384" style={FLOW} markerEnd={`url(#${h}-arrow)`} />
        <text x={390} y={30} style={LABEL}>SHORTLIST</text>
        <rect x={390} y={42} width={120} height={14} style={BAR} />
        <rect x={390} y={64} width={120} height={14} style={BAR} />
        <rect x={390} y={86} width={120} height={14} style={UNKNOWN} />
        <text x={522} y={93} dominantBaseline="central" style={{ ...LABEL, fill: 'var(--s-accent)' }}>YOUR FIRM?</text>
        <path d="M450 106 V196" style={FLOW} markerEnd={`url(#${h}-arrow)`} />
        <Node x={370} y={200} w={160} label="CLICK-THROUGH" />
        <path d="M530 220 H552" style={FLOW} markerEnd={`url(#${h}-arrow)`} />
        <Node x={556} y={200} w={164} label="YOUR ANALYTICS" emphasis />
      </Svg>

      {/* Vertical, below 768px. 300 units wide, not 320: at a 320px viewport the
          Shell leaves 280px, and 280 / 300 x 14 = 13.07px keeps the labels at the
          13px mono floor. At 320 units they fell to 12.25px. */}
      <Svg id={v} width={300} height={440} className="md:hidden w-full h-auto max-w-[400px]">
        <Node x={70} y={0} w={160} label="BUYER QUESTION" />
        <Node x={0} y={70} w={145} label="YOUR PAGES" />
        <Node x={155} y={70} w={145} label="OTHER SITES" />
        <path d="M150 40 V146" style={FLOW} markerEnd={`url(#${v}-arrow)`} />
        <path d="M72.5 110 V128 H227.5 V110" style={FLOW} />
        <Node x={75} y={150} w={150} label="AI ANSWER" />
        <path d="M150 190 V206 H90 V218" style={FLOW} markerEnd={`url(#${v}-arrow)`} />
        <rect x={30} y={224} width={120} height={14} style={BAR} />
        <rect x={30} y={246} width={120} height={14} style={BAR} />
        <rect x={30} y={268} width={120} height={14} style={UNKNOWN} />
        <text x={162} y={231} dominantBaseline="central" style={LABEL}>SHORTLIST</text>
        <text x={162} y={275} dominantBaseline="central" style={{ ...LABEL, fill: 'var(--s-accent)' }}>YOUR FIRM?</text>
        <path d="M90 286 V316" style={FLOW} markerEnd={`url(#${v}-arrow)`} />
        <Node x={10} y={320} w={160} label="CLICK-THROUGH" />
        <path d="M90 360 V386" style={FLOW} markerEnd={`url(#${v}-arrow)`} />
        <Node x={8} y={390} w={164} label="YOUR ANALYTICS" emphasis />
      </Svg>
    </>
  );
}
