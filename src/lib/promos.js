/**
 * Pure promo helpers — date logic only, no data source.
 * Data comes from the API (see @/lib/serverPromos); these functions filter/format it.
 */

/** Phone used on promo CTAs (per marketing spec). */
export const PROMO_PHONE_DISPLAY = '(602) 759-9184';
export const PROMO_PHONE_TEL = '+16027599184';

/**
 * Today's date as "YYYY-MM-DD" in America/Phoenix (Arizona, no DST).
 * Comparing date-only strings avoids any server/UTC time drift.
 */
function phoenixDateStr(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Phoenix',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

function inRange(promo, today) {
  const start = (promo.startDate || '').slice(0, 10);
  const end = (promo.endDate || '').slice(0, 10);
  if (!start || !end) return false;
  return start <= today && today <= end; // both inclusive, lexicographic on YYYY-MM-DD
}

/** A promo is live = active AND within [startDate, endDate] in Phoenix time. */
export function isPromoLive(promo, now = new Date()) {
  if (!promo || promo.active !== true) return false;
  return inRange(promo, phoenixDateStr(now));
}

/** Keep only live promos from a list (API already filtered active=true). */
export function filterLivePromos(list, now = new Date()) {
  const today = phoenixDateStr(now);
  return (list || []).filter((p) => p.active === true && inRange(p, today));
}

/** First live promo for the announcement bar + homepage section. null when none. */
export function pickFeatured(list, now = new Date()) {
  return filterLivePromos(list, now)[0] || null;
}

/** Human-readable validity range, e.g. "Jun 1 – Jun 30, 2026". */
export function formatPromoDates(promo) {
  const fmt = (iso) =>
    new Date(`${iso.slice(0, 10)}T12:00:00`).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  if (!promo?.startDate || !promo?.endDate) return '';
  return `${fmt(promo.startDate)} – ${fmt(promo.endDate)}`;
}
