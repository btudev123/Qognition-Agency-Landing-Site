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
      maxWidth: { '8xl': '90rem' },
      borderRadius: { DEFAULT: 'var(--radius)', lg: 'var(--radius-lg)' },
      keyframes: {
        'slide-up': { '0%': { transform: 'translateY(100%)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        'scale-in': { '0%': { transform: 'scale(0.95)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        pulse: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.4' } },
        'fade-up': { '0%': { transform: 'translateY(24px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        marquee: 'marquee 40s linear infinite',
        'marquee-slow': 'marquee 80s linear infinite',
        pulse: 'pulse 2s ease infinite',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};
