/**
 * LocalBusiness / NailSalon JSON-LD from NEXT_PUBLIC_* (build-time).
 */

function digitsOnly(phone) {
  return String(phone || '').replace(/\D/g, '');
}

function toTelE164(phone) {
  const d = digitsOnly(phone);
  if (d.length === 10) return `+1${d}`;
  if (d.length === 11 && d.startsWith('1')) return `+${d}`;
  return d ? `+${d}` : undefined;
}

/** Parse "8048 N 19th Ave, Phoenix, AZ 85021" */
function parseUsAddress(line) {
  const s = String(line || '').trim();
  const m = s.match(/^(.+),\s*([^,]+),\s*([A-Z]{2})\s+(\d{5}(?:-\d{4})?)$/i);
  if (!m) {
    return {
      '@type': 'PostalAddress',
      streetAddress: s || 'Phoenix, AZ',
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
 * Opening hours aligned with default NEXT_PUBLIC_SALON_HOURS copy.
 * Override via NEXT_PUBLIC_OPENING_HOURS_JSON if needed:
 * [{"dayOfWeek":["Monday","Tuesday"],"opens":"09:30","closes":"19:00"}]
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
  const name =
    process.env.NEXT_PUBLIC_SALON_NAME || 'Nice Nails & Spa';
  const addressLine =
    process.env.NEXT_PUBLIC_SALON_ADDRESS ||
    '8048 N 19th Ave, Phoenix, AZ 85021';
  const phone = process.env.NEXT_PUBLIC_SALON_PHONE || '';
  const tel = toTelE164(phone);
  const url = process.env.NEXT_PUBLIC_SITE_URL;

  const payload = {
    '@context': 'https://schema.org',
    '@type': 'NailSalon',
    name,
    description:
      process.env.NEXT_PUBLIC_SALON_TAGLINE ||
      'Professional nail care for ladies & gentlemen.',
    address: parseUsAddress(addressLine),
    openingHoursSpecification: openingHoursSpecification(),
  };

  if (tel) payload.telephone = tel;
  if (url) payload.url = url.replace(/\/$/, '');

  return payload;
}
