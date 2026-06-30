import { useTranslations } from 'next-intl';
import { salonName } from '@/lib/salon';

export default function HomeServiceAreasSection() {
  const t = useTranslations('home.serviceAreas');
  const name = salonName();
  const rich = { b: (chunks) => <strong className="text-charcoal">{chunks}</strong>, name };

  return (
    <section
      className="border-b border-rose-gold/10 bg-cream-dark/25 px-4 py-14 md:py-20"
      aria-labelledby="service-areas-heading"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="service-areas-heading"
          className="font-display text-3xl text-ink md:text-4xl"
        >
          {t('heading')}
        </h2>
        <p className="mt-3 text-sm text-charcoal md:text-base">
          {t('intro', { name })}
        </p>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-charcoal md:text-lg">
          <p>{t.rich('northPhoenix', rich)}</p>
          <p>{t.rich('glendale', rich)}</p>
          <p>{t.rich('peoria', rich)}</p>
          <p>{t.rich('deerValley', rich)}</p>
          <p>{t.rich('moonValley', rich)}</p>
        </div>
      </div>
    </section>
  );
}
