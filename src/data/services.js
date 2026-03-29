/**
 * Salon menu metadata + SEO display names.
 * Live prices/names for pages: getSalonServices() from @/lib/serverServices (API → shared JSON fallback).
 */

export const CATEGORIES = {
  manicure: {
    slug: 'manicure',
    label: 'Manicure - Tay',
    emoji: '💅',
    description:
      'Professional manicure services — classic, deluxe & deep treatments.',
  },
  pedicure: {
    slug: 'pedicure',
    label: 'Pedicure - Chân',
    emoji: '🦶',
    description:
      'Relaxing pedicure from classic to luxurious golden spa treatments.',
  },
  nails: {
    slug: 'nails',
    label: 'Acrylic - Bột',
    emoji: '✨',
    description: 'Full sets, fill-ins, gel, dipping, ombré and nail art designs.',
  },
  addon: {
    slug: 'addon',
    label: 'Additional - Thêm',
    emoji: '➕',
    description: 'Add-on services to enhance any nail treatment.',
  },
  kids: {
    slug: 'kids',
    label: 'Kid < 10YO',
    emoji: '🌟',
    description: 'Gentle nail services designed specially for children under 10.',
  },
  lash: {
    slug: 'lash',
    label: 'Eyelash',
    emoji: '👁️',
    description: 'Classic and cluster eyelash extensions.',
  },
  waxing: {
    slug: 'waxing',
    label: 'Wax - Tẩy Lông',
    emoji: '🌿',
    description: 'Eyebrow, body and facial waxing services.',
  },
  head_spa: {
    slug: 'head_spa',
    label: 'Head Spa',
    emoji: '🧖',
    description: 'Luxury head spa — basic, deluxe and royal combo treatments.',
  },
  facial: {
    slug: 'facial',
    label: 'Facial',
    emoji: '✨',
    description: 'Hydrating, deep clean and detox facial treatments.',
  },
};

/** English titles for website / SEO (POS may use shorter internal names). */
export const WEBSITE_DISPLAY_NAMES = {
  'Manicure 1 Regular': 'Classic Manicure',
  'Manicure 1 Gel': 'Classic Manicure with Gel',
  'Manicure 2 Regular': 'Deluxe Manicure',
  'Manicure 2 Gel': 'Deluxe Manicure with Gel',
  'Manicure 3 Regular': 'Deep Manicure',
  'Manicure 3 Gel': 'Deep Manicure with Gel',
  'Pedicure 1': 'Classic Pedicure',
  'Pedicure 1 Gel': 'Classic Pedicure with Gel',
  'Pedicure 2': 'Signature Pedicure',
  'Pedicure 2 Gel': 'Signature Pedicure with Gel',
  'Pedicure 3': 'Deluxe Pedicure',
  'Pedicure 3 Gel': 'Deluxe Pedicure with Gel',
  'Pedicure 4': 'Royal Pedicure',
  'Pedicure 4 Gel': 'Royal Pedicure with Gel',
  'Pedicure 5': 'Luxurious Pedicure',
  'Pedicure 5 Gel': 'Luxurious Pedicure with Gel',
  'Pedicure 6': 'Herbal La Palm Pedicure',
  'Pedicure 6 Gel': 'Herbal La Palm Pedicure with Gel',
  'Pedicure 7': 'Vena Golden Pedicure',
  'Pedicure 7 Gel': 'Vena Golden Pedicure with Gel',
  'Fill In Regular': 'Acrylic Fill-in',
  'Fill In Gel': 'Gel Fill-in',
  'Full Set Regular': 'Acrylic Full Set',
  'Full Set Gel': 'Gel Full Set',
  'Head Spa Combo 1': 'Basic Head Spa (60 min)',
  'Head Spa Combo 2': 'Deluxe Head Spa (90 min)',
  'Head Spa Combo 3': 'Royal Head Spa (110 min)',
  'Facial Combo 1': 'Hydrating Facial (45 min)',
  'Facial Combo 2': 'Deep Clean Facial (60 min)',
  'Facial Combo 3': 'Detox Facial (80 min)',
  'Eyelash Classic Full Set': 'Classic Eyelash Extensions',
};

export function getServiceDisplayName(service) {
  if (!service?.name) return '';
  return WEBSITE_DISPLAY_NAMES[service.name] || service.name;
}

