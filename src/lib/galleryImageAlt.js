/**
 * SEO-friendly alt for gallery items (API: title, category).
 */

const CATEGORY_PHRASE = {
  manicure: 'manicure nail work',
  pedicure: 'pedicure and spa nail treatment',
  acrylic: 'acrylic nail design',
  other: 'nail salon design',
};

export function galleryImageAlt(item) {
  if (!item) return 'Nice Nails & Spa nail work Phoenix AZ';
  const cat = String(item.category || 'other').toLowerCase();
  const phrase = CATEGORY_PHRASE[cat] || CATEGORY_PHRASE.other;
  let title = String(item.title || '').trim();
  if (/^IMG_\d+$/i.test(title)) title = '';

  if (title) {
    return `${title} — ${phrase} at Nice Nails & Spa, Phoenix AZ`;
  }
  return `${phrase.charAt(0).toUpperCase() + phrase.slice(1)} at Nice Nails & Spa, Phoenix AZ`;
}
