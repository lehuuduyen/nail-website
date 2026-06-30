import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { consolidatedMeta } from '@/lib/i18nMeta';
import { absoluteUrl } from '@/lib/siteUrl';
import { getBusinessRef } from '@/lib/localBusinessJsonLd';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

const PATH = '/services/nail-art-phoenix-az';

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'landing.nailart' });
  const title = t('metaTitle');
  const description = t('metaDesc');
  return {
    title: { absolute: title },
    description,
    openGraph: { title, description, url: absoluteUrl(PATH) },
    ...consolidatedMeta(locale, '/services/nails'),
  };
}

function serviceJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Nail Art & Custom Designs Phoenix AZ',
    description:
      'Custom nail art, rhinestones, French upgrades, ombre, and seasonal designs at Nice Nails & Spa in North Phoenix AZ 85021. Add-on to any manicure or gel service.',
    serviceType: 'Nail Art',
    url: absoluteUrl(PATH),
    provider: getBusinessRef(),
    areaServed: [
      { '@type': 'City', name: 'Phoenix' },
      { '@type': 'AdministrativeArea', name: 'North Phoenix' },
      { '@type': 'City', name: 'Glendale' },
      { '@type': 'City', name: 'Peoria' },
    ],
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '5',
      highPrice: '40',
      description: 'Nail art add-ons from $5 per accent; complex designs priced by complexity.',
    },
  };
}

export default function NailArtPhoenixAzPage({ params: { locale } }) {
  setRequestLocale(locale);
  const t = useTranslations('landing.nailart');
  const tc = useTranslations('landing.common');
  const salon = process.env.NEXT_PUBLIC_SALON_NAME || 'Nice Nails & Spa';
  const phone = process.env.NEXT_PUBLIC_SALON_PHONE || '';
  const telHref = phone ? `tel:${phone.replace(/\D/g, '')}` : '#';

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
      <BreadcrumbJsonLd items={[
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Nail Art & Custom Designs', path: '/services/nails' },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd()) }} />
      <div className="min-h-screen bg-cream pb-24">
        <article className="border-b border-rose-gold/15 bg-gradient-to-b from-cream-dark/90 via-cream to-cream px-4 py-14 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">{salon}</p>
            <h1 className="mt-3 font-display text-4xl tracking-tight text-ink md:text-5xl">
              {t('h1')}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-charcoal md:text-lg">
              {t.rich('intro', {
                menulink: (chunks) => (
                  <Link href="/services" className="font-medium text-rose-gold underline decoration-rose-gold/40">
                    {chunks}
                  </Link>
                ),
                addonlink: (chunks) => (
                  <Link href="/services/addon" className="font-medium text-rose-gold underline decoration-rose-gold/40">
                    {chunks}
                  </Link>
                ),
              })}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/booking"
                className="rounded-full bg-charcoal px-8 py-3 text-sm font-semibold text-cream shadow-md transition hover:bg-charcoal/90"
              >
                {t('ctaBook')}
              </Link>
              <Link
                href="/services/manicure"
                className="rounded-full border-2 border-charcoal/25 px-8 py-3 text-sm font-semibold text-charcoal transition hover:bg-dusty-rose/25"
              >
                {t('ctaMenu')}
              </Link>
              {phone && (
                <a
                  href={telHref}
                  className="rounded-full border-2 border-rose-gold/50 px-8 py-3 text-sm font-semibold text-rose-gold transition hover:bg-rose-gold/10"
                >
                  {tc('call', { phone })}
                </a>
              )}
            </div>
          </div>
        </article>

        <div className="mx-auto max-w-3xl px-4 py-14 text-sm leading-relaxed text-charcoal md:text-base">
          <h2 className="font-display text-2xl text-ink md:text-3xl">{t('whyHeading')}</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 marker:text-rose-gold">
            <li>{t('why1')}</li>
            <li>{t('why2')}</li>
            <li>{t('why3')}</li>
          </ul>

          <section className="mt-12" aria-labelledby="nail-art-faq-heading">
            <h2 id="nail-art-faq-heading" className="font-display text-2xl text-ink md:text-3xl">
              {tc('faqHeading')}
            </h2>
            <ul className="mt-6 space-y-6">
              {faqItems.map(({ q, a }) => (
                <li key={q}>
                  <h3 className="font-semibold text-charcoal">{q}</h3>
                  <p className="mt-2 leading-relaxed">{a}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
