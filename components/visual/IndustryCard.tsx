import Link from 'next/link';
import { ArrowUpRight, type LucideIcon } from 'lucide-react';
import PhotoCredit from '../case-studies/PhotoCredit';
import type { IndustryImage } from '../../data/b2b/icp/industryVisuals';
import IconTile from './IconTile';
import TintedImage from './TintedImage';
import v from './visual.module.css';

/* Industry tiles for the homepage (brief §2.5). Server component.
 *
 * A card links ONLY when the caller says its sector is published. An anchor to
 * an unpublished ICP entity is a hard 404 under dynamicParams = false, which is
 * the same rule app/industries/page.tsx follows. A static card is not
 * focusable, has no pointer and no arrow, so it never looks clickable. */

export function FeaturedIndustryCard({
  icon: Icon,
  name,
  buyer,
  image,
}: {
  icon: LucideIcon;
  name: string;
  buyer: string;
  image: IndustryImage;
}) {
  /* Below 1280 the photo sits above the copy. The brief overlays from 768, but a
     third of a 768 or 1024 row is 234 to 314px wide, so the copy block runs past
     the top half of a 4:5 frame (§1.4 forbids that) and onto unscrimmed photo,
     where the muted text measured 1.5:1. From 1280 the card is 4:5 and the copy
     sits on the scrim in the bottom safe zone, measured at or above 4.5:1. */
  return (
    <li className={`${v.latticeCell} rf-cell relative flex flex-col xl:block xl:aspect-[4/5]`}>
      {/* Positioning lives on this wrapper, not on the tint: the tint sets its
          own `position: relative` for the overlay layers. */}
      <div className="aspect-[16/10] xl:absolute xl:inset-0 xl:aspect-auto">
        <TintedImage src={image.src} alt={image.alt} sizes="(min-width: 768px) 33vw, 100vw" overlay className="h-full w-full" />
      </div>
      <div className="relative z-[2] p-5 xl:absolute xl:inset-x-0 xl:bottom-0">
        <span className="block" style={{ color: 'var(--s-accent)' }} aria-hidden="true">
          <Icon size={32} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
        </span>
        <h3 className="text-h3 font-sans m-0 mt-3 font-semibold" style={{ color: 'var(--s-text)' }}>
          {name}
        </h3>
        <p className="text-meta m-0 mt-3 font-mono uppercase tracking-[0.14em]" style={{ color: 'var(--s-text-muted)' }}>
          Their buyer
        </p>
        <p className="text-meta m-0 mt-1 max-w-[44ch]" style={{ color: 'var(--s-text-muted)' }}>
          {buyer}
        </p>
        <div className={`${v.credit} mt-3`}>
          <PhotoCredit image={image} className="m-0" />
        </div>
      </div>
    </li>
  );
}

export function GridIndustryCard({
  icon,
  name,
  subNames,
  href,
}: {
  icon: LucideIcon;
  name: string;
  subNames: readonly string[];
  /** Present only for a published sector. */
  href?: string;
}) {
  const body = (
    <>
      <IconTile icon={icon} size={24} />
      <h3 className="text-h4 font-sans m-0 mt-4 font-semibold">{name}</h3>
      <ul className="list-none p-0 m-0 mt-2 grid gap-1">
        {subNames.map((sub) => (
          <li key={sub} className={`text-meta ${href ? 'rf-card-label' : 'rf-cell-meta'}`}>
            {sub}
          </li>
        ))}
      </ul>
    </>
  );

  if (href) {
    return (
      <li className={`${v.latticeCell}`}>
        <Link href={href} className="rf-card rf-hoverable relative flex h-full flex-col p-5 sm:p-6">
          <span className="absolute right-4 top-4" style={{ color: 'var(--s-accent)' }} aria-hidden="true">
            <ArrowUpRight className="rf-arrow" size={20} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
          </span>
          {body}
        </Link>
      </li>
    );
  }
  return <li className={`${v.latticeCell} rf-cell p-5 sm:p-6`}>{body}</li>;
}
