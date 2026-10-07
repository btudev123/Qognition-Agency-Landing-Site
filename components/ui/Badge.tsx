import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'accent' | 'muted';
  className?: string;
}

export default function Badge({ children, variant = 'accent', className = '' }: BadgeProps) {
  const base =
    variant === 'accent'
      ? /* --s-accent is --accent-deep #0F766E on a light band and remaps to teal-400 under
           data-theme="dark", where a fixed --accent-deep falls to about 2.9:1. --accent
           (#14B8A6) was 2.49:1 on light and is graphics-only (CLAUDE.md §9). */
        'bg-[var(--accent-light)] text-[var(--s-accent)]'
      : 'bg-[var(--ink)]/5 text-[var(--text-muted)]';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${base} ${className}`}>
      {children}
    </span>
  );
}
