import Link from 'next/link';
import { absoluteUrl } from '@/lib/siteUrl';

const TITLE = 'Nail Art & Custom Designs Phoenix AZ | Nice Nails & Spa';
const DESCRIPTION =
  'Nail art, rhinestones, French add-ons & custom designs in North Phoenix. Book nail art with your manicure or gel service at Nice Nails & Spa.';

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/services/nail-art-phoenix-az' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl('/services/nail-art-phoenix-az'),
  },
};

export default function NailArtPhoenixAzPage() {
  const salon = process.env.NEXT_PUBLIC_SALON_NAME || 'Nice Nails & Spa';
  const phone = process.env.NEXT_PUBLIC_SALON_PHONE || '';
  const telHref = phone ? `tel:${phone.replace(/\D/g, '')}` : '#';

  return (
    <div className="min-h-screen bg-cream pb-24">
      <article className="border-b border-rose-gold/15 bg-gradient-to-b from-cream-dark/90 via-cream to-cream px-4 py-14 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
            {salon}
          </p>
          <h1 className="mt-3 font-display text-4xl tracking-tight text-ink md:text-5xl">
            Nail art &amp; custom designs in Phoenix, AZ
          </h1>
          <p className="mt-4 text-base leading-relaxed text-charcoal md:text-lg">
            From rhinestones and French upgrades to line art and seasonal accents—our North Phoenix team
            builds nail art that fits your event calendar. Pair art with manicures, gel, or enhancements
            from our full{' '}
            <Link href="/services" className="font-medium text-rose-gold underline decoration-rose-gold/40">
              services menu
            </Link>
            , or browse{' '}
            <Link
              href="/services/addon"
              className="font-medium text-rose-gold underline decoration-rose-gold/40"
            >
              add-ons
            </Link>{' '}
            like rhinestones and shiny buffing.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/booking"
              className="rounded-full bg-charcoal px-8 py-3 text-sm font-semibold text-cream shadow-md transition hover:bg-charcoal/90"
            >
              Book online
            </Link>
            <Link
              href="/services/manicure"
              className="rounded-full border-2 border-charcoal/25 px-8 py-3 text-sm font-semibold text-charcoal transition hover:bg-dusty-rose/25"
            >
              Manicure menu
            </Link>
            {phone && (
              <a
                href={telHref}
                className="rounded-full border-2 border-rose-gold/50 px-8 py-3 text-sm font-semibold text-rose-gold transition hover:bg-rose-gold/10"
              >
                Call {phone}
              </a>
            )}
          </div>
        </div>
      </article>

      <div className="mx-auto max-w-3xl px-4 py-14 text-sm leading-relaxed text-charcoal md:text-base">
        <h2 className="font-display text-2xl text-ink md:text-3xl">Plan your nail art visit</h2>
        <ul className="mt-4 list-inside list-disc space-y-2 marker:text-rose-gold">
          <li>Bring inspiration photos so we can quote time and pricing before we start.</li>
          <li>Gel and builder options often help intricate art last longer in Arizona heat.</li>
          <li>Combine nail art with dip, acrylic, or natural nails—ask what works best for your length.</li>
        </ul>
      </div>
    </div>
  );
}
