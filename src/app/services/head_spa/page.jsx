import Link from 'next/link';
import {
  CATEGORIES,
  servicesInCategory,
  relatedServices,
  CATEGORY_NAV,
} from '@/data/services';
import ServiceCard from '@/components/ServiceCard';
import ServiceSchema from '@/components/ServiceSchema';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import HeadSpaSeoSchemas, { HEAD_SPA_SEO_FAQS } from '@/components/HeadSpaSeoSchemas';
import { absoluteUrl } from '@/lib/siteUrl';
import { getSalonServices } from '@/lib/serverServices';

const CATEGORY = 'head_spa';
const TITLE =
  'Head Spa Phoenix AZ | Luxury Scalp Treatment & Massage | Nice Nails & Spa';
const DESCRIPTION =
  'Relaxing head spa treatments in North Phoenix AZ 85021. Korean-style scalp massage, deep cleanse & aroma therapy. 60–110 min packages from $78. Book today!';

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: '/services/head_spa',
  },
  keywords: [
    'head spa Phoenix AZ',
    'scalp massage Phoenix',
    'Korean head spa Phoenix',
    'luxury head spa North Phoenix AZ',
    'head spa benefits',
    'scalp treatment Phoenix',
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl('/services/head_spa'),
  },
};

export default async function HeadSpaServicesPage() {
  const services = await getSalonServices();
  const cat = CATEGORIES[CATEGORY];
  const list = servicesInCategory(services, CATEGORY);
  const related = relatedServices(services, CATEGORY, 3);

  return (
    <>
      <ServiceSchema services={list} />
      <BreadcrumbJsonLd items={[
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: cat.label, path: `/services/${CATEGORY}` },
      ]} />
      <HeadSpaSeoSchemas />
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
              Head Spa &amp; Scalp Treatment in Phoenix AZ
            </h1>
            <p className="mt-2 text-sm font-semibold text-rose-gold">
              Packages from $78 · 60–110 min · North Phoenix, AZ 85021
            </p>
            <nav
              className="mt-6 flex flex-wrap gap-3 text-sm font-semibold"
              aria-label="Head spa page shortcuts"
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
                Book head spa
              </Link>
            </nav>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
          <p className="text-base leading-relaxed text-charcoal md:text-lg">
            Nice Nails &amp; Spa brings a Korean-inspired head spa ritual to North Phoenix AZ 85021 — a
            multi-step treatment that combines scalp exfoliation, deep-cleanse shampoo, targeted masks,
            hot steam, and a structured neck and shoulder massage to release tension from desk and phone
            posture. Every session is built around how the scalp actually responds to cleansing and
            improved circulation, not just surface shine. Packages run 60 to 110 minutes: the basic combo
            covers the essential cleanse and massage; the deluxe and royal tiers add facial massage,
            compresses, sheet masks, or hot stone work so relaxation travels well beyond the scalp. We
            recommend the right tier at check-in based on your goals and how much time you have. Guests
            from Moon Valley, Glendale, and Peoria book ahead because head spa chairs fill quickly on
            weekends — reserve online or call to hold your spot.
          </p>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-12 md:px-6">
          <section
            className="rounded-2xl border border-rose-gold/20 bg-surface/90 p-6 shadow-sm shadow-rose-gold/5 backdrop-blur-sm md:p-10"
            aria-labelledby="head-spa-benefits-heading"
          >
            <h2
              id="head-spa-benefits-heading"
              className="font-display text-2xl text-ink md:text-3xl"
            >
              Benefits of head spa
            </h2>
            <p className="mt-2 text-sm text-charcoal">
              Why guests search &ldquo;head spa benefits&rdquo; before they book—and what you can expect
              from a focused scalp session.
            </p>
            <ul className="mt-8 space-y-6 text-sm leading-relaxed text-charcoal">
              <li>
                <strong className="text-charcoal">Stress relief.</strong> Slow, rhythmic massage and
                aromatherapy cues help lower mental noise; many people notice less jaw and temple tension
                after even one visit.
              </li>
              <li>
                <strong className="text-charcoal">Scalp health.</strong> Cleansing, exfoliation, masks,
                and steam support a fresher scalp environment—helpful if you use dry shampoo, live in the
                desert climate, or feel buildup at the root.
              </li>
              <li>
                <strong className="text-charcoal">Hair growth support.</strong> While not a medical fix,
                massage and a balanced scalp can improve how comfortable follicles feel and how hair looks
                at the base; pair with professional advice for shedding or thinning concerns.
              </li>
              <li>
                <strong className="text-charcoal">Deep relaxation.</strong> Longer packages layer
                shoulder, face, and hand care so the appointment feels like a mini retreat—not a rushed
                shampoo-only stop.
              </li>
            </ul>
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
              {HEAD_SPA_SEO_FAQS.map((f) => (
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

          <p className="mt-12 text-center text-sm text-charcoal">
            Want more tips on scalp care and salon trends?{' '}
            <Link href="/blog" className="font-semibold text-rose-gold underline decoration-rose-gold/40">
              Visit our blog
            </Link>
            .
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
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
              Book head spa
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
