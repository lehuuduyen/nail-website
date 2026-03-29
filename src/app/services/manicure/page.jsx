import Link from 'next/link';
import {
  CATEGORIES,
  servicesInCategory,
  relatedServices,
  CATEGORY_NAV,
} from '@/data/services';
import ServiceCard from '@/components/ServiceCard';
import ServiceSchema from '@/components/ServiceSchema';
import ManicureSeoSchemas, { MANICURE_SEO_FAQS } from '@/components/ManicureSeoSchemas';
import { absoluteUrl } from '@/lib/siteUrl';
import { getSalonServices } from '@/lib/serverServices';

const CATEGORY = 'manicure';
const TITLE =
  'Manicure in Phoenix AZ | Classic, Deluxe & Deep Manicure | Nice Nails & Spa';
const DESCRIPTION =
  'Professional manicure services in North Phoenix AZ 85021. Classic from $30, Deluxe from $50, Deep Manicure from $60. Gel options available. Book online today!';

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: '/services/manicure',
  },
  keywords: [
    'manicure Phoenix AZ',
    'gel manicure North Phoenix',
    'best manicure Phoenix 85021',
    'manicure near me Phoenix',
    'deluxe manicure Phoenix',
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl('/services/manicure'),
  },
};

export default async function ManicureServicesPage() {
  const services = await getSalonServices();
  const cat = CATEGORIES[CATEGORY];
  const list = servicesInCategory(services, CATEGORY);
  const related = relatedServices(services, CATEGORY, 3);

  return (
    <>
      <ServiceSchema services={list} />
      <ManicureSeoSchemas />
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
              Manicure Services in Phoenix AZ
            </h1>
            <p className="mt-2 text-sm font-semibold text-rose-gold">
              Classic from $30 · Deluxe from $50 · Deep from $60 · North Phoenix, AZ 85021
            </p>
            <nav
              className="mt-6 flex flex-wrap gap-3 text-sm font-semibold"
              aria-label="Manicure page shortcuts"
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
                Book your manicure
              </Link>
              <Link
                href="/services/pedicure"
                className="rounded-full border-2 border-rose-gold/35 bg-surface-soft px-4 py-2 text-charcoal transition hover:bg-cream-dark/40"
              >
                Pair with a pedicure
              </Link>
            </nav>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
          <p className="text-base leading-relaxed text-charcoal md:text-lg">
            Whether you want a <strong>manicure Phoenix AZ</strong> locals trust, a{' '}
            <strong>gel manicure North Phoenix</strong> that guests return for, or the{' '}
            <strong>best manicure Phoenix 85021</strong> experience before a packed week, Nice Nails &amp; Spa
            focuses on precision and comfort
            from the first soak to the final top coat. Typing <strong>manicure near me Phoenix</strong>?
            You will find thoughtful <strong>cuticle care</strong>, custom <strong>nail shaping</strong>,
            hydrating <strong>massage</strong>, and flawless <strong>polish</strong>—plus{' '}
            <strong>Classic</strong>, <strong>Deluxe</strong>, and <strong>Deep</strong> tiers so you can
            match time and pampering to your day. Hygiene is non-negotiable: sanitized tools, fresh files
            where needed, and stations wiped between guests. We reach for premium lotions, scrubs, and gel
            systems that wear evenly so your hands look intentional, not rushed. Deluxe adds exfoliation
            and cooling relief; Deep layers in Jelly spa to soften skin and ease tension—ideal before
            events or after a dry Arizona week. Ask about gel upgrades on any tier when you want
            longer-lasting shine.
          </p>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-12 md:px-6">
          <section
            className="rounded-2xl border border-rose-gold/20 bg-surface/90 p-6 shadow-sm shadow-rose-gold/5 backdrop-blur-sm md:p-10"
            aria-labelledby="manicure-compare-heading"
          >
            <h2
              id="manicure-compare-heading"
              className="font-display text-2xl text-ink md:text-3xl"
            >
              Which manicure is right for you?
            </h2>
            <p className="mt-2 text-sm text-charcoal">
              Match your schedule and how much pampering you want—your nail tech can fine-tune at
              check-in.
            </p>
            <div className="mt-8 space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-charcoal">Classic Manicure</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-rose-gold">
                  ~35 min · from $30
                </p>
                <p className="mt-2 text-sm leading-relaxed text-charcoal">
                  A quick refresh for an everyday look—perfect when you need neat cuticles, balanced
                  shaping, lotion massage, and polish before heading back to work or errands.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-charcoal">Deluxe Manicure</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-rose-gold">
                  ~45 min · from $50
                </p>
                <p className="mt-2 text-sm leading-relaxed text-charcoal">
                  Everything in Classic plus sugar scrub, cooling gel, and a hot towel moment—choose this
                  when your hands feel dull or you want a little spa rhythm without the longest appointment.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-charcoal">Deep Manicure</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-rose-gold">
                  ~50 min · from $60
                </p>
                <p className="mt-2 text-sm leading-relaxed text-charcoal">
                  Full Deluxe care with a Jelly spa soak to soften skin and soothe muscles—ideal before
                  photos, travel, or anytime you want maximum hydration and melt-away tension.
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
              {MANICURE_SEO_FAQS.map((f) => (
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
              Book your manicure
            </Link>
            <Link
              href="/services/pedicure"
              className="inline-flex rounded-full border-2 border-rose-gold/30 px-6 py-2.5 text-sm font-semibold text-charcoal hover:bg-dusty-rose/20"
            >
              Pair with a pedicure for a full mani-pedi experience →
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
