import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

/** Deep-merge: phủ bản dịch locale lên trên base (en). Key thiếu ở locale → tự dùng en. */
function deepMerge(base, override) {
  const out = { ...base };
  for (const [k, v] of Object.entries(override || {})) {
    if (v && typeof v === 'object' && !Array.isArray(v) && out[k] && typeof out[k] === 'object') {
      out[k] = deepMerge(out[k], v);
    } else {
      out[k] = v;
    }
  }
  return out;
}

/**
 * Chạy mỗi request — CHỈ load đúng 1 file dictionary của locale đang xem (+ base en để
 * fallback). Locale không hợp lệ → rơi về defaultLocale. Nhờ deep-merge với en, nội dung
 * CHƯA dịch ở 1 locale (vd category pages chưa có bản vi) tự hiển thị tiếng Anh thay vì lỗi.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const localeMessages = (await import(`../../messages/${locale}.json`)).default;
  const messages =
    locale === routing.defaultLocale
      ? localeMessages
      : deepMerge((await import(`../../messages/en.json`)).default, localeMessages);

  return { locale, messages };
});
