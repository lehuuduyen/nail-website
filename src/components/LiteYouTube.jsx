'use client';

import { useState } from 'react';
import { getThumbnail, getThumbnailFallback, youtubeEmbedUrl } from '@/lib/video';

/**
 * Lazy YouTube facade — NO iframe on load. Renders a static thumbnail + play button;
 * the real privacy-enhanced iframe (youtube-nocookie) is only created on click/Enter.
 * Always wrapped in a fixed 16/9 box so CLS = 0.
 *
 * Props: { id: string; title: string; eager?: boolean }
 */
export default function LiteYouTube({ id, title, eager = false }) {
  const [activated, setActivated] = useState(false);
  const [thumbSrc, setThumbSrc] = useState(getThumbnail(id));

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-charcoal">
      {activated ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`${youtubeEmbedUrl(id)}?autoplay=1`}
          title={title}
          loading="lazy"
          allow="accelerated-encoding; autoplay; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setActivated(true)}
          aria-label={`Phát video: ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-gold/70"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbSrc}
            alt={title}
            width={1280}
            height={720}
            loading={eager ? 'eager' : 'lazy'}
            fetchPriority={eager ? 'high' : 'low'}
            decoding="async"
            onError={() => {
              const fb = getThumbnailFallback(id);
              if (thumbSrc !== fb) setThumbSrc(fb);
            }}
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          {/* Dark overlay for play-button contrast (WCAG) */}
          <span className="absolute inset-0 bg-charcoal/15 transition group-hover:bg-charcoal/30" />
          {/* Play icon — inline SVG, no extra request */}
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-rose-gold/95 shadow-lg transition group-hover:scale-110 group-hover:bg-rose-gold">
            <svg
              viewBox="0 0 24 24"
              className="ml-1 h-7 w-7 fill-white"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
