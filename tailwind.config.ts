import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './views/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        black: '#050505',
        white: '#FFFFFF',
        primary: '#00C2A8',
        muted: {
          foreground: '#9CA3AF'
        },
        teal: {
          DEFAULT: '#00C2A8',
          400: '#00C2A8',
          500: '#00A892',
          900: '#00332D'
        },
        gray: {
          800: '#1F1F1F',
          900: '#121212'
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'Space Grotesk', 'sans-serif']
      },
      maxWidth: {
        '8xl': '90rem'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))'
      }
    }
  },
  plugins: []
};

export default config;
