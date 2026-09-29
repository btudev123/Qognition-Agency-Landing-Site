import Link from 'next/link';
import type { ReactNode } from 'react';
import type {
  BuyerRole,
  ClientProof,
  ComparisonAxis,
  Fact,
  Faq,
  VocabularyTerm,
} from '../../data/b2b/types';
import { SERVICE_LINKS, type ChildEntry } from '../../lib/b2b/graph';

/* Server-only blocks shared by the two B2B industry templates.
 *
 * Every export here is a server component. None holds state, none has an event
 * handler, and none may acquire either — the same rule components/home/primitives.tsx
 * sets, for the same reason: these pages are the crawl target and they ship no
 * client JS. ADR-0005 §2.
 *
 * DENSITY IS THE BRIEF. These pages are read by a commercial leader who is
 * comparing suppliers, not skimmed by a visitor deciding whether to scroll. The
 * lattice grids below are deliberately tight; whitespace that looks generous in
 * a screenshot is what makes a buyer scroll past the fact they came for.
 *
 * THE LATTICE. One shared 1px rule — border-top and border-left on the
 * container, border-right and border-bottom on each cell — so seams never double
 * up. A `gap-px` over a background colour paints a 2px seam wherever a cell is
 * missing at a breakpoint, which is the defect Industries.tsx documents.
 */

export const SHELL = 'mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10';

export function Label({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <span
      className="font-mono text-meta tracking-[0.14em] uppercase"
      style={{ color: accent ? 'var(--s-accent)' : 'var(--s-text-faint)' }}
    >
      {children}
    </span>
  );
}

/* THE LATTICE, and the direction matters.
 *
 * Cells draw their TOP and LEFT rule; the container draws the outer RIGHT and
 * BOTTOM. The obvious inverse — container top+left, cells right+bottom — was
 * written first and it breaks the frame whenever the last row is partial: eight
 * vocabulary terms in a three-column grid leave one empty slot, and with
 * cell-drawn right borders the outer edge of the grid simply stops there. It
 * reads as a rendering fault, which is the exact defect Industries.tsx documents
 * for the same lattice. Found at 1280px, in a screenshot.
 *
 * This direction closes the frame on all four sides for any item count at any
 * column count, and the empty slot has no interior rules, which reads as an
 * open cell inside a closed frame rather than as a hole. No doubled seams,
 * because each rule is drawn exactly once. */
const LATTICE = {
  borderRight: '1px solid var(--s-rule-hairline)',
  borderBottom: '1px solid var(--s-rule-hairline)',
};
const LATTICE_CELLS =
  '[&>*]:border-t [&>*]:border-l [&>*]:border-[var(--s-rule-hairline)]';

/** A light content band. The dark bands are the observation block and the CTA. */
export function Band({
  children,
  id,
  labelledBy,
  dark = false,
}: {
  children: ReactNode;
  id?: string;
  labelledBy?: string;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-theme={dark ? 'dark' : undefined}
      className="py-14 sm:py-18"
      style={{ borderTop: '1px solid var(--s-rule-hairline)' }}
    >
      <div className={SHELL}>{children}</div>
    </section>
  );
}

export function BandHeading({ id, eyebrow, children }: { id: string; eyebrow: string; children: ReactNode }) {
  return (
    <>
      <Label>{eyebrow}</Label>
      <h2 id={id} className="text-h2 font-sans m-0 mt-3 max-w-[26ch] font-semibold">
        {children}
      </h2>
    </>
  );
}

/* ── The buyer, named. Nadia §4.1 block 2. ────────────────────────────────── */

export function BuyersBlock({ buyers, id }: { buyers: readonly BuyerRole[]; id: string }) {
  return (
    <Band labelledBy={id}>
      <BandHeading id={id} eyebrow="Who is actually searching">
        Four people decide this, and only one of them is our customer.
      </BandHeading>
      <p className="text-body mt-4 m-0 max-w-[68ch]" style={{ color: 'var(--s-text-muted)' }}>
        The first three are your buyers. The fourth is ours. Keeping them apart is the whole
        discipline of this page: the questions your buyer asks are questions we measure, never
        questions we try to rank for.
      </p>
      <div className={`grid grid-cols-1 md:grid-cols-2 mt-9 ${LATTICE_CELLS}`} style={LATTICE}>
        {buyers.map((b, i) => (
          <article key={b.title} className="p-6">
            <span className="font-mono text-meta tabular-nums" style={{ color: 'var(--s-text-faint)' }}>
              {String(i + 1).padStart(2, '0')} / {String(buyers.length).padStart(2, '0')}
            </span>
            <h3 className="text-h3 font-sans mt-3 mb-2 font-semibold">{b.title}</h3>
            <p className="text-body m-0 max-w-[58ch]" style={{ color: 'var(--s-text-muted)' }}>
              {b.researches}
            </p>
          </article>
        ))}
      </div>
    </Band>
  );
}

