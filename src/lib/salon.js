/** Salon copy — override via NEXT_PUBLIC_* in .env */

export function salonName() {
  return process.env.NEXT_PUBLIC_SALON_NAME || 'Nice Nails & Spa';
}

export function salonTagline() {
  return (
    process.env.NEXT_PUBLIC_SALON_TAGLINE ||
    'Professional nail care for ladies & gentlemen.'
  );
}

export function salonArea() {
  return process.env.NEXT_PUBLIC_SALON_AREA || 'North Phoenix, AZ 85021';
}

export function salonAddress() {
  return (
    process.env.NEXT_PUBLIC_SALON_ADDRESS ||
    '8048 N 19th Ave, Phoenix, AZ 85021'
  );
}

export function salonHours() {
  return (
    process.env.NEXT_PUBLIC_SALON_HOURS ||
    'Mon–Sat 9:30 AM – 7:00 PM · Sun 10:00 AM – 4:00 PM'
  );
}

export function salonMapsUrl() {
  return (
    process.env.NEXT_PUBLIC_SALON_MAPS_URL ||
    'https://maps.app.goo.gl/RxXkeYRL63uib95d6'
  );
}

export function salonMapsEmbedUrl() {
  return process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED || '';
}
