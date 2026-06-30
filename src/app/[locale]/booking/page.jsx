import { Suspense } from 'react';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import BookingForm from '@/components/BookingForm';

export default async function BookingPage({ params: { locale } }) {
  setRequestLocale(locale);
  const t = await getTranslations('booking');
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-cream to-cream-dark/30">
      <section className="border-b border-rose-gold/15 bg-surface/85 px-4 py-10 text-center backdrop-blur-md">
        <h1 className="font-display text-3xl text-ink md:text-4xl">{t('pageTitle')}</h1>
        <p className="mt-2 text-sm text-charcoal">{t('pageSubtitle')}</p>
      </section>
      <Suspense
        fallback={<p className="py-20 text-center text-muted">{t('loading')}</p>}
      >
        <BookingForm />
      </Suspense>
    </div>
  );
}
