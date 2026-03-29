import fs from 'fs';
import path from 'path';

/**
 * Fallback menu when API is down (build / offline). IDs are synthetic — booking still uses live API.
 */
export function loadFallbackSalonServices() {
  const jsonPath = path.join(process.cwd(), '..', 'shared', 'niceNailsServices.json');
  const raw = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  return raw.map((s, i) => ({
    ...s,
    id: i + 1,
    price: Number(s.price),
    priceCard: s.priceCard != null ? Number(s.priceCard) : null,
    duration: Number(s.duration) || 0,
    isActive: s.isActive !== false,
  }));
}

/**
 * Active services for marketing pages (same rows as GET /api/public/services).
 */
export async function getSalonServices() {
  const base = (process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5001').replace(/\/$/, '');
  const url = `${base}/api/public/services`;
  try {
    const res = await fetch(url, { next: { revalidate: 120 } });
    if (!res.ok) return loadFallbackSalonServices();
    const data = await res.json();
    if (!Array.isArray(data)) return loadFallbackSalonServices();
    return data.map((s) => ({
      ...s,
      price: Number(s.price),
      priceCard: s.priceCard != null ? Number(s.priceCard) : null,
      duration: Number(s.duration) || 0,
    }));
  } catch {
    return loadFallbackSalonServices();
  }
}
