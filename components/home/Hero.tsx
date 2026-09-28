import Link from 'next/link';
import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';
import { Shell } from './primitives';

/* Section 1 — Hero. Harvested from app/HomePage.tsx, retargeted.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * The subhead is part of the H1 claim. The H1 alone is an unsourced assertion
 * about buyer behaviour. Do not truncate, collapse on mobile, or ship one
 * without the other. Enforced in scripts/audit-headings.mjs.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * The H1 is the line recorded in CLAUDE.md §1. An earlier draft, still present
 * in docs/copy/home.md §1, read "We make sure it says you." That promises
 * placement in a third-party system, which §4 forbids and which Elena flagged
 * in docs/design/homepage-wireframe.md before anyone built it. CLAUDE.md §1
 * records the supersession and the reasoning. If docs/copy/home.md still says
 * otherwise when you read this, CLAUDE.md wins and the copy deck is stale.
 *
 * THE H1 IS PLAIN SERVER-RENDERED TEXT AT FULL OPACITY. MaskReveal wraps it but
 * .rf-mask only translates; it never sets opacity: 0. That is deliberate and
 * load-bearing twice: the page reads with JS off, and the H1 stays an LCP
 * candidate that nothing can delay. docs/design/motion.md §8.
 *
 * WHAT IS NOT HERE, AND WHY
 *
 * HeroRoiCalculator. 517 lines of client component outputting a projected
 * revenue figure. Under CLAUDE.md §4 that is a claim before it is a bundle
 * question, and docs/design/README.md Decision G removes the calculators. The
 * right-hand column is the four surfaces instead: the same visual weight, the
 * same "this is checkable" job, zero client JS and no invented number. If the
 * operator wants a calculator back on `/`, it is a claims decision first and a
 * lazy island second — the slot is free and the budget has room.
 *
 * HeroAurora / HeroDashboard. backdropFilter: blur(22px) at that radius is a
 * known mobile paint cost, and the cursor-driven tilt is pointer-only, so it is
 * invisible to most of the traffic while costing all of it the JS. Its data
 * still carries retired 4-spoke labels. ADR-0005 §2.
 *
 * MagneticBtn. It pulls framer-motion onto `/` for a 4px displacement, and the
 * budget stops being enforceable the moment that library is in the graph.
 */

/* Platform names identify the surfaces we measure. They are not customer logos,
   certifications or endorsements, and the line under the row says so. Reading a
   logo row as a client list is the default assumption a visitor makes about any
   agency homepage, so it has to be answered rather than left ambiguous. */
const ENGINES = [
  { name: 'ChatGPT', logo: '/brand-logos/ai-openai.svg' },
  { name: 'Perplexity', logo: '/brand-logos/ai-perplexity.svg' },
  { name: 'Gemini', logo: '/brand-logos/ai-gemini.svg' },
  { name: 'Claude', logo: '/brand-logos/ai-claude.svg' },
  { name: 'Google AI Overviews', logo: '/brand-logos/google.svg' },
];

const SURFACES = [
  { layer: 'AI SEO', where: 'Google AI Overviews and AI Mode' },
  { layer: 'GEO', where: 'ChatGPT, Perplexity, Gemini, Claude, Copilot' },
  { layer: 'SEO', where: 'Google search results' },
  { layer: 'Local SEO', where: 'Maps, the local pack, Business Profile, listings' },
];

