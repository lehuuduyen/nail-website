import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { SERVICE_CARD_IMAGES, WHY_LOVE_IMAGES } from '@/lib/siteImages';

/**
 * Split Studio block 1 (design.md § Macrostructure families).
 *
 * Was: a centred display head, a diamond ornament divider, then three
 * equal-height cards in a 3-column grid — each card a bordered panel holding
 * another bordered panel, with shadow-lg on all three. That exact shape ran on
 * five consecutive sections of this page; anti-patterns.md names the ingredients
 * "the 3-column feature grid", "card-in-card" and "centred everything".
 *
 * Now: a hanging head (S2) over two diptych rows that alternate direction —
 * proof beside photograph, then photograph beside proof. The rating is set as
 * display type rather than boxed in a card, because a 4.9 is worth reading as a
 * number, not as a tile.
 *
 * Also removed: six raw hex values (#f5e8ec, #c9a96e, #D4AF37, #e8ddd9, #f0e4e8,
 * #8B6914), two ✦ glyphs standing in for an icon (gate 30), a four-stop gradient
 * pill at 3.42:1, two dead absolutely-positioned overlay divs (one pointed at no
 * image at all), and four per-card framer-motion reveals — the project is capped
 * at three motion primitives and `reveal` is the one that covers this.
 *
 * Dropping framer-motion here also turns the section back into a server
 * component; only the small Reveal wrappers ship JS.
 */

function GoogleLogo({ className = 'h-6 w-6' }) {
  // Google's mark is a brand asset and must keep its own four brand colours —
  // recolouring it to the palette would misrepresent the source of the rating.
  return (
    <svg className={className} viewBox="0 0 24 24" role="img" aria-label="Google">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function Stars() {
  return (
    <span className="flex gap-3xs text-gold" aria-hidden>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className="h-4 w-4 fill-current" strokeWidth={0} />
      ))}
    </span>
  );
}

export default function WhyLoveSection({ reviewCount = '700', rating = '4.9' }) {
  const t = useTranslations('home.whyLove');
  const manicureImg = SERVICE_CARD_IMAGES.manicure;

  return (
    <section id="why-love" className="marble-bg scroll-mt-24 pb-2xl pt-3xl md:pb-3xl">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <header className="head-hang">
          <h2>{t('heading')}</h2>
        </header>

        {/* Row A — proof left, photograph right */}
        <Reveal
          as="div"
          index={0}
          className="grid items-center gap-xl md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-2xl"
        >
          <div>
            <GoogleLogo className="h-7 w-7" />
            <p className="tnum mt-md font-display text-step-3xl leading-none text-ink">{rating}</p>
            <div className="mt-sm">
              <Stars />
            </div>
            <p className="tnum mt-sm text-step-md text-ink-2">
              {t('happyClients', { count: reviewCount })}
            </p>
            <Link href="/booking" className="link-type mt-lg">
              {t('bookThis')} →
            </Link>
          </div>

          <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-card bg-paper-2">
            <Image
              src={WHY_LOVE_IMAGES.salonInterior.src}
              alt={t('imgAltInterior')}
              title={t('imgTitleInterior')}
              fill
              loading="lazy"
              quality={65}
              className="object-cover"
              sizes="(max-width: 767px) 100vw, 640px"
            />
          </figure>
        </Reveal>

        <hr className="rule-hair my-2xl" />

        {/* Row B — direction flips: photograph left, the two quotes right */}
        <Reveal
          as="div"
          index={1}
          className="grid items-center gap-xl md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-2xl"
        >
          <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-card bg-paper-2 md:order-1">
            <Image
              src={WHY_LOVE_IMAGES.manicure.src}
              alt={t('imgAltManicure')}
              fill
              loading="lazy"
              quality={65}
              className="object-cover"
              sizes="(max-width: 767px) 100vw, 640px"
            />
          </figure>

          {/* Typographic pull-quotes on a hairline, not quote cards. Italic is
              allowed here: this is body copy, never a heading. */}
          <div className="md:order-2">
            <blockquote className="border-l border-accent pl-lg">
              <p className="font-display text-step-lg italic leading-relaxed text-ink">
                “{t('quote1')}”
              </p>
              <footer className="mt-sm text-step-sm font-semibold text-ink-2">Jessica T.</footer>
            </blockquote>

            <blockquote className="mt-xl border-l border-accent pl-lg">
              <p className="font-display text-step-md italic leading-relaxed text-ink">
                “{t('quote2')}”
              </p>
              <footer className="mt-sm text-step-sm font-semibold text-ink-2">Emma M.</footer>
            </blockquote>

            <figure className="relative mt-xl hidden aspect-[16/9] w-full overflow-hidden rounded-card bg-paper-2 lg:block">
              <Image
                src={manicureImg.src}
                alt={manicureImg.alt}
                fill
                loading="lazy"
                quality={65}
                className="object-cover"
                sizes="380px"
              />
            </figure>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
