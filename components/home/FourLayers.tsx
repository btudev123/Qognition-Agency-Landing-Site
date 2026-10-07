import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';
import { Eyebrow, GhostWord, Shell } from './primitives';


const LAYERS = [
  {
    layer: 'AI SEO',
    surface: 'Google AI Overviews and AI Mode',
    moves: 'Passage-level clarity, entity definition, content Google can extract and attribute',
  },
  {
    layer: 'GEO',
    surface: 'ChatGPT, Perplexity, Gemini, Claude, Copilot',
    moves: 'What your site states, what third-party sources say about you, and whether your company name resolves to you',
  },
  {
    layer: 'SEO',
    surface: 'Google search results',
    moves: 'Technical health, page structure, topical depth, links',
  },
  {
    layer: 'Local SEO',
    surface: 'Google Maps, local pack, Bing Places, Business Profile, reviews, listings',
    moves: 'Accurate profiles, relevant categories, authentic reviews and consistent listings',
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
              AI SEO and GEO are different surfaces from SEO, and from each other. We use the definitions below on every page, in every report and on every call.
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
                    What we work on
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
            Start with the layer you need. We scope the work around your products and markets, and add local SEO only where location shapes the buying decision. B2B PPC runs alongside the four layers and is scoped separately, priced as a share of ad spend with a monthly minimum. A firm that wants only PPC is a full client.
          </p>
        </ScrollReveal>
      </Shell>
    </section>
  );
}
