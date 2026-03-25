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
        /** Đường vân / bronze trong marble — accent chính (link, viền, CTA solid) */
        'rose-gold': '#9E8B85',
        'rose-gold-deep': '#8A7974',
        /** Nền kem sáng marble */
        cream: '#F7F3F2',
        'cream-dark': '#F2EBE9',
        /** Panel / thẻ */
        surface: '#FAF8F7',
        'surface-soft': '#F2EBE9',
        /** Dusty rose / taupe giữa */
        'dusty-rose': '#DBCDC9',
        /** Xám lavender trong đá */
        lavender: '#C5B9B5',
        'lavender-deep': '#BDB2AF',
        /** Chữ ấm, không đen thuần */
        charcoal: '#4A4240',
        ink: '#4A4240',
        muted: '#8A7974',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-lato)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(to top, rgba(38,34,32,0.88) 0%, rgba(38,34,32,0.5) 40%, rgba(38,34,32,0.32) 100%)',
        /** CTA / band — gradient dusty → vein (thay metallic cũ) */
        'cta-gold':
          'linear-gradient(160deg, #DBCDC9 0%, #C5B9B5 38%, #9E8B85 72%, #8A7974 100%)',
        'marble-cta':
          'linear-gradient(160deg, #DBCDC9 0%, #C5B9B5 38%, #9E8B85 72%, #8A7974 100%)',
        /** Nút CTA vàng / rose-gold (mockup luxury) */
        'luxury-gold':
          'linear-gradient(135deg, #e8dcc4 0%, #c9a96e 38%, #a67c3d 72%, #8a6530 100%)',
      },
    },
  },
  plugins: [],
};
