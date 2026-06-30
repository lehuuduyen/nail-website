import { absoluteUrl } from '@/lib/siteUrl';
import { VALID_CATEGORY_SLUGS } from '@/data/services';
import { getApiOrigin } from '@/lib/api';
import { routing } from '@/i18n/routing';
import { localizedUrl } from '@/lib/i18nMeta';

export const revalidate = 3600;

/**
 * Chỉ liệt kê URL INDEX ĐƯỢC. Trang đã dịch (translated:true) → có hreflang en/es/vi.
 * Trang chưa dịch → chỉ URL en (bản /es /vi đang noindex nên không đưa vào).
 * Không đưa: /booking/confirmation, /api/*, /_next/*.
 */
/** Category slug đã dịch ES (en + es). Các slug còn lại: en-only (es/vi noindex). */
const ES_TRANSLATED_CATEGORIES = new Set(['nails']);

const STATIC_ROUTES = [
  // langs = danh sách locale đã dịch & index được cho route đó (để sinh <url> + hreflang).
  { path: '/', changeFrequency: 'weekly', priority: 1, langs: routing.locales },
  { path: '/services', changeFrequency: 'weekly', priority: 0.95, langs: routing.locales },
  { path: '/specials', changeFrequency: 'daily', priority: 0.8, langs: routing.locales },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/booking', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/gallery', changeFrequency: 'weekly', priority: 0.78 },
  { path: '/videos', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.35 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.35 },
  ...VALID_CATEGORY_SLUGS.map((slug) => ({
    path: `/services/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.85,
    ...(ES_TRANSLATED_CATEGORIES.has(slug) ? { langs: ['en', 'es'] } : {}),
  })),
];

function buildStaticEntries(fallbackDate) {
  return STATIC_ROUTES.flatMap(({ path, changeFrequency, priority, langs }) => {
    // Chưa dịch (không có langs) → 1 entry URL en; bản locale khác đang noindex.
    if (!langs || langs.length <= 1) {
      return [{ url: absoluteUrl(path), lastModified: fallbackDate, changeFrequency, priority }];
    }
    // Đã dịch → MỖI locale đã dịch 1 <url> riêng, cùng chia sẻ cụm hreflang của các locale đó.
    const languages = {};
    for (const l of langs) languages[l] = localizedUrl(l, path);
    return langs.map((locale) => ({
      url: localizedUrl(locale, path),
      lastModified: fallbackDate,
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  });
}

async function fetchBlogSitemapEntries(fallbackDate) {
  const res = await fetch(`${getApiOrigin()}/api/public/blog`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  const posts = await res.json();
  if (!Array.isArray(posts) || !posts.length) return [];

  const seen = new Set();
  return posts
    .filter((p) => p.slug && typeof p.slug === 'string' && !seen.has(p.slug) && seen.add(p.slug))
    .map((p) => {
      const last =
        p.updatedAt != null
          ? new Date(p.updatedAt)
          : p.publishedAt != null
            ? new Date(p.publishedAt)
            : fallbackDate;
      return {
        url: absoluteUrl(`/blog/${p.slug}`),
        lastModified: last,
        changeFrequency: 'monthly',
        priority: 0.72,
      };
    });
}

export default async function sitemap() {
  const fallbackDate = new Date();

  const staticEntries = buildStaticEntries(fallbackDate);

  try {
    const blogEntries = await fetchBlogSitemapEntries(fallbackDate);
    const merged = [...staticEntries, ...blogEntries];
    merged.sort((a, b) => a.url.localeCompare(b.url));
    return merged;
  } catch {
    const sorted = [...staticEntries].sort((a, b) => a.url.localeCompare(b.url));
    return sorted;
  }
}
