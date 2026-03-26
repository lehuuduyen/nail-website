import { getLocalBusinessJsonLd } from '@/lib/localBusinessJsonLd';
import { absoluteUrl } from '@/lib/siteUrl';

const FAQ_ITEMS = [
  {
    q: 'How much do acrylic nails cost in Phoenix AZ?',
    a: 'Full sets start at $40 and fill-ins start at $35; gel polish and specialty designs are priced separately. Ombré, marble, pink & white, French or white tips, custom nail art, dip powder, and Gel-X each have their own starting prices—see our menu below for details.',
  },
  {
    q: 'How long do acrylic nails last?',
    a: 'Most guests return for fill-ins every 2–3 weeks as natural nails grow. Longevity depends on how you use your hands, your nail health, and aftercare—your nail tech can suggest a maintenance schedule.',
  },
  {
    q: 'What is the difference between acrylic and dip powder nails?',
    a: 'Acrylic combines liquid monomer with polymer powder to sculpt a hard, customizable extension or overlay. Dip powder uses a resin base with fine pigmented powders layered for strength and a lightweight feel. Both are durable; we will match you to the system that fits your nails, lifestyle, and the look you want.',
  },
  {
    q: 'Do you do nail fills in Phoenix?',
    a: 'Yes. Book a fill-in to address new growth, rebalance the apex, and refresh color or design without removing the entire set—ideal for maintaining acrylic or gel enhancements at our North Phoenix salon.',
  },
];

export function nailsFaqPageJsonLd() {
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

export function nailsPrimaryServiceJsonLd() {
  const salon = getLocalBusinessJsonLd();
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Acrylic Nails & Gel Nails in Phoenix AZ',
    description:
      'Acrylic nails, gel nails, dip powder, Gel-X, ombré, marble, pink & white, and French tip services in North Phoenix AZ 85021. Full sets, fill-ins, and custom nail art.',
    serviceType: 'Acrylic nails, gel nails, dip powder, nail extensions',
    url: absoluteUrl('/services/nails'),
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
      highPrice: '60',
      description: 'Fill-ins through custom nail art tiers; gel and specialty styles may vary.',
    },
  };
}

export const NAILS_SEO_FAQS = FAQ_ITEMS;

export default function NailsSeoSchemas() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(nailsFaqPageJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(nailsPrimaryServiceJsonLd()),
        }}
      />
    </>
  );
}
