import type { Metadata } from 'next';
import { breadcrumbSchema } from '../../lib/schema';
import Heading from '../../components/ui/Heading';

export const metadata: Metadata = {
  title: 'Sitemap | Qognition',
  description: 'Full XML sitemap index of all platform endpoints for Qognition.',
  alternates: { canonical: '/sitemap' },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Sitemap', path: '/sitemap' }]),
          ]),
        }}
      />
      <main className="pt-32 px-6 md:px-12 max-w-7xl mx-auto pb-32">
        <header className="mb-12">
          <Heading level="h1" className="!text-4xl md:!text-6xl mb-4">XML Sitemap</Heading>
          <p className="text-body text-[var(--text-muted)]">Raw index of all platform endpoints.</p>
        </header>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-[var(--surface)] border-b border-[var(--border)]">
            <span className="text-xs font-mono text-[var(--text-muted)]">sitemap.xml</span>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--accent)] hover:text-[var(--text)] transition-colors"
            >
              View Raw XML
            </a>
          </div>
          <div className="p-8 text-center">
            <p className="text-body text-[var(--text-muted)] mb-4">
              The XML sitemap is generated automatically by Next.js at build time.
            </p>
            <a
              href="/sitemap.xml"
              target="_blank"
              className="inline-flex rounded-lg bg-[var(--accent)] text-[var(--accent-deep)] font-medium px-6 py-3 text-sm hover:brightness-110 transition-all"
            >
              Open sitemap.xml
            </a>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'Home', path: '/' },
            { label: 'Services', path: '/services' },
            { label: 'Case Studies', path: '/case-studies' },
            { label: 'Blog', path: '/blog' },
            { label: 'About', path: '/about' },
            { label: 'Contact', path: '/contact' },
            { label: 'Free SEO Audit', path: '/free-seo-audit' },
            { label: 'Resources', path: '/resources' },
            { label: 'Industries', path: '/industries' },
            { label: 'Regions', path: '/regions' },
            { label: 'Comparisons', path: '/comparisons' },
            { label: 'Glossary', path: '/glossary' },
            { label: 'Free Tools', path: '/free-tools' },
            { label: 'Team', path: '/team' },
            { label: 'Lead Gen Roadmap', path: '/lead-generation-roadmap' },
            { label: 'Backlink Roadmap', path: '/backlink-authority-roadmap' },
          ].map((link) => (
            <a
              key={link.path}
              href={link.path}
              className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] hover:border-[var(--accent)]/40 transition-all"
            >
              <span className="text-[var(--text)]">{link.label}</span>
              <span className="text-xs font-mono text-[var(--text-muted)]">{link.path}</span>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}
