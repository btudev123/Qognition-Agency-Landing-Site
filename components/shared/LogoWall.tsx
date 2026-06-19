'use client';

import Link from 'next/link';

// Clickable client logo wall. Each logo links to its case study.
// Logos are wordmark placeholders until brand asset files are added — swap the
// <span> for <img src="/logos/<file>.svg" .../> with no layout change.
export interface ClientLogo {
  name: string;
  /** case study or relevant page */
  href: string;
  /** optional logo image path under /public when available */
  src?: string;
}

const DEFAULT_LOGOS: ClientLogo[] = [
  { name: 'Meesho', href: '/case-studies' },
  { name: 'Daraz', href: '/case-studies' },
  { name: 'Magalu', href: '/case-studies' },
  { name: 'Qognition', href: '/case-studies' },
];

export default function LogoWall({
  logos = DEFAULT_LOGOS,
  heading = 'Trusted by ambitious brands',
}: {
  logos?: ClientLogo[];
  heading?: string;
}) {
  return (
    <section className="max-w-[1200px] mx-auto px-5 sm:px-10 py-14">
      {heading && (
        <p
          className="text-center font-mono uppercase mb-9"
          style={{ fontSize: 11, letterSpacing: '0.2em', color: 'rgba(243,240,234,0.45)' }}
        >
          {heading}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
        {logos.map((logo) => (
          <Link
            key={logo.name}
            href={logo.href}
            aria-label={`${logo.name} case study`}
            className="group inline-flex items-center transition-opacity"
            style={{ opacity: 0.6 }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.6')}
          >
            {logo.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo.src} alt={logo.name} height={28} style={{ height: 28, width: 'auto' }} />
            ) : (
              <span
                style={{
                  fontFamily: 'var(--font-geist), system-ui, sans-serif',
                  fontSize: 24,
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: '#F3F0EA',
                }}
              >
                {logo.name}
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
