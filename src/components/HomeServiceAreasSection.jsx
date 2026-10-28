import { useTranslations } from 'next-intl';
import { salonName } from '@/lib/salon';

export default function HomeServiceAreasSection() {
  const t = useTranslations('home.serviceAreas');
  const name = salonName();
  const rich = { b: (chunks) => <strong className="text-ink">{chunks}</strong>, name };

  return (
    /* Long Document voice: the locality copy is a ranking asset and reads best as
       prose at a 65ch measure. Only the head and the tokens change here. */
    <section
      className="border-b border-rule-soft bg-paper-2 px-4 py-2xl md:py-3xl"
      aria-labelledby="service-areas-heading"
    >
      <div className="mx-auto max-w-3xl">
        <header className="head-hang !pt-0">
          <h2 id="service-areas-heading">{t('heading')}</h2>
          <p>{t('intro', { name })}</p>
        </header>

        <div className="measure space-y-lg text-step-md leading-[1.65] text-ink">
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
