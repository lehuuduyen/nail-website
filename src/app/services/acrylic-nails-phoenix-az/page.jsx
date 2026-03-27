import Link from 'next/link';
import { absoluteUrl } from '@/lib/siteUrl';

const TITLE = 'Acrylic Nails Phoenix AZ | Full Sets & Fills | Nice Nails & Spa';
const DESCRIPTION =
  'Acrylic full sets, fill-ins & nail enhancements in North Phoenix AZ 85021. Experienced techs, clear pricing—book acrylic nails online at Nice Nails & Spa.';

export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/services/acrylic-nails-phoenix-az' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl('/services/acrylic-nails-phoenix-az'),
  },
};

export default function AcrylicNailsPhoenixAzPage() {
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
            Acrylic nails in Phoenix, AZ
          </h1>
          <p className="mt-4 text-base leading-relaxed text-charcoal md:text-lg">
            Sculpted length, classic pink-and-white, and dependable fill schedules for busy Valley clients.
            See every enhancement we offer on the{' '}
            <Link href="/services/nails" className="font-medium text-rose-gold underline decoration-rose-gold/40">
              acrylic &amp; gel nails
            </Link>{' '}
            menu, then book the service that matches your shape and lifestyle.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/booking"
              className="rounded-full bg-charcoal px-8 py-3 text-sm font-semibold text-cream shadow-md transition hover:bg-charcoal/90"
            >
              Book acrylic nails
            </Link>
            <Link
              href="/services/nails"
              className="rounded-full border-2 border-charcoal/25 px-8 py-3 text-sm font-semibold text-charcoal transition hover:bg-dusty-rose/25"
            >
              View nail menu
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
        <h2 className="font-display text-2xl text-ink md:text-3xl">Why guests choose acrylic here</h2>
        <ul className="mt-4 list-inside list-disc space-y-2 marker:text-rose-gold">
          <li>Customizable length and shape with fills every two to three weeks for most clients.</li>
          <li>Repairs and rebalance appointments when life happens—text or call for quick guidance.</li>
          <li>Add gel color or nail art; ask how timing changes when you stack services.</li>
        </ul>
      </div>
    </div>
  );
}
