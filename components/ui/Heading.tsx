import type { ReactNode } from 'react';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';

interface HeadingProps {
  children: ReactNode;
  level?: HeadingLevel;
  className?: string;
}

const levelClasses: Record<HeadingLevel, string> = {
  h1: 'text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight',
  h2: 'text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight',
  h3: 'text-xl sm:text-2xl font-semibold',
  h4: 'text-lg sm:text-xl font-semibold',
};

export default function Heading({ children, level = 'h2', className = '' }: HeadingProps) {
  const Tag = level;
  return <Tag className={`${levelClasses[level]} ${className}`}>{children}</Tag>;
}
