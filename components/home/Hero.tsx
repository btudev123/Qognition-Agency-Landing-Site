import Link from 'next/link';
import ProductScreen from '../product-screens/ProductScreen';
import { PRODUCT_SCREENS } from '../../data/product-screens';
import { Shell } from './primitives';
import { AI_PLATFORMS } from '../../data/aiPlatforms';
import { HERO_H1, heroReelPlatforms, heroSpokenPlatforms } from '../../data/homeHero';
import PlatformReel from './PlatformReel';
import v from '../visual/visual.module.css';


const ENGINES = AI_PLATFORMS;
const REEL = heroReelPlatforms();

export default function Hero() {
  return (
    <section
      data-theme="light"
      className="relative overflow-hidden"
      style={{
        paddingTop: 'clamp(104px, 11vh, 140px)',
        paddingBottom: 'clamp(48px, 7vh, 80px)',
      }}
    >
      <Shell>
        {/* THE TRACKER RUN IS RENDERED ONCE.
            The panel used to be rendered twice, once inside the left column for
            mobile DOM order and once in the right column for desktop. It holds
            the run player, so a second copy would duplicate the DOM, the timers,
            the live region and the hydration for a layout concern. Explicit grid placement
            gets the same two orders out of one instance:

              mobile   1 col, natural DOM order: A badge/H1/CTAs, B tracker, C chips
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
            <span className="rf-eyebrow rf-eyebrow--accent mb-6">AI-native growth agency for B2B · AI SEO, GEO and SEO</span>

            {/* text-display is the canonical token. No inline font-size: the
                orphaned file set clamp(40px, 5.8vw, 84px) by hand, which is
                outside the scale and invisible to the typography gate, because
                the gate reads className and not style. tokens-dark.md §9. */}
            {/* Operator 2026-10-08: "Be the firm {platform} names when your buyer
                asks who to hire." The words live in data/homeHero.ts.
                Served and accessible text is one stable sentence, heroH1Sentence():
                the sr-only span carries every platform name, and the reel is
                aria-hidden with no text node, so nothing is read twice.
                The <br> keeps the tail off the reel's line. The reel reserves the
                widest platform's width, and on its own line that reserve is
                trailing space nobody sees. If the tail followed it on the same
                line, a gap would open after the shorter names. */}
            <h1 className="text-display font-sans m-0 max-w-[15ch]">
              {HERO_H1.lead}{' '}
              <span className="sr-only">{heroSpokenPlatforms()}</span>
              <PlatformReel platforms={REEL} />{' '}
              <br />
              {HERO_H1.tail}
            </h1>
            <p className="text-body mt-5 m-0 max-w-[56ch]" style={{ color: 'var(--s-text-muted)' }}>
              When a buyer asks ChatGPT or Google&apos;s AI who to hire, the answer names firms. We run AI SEO, GEO and SEO for B2B firms, including SaaS, with B2B PPC alongside. The work is on the pages and sources those answers draw from, and every AI answer we report comes with its prompt, platform and date.
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

          {/* B, the tracker run (ADR-0006 §11). order-2 sits it between the
              CTAs and the platform row on mobile; from lg it is the second grid
              column. The field, border and panel shadow come from the screenField class
              because ProductScreen renders frame="none". */}
          <div className={`order-2 min-w-0 w-full lg:justify-self-end lg:max-w-[560px] ${v.screenField}`}>
            <ProductScreen screen={PRODUCT_SCREENS['scriblr-tracker-run']} frame="none" />
          </div>
        </div>
      </Shell>
    </section>
  );
}
