/**
 * Local WebP under /public/images. Dimensions must match files (CLS).
 * Regenerate WebP: add PNG/JPG sources, then `npm run images:webp` in nail-website.
 */

/** Hero LCP — prefer smaller WebP (hero-manicure) over heavy nail-art file */
export const HERO_IMAGE = {
  src: '/images/hero-manicure.webp',
  width: 682,
  height: 1024,
};

export const SERVICE_CARD_IMAGES = {
  manicure: {
    src: '/images/popular-manicure.webp',
    width: 1024,
    height: 1024,
    alt: 'Professional manicure service at Nice Nails Spa Phoenix AZ',
  },
  pedicure: {
    src: '/images/popular-pedicure.webp',
    width: 1024,
    height: 1024,
    alt: 'Relaxing pedicure spa treatment Phoenix AZ 85021',
  },
  acrylic: {
    src: '/images/popular-acrylic-nails.webp',
    width: 682,
    height: 1024,
    alt: 'Acrylic nail extensions North Phoenix Arizona',
  },
  nailArt: {
    src: '/images/popular-nail-art.webp',
    width: 682,
    height: 1024,
    alt: 'Custom nail art designs Phoenix AZ Nice Nails Spa',
  },
};

export const WHY_LOVE_IMAGES = {
  manicure: {
    src: '/images/why-love-manicure.webp',
    width: 682,
    height: 1024,
  },
  salonInterior: {
    src: '/images/salon-interior.webp',
    width: 1024,
    height: 682,
  },
};

export const ABOUT_BANNER = {
  src: '/images/about-banner.webp',
  width: 1700,
  height: 947,
};
