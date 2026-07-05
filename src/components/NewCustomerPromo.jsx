import { getTranslations } from 'next-intl/server';
import { ArrowRight, Phone, Sparkles } from 'lucide-react';
import { PROMO_PHONE_DISPLAY, PROMO_PHONE_TEL } from '@/lib/promos';
import TrackedLink from '@/components/analytics/TrackedLink';
import PromoCountdown from '@/components/PromoCountdown';

/**
 * "New Customer — $5 Off First Visit" promo for /specials + home.
 * Display-only (no form, no coupon code): badges + copy + Book/Call CTAs.
 * The discount is applied in-salon by staff when the customer shows the SMS
 * confirmation they receive after a first-time booking (see backend bookPublic).
 *
 * `showCountdown` (admin toggle, SmsSettings.promoCountdownEnabled) adds a
 * weekly FOMO countdown — see PromoCountdown for the rollover logic.
 */
export default async function NewCustomerPromo({ showCountdown = false }) {
  const t = await getTranslations('specialsPage.newCustomer');

  return (
    <section className="mx-auto max-w-6xl px-4 md:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-rose-gold/40 bg-charcoal px-6 py-10 text-cream shadow-xl shadow-charcoal/30 md:px-12 md:py-12">
        {/* Soft rose-gold glows, decorative only */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-rose-gold/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-12 h-48 w-48 rounded-full bg-rose-gold/15 blur-3xl"
        />
        {/* Oversized "$5" watermark behind the copy */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 top-1/2 hidden -translate-y-1/2 select-none font-display text-[11rem] font-bold leading-none text-rose-gold/10 lg:block"
        >
          $5
        </span>

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                <Sparkles size={12} aria-hidden="true" />
                {t('badgeNew')}
              </span>
              {/* Shine sweep badge — the $5 hook */}
              <span className="relative inline-flex items-center overflow-hidden rounded-full bg-gradient-to-r from-rose-gold to-rose-gold-deep px-4 py-1 text-xs font-extrabold uppercase tracking-wide text-white shadow-md shadow-rose-gold/30">
                {t('badgeOff')}
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-1/3 animate-promo-shine bg-white/40 blur-[2px]"
                />
              </span>
            </div>
            <h2 className="mt-4 font-display text-2xl text-cream md:text-4xl">
              {t('title')}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cream/80 md:text-base">
              {t('body')}
            </p>

            {showCountdown && (
              <PromoCountdown
                labels={{
                  endsIn: t('countdown.endsIn'),
                  days: t('countdown.days'),
                  hours: t('countdown.hours'),
                  mins: t('countdown.mins'),
                  secs: t('countdown.secs'),
                }}
              />
            )}

            <p className="mt-3 text-xs text-cream/55">{t('fine')}</p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col">
            <TrackedLink
              href="/booking"
              event="book_click"
              eventParams={{ location: 'specials_new_customer' }}
              className="inline-flex animate-promo-glow items-center justify-center gap-2 rounded-full bg-rose-gold px-8 py-3.5 text-sm font-bold text-white transition-transform duration-200 hover:scale-[1.04] hover:bg-rose-gold-deep"
            >
              {t('book')}
              <ArrowRight size={16} aria-hidden="true" />
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
