import { Suspense } from 'react';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Sparkles } from 'lucide-react';
import BookingForm from '@/components/BookingForm';
import PromoCountdown from '@/components/PromoCountdown';
import { getNewCustomerOffer } from '@/lib/serverSettings';

export default async function BookingPage({ params: { locale } }) {
  setRequestLocale(locale);
  const t = await getTranslations('booking');
  const tc = await getTranslations('specialsPage.newCustomer.countdown');
  const { enabled: newCustomerOfferOn, countdownEnabled } = await getNewCustomerOffer();
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-cream to-cream-dark/30">
      <section className="border-b border-rose-gold/15 bg-surface/85 px-4 py-10 text-center backdrop-blur-md">
        <h1 className="font-display text-3xl text-ink md:text-4xl">{t('pageTitle')}</h1>
        <p className="mt-2 text-sm text-charcoal">{t('pageSubtitle')}</p>

        {/* New-customer $5 off callout — toggled from admin SMS Settings */}
        {newCustomerOfferOn && (
        <div className="mx-auto mt-5 flex max-w-xl items-start gap-3 rounded-2xl border border-rose-gold/30 bg-rose-gold/8 px-4 py-3 text-left">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-gold/15 text-rose-gold">
            <Sparkles size={15} aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink">
              {t('newCustomerCallout.badge')} · {t('newCustomerCallout.title')}
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-charcoal">
              {t('newCustomerCallout.body')}
            </p>
            {countdownEnabled && (
              <PromoCountdown
                variant="light"
                compact
                labels={{
                  endsIn: tc('endsIn'),
                  days: tc('days'),
                  hours: tc('hours'),
                  mins: tc('mins'),
                  secs: tc('secs'),
                }}
              />
            )}
          </div>
        </div>
        )}
      </section>
      <Suspense
        fallback={<p className="py-20 text-center text-muted">{t('loading')}</p>}
      >
        <BookingForm />
      </Suspense>
    </div>
  );
}
