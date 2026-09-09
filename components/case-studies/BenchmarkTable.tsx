import Heading from '../ui/Heading';
import Text from '../ui/Text';
import type { Benchmark } from '../../data/case-studies';

/**
 * Every row here is a third-party, dated, sourced figure — never a Qognition claim.
 * `overflow-x-auto` on the wrapper, not the page: a study citing all six benchmark keys
 * scrolls inside its own box on mobile instead of pushing the page wide.
 */
export default function BenchmarkTable({
  benchmarks,
  heading,
}: {
  benchmarks: Benchmark[];
  heading?: string;
}) {
  if (benchmarks.length === 0) {
    return <Text>No third-party benchmark is cited for this figure yet.</Text>;
  }

  return (
    <div>
      {heading && (
        <Heading level="h4" className="mb-3">
          {heading}
        </Heading>
      )}
      <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--bg-warm)]">
              <th scope="col" className="px-4 py-3 text-meta font-semibold uppercase tracking-wide text-[var(--ink)]">
                Published figure
              </th>
              <th scope="col" className="px-4 py-3 text-meta font-semibold uppercase tracking-wide text-[var(--ink)]">
                What it measures
              </th>
              <th scope="col" className="px-4 py-3 text-meta font-semibold uppercase tracking-wide text-[var(--ink)]">
                Source
              </th>
            </tr>
          </thead>
          <tbody>
            {benchmarks.map((b) => (
              <tr key={b.key} className="border-b border-[var(--border)] align-top last:border-0">
                <td className="whitespace-nowrap px-4 py-3 font-mono text-body font-medium text-[var(--accent)]">
                  {b.stat}
                </td>
                <td className="px-4 py-3 text-body text-[var(--text-muted)]">{b.measures}</td>
                <td className="whitespace-nowrap px-4 py-3 text-body">
                  <a
                    href={b.url}
                    target="_blank"
                    rel="nofollow noopener"
                    className="text-[var(--accent)] underline underline-offset-2 hover:brightness-110"
                  >
                    {b.source} ({b.year})
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
