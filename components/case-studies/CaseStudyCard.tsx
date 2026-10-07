import Image from 'next/image';
import Link from 'next/link';
import Badge from '../ui/Badge';
import Heading from '../ui/Heading';
import type { AnyCaseStudy, ResolvedB2BCaseStudy } from '../../data/case-studies';
import {
  B2B_CARD_STAGES,
  B2B_SERVICE_LABEL,
  FUNNEL_STAGE_LABEL,
  b2bMarket,
  formatCount,
  formatWindow,
  isB2BCaseStudy,
  nicheLabel,
  serviceLabel,
} from '../../data/case-studies';
import { pickHeadlineKpi } from './format';

/**
 * The one card used everywhere a study is listed: the index grid, the three hub types,
 * and "related engagements" on the detail page. One place to keep it correct.
 *
 * Stretched link: the headline is the only link to the study, and its ::after covers the card so
 * the whole card stays clickable. That keeps the photo credit a real link (an <a> inside an <a> is
 * invalid HTML) and gives screen readers the headline as the link name instead of every badge,
 * KPI and credit on the card.
 */
export default function CaseStudyCard({ study }: { study: AnyCaseStudy }) {
  if (isB2BCaseStudy(study)) return <B2BCaseStudyCard study={study} />;

  const headlineKpi = pickHeadlineKpi(study.kpis);
  const width = study.image.width ?? 1600;
  const height = study.image.height ?? 1000;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] transition-colors duration-200 hover:border-[var(--accent)]/40 focus-within:border-[var(--accent-deep)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-warm)]">
        <Image
          src={study.image.src}
          alt={study.image.alt}
          width={width}
          height={height}
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-meta uppercase tracking-wide text-[var(--text-muted)]">Client programme</p>
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
            <Link href={`/case-studies/${study.id}`} className="after:absolute after:inset-0">
              {study.headline}
            </Link>
          </Heading>
        </div>

        {headlineKpi && (
          <div className="mt-auto pt-3 border-t border-[var(--border)]">
            <p className="text-meta text-[var(--text-faint)] truncate">{headlineKpi.label}</p>
            <p className="text-body font-semibold text-[var(--ink)]">
              {headlineKpi.baseline} <span aria-hidden="true">&rarr;</span>
              <span className="sr-only">to</span> {headlineKpi.target}{' '}
              <span className="text-meta font-normal text-[var(--text-muted)]">target</span>
            </p>
          </div>
        )}
      </div>
    </article>
  );
}

/**
 * The B2B branch. Same frame, link pattern and tokens as the card above, so the two kinds sit in
 * one library without looking like two products.
 *
 * No photograph: there is no approved image for these four, and the reported figures carry the
 * card instead. Two figures at most (qualified leads, sales opportunities); the full funnel is on
 * the case-study page. The reporting window and its source sit under the figures, because a
 * number without its dates is the claim CLAUDE.md §4 forbids.
 */
function B2BCaseStudyCard({ study }: { study: ResolvedB2BCaseStudy }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] transition-colors duration-200 hover:border-[var(--accent)]/40 focus-within:border-[var(--accent-deep)]">
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-meta uppercase tracking-wide text-[var(--text-muted)]">B2B client programme</p>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent">{study.sector}</Badge>
          {study.services.slice(0, 2).map((s) => (
            <Badge key={s} variant="muted">
              {B2B_SERVICE_LABEL[s].label}
            </Badge>
          ))}
        </div>

        <div className="min-w-0">
          {/* Wraps rather than truncates or clamps: four authored headlines, each one sentence,
              and a clipped result reads as a different claim. */}
          <p className="text-meta uppercase tracking-wide text-[var(--text-muted)] break-words">
            {study.client} · {b2bMarket(study)}
          </p>
          <Heading level="h3" className="mt-1 break-words group-hover:text-[var(--accent-deep)] transition-colors">
            <Link href={`/case-studies/${study.id}`} className="after:absolute after:inset-0">
              {study.headline}
            </Link>
          </Heading>
        </div>

        <div className="mt-auto border-t border-[var(--border)] pt-3">
          <dl className="grid grid-cols-2 gap-4">
            {B2B_CARD_STAGES.map((stage) => (
              <div key={stage} className="min-w-0">
                <dt className="text-meta text-[var(--text-muted)]">{FUNNEL_STAGE_LABEL[stage].label}</dt>
                <dd className="m-0 text-h3 font-semibold tabular-nums text-[var(--ink)]">
                  {formatCount(study.results[stage])}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-meta text-[var(--text-muted)]">
            {formatWindow(study)}. {study.source}
          </p>
        </div>
      </div>
    </article>
  );
}
