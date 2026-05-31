import Button from '../ui/Button';
import Section from '../ui/Section';
import Heading from '../ui/Heading';

interface CTABlockProps {
  heading: string;
  subheading?: string;
  primaryCta: string;
  primaryHref: string;
  secondaryCta?: string;
  secondaryHref?: string;
}

export default function CTABlock({
  heading,
  subheading,
  primaryCta,
  primaryHref,
  secondaryCta,
  secondaryHref,
}: CTABlockProps) {
  return (
    <Section spacing="lg">
      <div className="max-w-2xl mx-auto text-center bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-10 sm:p-14 shadow-sm">
        <Heading level="h2" className="mb-3">
          {heading}
        </Heading>
        {subheading && (
          <p className="text-[var(--text-muted)] text-base leading-relaxed mb-8 max-w-md mx-auto">
            {subheading}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button href={primaryHref} size="lg">
            {primaryCta}
          </Button>
          {secondaryCta && secondaryHref && (
            <Button href={secondaryHref} variant="secondary" size="lg">
              {secondaryCta}
            </Button>
          )}
        </div>
      </div>
    </Section>
  );
}
