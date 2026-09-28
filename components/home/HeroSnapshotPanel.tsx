import Link from 'next/link';

/* The hero's right-hand panel.
 *
 * The frame, the position and the visual weight are unchanged from the design
 * the operator approved — a bordered panel with a mono header rule, sitting
 * beside the display type. Only the contents change.
 *
 * It used to be HeroRoiCalculator: 517 lines of client component whose output
 * was a projected revenue figure with no measurement behind it. That is the
 * claim CLAUDE.md §4 forbids, and §9 bans decorative dashboards with invented
 * metrics, so no amount of labelling rescues it. It is replaced by the offer
 * that the whole funnel points at (CLAUDE.md §3), which occupies the same space
 * honestly.
 *
 * SERVER COMPONENT. No state, no client JS. The panel's job is to make the
 * primary CTA unmissable above the fold, and a form or a calculator here would
 * add a client bundle to do a job a link already does — the form lives on
 * /free-ai-audit, which is one component and one endpoint (CLAUDE.md §12.3).
 *
 * The limit line at the bottom is not a disclaimer bolted on. It is the reason
 * the offer converts: a reader who is told plainly what a thing cannot do
 * believes what they are told it can, and in a category where every competitor
 * implies certainty it is the only differentiator available before a call.
 * Do not move it below the fold of the panel and do not shrink it.
 */

const RETURNS = [
  'The prompts we ran, written out in full',
  'What each platform returned, named and dated',
  'Who got named instead of you',
  'The two or three things we would do first',
];

export default function HeroSnapshotPanel() {
  return (
    <aside
      aria-labelledby="hero-snapshot-heading"
      style={{ background: 'var(--s-surface-1)', border: '1px solid var(--s-rule)' }}
    >
      <div
        className="flex items-center justify-between gap-4 px-6 py-4"
        style={{ borderBottom: '1px solid var(--s-rule-hairline)' }}
      >
        <h2
          id="hero-snapshot-heading"
          className="text-h4 font-mono font-normal tracking-[0.14em] uppercase m-0"
          style={{ color: 'var(--s-text-faint)' }}
        >
          The free AI visibility snapshot
        </h2>
        {/* Two uses of rf-pulse maximum per page (docs/design/motion.md §2).
            This is one; the other is nowhere. */}
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: 'var(--s-accent-graphic)', animation: 'rf-pulse 2s ease-in-out infinite' }}
          aria-hidden="true"
        />
      </div>

      <div className="px-6 py-6">
        <p className="text-body m-0" style={{ color: 'var(--s-text-muted)' }}>
          We build a prompt set from your buyers’ questions, run a sample of it across the
          assistants, crawl your site for the signals that feed those answers, and send you what we
          saw.
        </p>

        <p
          className="font-mono text-meta tracking-[0.14em] uppercase mt-7 mb-4"
          style={{ color: 'var(--s-text-faint)' }}
        >
          What comes back
        </p>
        <ul className="list-none p-0 m-0 grid gap-3">
          {RETURNS.map((item) => (
            <li key={item} className="flex gap-3 text-meta" style={{ color: 'var(--s-text)' }}>
              <span
                className="mt-1.5 w-1.5 h-1.5 flex-shrink-0"
                style={{ background: 'var(--s-accent-graphic)' }}
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>

        <Link href="/free-ai-audit" className="rf-btn rf-btn--primary w-full mt-7">
          Get your free snapshot
        </Link>
      </div>

      <p
        className="text-meta px-6 py-4 m-0"
        style={{ borderTop: '1px solid var(--s-rule-hairline)', color: 'var(--s-text-faint)' }}
      >
        A sample of prompts is a sample. It tells you what we observed on one date, not your
        permanent position.
      </p>
    </aside>
  );
}
