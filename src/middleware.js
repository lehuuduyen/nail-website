import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

/**
 * next-intl middleware: đọc Accept-Language + cookie NEXT_LOCALE, redirect mềm
 * (302) sang locale khớp CHỈ lần đầu (chưa có cookie). Có cookie → theo cookie.
 * KHÔNG chặn truy cập trực tiếp /es /vi (Googlebot vào được cả 3).
 */
export default createMiddleware(routing);

export const config = {
  // Bỏ qua /api, /_next, /_vercel và mọi file tĩnh (path có dấu chấm:
  // sitemap.xml, robots.txt, ảnh, favicon...).
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
