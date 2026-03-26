/**
 * NailSalon JSON-LD (schema.org). URL / image từ NEXT_PUBLIC_SITE_URL + absoluteUrl.
 */

import { absoluteUrl, getSiteUrl } from '@/lib/siteUrl';

/** Parse "8048 N 19th Ave, Phoenix, AZ 85021" */
function parseUsAddress(line) {
  const s = String(line || '').trim();
  const m = s.match(/^(.+),\s*([^,]+),\s*([A-Z]{2})\s+(\d{5}(?:-\d{4})?)$/i);
  if (!m) {
    return {
      '@type': 'PostalAddress',
      streetAddress: s || '8048 N 19th Ave',
      addressLocality: 'Phoenix',
      addressRegion: 'AZ',
      postalCode: '85021',
      addressCountry: 'US',
    };
  }
  return {
    '@type': 'PostalAddress',
    streetAddress: m[1].trim(),
    addressLocality: m[2].trim(),
    addressRegion: m[3].toUpperCase(),
    postalCode: m[4],
    addressCountry: 'US',
  };
}

/**
 * Opening hours — override via NEXT_PUBLIC_OPENING_HOURS_JSON if needed.
 */
function openingHoursSpecification() {
  const raw = process.env.NEXT_PUBLIC_OPENING_HOURS_JSON;
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) {
        return parsed.map((row) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: row.dayOfWeek,
          opens: row.opens,
          closes: row.closes,
        }));
      }
    } catch {
      /* fall through */
    }
  }
  return [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      opens: '09:30',
      closes: '19:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '10:00',
      closes: '16:00',
    },
  ];
}

export function getLocalBusinessJsonLd() {
  const name = process.env.NEXT_PUBLIC_SALON_NAME || 'Nice Nails & Spa';
  const addressLine =
    process.env.NEXT_PUBLIC_SALON_ADDRESS ||
    '8048 N 19th Ave, Phoenix, AZ 85021';
  const telephone =
    process.env.NEXT_PUBLIC_SALON_PHONE || '(602)623-4921';
  const url = getSiteUrl();
  const lat = Number.parseFloat(process.env.NEXT_PUBLIC_SALON_LAT ?? '33.5722');
  const lng = Number.parseFloat(process.env.NEXT_PUBLIC_SALON_LNG ?? '-112.0901');

  return {
    '@context': 'https://schema.org',
    '@type': 'NailSalon',
    name,
    image: absoluteUrl('/images/salon-interior.webp'),
    url,
    telephone,
    priceRange: '$$',
    address: parseUsAddress(addressLine),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: lat,
      longitude: lng,
    },
    openingHoursSpecification: openingHoursSpecification(),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '656',
    },
    servesCuisine: 'Nail Salon',
    areaServed: ['North Phoenix', 'Phoenix', 'Glendale', 'Peoria'],
  };
}
