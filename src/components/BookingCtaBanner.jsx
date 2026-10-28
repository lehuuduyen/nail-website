import { useTranslations } from 'next-intl';
import { salonArea } from '@/lib/salon';
import TrackedLink from '@/components/analytics/TrackedLink';

export default function BookingCtaBanner() {
  const t = useTranslations('cta');
  const area = salonArea();
  return (
    /* C4-style closing strip, one button (design.md § CTA voice).
       Was white copy on the dusty→vein gradient: 3.08:1 on the subheading, a
       WCAG fail on the band whose only job is to convert. On the dark band the
       same copy reads at 14.54:1, and the gold CTA carries its ink label at
       5.34:1. Left-aligned to match the page's rhythm — a centred head + centred
       line + centred button was three centred elements in a row. */
    <section className="band-dark py-2xl md:py-3xl">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <h2 className="font-display text-step-2xl text-on-dark md:text-step-3xl">{t('heading')}</h2>
        <p className="measure mt-sm text-step-md text-on-dark-2">{t('subheading', { area })}</p>
        <TrackedLink
          href="/booking"
          event="book_click"
          eventParams={{ location: 'cta_banner' }}
          className="btn-gold mt-xl"
        >
          {t('button')}
        </TrackedLink>
      </div>
    </section>
  );
}
