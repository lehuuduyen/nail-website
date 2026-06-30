import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { consolidatedMeta } from '@/lib/i18nMeta';
import Image from 'next/image';
import { absoluteUrl } from '@/lib/siteUrl';
import { getBusinessRef } from '@/lib/localBusinessJsonLd';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

const PATH = '/services/dip-powder-nails-phoenix';

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'landing.dip' });
  const title = t('metaTitle');
  const description = t('metaDesc');
  return {
    title: { absolute: title },
    description,
    keywords: [
      'dip powder nails Phoenix AZ',
      'dip powder nails North Phoenix',
      'SNS nails Phoenix',
      'dip manicure Phoenix AZ 85021',
      'dip powder vs acrylic Phoenix',
    ],
    openGraph: {
      title,
      description,
      url: absoluteUrl(PATH),
      images: [{ url: '/images/popular-manicure.webp', width: 1200, height: 630, alt: t('ogAlt') }],
    },
    ...consolidatedMeta(locale, '/services/nails'),
  };
}

function serviceJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Dip Powder Nails in North Phoenix AZ',
    description:
      'Dip powder nail services in North Phoenix AZ 85021 — odorless, lightweight, no UV curing. Rich pigment and strong bond with easy soak-off removal at Nice Nails & Spa.',
    serviceType: 'Dip Powder Nails',
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
      lowPrice: '40',
      highPrice: '75',
      description: 'Dip powder sets from $40; design add-ons priced separately.',
    },
  };
}

export default function DipPowderNailsPhoenixPage({ params: { locale } }) {
  setRequestLocale(locale);
  const t = useTranslations('landing.dip');
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
        { name: 'Acrylic & Gel Nails', path: '/services/nails' },
        { name: 'Dip Powder', path: '/services/dip-powder-nails-phoenix' },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd()) }} />

      <div className="min-h-screen bg-cream pb-24">
        <article className="border-b border-rose-gold/15 bg-gradient-to-b from-cream-dark/90 via-cream to-cream px-4 py-14 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
              {salon} · North Phoenix, AZ 85021
            </p>
            <h1 className="mt-3 font-display text-4xl tracking-tight text-ink md:text-5xl">
              {t('h1')}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-charcoal md:text-lg">
              {t.rich('intro', {
                menulink: (chunks) => (
                  <Link href="/services/nails" className="font-medium text-rose-gold underline decoration-rose-gold/40">
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
                href="/services/nails"
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

        <div className="mx-auto max-w-3xl px-4 pt-6 pb-2">
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-rose-gold"
          >
            {tc('viewAllServices')}
          </Link>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-10 text-sm leading-relaxed text-charcoal md:text-base">
          <div className="relative mb-8 aspect-[16/7] w-full overflow-hidden rounded-2xl">
            <Image
              src="/images/popular-manicure.webp"
              alt={t('imageAlt')}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>

          <h2 className="font-display text-2xl text-ink md:text-3xl">{t('whatIsHeading')}</h2>
          <p className="mt-4 leading-relaxed">{t('whatIsBody')}</p>

          <h2 className="mt-10 font-display text-2xl text-ink md:text-3xl">{t('whoHeading')}</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 marker:text-rose-gold">
            <li>{t('who1')}</li>
            <li>{t('who2')}</li>
            <li>{t('who3')}</li>
            <li>{t('who4')}</li>
          </ul>

          <h2 className="mt-10 font-display text-2xl text-ink md:text-3xl">{t('aftercareHeading')}</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 marker:text-rose-gold">
            <li>{t('after1')}</li>
            <li>{t('after2')}</li>
            <li>{t('after3')}</li>
            <li>{t('after4')}</li>
          </ul>

          <section className="mt-12" aria-labelledby="dip-faq-heading">
            <h2 id="dip-faq-heading" className="font-display text-2xl text-ink md:text-3xl">
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

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/booking"
              className="inline-flex rounded-full bg-charcoal px-6 py-2.5 text-sm font-semibold text-cream hover:bg-charcoal/90"
            >
              {t('ctaBook')}
            </Link>
            <Link
              href="/services/nails"
              className="inline-flex rounded-full border-2 border-rose-gold/30 px-6 py-2.5 text-sm font-semibold text-charcoal hover:bg-dusty-rose/20"
            >
              {t('viewMenuArrow')}
            </Link>
            <Link
              href="/services/gel-x-nails-phoenix"
              className="inline-flex rounded-full border-2 border-charcoal/20 px-6 py-2.5 text-sm font-semibold text-charcoal hover:border-rose-gold/40"
            >
              {t('compareGelx')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
