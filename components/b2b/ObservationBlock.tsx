import type { ObservationView, ObservedRow } from '../../lib/b2b/observations';
import { enginesIn, promptsIn } from '../../lib/b2b/observations';

/* THE OBSERVATION BLOCK. The only thing on either page type that is measurement
 * rather than craft, and the reason these are pages and not templates.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * FIVE STATES, AND THE EMPTY ONE IS THE IMPORTANT ONE.
 *
 *   loading      — skeleton. Unreachable on today's static render; it exists
 *                  because the store will not stay synchronous and because a
 *                  Suspense fallback needs this shape.
 *   unobserved   — NO RUN EXISTS. The default today for every entity. Fully
 *                  designed, says what has not happened and what happens next.
 *   error        — the store answered and could not produce a run. Names the
 *                  reason and gives the reader something to do.
 *   observed     — a real run. The only state that prints a vendor name.
 *   overflowing  — not a separate variant: it is `observed` with fifty rows, a
 *                  200-character prompt and a nine-segment URL. Handled in the
 *                  table rather than in a branch, because a state you have to
 *                  opt into is a state nobody tests.
 *
 * THE RULE THAT OUTRANKS THE DESIGN. `unobserved` must never look like a thin
 * or broken version of `observed`. No greyed-out example rows, no blurred
 * screenshot, no "Acme Corp" placeholder. A reader cannot tell a faded fake from
 * a real result, and once they cannot, the page is asserting something about
 * named third-party firms that nobody measured. CLAUDE.md §4.
 *
 * WHY A REAL <table>, EVEN AT 360px. Nadia's content bar
 * (docs/seo/b2b-niche-architecture.md §3.4) requires the observed-answer block
 * to be tabular in markup, because prompt × engine × vendors × URLs × date is
 * genuinely two-dimensional and extraction depends on it. Reflowing it into
 * <div>s below a breakpoint would trade the extraction property and the screen
 * reader's row/column announcements for visual comfort. Instead the table stays
 * a table and lives in a labelled, focusable scroll region — the standard
 * accessible pattern for wide tabular data, and the one that keeps a keyboard
 * user able to reach the overflow.
 * ────────────────────────────────────────────────────────────────────────────
 */

interface Props {
  readonly view: ObservationView;
  /** The niche in the reader's words, for copy that has to name it. */
  readonly nicheLabel: string;
  /** Distinguishes the ids when two blocks ever appear on one page. */
  readonly idPrefix: string;
}

const SHELL = 'mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10';

/** Mono uppercase label. The house idiom for a machine-recorded fact. */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-mono text-meta tracking-[0.14em] uppercase"
      style={{ color: 'var(--s-text-faint)' }}
    >
      {children}
    </span>
  );
}

/** The state body alone, for a template that places it inside its own section (the ICP
 *  "questions your buyers ask AI" band). Same five states, same rules. */
export function ObservationStatus({ view, nicheLabel, idPrefix }: Props) {
  return (
    <>
      {view.status === 'loading' && <LoadingState />}
      {view.status === 'unobserved' && <UnobservedState nicheLabel={nicheLabel} />}
      {view.status === 'error' && <ErrorState reason={view.reason} />}
      {view.status === 'observed' && <ObservedState view={view} idPrefix={idPrefix} />}
    </>
  );
}

export default function ObservationBlock({ view, nicheLabel, idPrefix }: Props) {
  const headingId = `${idPrefix}-observation`;

  return (
    /* Dark band. data-theme="dark" remaps every --s-* role underneath it; not
       one child branches on ground. CLAUDE.md §9. */
    <section
      data-theme="dark"
      aria-labelledby={headingId}
      className="py-16 sm:py-20"
      style={{ borderTop: '1px solid var(--s-rule-hairline)' }}
    >
      <div className={SHELL}>
        <h2 id={headingId} className="text-h2 font-sans m-0 max-w-[24ch] font-semibold">
          What AI tools said
        </h2>
        <p className="text-body mt-4 m-0 max-w-[68ch]" style={{ color: 'var(--s-text-muted)' }}>
          These are your buyers&rsquo; questions, not ours. We test them on AI tools and record who
          was named, the sources each answer linked to, and the date. An answer on one date is not a
          permanent position.
        </p>

        <div className="mt-8">
          <ObservationStatus view={view} nicheLabel={nicheLabel} idPrefix={idPrefix} />
        </div>
      </div>
    </section>
  );
}

/* ── loading ──────────────────────────────────────────────────────────────────
   Static bars, no pulse. An animated skeleton would need a reduced-motion
   escape; a static one needs nothing, and at this size the animation
   communicated nothing a caption does not. */
