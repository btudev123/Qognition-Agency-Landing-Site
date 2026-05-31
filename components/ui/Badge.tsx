import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'accent' | 'muted';
  className?: string;
}

export default function Badge({ children, variant = 'accent', className = '' }: BadgeProps) {
  const base =
    variant === 'accent'
      ? 'bg-[var(--accent-light)] text-[var(--accent)]'
      : 'bg-[var(--ink)]/5 text-[var(--text-muted)]';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${base} ${className}`}>
      {children}
    </span>
  );
}
