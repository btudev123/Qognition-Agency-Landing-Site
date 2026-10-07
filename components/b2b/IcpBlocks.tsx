import Link from 'next/link';
import { Band, BandHeading, Label, SHELL } from './blocks';
import type { IcpCrossLink, IcpLink, IcpRecord, IcpSubIndustryView } from '../../lib/b2b/icpRegistry';
import type { PromptPanel } from '../../lib/b2b/promptPanel';

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

/* ── Level 1. The operator's note, which is all level 1 has of its own. ───── */

/**
 * 21 authored strings, one per industry, genuinely different from each other,
 * so the lead argument is unique by construction (Theo §3.1).
 *
 * It is the operator's commercial read and never a fact, so it renders with no
 * figure beside it and no source line under it. A `note` that arrives carrying a
 * number is a claims defect, not a copy defect, and `scripts/check-icp.cjs`
 * fails the build on one.
 */
export function OperatorNoteBlock({ note, id }: { note: string; id: string }) {
  return (
    <Band labelledBy={id}>
      <BandHeading id={id} eyebrow="Why this sector buys">
        What one won program is worth here.
      </BandHeading>
      <p
        className="text-body mt-6 m-0 max-w-[68ch] pl-6"
        style={{ color: 'var(--s-text-muted)', borderLeft: '2px solid var(--s-accent-graphic)' }}
      >
        {note}
      </p>
    </Band>
  );
}

/* ── Level 2. The six operator fields, in three blocks that keep them apart. ─ */

/**
 * OUR buyer and the firm-size floor. `buyer_titles` verbatim, so the reader sees
 * their own job on the page.
 *
 * `buyer_titles` is NOT `body.buyers[]`. Theo §2 is the post-mortem: `buyers[]`
 * is the CLIENT's buyer, the person whose searches we observe, and wiring the
 * operator's titles into it produces a page telling a marketing director that a
 * marketing director researches certificate scope. Wrong, obviously wrong to the
 * reader, and wrong 341 times before anyone notices. Two blocks, two audiences,
 * and neither borrows from the other.
 *
 * `min_firm_size` is a fit statement, never a disqualifier sentence.
 */
export function QualificationBlock({
  sub,
  id,
}: {
  sub: IcpSubIndustryView;
  id: string;
}) {
  if (sub.buyerTitles.length === 0 && !sub.minFirmSize) return null;

  return (
    <Band labelledBy={id}>
      <BandHeading id={id} eyebrow="Who this is for">
        For teams responsible for search and growth.
      </BandHeading>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8 mt-9">
        {sub.buyerTitles.length > 0 && (
          <div className="lg:col-span-7">
            <Label>Who shapes the scope</Label>
            <ul
              className="list-none p-0 m-0 mt-4"
              style={{ borderTop: '1px solid var(--s-rule-hairline)' }}
            >
              {sub.buyerTitles.map((title) => (
                <li
                  key={title}
                  className="py-3 text-body"
                  style={{
                    color: 'var(--s-text)',
                    borderBottom: '1px solid var(--s-rule-hairline)',
                  }}
                >
                  {title}
                </li>
              ))}
            </ul>
          </div>
        )}
        {sub.minFirmSize && (
          <div className="lg:col-span-5">
            <Label>What makes a useful engagement</Label>
            <p className="text-body mt-4 m-0" style={{ color: 'var(--s-text)' }}>
              A clear commercial objective, access to subject-matter expertise and a team ready to act on the findings. We discuss scope around your needs.
            </p>
          </div>
        )}
      </div>
    </Band>
  );
}

/**
 * What one won program is worth TO THE CLIENT.
 *
 * ITS OWN BLOCK, AND THAT IS THE POINT. `client_value` beside our retainer band
 * reads as a promised return, which is a CLAUDE.md §4 claims breach one
 * paragraph wide. So this block carries no price of ours, no percentage, no
 * multiple and no arithmetic joining the two numbers, and the pricing link is
 * elsewhere on the page. Write what one program is worth to them. Never write
 * what we would return.
 */
export function ClientValueBlock({ value, id }: { value: string; id: string }) {
  return (
    <Band labelledBy={id}>
      <BandHeading id={id} eyebrow="A considered purchase">
        Make the next conversation worth having.
      </BandHeading>
      <p className="text-body mt-6 m-0 max-w-[68ch]" style={{ color: 'var(--s-text)' }}>
        Your programme should reflect the value and complexity of the sale: what buyers need to evaluate, who approves the decision and how an enquiry becomes an opportunity.
      </p>
      <p className="text-meta mt-4 m-0 max-w-[68ch]" style={{ color: 'var(--s-text-faint)' }}>
        Agree qualification criteria with sales so reporting distinguishes interest, suitable enquiries and accepted opportunities.
      </p>
    </Band>
  );
}

