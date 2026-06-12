import Link from 'next/link';
import Image from 'next/image';
import { absoluteUrl } from '@/lib/siteUrl';
import { getBusinessRef } from '@/lib/localBusinessJsonLd';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

const TITLE = 'Gel-X Nails in North Phoenix, AZ 85021 | Nice Nails & Spa';
const DESCRIPTION =
  'Gel-X nail extensions in North Phoenix AZ 85021 — lightweight, soak-off, no monomer needed. Full sets from $40. Book at Nice Nails & Spa today.';

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/services/nails' },
  keywords: [
    'gel-x nails Phoenix AZ',
    'gel-x nails North Phoenix',
    'soft gel extensions Phoenix',
    'soak-off nail extensions Phoenix AZ 85021',
    'gel-x vs acrylic Phoenix',
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl('/services/gel-x-nails-phoenix'),
    images: [
      {
        url: '/images/popular-manicure.webp',
        width: 1200,
        height: 630,
        alt: 'Gel-X nail extensions — Nice Nails & Spa North Phoenix AZ',
      },
    ],
  },
};

const FAQ_ITEMS = [
  {
    q: 'How long do Gel-X nails last?',
    a: 'Gel-X extensions typically last three to four weeks with normal daily activity. Longevity depends on nail prep, aftercare, and how you use your hands. Applying cuticle oil daily and avoiding prolonged water exposure helps extend wear time significantly.',
  },
  {
    q: 'What is the difference between Gel-X and acrylic nails?',
    a: 'Gel-X uses a pre-shaped soft gel tip bonded with gel adhesive and cured under an LED lamp — no liquid monomer, no strong odors, and a softer, more flexible feel than traditional acrylic. Acrylic is sculpted from liquid and powder for a harder, highly customizable enhancement. Both are durable; your nail tech can help you choose based on your natural nail condition and lifestyle.',
  },
  {
    q: 'How much do Gel-X nails cost in Phoenix AZ?',
    a: 'Gel-X sets at Nice Nails & Spa start with the same full-set pricing as our nail extension menu — from $40 for a standard set. Add-ons like nail art, ombré, or gel color upgrades are priced separately. See our current nail menu for exact figures or call (602) 759-9184.',
  },
  {
    q: 'Can Gel-X nails be filled, or do they need to be removed?',
    a: 'Gel-X tips are a soak-off system, so most technicians recommend a fresh set every three to four weeks rather than a traditional fill. At our North Phoenix salon we discuss the best approach for your current set at your appointment — some clients do an infill, others prefer removal and reapplication for the freshest result.',
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
    name: 'Gel-X Nails in North Phoenix AZ',
    description:
      'Gel-X soft gel nail extensions in North Phoenix AZ 85021 — pre-shaped tips, LED cure, no monomer. Lightweight, soak-off, available at Nice Nails & Spa.',
    serviceType: 'Gel-X Nail Extensions',
    url: absoluteUrl('/services/gel-x-nails-phoenix'),
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
      description: 'Gel-X full sets from $40; nail art and color add-ons priced separately.',
    },
  };
}

export default function GelXNailsPhoenixPage() {
  const salon = process.env.NEXT_PUBLIC_SALON_NAME || 'Nice Nails & Spa';
  const phone = process.env.NEXT_PUBLIC_SALON_PHONE || '';
  const telHref = phone ? `tel:${phone.replace(/\D/g, '')}` : '#';

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Acrylic & Gel Nails', path: '/services/nails' },
        { name: 'Gel-X', path: '/services/gel-x-nails-phoenix' },
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
              Gel-X nails in North Phoenix, AZ
            </h1>
            <p className="mt-4 text-base leading-relaxed text-charcoal md:text-lg">
              Lightweight, soak-off gel extensions with no monomer odor and a softer feel than
              traditional acrylic. Book Gel-X at our North Phoenix studio or browse the full{' '}
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
                Book Gel-X nails
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
              alt="Gel-X soft gel nail extensions at Nice Nails & Spa, North Phoenix AZ 85021"
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>

          <h2 className="font-display text-2xl text-ink md:text-3xl">What is Gel-X?</h2>
          <p className="mt-4 leading-relaxed">
            Gel-X is a soft-gel extension system where pre-shaped, full-coverage tips are bonded to
            natural nails using gel adhesive and cured under an LED lamp — no liquid monomer, no
            filing down the natural nail surface, and no strong acrylic odor. The result is a
            flexible, lightweight set that looks and feels like a natural nail enhancement rather
            than a heavy sculptured extension. At our North Phoenix AZ 85021 studio on N 19th Ave,
            Gel-X is a popular choice for guests who want length and strength without the bulk of
            traditional acrylic, or for those with sensitivities to monomer products. Most sets last
            three to four weeks, and soak-off removal is straightforward and gentler on the natural
            nail than mechanical filing.
          </p>

          <h2 className="mt-10 font-display text-2xl text-ink md:text-3xl">Who is Gel-X for?</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 marker:text-rose-gold">
            <li>Guests who prefer a lighter, more flexible feel than traditional acrylic.</li>
            <li>Anyone sensitive to monomer odors or dust from acrylic filing.</li>
            <li>Natural nail wearers who want added length without heavy sculpting.</li>
            <li>Clients looking for soak-off removal that is gentler on the natural nail.</li>
          </ul>

          <h2 className="mt-10 font-display text-2xl text-ink md:text-3xl">Aftercare tips</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 marker:text-rose-gold">
            <li>Apply cuticle oil daily to keep the gel flexible and the natural nail hydrated.</li>
            <li>Wear gloves for prolonged contact with water, cleaning products, or soil.</li>
            <li>Avoid using nails as tools — Gel-X is strong but prying causes lifting.</li>
            <li>Return every three to four weeks for a fresh set or to discuss infill options.</li>
          </ul>

          <section className="mt-12" aria-labelledby="gelx-faq-heading">
            <h2 id="gelx-faq-heading" className="font-display text-2xl text-ink md:text-3xl">
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
              Book Gel-X nails
            </Link>
            <Link
              href="/services/nails"
              className="inline-flex rounded-full border-2 border-rose-gold/30 px-6 py-2.5 text-sm font-semibold text-charcoal hover:bg-dusty-rose/20"
            >
              View nail menu →
            </Link>
            <Link
              href="/services/dip-powder-nails-phoenix"
              className="inline-flex rounded-full border-2 border-charcoal/20 px-6 py-2.5 text-sm font-semibold text-charcoal hover:border-rose-gold/40"
            >
              Compare: Dip Powder →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
