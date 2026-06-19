import { secondsToISO8601, youtubeWatchUrl, youtubeEmbedUrl } from '@/lib/video';

/** Build a schema.org VideoObject from a video row. */
function toVideoObject(v) {
  const duration = secondsToISO8601(v.durationSeconds);
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: v.title,
    description: v.description || v.title,
    thumbnailUrl: [`https://i.ytimg.com/vi/${v.youtubeId}/maxresdefault.jpg`],
    // uploadDate is REQUIRED by Google for VideoObject — always emit it.
    uploadDate: v.uploadDate || new Date().toISOString().slice(0, 10),
    ...(duration ? { duration } : {}),
    contentUrl: youtubeWatchUrl(v.youtubeId),
    embedUrl: youtubeEmbedUrl(v.youtubeId),
  };
}

/**
 * JSON-LD for showcase videos.
 * - default: one VideoObject per clip (homepage featured).
 * - as="list": a single ItemList wrapping the VideoObjects (/videos page).
 */
export default function VideoObjectJsonLd({ videos, as }) {
  if (!videos || videos.length === 0) return null;

  const schema =
    as === 'list'
      ? {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: videos.map((v, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: toVideoObject(v),
          })),
        }
      : videos.map(toVideoObject);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
