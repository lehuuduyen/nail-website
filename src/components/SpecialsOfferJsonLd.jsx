import { getBusinessRef } from '@/lib/localBusinessJsonLd';
import { absoluteUrl } from '@/lib/siteUrl';

/**
 * schema.org Offer for the always-on "New Customer $5 Off First Visit" promo.
 * Attached to the salon via offeredBy so Google ties the discount to the business.
 * Only rendered when the offer is actually live (toggle) — structured data must
 * match what's on the page, or it risks a manual action.
 */
export default function SpecialsOfferJsonLd({ name, description }) {
  const business = getBusinessRef();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name,
    description,
    url: absoluteUrl('/specials'),
    category: 'New customer discount',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    offeredBy: business,
    itemOffered: {
      '@type': 'Service',
      name: 'Nail salon services',
      provider: business,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
