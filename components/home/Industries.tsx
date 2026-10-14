import Link from 'next/link';
import ScrollReveal from '../shared/ScrollReveal';
import MaskReveal from '../shared/MaskReveal';
import { icpIndustryCards, publishedIcpPaths } from '../../data/b2b/icp';
import { INDUSTRY_ICON, industryDisplayName, industryImage } from '../../data/b2b/icp/industryVisuals';
import { FeaturedIndustryCard, GridIndustryCard } from '../visual/IndustryCard';
import { Eyebrow, Shell } from './primitives';
import v from '../visual/visual.module.css';

/* Featured, not evidenced. These three are where the copy is written in most
   detail. Nothing here is proof of client work; do not write copy that says it
   is (docs/copy/2026-10/home.md §5). Brief §2.5. */
const FEATURED = [
  {
    slug: 'saas-and-software',
    name: 'B2B SaaS and software',
    buyer: 'A buying team comparing integrations, security reviews and implementation effort.',
  },
  {
    slug: 'manufacturing-and-industrial',
    name: 'Industrial and manufacturing',
    buyer: 'An engineer or sourcing lead checking certifications, capacity and lead times.',
  },
  {
    slug: 'professional-and-business-services',
    name: 'Professional B2B services',
    buyer: 'A CFO, general counsel or founder choosing an adviser for a specific matter.',
  },
] as const;

const FEATURED_SLUGS = new Set<string>(FEATURED.map((f) => f.slug));

export default function Industries() {
  /* A card links only when its sector is published, the same rule and reason as
     app/industries/page.tsx: an anchor to an unpublished ICP entity is a hard 404
     under dynamicParams = false. Bound once per render, not per card. */
  const published = new Set(publishedIcpPaths());
  const featured = FEATURED.flatMap((f) => {
    const image = industryImage(`featured/${f.slug}`);
    const icon = INDUSTRY_ICON[f.slug];
    return image && icon ? [{ ...f, image, icon }] : [];
  });
  const grid = icpIndustryCards().filter((c) => !FEATURED_SLUGS.has(c.slug));

  return (
    /* Dark feature band. data-theme="dark" remaps the --s-* surface roles under
       this element; nothing here branches on ground. CLAUDE.md §9. */
    <section data-theme="dark" className="py-20 sm:py-28" style={{ borderTop: '1px solid var(--s-rule-hairline)' }}>
      <Shell>
        <ScrollReveal>
          <Eyebrow>Industries we serve</Eyebrow>
          <h2 className="text-h2 font-sans m-0 mt-4 max-w-[20ch] font-semibold">
            <MaskReveal>A software demo, an RFQ and a consultation need different pages.</MaskReveal>
          </h2>
        </ScrollReveal>

        {/* None of the three is published, so none links today. If a featured
            image is missing, the card is omitted rather than shown without one. */}
        <ScrollReveal stagger={2} className="mt-12">
          <ul className={`${v.lattice} list-none p-0 m-0 grid grid-cols-1 md:grid-cols-3`}>
            {featured.map((f) => (
              <FeaturedIndustryCard key={f.slug} icon={f.icon} name={f.name} buyer={f.buyer} image={f.image} />
            ))}
          </ul>
        </ScrollReveal>

        {/* The other 18. 18 divides by 1, 3 and 6, so every row fills at every
            width. Never 4 or 5 columns (brief §2.5). */}
        <ScrollReveal stagger={3} className="mt-6">
          <ul className={`${v.lattice} list-none p-0 m-0 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6`}>
            {grid.map((card) => {
              const icon = INDUSTRY_ICON[card.slug];
              if (!icon) return null;
              return (
                <GridIndustryCard
                  key={card.id}
                  icon={icon}
                  name={industryDisplayName(card.name)}
                  subNames={card.subNames.slice(0, 2)}
                  href={published.has(card.slug) ? `/industries/${card.slug}` : undefined}
                />
              );
            })}
          </ul>
          <p className="text-meta mt-6 m-0 max-w-[96ch]" style={{ color: 'var(--s-text-faint)' }}>
            Listing a sector means we sell AI SEO, GEO, SEO and PPC into it. It is not a claim that we have worked with a firm in it. If your sector is not listed, you can still book a call.
          </p>
        </ScrollReveal>

        <ScrollReveal stagger={4} className="mt-8">
          <Link href="/industries" className="rf-btn rf-btn--secondary">
            See every industry
          </Link>
        </ScrollReveal>
      </Shell>
    </section>
  );
}
