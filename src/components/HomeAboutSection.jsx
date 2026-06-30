import { useTranslations } from 'next-intl';
import { salonName, salonAddress } from '@/lib/salon';

export default function HomeAboutSection() {
  const t = useTranslations('home.about');
  const name = salonName();
  const address = salonAddress();
  const rich = { b: (chunks) => <strong>{chunks}</strong>, name, address };

  return (
    <section
      id="about"
      className="scroll-mt-24 border-b border-rose-gold/10 bg-cream px-4 py-14 md:py-20"
      aria-labelledby="home-about-heading"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="home-about-heading"
          className="font-display text-3xl text-ink md:text-4xl"
        >
          {t('heading', { name })}
        </h2>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-charcoal md:text-lg">
          <p>{t.rich('p1', rich)}</p>
          <p>{t.rich('p2', rich)}</p>
          <p>{t.rich('p3', rich)}</p>
        </div>
      </div>
    </section>
  );
}
