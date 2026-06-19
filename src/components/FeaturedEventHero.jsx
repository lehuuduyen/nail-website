import { Phone } from 'lucide-react';
import Countdown from '@/components/Countdown';
import { formatPromoDates, PROMO_PHONE_DISPLAY, PROMO_PHONE_TEL } from '@/lib/promos';
import TrackedLink from '@/components/analytics/TrackedLink';

/**
 * Big "event" hero for the current featured promo on /specials.
 * Shows a live countdown when promo.showCountdown is true, otherwise the date range as text.
 * Pure promo text is rendered server-side (SEO + no flash); only the ticking clock is client.
 */
export default function FeaturedEventHero({ promo }) {
  if (!promo) return null;

  const isGiftCard = Array.isArray(promo.tiers) && promo.tiers.length > 0;
  const ctaEvent = isGiftCard ? 'giftcard_click' : 'book_click';

  return (
    <section className="px-4 md:px-6">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-charcoal via-charcoal to-[#2e2a28] p-8 text-cream shadow-xl shadow-charcoal/20 ring-1 ring-rose-gold/30 md:p-12">
        <div className="flex flex-wrap items-center gap-3">
          {promo.badge && (
            <span className="rounded-full bg-rose-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
              {promo.badge}
            </span>
          )}
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-cream/60">
            Special Event
          </span>
        </div>

        <h2 className="mt-5 font-display text-4xl leading-tight text-cream md:text-5xl">
          {promo.title}
        </h2>
        <p className="mt-4 max-w-2xl text-cream/85 md:text-lg">{promo.description}</p>

        {Array.isArray(promo.tiers) && promo.tiers.length > 0 && (
          <ul className="mt-7 grid gap-4 sm:grid-cols-2">
            {promo.tiers.map((t, i) => (
              <li
                key={i}
                className={`relative flex items-center justify-between gap-3 rounded-2xl bg-cream px-5 py-4 text-charcoal ${
                  t.bestValue ? 'ring-2 ring-rose-gold' : ''
                }`}
              >
                {t.bestValue && (
                  <span className="absolute -top-2 right-4 rounded-full bg-rose-gold px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                    Best value
                  </span>
                )}
                <span className="text-sm font-medium text-muted">
                  Gift card worth
                  <span className="ml-1 font-display text-xl text-ink">${t.worth}</span>
                </span>
                <span className="text-right">
                  <span className="block text-[10px] font-semibold uppercase tracking-wide text-muted">
                    Only pay
                  </span>
                  <span className="font-display text-2xl text-rose-gold-deep">${t.pay}</span>
                </span>
              </li>
            ))}
          </ul>
        )}

        {promo.details && <p className="mt-4 max-w-2xl text-sm text-cream/60">{promo.details}</p>}

        <div className="mt-8">
          {promo.showCountdown ? (
            <>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-rose-gold">
                Offer ends in
              </p>
              <Countdown endDate={promo.endDate} />
            </>
          ) : (
            <p className="text-sm font-semibold text-rose-gold">
              Valid {formatPromoDates(promo)}
            </p>
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <TrackedLink
            href={promo.ctaHref}
            event={ctaEvent}
            eventParams={{ location: 'event_hero', promo: promo.title }}
            className="inline-flex rounded-full bg-rose-gold px-8 py-3 text-sm font-semibold text-white shadow transition hover:bg-rose-gold-deep"
          >
            {promo.ctaLabel}
          </TrackedLink>
          <TrackedLink
            href={`tel:${PROMO_PHONE_TEL}`}
            event="call_click"
            eventParams={{ location: 'event_hero' }}
            className="inline-flex items-center gap-2 rounded-full border-2 border-cream/30 px-6 py-3 text-sm font-semibold text-cream transition hover:border-rose-gold hover:text-rose-gold"
          >
            <Phone size={16} aria-hidden="true" />
            Call {PROMO_PHONE_DISPLAY}
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
