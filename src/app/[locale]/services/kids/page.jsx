import { Link } from '@/i18n/navigation';
import { untranslatedMeta } from '@/lib/i18nMeta';
import {
  CATEGORIES,
  servicesInCategory,
  mergeGelPairs,
  relatedServices,
  CATEGORY_NAV,
} from '@/data/services';
import ServiceCard from '@/components/ServiceCard';
import RelatedArticles from '@/components/RelatedArticles';
import ServiceSchema from '@/components/ServiceSchema';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import KidsSeoSchemas, { KIDS_SEO_FAQS } from '@/components/KidsSeoSchemas';
import { absoluteUrl } from '@/lib/siteUrl';
import { getSalonServices } from '@/lib/serverServices';

const CATEGORY = 'kids';
const TITLE =
  'Kids Nail Services Phoenix AZ | Children Manicure & Pedicure | Nice Nails & Spa';
const DESCRIPTION =
  'Fun & safe nail services for kids in North Phoenix AZ 85021. Kids manicure from $15, pedicure from $20. Perfect for birthdays & mommy-daughter days. Book now!';

const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: '/services/kids',
  },
  keywords: [
    'kids nail salon Phoenix AZ',
    'children manicure Phoenix',
    'kids pedicure North Phoenix',
    'mommy daughter nails Phoenix',
    'kids birthday nail salon Phoenix',
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl('/services/kids'),
  },
};

const OCCASIONS = [
  {
    title: 'Birthday parties',
    text: 'Celebrate with polish, giggles, and photos—our team keeps energy upbeat for small groups when you coordinate ahead.',
  },
  {
    title: 'Mother-daughter bonding',
    text: 'Side-by-side chairs make it easy to share a calm moment together; book online or call for neighboring spots.',
  },
  {
    title: 'Back to school treat',
    text: 'A fresh manicure or pedicure is a sweet confidence boost before the first bell—quick enough for busy weeknights.',
  },
  {
    title: 'Holiday celebrations',
    text: 'Sparkle for seasonal photos and family gatherings; we focus on safe, gentle products sized for little hands and feet.',
  },
];

export default async function KidsServicesPage() {
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
      <KidsSeoSchemas />
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
              Kids Nail Services in Phoenix AZ
            </h1>
            <p className="mt-2 text-sm font-semibold text-rose-gold">
              Manicure from $15 · Pedicure from $20 · Under 10 · North Phoenix, AZ 85021
            </p>
            <nav
              className="mt-6 flex flex-wrap gap-3 text-sm font-semibold"
              aria-label="Kids services shortcuts"
            >
              <Link
                href="/booking"
                className="rounded-full bg-charcoal px-4 py-2 text-cream transition hover:bg-charcoal/90"
              >
                Book a kids appointment
              </Link>
              <Link
                href="/services/manicure"
                className="rounded-full border-2 border-rose-gold/35 bg-surface-soft px-4 py-2 text-charcoal transition hover:bg-cream-dark/40"
              >
                View adult manicure services
              </Link>
              <Link
                href="/services"
                className="rounded-full border-2 border-charcoal/20 px-4 py-2 text-charcoal transition hover:border-rose-gold/40"
              >
                View all services
              </Link>
            </nav>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
          <p className="text-base leading-relaxed text-charcoal md:text-lg">
            Nice Nails &amp; Spa in North Phoenix AZ 85021 welcomes children under 10 for manicures,
            pedicures, and gel color services sized for little hands and feet. Appointments stay quick,
            colorful, and calm — staff explain each step in kid-friendly language and pace everything for
            wiggles and questions. Gel polish upgrades are available for both manicures and pedicures, and
            kids love picking from the full color wall. Parents and children from Moon Valley, Deer Valley,
            and Glendale book side-by-side chairs for birthdays, back-to-school treats, and
            mother-daughter days. All tools are sanitized between guests, and we use gentle products
            appropriate for young skin — safety and patience matter as much as the final sparkle.
          </p>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-12 md:px-6">
          <section
            className="rounded-2xl border border-rose-gold/20 bg-surface/90 p-6 shadow-sm shadow-rose-gold/5 backdrop-blur-sm md:p-10"
            aria-labelledby="kids-occasions-heading"
          >
            <h2
              id="kids-occasions-heading"
              className="font-display text-2xl text-ink md:text-3xl"
            >
              Perfect for special occasions
            </h2>
            <p className="mt-2 text-sm text-charcoal">
              Popular reasons families search things like{' '}
              <span className="font-medium text-charcoal">
                kids birthday nail salon Phoenix
              </span>
              —here is how we can help.
            </p>
            <ul className="mt-8 space-y-6">
              {OCCASIONS.map((o) => (
                <li key={o.title}>
                  <h3 className="text-lg font-semibold text-charcoal">{o.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal">{o.text}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-12 md:px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {mergeGelPairs(list).map(({ service, gel }) => (
              <ServiceCard key={service.id} service={service} gel={gel} />
            ))}
          </div>

          <section className="mt-16 rounded-2xl border border-rose-gold/20 bg-surface/90 p-6 shadow-sm shadow-rose-gold/5 backdrop-blur-sm md:p-10">
            <h2 className="font-display text-2xl text-ink">Frequently asked questions</h2>
            <ul className="mt-6 space-y-6">
              {KIDS_SEO_FAQS.map((f) => (
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
              Book a kids appointment
            </Link>
            <Link
              href="/services/manicure"
              className="inline-flex rounded-full border-2 border-rose-gold/30 px-6 py-2.5 text-sm font-semibold text-charcoal hover:bg-dusty-rose/20"
            >
              View adult manicure services →
            </Link>
            <Link
              href="/services"
              className="inline-flex rounded-full border-2 border-charcoal/20 px-6 py-2.5 text-sm font-semibold text-charcoal hover:border-rose-gold/40"
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
  return { ...metadata, ...untranslatedMeta(locale, '/services/kids') };
}
