import { Check } from 'lucide-react';
import type { SampleBrand, SampleDomain } from '../../data/product-screens';
import d from './diagram.module.css';

/* The one visual each service page carries (docs/copy/2026-10/plain-english-templates.md
 * §4, §6, §7, §8). Server components, no state, no motion. Every label is a string from
 * the copy file, uppercased by CSS only, so the DOM text is the copy as written.
 *
 * None of these shows a number, a position, a count or a sample result. They draw the
 * route a buyer takes and what we report on, never an outcome. */

function Caption({ id, children }: { id: string; children: string }) {
  return (
    <figcaption id={id} className={d.caption}>
      {children}
    </figcaption>
  );
}

/** /services/seo. Four boxes in a row, then three empty report columns. */
export function DiagramSearchToSale({ idPrefix = 'q-search-to-sale' }: { idPrefix?: string }) {
  const caption = `${idPrefix}-caption`;
  return (
    <figure className={d.figure} aria-labelledby={caption}>
      <Caption id={caption}>From search to sale</Caption>
      <ol className={`${d.chain} ${d.chainWide}`}>
        <li className={d.node}>A buyer searches</li>
        <li className={d.node}>Your service page</li>
        <li className={d.node}>An enquiry</li>
        <li className={`${d.node} ${d.emphasis}`}>Your CRM</li>
      </ol>
      <div className={d.down} aria-hidden="true" />
      <ul className={d.report}>
        {['Rankings', 'Visits', 'Enquiries'].map((column) => (
          <li key={column}>
            <span className={d.reportHead}>{column}</span>
            <span className={d.reportBody} aria-hidden="true" />
          </li>
        ))}
      </ul>
    </figure>
  );
}

/** /services/ai-seo/generative-engine-optimization. Four sources feed one assistant. Your
 *  website is the only solid box: the other three sit outside it, which is the point. */
export function DiagramAnswerSources({ idPrefix = 'q-answer-sources' }: { idPrefix?: string }) {
  const caption = `${idPrefix}-caption`;
  return (
    <figure className={d.figure} aria-labelledby={caption}>
      <Caption id={caption}>Where an answer comes from</Caption>
      <div className={d.node}>A buyer&apos;s question</div>
      <div className={d.down} aria-hidden="true" />
      <ul className={`${d.grid4} ${d.stubsBelow}`}>
        <li className={`${d.node} ${d.emphasis}`}>Your website</li>
        <li className={`${d.node} ${d.dashed}`}>Directories</li>
        <li className={`${d.node} ${d.dashed}`}>Trade press</li>
        <li className={`${d.node} ${d.dashed}`}>Review and comparison sites</li>
      </ul>
      <div className={`${d.bar} ${d.barBelow}`} aria-hidden="true" />
      <div className={d.down} aria-hidden="true" />
      <ol className={d.chain}>
        <li className={d.node}>The assistant</li>
        <li className={d.node}>One answer</li>
      </ol>
    </figure>
  );
}

/* ADR-0006 R2: a sample firm is a member of the closed SAMPLE_BRANDS union on an RFC 2606
   domain. Pellman IT Group is the MSP sample, the kind of firm that sends an engineer on
   site, which is when local SEO matters (copy §7). No street address or phone number is
   drawn: an invented one looks like a real record, so the fields are named instead. */
const LISTING_BRAND: SampleBrand = 'Pellman IT Group';
const LISTING_DOMAIN: SampleDomain = 'pellman-it.example';
const LISTINGS = ['Google Business Profile', 'Bing Places', 'Industry directories', 'Your website'] as const;

function Fields() {
  return (
    <span className={d.cardFields}>
      <Check size={20} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
      Name, address, phone
    </span>
  );
}

/** /services/seo/local-seo. One set of details, the same on every listing. */
export function DiagramListings({ idPrefix = 'q-listings' }: { idPrefix?: string }) {
  const caption = `${idPrefix}-caption`;
  return (
    <figure className={d.figure} aria-labelledby={caption}>
      <Caption id={caption}>One set of details, everywhere</Caption>
      <div className={`${d.card} ${d.emphasis}`}>
        <span className={d.cardName}>{LISTING_BRAND}</span>
        <span className={d.cardTitle}>{LISTING_DOMAIN}</span>
        <Fields />
      </div>
      <div className={`${d.down} ${d.stem}`} aria-hidden="true" />
      <div className={`${d.bar} ${d.barAbove}`} aria-hidden="true" />
      <ul className={`${d.grid4} ${d.stubsAbove}`}>
        {LISTINGS.map((listing) => (
          <li key={listing}>
            <div className={d.card}>
              <span className={d.cardTitle}>{listing}</span>
              <span className={d.cardName}>{LISTING_BRAND}</span>
              <Fields />
            </div>
          </li>
        ))}
      </ul>
    </figure>
  );
}

/** /services/ppc. Five steps, and the last one returns to the first. */
export function DiagramBudgetLoop({ idPrefix = 'q-budget-loop' }: { idPrefix?: string }) {
  const caption = `${idPrefix}-caption`;
  return (
    <figure className={d.figure} aria-labelledby={caption}>
      <Caption id={caption}>Budget follows quality</Caption>
      <div className={d.loop}>
        <ol className={d.chain}>
          <li className={d.node}>A buyer searches</li>
          <li className={d.node}>Your ad</li>
          <li className={d.node}>A page that makes the same promise</li>
          <li className={d.node}>An enquiry your sales team rates</li>
          <li className={`${d.node} ${d.emphasis}`}>Budget moves to what works</li>
        </ol>
        <span className={d.loopHead} aria-hidden="true" />
      </div>
      <p className="sr-only">Then back to the start.</p>
    </figure>
  );
}
