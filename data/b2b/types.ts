/* AUTHORED BODIES FOR THE B2B NICHE UNIVERSE. ADR-0007 §3.1.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WHAT THIS FILE IS, AND WHAT IT DELIBERATELY IS NOT.
 *
 * `data/b2b/verticals.ts` is the LOCKED spine: slug, label, tier, why, and a
 * `publication` state. It is locked, so its types are not edited here. This file
 * holds the payload a spine entity needs before a page may render for it.
 *
 * ADR-0007 §3.1 wanted the payload to travel INSIDE the publication variant, so
 * that `state: 'published'` with no authored body is a compile error. The spine
 * is locked, so the payload lives beside it instead and the compiler cannot make
 * that particular guarantee. STATE THAT PLAINLY RATHER THAN PRETENDING:
 *
 *   - What the compiler still enforces: a body, once written, cannot have two
 *     facts, an unsourced fact, a relative source URL, a reviewer outside the
 *     closed union, or a review date that is not shaped like a date. Those are
 *     tuple arities and template literal types and they are not suppressible.
 *   - What it does NOT enforce: that a `published` entity has a body at all.
 *     That is asserted in scripts/check-b2b.cjs instead, and it is therefore a
 *     gate finding rather than a type error. ADR-0007 §3.3 is explicit that a
 *     policy dressed as a mechanism is the failure to avoid, so this is written
 *     down rather than implied.
 *
 * The content shape is Nadia's, from docs/seo/b2b-niche-architecture.md §4.1.
 * Each tuple arity below is one of her mechanical minimums. The minimum is not
 * the target; it is the point below which the build fails.
 * ────────────────────────────────────────────────────────────────────────────
 */

/** Stops `reviewedAt: 'soon'`. It does not stop `9999-99-99`. ADR-0007 §3.3. */
export type IsoDate = `${number}-${number}-${number}`;

/**
 * Named humans accountable for a page. A closed union, the ADR-0006
 * `SampleBrand` pattern: `reviewer: 'TBD'` is a compile error, not a review
 * finding. Adding a member is itself a reviewed change.
 */
/**
 * Who may sign off a page as indexable.
 *
 * A closed union, so `reviewer: 'TBD'` is a compile error rather than a review
 * finding. This is the field that sets the publishing rate: pages per month is
 * reviewer hours divided by hours per page, and nothing else caps it.
 *
 * Named by the operator on 2026-09-29. The four agent entries below him are
 * workflow roles, not sign-off authority: an agent drafting a page cannot also
 * be the human who stands behind it. They remain because existing draft records
 * reference them and removing one is a separate change.
 *
 * `[NEEDS DATA: a specialist reviewer for the regulated verticals.]` Commercial
 * insurance, healthcare and life sciences, and the TIC accreditation claims each
 * turn on vocabulary a generalist reviewer cannot verify. docs/OPERATOR-DECISIONS
 * #7 has carried this since before the ICP import, and the ICP adds aerospace
 * airworthiness and franchise FDD disclosure to the same list. A page in those
 * verticals signed off without one is signed off on trust, not on check.
 */
export type ReviewerName =
  | 'Prabal (CEO, Qognition Agency)'
  | 'Nadia (search)'
  | 'Theo (content)'
  | 'Ruth (brand-guard)'
  | 'Iris (research)';

export interface Review {
  readonly reviewer: ReviewerName;
  readonly reviewedAt: IsoDate;
}

/**
 * Where a claim came from.
 *
 * `confidence` carries the distinction docs/research/b2b-vertical-substance.md
 * makes throughout and which CLAUDE.md §4 depends on: `observed` means someone
 * read the primary source, `reported` means a secondary restated it. Several
 * standards bodies return HTTP 403 to automated fetch, so `reported` is a real
 * and common state and collapsing it into `observed` would be a claims defect.
 */
export interface SourceRef {
  /** A relative or empty URL does not typecheck. ADR-0007 §3.1. */
  readonly url: `https://${string}`;
  readonly publisher: string;
  readonly accessedAt: IsoDate;
  readonly confidence: 'observed' | 'reported';
}

