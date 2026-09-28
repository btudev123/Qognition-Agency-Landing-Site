import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';
import { Eyebrow, GhostWord, Shell } from './primitives';

/* Section 4 — Four surfaces, four different jobs. docs/copy/home.md §4.
 *
 * Replaces `FourSpokes` in the orphaned app/HomePage.tsx, which rendered eleven
 * service cards from the retired hub-and-spokes model. That model is dead
 * (CLAUDE.md §11 anti-pattern 1) and its copy claimed "one partner" for eleven
 * services we no longer sell as eleven things.
 *
 * REAL <table> MARKUP, DELIBERATELY. This block is the one on the page most
 * likely to be lifted verbatim by a retrieval system, which is the entire
 * product. A model can parse a <table> with a <caption> and scoped headers; it
 * cannot parse four divs pretending to be rows. Theo's build note in
 * docs/copy/home.md says so explicitly. Do not "improve" this into a card grid.
 *
 * Emphasis order is CLAUDE.md §1: AI SEO and GEO first, SEO and Local SEO as
 * the supporting layers that make them work. Never blur AI SEO and GEO; they
 * are different surfaces run by different systems.
 *
 * The four layers are not linked. /seo, /local-seo, /ai-seo and /geo are in the
 * §5 route plan and do not exist yet. Theo's copy carries a link line for them;
 * it is omitted here rather than pointed at /services/*, which §5 lists as
 * being consolidated.
 */

const LAYERS = [
  {
    layer: 'AI SEO',
    surface: 'Google AI Overviews and AI Mode',
    moves: 'Passage-level clarity, entity definition, content Google can extract and attribute',
  },
  {
    layer: 'GEO',
    surface: 'ChatGPT, Perplexity, Gemini, Claude, Copilot',
    moves: 'What third-party sources say about you, and whether your entity is unambiguous',
  },
  {
    layer: 'SEO',
    surface: 'Google search results',
    moves: 'Technical health, page structure, topical depth, links',
  },
  {
    layer: 'Local SEO',
    surface: 'Google Maps, the local pack, Bing Places, Business Profile, reviews, listings',
    moves: 'Profile completeness, categories, review velocity, listing consistency',
  },
];

export default function FourLayers() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28" style={{ borderTop: '1px solid var(--s-rule-hairline)' }}>
      <GhostWord>SURFACES</GhostWord>

      <Shell>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
          <ScrollReveal className="lg:col-span-6">
            <Eyebrow accent>The four layers</Eyebrow>
            <h2 className="text-h2 font-sans m-0 mt-4 font-semibold">
              <MaskReveal>Four surfaces,</MaskReveal>
              <br />
              <MaskReveal delay={0.08}>four different jobs.</MaskReveal>
            </h2>
          </ScrollReveal>
          <ScrollReveal stagger={2} className="lg:col-span-6">
            <p className="text-body m-0 max-w-[62ch]" style={{ color: 'var(--s-text-muted)' }}>
              Most of this industry uses these four words interchangeably. They are four different
              places, run by different systems, and they respond to different work.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal stagger={3} className="mt-12">
          {/* Wide content scrolls inside itself, never the page body. Without
              this the 3-column table forces a horizontal scrollbar on the whole
              document below about 700px. */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-left">
              <caption className="sr-only">
                The four search surfaces Qognition works on, what each one is, and what moves it
              </caption>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--s-rule)' }}>
                  <th
                    scope="col"
                    className="font-mono text-meta tracking-[0.14em] uppercase font-normal py-3 pr-6 align-bottom w-[16%]"
                    style={{ color: 'var(--s-text-faint)' }}
                  >
                    Layer
                  </th>
                  <th
                    scope="col"
                    className="font-mono text-meta tracking-[0.14em] uppercase font-normal py-3 pr-6 align-bottom w-[38%]"
                    style={{ color: 'var(--s-text-faint)' }}
                  >
                    The surface
                  </th>
                  <th
                    scope="col"
                    className="font-mono text-meta tracking-[0.14em] uppercase font-normal py-3 align-bottom"
                    style={{ color: 'var(--s-text-faint)' }}
                  >
                    What actually moves it
                  </th>
                </tr>
              </thead>
              <tbody>
                {LAYERS.map((l) => (
                  <tr key={l.layer} style={{ borderBottom: '1px solid var(--s-rule-hairline)' }}>
                    <th
                      scope="row"
                      className="text-h4 font-sans font-semibold py-6 pr-6 align-top"
                      style={{ color: 'var(--s-accent)' }}
                    >
                      {l.layer}
                    </th>
                    <td className="text-body py-6 pr-6 align-top" style={{ color: 'var(--s-text)' }}>
                      {l.surface}
                    </td>
                    <td className="text-body py-6 align-top" style={{ color: 'var(--s-text-muted)' }}>
                      {l.moves}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        <ScrollReveal stagger={4}>
          <p className="text-body mt-10 m-0 max-w-[72ch]" style={{ color: 'var(--s-text-muted)' }}>
            All four are in every retainer. We do not sell them separately, because the last two do
            not work without the first two. Tiers differ by scope: locations covered, prompts
            tracked, assets produced.
          </p>
        </ScrollReveal>
      </Shell>
    </section>
  );
}
