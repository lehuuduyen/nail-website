import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

/**
 * 404 localized — render trong [locale]/layout (đã có Navbar/Footer + provider).
 * Style bám token site (cream/rose-gold).
 */
export default function LocaleNotFound() {
  const t = useTranslations('notFound');
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-28 text-center">
      <p className="font-display text-6xl text-rose-gold">404</p>
      <h1 className="mt-4 font-display text-3xl text-ink md:text-4xl">{t('title')}</h1>
      <p className="mt-3 text-charcoal">{t('description')}</p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-rose-gold px-7 py-3 text-sm font-semibold text-white shadow transition hover:bg-rose-gold-deep"
      >
        {t('backHome')}
      </Link>
    </section>
  );
}
