'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CATEGORIES, CATEGORY_NAV, servicesInCategory, mergeGelPairs } from '@/data/services';
import ServiceCard from '@/components/ServiceCard';

function scrollToId(id) {
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function ServicesPageClient({ services }) {
  const t = useTranslations('services');
  // The site header (announcement bar + navbar) is `sticky top-0`, but its height
  // varies: the announcement bar is optional/dismissible and the navbar wraps on
  // narrow screens. Measure it live so the category bar sticks right below it on
  // every device instead of behind it (a hard-coded offset hid it on some phones).
  const [headerH, setHeaderH] = useState(0);

  useEffect(() => {
    const el = document.getElementById('site-header');
    if (!el) return;
    const update = () => setHeaderH(el.getBoundingClientRect().height);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  const onNav = useCallback((key) => {
    scrollToId(key === 'all' ? 'top' : key);
  }, []);

  return (
    <>
      <section className="border-b border-rose-gold/15 bg-gradient-to-b from-cream-dark/90 via-cream to-cream px-4 py-14 text-center md:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
          Nice Nails &amp; Spa · Phoenix, AZ
        </p>
        <h1 className="mt-3 font-display text-4xl text-ink md:text-5xl">
          {t('heading')}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-charcoal md:text-base">
          {t('pricingNote')}
        </p>
      </section>

      <div
        style={{ top: headerH }}
        className="sticky z-30 border-b border-rose-gold/10 bg-cream/95 px-4 py-3 backdrop-blur md:px-6"
      >
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <button
            type="button"
            onClick={() => onNav('all')}
            className="shrink-0 rounded-full bg-charcoal px-4 py-2 text-xs font-semibold uppercase tracking-wide text-cream md:text-sm"
          >
            {t('all')}
          </button>
          {CATEGORY_NAV.map(({ key, navLabel }) => (
            <button
              key={key}
              type="button"
              onClick={() => onNav(key)}
              className="shrink-0 rounded-full bg-surface-soft px-4 py-2 text-xs font-semibold uppercase tracking-wide text-charcoal ring-1 ring-rose-gold/25 transition hover:bg-cream-dark/50 md:text-sm"
            >
              {navLabel}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        {/* Service guide links — helps Google index deep SEO pages */}
        <div className="mb-10 flex flex-wrap gap-3">
          <Link
            href="/services/acrylic-nails-phoenix-az"
            className="rounded-full bg-surface-soft px-4 py-2 text-xs font-semibold text-charcoal ring-1 ring-rose-gold/25 transition hover:bg-cream-dark/50"
          >
            Acrylic Nails in Phoenix →
          </Link>
          <Link
            href="/services/gel-nails-phoenix"
            className="rounded-full bg-surface-soft px-4 py-2 text-xs font-semibold text-charcoal ring-1 ring-rose-gold/25 transition hover:bg-cream-dark/50"
          >
            Gel Nails in Phoenix →
          </Link>
          <Link
            href="/services/gel-x-nails-phoenix"
            className="rounded-full bg-surface-soft px-4 py-2 text-xs font-semibold text-charcoal ring-1 ring-rose-gold/25 transition hover:bg-cream-dark/50"
          >
            Gel-X Nails in Phoenix →
          </Link>
          <Link
            href="/services/dip-powder-nails-phoenix"
            className="rounded-full bg-surface-soft px-4 py-2 text-xs font-semibold text-charcoal ring-1 ring-rose-gold/25 transition hover:bg-cream-dark/50"
          >
            Dip Powder in Phoenix →
          </Link>
          <Link
            href="/services/nail-art-phoenix-az"
            className="rounded-full bg-surface-soft px-4 py-2 text-xs font-semibold text-charcoal ring-1 ring-rose-gold/25 transition hover:bg-cream-dark/50"
          >
            Nail Art &amp; Custom Designs →
          </Link>
        </div>

        {CATEGORY_NAV.map(({ key }) => {
          const meta = CATEGORIES[key];
          const items = servicesInCategory(services, key);
          if (!items.length) return null;
          return (
            <section
              key={key}
              id={key}
              className="mb-20 scroll-mt-28 last:mb-8"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="text-2xl" aria-hidden>
                  {meta.emoji}
                </span>
                <h2 className="font-display text-3xl text-ink md:text-4xl">{meta.label}</h2>
              </div>
              <p className="max-w-3xl text-charcoal">{meta.description}</p>
              <Link
                href={`/services/${key}`}
                className="mt-2 inline-block text-sm font-semibold text-rose-gold hover:underline"
              >
                {t('viewPage', { label: meta.label })}
              </Link>

              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {mergeGelPairs(items).map(({ service, gel }) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    gel={gel}
                    priceSuffix={key === 'nails' ? '& Up' : null}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
