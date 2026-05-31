import type { Metadata, Viewport } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { SITE_URL } from '../lib/seo';
import Navigation from '../components/shared/Navigation';
import Footer from '../components/shared/Footer';
import StickyCTA from '../components/shared/StickyCTA';
import ExitIntentPopup from '../components/shared/ExitIntentPopup';

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
  themeColor: '#F3F0EA',
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Qognition',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  description:
    'The operating partner for founders. We run marketing, tech, finance, and automation so founders can build.',
  serviceType: [
    'AI-Native Growth Marketing',
    'Revenue-Focused Engineering',
    'Financial Operations',
    'AI Agents & Intelligent Automation',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} scroll-smooth`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Navigation />
        <main className="min-h-screen bg-[var(--bg)]">{children}</main>
        <Footer />
        <StickyCTA />
        <ExitIntentPopup />
      </body>
    </html>
  );
}
