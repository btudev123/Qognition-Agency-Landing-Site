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
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-4">
            Free {config?.label} Audit
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[var(--text)] leading-tight mb-4">
            {heading}
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed mb-8 max-w-xl mx-auto">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href={finalPrimaryHref} size="lg">
              {finalPrimaryCta}
            </Button>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-4">
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[var(--text)] leading-tight mb-4">
            {heading}
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed mb-8 max-w-xl mx-auto">
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
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[var(--text)] leading-tight mb-5">
          {heading}
        </h1>
        <p className="text-lg sm:text-xl text-[var(--text-muted)] leading-relaxed mb-10 max-w-2xl mx-auto">
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
