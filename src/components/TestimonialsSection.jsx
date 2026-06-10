'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Pause, Play, Star } from 'lucide-react';
import { SALON_REVIEWS } from '@/lib/reviews';

const REVIEW_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ||
  process.env.NEXT_PUBLIC_SALON_MAPS_URL ||
  'https://maps.app.goo.gl/RxXkeYRL63uib95d6';

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function ReviewCard({ r }) {
  const initial = (r.name || '?').charAt(0).toUpperCase();
  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/8 p-6 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-0.5 text-rose-gold">
          {Array.from({ length: 5 }).map((_, k) => (
            <Star key={k} size={15} fill="currentColor" />
          ))}
        </div>
        {r.isGoogle && <GoogleIcon />}
      </div>
      <p className="flex-1 text-sm leading-relaxed text-cream/85">
        &ldquo;{r.text}&rdquo;
      </p>
      <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
        {r.photoUri ? (
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
            <Image src={r.photoUri} alt={r.name} fill className="object-cover" sizes="36px" unoptimized />
          </div>
        ) : (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-gold/20 text-xs font-bold text-rose-gold">
            {initial}
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-cream">{r.name}</p>
          <p className="truncate text-xs text-cream/50">{r.relativeTime || r.service}</p>
        </div>
      </div>
    </article>
  );
}

export default function TestimonialsSection({ reviews: propReviews }) {
  const base = propReviews?.length ? propReviews : SALON_REVIEWS;
  const hasGoogle = base.some((r) => r.isGoogle === true);
  const [paused, setPaused] = useState(false);

  return (
    <section className="overflow-hidden bg-charcoal py-20 md:py-28">
      {/*
        CSS marquee: one real copy in DOM (crawlable), one aria-hidden duplicate
        for seamless visual loop. No JS scroll-position monitoring.
        Each card uses mr-5 so both copies have equal width → translateX(-50%) is exact.
      */}
      <style>{`
        @keyframes nns-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .nns-track {
          animation: nns-marquee 80s linear infinite;
          will-change: transform;
        }
        .nns-track:hover,
        .nns-track-paused {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .nns-track { animation: none; }
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl text-cream md:text-4xl">Guest love</h2>
            <div className="mt-3 h-1 w-20 rounded-full bg-rose-gold" />
            {hasGoogle && (
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-cream/70">
                <GoogleIcon />
                Live from Google Maps
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-cream transition hover:border-rose-gold hover:text-rose-gold"
          >
            {paused ? <Play size={18} /> : <Pause size={18} />}
          </button>
        </div>
      </div>

      {/* Full-bleed marquee track */}
      <div className="overflow-hidden pb-2">
        <ul className={`flex nns-track${paused ? ' nns-track-paused' : ''}`}>
          {/* Real copy — indexed by search crawlers */}
          {base.map((r, idx) => (
            <li key={idx} className="w-[78vw] flex-none mr-5 md:w-[320px] lg:w-[384px]">
              <ReviewCard r={r} />
            </li>
          ))}
          {/* Visual-only duplicate — hidden from screen readers and crawlers */}
          {base.map((r, idx) => (
            <li key={`ghost-${idx}`} aria-hidden="true" className="w-[78vw] flex-none mr-5 md:w-[320px] lg:w-[384px]">
              <ReviewCard r={r} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-4 text-center md:px-6">
        <a
          href={REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-rose-gold px-6 py-3 text-sm font-semibold text-rose-gold transition hover:bg-rose-gold hover:text-charcoal"
        >
          <Star size={15} fill="currentColor" />
          Review us on Google
        </a>
      </div>
    </section>
  );
}
