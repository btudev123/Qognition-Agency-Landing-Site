import type { ElementType, ReactNode } from 'react';

type TextSize = 'body' | 'meta';
type TextTone = 'default' | 'muted' | 'faint' | 'accent' | 'inherit';

interface TextProps {
  children: ReactNode;
  /** Defaults to <p>. Use `span`/`div`/`li` when the parent is already a block. */
  as?: ElementType;
  /** `body` = all real prose. `meta` = labels, captions, badges, eyebrows. */
  size?: TextSize;
  tone?: TextTone;
  className?: string;
}

const sizeClasses: Record<TextSize, string> = {
  body: 'text-body',
  meta: 'text-meta',
};

const toneClasses: Record<TextTone, string> = {
  default: 'text-[var(--ink)]',
  muted: 'text-[var(--text-muted)]',
  faint: 'text-[var(--text-faint)]',
  accent: 'text-[var(--accent)]',
  inherit: '',
};

/* The only paragraph primitive. Two sizes, no exceptions — `body` for every
   piece of prose on the site, `meta` for supporting labels. Never pass a
   text-<size> class through `className`. */
export default function Text({
  children,
  as: Tag = 'p',
  size = 'body',
  tone = 'muted',
  className = '',
}: TextProps) {
  return (
    <Tag className={`${sizeClasses[size]} ${toneClasses[tone]} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
