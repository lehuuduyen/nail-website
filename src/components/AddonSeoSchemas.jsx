import { getLocalBusinessJsonLd } from '@/lib/localBusinessJsonLd';
import { absoluteUrl } from '@/lib/siteUrl';

const FAQ_ITEMS = [
  {
    q: 'Can I add paraffin dip to my pedicure?',
    a: 'Yes. Paraffin dip is one of our most requested pedicure add-ons at Nice Nails & Spa in North Phoenix. Mention it when you book or at check-in so we can warm the dip and add the right amount of time to your service.',
  },
  {
    q: 'How much do rhinestones cost at Nice Nails & Spa?',
    a: 'Rhinestone nail art starts at $5. Final price depends on how many stones, placement, and whether you pair them with gel polish—your technician will confirm before starting.',
  },
  {
    q: 'What nail add-ons are available in Phoenix?',
    a: 'We offer nail enhancements such as rhinestones, French add-ons, shiny buffing, and color nails; skin-focused treatments including paraffin dip, collagen socks, callus removal, and massage; plus nail corrections like take-off, full set toes, and acrylic on two big toes. Browse the categories on this page or book online to build your visit.',
  },
];

export function addonFaqPageJsonLd() {
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

export function addonPrimaryServiceJsonLd() {
  const salon = getLocalBusinessJsonLd();
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Nail Enhancement Add-ons in Phoenix AZ',
    description:
      'Nail add-ons including paraffin dip, rhinestones, nail art, collagen socks, callus removal, and massage in Phoenix AZ 85021.',
    serviceType: 'NailSalon',
    url: absoluteUrl('/services/addon'),
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
      lowPrice: '5',
      highPrice: '40',
      description: 'Add-on pricing varies by service; rhinestones from $5, full set toes from $40.',
    },
  };
}

export const ADDON_SEO_FAQS = FAQ_ITEMS;

export default function AddonSeoSchemas() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(addonFaqPageJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(addonPrimaryServiceJsonLd()),
        }}
      />
    </>
  );
}
