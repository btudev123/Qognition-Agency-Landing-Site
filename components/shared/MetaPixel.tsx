'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

/**
 * Meta (Facebook) Pixel.
 *
 * Installed directly rather than through GTM so the same `eventID` used here
 * can be handed to the server for the Conversions API call — see
 * lib/metaCapi.ts and the dedup contract in docs/integrations.md.
 *
 * Renders nothing unless NEXT_PUBLIC_META_PIXEL_ID is set.
 */
function PixelPageViews({ pixelId }: { pixelId: string }) {
  // usePathname only (not useSearchParams) — the latter forces every page in the
  // root layout into dynamic rendering.
  const pathname = usePathname();
  // fbq('init') already fires the first PageView; skip it here to avoid a double count.
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const w = window as Window & { fbq?: (method: string, event: string) => void };
    w.fbq?.('track', 'PageView');
  }, [pathname, pixelId]);

  return null;
}

export default function MetaPixel() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!pixelId) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${pixelId}');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        />
      </noscript>
      <PixelPageViews pixelId={pixelId} />
    </>
  );
}
