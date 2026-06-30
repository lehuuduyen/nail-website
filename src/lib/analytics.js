/**
 * Shared client-side analytics helper.
 *
 * Fires the same event to both GA4 (gtag) and Microsoft Clarity. Safe to call
 * before either script has loaded — it no-ops instead of throwing, so navigation
 * (tel:, external links) is never blocked.
 *
 * Usage:
 *   import { trackEvent } from '@/lib/analytics';
 *   trackEvent('book_click', { location: 'hero' });
 *
 * Mọi event tự kèm `locale` (đọc từ <html lang>, đặt theo locale đang xem) để biết
 * khách ngôn ngữ nào convert tốt — KHÔNG đổi tên event, chỉ thêm param.
 */
export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined') return;

  const locale = document.documentElement.lang || undefined;
  const enriched = { ...(locale ? { locale } : {}), ...params };

  // GA4
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, enriched);
  }

  // Microsoft Clarity — custom event (filter session recordings by action)…
  if (typeof window.clarity === 'function') {
    window.clarity('event', name);
    // …plus set each param as a tag so recordings can be segmented by context.
    for (const [key, value] of Object.entries(enriched)) {
      if (value !== undefined && value !== null) {
        window.clarity('set', key, String(value));
      }
    }
  }
}
