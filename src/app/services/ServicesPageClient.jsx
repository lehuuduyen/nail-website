'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { CATEGORIES, CATEGORY_NAV, servicesInCategory } from '@/data/services';
import ServiceCard from '@/components/ServiceCard';

function scrollToId(id) {
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function ServicesPageClient() {
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
          Our services &amp; pricing
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-charcoal md:text-base">
          Cash price shown. Card price includes a 3% processing fee. Book online anytime — walk-ins
          welcome.
        </p>
      </section>

      <div className="sticky top-[72px] z-30 border-b border-rose-gold/10 bg-cream/95 px-4 py-3 backdrop-blur md:px-6">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <button
            type="button"
            onClick={() => onNav('all')}
            className="shrink-0 rounded-full bg-charcoal px-4 py-2 text-xs font-semibold uppercase tracking-wide text-cream md:text-sm"
          >
            All
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
        {CATEGORY_NAV.map(({ key }) => {
          const meta = CATEGORIES[key];
          const items = servicesInCategory(key);
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
                View {meta.label} page →
              </Link>

              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((s) => (
                  <ServiceCard key={s.id} service={s} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
