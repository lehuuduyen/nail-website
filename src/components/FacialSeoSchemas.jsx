import { getLocalBusinessJsonLd } from '@/lib/localBusinessJsonLd';
import { absoluteUrl } from '@/lib/siteUrl';

const FAQ_ITEMS = [
  {
    q: 'How much does a facial cost in Phoenix AZ?',
    a: 'Our facials start at $45 for the 45-minute Basic hydrating facial, $60 for the 60-minute Deep clean, and $80 for the 80-minute Detox deep clean with charcoal, clay, or salicylic-focused steps. See the menu below for full descriptions.',
  },
  {
    q: 'What type of facial is best for dry skin in Phoenix?',
    a: 'Desert air pulls moisture fast—most dry or dehydrated skin does well with Combo 1 (Basic hydrating) for steady maintenance, or Combo 2 (Deep clean) when you also want extra massage and a thorough refresh without the intensive detox actives.',
  },
  {
    q: 'How often should I get a facial?',
    a: 'Many guests come every 4–6 weeks to stay ahead of buildup and seasonal dryness; oilier or congested skin may benefit from slightly closer spacing when your esthetician recommends it. We adjust based on your skin goals and home care.',
  },
  {
    q: 'Do you offer facials for oily or acne-prone skin?',
    a: 'Yes. Combo 3 — Detox deep clean focuses on charcoal, clay, and salicylic-friendly steps with steam to purify pores and rebalance oil, then finishes with hydration so skin does not feel stripped—ideal for Phoenix heat and humidity.',
  },
];

export function facialFaqPageJsonLd() {
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

export function facialPrimaryServiceJsonLd() {
  const salon = getLocalBusinessJsonLd();
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Facial Services in Phoenix AZ',
    description:
      'Hydrating, deep clean, and detox facials in North Phoenix AZ 85021. Cleanse, exfoliate, mask, serum, and moisturizer.',
    serviceType: 'Facial treatment',
    url: absoluteUrl('/services/facial'),
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
      lowPrice: '45',
      highPrice: '80',
      description: 'Three facial combo tiers; durations 45–80 minutes.',
    },
  };
}

export const FACIAL_SEO_FAQS = FAQ_ITEMS;

export default function FacialSeoSchemas() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(facialFaqPageJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(facialPrimaryServiceJsonLd()),
        }}
      />
    </>
  );
}
