import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { partialTranslatedMeta } from '@/lib/i18nMeta';
import {
  CATEGORIES,
  servicesInCategory,
  mergeGelPairs,
  relatedServices,
  CATEGORY_NAV,
} from '@/data/services';
import ServiceCard from '@/components/ServiceCard';
import RelatedArticles from '@/components/RelatedArticles';
import ServiceSchema from '@/components/ServiceSchema';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { nailsPrimaryServiceJsonLd } from '@/components/NailsSeoSchemas';
import { absoluteUrl } from '@/lib/siteUrl';
import { getSalonServices } from '@/lib/serverServices';

const CATEGORY = 'nails';
const PATH = '/services/nails';

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'category.nails' });
  const title = t('metaTitle');
  const description = t('metaDesc');
  return {
    title: { absolute: title },
    description,
    keywords: [
      'uñas acrílicas Phoenix AZ',
      'uñas de gel Phoenix',
      'uñas de dip powder North Phoenix',
      'extensiones de uñas Phoenix AZ 85021',
      'salón de uñas North Phoenix',
      'uñas ombré Phoenix',
    ],
    openGraph: { title, description, url: absoluteUrl(PATH) },
    // Đã dịch en + es (vi noindex). hreflang en/es.
    ...partialTranslatedMeta(locale, PATH, ['en', 'es']),
  };
}

export default async function NailsServicesPage({ params: { locale } }) {
  setRequestLocale(locale);
  const t = await getTranslations('category.nails');
  const tc = await getTranslations('category.common');
  const services = await getSalonServices();
  const cat = CATEGORIES[CATEGORY];
  const list = servicesInCategory(services, CATEGORY);
  const related = relatedServices(services, CATEGORY, 3);

  const faqItems = [1, 2, 3, 4].map((n) => ({ q: t(`faq.q${n}`), a: t(`faq.a${n}`) }));
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <ServiceSchema services={list} />
      <BreadcrumbJsonLd items={[
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: cat.label, path: `/services/${CATEGORY}` },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(nailsPrimaryServiceJsonLd()) }} />
      <div className="min-h-screen bg-cream pb-24">
        <section className="border-b border-rose-gold/15 bg-gradient-to-b from-cream-dark/90 via-cream to-cream px-4 py-12 md:py-16">
          <div className="mx-auto max-w-4xl">
            <nav className="text-xs font-medium text-muted" aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1">
                <li>
                  <Link href="/" className="hover:text-rose-gold">
                    {tc('home')}
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/services" className="hover:text-rose-gold">
                    {tc('services')}
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-charcoal">{cat.label}</li>
              </ol>
            </nav>
            <p className="mt-4 text-3xl" aria-hidden>
              {cat.emoji}
            </p>
            <h1 className="mt-2 font-display text-4xl text-ink md:text-5xl">
              {t('h1')}
            </h1>
            <p className="mt-2 text-sm font-semibold text-rose-gold">
              {t('priceLine')}
            </p>
            <nav
              className="mt-6 flex flex-wrap gap-3 text-sm font-semibold"
              aria-label="Nails page shortcuts"
            >
              <Link
                href="/services"
                className="rounded-full border-2 border-charcoal/20 px-4 py-2 text-charcoal transition hover:border-rose-gold/40"
              >
                {tc('viewAllServices')}
              </Link>
              <Link
                href="/booking"
                className="rounded-full bg-charcoal px-4 py-2 text-cream transition hover:bg-charcoal/90"
              >
                {tc('bookAppointment')}
              </Link>
              <Link
                href="/services/addon"
                className="rounded-full border-2 border-rose-gold/35 bg-surface-soft px-4 py-2 text-charcoal transition hover:bg-cream-dark/40"
              >
                {t('addonsExtras')}
              </Link>
              <Link
                href="/services/gel-x-nails-phoenix"
                className="rounded-full border-2 border-rose-gold/35 bg-surface-soft px-4 py-2 text-charcoal transition hover:bg-cream-dark/40"
              >
                {t('gelxGuide')}
              </Link>
              <Link
                href="/services/dip-powder-nails-phoenix"
                className="rounded-full border-2 border-rose-gold/35 bg-surface-soft px-4 py-2 text-charcoal transition hover:bg-cream-dark/40"
              >
                {t('dipGuide')}
              </Link>
            </nav>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
          <p className="text-base leading-relaxed text-charcoal md:text-lg">
            {t('intro')}
          </p>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-12 md:px-6">
          <section
            className="rounded-2xl border border-rose-gold/20 bg-surface/90 p-6 shadow-sm shadow-rose-gold/5 backdrop-blur-sm md:p-10"
            aria-labelledby="nails-compare-heading"
          >
            <h2
              id="nails-compare-heading"
              className="font-display text-2xl text-ink md:text-3xl"
            >
              {t('compareHeading')}
            </h2>
            <p className="mt-2 text-sm text-charcoal">
              {t('compareSubtitle')}
            </p>
            <div className="mt-8 space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-charcoal">{t('acrylicH3')}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal">{t('acrylicBody')}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-charcoal">{t('gelH3')}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal">{t('gelBody')}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-charcoal">{t('dipH3')}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal">{t('dipBody')}</p>
              </div>
            </div>
          </section>
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-12 md:px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {mergeGelPairs(list).map(({ service, gel }) => (
              <ServiceCard key={service.id} service={service} gel={gel} />
            ))}
          </div>

          <section className="mt-16 rounded-2xl border border-rose-gold/20 bg-surface/90 p-6 shadow-sm shadow-rose-gold/5 backdrop-blur-sm md:p-10">
            <h2 className="font-display text-2xl text-ink">{tc('faqHeading')}</h2>
            <ul className="mt-6 space-y-6">
              {faqItems.map((f) => (
                <li key={f.q}>
                  <h3 className="font-semibold text-charcoal">{f.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal">{f.a}</p>
                </li>
              ))}
            </ul>
          </section>

          <RelatedArticles category={CATEGORY} />

          <section className="mt-16">
            <h2 className="font-display text-2xl text-ink">{t('alsoLike')}</h2>
            <p className="mt-1 text-sm text-muted">{t('alsoLikeSub')}</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <ServiceCard key={s.id} service={s} compact showBookButton />
              ))}
            </div>
          </section>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/services"
              className="inline-flex rounded-full border-2 border-charcoal/20 px-6 py-2.5 text-sm font-semibold text-charcoal hover:border-rose-gold/40"
            >
              {tc('viewAllServicesArrow')}
            </Link>
            <Link
              href="/booking"
              className="inline-flex rounded-full bg-charcoal px-6 py-2.5 text-sm font-semibold text-cream hover:bg-charcoal/90"
            >
              {tc('bookAppointment')}
            </Link>
            <Link
              href="/services/addon"
              className="inline-flex rounded-full border-2 border-rose-gold/30 px-6 py-2.5 text-sm font-semibold text-charcoal hover:bg-dusty-rose/20"
            >
              {t('browseAddons')}
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-2 text-xs text-muted">
            {CATEGORY_NAV.filter((c) => c.key !== CATEGORY).map((c) => (
              <Link
                key={c.key}
                href={`/services/${c.key}`}
                className="rounded-full bg-surface-soft px-3 py-1 ring-1 ring-rose-gold/25 hover:bg-cream-dark/40"
              >
                {c.navLabel}
              </Link>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
