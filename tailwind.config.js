/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        'hero': ['clamp(2.5rem, 8vw, 8rem)', { lineHeight: '1.1', fontWeight: '700' }],
      },
    },
  },
  plugins: [],
}


