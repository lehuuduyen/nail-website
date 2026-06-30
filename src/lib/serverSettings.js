/**
 * Public site settings read from the backend. Mirrors the resilience of
 * @/lib/serverPromos: on any failure (build/offline/API down) it falls back to a
 * safe default so the site still renders.
 */
const API_BASE = (
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://127.0.0.1:5001'
).replace(/\/$/, '');

/**
 * Is the new-customer $5-off offer currently on? Controls the /specials promo and
 * the booking callout. Defaults to true when the API is unreachable.
 */
export async function getNewCustomerOfferEnabled() {
  try {
    const res = await fetch(`${API_BASE}/api/public/new-customer-offer`, {
      next: { revalidate: 600 },
    });
    if (!res.ok) return true;
    const data = await res.json();
    return data?.enabled !== false;
  } catch {
    return true;
  }
}
