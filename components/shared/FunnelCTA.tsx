'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getFunnelStage, getFunnelCTA, type FunnelStage } from '../../lib/funnel';
import { pushDataLayer } from '../../lib/analytics';

// Drop-in CTA block whose copy/intensity adapts to the funnel stage.
// Pass `stage` to override; otherwise it's inferred from the route.
export default function FunnelCTA({
  stage: stageProp,
  service,
  className = '',
}: {
  stage?: FunnelStage;
  service?: string;
  className?: string;
}) {
  const pathname = usePathname();
  const stage = stageProp ?? getFunnelStage(pathname || '/');
  const cta = getFunnelCTA(stage, { service });

  const external = (href: string) => href.startsWith('http');
  const track = (action: string) => pushDataLayer('cta_click', { cta_stage: stage, cta_action: action });

  const Primary = external(cta.primary.href) ? 'a' : Link;
  const Secondary = external(cta.secondary.href) ? 'a' : Link;

  return (
    <section
      className={`relative overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(20,184,166,0.10), rgba(8,8,8,0))',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
      }}
    >
      <div className="max-w-[900px] mx-auto px-6 sm:px-12 py-14 sm:py-20 text-center">
        <span
          className="font-mono uppercase"
          style={{ fontSize: 11, letterSpacing: '0.18em', color: 'var(--accent)' }}
        >
          {cta.eyebrow}
        </span>
        <h2
          className="text-h2 mt-5 mb-8 font-semibold"
          style={{
            fontFamily: 'var(--font-geist), system-ui, sans-serif',
            fontSize: 'clamp(30px, 5vw, 56px)',
            lineHeight: 1.02,
            letterSpacing: '-0.035em',
            fontWeight: 600,
            color: '#F3F0EA',
          }}
        >
          {cta.headline}
        </h2>
        <div className="flex flex-wrap gap-3 justify-center">
          <Primary
            href={cta.primary.href}
            onClick={() => track('primary')}
            {...(external(cta.primary.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="inline-flex items-center gap-2 px-7 py-4 text-sm font-semibold transition-colors"
            style={{ background: 'var(--accent)', color: '#04221E', borderRadius: 9999 }}
          >
            {cta.primary.label} →
          </Primary>
          <Secondary
            href={cta.secondary.href}
            onClick={() => track('secondary')}
            {...(external(cta.secondary.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="inline-flex items-center gap-2 px-7 py-4 text-sm font-medium transition-colors"
            style={{ background: 'transparent', color: '#F3F0EA', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 9999 }}
          >
            {cta.secondary.label}
          </Secondary>
        </div>
        <p className="text-meta mt-5" style={{ color: 'rgba(243,240,234,0.5)' }}>
          {cta.reassurance}
        </p>
      </div>
    </section>
  );
}
