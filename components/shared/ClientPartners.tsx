import { CLIENT_LOGOS, PARTNER_LOGOS } from '../../data/trust';

/* Two-row proof strip: brands we've driven results for + the platform/ad
   partners we run certified work across (Google, Meta, TikTok, Snapchat, LinkedIn).
   Real full-colour brand SVGs, uniform optical height, subtle on rest → full on hover. */

function LogoRow({
  label,
  logos,
  size = 'wordmark',
}: {
  label: string;
  logos: { name: string; url: string }[];
  size?: 'wordmark' | 'glyph';
}) {
  const heightClass = size === 'glyph' ? 'h-8 sm:h-9' : 'h-6 sm:h-7';
  return (
    <div>
      <p
        className="text-center font-mono text-[10px] tracking-[0.18em] uppercase mb-7"
        style={{ color: 'var(--text-muted)' }}
      >
        {label}
      </p>
      <div className="flex flex-wrap justify-center items-center gap-x-9 gap-y-6 sm:gap-x-12">
        {logos.map((logo) => (
          <img
            key={logo.name}
            src={logo.url}
            alt={logo.name}
            title={logo.name}
            className={`${heightClass} w-auto object-contain opacity-70 transition-all duration-300 hover:opacity-100 hover:scale-[1.04]`}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}

export default function ClientPartners() {
  return (
    <section
      className="py-16 sm:py-20"
      style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-10 grid gap-14 lg:grid-cols-2 lg:gap-16 items-start">
        <LogoRow label="Trusted by founders & operators" logos={CLIENT_LOGOS} size="wordmark" />
        <LogoRow label="Certified partners across" logos={PARTNER_LOGOS} size="glyph" />
      </div>
    </section>
  );
}
