'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { SERVICE_CARD_IMAGES } from '@/lib/siteImages';

const POPULAR = [
  {
    title: 'Manicure',
    priceLine: 'From $30',
    bookingId: 1,
    ...SERVICE_CARD_IMAGES.manicure,
  },
  {
    title: 'Pedicure',
    priceLine: 'From $35',
    bookingId: 4,
    ...SERVICE_CARD_IMAGES.pedicure,
  },
  {
    title: 'Acrylic Nails',
    priceLine: 'From $40 +',
    bookingId: 13,
    ...SERVICE_CARD_IMAGES.acrylic,
  },
  {
    title: 'Nail Art',
    priceLine: 'From $15 +',
    bookingId: 21,
    ...SERVICE_CARD_IMAGES.nailArt,
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ServicesSection() {
  return (
    <section id="popular-services" className="marble-bg pb-20 pt-4 md:pb-28 md:pt-2">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="flex flex-wrap items-center justify-center gap-2 text-center font-display text-3xl font-normal text-ink md:text-4xl">
          Our Most Popular Services
          <span className="inline-flex items-center gap-0.5 text-rose-gold" aria-hidden>
            <Sparkles className="h-6 w-6" strokeWidth={1.25} />
            <Sparkles className="h-5 w-5 opacity-85" strokeWidth={1.25} />
            <Sparkles className="h-4 w-4 opacity-70" strokeWidth={1.25} />
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-sm italic text-muted md:text-base">
          We perfect our stunning nail designs
        </p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {POPULAR.map((s) => (
            <motion.article
              key={s.title}
              variants={item}
              className="group overflow-hidden rounded-2xl border border-rose-gold/15 bg-surface/70 shadow-md shadow-rose-gold/10 backdrop-blur-sm transition-shadow duration-300 hover:border-rose-gold/25 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={s.width}
                  height={s.height}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="px-4 pb-5 pt-4 text-center">
                <h3 className="font-display text-lg font-medium text-ink">{s.title}</h3>
                <p className="mt-2 text-base font-medium text-rose-gold">{s.priceLine}</p>
                <Link
                  href={`/booking?service=${s.bookingId}`}
                  className="mt-3 inline-block text-xs font-semibold uppercase tracking-wide text-muted underline decoration-rose-gold/50 underline-offset-4 hover:text-rose-gold"
                >
                  Book this service
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 flex flex-col items-center gap-4"
        >
          <Link
            href="/booking"
            className="btn-gold inline-flex min-w-[280px] items-center justify-center no-underline"
          >
            Book your appointment
          </Link>
          <Link
            href="/services"
            className="text-sm font-medium text-muted underline decoration-rose-gold/40 underline-offset-4 hover:text-ink"
          >
            View all services &amp; prices
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