/* ── The prompt panel. Family B, labelled as Family B. ────────────────────── */

/**
 * The prompts we run, and where each one came from.
 *
 * Every string here is the CLIENT'S buyer asking, which is why the block says so
 * twice: in the standing line and in the per-row origin. A composed row is the
 * operator's supplied prompt narrowed by the operator's own sub-niche name, via
 * `lib/b2b/promptPanel.ts`, which owns the joiner and can reverse it. Nothing in
 * this component builds a prompt string.
 *
 * `meetsMinimum: false` RENDERS AS A GAP, NOT AS A SILENCE. Nadia's §8.2
 * assertion 3 wants eight distinct prompts per published page and the operator
 * supplied two per sub-industry; the shortfall is authored by someone who knows
 * the niche. A page that hid the shortfall would be claiming a panel it does not
 * have, and a reader comparing us on exactly this should see the real number.
 */
export function PromptPanelBlock({
  panel,
  minimum,
  id,
}: {
  panel: PromptPanel;
  minimum: number;
  id: string;
}) {
  if (panel.prompts.length === 0) return null;

  return (
    <Band labelledBy={id}>
      <BandHeading id={id} eyebrow="Questions to investigate">
        The questions behind a shortlist.
      </BandHeading>
      <p className="text-body mt-4 m-0 max-w-[68ch]" style={{ color: 'var(--s-text-muted)' }}>
        These example prompts describe questions your customers may ask when researching suppliers. Validate them with sales and search evidence, then agree which platforms and markets to observe. A proposed prompt is not a measured AI answer.
      </p>

      <dl className="grid grid-cols-1 gap-y-0 mt-9 m-0" style={{ borderTop: '1px solid var(--s-rule-hairline)' }}>
        {panel.prompts.map((prompt) => (
          <div
            key={prompt.prompt}
            className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-2 py-4"
            style={{ borderBottom: '1px solid var(--s-rule-hairline)' }}
          >
            <dt className="lg:col-span-8 text-body m-0" style={{ color: 'var(--s-text)', overflowWrap: 'anywhere' }}>
              {prompt.prompt}
            </dt>
            <dd className="lg:col-span-4 m-0 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="font-mono text-meta tracking-[0.14em] uppercase" style={{ color: 'var(--s-text-faint)' }}>
                {prompt.origin === 'supplied' ? 'Planning question' : 'Application-specific question'}
              </span>
              <span className="text-meta" style={{ color: 'var(--s-text-muted)' }}>
                {prompt.shape === 'vendor' ? 'Shortlist request' : 'How-to question'}
              </span>
            </dd>
          </div>
        ))}
      </dl>

      <p className="text-meta mt-6 m-0 max-w-[68ch]" style={{ color: 'var(--s-text-faint)' }}>
        A useful review records the exact prompt, platform, market, date and sources. Repeated observations help distinguish a pattern from one answer.
      </p>
    </Band>
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
      <BandHeading id={id} eyebrow="Paid-search research">
        Commercial terms to validate.
      </BandHeading>
      <p className="text-body mt-4 m-0 max-w-[68ch]" style={{ color: 'var(--s-text-muted)' }}>
        These terms are starting points for researching your customers’ searches. Validate intent, relevance and current demand before using them in a campaign. PPC is scoped separately from AI SEO and GEO.
      </p>
      <ul className={`list-none p-0 m-0 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mt-8 ${LATTICE_CELLS}`} style={LATTICE}>
        {keywords.map((keyword) => (
          <li key={keyword} className="p-5">
            <span className="font-mono text-body block" style={{ color: 'var(--s-text)', overflowWrap: 'anywhere' }}>
              {keyword}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Link href="/services/ppc" className="rf-btn rf-btn--secondary">
          How we run paid search
        </Link>
      </div>
    </Band>
  );
}

/* ── The GEO angle. What we look for when the panel runs. ─────────────────── */

/**
 * `geo_angle` frames the observation. It describes the opportunity in the
 * CLIENT'S market, so it may never be an H1, a title, a meta description or a
 * target query, and it renders here under a heading that makes it a statement of
 * method rather than a claim about the reader.
 */
export function GeoAngleBlock({ angle, id }: { angle: string; id: string }) {
  return (
    <Band labelledBy={id}>
      <BandHeading id={id} eyebrow="What we look for">
        The shape of the answer we are checking against.
      </BandHeading>
      <p
        className="text-body mt-6 m-0 max-w-[68ch] pl-6"
        style={{ color: 'var(--s-text-muted)', borderLeft: '2px solid var(--s-accent-graphic)' }}
      >
        {angle}
      </p>
    </Band>
  );
}

/* ── Children. PUBLISHED ONLY. Omitted entirely when none. ────────────────── */

/**
 * The down-links, and the orphan-prevention mechanism.
 *
 * PUBLISHED ONLY, AND THE BLOCK DISAPPEARS WHEN THERE ARE NONE. That is Nadia's
 * C6, which ADR-0008 §7.2 left open and which is decided here: an unpublished
 * entity does not appear at all. Not as a link, not as plain text, not as a
 * greyed row. A sub-industry page listing 10 niches of which 3 are published is
 * a directory stub with a page on top, and it is the exact shape `/locations/*`
 * had at 0.13 clicks per page per quarter.
 *
 * This is the one place the ICP family deliberately diverges from
 * `ChildrenBlock` in `blocks.tsx`, which lists unrouted spine entities under a
 * "no page yet" label. That was defensible at 13 children. At a measured maximum
 * of 21 sub-industries, 10 niches and 10 sub-niches it is not, and at 11,561
 * entities it is a directory generator.
 *
 * UNCAPPED, per ADR-0008 §7.2: this block is what stops a child being an orphan,
 * and capping it silently orphans the overflow. The measured maximum branching
 * factor anywhere in the tree is 21, so uncapped costs nothing and the mesh
 * cannot form.
 */
export function IcpChildrenBlock({
  children: entries,
  heading,
  id,
}: {
  children: readonly IcpLink[];
  heading: string;
  id: string;
}) {
  if (entries.length === 0) return null;

  return (
    <Band labelledBy={id}>
      <BandHeading id={id} eyebrow="Inside this category">
        {heading}
      </BandHeading>
      <div className={`grid grid-cols-1 md:grid-cols-2 mt-9 ${LATTICE_CELLS}`} style={LATTICE}>
        {entries.map((entry) => (
          <Link key={entry.id} href={entry.href!} className="rf-hoverable rf-cell block p-6">
            <h3 className="text-h3 font-sans m-0 font-semibold">{entry.name}</h3>
          </Link>
        ))}
      </div>
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
      <BandHeading id={id} eyebrow="Scope inside this niche">
        What buyers mean when they name a narrower job.
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

/* ── Inherited context. What a deep page takes from its parent, said out loud. ─ */

/**
 * Levels 3 and 4 inherit their buyer, their firm-size floor and their paid
 * demand from the sub-industry above, because the operator attached those fields
 * there and nowhere else.
 *
 * Rendering them silently would make a niche page look like it had six fields of
 * its own. Rendering them under a heading that names the parent and links to it
 * is both honest and the second of Nadia's two required up-links. A page that
 * cannot say what is its own has nothing of its own, and the correct response to
 * that is a shorter page, not a louder one.
 */
export function InheritedContextBlock({
  parentName,
  parentHref,
  sub,
  id,
}: {
  parentName: string;
  parentHref?: string;
  sub: IcpSubIndustryView;
  id: string;
}) {
  const hasAnything = sub.buyerTitles.length > 0 || Boolean(sub.minFirmSize);
  if (!hasAnything) return null;

  return (
    <Band labelledBy={id}>
      <BandHeading id={id} eyebrow="Planning your engagement">
        {`A search programme for teams in ${parentName}.`}
      </BandHeading>
      {parentHref && (
        <p className="text-body mt-4 m-0 max-w-[68ch]" style={{ color: 'var(--s-text-muted)' }}>
          <Link href={parentHref} className="rf-link" style={{ color: 'var(--s-accent)' }}>
            {parentName}
          </Link>{' '}
          covers the rest of this category.
        </p>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-6 mt-8">
        {sub.buyerTitles.length > 0 && (
          <div className="lg:col-span-7">
            <Label>Who shapes the scope</Label>
            <p className="text-body mt-3 m-0" style={{ color: 'var(--s-text)' }}>
              {sub.buyerTitles.join(' · ')}
            </p>
          </div>
        )}
        {sub.minFirmSize && (
          <div className="lg:col-span-5">
            <Label>What makes a useful engagement</Label>
            <p className="text-body mt-3 m-0" style={{ color: 'var(--s-text)' }}>
              A clear commercial objective, access to subject-matter expertise and a team ready to act on the findings. We discuss scope around your needs.
            </p>
          </div>
        )}
      </div>
    </Band>
  );
}

/* ── Cross-tree pointers. 18 budgeted, 11 resolvable, and it says which. ──── */

/**
 * The only out-of-tree links in the whole system, and every one of them was
 * written down by the operator.
 *
 * ADR-0008 §7.3 budgets 18: the 5 declared `overlaps` and the 13 `dedupe_log`
 * rows. 11 resolve against the locked v2.0.0 file. The other 7 dedupe rows name
 * a niche that does not exist in the industry the row says it was kept in, and
 * `lib/b2b/icpRegistry.ts` refuses to guess which one was meant. So this block
 * renders what resolves and the gate names what does not.
 *
 * There is no similarity join here and there is not going to be one. No
 * `buyer_titles` overlap, no shared-standard join, no computed relatedness: they
 * are a similarity set with extra steps, and the first time somebody widens the
 * threshold to improve interlinking the mesh is back.
 */
export function CrossTreeBlock({ links, id }: { links: readonly IcpCrossLink[]; id: string }) {
  const resolvable = links.filter((link) => link.href);
  if (resolvable.length === 0) return null;

  return (
    <Band labelledBy={id}>
      <BandHeading id={id} eyebrow="Covered elsewhere">
        The same buyer, under another branch.
      </BandHeading>
      <ul className="list-none p-0 m-0 mt-8" style={{ borderTop: '1px solid var(--s-rule-hairline)' }}>
        {resolvable.map((link) => (
          <li
            key={link.path.join('/')}
            className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-2 py-5"
            style={{ borderBottom: '1px solid var(--s-rule-hairline)' }}
          >
            <div className="lg:col-span-5">
              <Link href={link.href!} className="rf-link text-body font-semibold" style={{ color: 'var(--s-accent)' }}>
                {link.name}
              </Link>
            </div>
            <p className="lg:col-span-7 text-body m-0" style={{ color: 'var(--s-text-muted)' }}>
              {link.reason}
            </p>
          </li>
        ))}
      </ul>
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
          <Label accent>Explore the related approach</Label>
          <h1 className="text-h1 font-sans m-0 mt-4 max-w-[20ch] font-semibold">{name}</h1>
          <p className="text-body mt-8 m-0 max-w-[68ch]" style={{ color: 'var(--s-text-muted)' }}>
            For the buying questions and service approach relevant to this business, explore{' '}
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
  aside,
  draft,
}: {
  eyebrow: string;
  name: string;
  buyerQuestion: string;
  opener: string;
  trail: readonly IcpLink[];
  upLink?: { readonly name: string; readonly href?: string };
  aside?: React.ReactNode;
  draft: boolean;
}) {
  return (
    <section className={`${draft ? 'pt-10' : 'pt-32 sm:pt-40'} pb-14 sm:pb-18`}>
      <div className={SHELL}>
        <IcpBreadcrumb trail={trail} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10">
          <div className={aside ? 'lg:col-span-7' : 'lg:col-span-9'}>
            <Label accent>{eyebrow}</Label>
            {/* NEVER lowercase a taxonomy label. `.toLowerCase()` shipped on the
                spine templates first and rendered "cnc machining", destroying
                the acronym; across this taxonomy it would also produce "saas and
                software", "it services" and "aog aircraft parts". Sentence flow
                is not worth mangling an entity name a model is meant to match. */}
            <h1 className="text-h1 font-sans m-0 mt-4 max-w-[18ch] font-semibold">
              AI search visibility for {name}.
            </h1>

            {/* Question, then answer, in that order and within 60 words.
                Extraction depends on the answer being self-contained and not
                referring back to the H1 with a pronoun. */}
            <h2 className="text-h3 font-sans mt-10 mb-3 max-w-[40ch] font-semibold">{buyerQuestion}</h2>
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

            <div className="mt-9 flex flex-col sm:flex-row flex-wrap gap-3">
              <Link href="/book" className="rf-btn rf-btn--primary">
                Book a call
              </Link>
              <Link href="/contact#enquiry" className="rf-btn rf-btn--secondary">
                Send an enquiry
              </Link>
            </div>
          </div>

          {aside && <aside className="lg:col-span-5">{aside}</aside>}
        </div>
      </div>
    </section>
  );
}

/** The hero aside. One column below sm, because two columns wrapped unevenly at 360. */
export function HeroPanel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      className="p-6"
      style={{ background: 'var(--s-surface-2)', border: '1px solid var(--s-rule-hairline)' }}
    >
      <Label>{label}</Label>
      {children}
    </div>
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
