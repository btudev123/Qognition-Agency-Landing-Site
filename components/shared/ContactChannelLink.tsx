'use client';

import type { CSSProperties, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { PHONE_LINK, WHATSAPP_CHAT_LINK } from '../../data/siteConfig';
import { track } from '../../lib/analytics';

export type ContactChannel = 'whatsapp' | 'phone';
export type ContactChannelSurface = 'floating' | 'sticky_bar' | 'footer' | 'contact_page';

/* One event per channel, CLAUDE.md §8. `location` names the surface so the
 * floating button, the mobile bar, the footer and /contact stay separable in
 * GA4 without four event names. `page_path` is usePathname(), which carries no
 * query string, so no form value, email or click ID can ride along.
 *
 * A click is intent, never a conversation: WhatsApp opens in another app and
 * tel: hands off to the dialler. Neither event may be reported as a lead. */
export function trackContactChannel(channel: ContactChannel, location: ContactChannelSurface, pagePath: string) {
  track(channel === 'whatsapp' ? 'whatsapp_click' : 'phone_click', { location, page_path: pagePath });
}

export default function ContactChannelLink({
  channel,
  location,
  className,
  style,
  children,
  'aria-label': ariaLabel,
}: {
  channel: ContactChannel;
  location: ContactChannelSurface;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  'aria-label'?: string;
}) {
  const pathname = usePathname() || '/';
  const whatsapp = channel === 'whatsapp';
  return (
    <a
      href={whatsapp ? WHATSAPP_CHAT_LINK : PHONE_LINK}
      {...(whatsapp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      onClick={() => trackContactChannel(channel, location, pathname)}
      aria-label={ariaLabel}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}
