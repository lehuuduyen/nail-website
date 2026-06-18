import { getApiOrigin } from '@/lib/api';

/**
 * BlogPost has no category column, so we match published posts to a service
 * category by scanning each post's keywords + title + slug for these terms.
 */
const CATEGORY_BLOG_TERMS = {
  manicure: ['manicure'],
  pedicure: ['pedicure', 'foot spa', 'foot care'],
  nails: [
    'acrylic',
    'gel nail',
    'gel-x',
    'gel x',
    'dip',
    'dipping',
    'nail art',
    'nail design',
    'full set',
    'fill-in',
    'fill in',
    'ombre',
    'french',
  ],
  lash: ['lash', 'eyelash'],
  head_spa: ['head spa', 'scalp'],
  facial: ['facial'],
  kids: ['kids', 'children', 'child'],
  waxing: ['wax'],
  addon: ['add-on', 'addon', 'paraffin', 'nail art'],
};

function matchesCategory(post, terms) {
  const haystack = `${post.keywords || ''} ${post.title || ''} ${post.slug || ''}`.toLowerCase();
  return terms.some((t) => haystack.includes(t));
}

/**
 * Published posts relevant to a service category, most recent first.
 * Server-only fetch with graceful fallback to [] when the API is down.
 */
export async function getRelatedPosts(category, limit = 3) {
  const terms = CATEGORY_BLOG_TERMS[category];
  if (!terms) return [];
  try {
    const res = await fetch(`${getApiOrigin()}/api/public/blog`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const posts = await res.json();
    if (!Array.isArray(posts)) return [];
    return posts
      .filter((p) => p.slug && matchesCategory(p, terms))
      .slice(0, limit)
      .map((p) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt || p.metaDescription || '',
        readingMinutes: p.readingMinutes || null,
      }));
  } catch {
    return [];
  }
}
