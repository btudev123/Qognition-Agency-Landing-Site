import { CLIENT_LOGOS, PARTNER_LOGOS } from '../../data/trust';

/* Two-row proof strip: clients we've driven results for + the platform/ad
   partners we run certified work across (Google, Meta, TikTok, Snapchat, LinkedIn). */

function LogoRow({ label, logos }: { label: string; logos: { name: string; url: string }[] }) {
  return (
    <div>
      <p className="text-center font-mono text-[10px] tracking-[0.18em] uppercase mb-6" style={{ color: 'var(--text-muted)' }}>
        {label}
      </p>
      <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6 sm:gap-x-14">
        {logos.map((logo) => (
          <img
            key={logo.name}
            src={logo.url}
            alt={logo.name}
            className="h-6 sm:h-7 w-auto object-contain transition-all duration-300 opacity-55 grayscale hover:opacity-100 hover:grayscale-0"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}

export default function ClientPartners() {
  return (
    <section className="py-16 sm:py-20" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="max-w-[1240px] mx-auto px-5 sm:px-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <LogoRow label="Trusted by founders & operators" logos={CLIENT_LOGOS} />
        <LogoRow label="Certified partners across" logos={PARTNER_LOGOS} />
      </div>
    </section>
  );
}
