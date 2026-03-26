import Link from 'next/link';
import {
  CATEGORIES,
  servicesInCategory,
  relatedServices,
  CATEGORY_NAV,
} from '@/data/services';
import ServiceCard from '@/components/ServiceCard';
import ServiceSchema from '@/components/ServiceSchema';
import NailsSeoSchemas, { NAILS_SEO_FAQS } from '@/components/NailsSeoSchemas';
import { absoluteUrl } from '@/lib/siteUrl';

const CATEGORY = 'nails';
const TITLE =
  'Acrylic Nails & Gel Nails Phoenix AZ | Dip Powder, Ombré | Nice Nails & Spa';
const DESCRIPTION =
  'Acrylic nails, gel nails, dip powder & ombré in North Phoenix AZ 85021. Full sets from $40, fill-ins from $35. Book your nail appointment today!';

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

export default function NailsServicesPage() {
  const cat = CATEGORIES[CATEGORY];
  const list = servicesInCategory(CATEGORY);
  const related = relatedServices(CATEGORY, 3);

  return (
    <>
      <ServiceSchema services={list} />
      <NailsSeoSchemas />
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
            <h1 className="mt-2 font-display text-4xl text-ink md:text-5xl">
              Acrylic Nails &amp; Gel Nails in Phoenix AZ
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
          <p className="text-base leading-relaxed text-charcoal/80 md:text-lg">
            Whether you are searching for <strong>acrylic nails Phoenix AZ</strong> guests trust for
            length and durability, or <strong>gel nails Phoenix</strong> lovers want for glossy,
            flexible wear, Nice Nails &amp; Spa in <strong>North Phoenix</strong> has you covered. We
            sculpt <strong>nail extensions Phoenix AZ 85021</strong> clients love—from natural overlays
            to bold lengths—while keeping structure balanced between visits. Curious about <strong>dip powder nails North Phoenix</strong> fans rave about?
            Dip adds layered color with a lightweight feel and is a great alternative when you want
            strength without traditional liquid-and-powder acrylic. A <strong>full set</strong> builds
            your enhancement from scratch with tips or forms, perfect for first-time guests or a full
            redesign. A <strong>fill-in</strong> maintains your existing set: we blend new product at
            the growth area, rebalance stress points, and refresh polish or art so you leave with even
            structure and a polished silhouette—both paths protect natural nails while you enjoy length or
            color. Style-wise, we offer <strong>ombré</strong> fades,{' '}
            <strong>marble</strong> veining, classic <strong>pink &amp; white</strong>, crisp{' '}
            <strong>French tip</strong> and white-tip looks, and <strong>Gel-X</strong> soft extensions
            when you want a soak-off gel system with a natural taper. We consult on length, shape, and
            lifestyle so your set photographs beautifully. Book online or walk in anytime.
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
            <p className="mt-2 text-sm text-charcoal/65">
              Quick guide for common searches—your nail tech will personalize the recommendation at
              check-in.
            </p>
            <div className="mt-8 space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-charcoal">Acrylic nails</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/75">
                  Liquid monomer and polymer powder create a hard, customizable enhancement ideal for
                  dramatic length, sculpted shapes, and intricate nail art. Acrylic is extremely versatile
                  and stays a salon favorite when you want maximum structure and long wear between
                  fill-ins.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-charcoal">Gel nails</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/75">
                  Gel systems cure under UV or LED light for a flexible, high-gloss finish that resists
                  chips on natural nails or extensions. Many guests choose gel polish upgrades on
                  acrylic or dip, or Gel-X-style extensions when they prefer a softer, soak-off option with
                  a refined profile.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-charcoal">Dip powder nails</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/75">
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
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{f.a}</p>
                </li>
              ))}
            </ul>
          </section>

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

          <div className="mt-10 flex flex-wrap gap-2 text-xs text-charcoal/50">
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
