import type { ReactNode } from 'react';
import Link from 'next/link';

interface CardProps {
  children: ReactNode;
  href?: string;
  className?: string;
}

export default function Card({ children, href, className = '' }: CardProps) {
  const base = `block rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-6 transition-all duration-200 ${
    href ? 'hover:border-[var(--accent)]/30 hover:-translate-y-0.5' : ''
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return <div className={base}>{children}</div>;
}
