import { getLocalBusinessJsonLd } from '@/lib/localBusinessJsonLd';
import { absoluteUrl } from '@/lib/siteUrl';

function displayPhone() {
  return process.env.NEXT_PUBLIC_SALON_PHONE || '(602)623-4921';
}

const FAQ_ITEMS = [
  {
    q: 'Do you offer nail services for kids in Phoenix?',
    a: 'Yes! We offer Kids Manicure ($15) and Kids Pedicure ($20) for children under 10, plus kids color for nails or feet. Gel upgrades are available where listed on our menu.',
  },
  {
    q: 'Is it safe for kids to get their nails done?',
    a: 'We use gentle, kid-appropriate products and keep appointments calm and age-friendly. Our staff is trained to work with young children—shorter service times, patient pacing, and careful communication so everyone feels comfortable.',
  },
  {
    q: 'Can I book a mommy and daughter nail appointment?',
    a: `Absolutely! Book side-by-side appointments online or call us at ${displayPhone()} so we can reserve neighboring chairs for a mommy-daughter or family visit.`,
  },
  {
    q: 'What age is the kids service for?',
    a: 'Kids services are designed for children under 10 years old, with pricing and timing sized for smaller hands and feet. If you have questions about a specific age or sensitivity, call before you book and we will guide you.',
  },
];

export function kidsFaqPageJsonLd() {
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

export function kidsPrimaryServiceJsonLd() {
  const salon = getLocalBusinessJsonLd();
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Kids Nail Services in Phoenix AZ',
    description:
      'Kids manicure, pedicure, and polish services in North Phoenix AZ 85021 for children under 10.',
    serviceType: 'Kids nail services',
    url: absoluteUrl('/services/kids'),
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
      lowPrice: '10',
      highPrice: '20',
      description: 'Kids manicure, pedicure, and color services; gel upgrades extra.',
    },
  };
}

export const KIDS_SEO_FAQS = FAQ_ITEMS;

export default function KidsSeoSchemas() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(kidsFaqPageJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(kidsPrimaryServiceJsonLd()),
        }}
      />
    </>
  );
}
