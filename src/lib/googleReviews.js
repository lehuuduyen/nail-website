/**
 * Fetch 5-star reviews từ Google Places API (New).
 * Server-only — không dùng trong 'use client' components.
 *
 * Env vars cần thiết (Vercel → Settings → Environment Variables):
 *   GOOGLE_PLACES_API_KEY   — server-side only key từ Google Cloud Console
 *   GOOGLE_PLACE_ID         — Place ID của tiệm, ví dụ: ChIJXXXXXXXXXXXX
 *
 * Nếu thiếu env hoặc API lỗi → trả về null (component tự dùng reviews cứng).
 */

import { SALON_REVIEWS } from '@/lib/reviews';

const PLACE_ID = process.env.GOOGLE_PLACE_ID || '';
const API_KEY = process.env.GOOGLE_PLACES_API_KEY || '';

function mapGoogleReview(r) {
  return {
    name: r.authorAttribution?.displayName || 'Happy Guest',
    text: (r.text?.text || r.originalText?.text || '').trim(),
    rating: r.rating ?? 5,
    service: 'Google Review',
    datePublished: r.publishTime ? r.publishTime.split('T')[0] : '',
    relativeTime: r.relativePublishTimeDescription || '',
    photoUri: r.authorAttribution?.photoUri || null,
    isGoogle: true,
  };
}

export async function fetchGoogleReviews() {
  if (!PLACE_ID || !API_KEY) return null;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${PLACE_ID}`,
      {
        headers: {
          'X-Goog-Api-Key': API_KEY,
          'X-Goog-FieldMask': 'reviews',
          'Accept-Language': 'en',
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      console.warn('[googleReviews] Places API error:', res.status, await res.text());
      return null;
    }

    const data = await res.json();
    const raw = Array.isArray(data.reviews) ? data.reviews : [];

    const fiveStars = raw
      .filter((r) => r.rating === 5)
      .map(mapGoogleReview)
      .filter((r) => r.text.length > 25);

    return fiveStars.length >= 1 ? fiveStars : null;
  } catch (err) {
    console.warn('[googleReviews] fetch failed:', err?.message);
    return null;
  }
}

const TARGET_COUNT = 15;

/**
 * Trả về tối đa TARGET_COUNT reviews để hiển thị.
 * Ưu tiên Google (live) trước, fill thêm từ hardcoded cho đủ.
 */
export async function getDisplayReviews() {
  const hardcoded = SALON_REVIEWS.map((r) => ({
    ...r,
    isGoogle: false,
    photoUri: null,
    relativeTime: '',
  }));

  const google = await fetchGoogleReviews();

  if (!google || google.length === 0) return hardcoded.slice(0, TARGET_COUNT);

  const combined = [...google];
  for (const r of hardcoded) {
    if (combined.length >= TARGET_COUNT) break;
    combined.push(r);
  }
  return combined;
}
