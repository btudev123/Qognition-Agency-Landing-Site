import type { Metadata, Viewport } from 'next';
import { Geist } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { SITE_URL } from '../lib/seo';
import Navigation from '../components/shared/Navigation';
import Footer from '../components/shared/Footer';
import ChromeGate from '../components/shared/ChromeGate';
import StickyCTA from '../components/shared/StickyCTA';
import ExitIntentPopup from '../components/shared/ExitIntentPopup';
import FloatingWhatsApp from '../components/shared/FloatingWhatsApp';
import MetaPixel from '../components/shared/MetaPixel';
import CustomCursor from '../components/CustomCursor';
import NoiseLayer from '../components/NoiseLayer';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Qognition | AI-Native Growth Partner',
    template: '%s | Qognition',
  },
  description:
    'We help ambitious companies grow through SEO, AI search, paid media, content, brand, and revenue-focused engineering.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'Qognition',
    url: SITE_URL,
    title: 'Qognition | AI-Native Growth Partner',
    description:
      'We help ambitious companies grow through SEO, AI search, paid media, content, brand, and revenue-focused engineering.',
    images: ['/default-og.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Qognition | AI-Native Growth Partner',
    description:
      'We help ambitious companies grow through SEO, AI search, paid media, content, brand, and revenue-focused engineering.',
    images: ['/default-og.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon-32x32.png'],
  },
  authors: [{ name: 'Qognition Agency' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#080808',
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Qognition',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  description:
    'AI-native digital marketing agency. Strategy, branding, web, SEO, GEO & AI search, paid media, content, social, video, email automation, and CRO that turn search into booked calls.',
  serviceType: [
    'Strategy & Consulting',
    'Branding & Creative',
    'Web Design & Development',
    'SEO',
    'GEO & AI Search',
    'Paid Media (PPC)',
    'Content Marketing',
    'Social Media Marketing',
    'Video & Multimedia',
    'Email & Marketing Automation',
    'CRO & Analytics',
  ],
  sameAs: [
    'https://www.linkedin.com/company/qognition-tech',
    'https://twitter.com/qognition_tech',
    'https://www.instagram.com/qognition_agency/',
    'https://www.facebook.com/qognitiontech',
    'https://www.youtube.com/@QognitionAgency',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@qognitionagency.com',
    contactType: 'sales',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Qognition',
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/resources?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || 'G-4S2F6T5QET';
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-M83XBQG2';
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || 'x9bhw0zqaf';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const marketingScriptsEnabled = process.env.NEXT_PUBLIC_ENABLE_MARKETING_SCRIPTS === 'true';

  return (
    <html lang="en" className={`${geist.variable} scroll-smooth`}>
      <body className="font-sans">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
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
        <div data-chat-widget data-widget-id="6a9d69473dadf9f23d33955c" data-location-id="xZXIPTrirldKZ9fGQBvt"></div><script src="https://widgets.leadconnectorhq.com/loader.js" data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js" data-widget-id="6a9d69473dadf9f23d33955c" data-source="WEB_USER"></script>
        {/* Meta Pixel — gated on NEXT_PUBLIC_META_PIXEL_ID only. Deliberately not
            behind NEXT_PUBLIC_ENABLE_MARKETING_SCRIPTS: that flag gates the B2B
            deanonymization tools below, and the pixel must stay in lockstep with
            the server-side Conversions API call in /api/lead. */}
        <MetaPixel />
        {/* B2B visitor identification — enable in prod via env flag */}
        {marketingScriptsEnabled && (
          <>
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <ChromeGate
          header={
            <>
              <CustomCursor />
              <NoiseLayer />
              <Navigation />
            </>
          }
          footer={
            <>
              <Footer />
              <StickyCTA />
              <ExitIntentPopup />
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


