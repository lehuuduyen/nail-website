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
import NailsSeoSchemas, { NAILS_SEO_FAQS } from '@/components/NailsSeoSchemas';
import { absoluteUrl } from '@/lib/siteUrl';
import { getSalonServices } from '@/lib/serverServices';

const CATEGORY = 'nails';
const TITLE =
  'Acrylic, Gel & Dip Nails in North Phoenix AZ 85021 | Nice Nails & Spa';
const DESCRIPTION =
  'Full sets from $40 in North Phoenix AZ — acrylic, gel-X, dip powder & custom nail art. The shapes & designs you want. Book online. 4.9★ 700+ reviews.';

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: '/services/nails',
  },
  keywords: [
    'acrylic nails Phoenix AZ',
    'gel nails Phoenix',
    'dip powder nails North Phoenix',
    'nail extensions Phoenix AZ 85021',
    'Gel-X Phoenix',
    'ombré nails Phoenix',
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl('/services/nails'),
  },
};

export default async function NailsServicesPage() {
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
      <NailsSeoSchemas />
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
              Acrylic, Gel &amp; Dip Nails in North Phoenix AZ
            </h1>
            <p className="mt-2 text-sm font-semibold text-rose-gold">
              Full sets from $40 · Fill-ins from $35 · North Phoenix, AZ 85021
            </p>
            <nav
              className="mt-6 flex flex-wrap gap-3 text-sm font-semibold"
              aria-label="Nails page shortcuts"
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
                Book your appointment
              </Link>
              <Link
                href="/services/addon"
                className="rounded-full border-2 border-rose-gold/35 bg-surface-soft px-4 py-2 text-charcoal transition hover:bg-cream-dark/40"
              >
                Add-ons &amp; extras
              </Link>
            </nav>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
          <p className="text-base leading-relaxed text-charcoal md:text-lg">
            For a full set that turns heads, Nice Nails &amp; Spa offers acrylic, gel, and dip powder
            nails at our North Phoenix studio. Full sets start at $40 and we build each one around the
            shape, length, and finish you want—almond, coffin, square, or stiletto, in everything from a
            clean nude to bold custom nail art. Our technicians take their time on application and
            structure so your set lasts through daily wear without lifting or cracking. Prefer a lighter
            feel? Gel-X and dip powder offer strength and shine with less bulk, and refills keep your
            look fresh between full sets. Nail art starts at $15 and up, and we are happy to recreate a
            design from a photo you bring in. Every tool is sterilized and we never reuse files or
            buffers. Book online or walk in—Saturdays and evenings book fast for full sets, so reserving
            ahead is recommended. Serving North Phoenix, Glendale, Peoria, and Deer Valley.
          </p>
        </div>

        <div className="mx-auto max-w-4xl px-4 pb-12 md:px-6">
          <section
            className="rounded-2xl border border-rose-gold/20 bg-surface/90 p-6 shadow-sm shadow-rose-gold/5 backdrop-blur-sm md:p-10"
            aria-labelledby="nails-compare-heading"
          >
            <h2
              id="nails-compare-heading"
              className="font-display text-2xl text-ink md:text-3xl"
            >
              Which nail service is right for you?
            </h2>
            <p className="mt-2 text-sm text-charcoal">
              Quick guide for common searches—your nail tech will personalize the recommendation at
              check-in.
            </p>
            <div className="mt-8 space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-charcoal">Acrylic nails</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal">
                  Liquid monomer and polymer powder create a hard, customizable enhancement ideal for
                  dramatic length, sculpted shapes, and intricate nail art. Acrylic is extremely versatile
                  and stays a salon favorite when you want maximum structure and long wear between
                  fill-ins.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-charcoal">Gel nails</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal">
                  Gel systems cure under UV or LED light for a flexible, high-gloss finish that resists
                  chips on natural nails or extensions. Many guests choose gel polish upgrades on
                  acrylic or dip, or Gel-X-style extensions when they prefer a softer, soak-off option with
                  a refined profile.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-charcoal">Dip powder nails</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal">
                  Colored powder is layered over a bonding base for durable color without brush-in
                  acrylic—often described as lightweight and quick to apply. Dip can be a great match if
                  you want strength and rich pigment with a different feel than traditional acrylic
                  sculpting.
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
              {NAILS_SEO_FAQS.map((f) => (
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
              Book your appointment
            </Link>
            <Link
              href="/services/addon"
              className="inline-flex rounded-full border-2 border-rose-gold/30 px-6 py-2.5 text-sm font-semibold text-charcoal hover:bg-dusty-rose/20"
            >
              Browse add-ons →
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

          <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted">
            <Link href="/services/acrylic-nails-phoenix-az" className="rounded-full bg-surface-soft px-3 py-1 ring-1 ring-lavender/40 hover:bg-cream-dark/40">
              Acrylic Nails in Phoenix →
            </Link>
            <Link href="/services/gel-nails-phoenix" className="rounded-full bg-surface-soft px-3 py-1 ring-1 ring-lavender/40 hover:bg-cream-dark/40">
              Gel Nails in Phoenix →
            </Link>
            <Link href="/services/nail-art-phoenix-az" className="rounded-full bg-surface-soft px-3 py-1 ring-1 ring-lavender/40 hover:bg-cream-dark/40">
              Nail Art &amp; Custom Designs →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
