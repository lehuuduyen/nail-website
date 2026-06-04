'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { SALON_REVIEWS as reviews } from '@/lib/reviews';

const REVIEW_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ||
  process.env.NEXT_PUBLIC_SALON_MAPS_URL ||
  'https://maps.app.goo.gl/RxXkeYRL63uib95d6';

export default function TestimonialsSection() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % reviews.length), 5200);
    return () => clearInterval(t);
  }, []);

  const r = reviews[i];

  return (
    <section className="bg-charcoal py-20 text-cream md:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
        <h2 className="font-display text-3xl text-cream md:text-4xl">Guest love</h2>
        <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-rose-gold" />
        <div className="relative mt-12 min-h-[200px]">
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
                “{r.text}”
              </p>
              <p className="mt-6 text-sm font-semibold text-rose-gold">{r.name}</p>
              <p className="text-xs text-cream/90">{r.service}</p>
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
