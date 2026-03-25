/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'rose-gold': '#D4AF8C',
        cream: '#F9F5F0',
        charcoal: '#2D2D2D',
        'dusty-rose': '#E8B4B8',
        ink: '#1A1A1A',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-dm)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(to top, rgba(26,26,26,0.92) 0%, rgba(26,26,26,0.35) 45%, rgba(26,26,26,0.2) 100%)',
        'cta-gold':
          'linear-gradient(135deg, #D4AF8C 0%, #c49a6c 50%, #b8895f 100%)',
      },
    },
  },
  plugins: [],
};
