import Link from 'next/link';
import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';
import { Eyebrow, Shell } from './primitives';


const SOURCES = [
  {
    kicker: 'Before we start', title: 'We fix what to measure',
    body: 'The prompt set, platforms, markets and review dates go into your proposal. Changing any of them needs a recorded reason, so this month compares with last month.',
    caveat: 'Fixed before the baseline run.',
    source: 'How an engagement runs', date: 'Process', href: '/process',
  },
  {
    kicker: 'In every report', title: 'Separate columns, never blended',
    body: 'Technical fixes delivered, Google rankings, AI answers observed, referral visits and qualified enquiries. Each has its own column, because a citation is not a lead and a ranking is not a citation.',
    caveat: 'Targets are labelled as targets until results replace them.',
    source: 'How we handle evidence', date: 'Methodology', href: '/case-studies/methodology',
  },
];

export default function Evidence() {

  return (
    <section data-theme="dark" className="py-20 sm:py-28" style={{ borderTop: '1px solid var(--s-rule-hairline)' }}>
      <Shell>
        <ScrollReveal>
          <Eyebrow accent>How we report</Eyebrow>
          <h2 className="text-h2 font-sans m-0 mt-4 max-w-[24ch] font-semibold">
            <MaskReveal>Every answer we report has a date on it.</MaskReveal>
          </h2>
          <p className="text-body mt-5 m-0 max-w-[72ch]" style={{ color: 'var(--s-text-muted)' }}>
            AI answers change with the prompt, the platform and the day, so a single visibility score
            tells you little. We report each observation with the prompt we used, the platform, the
            date and the sources the answer cited. You can re-run any of it yourself.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px mt-12" style={{ background: 'var(--s-rule-hairline)' }}>
          {SOURCES.map((s, i) => (
            <ScrollReveal key={s.title} stagger={i + 1}>
              {/* Internal pages open in the same tab, so no "↗". */}
              <Link
                href={s.href}
                className="rf-hoverable rf-card flex h-full flex-col p-7 sm:p-9"
                style={{ background: 'var(--s-bg)' }}
              >
                <span className="flex items-center gap-3">
                  <span className="rf-dot w-2 h-2 rounded-full" aria-hidden="true" />
                  <span className="rf-card-label font-mono text-meta tracking-[0.14em] uppercase">
                    {s.kicker}
                  </span>
                </span>
                <h3 className="text-h3 font-sans mt-7 m-0 font-semibold">{s.title}</h3>
                <p className="text-body mt-4 m-0 flex-1" style={{ color: 'var(--s-text-muted)' }}>
                  {s.body}
                </p>
                <p className="text-meta mt-5 m-0" style={{ color: 'var(--s-text-faint)' }}>
                  {s.caveat}
                </p>
                <span
                  className="mt-6 pt-5 font-mono text-meta tracking-[0.1em] flex items-start justify-between gap-4"
                  style={{ borderTop: '1px solid var(--s-rule-hairline)', color: 'var(--s-accent)' }}
                >
                  <span>
                    {s.source}
                    <span className="block mt-1" style={{ color: 'var(--s-text-faint)' }}>
                      {s.date}
                    </span>
                  </span>
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* A record you can compare. */}
        <ScrollReveal stagger={3} className="mt-12 pt-8" style={{ borderTop: '1px solid var(--s-rule)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <h3 className="text-h3 font-sans m-0 lg:col-span-5 font-semibold">
              A record you can compare
            </h3>
            <div className="lg:col-span-7">
              <p className="text-body m-0 max-w-[72ch]" style={{ color: 'var(--s-text-muted)' }}>
                Ask the same question twice and you can get two answers. So we fix the sampling method first, and we record the answers and sources behind every report.
              </p>
              <p className="text-body mt-4 m-0 max-w-[72ch]" style={{ color: 'var(--s-text-muted)' }}>
                A mention in an answer does not prove a buyer became a customer. We review AI answers next to your enquiries and sales feedback, and say which is which.
              </p>
              <Link href="/case-studies/methodology" className="rf-btn rf-btn--secondary mt-6">
                How we handle evidence
              </Link>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal stagger={4} className="mt-12">
          <Link href="/case-studies" className="rf-hoverable rf-card block p-7 sm:p-9" style={{ border: '1px solid var(--s-rule)' }}>
            <span className="rf-card-label font-mono text-meta tracking-[0.14em] uppercase">Client programmes</span>
            <h3 className="text-h3 font-sans mt-6 m-0 font-semibold">See how we plan and measure a client programme.</h3>
            <p className="text-body mt-3 m-0 max-w-[72ch]" style={{ color: 'var(--s-text-muted)' }}>
              Each client programme sets out the business problem, our approach and a measured baseline. Every KPI is labelled as a target until client reporting fills in the result. These programmes are for HVAC, dental and commercial insurance businesses, so read them for the method, not as proof of work in your sector.
            </p>
            <span className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-7 pt-6" style={{ borderTop: '1px solid var(--s-rule-hairline)' }}>
              {['Business problem', 'Our approach', 'Evidence status'].map(label => <span key={label} className="block text-h4 font-sans font-medium" style={{ color: 'var(--s-accent)' }}>{label}</span>)}
            </span>
          </Link>
        </ScrollReveal>
      </Shell>
    </section>
  );
}
