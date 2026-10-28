import { Link } from '@/i18n/navigation';
import { Phone } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { getPromos } from '@/lib/serverPromos';
import { pickFeatured, formatPromoDates, PROMO_PHONE_DISPLAY, PROMO_PHONE_TEL } from '@/lib/promos';
import TrackedLink from '@/components/analytics/TrackedLink';

/**
 * Standout promo block on the homepage, right after the hero.
 * Returns null when no promo is live — the homepage falls back to normal.
 *
 * Fixed here:
 * - Two hard-coded English strings ("Call …", "View all specials →") rendered in
 *   English on /es and /vi. They now come from specialsPage.callWithNumber and
 *   specialsPage.viewAllSpecials.
 * - The badge and the primary CTA were white on the brand vein: 3.08:1, a WCAG
 *   failure on the one element the whole block exists to get clicked.
 * - border-2 twice over. Atelier uses hairlines, not two-pixel card borders.
 */
export default async function HomePromoSection() {
  const promo = pickFeatured(await getPromos());
  if (!promo) return null;

  const t = await getTranslations('specialsPage');
  const isGiftCard = Array.isArray(promo.tiers) && promo.tiers.length > 0;
  const ctaEvent = isGiftCard ? 'giftcard_click' : 'book_click';

  return (
    <section className="bg-paper px-4 py-xl md:py-2xl">
      <div className="mx-auto max-w-4xl border border-rule bg-surface p-lg md:p-2xl">
        <div className="flex flex-wrap items-center gap-sm">
          {promo.badge && (
            <span className="rounded-pill bg-gold px-sm py-1 text-step-xs font-bold uppercase tracking-[0.12em] text-ink">
              {promo.badge}
            </span>
          )}
          <span className="tnum text-step-xs font-medium text-ink-2">
            {formatPromoDates(promo)}
          </span>
        </div>

        <h2 className="mt-md font-display text-step-2xl text-ink md:text-step-3xl">
          {promo.title}
        </h2>
        <p className="measure mt-sm text-step-md text-ink">{promo.description}</p>
        {promo.details && (
          <p className="measure mt-2xs text-step-sm text-ink-2">{promo.details}</p>
        )}

        <div className="mt-lg flex flex-wrap items-center gap-sm">
          <TrackedLink
            href={promo.ctaHref}
            event={ctaEvent}
            eventParams={{ location: 'home_promo', promo: promo.title }}
            className="btn-gold"
          >
            {promo.ctaLabel}
          </TrackedLink>
          <TrackedLink
            href={`tel:${PROMO_PHONE_TEL}`}
            event="call_click"
            eventParams={{ location: 'home_promo' }}
            className="btn-quiet tnum"
          >
            <Phone size={16} aria-hidden="true" />
            {t('callWithNumber', { phone: PROMO_PHONE_DISPLAY })}
          </TrackedLink>
          <Link href="/specials" className="link-type">
            {t('viewAllSpecials')} →
          </Link>
        </div>
      </div>
    </section>
  );
}
