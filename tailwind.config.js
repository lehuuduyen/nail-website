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
        /** Chữ ấm — ink đủ tương phản trên cream (~7:1); muted phụ đạt WCAG AA (~5.5:1) */
        charcoal: '#3D3836',
        ink: '#3D3836',
        /** Trước #8A7974 (~3.5:1) — quá nhạt trên marble/cream */
        muted: '#524845',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-lato)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        /** Hero: overlay đậm trái, trong suốt phải — chữ trái đọc rõ, tay/móng phải lộ ảnh */
        'hero-gradient':
          'linear-gradient(to right, rgba(10,6,4,0.88) 0%, rgba(10,6,4,0.72) 38%, rgba(10,6,4,0.25) 65%, rgba(10,6,4,0) 100%)',
        /** CTA / band — gradient dusty → vein (thay metallic cũ) */
        'cta-gold':
          'linear-gradient(160deg, #DBCDC9 0%, #C5B9B5 38%, #9E8B85 72%, #8A7974 100%)',
        'marble-cta':
          'linear-gradient(160deg, #DBCDC9 0%, #C5B9B5 38%, #9E8B85 72%, #8A7974 100%)',
        /** Nút CTA vàng / rose-gold (mockup luxury) */
        'luxury-gold':
          'linear-gradient(135deg, #e8dcc4 0%, #c9a96e 38%, #a67c3d 72%, #8a6530 100%)',
      },
      keyframes: {
        /** Vệt sáng quét ngang badge promo */
        'promo-shine': {
          '0%': { transform: 'translateX(-150%) skewX(-20deg)' },
          '60%, 100%': { transform: 'translateX(250%) skewX(-20deg)' },
        },
        /** Vòng glow lan ra từ nút CTA promo */
        'promo-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(158, 139, 133, 0.55)' },
          '55%': { boxShadow: '0 0 0 12px rgba(158, 139, 133, 0)' },
        },
      },
      animation: {
        'promo-shine': 'promo-shine 3s ease-in-out infinite',
        'promo-glow': 'promo-glow 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
