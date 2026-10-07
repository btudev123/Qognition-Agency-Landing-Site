import Link from 'next/link';
import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';
import { icpIndustryCards } from '../../data/b2b/icp';
import { Eyebrow, Shell } from './primitives';


type Vertical = {
  name: string;
  buyer: string;
  detail: string;
  flagship?: boolean;
};

const CARDS = icpIndustryCards();

const FEATURED_SLUGS = new Set([
  'saas-and-software', 'manufacturing-and-industrial', 'professional-and-business-services',
]);
/* Featured, not evidenced. These three are where the copy is written in most
   detail. Nothing in this array is proof of client work; do not write copy that
   says it is (docs/copy/2026-10/home.md §5). */
const FEATURED: Vertical[] = [
  {
    name: 'B2B SaaS and software',
    buyer: 'A buying team comparing integrations, security reviews and implementation effort.',
    detail: 'Pages that answer the integration, security and implementation questions a buying team asks before the demo. We test the comparison prompts they run, such as one vendor against another for a company their size.',
    flagship: true,
  },
  {
    name: 'Industrial and manufacturing',
    buyer: 'An engineer or sourcing lead checking certifications, capacity and lead times.',
    detail: 'Pages built on process, material, tolerance and certification, so an engineer can shortlist you before asking for a quote. We test supplier prompts such as "ISO 9001 and AS9100 certified CNC machining suppliers".',
  },
  {
    name: 'Professional B2B services',
    buyer: 'A CFO, general counsel or founder choosing an adviser for a specific matter.',
    detail: 'Practice pages that show what you do, for whom and where. We test the prompts a CFO or general counsel uses to find a firm for a specific deal or problem.',
  },
];

export default function Industries() {
  return (
    /* Dark feature band. data-theme="dark" remaps the --s-* surface roles under
       this element; nothing here branches on ground. CLAUDE.md §9. */
    <section
      data-theme="dark"
      className="py-20 sm:py-28"
      style={{ borderTop: '1px solid var(--s-rule-hairline)' }}
    >
      <Shell>
        <ScrollReveal>
          <Eyebrow>Who we build this for</Eyebrow>
          <h2 className="text-h2 font-sans m-0 mt-4 max-w-[20ch] font-semibold">
            <MaskReveal>A software demo, an RFQ and a consultation need different pages.</MaskReveal>
          </h2>
          <p className="text-body mt-5 m-0 max-w-[62ch]" style={{ color: 'var(--s-text-muted)' }}>
            We write to the person who approves the purchase: an engineer checking a spec, an IT lead comparing integrations, a finance leader looking for sector expertise. Each one needs a different page and a different next step.
          </p>
        </ScrollReveal>

        {/* One shared 1px lattice — border-top and border-left on the container,
            border-right and border-bottom on each cell — so seams never double
            up. The `gap-px` over a background colour used in the orphaned file
            paints a 2px seam wherever a cell is missing at a breakpoint. */}
        <ScrollReveal stagger={2} className="mt-12">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 [&>article]:border-r [&>article]:border-b [&>article]:border-[var(--s-rule-hairline)]"
            style={{
              borderTop: '1px solid var(--s-rule-hairline)',
              borderLeft: '1px solid var(--s-rule-hairline)',
            }}
          >
            {FEATURED.map((v, i) => (
              <article
                key={v.name}
                /* Two columns, not three. At three the flagship spans the full
                   row and the two remaining cells leave one slot empty, which
                   breaks the lattice's right edge and reads as a rendering bug
                   rather than as an open grid. At two, every row fills exactly
                   at every width. */
                className={`flex flex-col justify-between p-6 sm:p-8 min-h-[220px] ${
                  v.flagship ? 'sm:col-span-2' : ''
                }`}
              >
                <div>
                  <div
                    className="font-mono text-meta tracking-[0.14em] uppercase"
                    style={{ color: v.flagship ? 'var(--s-accent)' : 'var(--s-text-faint)' }}
                  >
                    {String(i + 1).padStart(2, '0')} / {String(FEATURED.length).padStart(2, '0')}
                    <span className="ml-4">
                      Buyer journey
                    </span>
                  </div>
                  <h3 className="text-h3 font-sans mt-4 mb-2 font-semibold">{v.name}</h3>
                  <p className="text-body m-0 max-w-[62ch]" style={{ color: 'var(--s-text-muted)' }}>
                    {v.detail}
                  </p>
                </div>
                <p className="text-meta mt-6 mb-0 max-w-[62ch]" style={{ color: 'var(--s-text-faint)' }}>
                  <span className="font-mono tracking-[0.12em] uppercase">Their buyer</span> {v.buyer}
                </p>
              </article>
            ))}
          </div>
        </ScrollReveal>

        {/* The other 18. Named, not linked.
          *
          * A reader in energy, aerospace or logistics previously saw three
          * sectors and concluded we do not sell to them. These are rendered as
          * text because the sector pages publish wave by wave, and an anchor to
          * an unpublished entity is a hard 404 under dynamicParams = false. The
          * /industries section gates the same way and for the same reason. */}
        <ScrollReveal stagger={3} className="mt-10">
          <p
            className="font-mono text-meta tracking-[0.14em] uppercase m-0 mb-5"
            style={{ color: 'var(--s-text-faint)' }}
          >
            Explore other B2B sectors
          </p>
          <ul className="list-none p-0 m-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            {CARDS.filter((c) => !FEATURED_SLUGS.has(c.slug)).map((card) => (
              <li key={card.id} className="min-w-0">
                <p className="text-body m-0 font-medium">{card.name}</p>
                <p className="text-meta m-0 mt-1" style={{ color: 'var(--s-text-faint)' }}>
                  {card.subNames.slice(0, 3).join(' · ')}
                </p>
              </li>
            ))}
          </ul>
          <p className="text-meta mt-8 m-0 max-w-[68ch]" style={{ color: 'var(--s-text-faint)' }}>
            Listing a sector means we sell AI SEO, GEO, SEO and PPC into it. It is not a claim that we have worked with a firm in it. If your sector is not listed, you can still book a call.
          </p>
        </ScrollReveal>

        <ScrollReveal stagger={4} className="mt-8">
          <Link href="/industries" className="rf-btn rf-btn--secondary">
            See every sector
          </Link>
        </ScrollReveal>
      </Shell>
    </section>
  );
}
