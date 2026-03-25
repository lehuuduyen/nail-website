import { getSiteUrl } from '@/lib/siteUrl';

/**
 * robots.txt — cho phép index toàn site; chặn API và trang xác nhận đặt chỗ.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots() {
  const base = getSiteUrl();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/booking/confirmation'],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
