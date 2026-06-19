'use client';

import { useState, useEffect, useRef, type CSSProperties } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { TOP_NAV, SPOKE_MENUS, INDUSTRY_MENU, type TopNavItem } from '../../data/navigation';
import { BOOKING_LINK } from '../../data/siteConfig';

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [annoDismissed, setAnnoDismissed] = useState(true); // default hidden until mount (avoids flash)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setAnnoDismissed(localStorage.getItem('anno-dismissed') === '1');
  }, []);
  const annoVisible = !annoDismissed;
  const dismissAnno = () => {
    localStorage.setItem('anno-dismissed', '1');
    setAnnoDismissed(true);
  };
  const ANNO_H = 34;

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

  // Header goes solid/dark only on scroll. The menu now opens as a compact
  // floating dropdown, so hovering no longer flips the whole bar (smoother).
  const solid = scrolled;
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
      {/* Announcement strip — free-audit offers, dismissible */}
      {annoVisible && (
        <div
          className="fixed top-0 left-0 right-0 z-[101] flex items-center justify-center gap-4 px-4"
          style={{ height: ANNO_H, background: 'var(--accent)', color: '#04221E' }}
        >
          <Link
            href="/free-ai-audit?lm=ai-readiness"
            className="flex items-center gap-2 text-[12px] sm:text-[13px] font-semibold whitespace-nowrap hover:opacity-80 transition-opacity"
          >
            <span aria-hidden="true">⚡</span>
            Discover Your AI Readiness Score
            <span className="opacity-60 hidden sm:inline">— Free 3-Minute Audit</span>
            <span aria-hidden="true">→</span>
          </Link>
          <button onClick={dismissAnno} aria-label="Dismiss announcement" className="absolute right-3 p-1" style={{ color: '#04221E' }}>
            <X size={15} />
          </button>
        </div>
      )}
      <header
        className="fixed left-0 right-0 z-[100] transition-all duration-500"
        style={{
          top: annoVisible ? ANNO_H : 0,
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

                  {/* Compact floating dropdown */}
                  {menued && isOpen && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                      onMouseEnter={() => openNow(item.label)}
                      onMouseLeave={scheduleClose}
                    >
                      <DropdownPanel label={item.label} />
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden xl:flex items-center">
            <a
              href={BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-[13px] font-medium tracking-tight transition-colors duration-300"
              style={{ background: 'var(--accent)', color: '#04221E' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-deep)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#04221E'; }}
            >
              Book a Free Strategy Call →
            </a>
          </div>

          {/* Mobile toggle */}
          <div className="flex xl:hidden items-center justify-end gap-3">
            <a
              href={BOOKING_LINK}
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
              href={BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-4 py-3.5 mt-6 text-sm font-medium"
              style={{ background: 'var(--accent)', color: '#04221E' }}
            >
              Book a Free Strategy Call →
            </a>
          </div>
        </div>
      )}
    </>
  );
}

/* ── Compact floating dropdown ───────────────────────────────────────────── */

const PANEL_STYLE: CSSProperties = {
  background: 'rgba(10,10,11,0.97)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
  borderRadius: 14,
  transformOrigin: 'top center',
  animation: 'rf-page-in 0.24s cubic-bezier(0.22,1,0.36,1) both',
};

const ITEM_LINK =
  'group/i flex items-center justify-between gap-6 px-3 py-2 rounded-lg text-[13.5px] transition-colors';

function DropdownPanel({ label }: { label: string }) {
  if (label === 'Industries') {
    return (
      <div className="w-[440px] p-3" style={PANEL_STYLE}>
        <div className="px-3 pt-1.5 pb-2 font-mono text-[10px] tracking-[0.18em] uppercase" style={{ color: 'var(--accent)' }}>
          Industries
        </div>
        <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
          {INDUSTRY_MENU.map((ind) => (
            <Link key={ind.href} href={ind.href} className={ITEM_LINK} style={{ color: 'rgba(243,240,234,0.78)' }}>
              <span className="group-hover/i:text-white transition-colors">{ind.label}</span>
            </Link>
          ))}
        </div>
        <div className="mt-2 pt-2.5 px-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <Link href="/industries" className="text-[13px] font-medium" style={{ color: 'var(--accent)' }}>
            View all industries →
          </Link>
        </div>
      </div>
    );
  }

  const menu = Object.values(SPOKE_MENUS).find((m) => m.label === label);
  if (!menu) return null;

  return (
    <div className="w-[480px] p-3" style={PANEL_STYLE}>
      <div className="px-3 pt-1.5 pb-2 font-mono text-[10px] tracking-[0.18em] uppercase" style={{ color: 'var(--accent)' }}>
        {menu.label}
      </div>
      <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
        {menu.groups.map((group) => (
          <Link key={group.href} href={group.href} className={ITEM_LINK} style={{ color: 'rgba(243,240,234,0.78)' }}>
            <span className="group-hover/i:text-white transition-colors">{group.label}</span>
            <span className="opacity-0 group-hover/i:opacity-100 transition-opacity" style={{ color: 'var(--accent)' }}>→</span>
          </Link>
        ))}
      </div>
      <div className="mt-2 pt-2.5 px-3 flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <Link href={menu.href} className="text-[13px]" style={{ color: 'rgba(243,240,234,0.7)' }}>
          All {menu.label.toLowerCase()} →
        </Link>
        <Link href={menu.cta.href} className="text-[13px] font-medium" style={{ color: 'var(--accent)' }}>
          {menu.cta.label} →
        </Link>
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
