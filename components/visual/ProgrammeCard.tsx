import Link from 'next/link';
import {
  B2B_CARD_STAGES,
  B2B_SERVICE_LABEL,
  FUNNEL_STAGE_LABEL,
  b2bMarket,
  formatCount,
  formatWindow,
  isB2BCaseStudy,
  serviceLabel,
  type AnyCaseStudy,
  type ResolvedB2BCaseStudy,
} from '../../data/case-studies';
import TintedImage from './TintedImage';
import v from './visual.module.css';

/* A client-programme card for a dark band (brief §2.7). Not CaseStudyCard: its
 * --border, --surface and --ink tokens do not remap under data-theme="dark".
 *
 * No KPI figures on `/` (Ruth, 2026-10-07): the baselines are targets set at
 * the start, not measurements, so this card renders no baseline, target or
 * `change`. The full table stays on each case-study page, where
 * caseStudyEvidence() labels it.
 *
 * The photo is decorative (alt=""): the tint makes the Pexels colour words in
 * its description false, and the client name carries the meaning. */

const joinServices = (labels: readonly string[]) =>
  labels.length <= 1 ? labels.join('') : `${labels.slice(0, -1).join(', ')} and ${labels[labels.length - 1]}`;

export default function ProgrammeCard({ study }: { study: AnyCaseStudy }) {
  if (isB2BCaseStudy(study)) return <B2BProgrammeCard study={study} />;

  return (
    <li className={`${v.latticeCell} ${v.stretch} rf-card relative flex flex-col`}>
      <TintedImage src={study.image.src} alt="" sizes="(min-width: 1024px) 33vw, 100vw" className="aspect-[16/10]" />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="rf-card-label text-meta m-0 font-mono uppercase tracking-[0.14em]">Client programme</p>
        <h3 className="text-h4 font-sans m-0 mt-3 font-semibold">
          <Link href={`/case-studies/${study.id}`} className="after:absolute after:inset-0">
            {study.client}
          </Link>
        </h3>
        <p className="text-meta m-0 mt-1" style={{ color: 'var(--s-text-muted)' }}>
          {study.market}
        </p>
        <p className="text-meta m-0 mt-1" style={{ color: 'var(--s-text)' }}>
          {joinServices(study.services.map(serviceLabel))}
        </p>
        <p className="text-meta m-0 mt-4 pt-4" style={{ color: 'var(--s-text-muted)', borderTop: '1px solid var(--s-rule-hairline)' }}>
          KPI targets set at the start. Results pending client reporting.
        </p>
      </div>
    </li>
  );
}

/* The B2B branch (operator, 2026-10-07: four named B2B programmes with reported
 * results). Unlike the insurance card above, these figures are results, so the
 * card shows two of them: qualified leads and sales opportunities. Never more
 * (MARS brief: no wall of numbers on `/`). The dates and the source sit directly
 * under the figures so neither can be read without the other.
 *
 * No photograph: none is approved for these four, and a stock image would be
 * decoration. Every colour is an --s-* role, so the card is correct on the dark
 * band it is built for and on a light one. */
function B2BProgrammeCard({ study }: { study: ResolvedB2BCaseStudy }) {
  return (
    <li className={`${v.latticeCell} ${v.stretch} rf-card relative flex flex-col`}>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="rf-card-label text-meta m-0 font-mono uppercase tracking-[0.14em]">B2B client programme</p>
        <h3 className="text-h4 font-sans m-0 mt-3 font-semibold break-words">
          <Link href={`/case-studies/${study.id}`} className="after:absolute after:inset-0">
            {study.client}
          </Link>
        </h3>
        <p className="text-meta m-0 mt-1" style={{ color: 'var(--s-text-muted)' }}>
          {study.sector}, {b2bMarket(study)}
        </p>
        <p className="text-meta m-0 mt-1" style={{ color: 'var(--s-text)' }}>
          {/* A dot list, not joinServices: two labels already contain "and". The full mix,
              in record order: the figures below came from all of it, so showing the first
              three credited search work alone (Ruth, D1 attribution rule). It wraps. */}
          {study.services.map((s) => B2B_SERVICE_LABEL[s].label).join(' · ')}
        </p>
        <div className="mt-auto pt-4">
          <div className="pt-4" style={{ borderTop: '1px solid var(--s-rule-hairline)' }}>
            <dl className="m-0 grid grid-cols-2 gap-4">
              {B2B_CARD_STAGES.map((stage) => (
                <div key={stage} className="min-w-0">
                  <dt className="text-meta" style={{ color: 'var(--s-text-muted)' }}>
                    {FUNNEL_STAGE_LABEL[stage].label}
                  </dt>
                  <dd className="text-h3 m-0 font-semibold tabular-nums" style={{ color: 'var(--s-accent)' }}>
                    {formatCount(study.results[stage])}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="text-meta m-0 mt-3" style={{ color: 'var(--s-text-muted)' }}>
              {formatWindow(study)}. {study.source}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}
