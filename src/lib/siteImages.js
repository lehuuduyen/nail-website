/**
 * Local WebP under /public/images. Dimensions must match files (CLS).
 * Regenerate WebP: add PNG/JPG sources, then `npm run images:webp` in nail-website.
 */

export const HERO_IMAGE = {
  src: '/images/popular-nail-art.webp',
  width: 1366,
  height: 2050,
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
    src: '/images/hero-manicure.webp',
    width: 682,
    height: 1024,
    alt: 'Custom nail art designs Phoenix AZ Nice Nails Spa',
  },
};

/**
 * Image shown on each service card, keyed by category.
 * Nail categories use real photos; lash/waxing/facial/head_spa fall back to an
 * elegant neutral shot until dedicated photos are added (drop a WebP in
 * /public/images and point the entry here — the cards pick it up automatically).
 */
export const SERVICE_IMAGE_BY_CATEGORY = {
  manicure: { src: '/images/popular-manicure.webp', alt: 'Luxury manicure at Nice Nails & Spa Phoenix' },
  pedicure: { src: '/images/popular-pedicure.webp', alt: 'Relaxing spa pedicure in Phoenix AZ' },
  nails: { src: '/images/popular-acrylic-nails.webp', alt: 'Acrylic & gel nail extensions Phoenix AZ' },
  addon: { src: '/images/popular-nail-art.webp', alt: 'Custom nail art designs Phoenix AZ' },
  kids: { src: '/images/popular-manicure.webp', alt: 'Kids manicure & pedicure Phoenix AZ' },
  head_spa: { src: '/images/service-head-spa.webp', alt: 'Japanese head spa scalp treatment Phoenix AZ' },
  facial: { src: '/images/service-facial.webp', alt: 'Relaxing facial skincare treatment Phoenix AZ' },
  lash: { src: '/images/service-lash.webp', alt: 'Eyelash extensions Phoenix AZ' },
  waxing: { src: '/images/service-waxing.webp', alt: 'Smooth leg waxing service Phoenix AZ' },
};

export const SERVICE_IMAGE_FALLBACK = {
  src: '/images/popular-nail-art.webp',
  alt: 'Nice Nails & Spa Phoenix AZ',
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
