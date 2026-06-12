import Link from 'next/link';
import Image from 'next/image';
import { absoluteUrl } from '@/lib/siteUrl';
import { getBusinessRef } from '@/lib/localBusinessJsonLd';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

const TITLE = 'Dip Powder Nails in North Phoenix, AZ 85021 | Nice Nails & Spa';
const DESCRIPTION =
  'Dip powder manicures in North Phoenix AZ 85021 — odorless, lightweight, durable color without UV curing. Full sets from $40. Book at Nice Nails & Spa.';

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/services/nails' },
  keywords: [
    'dip powder nails Phoenix AZ',
    'dip powder nails North Phoenix',
    'SNS nails Phoenix',
    'dip manicure Phoenix AZ 85021',
    'dip powder vs acrylic Phoenix',
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl('/services/dip-powder-nails-phoenix'),
    images: [
      {
        url: '/images/popular-manicure.webp',
        width: 1200,
        height: 630,
        alt: 'Dip powder nails — Nice Nails & Spa North Phoenix AZ',
      },
    ],
  },
};

const FAQ_ITEMS = [
  {
    q: 'How long does dip powder last?',
    a: 'Dip powder typically lasts three to four weeks — often longer than regular gel polish — because the layered powder creates a hard, durable bond. Daily cuticle oil and avoiding excessive water or chemical exposure helps maximize wear time.',
  },
  {
    q: 'Is dip powder better than acrylic nails?',
    a: 'It depends on what you are looking for. Dip powder is odorless, does not require UV curing, and is often described as lighter on the nail than traditional acrylic sculpting. Acrylic is more versatile for dramatic length and sculpted shapes. Both are durable; our technicians will recommend the best option based on your nails and lifestyle.',
  },
  {
    q: 'How much does dip powder cost in Phoenix AZ?',
    a: 'Dip powder sets at Nice Nails & Spa start from $40 for a standard set. Pricing can vary with nail length, design details, and add-ons. See our nail menu for current prices or call us at (602) 759-9184.',
  },
  {
    q: 'Is dip powder safe for natural nails?',
    a: 'Dip powder is generally considered gentle relative to heavy acrylic sculpting because it does not require monomer. Removal — soaking in acetone with foil wraps — is a well-established process. Keeping natural nails hydrated with oil and avoiding aggressive scraping during removal is important for nail health. Our team uses proper prep and removal techniques to minimize stress on the natural nail.',
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
    name: 'Dip Powder Nails in North Phoenix AZ',
    description:
      'Dip powder nail services in North Phoenix AZ 85021 — odorless, lightweight, no UV curing. Rich pigment and strong bond with easy soak-off removal at Nice Nails & Spa.',
    serviceType: 'Dip Powder Nails',
    url: absoluteUrl('/services/dip-powder-nails-phoenix'),
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

export default function DipPowderNailsPhoenixPage() {
  const salon = process.env.NEXT_PUBLIC_SALON_NAME || 'Nice Nails & Spa';
  const phone = process.env.NEXT_PUBLIC_SALON_PHONE || '';
  const telHref = phone ? `tel:${phone.replace(/\D/g, '')}` : '#';

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Acrylic & Gel Nails', path: '/services/nails' },
        { name: 'Dip Powder', path: '/services/dip-powder-nails-phoenix' },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd()) }} />

      <div className="min-h-screen bg-cream pb-24">
        <article className="border-b border-rose-gold/15 bg-gradient-to-b from-cream-dark/90 via-cream to-cream px-4 py-14 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
              {salon} · North Phoenix, AZ 85021
            </p>
            <h1 className="mt-3 font-display text-4xl tracking-tight text-ink md:text-5xl">
              Dip powder nails in North Phoenix, AZ
            </h1>
            <p className="mt-4 text-base leading-relaxed text-charcoal md:text-lg">
              Lightweight, odorless, and durable — dip powder builds a strong color bond without
              liquid monomer or UV lamps. Book at our North Phoenix studio or see the full{' '}
              <Link href="/services/nails" className="font-medium text-rose-gold underline decoration-rose-gold/40">
                nail extensions menu
              </Link>
              .
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/booking"
                className="rounded-full bg-charcoal px-8 py-3 text-sm font-semibold text-cream shadow-md transition hover:bg-charcoal/90"
              >
                Book dip powder
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

        <div className="mx-auto max-w-3xl px-4 py-10 text-sm leading-relaxed text-charcoal md:text-base">
          <div className="relative mb-8 aspect-[16/7] w-full overflow-hidden rounded-2xl">
            <Image
              src="/images/popular-manicure.webp"
              alt="Dip powder nails at Nice Nails & Spa, North Phoenix AZ 85021 — rich color, lightweight, odorless"
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>

          <h2 className="font-display text-2xl text-ink md:text-3xl">How dip powder works</h2>
          <p className="mt-4 leading-relaxed">
            Dip powder uses a resin base coat — no liquid monomer, no UV or LED lamp required.
            After the base is applied, nails are dipped into fine pigmented powder (or the powder
            is brushed on), then sealed with an activator and topcoat for a smooth, hard finish.
            The layered powder bonds tightly for strong, chip-resistant color that lasts three to
            four weeks. Removal requires soaking in acetone with foil wraps, which is gentler on
            the natural nail than heavy mechanical filing. At our North Phoenix AZ 85021 studio on
            N 19th Ave we carry a wide range of dip powder shades — from everyday neutrals to bold
            seasonal colors and classic French finishes.
          </p>

          <h2 className="mt-10 font-display text-2xl text-ink md:text-3xl">Why guests choose dip</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 marker:text-rose-gold">
            <li>No UV lamp needed — the activator cures the powder chemically.</li>
            <li>Odorless compared to traditional liquid acrylic monomer.</li>
            <li>Rich, opaque color with a naturally glossy topcoat finish.</li>
            <li>Soak-off removal with acetone is straightforward and preserves more natural nail.</li>
          </ul>

          <h2 className="mt-10 font-display text-2xl text-ink md:text-3xl">Aftercare tips</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 marker:text-rose-gold">
            <li>Use cuticle oil daily — dip sets can dry the surrounding skin over time.</li>
            <li>Wear gloves when washing dishes or using cleaning products.</li>
            <li>Do not pick or peel — soak off properly using foil wraps and acetone.</li>
            <li>Return every three to four weeks for a fresh set or touch-up.</li>
          </ul>

          <section className="mt-12" aria-labelledby="dip-faq-heading">
            <h2 id="dip-faq-heading" className="font-display text-2xl text-ink md:text-3xl">
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

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/booking"
              className="inline-flex rounded-full bg-charcoal px-6 py-2.5 text-sm font-semibold text-cream hover:bg-charcoal/90"
            >
              Book dip powder
            </Link>
            <Link
              href="/services/nails"
              className="inline-flex rounded-full border-2 border-rose-gold/30 px-6 py-2.5 text-sm font-semibold text-charcoal hover:bg-dusty-rose/20"
            >
              View nail menu →
            </Link>
            <Link
              href="/services/gel-x-nails-phoenix"
              className="inline-flex rounded-full border-2 border-charcoal/20 px-6 py-2.5 text-sm font-semibold text-charcoal hover:border-rose-gold/40"
            >
              Compare: Gel-X →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
