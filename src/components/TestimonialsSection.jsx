'use client';

import Image from 'next/image';
import { useState, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
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
    <article className="flex h-full flex-col rounded-card border border-rule-dark bg-paper-dark-2 p-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-0.5 text-gold">
          {Array.from({ length: 5 }).map((_, k) => (
            <Star key={k} size={15} fill="currentColor" />
          ))}
        </div>
        {r.isGoogle && <GoogleIcon />}
      </div>
      <p className="flex-1 text-step-sm leading-relaxed text-on-dark-2">
        &ldquo;{r.text}&rdquo;
      </p>
      <div className="mt-lg flex items-center gap-sm border-t border-rule-dark pt-md">
        {r.photoUri ? (
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
            <Image src={r.photoUri} alt={r.name} fill className="object-cover" sizes="36px" unoptimized />
          </div>
        ) : (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-pill bg-accent/20 text-step-xs font-bold text-gold">
            {initial}
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate text-step-sm font-semibold text-on-dark">{r.name}</p>
          <p className="truncate text-step-xs text-on-dark-2">{r.relativeTime || r.service}</p>
        </div>
      </div>
    </article>
  );
}

export default function TestimonialsSection({ reviews: propReviews }) {
  const t = useTranslations('home.testimonials');
  const base = propReviews?.length ? propReviews : SALON_REVIEWS;
  const hasGoogle = base.some((r) => r.isGoogle === true);
  const [paused, setPaused] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef(null);
  const rafRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const el = scrollRef.current;
      if (!el) return;
      const firstCard = el.querySelector('li');
      if (!firstCard) return;
      const cardW = firstCard.offsetWidth + 16; // gap-4 = 16px
      const idx = Math.round(el.scrollLeft / cardW);
      setActiveIdx(Math.min(Math.max(idx, 0), base.length - 1));
    });
  }, [base.length]);

  return (
    <section className="band-dark overflow-hidden py-2xl md:py-3xl">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-xl flex flex-wrap items-end justify-between gap-md">
          <div>
            {/* S2 hanging head on the dark band; the 80x4px accent bar under it
                was the ornament divider this redesign retires. */}
            <h2 className="font-display text-step-2xl font-normal leading-tight text-on-dark md:text-step-3xl">
              {t('heading')}
            </h2>
            {hasGoogle && (
              <div className="mt-sm inline-flex items-center gap-2xs rounded-pill border border-rule-dark px-sm py-1 text-step-xs font-medium text-on-dark-2">
                <GoogleIcon />
                {t('liveGoogle')}
              </div>
            )}
          </div>
          {/* Pause button — desktop only */}
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? t('resume') : t('pause')}
            className="hidden h-11 w-11 items-center justify-center rounded-pill border border-rule-dark text-on-dark transition-colors duration-short ease-out hover:border-gold hover:text-gold md:flex"
          >
            {paused ? <Play size={18} /> : <Pause size={18} />}
          </button>
        </div>
      </div>

      {/* ── Mobile: native swipe carousel ── */}
      <div className="md:hidden">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="overflow-x-auto scroll-smooth [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          <ul className="flex gap-4 px-4" style={{ width: 'max-content' }}>
            {base.map((r, idx) => (
              <li
                key={idx}
                style={{ scrollSnapAlign: 'start', width: '82vw' }}
                className="flex-none"
              >
                <ReviewCard r={r} />
              </li>
            ))}
            {/* trailing space so last card snaps flush */}
            <li aria-hidden="true" style={{ width: '1rem', flexShrink: 0 }} />
          </ul>
        </div>

        {/* Dot pagination */}
        <div className="mt-4 flex justify-center gap-1.5 px-4">
          {base.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={t('reviewNum', { num: idx + 1 })}
              onClick={() => {
                const el = scrollRef.current;
                if (!el) return;
                const firstCard = el.querySelector('li');
                if (!firstCard) return;
                const cardW = firstCard.offsetWidth + 16;
                el.scrollTo({ left: idx * cardW, behavior: 'smooth' });
              }}
              /* transition-all is banned; width is a layout property and should
                  not animate at all, so only the colour transitions. */
              className={`h-1.5 rounded-pill transition-colors duration-short ease-out ${
                idx === activeIdx ? 'w-5 bg-gold' : 'w-1.5 bg-on-dark-2/40 hover:bg-on-dark-2'
              }`}
            />
          ))}
        </div>

        {/* Counter */}
        <p className="tnum mt-2 text-center text-step-xs text-on-dark-2">
          {activeIdx + 1} / {base.length}
        </p>
      </div>

      {/* ── Desktop: marquee (unchanged) ── */}
      <div className="hidden md:block overflow-hidden pb-2">
        <ul className={`marquee-track flex${paused ? ' is-paused' : ''}`}>
          {base.map((r, idx) => (
            <li key={idx} className="w-[320px] flex-none mr-5 lg:w-[384px]">
              <ReviewCard r={r} />
            </li>
          ))}
          {base.map((r, idx) => (
            <li key={`ghost-${idx}`} aria-hidden="true" className="w-[320px] flex-none mr-5 lg:w-[384px]">
              <ReviewCard r={r} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-xl max-w-7xl px-4 md:px-6">
        <a
          href={REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-xs whitespace-nowrap rounded-pill border border-gold px-lg py-sm text-step-sm font-semibold text-gold transition-colors duration-short ease-out hover:bg-gold hover:text-ink"
        >
          <Star size={15} fill="currentColor" aria-hidden />
          {t('reviewUs')}
        </a>
      </div>
    </section>
  );
}
