const CATEGORIES = [
  'manicure',
  'pedicure',
  'nails',
  'addon',
  'kids',
  'lash',
  'waxing',
  'head_spa',
  'facial',
];

function baseUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(
    /\/$/,
    ''
  );
}

function abs(path) {
  const b = baseUrl();
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${b}${p}`;
}

export default function sitemap() {
  const now = new Date();
  const common = { lastModified: now };

  return [
    { url: abs('/'), changeFrequency: 'weekly', priority: 1, ...common },
    { url: abs('/services'), changeFrequency: 'weekly', priority: 0.9, ...common },
    { url: abs('/booking'), changeFrequency: 'monthly', priority: 0.8, ...common },
    { url: abs('/gallery'), changeFrequency: 'weekly', priority: 0.7, ...common },
    {
      url: abs('/services/gel-nails-phoenix'),
      changeFrequency: 'monthly',
      priority: 0.75,
      ...common,
    },
    ...CATEGORIES.map((cat) => ({
      url: abs(`/services/${cat}`),
      changeFrequency: 'monthly',
      priority: 0.8,
      ...common,
    })),
  ];
}
