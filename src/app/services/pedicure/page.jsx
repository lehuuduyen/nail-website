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
import PedicureSeoSchemas, { PEDICURE_SEO_FAQS } from '@/components/PedicureSeoSchemas';
import { absoluteUrl } from '@/lib/siteUrl';

const CATEGORY = 'pedicure';
const TITLE = 'Pedicure in Phoenix AZ | Spa Pedicure Services | Nice Nails & Spa';
const DESCRIPTION =
  'Relaxing pedicure services in North Phoenix AZ 85021. Classic to luxury spa pedicures from $35. Hot stone, paraffin, La Palm & more. Book online today!';

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

export default function PedicureServicesPage() {
  const cat = CATEGORIES[CATEGORY];
  const list = servicesInCategory(CATEGORY);
  const related = relatedServices(CATEGORY, 3);
  const menuTiers = list.filter((s) => !s.name.startsWith('Add-on'));
  const minP = menuTiers.length
    ? Math.min(...menuTiers.map((s) => s.price))
    : minPriceInCategory(CATEGORY);

  return (
    <>
      <ServiceSchema services={list} />
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
              Pedicure Services in Phoenix AZ
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
            Looking for a <strong>pedicure in Phoenix AZ</strong> that feels like a real break in your
            day? At Nice Nails &amp; Spa in <strong>North Phoenix</strong>, our menu centers on{' '}
            <strong>spa pedicure</strong> rituals that soften rough spots, refresh tired feet, and leave
            polish flawless. Searching for the <strong>best pedicure Phoenix 85021</strong> has to offer?
            Choose from quick classics to layered luxury soaks, scrubs, and massage. Hygiene comes first:
            disposable liners, sanitized tools, and spotless stations so you can relax with confidence.
            We use quality lotions, sugar scrubs, and cooling gels—plus <strong>La Palm</strong> collagen
            steps on select tiers—and add <strong>hot stone</strong> or <strong>paraffin</strong> when you
            want extra pampering. Thoughtful cuticle care, shaping, and massage pacing keep each visit
            feeling personal—not rushed. Slip into our chairs, pick the tier that fits your mood, and let
            our North Phoenix team welcome you from greeting to glossy finish.
          </p>
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
