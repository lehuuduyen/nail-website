import { getTranslations } from 'next-intl/server';
import { ArrowRight, Phone } from 'lucide-react';
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
 * daily FOMO countdown — see PromoCountdown for the rollover logic.
 *
 * This block carried the most banned patterns on the site. Removed:
 * - Two blurred rose-gold orbs floating behind the copy. anti-patterns.md lists
 *   "floating-orb decoration" as critical: ambient blurred circles added for
 *   depth, with no semantic role.
 * - `shadow-xl shadow-charcoal/30` on a dark card, which renders as a halo —
 *   on dark surfaces elevation comes from lightness, not shadow.
 * - `animate-promo-shine` (an infinite white sweep) and `animate-promo-glow` (an
 *   infinite box-shadow pulse). Both were infinite loops, the second animated a
 *   paint property, and together they were two more motion primitives.
 * - `hover:scale-[1.04]` on the CTA — the universal hover:scale tell, and it was
 *   firing alongside a background change. One signal per element.
 * - A two-stop gradient pill and two white-on-vein labels at 3.08:1.
 *
 * Kept: the oversized "$5" watermark. That is a decorative-numeral polish
 * pattern (HP4) — structural typography, not ambience, and it is the hook.
 */
export default async function NewCustomerPromo({ showCountdown = false }) {
  const t = await getTranslations('specialsPage.newCustomer');

  return (
    <section className="mx-auto max-w-6xl px-4 md:px-6">
      <div className="band-dark relative overflow-hidden rounded-card border border-rule-dark px-lg py-2xl md:px-2xl">
        {/* HP4 decorative numeral — the offer, set as display type behind the copy */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 top-1/2 hidden -translate-y-1/2 select-none font-display text-[11rem] font-bold leading-none text-gold/10 lg:block"
        >
          $5
        </span>

        <div className="relative flex flex-col gap-lg md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-xs">
              <span className="rounded-pill border border-gold px-sm py-1 text-step-xs font-bold uppercase tracking-[0.12em] text-gold">
                {t('badgeNew')}
              </span>
              {/* The $5 hook: solid gold, ink label, 5.34:1 — no sweep, no gradient */}
              <span className="rounded-pill bg-gold px-md py-1 text-step-xs font-extrabold uppercase tracking-[0.12em] text-ink">
                {t('badgeOff')}
              </span>
            </div>

            <h2 className="mt-md font-display text-step-2xl text-on-dark md:text-step-3xl">
              {t('title')}
            </h2>
            <p className="measure mt-sm text-step-md leading-relaxed text-on-dark-2">
              {t('body')}
            </p>

            {showCountdown && (
              <PromoCountdown
                labels={{
                  endsIn: t('countdown.endsIn'),
                  note: t('countdown.note'),
                  hours: t('countdown.hours'),
                  mins: t('countdown.mins'),
                  secs: t('countdown.secs'),
                }}
              />
            )}

            <p className="mt-sm text-step-xs text-on-dark-2">{t('fine')}</p>
          </div>

          <div className="flex shrink-0 flex-col gap-sm sm:flex-row md:flex-col">
            <TrackedLink
              href="/booking"
              event="book_click"
              eventParams={{ location: 'specials_new_customer' }}
              className="btn-gold"
            >
              {t('book')}
              <ArrowRight size={16} className="ml-2xs" aria-hidden="true" />
            </TrackedLink>
            <TrackedLink
              href={`tel:${PROMO_PHONE_TEL}`}
              event="call_click"
              eventParams={{ location: 'specials_new_customer' }}
              className="btn-quiet tnum border-gold-pale/60 text-on-dark"
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
