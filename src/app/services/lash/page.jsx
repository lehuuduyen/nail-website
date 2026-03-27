import Link from 'next/link';
import {
  CATEGORIES,
  servicesInCategory,
  relatedServices,
  CATEGORY_NAV,
} from '@/data/services';
import ServiceCard from '@/components/ServiceCard';
import ServiceSchema from '@/components/ServiceSchema';
import LashSeoSchemas, { LASH_SEO_FAQS } from '@/components/LashSeoSchemas';
import { absoluteUrl } from '@/lib/siteUrl';

const CATEGORY = 'lash';
const TITLE =
  'Eyelash Extensions Phoenix AZ | Classic, Volume, Wispy | Nice Nails & Spa';
const DESCRIPTION =
  'Professional eyelash extensions in North Phoenix AZ 85021. Classic from $87, Volume from $120. Wispy, Hybrid & Lash Lift available. Book your lash appointment!';

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: '/services/lash',
  },
  keywords: [
    'eyelash extensions Phoenix AZ',
    'lash extensions North Phoenix',
    'lash lift Phoenix',
    'volume lashes Phoenix AZ',
    'wispy lashes Phoenix',
    'hybrid lash extensions',
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl('/services/lash'),
  },
};

export default function LashServicesPage() {
  const cat = CATEGORIES[CATEGORY];
  const list = servicesInCategory(CATEGORY);
  const related = relatedServices(CATEGORY, 3);

  return (
    <>
      <ServiceSchema services={list} />
      <LashSeoSchemas />
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
              Eyelash Extensions in Phoenix AZ
            </h1>
            <p className="mt-2 text-sm font-semibold text-rose-gold">
              Classic from $87 · Volume from $120 · North Phoenix, AZ 85021
            </p>
            <nav
              className="mt-6 flex flex-wrap gap-3 text-sm font-semibold"
              aria-label="Lash page shortcuts"
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
                Book your lash appointment
              </Link>
            </nav>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
          <p className="text-base leading-relaxed text-charcoal md:text-lg">
            Nice Nails &amp; Spa in <strong>North Phoenix</strong> tailors <strong>eyelash extensions
            Phoenix AZ</strong> clients request for real life—custom mapping, careful weight, and retention
            you can feel between fills.             Searching for <strong>lash extensions North Phoenix</strong> you can trust? We prioritize
            lash health, soft drama, and a line that flatters your eye shape without
            looking heavy. Prefer your naturals with lift? Our <strong>lash lift Phoenix</strong> option
            delivers a low-maintenance, wake-up-ready curl—lovely with tint. Craving <strong>volume lashes
            Phoenix AZ</strong> energy? We hand-make lightweight fans for depth; classic sets stay refined
            when you want mascara-like definition. Visits include prep, aftercare coaching, and a fill plan
            around your shed cycle. Wispy and hybrid sets blend classic placement with feathery or fan
            texture when you want dimension without extremes. Stations stay sanitary, adhesives are pro
            grade, and we quote fill pricing up front. New guests receive a curl-and-length consult first.
            Book online anytime; walk-ins welcome when we have openings.
          </p>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-12 md:px-6">
          <section
            className="rounded-2xl border border-rose-gold/20 bg-surface/90 p-6 shadow-sm shadow-rose-gold/5 backdrop-blur-sm md:p-10"
            aria-labelledby="lash-style-heading"
          >
            <h2
              id="lash-style-heading"
              className="font-display text-2xl text-ink md:text-3xl"
            >
              Which lash style is right for you?
            </h2>
            <p className="mt-2 text-sm text-charcoal">
              Quick overview—your lash artist will customize curl, length, and density at your visit.
            </p>
            <div className="mt-8 space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-charcoal">Classic</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal">
                  A natural, polished look with one extension applied to each healthy natural lash—think
                  defined, mascara-like length and lift without heavy volume.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-charcoal">Volume</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal">
                  Handmade fans of ultra-fine extensions create a fuller, darker lash line—ideal when you
                  want bold, camera-ready drama while keeping weight balanced.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-charcoal">Wispy</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal">
                  Soft, feathery texture with varied lengths for a fluttery, eye-opening effect—pretty
                  for everyday or events when you want movement and lightness.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-charcoal">Hybrid</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal">
                  The best of both worlds: a strategic mix of classic placement and volume fans for
                  texture, dimension, and fullness that still looks refined up close.
                </p>
              </div>
            </div>
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
              {LASH_SEO_FAQS.map((f) => (
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
              Book your lash appointment
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
