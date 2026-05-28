import Link from 'next/link';
import { absoluteUrl } from '@/lib/siteUrl';
import { getLocalBusinessJsonLd } from '@/lib/localBusinessJsonLd';

export const metadata = {
  title: 'Gel Nails in Phoenix, AZ | Nice Nails & Spa',
  description:
    'Long-lasting gel manicures in North Phoenix — Nice Nails & Spa. Book gel nails online; walk-ins welcome.',
  alternates: {
    canonical: '/services/gel-nails-phoenix',
  },
};

const FAQ_ITEMS = [
  {
    q: 'How much do gel nails cost in Phoenix AZ?',
    a: 'Gel polish upgrades start at $10 added to any manicure service. Dedicated gel manicures begin at $35. Pricing varies by service tier — see our manicure menu for exact costs on Classic, Deluxe, and Deep options with gel.',
  },
  {
    q: 'How long do gel nails last?',
    a: 'Gel polish typically lasts 2–3 weeks without chipping. Builder gel and gel-x overlays can last longer with proper aftercare. Avoid picking or peeling to get the most out of your wear.',
  },
  {
    q: 'What is the difference between gel and regular polish?',
    a: 'Gel is cured under UV/LED light for a harder, chip-resistant finish that lasts much longer than regular air-dry polish. Regular polish is easier to remove at home; gel removal is best done in the salon to protect the nail.',
  },
  {
    q: 'Can I walk in for gel nails in Phoenix?',
    a: 'Walk-ins are welcome based on station availability. Booking online guarantees your preferred time, especially on evenings and weekends when demand is highest.',
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
  const salon = getLocalBusinessJsonLd();
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Gel Nails Phoenix AZ',
    description:
      'Long-lasting gel manicures and gel polish upgrades in North Phoenix AZ 85021. UV/LED-cured finish available on Classic, Deluxe, and Deep manicure tiers.',
    serviceType: 'Gel Manicure',
    url: absoluteUrl('/services/gel-nails-phoenix'),
    provider: {
      '@type': 'NailSalon',
      name: salon.name,
      ...(salon.url ? { url: salon.url } : {}),
      ...(salon.telephone ? { telephone: salon.telephone } : {}),
      address: salon.address,
    },
    areaServed: [
      { '@type': 'City', name: 'Phoenix' },
      { '@type': 'AdministrativeArea', name: 'North Phoenix' },
    ],
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '35',
      highPrice: '75',
      description: 'Gel manicures from $35; gel polish add-on from $10 on any manicure service.',
    },
  };
}

export default function GelNailsPhoenixPage() {
  const salon = process.env.NEXT_PUBLIC_SALON_NAME || 'Nice Nails & Spa';
  const phone = process.env.NEXT_PUBLIC_SALON_PHONE || '';
  const telHref = phone ? `tel:${phone.replace(/\D/g, '')}` : '#';

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd()) }} />
      <div className="min-h-screen bg-cream pb-24">
        <article className="border-b border-rose-gold/15 bg-gradient-to-b from-cream-dark/90 via-cream to-cream px-4 py-14 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">{salon}</p>
            <h1 className="mt-3 font-display text-4xl tracking-tight text-ink md:text-5xl">
              Gel nails in Phoenix, AZ
            </h1>
            <p className="mt-4 text-base leading-relaxed text-charcoal md:text-lg">
              Durable shine, chip-resistant wear, and polished finishes — our gel manicures and gel-related
              services are performed at our North Phoenix location. Pair with a pedicure or browse our full{' '}
              <Link href="/services" className="font-medium text-rose-gold underline decoration-rose-gold/40">
                services menu
              </Link>
              .
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/booking"
                className="rounded-full bg-charcoal px-8 py-3 text-sm font-semibold text-cream shadow-md transition hover:bg-charcoal/90"
              >
                Book online
              </Link>
              <Link
                href="/services"
                className="rounded-full border-2 border-charcoal/25 px-8 py-3 text-sm font-semibold text-charcoal transition hover:bg-dusty-rose/25"
              >
                All services
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

        <div className="mx-auto max-w-3xl px-4 py-14 text-sm leading-relaxed text-charcoal md:text-base">
          <h2 className="font-display text-2xl text-ink md:text-3xl">Why clients choose gel</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 marker:text-rose-gold">
            <li>Flexible strength and glossy finish that lasts longer than regular polish.</li>
            <li>Ideal before events, travel, or whenever you want low-maintenance color.</li>
            <li>Ask our team about gel manicures, overlays, and combinations with spa services.</li>
          </ul>

          <section className="mt-12" aria-labelledby="gel-faq-heading">
            <h2 id="gel-faq-heading" className="font-display text-2xl text-ink md:text-3xl">
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
