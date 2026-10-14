import Link from 'next/link';
import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';
import { GradientMesh, Shell } from './primitives';

export default function FinalCta() {
  return (
    <section data-theme="dark" className="relative overflow-hidden py-24 sm:py-32" style={{ borderTop: '1px solid var(--s-rule-hairline)' }}>
      <GradientMesh />
      <Shell>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <ScrollReveal className="lg:col-span-7">
            <h2 className="text-display font-sans m-0 max-w-[16ch]">
              <MaskReveal>Find out who AI names when your buyers ask.</MaskReveal>{' '}
              <MaskReveal delay={0.08}>
                <span style={{ color: 'var(--s-accent-display)' }}>Then give it reasons to name you.</span>
              </MaskReveal>
            </h2>
          </ScrollReveal>

          <ScrollReveal stagger={2} className="lg:col-span-5">
            <p className="text-body m-0 max-w-[56ch]" style={{ color: 'var(--s-text-muted)' }}>
              Book a 30-minute call. We show you what we would test first and what we would fix first.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
              <Link href="#book" className="rf-btn rf-btn--primary">
                Book a call
              </Link>
              <Link href="/contact#enquiry" className="rf-btn rf-btn--secondary">
                Send an enquiry
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </Shell>
    </section>
  );
}
