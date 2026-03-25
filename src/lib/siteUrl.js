/**
 * Origin chuẩn cho sitemap, robots, metadata (không có dấu / cuối).
 * Production: đặt NEXT_PUBLIC_SITE_URL=https://your-domain.com trên Vercel.
 */
export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
}

export function absoluteUrl(path) {
  const base = getSiteUrl();
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}
