import { useTranslations } from 'next-intl';
import { salonName, salonAddress } from '@/lib/salon';

export default function HomeAboutSection() {
  const t = useTranslations('home.about');
  const name = salonName();
  const address = salonAddress();
  const rich = { b: (chunks) => <strong>{chunks}</strong>, name, address };

  return (
    /* Long Document voice inside the marketing page: single column, 65ch measure,
       1.65 leading, negative space as the divider (design.md § Macrostructure
       families). Already left-aligned before the redesign — this only moves it
       onto the tokens and the measure. */
    <section
      id="about"
      className="scroll-mt-24 border-b border-rule-soft bg-paper px-4 py-2xl md:py-3xl"
      aria-labelledby="home-about-heading"
    >
      <div className="mx-auto max-w-3xl">
        <header className="head-hang !pt-0">
          <h2 id="home-about-heading">{t('heading', { name })}</h2>
        </header>
        <div className="measure space-y-lg text-step-md leading-[1.65] text-ink">
          <p>{t.rich('p1', rich)}</p>
          <p>{t.rich('p2', rich)}</p>
          <p>{t.rich('p3', rich)}</p>
        </div>
      </div>
    </section>
  );
}
