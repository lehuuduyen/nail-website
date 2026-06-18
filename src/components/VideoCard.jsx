import LiteYouTube from '@/components/LiteYouTube';

/**
 * Facade video + title + short description. Used on homepage Featured section and /videos gallery.
 * Props: { video: { youtubeId, title, description }, eager?: boolean }
 */
export default function VideoCard({ video, eager = false }) {
  return (
    <figure className="flex flex-col">
      <LiteYouTube id={video.youtubeId} title={video.title} eager={eager} />
      <figcaption className="mt-3">
        <h3 className="font-display text-lg text-ink">{video.title}</h3>
        {video.description && (
          <p className="mt-1 line-clamp-2 text-sm text-charcoal/80">{video.description}</p>
        )}
      </figcaption>
    </figure>
  );
}
