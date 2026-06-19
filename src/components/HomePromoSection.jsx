import Link from 'next/link';
import { Phone } from 'lucide-react';
import { getPromos } from '@/lib/serverPromos';
import { pickFeatured, formatPromoDates, PROMO_PHONE_DISPLAY, PROMO_PHONE_TEL } from '@/lib/promos';

/**
 * Standout promo block on the homepage, right after the hero.
 * Returns null when no promo is live — the homepage falls back to normal.
 */
export default async function HomePromoSection() {
  const promo = pickFeatured(await getPromos());
  if (!promo) return null;

  return (
    <section className="bg-cream px-4 py-12 md:py-16">
      <div className="mx-auto max-w-4xl rounded-3xl border-2 border-rose-gold/30 bg-surface p-6 shadow-sm shadow-rose-gold/10 md:p-10">
        <div className="flex flex-wrap items-center gap-3">
          {promo.badge && (
            <span className="rounded-full bg-rose-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
              {promo.badge}
            </span>
          )}
          <span className="text-xs font-medium text-muted">{formatPromoDates(promo)}</span>
        </div>

        <h2 className="mt-4 font-display text-3xl text-ink md:text-4xl">{promo.title}</h2>
        <p className="mt-3 max-w-2xl text-charcoal md:text-lg">{promo.description}</p>
        {promo.details && <p className="mt-2 max-w-2xl text-sm text-muted">{promo.details}</p>}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href={promo.ctaHref}
            className="inline-flex rounded-full bg-rose-gold px-7 py-3 text-sm font-semibold text-white shadow transition hover:bg-rose-gold-deep"
          >
            {promo.ctaLabel}
          </Link>
          <a
            href={`tel:${PROMO_PHONE_TEL}`}
            className="inline-flex items-center gap-2 rounded-full border-2 border-charcoal/20 px-6 py-3 text-sm font-semibold text-charcoal transition hover:border-rose-gold/50"
          >
            <Phone size={16} aria-hidden="true" />
            Call {PROMO_PHONE_DISPLAY}
          </a>
          <Link
            href="/specials"
            className="text-sm font-semibold text-rose-gold underline underline-offset-2 hover:text-rose-gold-deep"
          >
            View all specials →
          </Link>
        </div>
      </div>
    </section>
  );
}
