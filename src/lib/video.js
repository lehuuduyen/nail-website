/**
 * Helpers for the YouTube showcase feature.
 * No third-party libs — pure functions used by the facade + JSON-LD.
 */

/** Featured clips only, capped to `limit`. */
export function getFeaturedVideos(videos, limit = 2) {
  return (videos || []).filter((v) => v.featured === true).slice(0, limit);
}

/** Seconds → ISO 8601 duration, e.g. 150 → "PT2M30S". Returns null when not provided. */
export function secondsToISO8601(s) {
  if (s == null || isNaN(Number(s)) || Number(s) <= 0) return null;
  const total = Math.floor(Number(s));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const sec = total % 60;
  let out = 'PT';
  if (h) out += `${h}H`;
  if (m) out += `${m}M`;
  if (sec || (!h && !m)) out += `${sec}S`;
  return out;
}

/** maxres thumbnail (best quality; may 404 for some videos → facade falls back to hq). */
export function getThumbnail(youtubeId) {
  return `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;
}

/** hqdefault — always exists; used as onError fallback. */
export function getThumbnailFallback(youtubeId) {
  return `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
}

export function youtubeWatchUrl(youtubeId) {
  return `https://www.youtube.com/watch?v=${youtubeId}`;
}

export function youtubeEmbedUrl(youtubeId) {
  return `https://www.youtube-nocookie.com/embed/${youtubeId}`;
}
