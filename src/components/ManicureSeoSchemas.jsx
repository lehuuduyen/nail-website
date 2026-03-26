import { getLocalBusinessJsonLd } from '@/lib/localBusinessJsonLd';
import { absoluteUrl } from '@/lib/siteUrl';

const FAQ_ITEMS = [
  {
    q: 'How much does a manicure cost in Phoenix AZ?',
    a: 'Manicures at Nice Nails & Spa start at $30 for a Classic Manicure. Deluxe is $50 and Deep Manicure is $60 before gel upgrades—gel polish is available on each tier at the prices listed on our menu.',
  },
  {
    q: 'How long does a manicure take?',
    a: 'Our manicures range from 35 to 50 minutes depending on the service chosen: Classic about 35 minutes, Deluxe about 45 minutes, and Deep Manicure about 50 minutes with the added Jelly spa soak.',
  },
  {
    q: 'Do you offer gel manicures in Phoenix?',
    a: 'Yes, gel polish is available on all manicure services starting from $35 on Classic (higher tiers list their own gel upgrade pricing). Ask your nail tech if you want long-wear shine or nail art on gel.',
  },
  {
    q: 'Can I walk in for a manicure in Phoenix?',
    a: 'Walk-ins are welcome based on availability. Book online to secure your preferred time—especially evenings and weekends—so we can have a station and polish color ready when you arrive.',
  },
];

export function manicureFaqPageJsonLd() {
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

export function manicurePrimaryServiceJsonLd() {
  const salon = getLocalBusinessJsonLd();
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Manicure Services in Phoenix AZ',
    description:
      'Professional manicure services in North Phoenix AZ 85021: Classic, Deluxe, and Deep manicures with gel options.',
    serviceType: 'Manicure',
    url: absoluteUrl('/services/manicure'),
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
      lowPrice: '30',
      highPrice: '65',
      description: 'Classic through Deep manicure; gel upgrades per menu.',
    },
  };
}

export const MANICURE_SEO_FAQS = FAQ_ITEMS;

export default function ManicureSeoSchemas() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(manicureFaqPageJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(manicurePrimaryServiceJsonLd()),
        }}
      />
    </>
  );
}
