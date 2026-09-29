import type { ReactNode } from 'react';

/* Server-only primitives shared by the homepage sections.
 *
 * Every one of these is a server component. None holds state, none has an
 * event handler, and none may acquire either — the hover and focus behaviour
 * they need lives in the .rf-* classes in app/globals.css. That is the whole
 * reason `/` can carry this design without a client bundle. ADR-0005 §2.
 *
 * If something here ever needs 'use client', it is in the wrong file.
 */

/** Mono uppercase section label with a leading rule. */
export function Eyebrow({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return <span className={`rf-eyebrow${accent ? ' rf-eyebrow--accent' : ''}`}>{children}</span>;
}

/* Page shell. One max width, one gutter ramp, used by every section so the
   left edge of every heading on the page lines up. */
export function Shell({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}

/* The giant background word. Decorative, aria-hidden, and it must stay
   decorative: the scroll-driven animation behind .rf-ghost has a static
   fallback in browsers without `animation-timeline: view()`, so anything
   meaningful attached here would simply not be conveyed to some readers.
   ADR-0005 §4.

   `ink` is the resting colour and defaults to the dark-ground value. */
export function GhostWord({ children, ink }: { children: string; ink?: string }) {
  return (
    <div className="rf-ghost" aria-hidden="true" style={ink ? ({ '--rf-ghost-ink': ink } as React.CSSProperties) : undefined}>
      <span>{children}</span>
    </div>
  );
}

/* Three drifting orbs. Pure CSS — this was never a reason for a client
   boundary. Teal only: the violet and blue in the orphaned implementation were
   left over from the retired 4-spoke palette and put two off-brand hues on the
   page. Peak alpha 0.11, under the 0.13 ceiling. docs/design/motion.md §3.3. */
export function GradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="absolute"
        style={{
          top: '-10%', right: '-5%', width: '55%', height: '70%',
          background: 'radial-gradient(circle, rgba(20,184,166,0.11) 0%, transparent 65%)',
          filter: 'blur(40px)',
          animation: 'rf-orb-drift 18s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: '-15%', left: '-8%', width: '50%', height: '65%',
          background: 'radial-gradient(circle, rgba(20,184,166,0.06) 0%, transparent 65%)',
          filter: 'blur(50px)',
          animation: 'rf-orb-drift-b 24s ease-in-out infinite 4s',
          willChange: 'transform',
        }}
      />
      <div
        className="absolute"
        style={{
          top: '30%', left: '30%', width: '40%', height: '50%',
          background: 'radial-gradient(circle, rgba(20,184,166,0.04) 0%, transparent 65%)',
          filter: 'blur(60px)',
          animation: 'rf-orb-drift-c 30s ease-in-out infinite 10s',
          willChange: 'transform',
        }}
      />
    </div>
  );
}

/* Buttons. Plain anchors and Links with a class — no state, no variant object,
   no `cursor: none`. The orphaned implementation set `cursor: 'none'` on every
   button with the custom cursor unmounted, so the desktop homepage had no
   pointer at all over its primary controls. `cursor: none` is banned outright
   (docs/design/motion.md §5.2). */
export function CtaRow({ children }: { children: ReactNode }) {
  return <div className="flex flex-col sm:flex-row flex-wrap gap-3">{children}</div>;
}
