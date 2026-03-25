/** Section order matches Nice Nails Phoenix menu layout */
export const SERVICE_MENU_SECTIONS = [
  { key: 'all', label: 'All' },
  { key: 'manicure', label: 'Manicure' },
  { key: 'pedicure', label: 'Pedicure' },
  { key: 'nails', label: 'Nails' },
  { key: 'addon', label: 'Additional' },
  { key: 'kids', label: 'Kids' },
  { key: 'lash', label: 'Lashes' },
  { key: 'waxing', label: 'Waxing' },
  { key: 'head_spa', label: 'Head spa' },
  { key: 'facial', label: 'Facial' },
  // legacy categories from older data
  { key: 'acrylic', label: 'Acrylic' },
  { key: 'gel', label: 'Gel' },
  { key: 'dip', label: 'Dip' },
  { key: 'other', label: 'Other' },
];

export const SECTION_ORDER = SERVICE_MENU_SECTIONS.filter((s) => s.key !== 'all').map((s) => s.key);

export const SECTION_LABELS = {
  manicure: 'Manicure',
  pedicure: 'Pedicure',
  nails: 'Nails',
  addon: 'Additional services',
  kids: 'Kids menu (under 10)',
  lash: 'Eyelash extension',
  waxing: 'Waxing',
  head_spa: 'Head spa',
  facial: 'Facial',
  acrylic: 'Acrylic',
  gel: 'Gel',
  dip: 'Dip',
  other: 'Other',
};

export function sectionTitle(key) {
  return SECTION_LABELS[key] || key.replace(/_/g, ' ');
}

export const GALLERY_TABS = [
  { key: 'all', label: 'All' },
  { key: 'manicure', label: 'Manicure' },
  { key: 'pedicure', label: 'Pedicure' },
  { key: 'nail_art', label: 'Nail Art' },
  { key: 'acrylic', label: 'Acrylic' },
  { key: 'gel', label: 'Gel' },
];

export const categoryBadgeClass = {
  manicure: 'bg-dusty-rose/40 text-charcoal',
  pedicure: 'bg-lavender/35 text-charcoal',
  nails: 'bg-lavender-deep/40 text-charcoal',
  addon: 'bg-cream-dark text-charcoal',
  kids: 'bg-dusty-rose/30 text-charcoal',
  lash: 'bg-lavender/40 text-charcoal',
  waxing: 'bg-cream-dark text-charcoal',
  head_spa: 'bg-dusty-rose/35 text-charcoal',
  facial: 'bg-lavender-deep/35 text-charcoal',
  acrylic: 'bg-muted/20 text-charcoal',
  gel: 'bg-dusty-rose/45 text-charcoal',
  dip: 'bg-lavender/30 text-charcoal',
  other: 'bg-cream-dark text-charcoal',
  nail_art: 'bg-lavender-deep/40 text-charcoal',
};
