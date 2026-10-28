import Image from 'next/image';
import { Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import TrackedLink from '@/components/analytics/TrackedLink';
import { HERO_BLUR_DATA_URL } from '@/lib/heroLcp';
import { HERO_IMAGE } from '@/lib/siteImages';

/**
 * H2 Split diptych under macrostructure 15 · Split Studio (design.md).
 * Copy holds the left half, the photograph holds the right — and the alternation
 * continues down the page in the sections below.
 *
 * What came out, and why:
 * - The frosted panel behind the buttons (bg-white/15 + backdrop-blur-md).
 *   Editorial bans glassmorphism: the medium is paper, not glass.
 * - The four ✦ sparkle glyphs floating in the image, and the three more inside
 *   the CTA. Generic emoji/glyph decoration is gate 30; they also sat on top of
 *   the photograph for no semantic reason.
 * - The shimmer sweep and two twinkle loops on the BOOK NOW button — three
 *   infinite animations on one element. Motion is capped at three primitives for
 *   the whole project, and infinite loops pull the eye and never let it go.
 * - The four-stop gold gradient on the pill. Two stops is the ceiling, and a
 *   gradient on a pill is banned under editorial; cream-on-gradient measured
 *   3.42:1 anyway. It is now a solid gold fill with an ink label at 5.34:1.
 * - The raw #100d0c / #F5F5F5 / #D4AF37 values. Everything resolves through tokens.
 *
 * What stayed: priority + fetchPriority="high" + blur placeholder on the LCP
 * image, the left-biased asymmetric composition, and both conversion actions
 * above the fold.
 */
function formatUsPhoneDisplay(raw) {
  const d = String(raw).replace(/\D/g, '');
  if (d.length === 10) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  return raw.trim() || '(602) 123-4567';
}

export default function HeroSection({ reviewCount = '700', rating = '4.9' }) {
  const t = useTranslations('hero');
  const name = process.env.NEXT_PUBLIC_SALON_NAME || 'Nice Nails & Spa';
  const rawPhone = process.env.NEXT_PUBLIC_SALON_PHONE || '(602)1234567';
  const address = process.env.NEXT_PUBLIC_SALON_ADDRESS || '8048 N 19th Ave, Phoenix, AZ 85021';
  const phoneDisplay = formatUsPhoneDisplay(rawPhone);
  const tel = `tel:${rawPhone.replace(/\D/g, '')}`;

  return (
    <section className="relative w-full overflow-hidden" suppressHydrationWarning>
      <div
        className="relative w-full min-h-[clamp(340px,88vw,540px)] overflow-hidden bg-paper-dark md:min-h-0 md:aspect-[2.15/1] lg:aspect-[2.5/1]"
        suppressHydrationWarning
      >
        <Image
          src={HERO_IMAGE.src}
          alt={t('imageAlt', { name })}
          title={t('imageTitle')}
          fill
          priority
          fetchPriority="high"
          loading="eager"
          quality={75}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={HERO_BLUR_DATA_URL}
          className="object-cover object-right"
        />
        {/* Two-stop scrim built from a token via color-mix — dark where the copy
            sits, clear where the hands and nails are. */}
        <div className="hero-scrim absolute inset-0 z-[1]" aria-hidden suppressHydrationWarning />

        <div className="absolute inset-0 z-10 flex items-center" suppressHydrationWarning>
          <div className="grid w-full grid-cols-1 items-center gap-md px-5 py-xl md:grid-cols-2 md:px-10 md:py-2xl lg:px-14">
            <div className="w-full max-w-xl text-left">
              <h1 className="font-display text-balance text-display font-semibold leading-[1.1] tracking-tight text-on-dark">
                {t('headline')}
              </h1>
              <p className="mt-sm max-w-full font-sans text-step-md font-bold leading-snug text-on-dark">
                {t('subline')}
              </p>
              <p className="mt-xs max-w-full font-sans text-step-sm leading-relaxed text-on-dark-2">
                {address}
              </p>

              {/* Two actions, no container. Primary gold, secondary outlined. */}
              <div className="mt-lg flex w-full min-w-0 flex-col gap-sm sm:mt-xl sm:max-w-md sm:flex-row">
                <TrackedLink
                  href="/booking"
                  event="book_click"
                  eventParams={{ location: 'hero' }}
                  className="btn-gold min-w-0 flex-1"
                >
                  {t('bookNow')}
                </TrackedLink>
                <TrackedLink
                  href={tel}
                  event="call_click"
                  eventParams={{ location: 'hero' }}
                  className="btn-quiet tnum min-w-0 flex-1 border-gold-pale/60 text-on-dark"
                >
                  <Phone className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
                  {phoneDisplay}
                </TrackedLink>
              </div>

              {/* Real figures from the Google Places fetch — never rounded up. */}
              <p className="tnum mt-md flex flex-wrap items-center gap-x-xs gap-y-3xs font-sans text-step-xs text-on-dark-2 sm:mt-lg">
                <span>{t('ratingLabel', { rating })}</span>
                <span aria-hidden>·</span>
                <span>{t('clientsLabel', { count: reviewCount })}</span>
              </p>
            </div>
            <div className="hidden min-h-[1px] md:block" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
