import { getTranslations } from 'next-intl/server';
import { Phone, Sparkles } from 'lucide-react';
import { PROMO_PHONE_DISPLAY, PROMO_PHONE_TEL } from '@/lib/promos';
import TrackedLink from '@/components/analytics/TrackedLink';

/**
 * Static "New Customer — $5 Off First Visit" promo for /specials.
 * Display-only (no form, no coupon code): badges + copy + Book/Call CTAs.
 * The discount is applied in-salon by staff when the customer shows the SMS
 * confirmation they receive after a first-time booking (see backend bookPublic).
 */
export default async function NewCustomerPromo() {
  const t = await getTranslations('specialsPage.newCustomer');

  return (
    <section className="mx-auto max-w-6xl px-4 md:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-rose-gold/30 bg-charcoal px-6 py-10 text-cream shadow-lg shadow-charcoal/20 md:px-12 md:py-12">
        {/* Soft rose-gold glow, decorative only */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-rose-gold/20 blur-3xl"
        />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                <Sparkles size={12} aria-hidden="true" />
                {t('badgeNew')}
              </span>
              <span className="rounded-full border border-rose-gold/60 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-rose-gold">
                {t('badgeOff')}
              </span>
            </div>
            <h2 className="mt-4 font-display text-2xl text-cream md:text-3xl">
              {t('title')}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cream/80 md:text-base">
              {t('body')}
            </p>
            <p className="mt-3 text-xs text-cream/55">{t('fine')}</p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col">
            <TrackedLink
              href="/booking"
              event="book_click"
              eventParams={{ location: 'specials_new_customer' }}
              className="inline-flex items-center justify-center rounded-full bg-rose-gold px-7 py-3 text-sm font-semibold text-white transition hover:bg-rose-gold-deep"
            >
              {t('book')}
            </TrackedLink>
            <TrackedLink
              href={`tel:${PROMO_PHONE_TEL}`}
              event="call_click"
              eventParams={{ location: 'specials_new_customer' }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 px-6 py-3 text-sm font-semibold text-cream transition hover:border-rose-gold/60 hover:text-rose-gold"
            >
              <Phone size={16} aria-hidden="true" />
              {t('call')} {PROMO_PHONE_DISPLAY}
            </TrackedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
