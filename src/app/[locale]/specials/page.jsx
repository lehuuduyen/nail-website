import { Link } from '@/i18n/navigation';
import { Phone } from 'lucide-react';
import {
  filterLivePromos,
  formatPromoDates,
  PROMO_PHONE_DISPLAY,
  PROMO_PHONE_TEL,
} from '@/lib/promos';
import { getPromos } from '@/lib/serverPromos';
import { getNewCustomerOfferEnabled } from '@/lib/serverSettings';
import { salonAddress } from '@/lib/salon';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { translatedMeta, ogLocale } from '@/lib/i18nMeta';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import FeaturedEventHero from '@/components/FeaturedEventHero';
import NewCustomerPromo from '@/components/NewCustomerPromo';
import SpecialsOfferJsonLd from '@/components/SpecialsOfferJsonLd';
import TrackedLink from '@/components/analytics/TrackedLink';
import TrackView from '@/components/analytics/TrackView';

// Re-evaluate hourly so expired promos drop without a rebuild.
export const revalidate = 3600;

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('specials.title'),
    description: t('specials.description'),
    openGraph: {
      title: t('specials.title'),
      description: t('specials.description'),
      type: 'website',
      ...ogLocale(locale),
    },
    ...translatedMeta(locale, '/specials'),
  };
}

function PromoCard({ promo }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border-2 border-rose-gold/25 bg-surface p-6 shadow-sm shadow-rose-gold/5">
      <div className="flex flex-wrap items-center gap-2">
        {promo.badge && (
          <span className="rounded-full bg-rose-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
            {promo.badge}
          </span>
        )}
        <span className="text-xs font-medium text-muted">{formatPromoDates(promo)}</span>
      </div>
      <h2 className="mt-3 font-display text-2xl text-ink">{promo.title}</h2>
      <p className="mt-2 text-charcoal">{promo.description}</p>
      {promo.details && <p className="mt-2 text-sm text-muted">{promo.details}</p>}
      <div className="mt-auto flex flex-wrap gap-3 pt-6">
        <TrackedLink
          href={promo.ctaHref}
          event={
            Array.isArray(promo.tiers) && promo.tiers.length > 0
              ? 'giftcard_click'
              : 'book_click'
          }
          eventParams={{ location: 'specials_card', promo: promo.title }}
          className="inline-flex rounded-full bg-rose-gold px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-gold-deep"
        >
          {promo.ctaLabel}
        </TrackedLink>
        <TrackedLink
          href={`tel:${PROMO_PHONE_TEL}`}
          event="call_click"
          eventParams={{ location: 'specials_card' }}
          className="inline-flex items-center gap-2 rounded-full border-2 border-charcoal/20 px-5 py-2.5 text-sm font-semibold text-charcoal transition hover:border-rose-gold/50"
        >
          <Phone size={16} aria-hidden="true" />
          Call
        </TrackedLink>
      </div>
    </article>
  );
}

export default async function SpecialsPage({ params: { locale } }) {
  setRequestLocale(locale);
  const t = await getTranslations('specialsPage');
  const promos = filterLivePromos(await getPromos());
  const newCustomerOfferOn = await getNewCustomerOfferEnabled();
  const featured = promos[0] || null;
  const rest = promos.slice(1);
  const address = salonAddress();

  return (
    <>
      <TrackView event="specials_view" />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Specials', path: '/specials' },
        ]}
      />

      <section className="border-b border-rose-gold/15 bg-gradient-to-b from-cream-dark/90 via-cream to-cream px-4 py-14 text-center md:py-16">
        <nav className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          <Link href="/" className="hover:text-rose-gold">
            {t('breadcrumbHome')}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-charcoal">{t('breadcrumbSpecials')}</span>
        </nav>
        <h1 className="font-display text-4xl text-ink md:text-5xl">
          {t('h1')}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-charcoal md:text-base">
          {t('intro')}
        </p>
      </section>

      {/* New-customer offer — toggled from admin SMS Settings, separate from gift card promos */}
      {newCustomerOfferOn && (
        <>
          <SpecialsOfferJsonLd
            name={t('newCustomer.title')}
            description={t('newCustomer.body')}
          />
          <div className="pt-12 md:pt-16">
            <NewCustomerPromo />
          </div>
        </>
      )}

      {promos.length > 0 ? (
        <div className="py-12 md:py-16">
          <FeaturedEventHero promo={featured} />
          {rest.length > 0 && (
            <div className="mx-auto mt-14 max-w-6xl px-4 md:px-6">
              <h2 className="font-display text-2xl text-ink">{t('moreOffers')}</h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {rest.map((p) => (
                  <PromoCard key={p.id} promo={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <div className="mx-auto max-w-xl rounded-2xl border border-rose-gold/20 bg-surface p-8 text-center">
            <h2 className="font-display text-2xl text-ink">{t('noneTitle')}</h2>
            <p className="mt-3 text-charcoal">
              {t('noneBody')}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <TrackedLink
                href="/booking"
                event="book_click"
                eventParams={{ location: 'specials_empty' }}
                className="inline-flex rounded-full bg-rose-gold px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-gold-deep"
              >
                {t('bookOnline')}
              </TrackedLink>
              <TrackedLink
                href={`tel:${PROMO_PHONE_TEL}`}
                event="call_click"
                eventParams={{ location: 'specials_empty' }}
                className="inline-flex items-center gap-2 rounded-full border-2 border-charcoal/20 px-5 py-2.5 text-sm font-semibold text-charcoal transition hover:border-rose-gold/50"
              >
                <Phone size={16} aria-hidden="true" />
                {t('call', { phone: PROMO_PHONE_DISPLAY })}
              </TrackedLink>
            </div>
          </div>
        </div>
      )}

      {/* NAP + intent text for local SEO */}
      <div className="mx-auto max-w-6xl px-4 pb-12 md:px-6 md:pb-16">
        <section className="rounded-2xl border border-rose-gold/15 bg-surface/70 p-6 md:p-10">
          <h2 className="font-display text-2xl text-ink">{t('seoH2')}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-charcoal">
            {t('seoBody')}
          </p>
          <div className="mt-6 flex flex-col gap-2 text-sm text-charcoal">
            <p>
              <span className="font-semibold text-ink">{t('addressLabel')}</span> {address}
            </p>
            <p>
              <span className="font-semibold text-ink">{t('phoneLabel')}</span>{' '}
              <TrackedLink
                href={`tel:${PROMO_PHONE_TEL}`}
                event="call_click"
                eventParams={{ location: 'specials_nap' }}
                className="text-rose-gold hover:underline"
              >
                {PROMO_PHONE_DISPLAY}
              </TrackedLink>
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <TrackedLink
              href="/booking"
              event="book_click"
              eventParams={{ location: 'specials_nap' }}
              className="inline-flex rounded-full bg-charcoal px-6 py-2.5 text-sm font-semibold text-cream transition hover:bg-charcoal/90"
            >
              {t('bookAppointment')}
            </TrackedLink>
            <TrackedLink
              href={`tel:${PROMO_PHONE_TEL}`}
              event="call_click"
              eventParams={{ location: 'specials_nap' }}
              className="inline-flex items-center gap-2 rounded-full border-2 border-charcoal/20 px-5 py-2.5 text-sm font-semibold text-charcoal transition hover:border-rose-gold/50"
            >
              <Phone size={16} aria-hidden="true" />
              Call {PROMO_PHONE_DISPLAY}
            </TrackedLink>
          </div>
        </section>
      </div>
    </>
  );
}
