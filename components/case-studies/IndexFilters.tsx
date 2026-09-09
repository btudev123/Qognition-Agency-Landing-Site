'use client';

import { useMemo, useState } from 'react';
import {
  LIBRARY_STATS,
  NICHES,
  SERVICES,
  STATES,
  nicheLabel,
  serviceLabel,
  type Niche,
  type ResolvedCaseStudy,
  type ServiceKey,
} from '../../data/case-studies';
import StudyGrid from './StudyGrid';

type NicheFilter = Niche | 'all';
type ServiceFilter = ServiceKey | 'all';
type StateFilter = string | 'all';

/**
 * Client-side filter over the full 45-record library, already resolved server-side and passed
 * in as a prop — no fetch, so there is no network loading or error state to fake. The two real
 * states are populated (a grid of cards) and empty (a combination that matches nothing).
 */
export default function IndexFilters({ studies }: { studies: ResolvedCaseStudy[] }) {
  const [niche, setNiche] = useState<NicheFilter>('all');
  const [service, setService] = useState<ServiceFilter>('all');
  const [state, setState] = useState<StateFilter>('all');

  const filtered = useMemo(
    () =>
      studies.filter(
        (s) =>
          (niche === 'all' || s.niche === niche) &&
          (service === 'all' || s.services.includes(service)) &&
          (state === 'all' || s.state === state)
      ),
    [studies, niche, service, state]
  );

  const hasFilters = niche !== 'all' || service !== 'all' || state !== 'all';

  const clear = () => {
    setNiche('all');
    setService('all');
    setState('all');
  };

  return (
    <div>
      <fieldset className="mb-10 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <legend className="px-1 text-meta font-semibold uppercase tracking-wide text-[var(--text-muted)]">
          Filter case studies
        </legend>

        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="filter-industry" className="mb-1 block text-meta text-[var(--text-muted)]">
              Industry
            </label>
            <select
              id="filter-industry"
              value={niche}
              onChange={(e) => setNiche(e.target.value as NicheFilter)}
              className="w-full rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-2 text-body text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
            >
              <option value="all">All industries ({LIBRARY_STATS.total})</option>
              {NICHES.map((n) => (
                <option key={n} value={n}>
                  {nicheLabel(n)} ({LIBRARY_STATS.byNiche.find((x) => x.niche === n)?.count ?? 0})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-service" className="mb-1 block text-meta text-[var(--text-muted)]">
              Service
            </label>
            <select
              id="filter-service"
              value={service}
              onChange={(e) => setService(e.target.value as ServiceFilter)}
              className="w-full rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-2 text-body text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
            >
              <option value="all">All services ({LIBRARY_STATS.total})</option>
              {SERVICES.map((s) => (
                <option key={s} value={s}>
                  {serviceLabel(s)} ({LIBRARY_STATS.byService.find((x) => x.service === s)?.count ?? 0})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-state" className="mb-1 block text-meta text-[var(--text-muted)]">
              State
            </label>
            <select
              id="filter-state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-2 text-body text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
            >
              <option value="all">All states ({STATES.length})</option>
              {STATES.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name} ({s.count})
                </option>
              ))}
            </select>
          </div>
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={clear}
            className="mt-4 text-meta font-medium text-[var(--accent)] underline underline-offset-2 hover:brightness-110"
          >
            Clear filters
          </button>
        )}
      </fieldset>

      <p className="mb-6 text-meta text-[var(--text-muted)]" role="status" aria-live="polite">
        Showing {filtered.length} of {studies.length} case studies
      </p>

      <StudyGrid
        studies={filtered}
        emptyTitle="No case studies match those filters"
        emptyMessage="Try a different industry, service or state — or clear the filters to see the full library."
        emptyAction={{ label: 'Clear filters', onClick: clear }}
      />
    </div>
  );
}
