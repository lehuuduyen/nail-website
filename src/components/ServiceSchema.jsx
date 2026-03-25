import { getLocalBusinessJsonLd } from '@/lib/localBusinessJsonLd';

/**
 * ItemList + Service offers for services pages (avoids duplicating full NailSalon vs layout JSON-LD).
 */
export default function ServiceSchema({ services }) {
  const salon = getLocalBusinessJsonLd();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Nice Nails & Spa — services & prices',
    description: 'Nail salon menu in Phoenix, AZ',
    numberOfItems: services.length,
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.name,
        ...(s.description ? { description: s.description } : {}),
        provider: {
          '@type': 'NailSalon',
          name: salon.name,
          ...(salon.url ? { url: salon.url } : {}),
          ...(salon.telephone ? { telephone: salon.telephone } : {}),
          address: salon.address,
        },
        offers: {
          '@type': 'Offer',
          price: s.price,
          priceCurrency: 'USD',
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