export const CATEGORY_NAV = [
  { key: 'manicure', navLabel: 'Manicure - Tay' },
  { key: 'pedicure', navLabel: 'Pedicure - Chân' },
  { key: 'nails', navLabel: 'Acrylic - Bột' },
  { key: 'addon', navLabel: 'Additional - Thêm' },
  { key: 'kids', navLabel: 'Kid < 10YO' },
  { key: 'lash', navLabel: 'Eyelash' },
  { key: 'waxing', navLabel: 'Wax - Tẩy Lông' },
  { key: 'head_spa', navLabel: 'Head Spa' },
  { key: 'facial', navLabel: 'Facial' },
];

export const CATEGORY_ACCENT = {
  manicure: 'border-l-lavender',
  pedicure: 'border-l-dusty-rose',
  nails: 'border-l-lavender-deep',
  addon: 'border-l-muted',
  kids: 'border-l-dusty-rose',
  lash: 'border-l-lavender-deep',
  waxing: 'border-l-lavender',
  head_spa: 'border-l-muted',
  facial: 'border-l-dusty-rose',
};

export const VALID_CATEGORY_SLUGS = CATEGORY_NAV.map((c) => c.key);

export function servicesInCategory(services, category) {
  return (services || []).filter((s) => s.category === category);
}

export function minPriceInCategory(services, category) {
  const list = servicesInCategory(services, category);
  if (!list.length) return 0;
  return Math.min(...list.map((s) => Number(s.price) || 0));
}

export function relatedServices(services, currentCategory, limit = 3) {
  return (services || []).filter((s) => s.category !== currentCategory).slice(0, limit);
}

export const FAQ_BY_CATEGORY = {
  manicure: [
    {
      q: 'How long does a manicure take?',
      a: 'Classic manicures are about 35 minutes; deluxe and deep options run 45–50 minutes depending on add-ons and gel polish.',
    },
    {
      q: "What's included in a deluxe manicure?",
      a: 'Cuticle care, shaping, sugar scrub, cooling gel, hot towel, lotion massage, and polish — gel polish is available at an upgraded price.',
    },
  ],
  pedicure: [
    {
      q: 'Do you use fresh liners?',
      a: 'Yes — we prioritize hygiene with disposable liners and sanitary practices for every pedicure.',
    },
    {
      q: 'How often should I get a pedicure?',
      a: 'Most guests come every 3–4 weeks; more frequent visits help if you’re on your feet daily or wear open shoes often.',
    },
  ],
  nails: [
    {
      q: 'How long do acrylic nails last?',
      a: 'Typically 2–3 weeks before a fill-in is recommended, depending on growth and daily wear.',
    },
    {
      q: "What's the difference between gel and acrylic?",
      a: 'Acrylic is a liquid-and-powder enhancement; gel is often softer and flexible. Our team can recommend the best option for your lifestyle.',
    },
  ],
  addon: [
    {
      q: 'Can I add paraffin or hot stone to any pedicure?',
      a: 'Yes — add-ons like paraffin, hot stone, or extra massage can be added to most pedicure services. Ask at check-in.',
    },
  ],
  kids: [
    {
      q: 'What ages qualify for kids pricing?',
      a: 'Kids services are priced for children under 10. Gel upgrades are available where listed.',
    },
  ],
  lash: [
    {
      q: 'How long do eyelash extensions last?',
      a: 'With proper care, fills are usually needed every 2–3 weeks as natural lashes shed.',
    },
    {
      q: 'Can I wear mascara with extensions?',
      a: 'We recommend skipping mascara on extensions to prolong wear; use oil-free cleansers around the eye area.',
    },
  ],
  waxing: [
    {
      q: 'Is eyebrow wax pricing fixed?',
      a: 'Brows start at the listed price; face, chin, lip, back, and body waxing may vary by area — ask in salon.',
    },
  ],
  head_spa: [
    {
      q: 'What is a head spa?',
      a: 'A focused scalp and hair treatment with massage, cleansing, and masks — our combos add facial and shoulder care for full relaxation.',
    },
    {
      q: 'How long does a head spa take?',
      a: 'From 60 minutes for our basic combo up to 110 minutes for the royal experience.',
    },
  ],
  facial: [
    {
      q: 'Which facial is best for oily skin?',
      a: 'Our detox deep clean facial focuses on congestion and oil balance with charcoal, clay, or salicylic-based steps.',
    },
  ],
};
