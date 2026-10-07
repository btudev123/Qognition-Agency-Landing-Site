import Link from 'next/link';
import PhotoCredit from '../case-studies/PhotoCredit';
import { serviceLabel, type ResolvedCaseStudy } from '../../data/case-studies';
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

export default function ProgrammeCard({ study }: { study: ResolvedCaseStudy }) {
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
        {/* z-10 lifts the credit above the stretched link so its own links take the click. */}
        <div className={`${v.credit} relative z-10 mt-auto pt-3`}>
          <PhotoCredit image={study.image} className="m-0" />
        </div>
      </div>
    </li>
  );
}
