'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { TOP_NAV, SPOKE_MENUS, INDUSTRY_MENU, type TopNavItem } from '../../data/navigation';
import { CALENDLY_LINK } from '../../data/siteConfig';

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/') || pathname.startsWith(href + '?');
  };

  // Header is "solid/dark" when scrolled OR a mega-menu is open. In that state,
  // nav text must be light to stay readable on the dark bar (fixes the contrast bug).
  const solid = scrolled || openMenu !== null;
  const navTextColor = (active: boolean) =>
    solid
      ? (active ? '#FFFFFF' : 'rgba(243,240,234,0.72)')
      : (active ? 'var(--ink)' : 'var(--text-muted)');
  const logoColor = solid ? '#F3F0EA' : 'var(--ink)';

  const openNow = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(key);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  const hasMenu = (item: TopNavItem) => item.type === 'spoke' || item.type === 'industries';

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
        style={{
          background: solid ? 'rgba(8, 8, 8, 0.92)' : 'transparent',
          backdropFilter: solid ? 'blur(20px) saturate(1.2)' : 'none',
          WebkitBackdropFilter: solid ? 'blur(20px) saturate(1.2)' : 'none',
          borderBottom: solid ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        }}
        onMouseLeave={scheduleClose}
      >
        <div
          className="max-w-[1440px] mx-auto px-5 sm:px-10 grid items-center gap-4 xl:gap-6 transition-all duration-400"
          style={{ gridTemplateColumns: 'auto 1fr auto', height: scrolled ? 64 : 80 }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Qognition home">
            <img src="/favicon-192x192.png" alt="" className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg" width={32} height={32} />
            <span className="font-semibold text-lg tracking-tight hidden sm:inline transition-colors duration-300" style={{ color: logoColor }}>
              qognition<span style={{ color: 'var(--accent)' }}>.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center justify-center gap-0.5">
            {TOP_NAV.map((item) => {
              const active = isActive(item.href);
              const menued = hasMenu(item);
              const isOpen = openMenu === item.label;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => menued && openNow(item.label)}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    aria-expanded={menued ? isOpen : undefined}
                    className="inline-flex items-center gap-1 px-3 py-2.5 text-sm transition-colors duration-300 relative"
                    style={{ color: navTextColor(active) }}
                    onFocus={() => menued && openNow(item.label)}
                  >
                    <span className="relative">
                      {item.label}
                      <span
                        className="absolute left-0 right-0 -bottom-1 h-px transition-transform duration-500"
                        style={{ background: 'var(--accent)', transform: active ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left' }}
                      />
                    </span>
                    {menued && (
                      <ChevronDown size={13} className="transition-transform duration-300" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', opacity: 0.6 }} />
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden xl:flex items-center">
            <a
              href={CALENDLY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-[13px] font-medium tracking-tight transition-colors duration-300"
              style={{ background: 'var(--accent)', color: '#04221E' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-deep)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#04221E'; }}
            >
              Book a call →
            </a>
          </div>

          {/* Mobile toggle */}
          <div className="flex xl:hidden items-center justify-end gap-3">
            <a
              href={CALENDLY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-xs font-medium"
              style={{ background: 'var(--accent)', color: '#04221E' }}
            >
              Book
            </a>
            <button
              type="button"
              className="p-2 -mr-2 transition-colors"
              style={{ color: logoColor }}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Desktop mega-menu panel */}
        {openMenu && (
          <div
            className="hidden xl:block absolute left-0 right-0 top-full"
            onMouseEnter={() => openNow(openMenu)}
            onMouseLeave={scheduleClose}
          >
            <div
              className="border-t"
              style={{
                background: 'rgba(10,10,11,0.97)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderColor: 'rgba(255,255,255,0.08)',
                boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
                animation: 'rf-page-in 0.35s cubic-bezier(0.22,1,0.36,1) both',
              }}
            >
              <div className="max-w-[1440px] mx-auto px-10 py-10">
                <MegaPanel label={openMenu} />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile drawer with accordion */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[99] xl:hidden flex flex-col overflow-y-auto" style={{ background: 'var(--bg)', paddingTop: 72 }}>
          <div className="px-5 py-4 pb-24">
            {TOP_NAV.map((item) => {
              const active = isActive(item.href);
              const menued = hasMenu(item);
              const expanded = mobileExpanded === item.label;
              if (!menued) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center px-4 py-4 text-base font-medium border-b"
                    style={{ color: active ? 'var(--accent)' : 'var(--ink)', borderColor: 'var(--border)' }}
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <div key={item.label} className="border-b" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex items-center justify-between">
                    <Link href={item.href} className="flex-1 px-4 py-4 text-base font-medium" style={{ color: active ? 'var(--accent)' : 'var(--ink)' }}>
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      aria-label={`Expand ${item.label}`}
                      aria-expanded={expanded}
                      className="px-4 py-4"
                      onClick={() => setMobileExpanded(expanded ? null : item.label)}
                    >
                      <ChevronDown size={18} style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', color: 'var(--text-muted)' }} />
                    </button>
                  </div>
                  {expanded && (
                    <div className="pb-4 pl-4">
                      <MobileSub label={item.label} />
                    </div>
                  )}
                </div>
              );
            })}
            <a
              href={CALENDLY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-4 py-3.5 mt-6 text-sm font-medium"
              style={{ background: 'var(--accent)', color: '#04221E' }}
            >
              Book a call →
            </a>
          </div>
        </div>
      )}
    </>
  );
}

/* ── Desktop mega panel content ──────────────────────────────────────────── */

function MegaPanel({ label }: { label: string }) {
  if (label === 'Industries') {
    return (
      <div>
        <div className="flex items-baseline justify-between mb-7">
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase" style={{ color: 'var(--accent)' }}>
            Industries we operate in
          </span>
          <Link href="/industries" className="text-[13px] rf-link" style={{ color: 'rgba(243,240,234,0.7)' }}>
            View all industries →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-6">
          {INDUSTRY_MENU.map((ind) => (
            <div key={ind.href}>
              <Link href={ind.href} className="block text-[14px] font-medium mb-2 transition-colors" style={{ color: '#F3F0EA' }}>
                {ind.label}
              </Link>
              <ul className="space-y-1.5">
                {ind.subItems.map((sub) => (
                  <li key={sub.href}>
                    <Link href={sub.href} className="text-[13px] transition-colors hover:text-white" style={{ color: 'rgba(243,240,234,0.55)' }}>
                      {sub.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const menu = Object.values(SPOKE_MENUS).find((m) => m.label === label);
  if (!menu) return null;

  return (
    <div className="grid gap-10" style={{ gridTemplateColumns: '260px 1fr' }}>
      {/* Intro rail */}
      <div className="flex flex-col">
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase mb-3" style={{ color: 'var(--accent)' }}>
          Qognition {menu.label}
        </span>
        <p className="text-[15px] leading-relaxed mb-5" style={{ color: 'rgba(243,240,234,0.7)' }}>
          {menu.blurb}
        </p>
        <Link href={menu.href} className="text-[13px] rf-link mb-2" style={{ color: '#F3F0EA' }}>
          Explore {menu.label} →
        </Link>
        <Link href={menu.cta.href} className="text-[13px]" style={{ color: 'var(--accent)' }}>
          {menu.cta.label} →
        </Link>
      </div>

      {/* Service columns */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-7">
        {menu.groups.map((group) => (
          <div key={group.label}>
            <Link href={group.href} className="block text-[14px] font-medium mb-2.5" style={{ color: '#F3F0EA' }}>
              {group.label}
            </Link>
            <ul className="space-y-1.5">
              {group.items.map((sub) => (
                <li key={sub.href}>
                  <Link href={sub.href} className="text-[13px] transition-colors hover:text-white" style={{ color: 'rgba(243,240,234,0.55)' }}>
                    {sub.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Mobile sub-list ──────────────────────────────────────────────────────── */

function MobileSub({ label }: { label: string }) {
  if (label === 'Industries') {
    return (
      <ul className="space-y-2.5">
        {INDUSTRY_MENU.map((ind) => (
          <li key={ind.href}>
            <Link href={ind.href} className="text-[14px]" style={{ color: 'var(--ink-soft)' }}>
              {ind.label}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/industries" className="text-[13px] font-medium" style={{ color: 'var(--accent)' }}>
            View all industries →
          </Link>
        </li>
      </ul>
    );
  }

  const menu = Object.values(SPOKE_MENUS).find((m) => m.label === label);
  if (!menu) return null;

  return (
    <div className="space-y-4">
      {menu.groups.map((group) => (
        <div key={group.label}>
          <Link href={group.href} className="block text-[13px] font-semibold mb-1.5" style={{ color: 'var(--ink)' }}>
            {group.label}
          </Link>
          <ul className="space-y-1.5 pl-1">
            {group.items.map((sub) => (
              <li key={sub.href}>
                <Link href={sub.href} className="text-[13.5px]" style={{ color: 'var(--ink-soft)' }}>
                  {sub.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
