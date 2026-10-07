import Link from 'next/link';
import { Fragment } from 'react';
import { ArrowUpRight, Building2 } from 'lucide-react';
import { Band, BandHeading, Label, SHELL } from './blocks';
import { ObservationStatus } from './ObservationBlock';
import type { IcpCrossLink, IcpLink, IcpRecord } from '../../lib/b2b/icpRegistry';
import type { ObservationView } from '../../lib/b2b/observations';
import type { ClientProof } from '../../data/b2b/types';
import { INDUSTRY_ICON, industryDisplayName, industryImage } from '../../data/b2b/icp/industryVisuals';
import { byNiche, getB2BCaseStudy, getCaseStudy, type AnyCaseStudy } from '../../data/case-studies';
import { PROOF_LINE_B2B, PROOF_LINE_INSURANCE } from '../../data/servicePages';
import IconTile from '../visual/IconTile';
import ProgrammeCard from '../visual/ProgrammeCard';
import TintedImage from '../visual/TintedImage';
import v from '../visual/visual.module.css';

/* THE BLOCKS THE FOUR-LEVEL FAMILY NEEDS AND THE SPINE FAMILY DOES NOT.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * WHAT IS REUSED AND WHY THIS FILE IS SHORT.
 *
 * `blocks.tsx` already carries the blocks that are level-agnostic: buyers,
 * facts, vocabulary, axes, why-lost, service links, siblings, proof, FAQs and
 * the snapshot CTA. Every one of those is imported by the four templates
 * unchanged. So is `ObservationBlock.tsx`, which already has a designed
 * `unobserved` state, and `DraftNotice.tsx`.
 *
 * What is here is only what the ICP levels have that the 15-entry spine never
 * did: a four-deep breadcrumb, the operator's six sub-industry fields, the
 * composed prompt panel, the coverage grid, the cross-tree pointer and the
 * rule-7 canonical pointer.
 *
 * EVERY EXPORT IS A SERVER COMPONENT and none may acquire state or an event
 * handler. ADR-0008 §5.2 item 3: the moment one of these becomes a Client
 * Component and takes a record as a prop, whatever is reachable from that prop
 * is serialized into the RSC payload of every page that renders it.
 * `lib/b2b/icpRegistry.ts` hands out flat views with no child arrays so the
 * reach is one entity rather than 2.2MB, and `scripts/check-b2b.cjs` greps for
 * `'use client'` in this directory. Both, because one of them is a policy.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * THE TWO FIELDS THAT WILL GET WIRED TO THE WRONG SLOT.
 *
 * `ai_prompts` and `ppc_keywords` are FAMILY B: the CLIENT'S buyer's language.
 * They look like keyword research because they are keyword research, for a
 * different company. Neither may appear in an H1, a `<title>`, a meta
 * description, an FAQ question or a target query, and the two blocks below that
 * render them both name whose language it is in the same view, so the page
 * cannot be read as claiming them. Positioning rule 2, Theo §1.1, and
 * `scripts/check-icp.cjs` asserts the containment.
 *
 * DENSITY IS THE BRIEF, same as `blocks.tsx`. These are read by a commercial
 * leader comparing suppliers, and the lattice grids are deliberately tight.
 * ────────────────────────────────────────────────────────────────────────────
 */

/* The lattice, matching blocks.tsx: cells draw top and left, the container
   draws the outer right and bottom, so the frame closes on any item count at
   any column count and no seam is ever painted twice. */
const LATTICE = {
  borderRight: '1px solid var(--s-rule-hairline)',
  borderBottom: '1px solid var(--s-rule-hairline)',
};
const LATTICE_CELLS = '[&>*]:border-t [&>*]:border-l [&>*]:border-[var(--s-rule-hairline)]';

/* ── Breadcrumb. Up to three ancestors plus the hub. ──────────────────────── */

/**
 * The up-link, once here and once in the body's first 200 words (Nadia §5.1
 * rule 1). Anchor text is the ancestor's `name` from the JSON, verbatim.
 *
 * An ancestor that is not published is rendered as TEXT, not as a link, and that
 * is not a C6 breach: C6 forbids advertising an unpublished entity as a
 * destination, and a breadcrumb crumb that is not a link advertises nothing. It
 * is also unreachable in practice, because ADR-0008 §6.4 assertion 3 and
 * `scripts/check-icp.cjs` both refuse a published page under an unpublished
 * parent. It is handled rather than assumed, because "cannot happen" is how a
 * crash reaches a live URL.
 *
 * Wraps rather than truncating. The longest path in the taxonomy is 203
 * characters and at 360px it is four lines; four honest lines beat an ellipsis
 * that hides which branch the reader is in.
 */
