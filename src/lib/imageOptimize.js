const OPTIMIZABLE_HOSTS = new Set([
  'nicenailsphoenix.com',
  'images.unsplash.com',
  'images.pexels.com',
]);

const API_ORIGIN = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001').replace(/\/$/, '');

/** Returns true only for http URLs from domains NOT in next.config remotePatterns. */
export function unoptimizedRemote(src) {
  if (typeof src !== 'string') return false;
  const s = src.trim();
  if (!s.startsWith('http')) return false;
  if (s.startsWith(API_ORIGIN)) return false;
  try {
    const { hostname } = new URL(s);
    if (OPTIMIZABLE_HOSTS.has(hostname)) return false;
  } catch {
    // malformed URL — skip optimization to be safe
  }
  return true;
}