export default function Hero() {
  return (
    <section
      data-theme="dark"
      className="relative overflow-hidden"
      style={{
        paddingTop: 'clamp(116px, 14vh, 156px)',
        paddingBottom: 'clamp(56px, 9vh, 96px)',
      }}
    >
      <Shell>
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-y-12 gap-x-10 xl:gap-x-16 items-center">
          <div className="min-w-0 flex flex-col items-start text-left">
            <ScrollReveal className="mb-6">
              <span className="rf-eyebrow rf-eyebrow--accent">AI search visibility for B2B firms</span>
            </ScrollReveal>

            {/* text-display is the canonical token. No inline font-size: the
                orphaned file set clamp(40px, 5.8vw, 84px) by hand, which is
                outside the scale and invisible to the typography gate because
                the gate reads className, not style. docs/design/tokens-dark.md §9. */}
            <h1 className="text-display font-sans m-0 max-w-[18ch]">
              <MaskReveal>Your buyers are asking ChatGPT who to hire.</MaskReveal>{' '}
              <MaskReveal delay={0.08}>
                <span style={{ color: 'var(--d-accent-display)' }}>
                  Most firms have never checked the answer.
                </span>
              </MaskReveal>
            </h1>

            <ScrollReveal stagger={2} className="mt-7">
              <p className="text-body m-0 max-w-[58ch]" style={{ color: 'var(--d-text-muted)' }}>
                We measure four surfaces: Google search, Google Maps and the local pack, Google AI
                Overviews and AI Mode, and the assistants your buyers use. Then we work on all four
                as one programme.
              </p>
            </ScrollReveal>

            <ScrollReveal stagger={3} className="mt-8 w-full">
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <Link href="/free-ai-audit" className="rf-btn rf-btn--primary">
                  Get your free AI visibility snapshot
                </Link>
                <Link href="/contact" className="rf-btn rf-btn--secondary">
                  Book a 20-minute walkthrough
                </Link>
              </div>
              <p className="text-meta mt-5 m-0 max-w-[58ch]" style={{ color: 'var(--d-text-faint)' }}>
                No card, no contract. We run a sample of your buyers’ prompts across the assistants,
                crawl your site, and send you what we saw with the date attached.
              </p>
            </ScrollReveal>

            <ScrollReveal stagger={4} className="mt-9 w-full">
              <p className="font-mono text-meta tracking-[0.16em] uppercase m-0 mb-4" style={{ color: 'var(--d-text-faint)' }}>
                Platforms we measure
              </p>
              <ul className="list-none p-0 m-0 flex flex-wrap items-center gap-2">
                {ENGINES.map((e) => (
                  <li
                    key={e.name}
                    className="inline-flex items-center gap-2 py-1.5 pl-2 pr-3"
                    style={{ border: '1px solid var(--d-rule-strong)' }}
                  >
                    <img
                      src={e.logo}
                      alt=""
                      aria-hidden="true"
                      width={16}
                      height={16}
                      className="h-4 w-4 object-contain"
                    />
                    <span className="text-meta" style={{ color: 'var(--d-text-muted)' }}>
                      {e.name}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-meta mt-4 m-0 max-w-[58ch]" style={{ color: 'var(--d-text-faint)' }}>
                Platform names identify discovery surfaces. They are not customer logos,
                certifications or endorsements.
              </p>
            </ScrollReveal>
          </div>

          {/* The right column. A real, checkable list of what is measured,
              standing where the orphaned design put a projected-revenue
              calculator. It is the same visual device — a bordered panel with a
              mono header and a hairline lattice — carrying a fact instead of a
              forecast. No client JS. */}
          <ScrollReveal stagger={2} className="min-w-0 w-full lg:justify-self-end lg:max-w-[520px]">
            <aside
              aria-labelledby="hero-surfaces-heading"
              style={{ background: 'var(--d-surface-1)', border: '1px solid var(--d-rule)' }}
            >
              <div
                className="flex items-center justify-between px-6 py-4"
                style={{ borderBottom: '1px solid var(--d-rule-hairline)' }}
              >
                <h2
                  id="hero-surfaces-heading"
                  className="text-h4 font-mono font-normal tracking-[0.14em] uppercase m-0"
                  style={{ color: 'var(--d-text-faint)' }}
                >
                  What we measure
                </h2>
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: 'var(--d-accent-graphic)', animation: 'rf-pulse 2s ease-in-out infinite' }}
                  aria-hidden="true"
                />
              </div>

              <div className="px-6 py-5" style={{ borderBottom: '1px solid var(--d-rule-hairline)' }}>
                <p className="font-mono text-meta tracking-[0.14em] uppercase m-0" style={{ color: 'var(--d-text-faint)' }}>
                  The sales line
                </p>
                <p className="text-h3 font-sans m-0 mt-3 font-medium" style={{ color: 'var(--d-text)' }}>
                  You rank in Maps, but ChatGPT names your competitor.
                </p>
              </div>

              <ul className="list-none p-0 m-0">
                {SURFACES.map((s) => (
                  <li
                    key={s.layer}
                    className="flex items-baseline gap-4 px-6 py-4"
                    style={{ borderBottom: '1px solid var(--d-rule-hairline)' }}
                  >
                    <span
                      className="font-mono text-meta tracking-[0.1em] uppercase w-[76px] sm:w-[92px] flex-shrink-0"
                      style={{ color: 'var(--d-accent)' }}
                    >
                      {s.layer}
                    </span>
                    <span className="text-meta" style={{ color: 'var(--d-text-muted)' }}>
                      {s.where}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="text-meta px-6 py-4 m-0" style={{ color: 'var(--d-text-faint)' }}>
                All four are in every retainer. Tiers differ by scope, not by layer.
              </p>
            </aside>
          </ScrollReveal>
        </div>
      </Shell>
    </section>
  );
}
