'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
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
            <Image
              src={r.photoUri}
              alt={r.name}
              fill
              className="object-cover"
              sizes="36px"
              unoptimized
            />
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
  const reviews = propReviews?.length ? propReviews : SALON_REVIEWS;
  const hasGoogle = reviews.some((r) => r.isGoogle === true);

  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const syncNav = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    syncNav();
    el.addEventListener('scroll', syncNav, { passive: true });
    window.addEventListener('resize', syncNav);
    return () => {
      el.removeEventListener('scroll', syncNav);
      window.removeEventListener('resize', syncNav);
    };
  }, [syncNav, reviews]);

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('li');
    const gap = 20;
    const amount = card ? card.offsetWidth + gap : el.clientWidth / 3;
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <section className="overflow-hidden bg-charcoal py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">

        {/* Header row */}
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

          {/* Arrow buttons */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              disabled={!canPrev}
              aria-label="Previous"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-cream transition hover:border-rose-gold hover:text-rose-gold disabled:opacity-25"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              disabled={!canNext}
              aria-label="Next"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-cream transition hover:border-rose-gold hover:text-rose-gold disabled:opacity-25"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable card track */}
        <ul
          ref={trackRef}
          className="flex gap-5 overflow-x-auto scroll-smooth pb-3 [scroll-snap-type:x_mandatory] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((r, idx) => (
            <li
              key={idx}
              className="w-[82vw] flex-none [scroll-snap-align:start] md:w-[calc(50%-10px)] lg:w-[calc(33.33%-14px)]"
            >
              <ReviewCard r={r} />
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-10 text-center">
          <a
            href={REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-rose-gold px-6 py-3 text-sm font-semibold text-rose-gold transition hover:bg-rose-gold hover:text-charcoal"
          >
            <Star size={15} fill="currentColor" />
            Đánh giá chúng tôi trên Google
          </a>
        </div>

      </div>
    </section>
  );
}
