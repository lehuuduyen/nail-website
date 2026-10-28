import { Link } from '@/i18n/navigation';
import { Instagram, Facebook, Youtube, Star, MapPin, Phone, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { salonName, salonHours, salonMapsUrl, salonGoogleReviewUrl } from '@/lib/salon';
import TrackedLink from '@/components/analytics/TrackedLink';

/**
 * Ft1 · Mast-headed (design.md § Macrostructure families).
 *
 * The wordmark and tagline anchor one horizontal band; the NAP block sits beside
 * it; links, social and copyright close the page in small type under a hairline.
 *
 * This replaces Ft3 — three columns of links, a row of bordered social circles,
 * a centred copyright tail — which anti-patterns.md names "the AI footer": the
 * shape is genre-blind, identical on a salon and a B2B SaaS.
 *
 * Deliberate deviation from pure Ft1, recorded in design.md: the service link row
 * stays. Ft1 would allow "two or three small links", but internal links from a
 * site-wide footer to the service pages are a real local-SEO signal on this site,
 * so they are kept — compressed into one inline row rather than a column index.
 *
 * Contrast: the vein is only 3.57:1 on this dark band, so every accent here is
 * --color-gold (7.42:1) and secondary copy is --color-ink-on-dark-2 (10.37:1).
 */

const SOCIAL = [
  {
    href: 'https://www.instagram.com/nicenailsandspaphoenix?igsh=MW1ldGJ0aGUzeXFrbA==',
    label: 'Instagram',
    Icon: Instagram,
  },
  {
    href: 'https://www.facebook.com/nicenailsandspaphoenix',
    label: 'Facebook',
    Icon: Facebook,
  },
  {
    href: 'https://www.youtube.com/@DailyNailInspoChannel',
    label: 'YouTube',
    Icon: Youtube,
  },
];

export default function Footer() {
  const t = useTranslations('footer');
  const name = salonName();
  const phone = process.env.NEXT_PUBLIC_SALON_PHONE || '';
  const address = process.env.NEXT_PUBLIC_SALON_ADDRESS || '';
  const hours = salonHours();
  const maps = salonMapsUrl();
  const reviewUrl = salonGoogleReviewUrl();
  const tel = phone.replace(/\D/g, '');

  const quietLink =
    'whitespace-nowrap text-on-dark-2 transition-colors duration-short ease-out hover:text-gold';

  return (
    <footer className="border-t border-rule-dark bg-paper-dark text-on-dark">
      {/* The band. Asymmetric on purpose — the mast gets the wider track. */}
      <div className="mx-auto grid max-w-6xl gap-xl px-4 py-2xl md:grid-cols-[1.4fr_1fr] md:gap-2xl md:px-6">
        <div>
          <p className="font-display text-step-2xl leading-tight text-on-dark">{name}</p>
          <p className="mt-sm max-w-[42ch] text-step-md leading-relaxed text-on-dark-2">
            {t('tagline')}
          </p>
          <p lang="en" className="mt-sm text-step-sm leading-relaxed text-on-dark-2">
            Nice Nails &amp; Spa — Operated by D &amp; C NAILS SPA LLC
          </p>
        </div>

        {/* NAP — name, address, phone. Kept verbatim: it is the local-SEO anchor. */}
        <address className="grid gap-sm text-step-sm not-italic">
          <div className="flex gap-xs">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
            {maps ? (
              <TrackedLink
                href={maps}
                target="_blank"
                rel="noopener noreferrer"
                event="directions_click"
                eventParams={{ location: 'footer' }}
                className="text-on-dark-2 transition-colors duration-short ease-out hover:text-gold"
              >
                {address}
              </TrackedLink>
            ) : (
              <span className="text-on-dark-2">{address}</span>
            )}
          </div>
          <div className="flex gap-xs">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
            {tel ? (
              <TrackedLink
                href={`tel:${tel}`}
                event="call_click"
                eventParams={{ location: 'footer' }}
                className="tnum text-on-dark-2 transition-colors duration-short ease-out hover:text-gold"
              >
                {phone}
              </TrackedLink>
            ) : (
              <span className="tnum text-on-dark-2">{phone}</span>
            )}
          </div>
          <div className="flex gap-xs">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
            <span className="tnum text-on-dark-2">{hours}</span>
          </div>
        </address>
      </div>

      {/* Close the page: one inline link row, social beside it, copyright below. */}
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <hr className="border-0 border-t border-rule-dark" />
        <div className="flex flex-col gap-lg py-lg md:flex-row md:items-center md:justify-between">
          <nav aria-label={t('explore')} className="flex flex-wrap gap-x-lg gap-y-sm text-step-sm">
            <Link href="/services" className={quietLink}>
              {t('services')}
            </Link>
            <Link href="/specials" className={quietLink}>
              {t('specials')}
            </Link>
            <Link href="/gallery" className={quietLink}>
              {t('gallery')}
            </Link>
            <Link href="/blog" className={quietLink}>
              {t('blog')}
            </Link>
            <Link href="/booking" className={quietLink}>
              {t('bookOnline')}
            </Link>
            <Link href="/privacy" className={quietLink}>
              {t('privacy')}
            </Link>
            <Link href="/terms" className={quietLink}>
              {t('terms')}
            </Link>
          </nav>

          {/* Icons, not emoji: a ⭐ glyph renders differently on every OS and breaks
              the stroke voice of the Lucide set used everywhere else (gate 30). */}
          <div className="flex items-center gap-xs">
            {SOCIAL.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-pill text-on-dark-2 transition-colors duration-short ease-out hover:text-gold"
              >
                <Icon size={18} aria-hidden />
              </a>
            ))}
            {reviewUrl ? (
              <a
                href={reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('reviewUs')}
                className="flex min-h-11 items-center gap-2xs whitespace-nowrap rounded-pill px-sm text-step-sm font-semibold text-on-dark-2 transition-colors duration-short ease-out hover:text-gold"
              >
                <Star size={16} aria-hidden />
                Google
              </a>
            ) : null}
          </div>
        </div>
        <hr className="border-0 border-t border-rule-dark" />
        <p className="py-lg text-step-xs text-on-dark-2">
          © {new Date().getFullYear()} {name}. {t('rights')}
        </p>
      </div>
    </footer>
  );
}
