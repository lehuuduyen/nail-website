import Link from 'next/link';
import VideoCard from '@/components/VideoCard';
import VideoObjectJsonLd from '@/components/VideoObjectJsonLd';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { getVideos } from '@/lib/serverVideos';

export const metadata = {
  title: 'Video Showcase | Nice Nails & Spa North Phoenix AZ',
  description:
    'Watch nail art, manicures, pedicures and spa moments at Nice Nails & Spa in North Phoenix, AZ. Tap any clip to play.',
  alternates: {
    canonical: '/videos',
  },
  openGraph: {
    title: 'Video Showcase — Nice Nails & Spa Phoenix',
    description: 'Nail art, manicures & spa moments at Nice Nails & Spa, North Phoenix AZ.',
    type: 'website',
  },
};

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <>
      {/* Resource hints — page has videos */}
      <link rel="preconnect" href="https://www.youtube-nocookie.com" />
      <link rel="preconnect" href="https://i.ytimg.com" />

      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Videos', path: '/videos' },
        ]}
      />
      <VideoObjectJsonLd videos={videos} as="list" />

      <section className="border-b border-rose-gold/15 bg-gradient-to-b from-cream-dark/90 via-cream to-cream px-4 py-14 text-center md:py-16">
        <nav className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          <Link href="/" className="hover:text-rose-gold">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-charcoal">Videos</span>
        </nav>
        <h1 className="font-display text-4xl text-ink md:text-5xl">Video showcase</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-charcoal md:text-base">
          Nail art, manicures, pedicures &amp; spa moments at Nice Nails &amp; Spa. Tap any clip to
          play.
        </p>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        {videos.length === 0 ? (
          <p className="text-center text-charcoal/70">Videos coming soon.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v, i) => (
              <VideoCard key={v.youtubeId} video={v} eager={i === 0} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
