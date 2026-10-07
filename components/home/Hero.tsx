import Link from 'next/link';
import HeroSnapshotPanel from './HeroSnapshotPanel';
import { Shell } from './primitives';
import { AI_PLATFORMS } from '../../data/aiPlatforms';


const ENGINES = AI_PLATFORMS;

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: 'clamp(104px, 11vh, 140px)',
        paddingBottom: 'clamp(48px, 7vh, 80px)',
      }}
    >
      <Shell>
        {/* THE PANEL IS RENDERED ONCE.
            It used to be rendered twice — once inside the left column for
            mobile DOM order and once in the right column for desktop — which was
            affordable only while it was a server component with no images. It is
            now interactive, so a second copy would duplicate the DOM, the state
            and the hydration for a layout concern. Explicit grid placement gets
            the same two orders out of one instance:

              mobile   1 col, natural DOM order: A badge/H1/CTAs, B panel, C chips
              lg+      2 cols, A over C in column 1, B spanning both rows in column 2

            Do not reintroduce a `lg:hidden` duplicate. */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-y-10 gap-x-10 xl:gap-x-16 lg:items-center">
          {/* `contents` below lg dissolves this wrapper so A and C become grid
              items of the single mobile column and `order` can interleave the
              panel between them. From lg it becomes a real flex column and is
              itself the left grid item, so the panel auto-places beside it.

              This replaces an explicit col-start/row-start placement with
              `lg:row-span-2` on the panel. That version was correct but stretched
              row 1 to fit half the panel, which opened a visible void between the
              CTAs and the platform row. */}
          <div className="contents lg:flex lg:flex-col lg:min-w-0">
          {/* A — badge, H1, CTAs */}
          <div className="order-1 min-w-0 flex flex-col items-start text-left">
            <span className="rf-eyebrow rf-eyebrow--accent mb-6">AI-native growth agency for B2B: AI SEO and GEO</span>

            {/* text-display is the canonical token. No inline font-size: the
                orphaned file set clamp(40px, 5.8vw, 84px) by hand, which is
                outside the scale and invisible to the typography gate, because
                the gate reads className and not style. tokens-dark.md §9. */}
            <h1 className="text-display font-sans m-0 max-w-[15ch]">
              Get found. Get shortlisted.{' '}
              <span style={{ color: 'var(--s-accent-display)' }}>Build pipeline.</span>
            </h1>
            <p className="text-body mt-5 m-0 max-w-[56ch]" style={{ color: 'var(--s-text-muted)' }}>
              We run AI SEO and GEO for B2B companies, including SaaS, with SEO and local SEO as the supporting layers and B2B PPC alongside. Every AI answer we report comes with the prompt, the platform and the date, so you can check it yourself.
            </p>

            <div className="mt-8 w-full flex flex-col sm:flex-row sm:flex-wrap gap-3">
              <Link href="#book" className="rf-btn rf-btn--primary w-full sm:w-auto">
                Book a call
              </Link>
              {/* Anchors to the calendar on this page rather than navigating to
                  /contact. Every step between intent and a held slot loses people
                  who had already decided. No duration in the label: the widget a
                  scroll below renders the real one and a number here could only
                  contradict it. */}
              <Link href="/contact#enquiry" className="rf-btn rf-btn--secondary w-full sm:w-auto">
                Send an enquiry
              </Link>
            </div>
          </div>

          {/* C — platform row. order-3 puts it under the panel on mobile; inside
              the flex column from lg it sits under the CTAs. */}
          <div className="order-3 min-w-0 w-full lg:mt-12">
            <p
              className="font-mono text-meta tracking-[0.16em] uppercase m-0 mb-4"
              style={{ color: 'var(--s-text-faint)' }}
            >
              Google and AI search platforms
            </p>
            <ul className="list-none p-0 m-0 flex flex-wrap items-center gap-2">
              {ENGINES.map((e) => (
                <li
                  key={e.name}
                  className="inline-flex items-center gap-2 py-1.5 pl-2 pr-3"
                  style={{ border: '1px solid var(--s-rule-strong)' }}
                >
                  {e.icon ? <img
                    src={e.icon}
                    alt=""
                    aria-hidden="true"
                    width={16}
                    height={16}
                    className="h-4 w-4 object-contain"
                  /> : <span aria-hidden="true" className="text-meta">{e.monogram}</span>}
                  <span className="text-meta" style={{ color: 'var(--s-text-muted)' }}>
                    {e.name}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-meta mt-4 m-0 max-w-[58ch]" style={{ color: 'var(--s-text-faint)' }}>
              We agree which platforms matter for your market. A name here is not a partnership, and no one can promise you a place in any platform&apos;s answers.
            </p>
          </div>
          </div>

          {/* B — the panel. order-2 sits it between the CTAs and the platform row
              on mobile; from lg it is the second grid column. */}
          <div className="order-2 min-w-0 w-full lg:justify-self-end lg:max-w-[520px]">
            <HeroSnapshotPanel />
          </div>
        </div>
      </Shell>
    </section>
  );
}
