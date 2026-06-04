'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { SALON_REVIEWS } from '@/lib/reviews';

const REVIEW_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ||
  process.env.NEXT_PUBLIC_SALON_MAPS_URL ||
  'https://maps.app.goo.gl/RxXkeYRL63uib95d6';

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

export default function TestimonialsSection({ reviews: propReviews }) {
  const reviews = propReviews?.length ? propReviews : SALON_REVIEWS;
  const [i, setI] = useState(0);
  const fromGoogle = reviews[0]?.isGoogle === true;

  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % reviews.length), 5200);
    return () => clearInterval(t);
  }, [reviews.length]);

  const r = reviews[i] ?? reviews[0];

  return (
    <section className="bg-charcoal py-20 text-cream md:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
        <h2 className="font-display text-3xl text-cream md:text-4xl">Guest love</h2>
        <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-rose-gold" />

        {fromGoogle && (
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-cream/80">
            <GoogleIcon />
            Live from Google Maps
          </div>
        )}

        <div className="relative mt-10 min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45 }}
              className="px-2"
            >
              <div className="flex justify-center gap-1 text-rose-gold">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} size={20} fill="currentColor" className="text-rose-gold" />
                ))}
              </div>

              <p className="mt-6 font-display text-xl leading-relaxed text-cream/95 md:text-2xl">
                &ldquo;{r.text}&rdquo;
              </p>

              <div className="mt-6 flex flex-col items-center gap-2">
                {r.photoUri ? (
                  <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-rose-gold/40">
                    <Image
                      src={r.photoUri}
                      alt={r.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                      unoptimized
                    />
                  </div>
                ) : null}
                <div>
                  <p className="text-sm font-semibold text-rose-gold">{r.name}</p>
                  <p className="text-xs text-cream/70">
                    {r.relativeTime || r.service}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setI(idx)}
              className={`h-2 w-2 rounded-full transition ${
                idx === i ? 'bg-rose-gold' : 'bg-cream/30'
              }`}
              aria-label={`Go to review ${idx + 1}`}
            />
          ))}
        </div>

        <div className="mt-10">
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
