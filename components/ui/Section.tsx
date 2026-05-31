import type { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  spacing?: 'sm' | 'md' | 'lg';
}

const spacingClasses = {
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-16',
  lg: 'py-16 md:py-24',
};

export default function Section({ children, className = '', id, spacing = 'lg' }: SectionProps) {
  return (
    <section id={id} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${spacingClasses[spacing]} ${className}`}>
      {children}
    </section>
  );
}
