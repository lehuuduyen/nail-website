import Link from 'next/link';

export const metadata = {
  title: 'Gel Nails in Phoenix, AZ | Nice Nails & Spa',
  description:
    'Long-lasting gel manicures in North Phoenix — Nice Nails & Spa. Book gel nails online; walk-ins welcome.',
  alternates: {
    canonical: '/services/gel-nails-phoenix',
  },
};

export default function GelNailsPhoenixPage() {
  const salon = process.env.NEXT_PUBLIC_SALON_NAME || 'Nice Nails & Spa';
  const phone = process.env.NEXT_PUBLIC_SALON_PHONE || '';
  const telHref = phone ? `tel:${phone.replace(/\D/g, '')}` : '#';

  return (
    <div className="min-h-screen bg-cream pb-24">
      <article className="border-b border-rose-gold/15 bg-gradient-to-b from-cream-dark/90 via-cream to-cream px-4 py-14 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-charcoal/55">
            {salon}
          </p>
          <h1 className="mt-3 font-display text-4xl tracking-tight text-ink md:text-5xl">
            Gel nails in Phoenix, AZ
          </h1>
          <p className="mt-4 text-base leading-relaxed text-charcoal/75 md:text-lg">
            Durable shine, chip-resistant wear, and polished finishes — our gel manicures and gel-related
            services are performed at our North Phoenix location. Pair with a pedicure or browse our full{' '}
            <Link href="/services" className="font-medium text-rose-gold underline decoration-rose-gold/40">
              services menu
            </Link>
            .
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/booking"
              className="rounded-full bg-charcoal px-8 py-3 text-sm font-semibold text-cream shadow-md transition hover:bg-charcoal/90"
            >
              Book online
            </Link>
            <Link
              href="/services"
              className="rounded-full border-2 border-charcoal/25 px-8 py-3 text-sm font-semibold text-charcoal transition hover:bg-dusty-rose/25"
            >
              All services
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

      <div className="mx-auto max-w-3xl px-4 py-14 text-sm leading-relaxed text-charcoal/80 md:text-base">
        <h2 className="font-display text-2xl text-ink md:text-3xl">Why clients choose gel</h2>
        <ul className="mt-4 list-inside list-disc space-y-2 marker:text-rose-gold">
          <li>Flexible strength and glossy finish that lasts longer than regular polish.</li>
          <li>Ideal before events, travel, or whenever you want low-maintenance color.</li>
          <li>Ask our team about gel manicures, overlays, and combinations with spa services.</li>
        </ul>
      </div>
    </div>
  );
}
