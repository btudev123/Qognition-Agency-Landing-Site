import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import { Geist } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import './growth.css';
import { organizationSchema } from '../lib/schema';
import { SITE_URL } from '../lib/seo';
import Navigation from '../components/shared/Navigation';
import Footer from '../components/shared/Footer';
import ChromeGate from '../components/shared/ChromeGate';
import StickyCTA from '../components/shared/StickyCTA';
import FloatingWhatsApp from '../components/shared/FloatingWhatsApp';
import MetaPixel from '../components/shared/MetaPixel';
import ConsentManager, { ConsentScripts } from '../components/shared/ConsentManager';
import AcquisitionTracker from '../components/shared/AcquisitionTracker';
import NoiseLayer from '../components/NoiseLayer';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Qognition | AI-native B2B Growth Agency',
    template: '%s | Qognition',
  },
  description:
    'Connect AI search visibility, demand generation, account-based marketing and revenue systems to build qualified B2B pipeline.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'Qognition',
    url: SITE_URL,
    title: 'Qognition | AI-native B2B Growth Agency',
    description:
      'Connect AI search visibility, demand generation, account-based marketing and revenue systems to build qualified B2B pipeline.',
    images: ['/default-og.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Qognition | AI-native B2B Growth Agency',
    description:
      'Connect AI search visibility, demand generation, account-based marketing and revenue systems to build qualified B2B pipeline.',
    images: ['/default-og.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png?v=teal', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png?v=teal', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png?v=teal', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png?v=teal', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon-32x32.png?v=teal'],
  },
  authors: [{ name: 'Qognition Agency' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#080808',
};

// One Organization definition for the whole site, imported from lib/schema.ts.
// This file previously declared its own inline copy while lib/schema.ts declared
// another, so /contact and every other page described Qognition differently.
// Two Organization nodes on one domain is a split entity, and entity clarity is
// the thing this business sells.
const orgSchema = organizationSchema();

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Qognition',
  url: SITE_URL,

};

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || 'G-4S2F6T5QET';
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-M83XBQG2';
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || 'x9bhw0zqaf';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = (await headers()).get('x-qognition-locale') || 'en';
  const marketingScriptsEnabled = process.env.NEXT_PUBLIC_ENABLE_MARKETING_SCRIPTS === 'true';

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={`${geist.variable} scroll-smooth`}>
      <body className="font-sans">
        <ConsentManager />
        <AcquisitionTracker />
        <ConsentScripts category="advertising">
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        </ConsentScripts>
        <ConsentScripts category="analytics">
        {/* GA4 */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="afterInteractive" />
        <Script id="ga4-config" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA4_ID}');`}
        </Script>
        {/* Microsoft Clarity (renders only when NEXT_PUBLIC_CLARITY_ID is set) */}
        {CLARITY_ID && (
          <Script id="clarity" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}
          </Script>
        )}
        </ConsentScripts>
        {/* Meta Pixel — gated on NEXT_PUBLIC_META_PIXEL_ID only. Deliberately not
            behind NEXT_PUBLIC_ENABLE_MARKETING_SCRIPTS: that flag gates the B2B
            deanonymization tools below, and the pixel must stay in lockstep with
            the server-side Conversions API call in /api/lead. */}
        <MetaPixel />
        {/* B2B visitor identification — enable in prod via env flag */}
        {marketingScriptsEnabled && (
          <>
            <ConsentScripts category="advertising">
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
            </ConsentScripts>
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <ChromeGate
          header={
            <>
              <NoiseLayer />
              <Navigation />
            </>
          }
          footer={
            <>
              <Footer />
              <StickyCTA />
              <FloatingWhatsApp />
            </>
          }
        >
          {children}
        </ChromeGate>
      </body>
    </html>
  );
}

