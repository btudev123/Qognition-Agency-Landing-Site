import Image from 'next/image';
import Link from 'next/link';
import Badge from '../ui/Badge';
import Heading from '../ui/Heading';
import type { ResolvedCaseStudy } from '../../data/case-studies';
import { nicheLabel, serviceLabel } from '../../data/case-studies';
import { pickHeadlineKpi } from './format';

/**
 * The one card used everywhere a study is listed: the index grid, the three hub types,
 * and "related engagements" on the detail page. One place to keep it correct.
 */
export default function CaseStudyCard({ study }: { study: ResolvedCaseStudy }) {
  const headlineKpi = pickHeadlineKpi(study.kpis);

  return (
    <Link
      href={`/case-studies/${study.id}`}
      className="group flex flex-col rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden transition-colors duration-200 hover:border-[var(--accent)]/40 focus-visible:border-[var(--accent)]"
    >
      <div className="relative aspect-[16/10] bg-[var(--bg-warm)] overflow-hidden">
        <Image
          src={study.image.src}
          alt={study.image.alt}
          width={640}
          height={400}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent">{nicheLabel(study.niche)}</Badge>
          {study.services.map((s) => (
            <Badge key={s} variant="muted">
              {serviceLabel(s)}
            </Badge>
          ))}
        </div>

        <div>
          <p className="text-meta uppercase tracking-wide text-[var(--text-muted)] truncate">
            {study.client} · {study.market}
          </p>
          <Heading level="h3" className="mt-1 line-clamp-2 group-hover:text-[var(--accent)] transition-colors">
            {study.headline}
          </Heading>
        </div>

        {headlineKpi && (
          <div className="mt-auto pt-3 border-t border-[var(--border)]">
            <p className="text-meta text-[var(--text-faint)] truncate">{headlineKpi.label}</p>
            <p className="text-body font-semibold text-[var(--ink)]">
              {headlineKpi.baseline} <span aria-hidden="true">&rarr;</span> {headlineKpi.target}{' '}
              <span className="text-meta font-normal text-[var(--text-muted)]">target</span>
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}
