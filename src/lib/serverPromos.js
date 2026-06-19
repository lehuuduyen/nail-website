/**
 * Active promos for the website (same rows as GET /api/promos — active=true only).
 * The Phoenix date-range filter is applied separately in @/lib/promos so date logic
 * stays timezone-correct and works with the client guard. Falls back to [] when the
 * API is down (build/offline) → site renders normally with no promos.
 */
export async function getPromos() {
  const base = (
    process.env.BACKEND_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    'http://127.0.0.1:5001'
  ).replace(/\/$/, '');
  try {
    const res = await fetch(`${base}/api/promos`, { next: { revalidate: 600 } });
    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description || '',
      details: p.details || '',
      badge: p.badge || '',
      startDate: p.startDate || '',
      endDate: p.endDate || '',
      ctaLabel: p.ctaLabel || 'Book Now',
      ctaHref: p.ctaHref || '/booking',
      active: !!p.active,
      showCountdown: !!p.showCountdown,
      tiers: Array.isArray(p.tiers) ? p.tiers : null,
    }));
  } catch {
    return [];
  }
}
