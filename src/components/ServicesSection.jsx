'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Reveal from '@/components/Reveal';
import { SERVICE_CARD_IMAGES } from '@/lib/siteImages';
import { trackEvent } from '@/lib/analytics';

/**
 * F6 · Product card grid (design.md § Macrostructure families).
 *
 * These four are priced products, not features, so the uniform grid is correct —
 * the rhythm comes from the products. What was wrong was the card chrome: every
 * tile carried a radius AND a border AND shadow-md AND a backdrop-blur AND a
 * hover shadow upgrade AND a 1.03 image scale. F6 allows exactly one containment
 * signal; this keeps the image itself as the container and drops the rest.
 *
 * Also fixed: the price was --color-accent at 2.94:1 on paper, a WCAG fail on the
 * one number a visitor actually came to read. It is now --color-accent-ink
 * (6.07:1). The three stacked Sparkles glyphs beside the heading are gone, the
 * head is left-aligned (S2), and the per-card framer-motion stagger is replaced
 * by the shared `reveal` primitive.
 *
 * Prices are the real ones from the pre-redesign component. Nothing here is
 * rounded, padded, or invented.
 */

/** Homepage: only 4 cards — full list at /services. Tên dịch vụ giữ thuật ngữ ngành. */
const POPULAR = [
  { title: 'Manicure', price: '$30', plus: false, category: 'manicure', ...SERVICE_CARD_IMAGES.manicure },
  { title: 'Pedicure', price: '$35', plus: false, category: 'pedicure', ...SERVICE_CARD_IMAGES.pedicure },
  { title: 'Acrylic Nails', price: '$40', plus: true, category: 'nails', ...SERVICE_CARD_IMAGES.acrylic },
  { title: 'Nail Art', price: '$15', plus: true, category: 'nails', ...SERVICE_CARD_IMAGES.nailArt },
];

export default function ServicesSection() {
  const t = useTranslations('home');

  return (
    <section id="popular-services" className="marble-bg pb-3xl">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <header className="head-hang">
          <h2>{t('popular.heading')}</h2>
          <p>{t('popular.subtitle')}</p>
        </header>

        <Reveal
          as="div"
          index={0}
          className="grid grid-cols-1 gap-lg sm:grid-cols-2 sm:gap-x-xl lg:grid-cols-4"
        >
          {POPULAR.map((s) => (
            /* Reveal wraps the whole grid, so the four cards arrive as one
               orchestrated entrance rather than twelve staggered ones. */
            <article key={s.title} className="group">
              {/* Whole card is one link → clicking the image or text goes to booking */}
              <Link
                href={`/booking?category=${s.category}`}
                onClick={() =>
                  trackEvent('book_click', { location: 'popular_services', service: s.title })
                }
                className="block rounded-card"
                aria-label={t('popular.bookAria', { title: s.title })}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-paper-2">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    width={s.width}
                    height={s.height}
                    loading="lazy"
                    quality={80}
                    /* 1.02 is the ceiling; the old 1.03 plus a shadow swap was two
                       hover signals on one element. */
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-long ease-out group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="pt-md">
                  <h3 className="font-display text-step-md font-medium text-ink">{s.title}</h3>
                  <p className="tnum mt-2xs text-step-sm font-semibold text-accent-ink">
                    {t('popular.fromPrice', { price: s.price })}
                    {s.plus ? ' +' : ''}
                  </p>
                  <span className="link-type mt-sm">{t('popular.bookThis')} →</span>
                </div>
              </Link>
            </article>
          ))}
        </Reveal>

        {/* Primary action, then the quiet typographic route to the full list. */}
        <div className="mt-2xl flex flex-col items-start gap-md">
          <Link href="/booking" className="btn-gold">
            {t('popular.bookAppointment')}
          </Link>
          <Link href="/services" className="link-type">
            {t('popular.viewAll')} →
          </Link>
        </div>
      </div>
    </section>
  );
}
