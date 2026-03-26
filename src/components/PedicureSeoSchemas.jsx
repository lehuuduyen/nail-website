import { getLocalBusinessJsonLd } from '@/lib/localBusinessJsonLd';
import { absoluteUrl } from '@/lib/siteUrl';

const FAQ_ITEMS = [
  {
    q: 'How much does a pedicure cost in Phoenix AZ?',
    a: 'Our pedicures start at $35 for a Classic Pedicure. Signature, Deluxe, Royal, Luxurious, Herbal La Palm, and Vena Golden tiers add more soak, scrub, massage, and spa steps—see our menu below for each price. Gel polish and add-ons like paraffin or hot stone are extra.',
  },
  {
    q: 'How long does a pedicure take at Nice Nails & Spa?',
    a: 'Pedicures range from 40 to 90 minutes depending on the service. Classic options are quicker; spa and luxury tiers include longer massage, masks, and specialty kits so you can fully unwind.',
  },
  {
    q: 'Do you offer spa pedicures in Phoenix?',
    a: 'Yes, we offer 7 levels of pedicure from classic to our Vena Golden Pedicure, with collagen and spa steps, hot stone and paraffin on select tiers, La Palm herbal rituals, and optional gel polish upgrades.',
  },
  {
    q: 'Do I need an appointment for a pedicure?',
    a: 'Walk-ins are welcome, but booking online guarantees your preferred time—especially on weekends and evenings. Same-day visits are often available; reserve your spot or call if you are on a tight schedule.',
  },
];

export function pedicureFaqPageJsonLd() {
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

export function pedicurePrimaryServiceJsonLd() {
  const salon = getLocalBusinessJsonLd();
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Pedicure Services in Phoenix AZ',
    description:
      'Relaxing pedicure and spa pedicure services in North Phoenix AZ 85021. Classic through luxury tiers with hot stone, paraffin, La Palm collagen rituals, and gel polish options.',
    serviceType: 'Pedicure',
    url: absoluteUrl('/services/pedicure'),
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
      { '@type': 'City', name: 'Glendale' },
      { '@type': 'City', name: 'Peoria' },
    ],
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '35',
      highPrice: '115',
      description:
        'Menu pricing for pedicure tiers; gel polish and add-ons priced separately.',
    },
  };
}

/** FAQ copy for on-page section (kept in sync with FAQPage schema). */
export const PEDICURE_SEO_FAQS = FAQ_ITEMS;

export default function PedicureSeoSchemas() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pedicureFaqPageJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pedicurePrimaryServiceJsonLd()),
        }}
      />
    </>
  );
}
