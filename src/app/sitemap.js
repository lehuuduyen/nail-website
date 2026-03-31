import { absoluteUrl } from '@/lib/siteUrl';
import { VALID_CATEGORY_SLUGS } from '@/data/services';
import { getApiOrigin } from '@/lib/api';

export const revalidate = 3600;

/**
 * Trang index được — không đưa: /booking/confirmation, /api/*, /_next/*.
 * Blog: slug từ GET /api/public/blog (lastModified = updatedAt nếu có).
 */
const STATIC_ROUTES = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/services', changeFrequency: 'weekly', priority: 0.95 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/booking', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/gallery', changeFrequency: 'weekly', priority: 0.78 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.35 },
  { path: '/services/gel-nails-phoenix', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services/nail-art-phoenix-az', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services/acrylic-nails-phoenix-az', changeFrequency: 'monthly', priority: 0.8 },
  ...VALID_CATEGORY_SLUGS.map((slug) => ({
    path: `/services/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.85,
  })),
];

function buildStaticEntries(fallbackDate) {
  return STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: absoluteUrl(path),
    lastModified: fallbackDate,
    changeFrequency,
    priority,
  }));
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
