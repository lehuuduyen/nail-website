import Link from 'next/link';
import {
  CATEGORIES,
  servicesInCategory,
  minPriceInCategory,
  relatedServices,
  CATEGORY_NAV,
} from '@/data/services';
import ServiceCard from '@/components/ServiceCard';
import ServiceSchema from '@/components/ServiceSchema';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import PedicureSeoSchemas, { PEDICURE_SEO_FAQS } from '@/components/PedicureSeoSchemas';
import { absoluteUrl } from '@/lib/siteUrl';
import { getSalonServices } from '@/lib/serverServices';

const CATEGORY = 'pedicure';
const TITLE = 'Spa Pedicure in North Phoenix AZ 85021 | Nice Nails & Spa';
const DESCRIPTION =
  'Relaxing spa pedicures from $35 in North Phoenix AZ. Soak, scrub, callus care & hot-stone massage. Book online today. 4.9★ 700+ reviews.';

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: '/services/pedicure',
  },
  keywords: [
    'pedicure Phoenix AZ',
    'spa pedicure North Phoenix',
    'pedicure 85021',
    'best pedicure Phoenix',
    'Nice Nails & Spa pedicure',
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl('/services/pedicure'),
  },
};

export default async function PedicureServicesPage() {
  const services = await getSalonServices();
  const cat = CATEGORIES[CATEGORY];
  const list = servicesInCategory(services, CATEGORY);
  const related = relatedServices(services, CATEGORY, 3);
  const menuTiers = list.filter((s) => !s.name.startsWith('Add-on'));
  const minP = menuTiers.length
    ? Math.min(...menuTiers.map((s) => s.price))
    : minPriceInCategory(services, CATEGORY);

  return (
    <>
      <ServiceSchema services={list} />
      <BreadcrumbJsonLd items={[
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: cat.label, path: `/services/${CATEGORY}` },
      ]} />
      <PedicureSeoSchemas />
      <div className="min-h-screen bg-cream pb-24">
        <section className="border-b border-rose-gold/15 bg-gradient-to-b from-cream-dark/90 via-cream to-cream px-4 py-12 md:py-16">
          <div className="mx-auto max-w-4xl">
            <nav className="text-xs font-medium text-muted" aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1">
                <li>
                  <Link href="/" className="hover:text-rose-gold">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/services" className="hover:text-rose-gold">
                    Services
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
              Spa Pedicure in North Phoenix AZ
            </h1>
            <p className="mt-2 text-sm font-semibold text-rose-gold">
              From ${minP}+ · North Phoenix, AZ 85021
            </p>
            <nav
              className="mt-6 flex flex-wrap gap-3 text-sm font-semibold"
              aria-label="Pedicure page shortcuts"
            >
              <Link
                href="/services"
                className="rounded-full border-2 border-charcoal/20 px-4 py-2 text-charcoal transition hover:border-rose-gold/40"
              >
                View all services
              </Link>
              <Link
                href="/booking"
                className="rounded-full bg-charcoal px-4 py-2 text-cream transition hover:bg-charcoal/90"
              >
                Book your pedicure
              </Link>
              <Link
                href="/services/manicure"
                className="rounded-full border-2 border-rose-gold/35 bg-surface-soft px-4 py-2 text-charcoal transition hover:bg-cream-dark/40"
              >
                Pair with a manicure
              </Link>
            </nav>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
          <p className="text-base leading-relaxed text-charcoal md:text-lg">
            Give your feet the reset they deserve with a spa pedicure at Nice Nails &amp; Spa in North
            Phoenix. Sink into a comfortable chair while we soak, exfoliate, and massage tired
            feet—our pedicures start at $35 and range from a clean classic finish to deluxe treatments
            with sugar scrub, callus smoothing, a hydrating mask, and hot-stone massage. Each pedicure
            includes nail trimming, cuticle care, and your choice of regular or long-lasting gel polish.
            We sanitize every tool and use a fresh disposable liner for each guest, so you can fully
            relax. Many clients pair a pedicure with a manicure for a complete refresh before a wedding,
            vacation, or a well-earned break. Located at 8048 N 19th Ave, Phoenix, AZ 85021, we are an
            easy stop for guests across North Phoenix, Glendale, Peoria, and Moon Valley. Book online in
            seconds or walk in when we have an open chair.
          </p>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-12 md:px-6">
          <section
            className="rounded-2xl border border-rose-gold/20 bg-surface/90 p-6 shadow-sm shadow-rose-gold/5 backdrop-blur-sm md:p-10"
            aria-labelledby="pedicure-tiers-heading"
          >
            <h2
              id="pedicure-tiers-heading"
              className="font-display text-2xl text-ink md:text-3xl"
            >
              Which pedicure is right for you?
            </h2>
            <p className="mt-2 text-sm text-charcoal">
              Seven tiers from a clean classic finish to a full luxury golden ritual — your technician can help you choose at check-in.
            </p>
            <div className="mt-8 space-y-6">
              {[
                { tier: 'Classic',     price: '$35',  gel: '$45',  min: '45',  desc: 'Cuticle trim, nail shape, sugar scrub, hot towel, lotion massage, polish.' },
                { tier: 'Signature',   price: '$45',  gel: '$52',  min: '60',  desc: 'Classic + callous removal, cooling gel — a step up for everyday feet.' },
                { tier: 'Deluxe',      price: '$52',  gel: '$62',  min: '75',  desc: 'Signature + hot stone massage and paraffin dip for deeper relaxation.' },
                { tier: 'Royal',       price: '$62',  gel: '$72',  min: '90',  desc: 'Deluxe + vegan pedicure kit with salt soak, mud masque, massage butter (8 min massage).' },
                { tier: 'Luxurious',   price: '$72',  gel: '$82',  min: '100', desc: 'Royal + FreshMilk whitening, organic fruit vitamin C, collagen socks (10 min massage).' },
                { tier: 'Gel-Ohh Jelly Spa', price: '$82', gel: '$98', min: '120', desc: 'Luxurious + Gel-Ohh jelly soak that retains water temperature — ultimate muscle relief.' },
                { tier: 'Vena Golden', price: '$98',  gel: '$110', min: '130', desc: 'Our signature luxury: golden scrub, golden mask, golden serum & lotion, hot towel finale.' },
              ].map(({ tier, price, gel, min, desc }) => (
                <div key={tier} className="flex flex-col gap-1 border-b border-rose-gold/10 pb-6 last:border-0 last:pb-0 sm:flex-row sm:items-start sm:gap-6">
                  <div className="flex w-full shrink-0 items-baseline gap-3 sm:w-48 sm:flex-col sm:gap-0.5">
                    <p className="font-semibold text-charcoal">{tier}</p>
                    <p className="text-xs text-muted">{min} min</p>
                    <div className="ml-auto flex gap-3 sm:ml-0 sm:mt-1 sm:flex-col sm:gap-0.5">
                      <p className="text-sm font-bold text-charcoal">Cash {price}+</p>
                      <p className="text-xs text-muted">Gel {gel}+</p>
                    </div>
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-charcoal">{desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-muted">Add paraffin wax or hot stone: $7+ · Add extra massage time: $10+</p>
          </section>
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-12 md:px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>

          <section className="mt-16 rounded-2xl border border-rose-gold/20 bg-surface/90 p-6 shadow-sm shadow-rose-gold/5 backdrop-blur-sm md:p-10">
            <h2 className="font-display text-2xl text-ink">Frequently asked questions</h2>
            <ul className="mt-6 space-y-6">
              {PEDICURE_SEO_FAQS.map((f) => (
                <li key={f.q}>
                  <h3 className="font-semibold text-charcoal">{f.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal">{f.a}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16">
            <h2 className="font-display text-2xl text-ink">You may also like</h2>
            <p className="mt-1 text-sm text-muted">Popular picks from other categories</p>
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
              ← View all services
            </Link>
            <Link
              href="/booking"
              className="inline-flex rounded-full bg-charcoal px-6 py-2.5 text-sm font-semibold text-cream hover:bg-charcoal/90"
            >
              Book your pedicure
            </Link>
            <Link
              href="/services/manicure"
              className="inline-flex rounded-full border-2 border-rose-gold/30 px-6 py-2.5 text-sm font-semibold text-charcoal hover:bg-dusty-rose/20"
            >
              Pair with a manicure →
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
