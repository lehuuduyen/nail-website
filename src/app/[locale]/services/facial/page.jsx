import { Link } from '@/i18n/navigation';
import { untranslatedMeta } from '@/lib/i18nMeta';
import {
  CATEGORIES,
  servicesInCategory,
  relatedServices,
  CATEGORY_NAV,
} from '@/data/services';
import ServiceCard from '@/components/ServiceCard';
import RelatedArticles from '@/components/RelatedArticles';
import ServiceSchema from '@/components/ServiceSchema';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import FacialSeoSchemas, { FACIAL_SEO_FAQS } from '@/components/FacialSeoSchemas';
import { absoluteUrl } from '@/lib/siteUrl';
import { getSalonServices } from '@/lib/serverServices';

const CATEGORY = 'facial';
const TITLE =
  'Facial in North Phoenix AZ 85021 | Hydrating & Deep Clean Facials | Nice Nails & Spa';
const DESCRIPTION =
  'Hydrating, deep clean & detox facials in North Phoenix AZ 85021. Three tiers from $45 — cleanse, exfoliate, steam, mask & moisturize. Serving Moon Valley, Glendale & Peoria.';

const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: '/services/facial',
  },
  keywords: [
    'facial Phoenix AZ',
    'hydrating facial North Phoenix',
    'deep clean facial Phoenix',
    'skin care facial Phoenix AZ 85021',
    'detox facial Phoenix',
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl('/services/facial'),
  },
};

