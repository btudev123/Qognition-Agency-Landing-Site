import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import Script from 'next/script';
import React from 'react';
import ClientLayout from './ClientLayout';
import './globals.css';
import { SITE_URL } from '../lib/seo';
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Qognition Agency | AI Growth Marketing Partner',
    template: '%s | Qognition Agency'
  },
  description:
    'AI growth marketing partner for qualified leads, SEO, AI search visibility, PPC, social media, web design, branding, and creative systems.',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    siteName: 'Qognition Agency',
    url: SITE_URL,
    title: 'Qognition Agency | AI Growth Marketing Partner',
    description:
      'AI growth marketing partner for qualified leads, SEO, AI search visibility, PPC, social media, web design, branding, and creative systems.',
    images: ['/default-og.svg']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Qognition Agency | AI Growth Marketing Partner',
    description:
      'AI growth marketing partner for qualified leads, SEO, AI search visibility, PPC, social media, web design, branding, and creative systems.',
    images: ['/default-og.svg']
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon-32x32.png']
  },
  authors: [{ name: 'Qognition Agency' }]
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#00C2A8'
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Qognition Agency',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  description:
    'AI growth marketing partner for qualified leads, SEO, AI search visibility, PPC, social media, web design, branding, and creative systems.',
  areaServed: ['United States', 'Canada', 'United Kingdom', 'Europe', 'GCC', 'India', 'Australia', 'Global'],
  serviceType: ['SEO Services', 'PPC Management', 'Social Media Marketing', 'Web Design', 'AI SEO', 'Branding and Creative'],
  sameAs: [
    'https://www.linkedin.com/company/qognition-tech',
    'https://twitter.com/qognition_tech',
    'https://www.instagram.com/qognition_agency/',
    'https://www.facebook.com/qognitiontech',
    'https://www.youtube.com/@QognitionAgency'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@qognitionagency.com',
    contactType: 'sales',
    availableLanguage: ['English', 'Arabic', 'French', 'Spanish', 'Mandarin Chinese', 'Portuguese', 'Russian', 'Japanese']
  }
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Qognition Agency',
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/directory?q={search_term_string}`,
    'query-input': 'required name=search_term_string'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const hubSpotTrackingId = process.env.NEXT_PUBLIC_HUBSPOT_TRACKING_ID;
  const marketingScriptsEnabled = process.env.NEXT_PUBLIC_ENABLE_MARKETING_SCRIPTS === 'true';
  const googleTagManagerId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-P4QMTWPJ';

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <body>
        {marketingScriptsEnabled && (
          <>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
              />
            </noscript>
            <Script id="gtm" strategy="lazyOnload">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${googleTagManagerId}');`}
            </Script>
            <Script id="leadfeeder" strategy="lazyOnload">
              {`(function(ss,ex){ window.ldfdr=window.ldfdr||function(){(ldfdr._q=ldfdr._q||[]).push([].slice.call(arguments));}; (function(d,s){ var fs=d.getElementsByTagName(s)[0]; function ce(src){ var cs=d.createElement(s); cs.src=src; cs.async=1; fs.parentNode.insertBefore(cs,fs); }; ce('https://sc.lfeeder.com/lftracker_v1_'+ss+(ex?'_'+ex:'')+'.js'); })(document,'script'); })('JMvZ8gvz0Mea2pOd');`}
            </Script>
            <Script
              id="warmly-script-loader"
              src="https://opps-widget.getwarmly.com/warmly.js?clientId=068e9213ab8b4b30a08f7b13e53ab215"
              strategy="lazyOnload"
            />
            <Script id="reb2b" strategy="lazyOnload">
              {`!function(key) {if (window.reb2b) return;window.reb2b = {loaded: true};var s = document.createElement("script");s.async = true;s.src = "https://ddwl4m2hdecbv.cloudfront.net/b/" + key + "/" + key + ".js.gz";document.getElementsByTagName("script")[0].parentNode.insertBefore(s, document.getElementsByTagName("script")[0]);}("Z6PVLHQY3G6R");`}
            </Script>
          </>
        )}
        {marketingScriptsEnabled && hubSpotTrackingId && (
          <Script
            id="hubspot-tracking"
            src={`https://js.hs-scripts.com/${hubSpotTrackingId}.js`}
            strategy="lazyOnload"
          />
        )}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
