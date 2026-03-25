import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  CATEGORIES,
  VALID_CATEGORY_SLUGS,
  servicesInCategory,
  minPriceInCategory,
  FAQ_BY_CATEGORY,
  relatedServices,
  CATEGORY_NAV,
} from '@/data/services';
import ServiceCard from '@/components/ServiceCard';
import ServiceSchema from '@/components/ServiceSchema';

export function generateStaticParams() {
  return VALID_CATEGORY_SLUGS.map((category) => ({ category }));
}

export async function generateMetadata({ params }) {
  const { category } = params;
  if (!VALID_CATEGORY_SLUGS.includes(category)) {
    return { title: 'Services' };
  }
  const cat = CATEGORIES[category];
  const minP = minPriceInCategory(category);
  return {
    title: `${cat.label} Services Phoenix AZ — $${minP}+ | Nice Nails & Spa`,
    description: `${cat.description} at Nice Nails & Spa Phoenix. Starting at $${minP}. Book online today!`,
    alternates: {
      canonical: `/services/${category}`,
    },
    openGraph: {
      title: `${cat.label} — Nice Nails & Spa Phoenix`,
      description: `$${minP}+ · ${cat.description}`,
    },
  };
}

export default function ServiceCategoryPage({ params }) {
  const { category } = params;
  if (!VALID_CATEGORY_SLUGS.includes(category)) {
    notFound();
  }

  const cat = CATEGORIES[category];
  const list = servicesInCategory(category);
  const faqs = FAQ_BY_CATEGORY[category] || [];
  const related = relatedServices(category, 3);

  return (
    <>
      <ServiceSchema services={list} />
      <div className="min-h-screen bg-cream pb-24">
        <section className="border-b border-rose-gold/15 bg-gradient-to-b from-cream-dark/90 via-cream to-cream px-4 py-12 md:py-16">
          <div className="mx-auto max-w-4xl">
            <nav className="text-xs font-medium text-charcoal/55" aria-label="Breadcrumb">
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
            <h1 className="mt-2 font-display text-4xl text-ink md:text-5xl">{cat.label}</h1>
            <p className="mt-3 max-w-2xl text-charcoal/75">{cat.description}</p>
            <p className="mt-2 text-sm font-semibold text-rose-gold">
              ${minPriceInCategory(category)}+ · Phoenix, AZ
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>

          {faqs.length > 0 && (
            <section className="mt-16 rounded-2xl border border-rose-gold/20 bg-surface/90 p-6 shadow-sm shadow-rose-gold/5 backdrop-blur-sm md:p-10">
              <h2 className="font-display text-2xl text-ink">FAQ</h2>
              <ul className="mt-6 space-y-6">
                {faqs.map((f) => (
                  <li key={f.q}>
                    <h3 className="font-semibold text-charcoal">{f.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{f.a}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mt-16">
            <h2 className="font-display text-2xl text-ink">You may also like</h2>
            <p className="mt-1 text-sm text-charcoal/60">Popular picks from other categories</p>
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
              ← All services
            </Link>
            <Link
              href="/booking"
              className="inline-flex rounded-full bg-charcoal px-6 py-2.5 text-sm font-semibold text-cream hover:bg-charcoal/90"
            >
              Book appointment
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-2 text-xs text-charcoal/50">
            {CATEGORY_NAV.filter((c) => c.key !== category).map((c) => (
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
