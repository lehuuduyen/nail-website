import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import VideoCard from '@/components/VideoCard';
import VideoObjectJsonLd from '@/components/VideoObjectJsonLd';
import { getFeaturedVideos } from '@/lib/video';

/**
 * Homepage showcase section. Renders 1–2 featured clips as facades (no iframe on load)
 * plus a "View all videos" link to /videos. Returns null when there are no featured clips.
 * Props: { videos: VideoItem[] }
 */
export default function FeaturedVideos({ videos }) {
  const t = useTranslations('home.videos');
  const featured = getFeaturedVideos(videos, 2);
  if (featured.length === 0) return null;

  return (
    <section className="bg-paper-2 py-2xl md:py-3xl">
      {/* Resource hints — only emitted when the page actually has videos */}
      <link rel="preconnect" href="https://www.youtube-nocookie.com" />
      <link rel="preconnect" href="https://i.ytimg.com" />
      <VideoObjectJsonLd videos={featured} />

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <header className="head-hang">
          <h2>{t('heading')}</h2>
          <p>{t('subtitle')}</p>
        </header>

        {/* minmax(0, …) — the tracks hold video thumbnails (gate 50) */}
        <div className="grid gap-xl md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {featured.map((v) => (
            <VideoCard key={v.youtubeId} video={v} />
          ))}
        </div>

        <div className="mt-2xl">
          <Link href="/videos" className="btn-quiet">
            {t('viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}