/** CLAUDE.md §4: no number appears anywhere that was not measured. */
export interface Fact {
  readonly claim: string;
  readonly source: SourceRef;
}

export interface Faq {
  readonly question: string;
  readonly answer: string;
}

/**
 * A buyer role on the CLIENT's side.
 *
 * `researches` is the artefact this role actually reads, and it is the field
 * that makes the block untemplatable: a commodity manager at an aerospace prime
 * researches an AS9100 scope certificate; a CISO researches an MDR provider's
 * MTTD claim. Those do not interchange, so a page that could swap them has not
 * been written by anyone who knows the niche.
 */
export interface BuyerRole {
  readonly title: string;
  readonly researches: string;
}

/** A term, its issuing body, and what it gates. Never a bare glossary entry. */
export interface VocabularyTerm {
  readonly term: string;
  readonly issuedBy: string;
  readonly gates: string;
}

/** An axis buyers compare on. An axis, not a benefit. Nadia §4.1 block 6. */
export interface ComparisonAxis {
  readonly axis: string;
  readonly whatBuyersAsk: string;
}

/**
 * CLAUDE.md §11 forbids implying experience in an industry because a page
 * exists for it. So the absence of proof is a rendered sentence, not a silence:
 * the `none` variant carries the statement the page prints. Most pages in this
 * family will carry it, and that line is itself a differentiator — no competitor
 * writes it.
 */
export type ClientProof =
  | { readonly kind: 'case-study'; readonly caseStudyId: string }
  | { readonly kind: 'none'; readonly statement: string };

/** Blocks shared by both page types. */
interface BodyCommon {
  /**
   * The Family Q question — the one OUR buyer asks. Never Family B, which is
   * the client's buyer's prompt and which this page can never be the answer to.
   * `data/b2b/verticals.ts` header explains why confusing the two rebuilds the
   * location pages a second time.
   */
  readonly buyerQuestion: string;
  /** Answer-first, <= 60 words, self-contained, no pronoun referring to the H1. */
  readonly opener: string;
  /**
   * The <meta name="description">. A SEPARATE field, and it has to be.
   *
   * Reusing `opener` shipped a 300-character description on the first render,
   * which Google truncates at roughly 160 and which therefore threw away the
   * half of the sentence that did the work. The two strings have different jobs:
   * the opener answers the question for a reader who is already on the page, the
   * description earns the click from someone who is not. Gate asserts <= 160.
   */
  readonly metaDescription: string;
  readonly buyers: readonly [BuyerRole, BuyerRole, BuyerRole, ...BuyerRole[]];
  readonly facts: readonly [Fact, Fact, Fact, ...Fact[]];
  /** One specific failure mechanism. Not "they have not done SEO". */
  readonly whyTheAnswerIsLost: string;
  readonly faqs: readonly [Faq, Faq, Faq, ...Faq[]];
  readonly proof: ClientProof;
  /** The niche-specific qualifying question on the snapshot CTA. Nadia §4.1 block 9. */
  readonly snapshotQuestion: string;
  /**
   * One authored sentence: what we check AI answers for, rewritten from the sub-industry's
   * `geo_angle` (docs/copy/2026-10/plain-english-templates.md §9.2, section 2). Optional, and
   * absent means the line is omitted: raw `geo_angle` never renders, because it is operator
   * shorthand and 11 of the strings carry em dashes (flag F4).
   */
  readonly whatWeCheckFor?: string;
}

/** Type A. The meta-vertical hub. */
export interface HubBody extends BodyCommon {
  readonly kind: 'hub';
}

/** Type B. The sub-niche page, which carries two blocks the hub does not. */
export interface SubNicheBody extends BodyCommon {
  readonly kind: 'sub-niche';
  /** >= 6 terms. No term may appear on more than 25% of pages in the family. */
  readonly vocabulary: readonly [
    VocabularyTerm, VocabularyTerm, VocabularyTerm,
    VocabularyTerm, VocabularyTerm, VocabularyTerm,
    ...VocabularyTerm[],
  ];
  readonly comparisonAxes: readonly [ComparisonAxis, ComparisonAxis, ComparisonAxis, ...ComparisonAxis[]];
}

export type B2BBody = HubBody | SubNicheBody;
