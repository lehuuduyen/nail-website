import Link from 'next/link';
import {
  CATEGORIES,
  servicesInCategory,
  relatedServices,
  CATEGORY_NAV,
} from '@/data/services';
import ServiceCard from '@/components/ServiceCard';
import ServiceSchema from '@/components/ServiceSchema';
import AddonSeoSchemas, { ADDON_SEO_FAQS } from '@/components/AddonSeoSchemas';
import { absoluteUrl } from '@/lib/siteUrl';
import { getSalonServices } from '@/lib/serverServices';

const CATEGORY = 'addon';
const TITLE =
  'Nail Add-on Services Phoenix AZ | Paraffin, Nail Art & More | Nice Nails & Spa';
const DESCRIPTION =
  'Enhance your nail service in Phoenix AZ 85021. Add paraffin dip, rhinestones, nail art, collagen socks, callus removal & more. Starting from $5. Book online!';

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: '/services/addon',
  },
  keywords: [
    'nail add-ons Phoenix AZ',
    'paraffin dip Phoenix',
    'rhinestone nails Phoenix',
    'nail art add-on North Phoenix',
    'Nice Nails & Spa add-ons',
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl('/services/addon'),
  },
};

/** Grouped by canonical `name` from the salon menu (stable across DB ids). */
const ADDON_GROUP_DEFS = [
  {
    key: 'upgrades',
    emoji: '💅',
    title: 'Color & extras',
    names: ['Additional - Thêm', 'Change Color'],
  },
  {
    key: 'relax',
    emoji: '💆',
    title: 'Massage add-on',
    names: ['Massage 10 Min'],
  },
  {
    key: 'removal',
    emoji: '✨',
    title: 'Removal',
    names: ['Take Off - Tháo Móng'],
  },
];

function buildAddonGroups(all, defs) {
  const byName = new Map(all.map((s) => [s.name, s]));
  const groups = defs.map((g) => ({
    ...g,
    services: g.names.map((n) => byName.get(n)).filter(Boolean),
  }));
  const used = new Set();
  for (const g of groups) for (const s of g.services) used.add(s.id);
  const orphans = all.filter((s) => !used.has(s.id));
  if (orphans.length) {
    groups.push({
      key: 'more',
      emoji: '➕',
      title: 'More add-ons',
      services: orphans,
    });
  }
  return groups;
}

export default async function AddonServicesPage() {
  const services = await getSalonServices();
  const cat = CATEGORIES[CATEGORY];
  const list = servicesInCategory(services, CATEGORY);
  const groups = buildAddonGroups(list, ADDON_GROUP_DEFS);
  const related = relatedServices(services, CATEGORY, 3);

  return (
    <>
      <ServiceSchema services={list} />
      <AddonSeoSchemas />
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
              Nail Enhancement Add-ons in Phoenix AZ
            </h1>
            <p className="mt-2 text-sm font-semibold text-rose-gold">
              Upgrades from $5 · Phoenix, AZ 85021
            </p>
            <nav
              className="mt-6 flex flex-wrap gap-3 text-sm font-semibold"
              aria-label="Add-on page shortcuts"
            >
              <Link
                href="/booking"
                className="rounded-full bg-charcoal px-4 py-2 text-cream transition hover:bg-charcoal/90"
              >
                Book online
              </Link>
              <Link
                href="/services/manicure"
                className="rounded-full border-2 border-rose-gold/35 bg-surface-soft px-4 py-2 text-charcoal transition hover:bg-cream-dark/40"
              >
                View Manicure services
              </Link>
              <Link
                href="/services/pedicure"
                className="rounded-full border-2 border-charcoal/20 px-4 py-2 text-charcoal transition hover:border-rose-gold/40"
              >
                View Pedicure services
              </Link>
              <Link
                href="/services/nails"
                className="rounded-full border-2 border-charcoal/15 px-4 py-2 text-charcoal transition hover:border-rose-gold/30"
              >
                View Acrylic &amp; Gel services
              </Link>
            </nav>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
          <p className="text-base leading-relaxed text-charcoal md:text-lg">
            Looking for <strong>nail add-ons Phoenix AZ</strong> locals use to level up a standard
            appointment? Nice Nails &amp; Spa in North Phoenix AZ 85021 makes it simple to bolt extras
            onto your core service. Add a warm <strong>paraffin dip Phoenix</strong> soak after shaping,
            request <strong>rhinestone nails Phoenix</strong> accents for events, or book a{' '}
            <strong>nail art add-on North Phoenix</strong> guests love for French lines and glossy buff
            finishes. <strong>Customize your manicure or pedicure</strong> with color nails, collagen
            socks, callus removal, massage, and more—<strong>mix and match</strong> treatments so you{' '}
            <strong>create your perfect look</strong> without juggling multiple salons.{' '}
            <strong>Affordable upgrades from $5</strong> keep polish experiments budget-friendly; tell us
            your combo when you reserve so we pace the clock for nails, toes, and every add-on you choose.
          </p>
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-12 md:px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            {groups.map((g) => (
              <section
                key={g.key}
                className="flex flex-col rounded-2xl border border-rose-gold/20 bg-surface/90 p-5 shadow-sm shadow-rose-gold/5 backdrop-blur-sm md:p-6"
                aria-labelledby={`addon-group-${g.key}`}
              >
                <h2
                  id={`addon-group-${g.key}`}
                  className="flex items-center gap-2 font-display text-xl text-ink md:text-2xl"
                >
                  <span className="text-2xl md:text-3xl" aria-hidden>
                    {g.emoji}
                  </span>
                  {g.title}
                </h2>
                <div className="mt-6 flex flex-1 flex-col gap-4">
                  {g.services.map((s) => (
                    <ServiceCard key={s.id} service={s} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-16 rounded-2xl border border-rose-gold/20 bg-surface/90 p-6 shadow-sm shadow-rose-gold/5 backdrop-blur-sm md:p-10">
            <h2 className="font-display text-2xl text-ink">Frequently asked questions</h2>
            <ul className="mt-6 space-y-6">
              {ADDON_SEO_FAQS.map((f) => (
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
              href="/booking"
              className="inline-flex rounded-full bg-charcoal px-6 py-2.5 text-sm font-semibold text-cream hover:bg-charcoal/90"
            >
              Book online
            </Link>
            <Link
              href="/services/manicure"
              className="inline-flex rounded-full border-2 border-rose-gold/30 px-6 py-2.5 text-sm font-semibold text-charcoal hover:bg-dusty-rose/20"
            >
              View Manicure services →
            </Link>
            <Link
              href="/services/pedicure"
              className="inline-flex rounded-full border-2 border-charcoal/20 px-6 py-2.5 text-sm font-semibold text-charcoal hover:border-rose-gold/40"
            >
              View Pedicure services →
            </Link>
            <Link
              href="/services/nails"
              className="inline-flex rounded-full border-2 border-charcoal/15 px-6 py-2.5 text-sm font-semibold text-charcoal hover:border-rose-gold/30"
            >
              View Acrylic &amp; Gel services →
            </Link>
            <Link
              href="/services"
              className="inline-flex rounded-full border-2 border-charcoal/10 px-6 py-2.5 text-sm font-semibold text-charcoal hover:border-rose-gold/25"
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
