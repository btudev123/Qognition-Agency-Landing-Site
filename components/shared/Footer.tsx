'use client';

import Link from 'next/link';
import { WHATSAPP_DISPLAY, WHATSAPP_LINK, CONTACT_EMAIL, PHONE_DISPLAY, PHONE_LINK, BOOKING_LINK } from '../../data/siteConfig';
import { SERVICES } from '../../data/services';

const column1 = [
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Work', href: '/case-studies' },
  { label: 'Regions', href: '/regions' },
  { label: 'Locations', href: '/locations' },
  { label: 'Contact', href: '/contact' },
];

const column2 = SERVICES.map((s) => ({ label: s.title, href: `/services/${s.id}` }));

const column3 = [
  { label: 'Free audit', href: '/free-seo-audit' },
  { label: 'Glossary', href: '/glossary' },
  { label: 'Comparisons', href: '/comparisons' },
  { label: 'Directory', href: '/directory' },
  { label: 'Free tools', href: '/free-tools' },
  { label: 'Languages', href: '/languages' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
];

const column4 = [
  { label: 'About us', href: '/about' },
  { label: 'Team', href: '/team' },
  { label: 'Process', href: '/process' },
  { label: 'Book a call', href: '/book' },
  { label: 'Privacy', href: '/legal/privacy' },
  { label: 'Terms', href: '/legal/terms' },
];

const contactInfo = [
  ['Email', CONTACT_EMAIL],
  ['Phone', PHONE_DISPLAY],
  ['WhatsApp', WHATSAPP_DISPLAY],
];

const socialLinks = [
  ['X', 'https://x.com/qognition_tech'],
  ['IN', 'https://linkedin.com/company/qognition-tech'],
  ['YT', 'https://youtube.com/@QognitionAgency'],
  ['FB', 'https://facebook.com/qognitiontech'],
  ['IG', 'https://instagram.com/qognition_agency'],
  ['BE', 'https://behance.net/qognition-agency'],
];

const translations = [
  "Let's talk",
  'Hablemos',
  'Parliamo',
  'Vamos conversar',
  'Discutons',
  'Lass uns chatten',
  '会话开始',
  'دعنا نتحدث',
  'चलिए बात करें',
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--bg)' }}>
      {/* Multilingual marquee */}
      <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', padding: '36px 0', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'inline-flex', gap: 80, animation: 'rf-marquee 80s linear infinite' }}>
          {[0, 1].map((loop) => (
            <div key={loop} style={{ display: 'inline-flex', gap: 80, alignItems: 'center' }}>
              {translations.map((t, i) => (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 80 }}>
                  <span style={{
                    fontFamily: 'var(--font-geist), Inter Tight, system-ui, sans-serif',
                    fontSize: 'clamp(48px, 8vw, 112px)',
                    lineHeight: 1,
                    fontWeight: 500,
                    letterSpacing: '-0.045em',
                    color: '#F3F0EA',
                  }}>
                    {t}
                  </span>
                  <span style={{ color: 'var(--accent)', fontSize: 32, fontFamily: 'JetBrains Mono, monospace' }}>·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-10" style={{ paddingTop: 96, paddingBottom: 40 }}>
        {/* CTA strip */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16" style={{ paddingBottom: 80, borderBottom: '1px solid #1f1a16' }}>
          <div>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--accent)',
              display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 28,
            }}>
              <span style={{ width: 24, height: 1, background: 'var(--accent)', display: 'inline-block' }} />
              09 · Get in touch
            </span>
            <h2 style={{
              fontFamily: 'var(--font-geist), Inter Tight, system-ui, sans-serif',
              fontSize: 'clamp(48px, 8vw, 112px)',
              lineHeight: 0.92,
              letterSpacing: '-0.045em',
              fontWeight: 500,
              margin: 0,
              color: 'var(--bg)',
            }}>
              And see how<br />we&apos;d drive<br />results for you.
            </h2>
            <div className="flex flex-wrap gap-3 mt-10">
              <a
                href={BOOKING_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-4 text-sm font-medium transition-colors"
                style={{
                  background: 'var(--accent)',
                  color: '#04221E',
                  border: '1px solid var(--accent)',
                }}
              >
                Book a call →
              </a>
              <Link
                href="/free-seo-audit"
                className="inline-flex items-center gap-2.5 px-6 py-4 text-sm font-medium transition-colors"
                style={{
                  background: 'transparent',
                  color: '#F3F0EA',
                  border: '1px solid rgba(255,255,255,0.25)',
                }}
              >
                Get a free audit
              </Link>
            </div>
          </div>
          <div>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'var(--accent)',
              display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 24,
            }}>
              <span style={{ width: 24, height: 1, background: 'var(--accent)', display: 'inline-block' }} />
              10 · Direct
            </span>
            <div className="grid gap-4">
              {contactInfo.map(([k, v]) => (
                <div
                  key={k}
                  className="grid gap-4 pb-3"
                  style={{
                    gridTemplateColumns: '100px 1fr',
                    borderBottom: '1px solid #1f1a16',
                  }}
                >
                  <span style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
                    color: 'var(--text-faint)', letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}>
                    {k}
                  </span>
                  {k === 'WhatsApp' ? (
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ fontSize: 16, color: 'var(--bg)' }}>{v}</a>
                  ) : k === 'Phone' ? (
                    <a href={PHONE_LINK} style={{ fontSize: 16, color: 'var(--bg)' }}>{v}</a>
                  ) : k === 'Email' ? (
                    <a href={`mailto:${v}`} style={{ fontSize: 16, color: 'var(--bg)' }}>{v}</a>
                  ) : (
                    <span style={{ fontSize: 16, color: 'var(--bg)' }}>{v}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12" style={{ paddingTop: 64, paddingBottom: 80 }}>
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <img src="/favicon-192x192.png" alt="" className="w-7 h-7 rounded-lg" width={28} height={28} />
              <span
                className="font-semibold text-xl tracking-tight"
                style={{ color: 'var(--bg)' }}
              >
                qognition<span style={{ color: 'var(--accent)' }}>.</span>
              </span>
            </Link>
            <p className="text-body mt-5 mb-7 max-w-[380px]" style={{ color: '#a8a294' }}>
              AI growth marketing partner for companies that need qualified leads, better search visibility, sharper creative, and measurable revenue systems.
            </p>
            <div className="flex gap-2.5 flex-wrap">
              {socialLinks.map(([k, url]) => (
                <a
                  key={k}
                  href={url}
                  target="_blank"
                  rel="noopener"
                  aria-label={k}
                  className="w-[38px] h-[38px] inline-flex items-center justify-center font-mono text-[10px] tracking-wider transition-colors"
                  style={{
                    border: '1px solid #2a2520',
                    color: '#a8a294',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.color = 'var(--accent)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#2a2520';
                    e.currentTarget.style.color = '#a8a294';
                  }}
                >
                  {k}
                </a>
              ))}
            </div>
          </div>

          {[
            { h: 'Sitemap', items: column1 },
            { h: 'Capabilities', items: column2 },
            { h: 'Resources', items: column3 },
            { h: 'Company', items: column4 },
          ].map((col) => (
            <div key={col.h}>
              <div
                className="font-mono text-[10px] tracking-[0.16em] uppercase mb-4"
                style={{ color: 'var(--accent)' }}
              >
                {col.h}
              </div>
              <ul className="list-none p-0 m-0 grid gap-3">
                {col.items.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm transition-colors"
                      style={{ color: '#d8d2c5' }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center pt-6"
          style={{
            borderTop: '1px solid #1f1a16',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
            color: '#a8a294',
            letterSpacing: '0.08em',
          }}
        >
          <span>© {new Date().getFullYear()} QOGNITION AGENCY</span>
          <span className="text-center hidden sm:block">LONDON · NEW YORK · DUBAI · BANGALORE · SYDNEY</span>
          <span className="text-right hidden sm:block">v4.21.0 · ALL SYSTEMS NOMINAL ●</span>
          <span className="sm:hidden">LDN · NYC · DXB · BLR · SYD</span>
        </div>
      </div>
    </footer>
  );
}