/* ── Sourced facts. Every claim carries its primary. CLAUDE.md §4. ─────────── */

export function FactsBlock({ facts, id }: { facts: readonly Fact[]; id: string }) {
  return (
    <Band labelledBy={id}>
      <BandHeading id={id} eyebrow="What is true, and where it came from">
        Dated facts, each with the source it came from.
      </BandHeading>
      <p className="text-body mt-4 m-0 max-w-[68ch]" style={{ color: 'var(--s-text-muted)' }}>
        Every claim below links to the publisher we read it at, with the date we read it and whether
        we reached the primary source or a secondary restating it. Where we could not verify an
        edition year or a deadline, the page says the standard and omits the number rather than
        guessing at it.
      </p>
      {/* Single column, so this is a rule-separated list rather than a lattice:
          each row draws its own top rule and the container closes the bottom.
          Using the lattice helper here would draw a vertical rule with nothing
          on the other side of it. */}
      <ol
        className={`list-none p-0 m-0 mt-9 grid grid-cols-1 ${LATTICE_CELLS}`}
        style={{ borderBottom: '1px solid var(--s-rule-hairline)' }}
      >
        {facts.map((f, i) => (
          <li
            key={f.claim.slice(0, 48)}
            className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-4 p-6"
          >
            <div className="lg:col-span-7">
              <span className="font-mono text-meta tabular-nums" style={{ color: 'var(--s-accent)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-body mt-2 m-0" style={{ color: 'var(--s-text)' }}>
                {f.claim}
              </p>
            </div>
            <div className="lg:col-span-5">
              <Label>
                {f.source.confidence === 'observed' ? 'Primary read' : 'Reported by a secondary'}
              </Label>
              <p className="text-meta mt-2 mb-1" style={{ color: 'var(--s-text-muted)' }}>
                {f.source.publisher}
              </p>
              <a
                href={f.source.url}
                rel="nofollow noopener noreferrer"
                target="_blank"
                className="text-meta font-mono block"
                style={{ color: 'var(--s-accent)', overflowWrap: 'anywhere' }}
              >
                {f.source.url}
              </a>
              <p className="text-meta mt-1 m-0 font-mono tabular-nums" style={{ color: 'var(--s-text-faint)' }}>
                Accessed {f.source.accessedAt}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Band>
  );
}

/* ── Vocabulary. Type B only. Nadia §4.1 block 5. ─────────────────────────── */

export function VocabularyBlock({ terms, id }: { terms: readonly VocabularyTerm[]; id: string }) {
  return (
    <Band labelledBy={id}>
      <BandHeading id={id} eyebrow="The vocabulary a buyer filters on">
        Get one of these wrong and an engineer stops reading.
      </BandHeading>
      <p className="text-body mt-4 m-0 max-w-[68ch]" style={{ color: 'var(--s-text-muted)' }}>
        A wrong standard name is a competence signal to a human and a different entity to a model.
        Each term below is listed with the body that issues it and what it actually gates, because
        &ldquo;we are certified&rdquo; answers none of the questions a buyer has.
      </p>
      <dl className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-9 m-0 ${LATTICE_CELLS}`} style={LATTICE}>
        {terms.map((t) => (
          <div key={t.term} className="p-5">
            <dt className="text-h4 font-semibold" style={{ color: 'var(--s-text)' }}>
              {t.term}
            </dt>
            <dd className="m-0 mt-2">
              <span className="font-mono text-meta tracking-[0.1em] uppercase block" style={{ color: 'var(--s-text-faint)' }}>
                {t.issuedBy}
              </span>
              <span className="text-meta block mt-2" style={{ color: 'var(--s-text-muted)' }}>
                {t.gates}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </Band>
  );
}

/* ── Comparison axes. Type B only. Axes, not benefits. ────────────────────── */

export function AxesBlock({ axes, id }: { axes: readonly ComparisonAxis[]; id: string }) {
  return (
    <Band labelledBy={id}>
      <BandHeading id={id} eyebrow="What they compare you on">
        Five axes, and none of them is &ldquo;quality&rdquo;.
      </BandHeading>
      <ol className="list-none p-0 m-0 mt-9" style={{ borderTop: '1px solid var(--s-rule-hairline)' }}>
        {axes.map((a, i) => (
          <li
            key={a.axis}
            className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-2 py-5"
            style={{ borderBottom: '1px solid var(--s-rule-hairline)' }}
          >
            <span className="md:col-span-1 font-mono text-meta tabular-nums" style={{ color: 'var(--s-text-faint)' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="text-h3 font-sans md:col-span-4 m-0 font-semibold">{a.axis}</h3>
            <p className="text-body md:col-span-7 m-0" style={{ color: 'var(--s-text-muted)' }}>
              {a.whatBuyersAsk}
            </p>
          </li>
        ))}
      </ol>
    </Band>
  );
}

/* ── Why the answer is lost. One failure mechanism, not a list of tips. ───── */

export function WhyLostBlock({ text, id }: { text: string; id: string }) {
  return (
    <Band labelledBy={id}>
      <BandHeading id={id} eyebrow="Why the answer goes elsewhere">
        The mechanism, not the symptom.
      </BandHeading>
      <p
        className="text-body mt-6 m-0 max-w-[68ch] pl-6"
        style={{ color: 'var(--s-text-muted)', borderLeft: '2px solid var(--s-accent-graphic)' }}
      >
        {text}
      </p>
    </Band>
  );
}

/* ── Children. Hub only. Every sub-niche listed, routable ones linked. ────── */

export function ChildrenBlock({
  children: entries,
  verticalLabel,
  id,
}: {
  children: readonly ChildEntry[];
  verticalLabel: string;
  id: string;
}) {
  const linked = entries.filter((e) => e.href);
  const listed = entries.filter((e) => !e.href);

  return (
    <Band labelledBy={id}>
      <BandHeading id={id} eyebrow="Inside this vertical">
        {entries.length} kinds of firm we sell to in {verticalLabel}.
      </BandHeading>
      <p className="text-body mt-4 m-0 max-w-[68ch]" style={{ color: 'var(--s-text-muted)' }}>
        A row here is a kind of firm, not a claim of experience in it. Where a page exists it is
        linked. Where one does not, the row is still listed, because truncating the list to only
        what we have written would misrepresent what we cover.
      </p>

      {linked.length > 0 && (
        <div className={`grid grid-cols-1 md:grid-cols-2 mt-9 ${LATTICE_CELLS}`} style={LATTICE}>
          {linked.map((c) => (
            <Link key={c.id} href={c.href!} className="rf-hoverable rf-cell block p-6">
              <span className="rf-cell-meta font-mono text-meta tracking-[0.14em] uppercase">
                Page published
              </span>
              <h3 className="text-h3 font-sans mt-3 mb-2 font-semibold">{c.label}</h3>
              {c.geoAngle && (
                <p className="text-meta m-0" style={{ color: 'var(--s-text-muted)' }}>
                  {c.geoAngle}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}

      {listed.length > 0 && (
        <div className="mt-10">
          <Label>No page yet</Label>
          {/* A plain list, not a grid of cards. Cards imply destinations, and
              these have none — linking a spine entity would 404, because
              dynamicParams is false on this route. */}
          <ul className="list-none p-0 m-0 mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8">
            {listed.map((c) => (
              <li
                key={c.id}
                className="py-3"
                style={{ borderBottom: '1px solid var(--s-rule-hairline)' }}
              >
                <span className="text-body block" style={{ color: 'var(--s-text)' }}>
                  {c.label}
                </span>
                {c.examples && c.examples.length > 0 && (
                  <span className="text-meta block mt-1" style={{ color: 'var(--s-text-faint)' }}>
                    {c.examples.join(' · ')}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Band>
  );
}

/* ── Siblings. Type B. Omitted entirely when none resolves. ───────────────── */

export function SiblingsBlock({ siblings, id }: { siblings: readonly ChildEntry[]; id: string }) {
  /* The empty state here is absence. A block saying "no related pages yet" is a
     dead end rendered as content; the reader already has the hub link in the
     breadcrumb and in the first paragraph. */
  if (siblings.length === 0) return null;

  return (
    <Band labelledBy={id}>
      <BandHeading id={id} eyebrow="Nearby">
        Other niches in this vertical.
      </BandHeading>
      <ul className={`list-none p-0 m-0 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-8 ${LATTICE_CELLS}`} style={LATTICE}>
        {siblings.map((s) => (
          <li key={s.id}>
            <Link href={s.href!} className="rf-hoverable rf-cell block p-5">
              <span className="text-body font-semibold">{s.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Band>
  );
}

/* ── The four layers, one fixed block, same order everywhere. ─────────────── */

export function ServiceLinksBlock({ id }: { id: string }) {
  return (
    <Band labelledBy={id}>
      <BandHeading id={id} eyebrow="The four surfaces">
        All four are in the retainer. They are never sold apart.
      </BandHeading>
      <p className="text-body mt-4 m-0 max-w-[68ch]" style={{ color: 'var(--s-text-muted)' }}>
        Paid media sits alongside these rather than inside them, because it is priced against ad
        spend and these are priced by scope.
      </p>
      <ul className={`list-none p-0 m-0 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 mt-8 ${LATTICE_CELLS}`} style={LATTICE}>
        {SERVICE_LINKS.map((s) => (
          <li key={s.href}>
            <Link href={s.href} className="rf-hoverable rf-cell block p-5 h-full">
              <span className="rf-cell-meta font-mono text-meta tracking-[0.14em] uppercase">
                {s.label}
              </span>
              <span className="text-body block mt-2">{s.surface}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Band>
  );
}

/* ── Proof, or its absence, stated. CLAUDE.md §11. ────────────────────────── */

export function ProofBlock({ proof, id }: { proof: ClientProof; id: string }) {
  return (
    <Band labelledBy={id}>
      <BandHeading id={id} eyebrow="Proof">
        {proof.kind === 'case-study' ? 'A published engagement in this niche.' : 'We have not done this here.'}
      </BandHeading>
      {proof.kind === 'none' ? (
        <>
          <p
            className="text-body mt-6 m-0 max-w-[68ch] pl-6"
            style={{ color: 'var(--s-text-muted)', borderLeft: '2px solid var(--s-rule-strong)' }}
          >
            {proof.statement}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/case-studies/methodology" className="rf-btn rf-btn--secondary">
              How we evidence a result
            </Link>
          </div>
        </>
      ) : (
        <div className="mt-7">
          <Link href={`/case-studies/${proof.caseStudyId}`} className="rf-btn rf-btn--secondary">
            Read the case study
          </Link>
        </div>
      )}
    </Band>
  );
}

/* ── FAQs. Real questions from sales calls, not a schema farm. ────────────── */

export function FaqsBlock({ faqs, id }: { faqs: readonly Faq[]; id: string }) {
  return (
    <Band labelledBy={id}>
      <BandHeading id={id} eyebrow="Asked on calls">
        The questions that actually come up.
      </BandHeading>
      {/* <details> rather than a JS accordion: it opens without JavaScript, it is
          keyboard operable for free, and the answer text is in the served HTML
          so it is extractable whether or not anything runs. */}
      <div className="mt-8" style={{ borderTop: '1px solid var(--s-rule-hairline)' }}>
        {faqs.map((f) => (
          <details key={f.question} className="group" style={{ borderBottom: '1px solid var(--s-rule-hairline)' }}>
            <summary className="cursor-pointer list-none py-5 flex gap-5 items-start justify-between">
              <h3 className="text-h3 font-sans m-0 font-semibold max-w-[52ch]">{f.question}</h3>
              <span
                aria-hidden="true"
                className="font-mono flex-shrink-0 pt-1"
                style={{ color: 'var(--s-accent)' }}
              >
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:inline">&minus;</span>
              </span>
            </summary>
            <p className="text-body pb-6 m-0 max-w-[68ch]" style={{ color: 'var(--s-text-muted)' }}>
              {f.answer}
            </p>
          </details>
        ))}
      </div>
    </Band>
  );
}

/* ── The conversion event. One primary CTA, niche-specific question. ──────── */

export function SnapshotCta({ question, id }: { question: string; id: string }) {
  return (
    <section
      data-theme="dark"
      aria-labelledby={id}
      className="py-16 sm:py-24"
      style={{ borderTop: '1px solid var(--s-rule-hairline)' }}
    >
      <div className={SHELL}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8">
          <div className="lg:col-span-7">
            <Label>Start here</Label>
            <h2 id={id} className="text-h2 font-sans m-0 mt-3 max-w-[22ch] font-semibold">
              {question}
            </h2>
            <p className="text-body mt-5 m-0 max-w-[58ch]" style={{ color: 'var(--s-text-muted)' }}>
              The snapshot answers it with a run rather than an opinion: your prompt set, the four
              platforms, who was named, what was cited, and the date it happened. No card, no
              commitment, and the limits stated on the same page as the findings.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
              <Link href="/free-ai-audit" className="rf-btn rf-btn--primary">
                Get your free snapshot
              </Link>
              <Link href="/contact" className="rf-btn rf-btn--secondary">
                Ask a question first
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <ul
              className="list-none p-0 m-0"
              style={{ borderTop: '1px solid var(--s-rule-hairline)' }}
            >
              {[
                ['48 hours', 'From your prompt set to the record.'],
                ['4 platforms', 'ChatGPT, Perplexity, Gemini, Google AI Overviews.'],
                ['0 guarantees', 'We do not control these systems and will not pretend to.'],
              ].map(([k, v]) => (
                <li
                  key={k}
                  className="flex gap-5 py-4"
                  style={{ borderBottom: '1px solid var(--s-rule-hairline)' }}
                >
                  <span
                    className="font-mono tabular-nums flex-shrink-0 text-body font-semibold"
                    style={{ color: 'var(--s-accent)', minWidth: '6.5rem' }}
                  >
                    {k}
                  </span>
                  <span className="text-meta" style={{ color: 'var(--s-text-muted)' }}>
                    {v}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
