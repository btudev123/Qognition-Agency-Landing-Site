'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { appendFunnelContext, readFunnelContext, type FunnelContext } from '../../lib/funnelContext';
import { getFunnelStage, getFunnelCTA, type FunnelStage } from '../../lib/funnel';
import { pushDataLayer } from '../../lib/analytics';

// Drop-in CTA block whose copy/intensity adapts to the funnel stage.
// Pass `stage` to override; otherwise it's inferred from the route.
export default function FunnelCTA({
  stage: stageProp,
  service,
  headline,
  context,
  className = '',
}: {
  stage?: FunnelStage;
  service?: string;
  /** Replaces the stage headline. Absent: the stage default from getFunnelCTA(). */
  headline?: string;
  context?: FunnelContext;
  className?: string;
}) {
  const pathname = usePathname();
  const stage = stageProp ?? getFunnelStage(pathname || '/');
  const cta = getFunnelCTA(stage, { service });
  const [incoming, setIncoming] = useState<FunnelContext>();
  useEffect(() => setIncoming(readFunnelContext(new URLSearchParams(window.location.search))), [pathname]);
  const leadContext = { ...incoming, ...context, stage, page_id: context?.page_id || incoming?.page_id || pathname || '/' };
  const primaryHref = pathname === '/' && cta.primary.href === '/book' ? '#book' : appendFunnelContext(cta.primary.href, leadContext);
  const secondaryHref = appendFunnelContext(cta.secondary.href, leadContext);

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
            color: 'var(--s-text)',
          }}
        >
          {headline ?? cta.headline}
        </h2>
        <div className="flex flex-wrap gap-3 justify-center">
          <Primary
            href={primaryHref}
            onClick={() => track('primary')}
            {...(external(cta.primary.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="inline-flex items-center gap-2 px-7 py-4 text-sm font-semibold transition-colors"
            style={{ background: 'var(--btn-primary-bg)', color: 'var(--btn-primary-fg)', borderRadius: 9999 }}
          >
            {cta.primary.label} →
          </Primary>
          <Secondary
            href={secondaryHref}
            onClick={() => track('secondary')}
            {...(external(cta.secondary.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="inline-flex items-center gap-2 px-7 py-4 text-sm font-medium transition-colors"
            style={{ background: 'transparent', color: 'var(--s-text)', border: '1px solid var(--s-rule-strong)', borderRadius: 9999 }}
          >
            {cta.secondary.label}
          </Secondary>
        </div>
        <p className="text-meta mt-5" style={{ color: 'var(--s-text-muted)' }}>
          {cta.reassurance}
        </p>
      </div>
    </section>
  );
}
