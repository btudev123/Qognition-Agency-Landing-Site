'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Work', href: '/case-studies' },
  { label: 'About', href: '/about' },
  { label: 'Locations', href: '/locations' },
  { label: 'Audit', href: '/free-seo-audit' },
  { label: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/') || pathname.startsWith(href + '?');
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(248, 248, 246, 0.82)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(1.2)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.2)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        <div
          className="max-w-[1440px] mx-auto px-5 sm:px-10 grid items-center gap-4 sm:gap-8 transition-all duration-400"
          style={{
            gridTemplateColumns: 'auto 1fr auto',
            height: scrolled ? 64 : 80,
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0"
            aria-label="Qognition home"
          >
            <img
              src="/favicon-192x192.png"
              alt=""
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg"
              width={32}
              height={32}
            />
            <span
              className="font-semibold text-lg tracking-tight hidden sm:inline"
              style={{ color: 'var(--ink)' }}
            >
              qognition<span style={{ color: 'var(--accent)' }}>.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center justify-center gap-0.5">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className="inline-flex items-center px-3.5 py-2.5 text-sm transition-colors duration-300 relative"
                  style={{ color: active ? 'var(--ink)' : 'var(--text-muted)' }}
                >
                  <span className="relative">
                    {item.label}
                    <span
                      className="absolute left-0 right-0 -bottom-1 h-px transition-transform duration-500"
                      style={{
                        background: 'var(--accent)',
                        transform: active ? 'scaleX(1)' : 'scaleX(0)',
                        transformOrigin: 'left',
                      }}
                    />
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/contact"
              className="px-5 py-2.5 text-[13px] font-medium tracking-tight transition-colors duration-300"
              style={{ background: 'var(--ink)', color: 'var(--bg)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-deep)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--ink)'; }}
            >
              Book strategy call →
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="flex lg:hidden items-center justify-end gap-3">
            <Link
              href="/contact"
              className="px-3 py-2 text-xs font-medium"
              style={{ background: 'var(--ink)', color: 'var(--bg)' }}
            >
              Book call
            </Link>
            <button
              type="button"
              className="p-2 -mr-2"
              style={{ color: 'var(--ink)' }}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[99] lg:hidden flex flex-col overflow-y-auto"
          style={{ background: 'var(--bg)', paddingTop: 80 }}
        >
          <div className="px-5 py-6 space-y-0.5">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center px-4 py-4 text-base font-medium transition-colors"
                  style={{
                    color: active ? 'var(--accent)' : 'var(--ink)',
                    background: active ? 'rgba(0,194,168,0.05)' : 'transparent',
                    borderLeft: active ? '2px solid var(--accent)' : '2px solid transparent',
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-6">
              <Link
                href="/contact"
                className="block w-full text-center px-4 py-3.5 text-sm font-medium"
                style={{ background: 'var(--ink)', color: 'var(--bg)' }}
              >
                Book strategy call →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
