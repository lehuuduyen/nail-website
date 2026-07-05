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
 * New-customer $5-off offer state. `enabled` controls the /specials promo and the
 * booking callout; `countdownEnabled` shows the weekly FOMO countdown on the promo.
 * Defaults to enabled + no countdown when the API is unreachable.
 */
export async function getNewCustomerOffer() {
  try {
    const res = await fetch(`${API_BASE}/api/public/new-customer-offer`, {
      next: { revalidate: 600 },
    });
    if (!res.ok) return { enabled: true, countdownEnabled: false };
    const data = await res.json();
    return {
      enabled: data?.enabled !== false,
      countdownEnabled: data?.countdownEnabled === true,
    };
  } catch {
    return { enabled: true, countdownEnabled: false };
  }
}