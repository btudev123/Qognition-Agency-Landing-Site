import type { ReactNode } from 'react';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';
type HeadingVariant = 'display' | 'default';

interface HeadingProps {
  children: ReactNode;
  level?: HeadingLevel;
  /** `display` renders at hero scale. Only for above-fold hero headings. */
  variant?: HeadingVariant;
  className?: string;
  id?: string;
}

/* Heading size lives here and nowhere else. Never pass a text-* class through
   `className` — scripts/audit-headings.mjs fails the build if you do. */
const levelClasses: Record<HeadingLevel, string> = {
  h1: 'text-h1 font-semibold',
  h2: 'text-h2 font-semibold',
  h3: 'text-h3 font-semibold',
  h4: 'text-h4 font-semibold',
};

export default function Heading({
  children,
  level = 'h2',
  variant = 'default',
  className = '',
  id,
}: HeadingProps) {
  const Tag = level;
  const size = variant === 'display' ? 'text-display font-semibold' : levelClasses[level];
  return (
    <Tag id={id} className={`${size} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
