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

function normalizeE164Phone(raw) {
  if (!raw) return '+16027599184';
  const digits = String(raw).replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return raw.trim();
}

export function getLocalBusinessJsonLd() {
  const name = process.env.NEXT_PUBLIC_SALON_NAME || 'Nice Nails & Spa';
  const addressLine =
    process.env.NEXT_PUBLIC_SALON_ADDRESS ||
    '8048 N 19th Ave, Phoenix, AZ 85021';
  const telephone = normalizeE164Phone(process.env.NEXT_PUBLIC_SALON_PHONE);
  const url = getSiteUrl();
  // Precise coordinates for 8048 N 19th Ave, Phoenix, AZ 85021 — verify in Google Maps if overriding via env
  const lat = Number.parseFloat(process.env.NEXT_PUBLIC_SALON_LAT ?? '33.5556');
  const lng = Number.parseFloat(process.env.NEXT_PUBLIC_SALON_LNG ?? '-112.0985');
  const mapsUrl =
    process.env.NEXT_PUBLIC_SALON_MAPS_URL ||
    'https://maps.app.goo.gl/RxXkeYRL63uib95d6';
  const googleProfileUrl =
    process.env.NEXT_PUBLIC_SALON_GOOGLE_PROFILE_URL ||
    'https://g.page/r/CXBOXsUE7X5SEBE/review';
  const yelpUrl =
    process.env.NEXT_PUBLIC_SALON_YELP_URL ||
    'https://www.yelp.com/biz/nice-nails-and-spa-phoenix';
  const sameAs = [
    googleProfileUrl,
    yelpUrl,
    process.env.NEXT_PUBLIC_SALON_INSTAGRAM_URL || 'https://www.instagram.com/nicenailsandspaphoenix',
    process.env.NEXT_PUBLIC_SALON_FACEBOOK_URL || 'https://www.facebook.com/nicenailsandspaphoenix',
    process.env.NEXT_PUBLIC_SALON_YOUTUBE_URL || 'https://www.youtube.com/@DailyNailInspoChannel',
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'NailSalon',
    '@id': `${url}/#business`,
    name,
    image: [
      absoluteUrl('/images/salon-interior.webp'),
      absoluteUrl('/images/hero-luxury-banner.webp'),
    ],
    url,
    telephone,
    priceRange: '$$',
    description:
      process.env.NEXT_PUBLIC_JSONLD_DESCRIPTION ||
      'Top-rated nail salon in North Phoenix AZ 85021. Professional manicure, pedicure, acrylic nails, eyelash extensions, head spa & facial. Walk-ins welcome.',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Credit Card',
    hasMap: mapsUrl,
    sameAs,
    address: parseUsAddress(addressLine),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: lat,
      longitude: lng,
    },
    openingHoursSpecification: openingHoursSpecification(),
    areaServed: ['North Phoenix', 'Phoenix', 'Moon Valley', 'Deer Valley', 'Glendale', 'Peoria', 'Sunnyslope'],
  };
}

/** Compact @id reference — use in Service / ItemList schemas to avoid duplicating the full business node. */
export function getBusinessRef() {
  return { '@id': `${getSiteUrl()}/#business` };
}

/**
 * Site-wide Organization + WebSite nodes (one @graph).
 * Helps Google understand the brand + canonical site → improves chances of sitelinks.
 */
export function getSiteJsonLd() {
  const url = getSiteUrl();
  const name = process.env.NEXT_PUBLIC_SALON_NAME || 'Nice Nails & Spa';
  const sameAs = [
    process.env.NEXT_PUBLIC_SALON_GOOGLE_PROFILE_URL || 'https://g.page/r/CXBOXsUE7X5SEBE/review',
    process.env.NEXT_PUBLIC_SALON_YELP_URL || 'https://www.yelp.com/biz/nice-nails-and-spa-phoenix',
    process.env.NEXT_PUBLIC_SALON_INSTAGRAM_URL || 'https://www.instagram.com/nicenailsandspaphoenix',
    process.env.NEXT_PUBLIC_SALON_FACEBOOK_URL || 'https://www.facebook.com/nicenailsandspaphoenix',
    process.env.NEXT_PUBLIC_SALON_YOUTUBE_URL || 'https://www.youtube.com/@DailyNailInspoChannel',
  ];

  const organization = {
    '@type': 'Organization',
    '@id': `${url}/#organization`,
    name,
    url,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/android-chrome-512x512.png'),
    },
    sameAs,
  };

  const website = {
    '@type': 'WebSite',
    '@id': `${url}/#website`,
    name,
    url,
    inLanguage: 'en-US',
    publisher: { '@id': `${url}/#organization` },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, website],
  };
}
