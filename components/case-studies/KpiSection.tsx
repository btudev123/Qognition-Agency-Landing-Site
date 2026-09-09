import Link from 'next/link';
import Text from '../ui/Text';
import BenchmarkTable from './BenchmarkTable';
import type { ResolvedCaseStudy } from '../../data/case-studies';

/**
 * The evidence rule, in one component.
 *
 * Branches on `study.evidence`, which is derived upstream from whether every KPI row has
 * `actual` populated (`caseStudyEvidence()` in data/case-studies/types.ts). Nothing here reads
 * a flag set per page — flip a record's `actual` fields and this flips with it.
 *
 * `projected`: baseline -> target, labelled as a target, benchmark table immediately beneath.
 * `verified`:  baseline -> actual as the headline, target shown secondary.
 * Never render "achieved" / "delivered" / "results" language on a projected row.
 */
export default function KpiSection({ study }: { study: ResolvedCaseStudy }) {
  const { kpis, evidence, benchmarks, client } = study;

  if (kpis.length === 0) {
    return (
      <Text>No KPIs are attached to this record yet.</Text>
    );
  }

  if (evidence === 'projected') {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-meta font-semibold uppercase tracking-wide text-[var(--accent)]">
            Targets this programme was set and measured against
          </p>
          <Text className="mt-2 max-w-2xl">
            These are not reported results. {client}&apos;s own reporting has not yet been reconciled
            against these rows — see{' '}
            <Link
              href="/case-studies/methodology"
              className="text-[var(--accent)] underline underline-offset-2"
            >
              how we define a target versus a result
            </Link>
            .
          </Text>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--bg-warm)]">
                <th scope="col" className="px-4 py-3 text-meta font-semibold uppercase tracking-wide text-[var(--ink)]">
                  Metric
                </th>
                <th scope="col" className="px-4 py-3 text-meta font-semibold uppercase tracking-wide text-[var(--ink)]">
                  Baseline
                </th>
                <th scope="col" className="px-4 py-3 text-meta font-semibold uppercase tracking-wide text-[var(--ink)]">
                  Target
                </th>
                <th scope="col" className="px-4 py-3 text-meta font-semibold uppercase tracking-wide text-[var(--ink)]">
                  Change
                </th>
                <th scope="col" className="px-4 py-3 text-meta font-semibold uppercase tracking-wide text-[var(--ink)]">
                  Scope
                </th>
              </tr>
            </thead>
            <tbody>
              {kpis.map((kpi) => (
                <tr key={kpi.label} className="border-b border-[var(--border)] align-top last:border-0">
                  <td className="px-4 py-3 text-body font-medium text-[var(--ink)]">{kpi.label}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-body text-[var(--text-muted)]">
                    {kpi.baseline}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-body font-medium text-[var(--accent)]">
                    {kpi.target}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-body text-[var(--text-muted)]">
                    {kpi.change}
                  </td>
                  <td className="px-4 py-3 text-body text-[var(--text-muted)]">{kpi.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <BenchmarkTable benchmarks={benchmarks} heading="Where these targets come from" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-meta font-semibold uppercase tracking-wide text-[var(--accent)]">
        Results, reconciled against {client}&apos;s own reporting
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <p className="text-meta uppercase tracking-wide text-[var(--text-muted)]">{kpi.label}</p>
            <div className="mt-2 flex flex-wrap items-baseline gap-2">
              <span className="text-3xl font-semibold text-[var(--text-muted)]">{kpi.baseline}</span>
              <span aria-hidden="true" className="text-[var(--text-faint)]">
                &rarr;
              </span>
              <span className="text-3xl font-semibold text-[var(--accent)]">{kpi.actual}</span>
            </div>
            <p className="mt-2 text-meta text-[var(--text-faint)]">
              Target was {kpi.target} ({kpi.change}) · {kpi.unit}
            </p>
          </div>
        ))}
      </div>

      <BenchmarkTable benchmarks={benchmarks} heading="Benchmarks this result is measured against" />
    </div>
  );
}
