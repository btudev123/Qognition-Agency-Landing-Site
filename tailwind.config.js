/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#050505',
        white: '#FFFFFF',
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
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}