import type { Playbook } from '../../data/case-studies';
import { serviceLabel } from '../../data/case-studies';

/** Strategy + what was executed, one block per service line the engagement runs. */
export function PlaybookStrategy({ playbooks }: { playbooks: Playbook[] }) {
  return (
    <div className="space-y-10">
      {playbooks.map((pb) => (
        <div key={pb.service}>
          {playbooks.length > 1 && (
            <p className="mb-2 text-meta font-semibold uppercase tracking-wide text-[var(--accent)]">
              {serviceLabel(pb.service)} playbook
            </p>
          )}
          <p className="text-body text-[var(--text)] mb-5">{pb.strategy}</p>
          <ul className="space-y-3">
            {pb.whatWeDid.map((item) => (
              <li key={item} className="flex gap-3 text-body text-[var(--text-muted)]">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Phase-by-phase timeline, one rail per service line. */
export function PlaybookTimeline({ playbooks }: { playbooks: Playbook[] }) {
  return (
    <div className="space-y-10">
      {playbooks.map((pb) => (
        <div key={pb.service}>
          {playbooks.length > 1 && (
            <p className="mb-4 text-meta font-semibold uppercase tracking-wide text-[var(--text-muted)]">
              {serviceLabel(pb.service)} timeline
            </p>
          )}
          <ol className="space-y-5 border-l border-[var(--border)] pl-6">
            {pb.phases.map((phase) => (
              <li key={phase.window} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--accent)]"
                />
                <p className="font-mono text-meta font-semibold uppercase tracking-wide text-[var(--accent)]">
                  {phase.window}
                </p>
                <p className="mt-1 text-body text-[var(--text-muted)]">{phase.work}</p>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

/**
 * Restates the objection this engagement already answers, paired with the strategy that
 * answers it. Nothing is invented here — the "response" is the same strategy paragraph shown
 * under "The playbook", repurposed rather than restated with new claims.
 */
export function PlaybookObjections({ playbooks }: { playbooks: Playbook[] }) {
  const rows = playbooks.flatMap((pb) =>
    pb.objections.map((objection) => ({ objection, response: pb.strategy, service: pb.service }))
  );
  if (rows.length === 0) return null;

  return (
    <div className="space-y-4">
      {rows.map((row) => (
        <div
          key={`${row.service}-${row.objection}`}
          className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6"
        >
          <p className="text-body font-semibold text-[var(--ink)] mb-3">&ldquo;{row.objection}&rdquo;</p>
          <p className="text-body text-[var(--text-muted)]">{row.response}</p>
        </div>
      ))}
    </div>
  );
}

/** What the client receives, deduped across service lines. */
export function ProofAssets({ playbooks }: { playbooks: Playbook[] }) {
  const items = Array.from(new Set(playbooks.flatMap((pb) => pb.proofAssets)));
  if (items.length === 0) return null;

  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-body text-[var(--text-muted)]"
        >
          <span
            aria-hidden="true"
            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
