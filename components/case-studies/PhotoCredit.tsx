import type { CaseStudyImage } from '../../data/case-studies';

/**
 * "Photo: <photographer> on Pexels", both names linking out.
 *
 * --text-muted, not --text-faint: faint is #8E8A82 at about 3.2:1 on these surfaces and fails AA
 * for text (see the note in app/globals.css). Renders nothing for a placeholder image with no credit.
 *
 * nofollow because the card grid repeats this 45 times on hub pages; the credit is attribution,
 * not an endorsement.
 */
export default function PhotoCredit({
  image,
  className = '',
}: {
  image: CaseStudyImage;
  className?: string;
}) {
  if (!image.credit) return null;
  const { photographer, photographerUrl, url } = image.credit;
  const link = 'underline underline-offset-2 hover:text-[var(--ink)]';

  return (
    <p className={`text-meta text-[var(--text-muted)] ${className}`.trim()}>
      Photo:{' '}
      <a href={photographerUrl} rel="nofollow noopener" className={link}>
        {photographer}
      </a>{' '}
      on{' '}
      <a href={url} rel="nofollow noopener" className={link}>
        Pexels
      </a>
    </p>
  );
}
