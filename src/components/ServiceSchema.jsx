import { getBusinessRef } from '@/lib/localBusinessJsonLd';
import { getServiceDisplayName } from '@/data/services';

/**
 * ItemList + Service offers for services pages (avoids duplicating full NailSalon vs layout JSON-LD).
 */
export default function ServiceSchema({ services }) {
  const providerRef = getBusinessRef();
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
        name: getServiceDisplayName(s),
        ...(s.description ? { description: s.description } : {}),
        provider: providerRef,
        offers: {
          '@type': 'Offer',
          price: s.price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
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
