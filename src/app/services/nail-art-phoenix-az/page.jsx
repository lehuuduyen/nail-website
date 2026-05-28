import Link from 'next/link';
import { absoluteUrl } from '@/lib/siteUrl';
import { getLocalBusinessJsonLd } from '@/lib/localBusinessJsonLd';

const TITLE = 'Nail Art & Custom Designs Phoenix AZ | Nice Nails & Spa';
const DESCRIPTION =
  'Nail art, rhinestones, French add-ons & custom designs in North Phoenix. Book nail art with your manicure or gel service at Nice Nails & Spa.';

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/services/nail-art-phoenix-az' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl('/services/nail-art-phoenix-az'),
  },
};

const FAQ_ITEMS = [
  {
    q: 'How much does nail art cost in Phoenix AZ?',
    a: 'Simple accent designs and French upgrades start at $5 per nail or per accent. Rhinestones, 3D elements, and complex hand-painted art are priced by complexity. Bring inspiration photos and we can give you an accurate quote before starting.',
  },
  {
    q: 'Do I need to book in advance for nail art?',
    a: 'Yes — custom nail art takes extra time and materials. Booking ahead lets us plan the right slot and have supplies ready. Same-day walk-in nail art is based on availability and simpler designs only.',
  },
  {
    q: 'How long does nail art take?',
    a: 'Simple accents add 15–30 minutes on top of your base service. Full custom sets — intricate line art, floral, or multi-nail designs — can run 45–60 minutes extra. We build in the right time when you book with a design photo.',
  },
  {
    q: 'What nail art styles do you offer?',
    a: 'We offer French tips, ombre, rhinestones, fine-line art, seasonal designs, floral, geometric patterns, and more. Bring a photo of your inspiration for the closest match — our techs will let you know what is achievable on your nail shape.',
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
    name: 'Nail Art & Custom Designs Phoenix AZ',
    description:
      'Custom nail art, rhinestones, French upgrades, ombre, and seasonal designs at Nice Nails & Spa in North Phoenix AZ 85021. Add-on to any manicure or gel service.',
    serviceType: 'Nail Art',
    url: absoluteUrl('/services/nail-art-phoenix-az'),
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
      lowPrice: '5',
      highPrice: '40',
      description: 'Nail art add-ons from $5 per accent; complex designs priced by complexity.',
    },
  };
}

export default function NailArtPhoenixAzPage() {
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
              Nail art &amp; custom designs in Phoenix, AZ
            </h1>
            <p className="mt-4 text-base leading-relaxed text-charcoal md:text-lg">
              From rhinestones and French upgrades to line art and seasonal accents — our North Phoenix team
              builds nail art that fits your event calendar. Pair art with manicures, gel, or enhancements
              from our full{' '}
              <Link href="/services" className="font-medium text-rose-gold underline decoration-rose-gold/40">
                services menu
              </Link>
              , or browse{' '}
              <Link
                href="/services/addon"
                className="font-medium text-rose-gold underline decoration-rose-gold/40"
              >
                add-ons
              </Link>{' '}
              like rhinestones and shiny buffing.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/booking"
                className="rounded-full bg-charcoal px-8 py-3 text-sm font-semibold text-cream shadow-md transition hover:bg-charcoal/90"
              >
                Book online
              </Link>
              <Link
                href="/services/manicure"
                className="rounded-full border-2 border-charcoal/25 px-8 py-3 text-sm font-semibold text-charcoal transition hover:bg-dusty-rose/25"
              >
                Manicure menu
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
          <h2 className="font-display text-2xl text-ink md:text-3xl">Plan your nail art visit</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 marker:text-rose-gold">
            <li>Bring inspiration photos so we can quote time and pricing before we start.</li>
            <li>Gel and builder options often help intricate art last longer in Arizona heat.</li>
            <li>Combine nail art with dip, acrylic, or natural nails — ask what works best for your length.</li>
          </ul>

          <section className="mt-12" aria-labelledby="nail-art-faq-heading">
            <h2 id="nail-art-faq-heading" className="font-display text-2xl text-ink md:text-3xl">
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
