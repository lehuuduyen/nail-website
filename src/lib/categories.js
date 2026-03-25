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
  manicure: 'bg-dusty-rose/30 text-charcoal',
  pedicure: 'bg-rose-gold/25 text-charcoal',
  nails: 'bg-charcoal/10 text-charcoal',
  addon: 'bg-slate-200 text-slate-800',
  kids: 'bg-sky-100 text-sky-900',
  lash: 'bg-purple-100 text-purple-900',
  waxing: 'bg-emerald-100 text-emerald-900',
  head_spa: 'bg-teal-100 text-teal-900',
  facial: 'bg-pink-100 text-pink-900',
  acrylic: 'bg-charcoal/10 text-charcoal',
  gel: 'bg-amber-100/80 text-amber-900',
  dip: 'bg-violet-100 text-violet-900',
  other: 'bg-slate-200 text-slate-800',
  nail_art: 'bg-fuchsia-100 text-fuchsia-900',
};