export function IcpBreadcrumb({ trail }: { trail: readonly IcpLink[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="list-none p-0 m-0 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <li>
          <Link
            href="/industries"
            className="text-meta rf-link"
            style={{ color: 'var(--s-text-muted)' }}
          >
            All industries
          </Link>
        </li>
        {trail.map((crumb) => (
          <li key={crumb.id} className="flex items-baseline gap-2">
            <span aria-hidden="true" className="text-meta" style={{ color: 'var(--s-text-faint)' }}>
              /
            </span>
            {crumb.href ? (
              <Link href={crumb.href} className="text-meta rf-link" style={{ color: 'var(--s-text-muted)' }}>
                {crumb.name}
              </Link>
            ) : (
              <span className="text-meta" style={{ color: 'var(--s-text-faint)' }}>
                {crumb.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ── The client's paid demand. Also Family B, and the same trap one field over. ─ */

/**
 * The three `ppc_keywords` the operator supplied per sub-industry.
 *
 * THESE ARE THE CLIENT'S BID LIST, NEVER OURS. `boom lift rental`,
 * `aog aircraft parts`, `dog daycare franchise`: nobody types those looking for
 * an AI search agency. The failure mode this block is written against is someone
 * building Qognition's own paid account from a field called `ppc_keywords`,
 * which is the Family B collapse arriving through the ad platform instead of
 * through the router. So the terms render in a monospace column under a heading
 * that names whose demand it is, never as prose we could be read as targeting.
 *
 * The paid line stays inside its boundary (Theo §7): it says we run paid media
 * for firms in this category and links to `/ppc` once. It does not state or
 * imply that paid sits inside the retainer, because paid is priced against ad
 * spend, and it publishes no percentage and no minimum.
 */
export function PaidDemandBlock({
  keywords,
  id,
}: {
  keywords: readonly string[];
  id: string;
}) {
  if (keywords.length === 0) return null;

  return (
    <Band labelledBy={id}>
      <BandHeading id={id}>What your buyers type into Google</BandHeading>
      <p className="text-body mt-4 m-0 max-w-[68ch]" style={{ color: 'var(--s-text-muted)' }}>
        Searches like these can come from people ready to buy. We check how often they&apos;re searched, and
        whether they fit, before we use any of them in a campaign.
      </p>
      <ul className="list-none p-0 m-0 mt-8 flex flex-wrap gap-2">
        {keywords.map((keyword) => (
          <li
            key={keyword}
            className="font-mono text-meta px-3 py-2 max-w-full"
            style={{ color: 'var(--s-text)', border: '1px solid var(--s-rule-strong)', overflowWrap: 'anywhere' }}
          >
            {keyword}
          </li>
        ))}
      </ul>
      <p className="text-body mt-8 m-0">
        <Link href="/services/ppc" className="rf-link" style={{ color: 'var(--s-accent)' }}>
          How we run B2B PPC
        </Link>
      </p>
    </Band>
  );
}

/* ── The questions your buyers ask AI. Family B, one dark band. ────────────── */

/**
 * The merged section 2 of the plain-English template (copy §9.2, §9.3): the prompt panel,
 * the authored "what we check for" sentence and the observation record, in one band.
 *
 * The prompts are the CLIENT's buyer asking, and the band says so in its intro and in the
 * one label over the list. The four per-row classification labels are gone: they were our
 * internal sorting, not something a reader needs. Nothing here builds a prompt string;
 * `lib/b2b/promptPanel.ts` owns that.
 *
 * `[vendor]` in a prompt renders as a chip reading "a named vendor". The taxonomy string
 * is not edited, so the JSON and the panel stay equal.
 *
 * Raw `geo_angle` never renders here (F4). The sentence is `whatWeCheckFor`, authored per
 * page; absent means the line is omitted rather than filled with operator shorthand.
 */
function PromptText({ prompt }: { prompt: string }) {
  const parts = prompt.split(/\[vendor\]/i);
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 && (
            <span
              className="inline-block px-1.5 mx-0.5 text-meta font-mono"
              style={{ border: '1px solid var(--s-rule-strong)', color: 'var(--s-accent)' }}
            >
              a named vendor
            </span>
          )}
        </Fragment>
      ))}
    </>
  );
}

export function QuestionsBlock({
  prompts,
  whatWeCheckFor,
  observation,
  nicheLabel,
  id,
}: {
  prompts: readonly string[];
  whatWeCheckFor?: string;
  observation: ObservationView;
  nicheLabel: string;
  id: string;
}) {
  return (
    <Band labelledBy={id} dark>
      <BandHeading id={id}>The questions your buyers ask AI</BandHeading>
      <p className="text-body mt-4 m-0 max-w-[68ch]" style={{ color: 'var(--s-text-muted)' }}>
        These are questions your buyers might type into an AI tool. They are your buyers&apos; words, not
        ours. We agree the final list with your sales team before we test anything.
      </p>

      {prompts.length > 0 && (
        <div className="mt-8">
          <Label>Your buyers&apos; words, not ours</Label>
          <ol className="list-none p-0 m-0 mt-4" style={{ borderTop: '1px solid var(--s-rule-hairline)' }}>
            {prompts.map((prompt) => (
              <li
                key={prompt}
                className="text-body py-3 pl-6"
                style={{
                  color: 'var(--s-text)',
                  borderBottom: '1px solid var(--s-rule-hairline)',
                  borderLeft: '2px solid var(--s-accent-graphic)',
                  overflowWrap: 'anywhere',
                }}
              >
                <PromptText prompt={prompt} />
              </li>
            ))}
          </ol>
        </div>
      )}

      {whatWeCheckFor && (
        <div className="mt-10">
          <h3 className="text-h4 font-sans m-0 font-semibold">What we check for</h3>
          <p className="text-body mt-3 m-0 max-w-[68ch]" style={{ color: 'var(--s-text-muted)' }}>
            {whatWeCheckFor}
          </p>
        </div>
      )}

      <div className="mt-10">
        <Label>What AI tools said</Label>
        <div className="mt-4">
          <ObservationStatus view={observation} nicheLabel={nicheLabel} idPrefix={id} />
        </div>
      </div>
    </Band>
  );
}

/* ── Proof. Placement rule, copy §9.2 section 8 and §2.2. ─────────────────── */

/**
 * A named record only when a person put its id on this page's body (`proof.kind ===
 * 'case-study'`), never inferred from a template. Then the first three insurance records
 * tagged `ai-seo`. HVAC and dental never render here, whatever the id says: a consumer
 * record named on a B2B body is dropped rather than shown (CLAUDE.md §2, operator
 * 2026-10-07). Each caveat line renders only under a group that rendered.
 *
 * The old `kind: 'none'` statement no longer renders. The insurance caveat line says the
 * same thing in one sentence (copy §9.3).
 */
export function IcpProofBlock({ proof, id }: { proof: ClientProof; id: string }) {
  const named = proof.kind === 'case-study' ? proof.caseStudyId : undefined;
  const b2b = named ? [getB2BCaseStudy(named)].filter((s) => s !== undefined) : [];
  const namedInsurance = named ? getCaseStudy(named) : undefined;
  const insurance: AnyCaseStudy[] = [
    ...(namedInsurance && namedInsurance.niche === 'insurance' ? [namedInsurance] : []),
    ...byNiche('insurance').filter((s) => s.services.includes('ai-seo') && s.id !== named),
  ].slice(0, 3);
  const cols = (n: number) => (n >= 3 ? 'md:grid-cols-3' : n === 2 ? 'md:grid-cols-2 lg:w-2/3' : 'md:w-1/2 lg:w-1/3');

  return (
    <Band labelledBy={id} dark>
      <BandHeading id={id}>Client programmes</BandHeading>

      {/* Ruth, template verdict FIX: one fixed sentence on every kind:'none' page. The
          authored `statement` fields never render here. */}
      {proof.kind === 'none' && (
        <p className="text-body mt-6 m-0 max-w-[68ch]" style={{ color: 'var(--s-text)' }}>
          We have not published a client programme in this sector. The insurance programmes below show how we run
          the work. They are not experience in your field.
        </p>
      )}

      {b2b.length > 0 && (
        <div className="mt-10">
          <span className="rf-eyebrow">B2B client results</span>
          <ul className={`${v.lattice} list-none p-0 m-0 mt-5 grid grid-cols-1 ${cols(b2b.length)}`}>
            {b2b.map((study) => (
              <ProgrammeCard key={study.id} study={study} />
            ))}
          </ul>
        </div>
      )}

      {insurance.length > 0 && (
        <div className="mt-10">
          <span className="rf-eyebrow">Insurance programmes</span>
          <ul className={`${v.lattice} list-none p-0 m-0 mt-5 grid grid-cols-1 ${cols(insurance.length)}`}>
            {insurance.map((study) => (
              <ProgrammeCard key={study.id} study={study} />
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 lg:items-start">
        <div className="lg:col-span-7">
          {b2b.length > 0 && (
            <p className="text-meta m-0 max-w-[72ch]" style={{ color: 'var(--s-text-muted)' }}>
              {PROOF_LINE_B2B}
            </p>
          )}
          {insurance.length > 0 && (
            <p className="text-meta m-0 mt-2 max-w-[72ch]" style={{ color: 'var(--s-text-muted)' }}>
              {PROOF_LINE_INSURANCE}
            </p>
          )}
        </div>
        <div className="lg:col-span-5 flex flex-col sm:flex-row flex-wrap gap-3 lg:justify-end">
          <Link href="/case-studies/methodology" className="rf-btn rf-btn--secondary">
            How we handle evidence
          </Link>
          <Link href="/case-studies" className="rf-btn rf-btn--secondary">
            Client programmes
          </Link>
        </div>
      </div>
    </Band>
  );
}

/* ── Related pages. Children, siblings and cross-tree pointers, one list. ──── */

/**
 * Copy §9.3: three link blocks with three headings for one job become one list, names
 * only. PUBLISHED ONLY, exactly as before: children and siblings arrive from the registry
 * already filtered to published entities, and a cross-tree pointer with no href is dropped
 * (Nadia C6). Uncapped, because this list is what stops a child being an orphan
 * (ADR-0008 §7.2). The block omits itself when nothing resolves.
 *
 * Each card carries its industry's icon, so a pointer into another branch reads as one
 * at a glance.
 */
export function RelatedPagesBlock({
  children: childLinks,
  siblings,
  cross,
  industrySlug,
  id,
}: {
  children: readonly IcpLink[];
  siblings: readonly IcpLink[];
  cross: readonly IcpCrossLink[];
  industrySlug: string;
  id: string;
}) {
  const seen = new Set<string>();
  const entries = [
    ...childLinks.map((l) => ({ name: l.name, href: l.href, slug: industrySlug })),
    ...siblings.map((l) => ({ name: l.name, href: l.href, slug: industrySlug })),
    ...cross.map((l) => ({ name: l.name, href: l.href, slug: l.path[0] ?? industrySlug })),
  ].filter((e): e is { name: string; href: string; slug: string } => {
    if (!e.href || seen.has(e.href)) return false;
    seen.add(e.href);
    return true;
  });
  if (entries.length === 0) return null;

  return (
    <Band labelledBy={id}>
      <BandHeading id={id}>Related pages</BandHeading>
      <ul
        className="list-none p-0 m-0 mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 [&>*]:border-t [&>*]:border-l [&>*]:border-[var(--s-rule-hairline)]"
        style={{ borderRight: '1px solid var(--s-rule-hairline)', borderBottom: '1px solid var(--s-rule-hairline)' }}
      >
        {entries.map((entry) => (
          <li key={entry.href}>
            <Link href={entry.href} className="rf-card rf-hoverable relative flex h-full items-center gap-4 p-5 pr-12">
              <IconTile icon={INDUSTRY_ICON[entry.slug] ?? Building2} size={24} />
              <span className="text-body font-semibold min-w-0" style={{ overflowWrap: 'anywhere' }}>
                {entry.name}
              </span>
              <span className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--s-accent)' }} aria-hidden="true">
                <ArrowUpRight className="rf-arrow" size={20} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Band>
  );
}

/* ── The coverage grid. Vocabulary, not a directory. ──────────────────────── */

/**
 * The scope terms inside this entity, each with the sentence that distinguishes
 * it, and each an anchor TARGET.
 *
 * WHY EVERY ROW NEEDS AN AUTHORED SENTENCE. Nadia's §1.7.2 wants these names on
 * the page: they are the entity vocabulary, spelled the way the industry spells
 * it, and they are the qualifier bank the prompt panel composes from. Her C6
 * forbids a name appearing as a dead list item. Both hold at once only if a name
 * arrives with content attached, which is Theo §4.2's one authored sentence per
 * row. `data/b2b/icp/bodies.ts` carries them as `scope`, the gate asserts every
 * `slug` names a real child, and a body with no `scope` renders no block here.
 * A short honest page beats a long templated one.
 *
 * ANCHOR TARGET, NEVER AN ANCHOR. The heading carries `id="<slug>"` so
 * `/industries/a/b/c#scope-term` is linkable, shareable and citable from
 * outside. Nothing on this page points at it with an `<a href="#...">`: Nadia
 * §5.1 rule 14 forbids that, because a fragment link inflates the internal link
 * count against the 40-link ceiling while adding no crawl path.
 */
export function CoverageGridBlock({
  rows,
  id,
}: {
  rows: readonly { readonly slug: string; readonly name: string; readonly distinguishes: string }[];
  id: string;
}) {
  if (rows.length === 0) return null;

  return (
    <Band labelledBy={id}>
      <BandHeading id={id} eyebrow="Inside this niche">
        The narrower jobs buyers ask for by name.
      </BandHeading>
      <div className={`grid grid-cols-1 md:grid-cols-2 mt-9 ${LATTICE_CELLS}`} style={LATTICE}>
        {rows.map((row) => (
          <article key={row.slug} className="p-6">
            <h3 id={row.slug} className="text-h3 font-sans m-0 mb-2 font-semibold">
              {row.name}
            </h3>
            <p className="text-body m-0 max-w-[58ch]" style={{ color: 'var(--s-text-muted)' }}>
              {row.distinguishes}
            </p>
          </article>
        ))}
      </div>
    </Band>
  );
}

/* ── Rule 7. The duplicate renders a pointer, never a second body. ────────── */

/**
 * One of the 5 declared overlaps, seen from the non-canonical side.
 *
 * Both paths are legitimate URLs and both resolve; the canonical id builds the
 * page and this one carries `<link rel="canonical">` to it and renders this
 * instead of a body. Positioning rule 7, and it is a canonical-tag and content
 * problem rather than a routing one: no resolver change is needed for it.
 *
 * It is a full page, not a redirect, because a redirect would lose the reader
 * who arrived on the branch they think in.
 */
export function CanonicalPointerPage({
  name,
  canonicalHref,
  canonicalName,
}: {
  name: string;
  canonicalHref?: string;
  canonicalName: string;
}) {
  return (
    <main className="min-h-screen">
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-24">
        <div className={SHELL}>
          <Label accent>Covered on another page</Label>
          <h1 className="text-h1 font-sans m-0 mt-4 max-w-[20ch] font-semibold">{name}</h1>
          <p className="text-body mt-8 m-0 max-w-[68ch]" style={{ color: 'var(--s-text-muted)' }}>
            We cover this kind of firm, its buyers and their questions on our page for{' '}
            {canonicalHref ? (
              <Link href={canonicalHref} className="rf-link" style={{ color: 'var(--s-accent)' }}>
                {canonicalName}
              </Link>
            ) : (
              <span style={{ color: 'var(--s-text)' }}>{canonicalName}</span>
            )}
            .
          </p>
          {canonicalHref && (
            <div className="mt-9">
              <Link href={canonicalHref} className="rf-btn rf-btn--primary">
                Read the full page
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

/* ── The hero, shared by all four templates. ──────────────────────────────── */

/**
 * ONE H1 PER PAGE, and it is a noun phrase rather than a claim.
 *
 * `AI search visibility for {name}.` is the form the two shipped templates
 * already use. Theo §6 records that it does not match Nadia §2.3's proposed
 * `<name>: what buyers ask AI, and who gets named` and asks for the divergence
 * to be decided rather than left standing. It is not decided here: changing the
 * H1 form changes the two live draft pages too, and which of the two is right is
 * a copy call for Theo, Nadia and Ruth rather than a frontend one. The four new
 * templates use the shipped form so the family stays consistent whichever way it
 * goes, and the divergence is carried up rather than quietly resolved.
 *
 * What the H1 may never contain, at any level: a string from `ai_prompts` or
 * `ppc_keywords`. Those are the client's buyer's language and this page is not
 * written for them.
 */
export function IcpHero({
  eyebrow,
  name,
  buyerQuestion,
  opener,
  trail,
  upLink,
  writtenFor,
  industrySlug,
  industryName,
  draft,
}: {
  eyebrow: string;
  name: string;
  buyerQuestion: string;
  opener: string;
  trail: readonly IcpLink[];
  upLink?: { readonly name: string; readonly href?: string };
  /** `buyer_titles`, verbatim. OUR buyer, so it sits in the hero (copy §9.3), never in the
   *  client-buyer block. Absent at level 1, which has no `buyer_titles`. */
  writtenFor?: readonly string[];
  /** Picks the industry photo, or the industry icon where no photo is approved. */
  industrySlug: string;
  /** The level-1 name, shown beside the icon when there is no photo. */
  industryName: string;
  draft: boolean;
}) {
  const image = industryImage(industrySlug);
  const Icon = INDUSTRY_ICON[industrySlug] ?? Building2;

  return (
    <section data-theme="light" className={`${draft ? 'pt-10' : 'pt-32 sm:pt-40'} pb-14 sm:pb-16`}>
      <div className={SHELL}>
        <IcpBreadcrumb trail={trail} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10 lg:items-center">
          <div className="lg:col-span-7 min-w-0">
            <Label accent>{eyebrow}</Label>
            {/* NEVER lowercase a taxonomy label. `.toLowerCase()` shipped on the
                spine templates first and rendered "cnc machining", destroying
                the acronym; across this taxonomy it would also produce "saas and
                software", "it services" and "aog aircraft parts". Sentence flow
                is not worth mangling an entity name a model is meant to match. */}
            <h1 className="text-h1 font-sans m-0 mt-4 max-w-[18ch] font-semibold" style={{ overflowWrap: 'anywhere' }}>
              AI search visibility for {name}.
            </h1>

            {/* Question, then answer, in that order and within 60 words.
                Extraction depends on the answer being self-contained and not
                referring back to the H1 with a pronoun. */}
            <h2 className="text-h3 font-sans mt-8 mb-3 max-w-[40ch] font-semibold">{buyerQuestion}</h2>
            <p className="text-body m-0 max-w-[68ch]" style={{ color: 'var(--s-text-muted)' }}>
              {opener}
            </p>

            {/* Up-link 2 of 2, inside the first 200 words, anchor is the
                parent's name from the JSON. Nadia §5.1 rule 1. */}
            {upLink?.href && (
              <p className="text-body mt-4 m-0 max-w-[68ch]" style={{ color: 'var(--s-text-muted)' }}>
                Explore more in{' '}
                <Link href={upLink.href} className="rf-link" style={{ color: 'var(--s-accent)' }}>
                  {upLink.name}
                </Link>
                .
              </p>
            )}

            {writtenFor && writtenFor.length > 0 && (
              <p className="text-meta mt-6 m-0 max-w-[68ch]" style={{ color: 'var(--s-text-muted)' }}>
                <span className="font-mono uppercase tracking-[0.14em]" style={{ color: 'var(--s-text-faint)' }}>
                  Written for:
                </span>{' '}
                <span style={{ color: 'var(--s-text)' }}>{writtenFor.join(' · ')}</span>
              </p>
            )}

            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
              <Link href="/book" className="rf-btn rf-btn--primary">
                Book a call
              </Link>
              <Link href="/contact#enquiry" className="rf-btn rf-btn--secondary">
                Send an enquiry
              </Link>
            </div>
          </div>

          {/* The industry, as a picture. A local Pexels photo under the teal tint where one
              is approved (data/b2b/icp/industryImages.json), beside the copy and never behind
              it, because this is a light band (brief §1.4). It only sets the scene, so
              alt="" (Ruth, 2026-10-07). Otherwise the industry's icon. */}
          <div className="lg:col-span-5 min-w-0">
            {image ? (
              <TintedImage
                src={image.src}
                alt=""
                sizes="(min-width: 1024px) 40vw, 100vw"
                priority
                className="aspect-[16/10] w-full"
              />
            ) : (
              <div
                className={`${v.screenField} flex items-center gap-4 p-6`}
                aria-hidden="true"
              >
                <IconTile icon={Icon} size={32} />
                <span className="font-mono text-meta uppercase tracking-[0.14em]" style={{ color: 'var(--s-text-muted)' }}>
                  {industryDisplayName(industryName)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── The record's own scope rows, joined to the taxonomy names. ───────────── */

/** Authored `scope` rows matched to real children. A row naming no child is dropped
 *  here and named by the gate, because rule 6 says the slug comes from the JSON. */
export function scopeRowsFor(
  record: IcpRecord,
  children: readonly { readonly slug: string; readonly name: string }[]
): readonly { readonly slug: string; readonly name: string; readonly distinguishes: string }[] {
  const byName = new Map(children.map((c) => [c.slug, c.name]));
  return (record.body.scope ?? [])
    .filter((row) => byName.has(row.slug))
    .map((row) => ({ slug: row.slug, name: byName.get(row.slug)!, distinguishes: row.distinguishes }));
}
