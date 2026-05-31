'use client';

import { useRef, useState, useEffect, type ReactNode } from 'react';

export default function ScrollReveal({
  children,
  stagger = 0,
  as: As = 'div',
  className = '',
  style,
  threshold = 0.15,
}: {
  children: ReactNode;
  stagger?: number;
  as?: string;
  className?: string;
  style?: React.CSSProperties;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.unobserve(el);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  const Tag: any = As;
  return (
    <Tag
      ref={ref}
      className={`rf-reveal ${inView ? 'is-in' : ''} ${className}`.trim()}
      style={{
        transitionDelay: stagger ? `${stagger >= 10 ? stagger : stagger * 80}ms` : undefined,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
