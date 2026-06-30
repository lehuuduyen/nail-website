'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Sparkles } from 'lucide-react';
import { SERVICE_CARD_IMAGES } from '@/lib/siteImages';
import { trackEvent } from '@/lib/analytics';

/** Homepage: only 4 cards — full list at /services. Tên dịch vụ giữ thuật ngữ ngành. */
const POPULAR = [
  { title: 'Manicure', price: '$30', plus: false, category: 'manicure', ...SERVICE_CARD_IMAGES.manicure },
  { title: 'Pedicure', price: '$35', plus: false, category: 'pedicure', ...SERVICE_CARD_IMAGES.pedicure },
  { title: 'Acrylic Nails', price: '$40', plus: true, category: 'nails', ...SERVICE_CARD_IMAGES.acrylic },
  { title: 'Nail Art', price: '$15', plus: true, category: 'nails', ...SERVICE_CARD_IMAGES.nailArt },
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
  const t = useTranslations('home');
  return (
    <section id="popular-services" className="marble-bg pb-20 pt-4 md:pb-28 md:pt-2">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="flex flex-wrap items-center justify-center gap-2 text-center font-display text-3xl font-normal text-ink md:text-4xl">
          {t('popular.heading')}
          <span className="inline-flex items-center gap-0.5 text-rose-gold" aria-hidden>
            <Sparkles className="h-6 w-6" strokeWidth={1.25} />
            <Sparkles className="h-5 w-5 opacity-85" strokeWidth={1.25} />
            <Sparkles className="h-4 w-4 opacity-70" strokeWidth={1.25} />
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-sm italic text-muted md:text-base">
          {t('popular.subtitle')}
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
              {/* Whole card is one link → clicking the image or text goes to booking */}
              <Link
                href={`/booking?category=${s.category}`}
                onClick={() =>
                  trackEvent('book_click', { location: 'popular_services', service: s.title })
                }
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-gold/60"
                aria-label={t('popular.bookAria', { title: s.title })}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    width={s.width}
                    height={s.height}
                    loading="lazy"
                    quality={80}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="px-4 pb-5 pt-4 text-center">
                  <h3 className="font-display text-lg font-medium text-ink">{s.title}</h3>
                  <p className="mt-2 text-base font-medium text-rose-gold">
                    {t('popular.fromPrice', { price: s.price })}{s.plus ? ' +' : ''}
                  </p>
                  <span className="mt-3 inline-block text-xs font-semibold uppercase tracking-wide text-muted underline decoration-rose-gold/50 underline-offset-4 group-hover:text-rose-gold">
                    {t('popular.bookThis')}
                  </span>
                </div>
              </Link>
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
            {t('popular.bookAppointment')}
          </Link>
          <Link
            href="/services"
            className="text-sm font-medium text-muted underline decoration-rose-gold/40 underline-offset-4 hover:text-ink"
          >
            {t('popular.viewAll')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
