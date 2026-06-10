import Link from 'next/link';
import { absoluteUrl } from '@/lib/siteUrl';
import { getBusinessRef } from '@/lib/localBusinessJsonLd';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

const TITLE = 'Acrylic Nails Phoenix AZ | Full Sets & Fills | Nice Nails & Spa';
const DESCRIPTION =
  'Acrylic full sets, fill-ins & nail enhancements in North Phoenix AZ 85021. Experienced techs, clear pricing—book acrylic nails online at Nice Nails & Spa.';

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/services/nails' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl('/services/acrylic-nails-phoenix-az'),
  },
};

const FAQ_ITEMS = [
  {
    q: 'How much do acrylic nails cost in Phoenix AZ?',
    a: 'Acrylic full sets at Nice Nails & Spa start at $40 (regular polish) or $50 with gel finish. Pink-and-white, ombré, and sculpted designs are priced higher. Fills start at $35 (regular) or $45 with gel. See our acrylic & gel nails menu for current pricing on every option.',
  },
  {
    q: 'How long does an acrylic full set take?',
    a: 'A standard acrylic full set takes about 60–90 minutes. Longer shapes, detailed nail art, or adding gel color may require extra time — let us know your design when booking so we can reserve the right slot.',
  },
  {
    q: 'How often do acrylic nails need a fill?',
    a: 'Most clients return every 2–3 weeks for a fill as the natural nail grows. Waiting longer than three weeks can affect adhesion and may require a full new set instead of a fill.',
  },
  {
    q: 'Can I walk in for acrylic nails in Phoenix?',
    a: 'Walk-ins are welcome when we have an open station, but acrylic services — especially full sets with art or long shapes — are best booked ahead to ensure enough time. Book online or call to confirm same-day availability.',
  },
];

function faqPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

function serviceJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Acrylic Nails Phoenix AZ',
    description:
      'Acrylic nail full sets, fills, and enhancements in North Phoenix AZ 85021. Pink-and-white, sculpted tips, nail art, and gel color add-ons available.',
    serviceType: 'Acrylic Nail Enhancement',
    url: absoluteUrl('/services/acrylic-nails-phoenix-az'),
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

export default function AcrylicNailsPhoenixAzPage() {
  const salon = process.env.NEXT_PUBLIC_SALON_NAME || 'Nice Nails & Spa';
  const phone = process.env.NEXT_PUBLIC_SALON_PHONE || '';
  const telHref = phone ? `tel:${phone.replace(/\D/g, '')}` : '#';

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Acrylic & Gel Nails', path: '/services/nails' },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd()) }} />
      <div className="min-h-screen bg-cream pb-24">
        <article className="border-b border-rose-gold/15 bg-gradient-to-b from-cream-dark/90 via-cream to-cream px-4 py-14 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">{salon}</p>
            <h1 className="mt-3 font-display text-4xl tracking-tight text-ink md:text-5xl">
              Acrylic nails in Phoenix, AZ
            </h1>
            <p className="mt-4 text-base leading-relaxed text-charcoal md:text-lg">
              Sculpted length, classic pink-and-white, and dependable fill schedules for busy Valley clients.
              See every enhancement we offer on the{' '}
              <Link href="/services/nails" className="font-medium text-rose-gold underline decoration-rose-gold/40">
                acrylic &amp; gel nails
              </Link>{' '}
              menu, then book the service that matches your shape and lifestyle.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/booking"
                className="rounded-full bg-charcoal px-8 py-3 text-sm font-semibold text-cream shadow-md transition hover:bg-charcoal/90"
              >
                Book acrylic nails
              </Link>
              <Link
                href="/services/nails"
                className="rounded-full border-2 border-charcoal/25 px-8 py-3 text-sm font-semibold text-charcoal transition hover:bg-dusty-rose/25"
              >
                View nail menu
              </Link>
              {phone && (
                <a
                  href={telHref}
                  className="rounded-full border-2 border-rose-gold/50 px-8 py-3 text-sm font-semibold text-rose-gold transition hover:bg-rose-gold/10"
                >
                  Call {phone}
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
            ← View all services
          </Link>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-14 text-sm leading-relaxed text-charcoal md:text-base">
          <h2 className="font-display text-2xl text-ink md:text-3xl">Why guests choose acrylic here</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 marker:text-rose-gold">
            <li>Customizable length and shape with fills every two to three weeks for most clients.</li>
            <li>Repairs and rebalance appointments when life happens—text or call for quick guidance.</li>
            <li>Add gel color or nail art; ask how timing changes when you stack services.</li>
          </ul>

          <section className="mt-12" aria-labelledby="acrylic-faq-heading">
            <h2 id="acrylic-faq-heading" className="font-display text-2xl text-ink md:text-3xl">
              Frequently asked questions
            </h2>
            <ul className="mt-6 space-y-6">
              {FAQ_ITEMS.map(({ q, a }) => (
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
