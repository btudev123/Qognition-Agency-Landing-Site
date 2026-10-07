import Image from 'next/image';
import v from './visual.module.css';

/* A local photo under the brand's teal tint (brief §1.4). Dark bands only.
 *
 * The tint is greyscale plus a teal colour blend, so colour words in a Pexels
 * description become false once rendered. `alt` must describe what the TINTED
 * frame shows; callers pass alt="" where the photo only sets a scene (Ruth,
 * 2026-10-07). */
export default function TintedImage({
  src,
  alt,
  sizes,
  overlay = false,
  className = '',
}: {
  src: string;
  alt: string;
  sizes: string;
  /** Copy sits on the photo from 768px: add the scrim. */
  overlay?: boolean;
  className?: string;
}) {
  return (
    <div className={`${v.tint}${overlay ? ` ${v.overlay}` : ''} ${className}`.trim()}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" loading="lazy" />
    </div>
  );
}
