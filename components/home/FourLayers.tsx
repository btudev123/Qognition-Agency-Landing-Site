import { MapPin, MessageSquareText, ScanSearch, Search, type LucideIcon } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';
import IconTile from '../visual/IconTile';
import { Eyebrow, GhostWord, Shell } from './primitives';
import v from '../visual/visual.module.css';

type Layer = { layer: string; surface: string; moves: string; icon: LucideIcon };

/* CLAUDE.md §1: the four layers, defined identically everywhere. Never blur AI SEO and GEO. */
const ANSWER_LAYERS: Layer[] = [
  {
    layer: 'AI SEO',
    surface: 'Google AI Overviews and AI Mode',
    moves: "Pages Google's AI can quote: a clear answer up front, plain facts about your firm, and proof it can point to",
    icon: ScanSearch,
  },
  {
    layer: 'GEO',
    surface: 'ChatGPT, Perplexity, Gemini, Claude, Copilot',
    moves: 'What your site says, what trusted sites say about you, and whether an assistant can tell you apart from firms with similar names',
    icon: MessageSquareText,
  },
];

const SUPPORTING_LAYERS: Layer[] = [
  {
    layer: 'SEO',
    surface: 'Google search results',
    moves: 'A site Google can read, pages for the searches buyers make, and links from sites they trust',
    icon: Search,
  },
  {
    layer: 'Local SEO',
    surface: 'Google Maps, local pack, Bing Places, Business Profile, reviews, listings',
    moves: 'Accurate listings, the right categories and real reviews, where location matters to your buyers',
    icon: MapPin,
  },
];

/* One lattice row. border-top and border-left on the container, border-right and
   border-bottom on each cell, so seams never double (brief §1.3). */
function LayerRow({ layers }: { layers: Layer[] }) {
  return (
    <ul className={`${v.lattice} list-none p-0 m-0 grid grid-cols-1 md:grid-cols-2`}>
      {layers.map((l) => (
        <li key={l.layer} className={`${v.latticeCell} flex gap-5 p-6 sm:p-8`}>
          <IconTile icon={l.icon} size={32} />
          <div className="min-w-0">
            <h3 className="text-h3 font-sans m-0 font-semibold" style={{ color: 'var(--s-accent)' }}>
              {l.layer}
            </h3>
            <p className="text-body m-0 mt-2" style={{ color: 'var(--s-text)' }}>
              {l.surface}
            </p>
            <p
              className="text-meta m-0 mt-4 pt-4"
              style={{ color: 'var(--s-text-muted)', borderTop: '1px solid var(--s-rule-hairline)' }}
            >
              {l.moves}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function FourLayers() {
  return (
    <section data-theme="light" className="relative overflow-hidden py-20 sm:py-28" style={{ borderTop: '1px solid var(--s-rule-hairline)' }}>
      <GhostWord>SURFACES</GhostWord>

      <Shell>
        <ScrollReveal>
          <Eyebrow accent>What we do</Eyebrow>
          <h2 className="text-h2 font-sans m-0 mt-4 font-semibold">
            <MaskReveal>AI SEO, GEO and SEO.</MaskReveal>
            <br />
            <MaskReveal delay={0.08}>Four surfaces, four jobs.</MaskReveal>
          </h2>
        </ScrollReveal>

        {/* Grouped to show the dependency, not four equal boxes (brief §2.4): the
            supporting layers feed the answer layers. The connector points up. */}
        <ScrollReveal stagger={2} className="mt-12">
          <Eyebrow>Where buyers get answers</Eyebrow>
          <div className="mt-4">
            <LayerRow layers={ANSWER_LAYERS} />
          </div>

          <div className="flex justify-center py-2" aria-hidden="true">
            <svg width="16" height="48" viewBox="0 0 16 48" style={{ overflow: 'visible' }}>
              <path d="M8 47 V6" style={{ fill: 'none', stroke: 'var(--s-accent-graphic)', strokeWidth: 1 }} />
              <path d="M3 9 L8 1 L13 9" style={{ fill: 'none', stroke: 'var(--s-accent)', strokeWidth: 1.5 }} />
            </svg>
          </div>

          <Eyebrow>What those answers draw on</Eyebrow>
          <div className="mt-4">
            <LayerRow layers={SUPPORTING_LAYERS} />
          </div>
        </ScrollReveal>

        <ScrollReveal stagger={3}>
          <p className="text-body mt-10 m-0 max-w-[72ch]" style={{ color: 'var(--s-text-muted)' }}>
            Start with one layer and add the rest as you grow. B2B PPC runs alongside and is priced separately, as a share of ad spend with a monthly minimum. A firm that wants only PPC is a full client.
          </p>
        </ScrollReveal>
      </Shell>
    </section>
  );
}
