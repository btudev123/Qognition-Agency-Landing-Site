import type { SpokeId } from '../../lib/spokes';
import { getSpoke } from '../../lib/spokes';
import Button from '../ui/Button';

interface SpokeHeroProps {
  spoke: SpokeId;
  variant?: 'homepage' | 'subservice' | 'audit';
  h1?: string;
  subhead?: string;
  primaryCta?: string;
  primaryHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
}

export default function SpokeHero({
  spoke,
  variant = 'homepage',
  h1,
  subhead,
  primaryCta,
  primaryHref,
  secondaryCta,
  secondaryHref,
}: SpokeHeroProps) {
  const config = getSpoke(spoke);

  const heading = h1 || config?.h1 || '';
  const subtitle = subhead || config?.subhead || '';

  const defaultPrimaryCta = variant === 'audit' ? 'Get Your Free Audit' : 'Book a Strategy Call';
  const defaultPrimaryHref = variant === 'audit' ? `/${spoke}/audit` : '/contact';
  const defaultSecondaryCta = variant === 'homepage' ? 'Explore Services ↓' : undefined;
  const defaultSecondaryHref = variant === 'homepage' ? '#services' : undefined;

  const finalPrimaryCta = primaryCta || defaultPrimaryCta;
  const finalPrimaryHref = primaryHref || defaultPrimaryHref;
  const finalSecondaryCta = secondaryCta || defaultSecondaryCta;
  const finalSecondaryHref = secondaryHref || defaultSecondaryHref;

  if (variant === 'audit') {
    return (
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-meta font-semibold uppercase text-[var(--accent)] mb-4">
            Free {config?.label} Audit
          </p>
          <h1 className="text-h1 text-[var(--text)] mb-4 font-semibold">
            {heading}
          </h1>
          <p className="text-body text-[var(--text-muted)] mb-8 max-w-xl mx-auto">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href={finalPrimaryHref} size="lg">
              {finalPrimaryCta}
            </Button>
          </div>
          <p className="text-meta text-[var(--text-muted)] mt-4">
            Free · No commitment · Delivered in 48 hours
          </p>
        </div>
      </section>
    );
  }

  if (variant === 'subservice') {
    return (
      <section className="pt-32 pb-12 sm:pt-40 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-h1 text-[var(--text)] mb-4 font-semibold">
            {heading}
          </h1>
          <p className="text-body text-[var(--text-muted)] mb-8 max-w-xl mx-auto">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href={finalPrimaryHref} size="lg">
              {finalPrimaryCta}
            </Button>
            {finalSecondaryCta && finalSecondaryHref && (
              <Button href={finalSecondaryHref} variant="secondary" size="lg">
                {finalSecondaryCta}
              </Button>
            )}
          </div>
        </div>
      </section>
    );
  }

  // homepage variant
  return (
    <section className="pt-32 pb-16 sm:pt-44 sm:pb-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-display text-[var(--text)] mb-5 font-semibold">
          {heading}
        </h1>
        <p className="text-body text-[var(--text-muted)] mb-10 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button href={finalPrimaryHref} size="lg">
            {finalPrimaryCta}
          </Button>
          {finalSecondaryCta && finalSecondaryHref && (
            <Button href={finalSecondaryHref} variant="secondary" size="lg">
              {finalSecondaryCta}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
