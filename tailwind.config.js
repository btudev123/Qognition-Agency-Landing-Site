/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: 'var(--accent)',
        'accent-deep': 'var(--accent-deep)',
        'accent-pale': 'var(--accent-pale)',
        bg: 'var(--bg)',
        'bg-warm': 'var(--bg-warm)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        'text-primary': 'var(--ink)',
        'text-muted': 'var(--text-muted)',
        'text-faint': 'var(--text-faint)',
        border: 'var(--border)',
        'border-strong': 'var(--border-strong)',
        'card-bg': 'var(--card-bg)',
      },
      fontFamily: {
        sans: ['var(--font-geist)', 'Geist', 'Inter Tight', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SF Mono', 'monospace'],
      },
      /* ── Canonical type scale ────────────────────────────────────────────
         One token per role. Fluid via clamp() so there are no per-breakpoint
         overrides in JSX. Every heading and every paragraph on the site
         resolves to one of these — see components/ui/Heading.tsx,
         components/ui/Text.tsx and the .prose-q block in app/globals.css. */
      fontSize: {
        display: ['clamp(2.75rem, 6vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        h1: ['clamp(2.25rem, 4.5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        h2: ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        h3: ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        h4: ['1.125rem', { lineHeight: '1.35', letterSpacing: '-0.01em' }],
        body: ['1.0625rem', { lineHeight: '1.7' }],
        meta: ['0.8125rem', { lineHeight: '1.5' }],
      },
      maxWidth: { '8xl': '90rem' },
      borderRadius: { DEFAULT: 'var(--radius)', lg: 'var(--radius-lg)' },
      keyframes: {
        'slide-up': { '0%': { transform: 'translateY(100%)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        'scale-in': { '0%': { transform: 'scale(0.95)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        pulse: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.4' } },
        'fade-up': { '0%': { transform: 'translateY(24px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        'orb-drift': {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)' },
          '33%': { transform: 'translate(4%, -6%) scale(1.08)' },
          '66%': { transform: 'translate(-3%, 5%) scale(0.96)' },
        },
        'orb-drift-b': {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)' },
          '33%': { transform: 'translate(-5%, 4%) scale(1.06)' },
          '66%': { transform: 'translate(6%, -3%) scale(0.94)' },
        },
        'orb-drift-c': {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)' },
          '33%': { transform: 'translate(3%, 7%) scale(0.98)' },
          '66%': { transform: 'translate(-4%, -5%) scale(1.10)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        marquee: 'marquee 40s linear infinite',
        'marquee-slow': 'marquee 80s linear infinite',
        pulse: 'pulse 2s ease infinite',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'orb-drift-a': 'orb-drift 18s ease-in-out infinite',
        'orb-drift-b': 'orb-drift-b 24s ease-in-out infinite 4s',
        'orb-drift-c': 'orb-drift-c 30s ease-in-out infinite 10s',
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
