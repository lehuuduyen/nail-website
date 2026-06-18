/**
 * Active showcase videos for marketing pages (same rows as GET /api/videos).
 * Server-only fetch with graceful fallback to [] when the API is down (build/offline).
 */
export async function getVideos() {
  const base = (
    process.env.BACKEND_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    'http://127.0.0.1:5001'
  ).replace(/\/$/, '');
  try {
    const res = await fetch(`${base}/api/videos`, { next: { revalidate: 120 } });
    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data.map((v) => ({
      id: v.id,
      youtubeId: v.youtubeId,
      title: v.title,
      description: v.description || '',
      uploadDate: v.uploadDate || null,
      durationSeconds: v.durationSeconds ?? null,
      featured: !!v.featured,
    }));
  } catch {
    return [];
  }
}
