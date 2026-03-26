import { getLocalBusinessJsonLd } from '@/lib/localBusinessJsonLd';
import { absoluteUrl } from '@/lib/siteUrl';

const FAQ_ITEMS = [
  {
    q: 'How much does eyebrow waxing cost in Phoenix AZ?',
    a: 'Eyebrow waxing starts at $12 at Nice Nails & Spa in North Phoenix. Face, chin, lip, back, and body waxing are priced by area starting from $12—confirm the exact quote for your service when you book or at check-in.',
  },
  {
    q: 'How long does waxing last?',
    a: 'Most guests see smooth skin for about three to six weeks depending on hair growth cycle, area waxed, and hormones. Regular waxing can soften regrowth over time; your technician can suggest a maintenance rhythm.',
  },
  {
    q: 'Can I add waxing to my nail appointment?',
    a: 'Yes. Waxing is a popular add-on before or after manicures, pedicures, or lash services—book both in one visit online or mention it when you arrive so we can schedule enough time.',
  },
  {
    q: 'Do you do full face waxing in Phoenix?',
    a: 'We wax face areas including lip, chin, and full-face options depending on your needs. Because pricing varies by area, tell us which zones you want smooth at booking so we allocate time and quote accurately.',
  },
];

export function waxingFaqPageJsonLd() {
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

export function waxingPrimaryServiceJsonLd() {
  const salon = getLocalBusinessJsonLd();
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Waxing Services in Phoenix AZ',
    description:
      'Eyebrow, lip, chin, face, back, and body waxing in North Phoenix AZ 85021. Quick add-on to nail and beauty services.',
    serviceType: 'Waxing',
    url: absoluteUrl('/services/waxing'),
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
      lowPrice: '12',
      highPrice: '12',
      description: 'Starting prices; face and body wax varies by area.',
    },
  };
}

export const WAXING_SEO_FAQS = FAQ_ITEMS;

export default function WaxingSeoSchemas() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(waxingFaqPageJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(waxingPrimaryServiceJsonLd()),
        }}
      />
    </>
  );
}
