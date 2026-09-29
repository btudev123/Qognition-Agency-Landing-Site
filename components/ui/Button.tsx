import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  children: ReactNode;
}

/* The primary fill was `bg-[var(--accent)] text-[var(--accent-deep)]`, which is
 * teal-500 under teal-700 text at 2.20:1 — the lowest-contrast control on the
 * site, on its most-used button.
 *
 * It is fixed through --btn-primary-* in globals.css rather than here, because
 * the correct pair inverts between grounds and a component cannot know which
 * ground it is on:
 *
 *   light   #FFFFFF on teal-700 #0F766E    5.47:1
 *   dark    ink #0A0A09 on teal-400        10.64:1
 *
 * White on teal is the easy mistake on dark: white on teal-400 is 1.59:1.
 * Hover now raises contrast on both grounds, which `brightness-110` could not
 * guarantee — it lightened the fill under text that was already too light.
 *
 * There is deliberately no focus-visible rule here. The site-wide ring in
 * globals.css is --accent-deep on light and white on dark, both clearing
 * SC 1.4.11. This component used to re-declare it as --accent at 2.49:1 and so
 * opted itself out of the fix.
 *
 * min-h-11 is 44px, the pointer target floor. `sm` was 30px tall.
 */
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] font-medium hover:bg-[var(--btn-primary-bg-hover)]',
  secondary:
    'border border-[var(--border-strong)] text-[var(--text)] hover:border-[var(--accent-deep)] hover:text-[var(--accent-deep)]',
  ghost:
    'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--card-bg)]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-11 px-3 py-1.5 text-sm',
  md: 'min-h-11 px-5 py-2.5 text-sm',
  lg: 'min-h-12 px-6 py-3 text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base = `inline-flex items-center justify-center gap-2 font-medium transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button className={base} {...props}>
      {children}
    </button>
  );
}
