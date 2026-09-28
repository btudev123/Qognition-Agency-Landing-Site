import Link from 'next/link';
import HeroSnapshotPanel from './HeroSnapshotPanel';
import { Shell } from './primitives';

/* Section 1 — Hero. Harvested from app/HomePage.tsx, retargeted.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * THE H1 RULE, AND WHY THE GATE EXISTS.
 *
 * No hero line may assert a present state of a third-party AI system.
 *
 * The H1 used to read "Your buyers are asking ChatGPT who to hire" and needed a
 * subhead — "Most firms have never checked the answer" — to stop it being a
 * bare, unsourced assertion about buyer behaviour with no platform, prompt set
 * or date under it. Ruth gated the pair as indivisible for exactly that reason.
 *
 * The operator then cut the subhead. Keeping the old H1 without it would have
 * reinstated the claim the gate removed, so the H1 changed instead: it now
 * describes OUR work rather than the state of someone else's system. A claim
 * about what we do is verifiable on its face and needs no grounding sentence,
 * which is also why the hero is now short.
 *
 * So there is no longer a coupled pair to protect. What scripts/audit-headings.mjs
 * enforces instead is the rule itself: the H1 must not contain a present-state
 * assertion about ChatGPT, AI or buyers. Do not "put the tension back" into this
 * headline. The tension belongs in the section below it, where it has a source.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * THE H1 IS PLAIN SERVER-RENDERED TEXT AT FULL OPACITY, AND IT DOES NOT REVEAL.
 * Two reasons. It is the LCP element and nothing may delay it. And an
 * IntersectionObserver entrance on an above-fold element does no work even when
 * it functions, because the element is already in view on first paint.
 * Everything below the fold reveals; the hero does not.
 * docs/design/motion.md §4 row 1.
 *
 * WHAT IS NOT HERE, AND WHY
 *
 * HeroRoiCalculator. The panel on the right is the one thing in this hero that
 * changes, and it changes because its contents were a projected revenue figure
 * with no measurement behind it. Under CLAUDE.md §4 that is a claims decision
 * before it is a bundle one, and §9 bans decorative dashboards with invented
 * metrics outright. The frame, the position and the visual weight are kept
 * exactly; HeroSnapshotPanel occupies the same space with the offer the whole
 * funnel points at, and ships no client JS.
 *
 * HeroAurora / HeroDashboard. blur(22px) at that radius is a known mobile paint
 * cost for an effect only pointer users ever see, and its data still carries
 * retired 4-spoke labels.
 *
 * MagneticBtn. Pulls framer-motion onto `/` for a 4px displacement, and the
 * budget in ADR-0005 §5 stops being enforceable once that library is in the
 * graph.
 *
 * LAYOUT, THE THREE SIZES THAT WERE ACTUALLY SPECIFIED
 *
 * Mobile 360–430: one column. DOM order is badge, H1, CTAs, panel, chips, which
 * puts the primary CTA above the fold on a 360×640 screen with the offer
 * immediately under it. CTAs stack full width and are never two 48% buttons —
 * at 390px that gives two eight-character labels.
 *
 * Laptop 1280×800: the whole hero, score card included, has to clear browser
 * chrome. Top padding is a clamp that resolves near its floor at that height
 * rather than a fixed 156px, and the chip row wraps rather than forcing the
 * column taller.
 *
 * Desktop 1920: Shell caps at 1440 and the H1 is capped in ch, so the type
 * never stretches into a thin strip. The 1.05fr/0.95fr split lets the card grow
 * with the viewport, so the composition holds the width instead of leaving a
 * void beside a column of text.
 */

/* Platform names identify the surfaces we sample. They are not customer logos,
   certifications or endorsements, and the line under the row says so, because
   reading a logo row as a client list is the default assumption a visitor makes
   on any agency homepage.

   The previous label was "Built to win citations in", which promises citations
   in a system we do not control. CLAUDE.md §4. */
const ENGINES = [
  { name: 'ChatGPT', logo: '/brand-logos/ai-openai.svg' },
  { name: 'Perplexity', logo: '/brand-logos/ai-perplexity.svg' },
  { name: 'Gemini', logo: '/brand-logos/ai-gemini.svg' },
  { name: 'Claude', logo: '/brand-logos/ai-claude.svg' },
  { name: 'Google AI', logo: '/brand-logos/google.svg' },
];

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
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-y-10 gap-x-10 xl:gap-x-16 items-center">
          <div className="min-w-0 flex flex-col items-start text-left">
            <span className="rf-eyebrow rf-eyebrow--accent mb-6">AI SEO and GEO for B2B firms</span>

            {/* text-display is the canonical token. No inline font-size: the
                orphaned file set clamp(40px, 5.8vw, 84px) by hand, which is
                outside the scale and invisible to the typography gate, because
                the gate reads className and not style. tokens-dark.md §9. */}
            <h1 className="text-display font-sans m-0 max-w-[15ch]">
              We show you what AI says{' '}
              <span style={{ color: 'var(--s-accent-display)' }}>about your firm.</span>
            </h1>

            <div className="mt-8 w-full flex flex-col sm:flex-row sm:flex-wrap gap-3">
              <Link href="/free-ai-audit" className="rf-btn rf-btn--primary w-full sm:w-auto">
                Get your free snapshot
              </Link>
              <Link href="/contact" className="rf-btn rf-btn--secondary w-full sm:w-auto">
                Book a 20-minute walkthrough
              </Link>
            </div>

            {/* Rendered here in DOM order below lg, directly under the CTAs,
                and hidden from lg up where the right-hand column takes over.
                One component rendered at two positions rather than two
                implementations to keep in step. It stays cheap enough to render
                twice because it is server-only with no images. */}
            <div className="lg:hidden w-full mt-10">
              <HeroSnapshotPanel />
            </div>

            <div className="mt-10 w-full">
              <p
                className="font-mono text-meta tracking-[0.16em] uppercase m-0 mb-4"
                style={{ color: 'var(--s-text-faint)' }}
              >
                Platforms we sample
              </p>
              <ul className="list-none p-0 m-0 flex flex-wrap items-center gap-2">
                {ENGINES.map((e) => (
                  <li
                    key={e.name}
                    className="inline-flex items-center gap-2 py-1.5 pl-2 pr-3"
                    style={{ border: '1px solid var(--s-rule-strong)' }}
                  >
                    <img
                      src={e.logo}
                      alt=""
                      aria-hidden="true"
                      width={16}
                      height={16}
                      className="h-4 w-4 object-contain"
                    />
                    <span className="text-meta" style={{ color: 'var(--s-text-muted)' }}>
                      {e.name}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-meta mt-4 m-0 max-w-[58ch]" style={{ color: 'var(--s-text-faint)' }}>
                Platform names identify the surfaces we sample. They are not customer logos,
                certifications or endorsements.
              </p>
            </div>
          </div>

          <div className="hidden lg:block min-w-0 w-full lg:justify-self-end lg:max-w-[520px]">
            <HeroSnapshotPanel />
          </div>
        </div>
      </Shell>
    </section>
  );
}
