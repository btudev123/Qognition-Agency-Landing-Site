import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export const metadata: Metadata = {
  metadataBase: new URL('https://qognitionagency.com'),
  title: {
    default: 'Qognition Agency | Future-Ready Digital Marketing Solutions',
    template: '%s | Qognition Agency'
  },
  description: 'Premier digital marketing agency offering SEO, PPC, social media marketing, web development, and AI-powered solutions. Partner with industry experts in London, New York, Dubai, and Mumbai.',
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Qognition Agency',
    title: 'Qognition Agency | Future-Ready Digital Marketing Solutions',
    description: 'Premier digital marketing agency offering SEO, PPC, social media marketing, web development, and AI-powered solutions.',
    images: [
      {
        url: 'https://qognitionagency.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Qognition Agency'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Qognition Agency | Future-Ready Digital Marketing Solutions',
    description: 'Premier digital marketing agency offering SEO, PPC, social media marketing, web development, and AI-powered solutions.',
    images: ['https://qognitionagency.com/og-image.png']
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="canonical" href="https://qognitionagency.com/" />
        {/* Apollo Tracking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,o.onload=function(){window.trackingFunctions.onLoad({appId:"69dbb783ebc295000dadd671"})},document.head.appendChild(o)}initApollo();`
          }}
        />
        {/* Reb2b Tracking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(key) {if (window.reb2b) return;window.reb2b = {loaded: true};var s = document.createElement("script");s.async = true;s.src = "https://ddwl4m2hdecbv.cloudfront.net/b/" + key + "/" + key + ".js.gz";document.getElementsByTagName("script")[0].parentNode.insertBefore(s, document.getElementsByTagName("script")[0]);}("Z6PVLHQY3G6R");`
          }}
        />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-P4QMTWPJ');`
          }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-black text-white`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P4QMTWPJ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}