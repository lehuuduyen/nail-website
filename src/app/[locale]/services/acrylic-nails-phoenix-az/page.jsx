import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { consolidatedMeta } from '@/lib/i18nMeta';
import { absoluteUrl } from '@/lib/siteUrl';
import { getBusinessRef } from '@/lib/localBusinessJsonLd';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

const PATH = '/services/acrylic-nails-phoenix-az';

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'landing.acrylic' });
  const title = t('metaTitle');
  const description = t('metaDesc');
  return {
    title: { absolute: title },
    description,
    openGraph: { title, description, url: absoluteUrl(PATH) },
    // Trang keyword → gộp tín hiệu về /services/nails (canonical theo locale), không hreflang/sitemap riêng.
    ...consolidatedMeta(locale, '/services/nails'),
  };
}

/** JSON-LD Service giữ tiếng Anh (metadata cho search engine, chứa tên/giá dịch vụ — không dịch). */
function serviceJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Acrylic Nails Phoenix AZ',
    description:
      'Acrylic nail full sets, fills, and enhancements in North Phoenix AZ 85021. Pink-and-white, sculpted tips, nail art, and gel color add-ons available.',
    serviceType: 'Acrylic Nail Enhancement',
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
      lowPrice: '35',
      highPrice: '120',
      description: 'Full sets from $40 (regular) or $50 with gel; fills from $35 (regular) or $45 with gel; nail art priced separately.',
    },
  };
}

export default function AcrylicNailsPhoenixAzPage({ params: { locale } }) {
  setRequestLocale(locale);
  const t = useTranslations('landing.acrylic');
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

        <div className="mx-auto max-w-3xl px-4 py-14 text-sm leading-relaxed text-charcoal md:text-base">
          <h2 className="font-display text-2xl text-ink md:text-3xl">{t('whyHeading')}</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 marker:text-rose-gold">
            <li>{t('why1')}</li>
            <li>{t('why2')}</li>
            <li>{t('why3')}</li>
          </ul>

          <section className="mt-12" aria-labelledby="acrylic-faq-heading">
            <h2 id="acrylic-faq-heading" className="font-display text-2xl text-ink md:text-3xl">
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
