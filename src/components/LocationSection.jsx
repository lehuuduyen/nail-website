import { useTranslations } from 'next-intl';
import { ArrowUpRight, Star } from 'lucide-react';
import {
  salonAddress,
  salonHours,
  salonMapsUrl,
  salonMapsEmbedUrl,
  salonPhone,
  salonGoogleReviewUrl,
} from '@/lib/salon';

/**
 * Split Studio closing block: the map holds one half, the NAP the other
 * (design.md § Macrostructure families).
 *
 * This section had drifted furthest off the brand. It used `bg-white` — a flat
 * pure white, which colour.md bans outright — and three colours from Tailwind's
 * stock palette that appear nowhere else on the site: `text-rose-400` for the
 * field labels (~2.9:1 on white), `text-rose-500` for the directions link, and
 * `text-amber-500` for the review link (~2.2:1, a clear WCAG failure on the one
 * link asking for a Google review). The ⭐ emoji beside it rendered differently
 * on every OS and broke the Lucide stroke voice used everywhere else.
 *
 * The block is now an <address>, which is what it is: the NAP that carries this
 * salon's local-search weight.
 */
export default function LocationSection() {
  const t = useTranslations('home.location');
  const address = salonAddress();
  const hours = salonHours();
  const mapsUrl = salonMapsUrl();
  const phone = salonPhone();
  const reviewUrl = salonGoogleReviewUrl();
  const embedUrl =
    salonMapsEmbedUrl() ||
    `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed&z=15`;

  const hourLines = hours
    .split('·')
    .map((h) => h.trim())
    .filter(Boolean);

  // Field label, not a section eyebrow: it names the datum beside it.
  const fieldLabel = 'text-step-xs font-semibold uppercase tracking-[0.12em] text-ink-2';

  return (
    <section
      id="location"
      className="scroll-mt-24 bg-paper px-4 py-2xl md:py-3xl"
      aria-labelledby="location-heading"
    >
      <div className="mx-auto max-w-6xl">
        <header className="head-hang !pt-0">
          <h2 id="location-heading">{t('heading')}</h2>
        </header>

        <div className="grid grid-cols-1 items-stretch gap-xl md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-2xl">
          <div className="min-h-[320px] overflow-hidden rounded-card border border-rule-soft md:min-h-[420px]">
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block', minHeight: '320px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Nice Nails & Spa location map"
            />
          </div>

          <address className="flex flex-col justify-center gap-xl not-italic">
            <div>
              <p className={fieldLabel}>{t('address')}</p>
              <p className="mt-2xs text-step-md leading-snug text-ink">{address}</p>
              <div className="mt-sm flex flex-wrap items-center gap-x-lg gap-y-xs">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-type"
                >
                  {t('getDirections')}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </a>
                <a
                  href={reviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-type"
                >
                  <Star className="h-3.5 w-3.5" fill="currentColor" aria-hidden />
                  {t('reviewGoogle')}
                </a>
              </div>
            </div>

            <div>
              <p className={fieldLabel}>{t('hours')}</p>
              {hourLines.map((line) => (
                <p key={line} className="tnum mt-2xs text-step-md text-ink">
                  {line}
                </p>
              ))}
            </div>

            <div>
              <p className={fieldLabel}>{t('phone')}</p>
              <a
                href={`tel:${phone.replace(/\D/g, '')}`}
                className="tnum mt-2xs inline-block text-step-md text-ink transition-colors duration-short ease-out hover:text-accent-ink"
              >
                {phone}
              </a>
            </div>
          </address>
        </div>
      </div>
    </section>
  );
}
