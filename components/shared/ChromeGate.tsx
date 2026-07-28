'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Suppresses all marketing chrome on /studio.
 *
 * The studio is a full-viewport application, not a page on the site — nav,
 * footer, sticky CTAs, exit-intent popups, the custom cursor and the site's
 * background all fight it. Next allows only one root layout without moving
 * every existing route into a route group, so the chrome is gated here instead.
 *
 * `header` and `footer` arrive as pre-rendered ReactNodes from the server
 * layout, which keeps those components server-rendered for the rest of the site.
 */
export default function ChromeGate({
  header,
  footer,
  children,
}: {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith('/studio') ?? false;

  // The site sets scroll-smooth globally; the studio manages its own scrolling.
  useEffect(() => {
    if (!isStudio) return;
    const html = document.documentElement;
    html.classList.remove('scroll-smooth');
    return () => html.classList.add('scroll-smooth');
  }, [isStudio]);

  if (isStudio) return <>{children}</>;

  return (
    <>
      {header}
      <main className="min-h-screen bg-[var(--bg)]">{children}</main>
      {footer}
    </>
  );
}
