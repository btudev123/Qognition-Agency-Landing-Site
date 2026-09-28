import { PARTNER_LOGOS } from '../../data/trust';

/* Platform strip. The label says what is true — we run ads on these platforms —
   and deliberately does not say "certified", "partner" or "trusted by". The
   guard comment in data/trust.ts records why. CLAUDE.md §4.

   These are platform identifications, not customer logos. The line under the
   row exists so nobody reads it as a client list, which is the default
   assumption a visitor makes about any logo row on an agency homepage. */

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
        className="text-center font-mono text-meta uppercase mb-7"
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
      <div className="max-w-[1240px] mx-auto px-5 sm:px-10">
        <LogoRow label="Ad platforms we run" logos={PARTNER_LOGOS} size="glyph" />
        <p className="text-center text-meta mt-6 mx-auto max-w-[52ch]" style={{ color: 'var(--text-faint)' }}>
          Platform names identify advertising surfaces we operate on. They are not
          customer logos, certifications or endorsements.
        </p>
      </div>
    </section>
  );
}
