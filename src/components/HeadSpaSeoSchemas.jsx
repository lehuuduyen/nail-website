import { getLocalBusinessJsonLd } from '@/lib/localBusinessJsonLd';
import { absoluteUrl } from '@/lib/siteUrl';

const FAQ_ITEMS = [
  {
    q: 'What is a head spa treatment?',
    a: 'A head spa is a focused scalp-and-hair ritual that blends deep cleansing, massage, masks, and often Korean-inspired steps such as aroma therapy, meridian-style release work, and shoulder or facial care. At Nice Nails & Spa we layer warm towels, nourishing products, and rhythmic massage to melt tension while refreshing the scalp.',
  },
  {
    q: 'How much does a head spa cost in Phoenix AZ?',
    a: 'Our combo packages start at $78 for the 60-minute basic shampoo experience and go up through deluxe and royal tiers at $98 and $120 for longer, more immersive sessions. Add-ons like cluster lash, facial scrub, hand paraffin, or extra scalp massage minutes are priced separately—see the menu below.',
  },
  {
    q: 'How long is a head spa session?',
    a: 'Core packages run 60, 90, or 110 minutes depending on whether you choose the basic, deluxe, or royal head spa. Extra massage or add-ons can extend your visit—ask when you book so we can reserve the right amount of time.',
  },
  {
    q: 'Is head spa good for hair growth?',
    a: 'Head spa is not a medical treatment, but many guests notice their scalp feels cleaner, less tight, and more comfortable after exfoliation, steam, oil, and massage. Improved circulation and a balanced scalp environment can support the look and feel of healthier hair; individual results vary, and severe concerns should be discussed with a dermatologist.',
  },
];

export function headSpaFaqPageJsonLd() {
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

export function headSpaPrimaryServiceJsonLd() {
  const salon = getLocalBusinessJsonLd();
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Head Spa & Scalp Treatment in Phoenix AZ',
    description:
      'Luxury head spa and Korean-style scalp treatments in North Phoenix AZ 85021. Aroma therapy, meridian release, massage, and 60–110 minute packages.',
    serviceType: 'Head spa, scalp treatment',
    url: absoluteUrl('/services/head_spa'),
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
      lowPrice: '78',
      highPrice: '120',
      description: '60–110 minute head spa combo packages; add-ons priced separately.',
    },
  };
}

export const HEAD_SPA_SEO_FAQS = FAQ_ITEMS;

export default function HeadSpaSeoSchemas() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(headSpaFaqPageJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(headSpaPrimaryServiceJsonLd()),
        }}
      />
    </>
  );
}
