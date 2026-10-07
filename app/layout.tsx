import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import { isPreviewDeployment } from '../lib/deploymentMode';
import { Geist } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import './growth.css';
import { organizationSchema, websiteSchema as buildWebsiteSchema } from '../lib/schema';
import { SITE_URL } from '../lib/seo';
import Navigation from '../components/shared/Navigation';
import Footer from '../components/shared/Footer';
import ChromeGate from '../components/shared/ChromeGate';
import StickyCTA from '../components/shared/StickyCTA';
import FloatingWhatsApp from '../components/shared/FloatingWhatsApp';
import MetaPixel from '../components/shared/MetaPixel';
import ConsentManager, { ConsentScripts } from '../components/shared/ConsentManager';
import { consentDefaultFor, consentModeScript } from '../lib/consent';
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
    default: 'Qognition | AI SEO & GEO for B2B',
    template: '%s | Qognition',
  },
  description:
    'AI SEO and GEO for B2B companies, including SaaS. Connect technical search foundations, expert content and authority work to qualified enquiries.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'Qognition',
    url: SITE_URL,
    title: 'Qognition | AI SEO & GEO for B2B',
    description:
      'AI SEO and GEO for B2B companies, including SaaS. Connect technical search foundations, expert content and authority work to qualified enquiries.',
    images: ['/default-og.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Qognition | AI SEO & GEO for B2B',
    description:
      'AI SEO and GEO for B2B companies, including SaaS. Connect technical search foundations, expert content and authority work to qualified enquiries.',
    images: ['/default-og.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  // Icon set is generated from public/brand/mark.svg by scripts/build-icons.mjs.
  // The SVG carries its own prefers-color-scheme block, so one file covers a tab
  // on light or dark browser chrome; the PNGs are the fallback and the home
  // screen. ?v=3 busts the cached raster set, which included a 343KB
  // "favicon.svg" that contained no path data at all — one base64 PNG in an
  // <svg> wrapper.
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.svg?v=3', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png?v=3', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png?v=3', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png?v=3', sizes: '48x48', type: 'image/png' },
      { url: '/icon-192.png?v=3', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png?v=3', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png?v=3', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon-32x32.png?v=3'],
  },
  authors: [{ name: 'Qognition Agency' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0A09',
};

// One Organization definition for the whole site, imported from lib/schema.ts.
// This file previously declared its own inline copy while lib/schema.ts declared
// another, so /contact and every other page described Qognition differently.
// Two Organization nodes on one domain is a split entity, and entity clarity is
// the thing this business sells.
const orgSchema = organizationSchema();

// Same rule as orgSchema: one WebSite node, defined in lib/schema.ts, carrying
// the @id the Organization and every provider/publisher reference resolves to.
const websiteSchema = buildWebsiteSchema();

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || 'G-4S2F6T5QET';
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-M83XBQG2';
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || 'x9bhw0zqaf';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const requestHeaders = await headers();
  const locale = requestHeaders.get('x-qognition-locale') || 'en';
  const preview = isPreviewDeployment();
  // Region consent default, operator decision 2026-10-06 (CLAUDE.md authority block). Opt-out for
  // US, CA, AU, AE, SG; opt-in for everywhere else and for a missing header. Previews are always
  // opt-in so they stay analytics-off. Pages rendered without request headers (force-static) get
  // no country and therefore fail closed to opt-in.
  const regionDefault = !preview && consentDefaultFor(requestHeaders.get('x-vercel-ip-country'));
  const marketingScriptsEnabled = !preview && process.env.NEXT_PUBLIC_ENABLE_MARKETING_SCRIPTS === 'true';

  return (
    <html suppressHydrationWarning lang={locale} data-consent-default={regionDefault ? 'granted' : 'denied'} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={`${geist.variable} scroll-smooth`}>
      <body className="font-sans">
        {/* Marks the document as able to run entrance animations.
            SYNCHRONOUS AND BEFORE PAINT, deliberately. The hidden start states
            for .rf-mask and .rf-reveal in globals.css are gated on .js-anim, so
            without this class every masked heading renders at its final
            position instead of being translated 110% outside its clipping box
            and waiting for an IntersectionObserver that may never run.
            Adding the class on mount instead would paint the text visible,
            then hide it, then animate it back in.
            Skipped entirely under prefers-reduced-motion, so those users get
            static content with no transform rather than a zeroed transition. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('js-anim')}}catch(e){}",
          }}
        />
        {/* Google Consent Mode v2 signal. MUST run before GTM and GA4 load.
            GTM is a container, not an ad tag, so it loads under `analytics`
            (Marcus, docs/strategy/2026-10/03-paid-and-cro.md §2.1). That is only
            safe because this block tells every Google tag inside the container
            what the visitor chose for advertising: ad_storage, ad_user_data and
            ad_personalization follow the `advertising` choice, analytics_storage
            follows `analytics`. Non-Google tags in the container (LinkedIn
            Insight etc.) must carry a GTM "Require additional consent: ad_storage"
            check; that is container config, not code.
            Default with no stored choice is the visitor's region default
            (operator decision 2026-10-06): granted in the opt-out regions (US, CA,
            AU, AE, SG), denied everywhere else including an unknown country. The
            same value is on <html data-consent-default>, which effectiveConsent()
            and ConsentScripts read, so this signal and the script gate agree. A
            stored explicit choice always wins. On an update the fallback is
            `denied`: a choice was just made and we could not read it.
            Global Privacy Control: with no stored choice and
            navigator.globalPrivacyControl === true, ad_storage, ad_user_data and
            ad_personalization are denied even in an opt-out region. Analytics
            keeps the region default. This is effectiveConsent() in lib/consent.ts,
            so the Google signal and the script gate agree for GPC visitors too.
            The script itself is consentModeScript() in the same file. */}
        {!preview && (
          <script
            dangerouslySetInnerHTML={{
              __html: consentModeScript(regionDefault),
            }}
          />
        )}
        <ConsentManager />
        {!preview && <AcquisitionTracker />}
        {!preview && <>
        <ConsentScripts category="analytics">
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
        </>}
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

