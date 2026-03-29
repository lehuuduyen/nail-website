/**
 * PWA manifest — icon URLs kèm NEXT_PUBLIC_ICON_VERSION để tránh cache favicon cũ.
 * Sau khi chạy `npm run favicons`, tăng NEXT_PUBLIC_ICON_VERSION (local + Vercel) rồi deploy lại.
 */
export default function manifest() {
  const name = process.env.NEXT_PUBLIC_SALON_NAME || 'Nice Nails & Spa';
  const shortName = process.env.NEXT_PUBLIC_SALON_SHORT_NAME || 'Nice Nails';
  const v = process.env.NEXT_PUBLIC_ICON_VERSION;
  const q = v ? `?v=${encodeURIComponent(v)}` : '';

  return {
    name,
    short_name: shortName.slice(0, 12),
    icons: [
      {
        src: `/android-chrome-192x192.png${q}`,
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: `/android-chrome-512x512.png${q}`,
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone',
  };
}
