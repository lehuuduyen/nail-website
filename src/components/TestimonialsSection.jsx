'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Maria G.',
    service: 'Dip powder & pedicure',
    text: 'I’ve been coming to this area for years — consistent quality and the pedi massage is amazing.',
  },
  {
    name: 'Taylor R.',
    service: 'Gel manicure',
    text: 'Super clean setup and my gel lasts forever. Easy to book and everyone is kind.',
  },
  {
    name: 'Priya S.',
    service: 'Full set & nail art',
    text: 'They took their time with the design. Best nail salon experience I’ve had in Phoenix.',
  },
  {
    name: 'Jordan M.',
    service: 'Waxing',
    text: 'Quick, professional, and comfortable. I always leave feeling put together.',
  },
  {
    name: 'Elena V.',
    service: 'Spa pedicure',
    text: 'Walked in on a Saturday and they still accommodated me. Love the atmosphere.',
  },
];

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
      </div>
    </section>
  );
}