export default async function FacialServicesPage() {
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
      <FacialSeoSchemas />
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
              Facial Services in Phoenix AZ
            </h1>
            <p className="mt-2 text-sm font-semibold text-rose-gold">
              From $45 · North Phoenix, AZ 85021
            </p>
            <nav
              className="mt-6 flex flex-wrap gap-3 text-sm font-semibold"
              aria-label="Facial page shortcuts"
            >
              <Link
                href="/booking"
                className="rounded-full bg-charcoal px-4 py-2 text-cream transition hover:bg-charcoal/90"
              >
                Book your facial
              </Link>
              <Link
                href="/services/head_spa"
                className="rounded-full border-2 border-rose-gold/35 bg-surface-soft px-4 py-2 text-charcoal transition hover:bg-cream-dark/40"
              >
                Enhance with a Head Spa treatment
              </Link>
              <Link
                href="/services/waxing"
                className="rounded-full border-2 border-charcoal/20 px-4 py-2 text-charcoal transition hover:border-rose-gold/40"
              >
                Add eyebrow waxing
              </Link>
              <Link
                href="/services"
                className="rounded-full border-2 border-charcoal/15 px-4 py-2 text-charcoal transition hover:border-rose-gold/30"
              >
                View all services
              </Link>
            </nav>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
          <p className="text-base leading-relaxed text-charcoal md:text-lg">
            Nice Nails &amp; Spa in North Phoenix AZ 85021 offers three facial levels designed for the dry
            Sonoran climate. The hydrating facial is what neighbors book monthly to keep skin balanced; the
            deep clean facial is what clients choose before events for clarity and pore refinement; and the
            detox treatment targets congestion, oil imbalance, and buildup with charcoal- and clay-based
            steps. Every visit follows the same proven flow — cleanse, exfoliate, steam, mask, serum, and
            moisturize — scaled to your skin type at check-in so barrier support never feels like an
            afterthought. We serve guests from Moon Valley, Deer Valley, and Glendale who prefer a
            full-service appointment without driving across the Valley. Book when Phoenix heat has your
            skin feeling tight, or schedule a recurring treatment to stay ahead of sun and air-conditioning damage.
          </p>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-10 md:px-6">
          <section
            className="rounded-2xl border border-rose-gold/20 bg-surface/90 p-6 shadow-sm shadow-rose-gold/5 backdrop-blur-sm md:p-10"
            aria-labelledby="facial-choose-heading"
          >
            <h2
              id="facial-choose-heading"
              className="font-display text-2xl text-ink md:text-3xl"
            >
              Choose your facial
            </h2>
            <p className="mt-2 text-sm text-charcoal">
              Three combo levels—pick what matches your skin today; we adjust products at your
              appointment.
            </p>
            <div className="mt-8 space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-charcoal">
                  Combo 1 — Basic hydrating facial
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-rose-gold">
                  45 min · $45
                </p>
                <p className="mt-2 text-sm leading-relaxed text-charcoal">
                  Best for <strong>regular maintenance</strong> when you want steady hydration, polish, and
                  prevention—ideal if you are new to facials or need a dependable refresh between seasons.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-charcoal">
                  Combo 2 — Deep clean facial
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-rose-gold">
                  60 min · $60
                </p>
                <p className="mt-2 text-sm leading-relaxed text-charcoal">
                  Best for <strong>congested or dull skin</strong> that needs thorough cleansing,
                  exfoliation, mask time, facial acupressure, neck and shoulder massage, and a hydrating
                  finish so you look awake again.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-charcoal">
                  Combo 3 — Detox deep clean facial
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-rose-gold">
                  80 min · $80
                </p>
                <p className="mt-2 text-sm leading-relaxed text-charcoal">
                  Best for <strong>oily or acne-prone skin</strong> with charcoal, clay, and salicylic-style
                  focus plus steam to purify—especially helpful when <strong>Phoenix heat and humidity</strong>{' '}
                  amp up shine and clogged pores. We still rehydrate so skin feels clear, not tight.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-12 md:px-6">
          <section
            className="rounded-2xl border border-lavender/30 bg-cream-dark/40 p-6 md:p-8"
            aria-labelledby="facial-phoenix-why-heading"
          >
            <h2
              id="facial-phoenix-why-heading"
              className="font-display text-xl text-ink md:text-2xl"
            >
              Why your skin needs a facial in Phoenix AZ
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-charcoal md:text-base">
              Living in the Valley means near-constant <strong>sun exposure</strong>, low desert humidity
              indoors and out, and temperature swings every time you step from AC into the heat. That
              combo dehydrates surface cells, exaggerates fine lines, and makes pores more noticeable—so
              a <strong>facial Phoenix AZ</strong> routine is less about luxury and more about keeping your
              barrier resilient. Professional <strong>exfoliation</strong> lifts flaky buildup sunscreen can
              cling to; <strong>masks and serums</strong> deliver water-binding ingredients deeper than most
              home routines; and massage boosts circulation so you look refreshed after long work weeks.
              Whether you are fighting dryness from office air or oiliness when monsoon moisture returns,
              scheduled facials help you reset before damage shows up in photos or makeup. Pair that mindset
              with daily SPF and the right home moisturizer, and your skin stays calmer year-round.
            </p>
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
              {FACIAL_SEO_FAQS.map((f) => (
                <li key={f.q}>
                  <h3 className="font-semibold text-charcoal">{f.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal">{f.a}</p>
                </li>
              ))}
            </ul>
          </section>

          <RelatedArticles category={CATEGORY} />

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
              href="/booking"
              className="inline-flex rounded-full bg-charcoal px-6 py-2.5 text-sm font-semibold text-cream hover:bg-charcoal/90"
            >
              Book your facial
            </Link>
            <Link
              href="/services/head_spa"
              className="inline-flex rounded-full border-2 border-rose-gold/30 px-6 py-2.5 text-sm font-semibold text-charcoal hover:bg-dusty-rose/20"
            >
              Enhance with a Head Spa treatment →
            </Link>
            <Link
              href="/services/waxing"
              className="inline-flex rounded-full border-2 border-charcoal/20 px-6 py-2.5 text-sm font-semibold text-charcoal hover:border-rose-gold/40"
            >
              Add eyebrow waxing to your visit →
            </Link>
            <Link
              href="/services"
              className="inline-flex rounded-full border-2 border-charcoal/15 px-6 py-2.5 text-sm font-semibold text-charcoal hover:border-rose-gold/30"
            >
              ← View all services
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

export async function generateMetadata({ params: { locale } }) {
  return { ...metadata, ...untranslatedMeta(locale, '/services/facial') };
}
