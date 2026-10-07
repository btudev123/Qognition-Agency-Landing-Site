import Link from 'next/link';
import { CalendarDays, Layers, Link2, Quote } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';
import { byNiche } from '../../data/case-studies';
import IconTile from '../visual/IconTile';
import ProgrammeCard from '../visual/ProgrammeCard';
import { Eyebrow, Shell } from './primitives';
import v from '../visual/visual.module.css';

/* The four things every reported observation carries, taken from the lead
   sentence below (brief §2.7). */
const METHOD = [
  { icon: Quote, label: 'The prompt' },
  { icon: Layers, label: 'The platform' },
  { icon: CalendarDays, label: 'The date' },
  { icon: Link2, label: 'The cited sources' },
];

/* Insurance only on a B2B surface (operator, 2026-10-07): HVAC and dental are
   consumer sectors and never render as B2B proof. Deterministic: the first
   three insurance records in library order. No KPI figures (Ruth, 2026-10-07):
   see components/visual/ProgrammeCard.tsx. */
export default function Evidence() {
  const programmes = byNiche('insurance').slice(0, 3);

  return (
    <section data-theme="dark" className="py-20 sm:py-28" style={{ borderTop: '1px solid var(--s-rule-hairline)' }}>
      <Shell>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 lg:items-end">
          <ScrollReveal className="lg:col-span-6">
            <Eyebrow accent>How we report</Eyebrow>
            <h2 className="text-h2 font-sans m-0 mt-4 max-w-[24ch] font-semibold">
              <MaskReveal>Every answer we report has a date on it.</MaskReveal>
            </h2>
          </ScrollReveal>
          <ScrollReveal stagger={2} className="lg:col-span-6">
            <p className="text-body m-0 max-w-[62ch]" style={{ color: 'var(--s-text-muted)' }}>
              We report each observation with the prompt we used, the platform, the date and the sources the answer cited. You can re-run any of it yourself.
            </p>
            {/* Below lg the caveat follows the method strip (brief §2.7); from lg it sits here. */}
            <p className="hidden lg:block text-body mt-4 m-0 max-w-[62ch]" style={{ color: 'var(--s-text)' }}>
              A mention in an answer does not prove a buyer became a customer.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal stagger={2} className="mt-10">
          <ul className={`${v.lattice} list-none p-0 m-0 grid grid-cols-2 lg:grid-cols-4`}>
            {METHOD.map((m) => (
              <li key={m.label} className={`${v.latticeCell} flex flex-col items-start gap-3 p-5 sm:flex-row sm:items-center sm:gap-4 sm:p-6`}>
                <IconTile icon={m.icon} size={24} />
                <span className="text-h4 font-sans font-medium">{m.label}</span>
              </li>
            ))}
          </ul>
          <p className="lg:hidden text-body mt-6 m-0 max-w-[62ch]" style={{ color: 'var(--s-text)' }}>
            A mention in an answer does not prove a buyer became a customer.
          </p>
        </ScrollReveal>

        {programmes.length > 0 && (
          <ScrollReveal stagger={3} className="mt-10">
            <ul className={`${v.lattice} list-none p-0 m-0 grid grid-cols-1 md:grid-cols-3`}>
              {programmes.map((study) => (
                <ProgrammeCard key={study.id} study={study} />
              ))}
            </ul>
          </ScrollReveal>
        )}

        <ScrollReveal stagger={4} className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 lg:items-start">
          <div className="lg:col-span-7">
            <p className="text-meta m-0 max-w-[72ch]" style={{ color: 'var(--s-text-muted)' }}>
              Every KPI is labelled as a target until client reporting fills in the result.
            </p>
            <p className="text-meta m-0 mt-2 max-w-[72ch]" style={{ color: 'var(--s-text-muted)' }}>
              These programmes are for insurance businesses. Outside insurance, read them for the method, not as proof of work in your sector.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col sm:flex-row flex-wrap gap-3 lg:justify-end">
            <Link href="/case-studies/methodology" className="rf-btn rf-btn--secondary">
              How we handle evidence
            </Link>
            <Link href="/case-studies" className="rf-btn rf-btn--secondary">
              Client programmes
            </Link>
          </div>
        </ScrollReveal>
      </Shell>
    </section>
  );
}
