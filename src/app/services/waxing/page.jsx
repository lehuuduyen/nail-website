import Link from 'next/link';
import {
  CATEGORIES,
  servicesInCategory,
  relatedServices,
  CATEGORY_NAV,
} from '@/data/services';
import ServiceCard from '@/components/ServiceCard';
import ServiceSchema from '@/components/ServiceSchema';
import WaxingSeoSchemas, { WAXING_SEO_FAQS } from '@/components/WaxingSeoSchemas';
import { absoluteUrl } from '@/lib/siteUrl';
import { getSalonServices } from '@/lib/serverServices';

const CATEGORY = 'waxing';
const TITLE =
  'Waxing Services Phoenix AZ | Eyebrow, Face & Body Wax | Nice Nails & Spa';
const DESCRIPTION =
  'Professional waxing in North Phoenix AZ 85021. Eyebrow wax from $12, face, chin, lip & body waxing available. Quick, clean & affordable. Book online today!';

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: '/services/waxing',
  },
  keywords: [
    'waxing Phoenix AZ',
    'eyebrow waxing North Phoenix',
    'face waxing Phoenix',
    'brow wax Phoenix AZ 85021',
    'lip wax Phoenix',
    'body waxing Phoenix',
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl('/services/waxing'),
  },
};

const WAX_AREAS = [
  {
    title: 'Eyebrow wax',
    line: 'Shape and define your brows.',
  },
  {
    title: 'Lip wax',
    line: 'Smooth upper lip in minutes.',
  },
  {
    title: 'Chin wax',
    line: 'Quick and clean.',
  },
  {
    title: 'Face wax',
    line: 'Full facial hair removal when you want an all-over smooth canvas.',
  },
  {
    title: 'Body / back wax',
    line: 'Available on request—pricing and timing depend on the area; ask when you book.',
  },
];

export default async function WaxingServicesPage() {
  const services = await getSalonServices();
  const cat = CATEGORIES[CATEGORY];
  const list = servicesInCategory(services, CATEGORY);
  const related = relatedServices(services, CATEGORY, 3);

  return (
    <>
      <ServiceSchema services={list} />
      <WaxingSeoSchemas />
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
              Waxing Services in Phoenix AZ
            </h1>
            <p className="mt-2 text-sm font-semibold text-rose-gold">
              Eyebrow wax from $12 · North Phoenix, AZ 85021
            </p>
            <nav
              className="mt-6 flex flex-wrap gap-3 text-sm font-semibold"
              aria-label="Waxing page shortcuts"
            >
              <Link
                href="/booking"
                className="rounded-full bg-charcoal px-4 py-2 text-cream transition hover:bg-charcoal/90"
              >
                Book waxing
              </Link>
              <Link
                href="/services/facial"
                className="rounded-full border-2 border-rose-gold/35 bg-surface-soft px-4 py-2 text-charcoal transition hover:bg-cream-dark/40"
              >
                Combine with a facial for full skin treatment
              </Link>
              <Link
                href="/services/lash"
                className="rounded-full border-2 border-charcoal/20 px-4 py-2 text-charcoal transition hover:border-rose-gold/40"
              >
                Pair with eyelash extensions
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
            Need <strong>waxing Phoenix AZ</strong> that fits between meetings or after your mani? Nice
            Nails &amp; Spa keeps <strong>eyebrow waxing North Phoenix</strong> guests polished with quick
            appointments and honest starting prices. Searching for <strong>face waxing Phoenix</strong> on
            the lip, chin, or cheeks—or a precise <strong>brow wax Phoenix AZ 85021</strong> before
            photos? We
            combine <strong>clean technique</strong> with <strong>skin-safe wax</strong> formulas chosen
            for sensitive desert skin. Whether you are new to waxing or maintaining a standing brow
            appointment, we walk you through aftercare so Phoenix dryness is less likely to irritate fresh
            skin. Waxing works beautifully as a <strong>fast, affordable add-on</strong>{' '}
            to nails, lashes, or facials: slip in for brows, touch up your lip line, or tackle larger{' '}
            <strong>back and body</strong> zones when you give us a heads-up at booking. Areas we cover
            include <strong>eyebrow</strong>, <strong>lip</strong>, <strong>chin</strong>, broader{' '}
            <strong>face</strong> options, and <strong>body</strong> services on request—pricing follows
            the area so you always know what to expect at check-in.
          </p>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-12 md:px-6">
          <section
            className="rounded-2xl border border-rose-gold/20 bg-surface/90 p-6 shadow-sm shadow-rose-gold/5 backdrop-blur-sm md:p-10"
            aria-labelledby="waxing-areas-heading"
          >
            <h2
              id="waxing-areas-heading"
              className="font-display text-2xl text-ink md:text-3xl"
            >
              Waxing areas we serve
            </h2>
            <p className="mt-2 text-sm text-charcoal">
              Starting prices begin at $12; combined face and body services are quoted by zone.
            </p>
            <ul className="mt-8 space-y-5">
              {WAX_AREAS.map((a) => (
                <li key={a.title}>
                  <h3 className="font-semibold text-charcoal">{a.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-charcoal">{a.line}</p>
                </li>
              ))}
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
              {WAXING_SEO_FAQS.map((f) => (
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
              Book waxing
            </Link>
            <Link
              href="/services/facial"
              className="inline-flex rounded-full border-2 border-rose-gold/30 px-6 py-2.5 text-sm font-semibold text-charcoal hover:bg-dusty-rose/20"
            >
              Combine with a facial for full skin treatment →
            </Link>
            <Link
              href="/services/lash"
              className="inline-flex rounded-full border-2 border-charcoal/20 px-6 py-2.5 text-sm font-semibold text-charcoal hover:border-rose-gold/40"
            >
              Pair with eyelash extensions →
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
