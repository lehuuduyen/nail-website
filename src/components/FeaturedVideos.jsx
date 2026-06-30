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
    <section className="bg-surface-soft py-20 md:py-28">
      {/* Resource hints — only emitted when the page actually has videos */}
      <link rel="preconnect" href="https://www.youtube-nocookie.com" />
      <link rel="preconnect" href="https://i.ytimg.com" />
      <VideoObjectJsonLd videos={featured} />

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl text-ink md:text-4xl">{t('heading')}</h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-rose-gold" />
          <p className="mx-auto mt-4 max-w-2xl text-sm text-charcoal md:text-base">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {featured.map((v) => (
            <VideoCard key={v.youtubeId} video={v} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/videos"
            className="inline-flex rounded-full bg-charcoal px-8 py-3 text-sm font-semibold text-cream transition hover:bg-charcoal/90"
          >
            {t('viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}