function LoadingState() {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className="p-6 sm:p-8"
      style={{ background: 'var(--s-surface-1)', border: '1px solid var(--s-rule-hairline)' }}
    >
      <p className="text-meta m-0" style={{ color: 'var(--s-text-faint)' }}>
        Loading the test record.
      </p>
      <div className="mt-5 grid gap-2.5" aria-hidden="true">
        {[92, 78, 85, 64, 71].map((w, i) => (
          <span
            key={i}
            className="block h-4"
            style={{ width: `${w}%`, background: 'var(--s-surface-2)' }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── unobserved. The default, and the one that carries the honesty. ─────────── */
function UnobservedState({ nicheLabel }: { nicheLabel: string }) {
  /* docs/copy/2026-10/plain-english-templates.md §9.2, section 2, unobserved state. Cut
     from about 130 words to about 50: what will appear, and why nothing appears yet. */
  return (
    <div
      className="p-6 sm:p-8"
      style={{ background: 'var(--s-surface-1)', border: '1px solid var(--s-rule-strong)' }}
    >
      <Label>Not tested yet</Label>
      <h3 className="text-h3 font-sans m-0 mt-3 max-w-[34ch] font-semibold">
        We haven&apos;t tested these questions for {nicheLabel} yet.
      </h3>
      <p className="text-body mt-4 m-0 max-w-[68ch]" style={{ color: 'var(--s-text-muted)' }}>
        When we do, this space will show each question, each AI tool, who was named, the sources and
        the date. Until then it stays empty, because a sample table would look like a result.
      </p>
      <div className="mt-7">
        <a href="/free-ai-audit" className="rf-btn rf-btn--primary">
          Request a free AI visibility audit
        </a>
      </div>
    </div>
  );
}

/* ── error. Says what broke and what the reader can do about it. ───────────── */
function ErrorState({ reason }: { reason: string }) {
  return (
    <div
      role="alert"
      className="p-6 sm:p-8"
      style={{ background: 'var(--s-surface-1)', border: '1px solid var(--s-rule-strong)' }}
    >
      <Label>Record unavailable</Label>
      <h3 className="text-h3 font-sans m-0 mt-3 max-w-[34ch] font-semibold">
        The test record did not load.
      </h3>
      <p className="text-body mt-4 m-0 max-w-[68ch]" style={{ color: 'var(--s-text-muted)' }}>
        This is a fault at our end, not a result. It says nothing about who was named. Detail:{' '}
        <span className="font-mono">{reason}</span>
      </p>
      <p className="text-body mt-4 m-0 max-w-[68ch]" style={{ color: 'var(--s-text-muted)' }}>
        Reloading usually clears it. If it does not, ask us and we will send you the record.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href="/contact" className="rf-btn rf-btn--secondary">
          Ask us for the record
        </a>
      </div>
    </div>
  );
}

/* ── observed, including overflowing. ─────────────────────────────────────── */
function ObservedState({
  view,
  idPrefix,
}: {
  view: Extract<ObservationView, { status: 'observed' }>;
  idPrefix: string;
}) {
  const { run } = view;
  const engines = enginesIn(run);
  const prompts = promptsIn(run);
  const captionId = `${idPrefix}-observation-caption`;

  return (
    <div style={{ background: 'var(--s-surface-1)', border: '1px solid var(--s-rule-hairline)' }}>
      {/* Summary rule. Counts are of the stored rows, nothing is derived or
          scored. `tabular-nums` so the figures align down the row. */}
      <dl
        className="grid grid-cols-2 sm:grid-cols-4 gap-px m-0"
        style={{ background: 'var(--s-rule-hairline)' }}
      >
        {[
          { k: 'Questions', v: String(prompts.length) },
          { k: 'AI tools', v: String(engines.length) },
          { k: 'Answers recorded', v: String(run.rows.length) },
          { k: 'Last tested', v: run.lastRunAt },
        ].map((s) => (
          /* `justify-between` in a stretch-height grid cell is what keeps the
             four figures on one baseline. Without it, "Rows recorded" wraps to
             two lines at 360 while "Prompts" stays on one, and the numbers sit
             at different heights inside equal-height cells — which reads as a
             rendering fault rather than as a layout choice. Found at 360px. */
          <div
            key={s.k}
            className="px-5 py-4 flex flex-col justify-between gap-1"
            style={{ background: 'var(--s-surface-1)' }}
          >
            <dt className="font-mono text-meta tracking-[0.14em] uppercase" style={{ color: 'var(--s-text-faint)' }}>
              {s.k}
            </dt>
            <dd
              className="m-0 font-sans tabular-nums text-h3 font-semibold"
              style={{ color: 'var(--s-text)' }}
            >
              {s.v}
            </dd>
          </div>
        ))}
      </dl>

      {/* Focusable, labelled scroll region. `tabindex=0` is what lets a keyboard
          user reach columns that are off-screen; without it the overflow is
          mouse-only, which is the defect this pattern exists to fix. */}
      <div
        role="region"
        aria-labelledby={captionId}
        tabIndex={0}
        className="overflow-x-auto"
        style={{ borderTop: '1px solid var(--s-rule-hairline)' }}
      >
        <table className="w-full border-collapse" style={{ minWidth: '54rem' }}>
          <caption id={captionId} className="text-meta text-left px-5 pt-4 pb-3" style={{ color: 'var(--s-text-muted)' }}>
            Each row is one question on one AI tool on one date, from {run.firstRunAt} to{' '}
            {run.lastRunAt}. Scroll sideways for the sources each answer linked to.
          </caption>
          <thead>
            <tr>
              {['Question', 'AI tool', 'Firms named', 'Sources linked', 'Tested'].map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="text-left font-mono text-meta tracking-[0.12em] uppercase font-normal px-5 py-3 align-bottom"
                  style={{
                    color: 'var(--s-text-faint)',
                    borderBottom: '1px solid var(--s-rule)',
                    borderTop: '1px solid var(--s-rule-hairline)',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {run.rows.map((row, i) => (
              <Row key={`${row.answerId}-${i}`} row={row} />
            ))}
          </tbody>
        </table>
      </div>

      {/* The limits line. Not a disclaimer bolted on: a reader told plainly what
          a thing cannot do believes what they are told it can. Do not move it
          and do not shrink it. */}
      <p
        className="text-meta px-5 py-4 m-0"
        style={{ borderTop: '1px solid var(--s-rule-hairline)', color: 'var(--s-text-faint)' }}
      >
        {run.limits}
      </p>
    </div>
  );
}

function Row({ row }: { row: ObservedRow }) {
  const cell = {
    borderBottom: '1px solid var(--s-rule-hairline)',
    color: 'var(--s-text-muted)',
    verticalAlign: 'top' as const,
  };

  return (
    <tr>
      {/* Row header, so a screen reader announces which prompt each cell belongs
          to. `overflowWrap: anywhere` is what survives a 200-character prompt. */}
      <th
        scope="row"
        className="text-left font-normal px-5 py-4 text-meta"
        style={{ ...cell, color: 'var(--s-text)', maxWidth: '26rem', overflowWrap: 'anywhere' }}
      >
        &ldquo;{row.prompt}&rdquo;
      </th>
      <td className="px-5 py-4 text-meta whitespace-nowrap" style={cell}>
        {row.engine}
        {row.modelVersion && (
          <span className="block font-mono" style={{ color: 'var(--s-text-faint)' }}>
            {row.modelVersion}
          </span>
        )}
      </td>
      <td className="px-5 py-4 text-meta" style={{ ...cell, maxWidth: '20rem', overflowWrap: 'anywhere' }}>
        {row.vendorsNamed.length === 0 ? (
          /* An empty answer is a result, and often the most useful one on the
             page. It is labelled, never left blank. */
          <span style={{ color: 'var(--s-text-faint)' }}>No firm named</span>
        ) : (
          <ol className="list-none p-0 m-0 grid gap-1">
            {row.vendorsNamed.map((v, i) => (
              <li key={`${v}-${i}`} className="flex gap-2">
                <span className="font-mono tabular-nums flex-shrink-0" style={{ color: 'var(--s-text-faint)' }}>
                  {i + 1}
                </span>
                <span style={{ color: 'var(--s-text)' }}>{v}</span>
              </li>
            ))}
          </ol>
        )}
      </td>
      <td className="px-5 py-4 text-meta" style={{ ...cell, maxWidth: '24rem', overflowWrap: 'anywhere' }}>
        {row.urlsCited.length === 0 ? (
          <span style={{ color: 'var(--s-text-faint)' }}>No source linked</span>
        ) : (
          <ul className="list-none p-0 m-0 grid gap-1">
            {row.urlsCited.map((u, i) => (
              <li key={`${u}-${i}`}>
                {/* Third-party citations. `nofollow` because these are evidence,
                    not endorsements, and several will be competitors. */}
                <a
                  href={u}
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                  className="font-mono"
                  style={{ color: 'var(--s-accent)' }}
                >
                  {u}
                </a>
              </li>
            ))}
          </ul>
        )}
      </td>
      <td className="px-5 py-4 text-meta font-mono tabular-nums whitespace-nowrap" style={cell}>
        {row.runAt}
      </td>
    </tr>
  );
}
