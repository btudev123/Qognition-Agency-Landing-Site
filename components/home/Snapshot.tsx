import Link from 'next/link';
import { auditRequestHref } from '../../lib/funnelContext';
import { CalendarDays, FileText, Send, UserCheck } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';
import ProductScreen from '../product-screens/ProductScreen';
import { PRODUCT_SCREENS } from '../../data/product-screens';
import { Eyebrow, Shell } from './primitives';
import v from '../visual/visual.module.css';

const STEPS = [
  { icon: Send, text: 'You send your website and the buyers you want to reach.' },
  { icon: UserCheck, text: 'A person on our team reviews it and chooses the buyer questions to test.' },
  { icon: CalendarDays, text: 'We test those questions on the agreed platforms and record each answer with its date and cited sources.' },
  { icon: FileText, text: 'You get the findings and the first fixes we would make. We confirm timing when we reply.' },
];

/* Brief §2.9. Dark, so the run BookCall, Snapshot, Fit, Faqs is no longer four
   light bands in a row. --s-surface-1 resolves to #131312 here, so the band
   reads as raised against the #0A0A09 bands around the page.

   The prompt panel renders from 1024px only (brief §3.2). It is the brief's
   alternative to a generated background image, never both; no image tool was
   available for this build, so the panel is the one in use. */
export default function Snapshot() {
  return (
    <section
      data-theme="dark"
      className="py-20 sm:py-28"
      style={{ background: 'var(--s-surface-1)', borderBlock: '1px solid var(--s-rule)' }}
    >
      <Shell>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <ScrollReveal>
              <Eyebrow accent>Free AI visibility audit</Eyebrow>
              <h2 className="text-h2 font-sans m-0 mt-4 max-w-[16ch] font-semibold">
                <MaskReveal>See who AI names in your category before you commit.</MaskReveal>
              </h2>
              <p className="text-body mt-5 m-0 max-w-[56ch]" style={{ color: 'var(--s-text-muted)' }}>
                Free, with no obligation to book. Someone on our team reviews your firm, then sends you what AI platforms said when asked your buyers&apos; questions, with dates and sources.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
                <Link href={auditRequestHref({ page_id: '/' })} className="rf-btn rf-btn--primary">
                  Request your free AI visibility audit
                </Link>
                <Link href="/free-ai-audit#scope" className="rf-btn rf-btn--secondary">
                  What the audit covers
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal stagger={3} className="mt-12 hidden lg:block">
              <div className={`${v.screenField}`}>
                <ProductScreen screen={PRODUCT_SCREENS['scriblr-prompt-panel']} frame="none" />
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal stagger={2} className="lg:col-span-7">
            <h3 className="text-h4 font-sans m-0 pb-4 font-semibold" style={{ borderBottom: '1px solid var(--s-rule)' }}>
              How it works
            </h3>
            <div className="relative mt-8">
              <div className="absolute left-6 top-6 bottom-6 w-px lg:hidden" style={{ background: 'var(--s-rule)' }} aria-hidden="true" />
              <ol className="relative list-none p-0 m-0 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10">
                {STEPS.map(({ icon: Icon, text }, i) => (
                  <li key={text} className="relative pl-16 lg:pl-0">
                    {/* The rail along each row at lg, from step 1 to 2 and 3 to 4. */}
                    {i % 2 === 0 && (
                      <span className="absolute left-12 -right-8 top-6 hidden lg:block h-px overflow-hidden" aria-hidden="true">
                        <span className="rf-rail block h-full" />
                      </span>
                    )}
                    <span
                      className={`${v.iconTile} absolute left-0 top-0 h-12 w-12 lg:static`}
                      style={{ borderColor: i === 0 ? 'var(--s-accent-graphic)' : 'var(--s-rule-strong)' }}
                      aria-hidden="true"
                    >
                      <Icon size={32} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
                    </span>
                    <p className="text-body m-0 pt-2 lg:pt-4" style={{ color: 'var(--s-text-muted)' }}>
                      <span className="font-mono text-meta tracking-[0.1em] mr-2" style={{ color: 'var(--s-accent)' }} aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
            <p className="text-meta mt-10 m-0 pt-6" style={{ color: 'var(--s-text)', borderTop: '1px solid var(--s-rule-hairline)' }}>
              Each finding carries its date, method and scope.
            </p>
          </ScrollReveal>
        </div>
      </Shell>
    </section>
  );
}
