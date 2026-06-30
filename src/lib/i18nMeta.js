import { getSiteUrl } from './siteUrl';
import { routing } from '@/i18n/routing';

/** BCP47 → định dạng OpenGraph (Facebook). */
const OG_LOCALE = { en: 'en_US', es: 'es_ES', vi: 'vi_VN' };

/**
 * Trường openGraph.locale + alternateLocale (2 ngôn ngữ còn lại) cho trang đã dịch.
 * Spread vào trong object openGraph.
 */
export function ogLocale(locale) {
  return {
    locale: OG_LOCALE[locale] || OG_LOCALE[routing.defaultLocale],
    alternateLocale: routing.locales
      .filter((l) => l !== locale)
      .map((l) => OG_LOCALE[l]),
  };
}

/**
 * URL tuyệt đối cho 1 locale + path. en (defaultLocale) KHÔNG prefix; es/vi có prefix.
 * @param {string} locale
 * @param {string} path  ví dụ '/' hoặc '/services'
 */
export function localizedUrl(locale, path) {
  const base = getSiteUrl();
  const clean = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  return `${base}${prefix}${clean}` || `${base}/`;
}

/**
 * Meta cho trang ĐÃ DỊCH: self-canonical + hreflang đủ en/es/vi + x-default(→en).
 */
export function translatedMeta(locale, path) {
  const languages = {};
  for (const l of routing.locales) languages[l] = localizedUrl(l, path);
  languages['x-default'] = localizedUrl(routing.defaultLocale, path);
  return {
    alternates: {
      canonical: localizedUrl(locale, path),
      languages,
    },
  };
}

/**
 * Meta cho trang chỉ dịch MỘT SỐ locale (vd en + es), locale còn lại (vi) chưa dịch.
 * - locale đã dịch → self-canonical + hreflang chỉ gồm các locale đã dịch (+ x-default→en).
 * - locale chưa dịch → self-canonical + noindex,follow (không vào hreflang cluster).
 * @param {string[]} translatedLocales vd ['en','es']
 */
export function partialTranslatedMeta(locale, path, translatedLocales) {
  const self = localizedUrl(locale, path);
  if (!translatedLocales.includes(locale)) {
    return { alternates: { canonical: self }, robots: { index: false, follow: true } };
  }
  const languages = {};
  for (const l of translatedLocales) languages[l] = localizedUrl(l, path);
  languages['x-default'] = localizedUrl(routing.defaultLocale, path);
  return { alternates: { canonical: self, languages } };
}

/**
 * Meta cho trang KEYWORD đã dịch nội dung nhưng GỘP tín hiệu về 1 trang khác:
 * canonical trỏ `canonicalPath` (theo locale), KHÔNG hreflang riêng, KHÔNG noindex
 * (vẫn crawl được, Google theo canonical để index trang đích). Không đưa vào sitemap.
 */
export function consolidatedMeta(locale, canonicalPath) {
  return { alternates: { canonical: localizedUrl(locale, canonicalPath) } };
}

/**
 * Meta cho trang CHƯA DỊCH: self-canonical (trỏ chính nó), KHÔNG hreflang.
 * es/vi thêm robots noindex,follow để tránh Google index nội dung tiếng Anh trùng.
 * (Không trỏ canonical sang en — noindex + foreign-canonical là tín hiệu mâu thuẫn.)
 */
export function untranslatedMeta(locale, path) {
  return {
    alternates: { canonical: localizedUrl(locale, path) },
    ...(locale !== routing.defaultLocale
      ? { robots: { index: false, follow: true } }
      : {}),
  };
}
