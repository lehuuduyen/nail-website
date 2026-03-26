import { getLocalBusinessJsonLd } from '@/lib/localBusinessJsonLd';
import { absoluteUrl } from '@/lib/siteUrl';

const FAQ_ITEMS = [
  {
    q: 'How long do eyelash extensions last?',
    a: 'With good aftercare, most guests book fills every 2–3 weeks as natural lashes shed. Avoiding oil-based products around the eyes and sleeping gently on your back helps extensions stay fluffy longer.',
  },
  {
    q: 'How much do lash extensions cost in Phoenix AZ?',
    a: 'Classic full sets start at $87 and volume full sets start at $120. Wispy and hybrid sets, lash lift, and regular lash services each have their own menu pricing—see below for current options and fill-in rates.',
  },
  {
    q: 'What is the difference between classic and volume lashes?',
    a: 'Classic lashes place one lightweight extension on each healthy natural lash for a mascara-like definition. Volume uses handmade fans of finer extensions for a fuller, darker line—ideal when you want extra drama without heavy clusters.',
  },
  {
    q: 'Do you offer lash fills in Phoenix?',
    a: 'Yes. We schedule fills to replace grown-out lashes and keep your set balanced—classic, volume, wispy, and hybrid fills are priced on the menu. Book online or call our North Phoenix salon to reserve a time that fits your last appointment.',
  },
];

export function lashFaqPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export function lashPrimaryServiceJsonLd() {
  const salon = getLocalBusinessJsonLd();
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Eyelash Extensions in Phoenix AZ',
    description:
      'Professional eyelash extensions in North Phoenix AZ 85021: classic, volume, wispy, hybrid, lash lift, and fills.',
    serviceType: 'Eyelash extensions, lash lift',
    url: absoluteUrl('/services/lash'),
    provider: {
      '@type': 'NailSalon',
      name: salon.name,
      ...(salon.url ? { url: salon.url } : {}),
      ...(salon.telephone ? { telephone: salon.telephone } : {}),
      address: salon.address,
    },
    areaServed: [
      { '@type': 'City', name: 'Phoenix' },
      { '@type': 'AdministrativeArea', name: 'North Phoenix' },
    ],
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '35',
      highPrice: '130',
      description: 'Classic through wispy full sets; fills and lash lift priced separately.',
    },
  };
}

export const LASH_SEO_FAQS = FAQ_ITEMS;

export default function LashSeoSchemas() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(lashFaqPageJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(lashPrimaryServiceJsonLd()),
        }}
      />
    </>
  );
}
