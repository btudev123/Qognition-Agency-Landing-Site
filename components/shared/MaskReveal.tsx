'use client';

import { useRef, useState, useEffect, type ReactNode } from 'react';

export default function MaskReveal({
  children,
  delay = 0,
  className = '',
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
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
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // If children is a plain string, split into words for mask reveal
  // If it's a ReactNode (e.g. <span>), wrap it in a mask directly
  if (typeof children === 'string') {
    const words = children.split(' ');
    return (
      <span ref={ref} className={className} style={{ display: 'inline', ...style }}>
        {words.map((word, i) => (
          <span key={i}>
            <span
              className={`rf-mask ${inView ? 'is-in' : ''}`}
              style={{ '--d': `${delay + i * 0.06}s` } as React.CSSProperties}
            >
              <span>{word}</span>
            </span>
            {i < words.length - 1 && ' '}
          </span>
        ))}
      </span>
    );
  }

  // Non-string children — wrap in a single mask
  return (
    <span ref={ref} className={className} style={{ display: 'inline', ...style }}>
      <span
        className={`rf-mask ${inView ? 'is-in' : ''}`}
        style={{ '--d': `${delay}s` } as React.CSSProperties}
      >
        <span>{children}</span>
      </span>
    </span>
  );
}
