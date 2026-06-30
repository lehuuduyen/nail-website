import { Link } from '@/i18n/navigation';
import { Instagram, Facebook, Youtube, MapPin, Phone, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { salonName, salonHours, salonMapsUrl, salonGoogleReviewUrl } from '@/lib/salon';
import TrackedLink from '@/components/analytics/TrackedLink';

export default function Footer() {
  const t = useTranslations('footer');
  const name = salonName();
  const phone = process.env.NEXT_PUBLIC_SALON_PHONE || '';
  const address = process.env.NEXT_PUBLIC_SALON_ADDRESS || '';
  const hours = salonHours();
  const maps = salonMapsUrl();
  const reviewUrl = salonGoogleReviewUrl();
  const tel = phone.replace(/\D/g, '');

  return (
    <footer className="border-t border-rose-gold/20 bg-charcoal text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3 md:px-6">
        <div>
          <p className="font-display text-2xl text-cream">{name}</p>
          <p className="mt-2 text-sm leading-relaxed text-cream">
            {t('tagline')}
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <p className="font-semibold text-rose-gold">{t('explore')}</p>
          <Link href="/services" className="hover:text-rose-gold">
            {t('services')}
          </Link>
          <Link href="/specials" className="hover:text-rose-gold">
            {t('specials')}
          </Link>
          <Link href="/gallery" className="hover:text-rose-gold">
            {t('gallery')}
          </Link>
          <Link href="/blog" className="hover:text-rose-gold">
            {t('blog')}
          </Link>
          <Link href="/booking" className="hover:text-rose-gold">
            {t('bookOnline')}
          </Link>
          <Link href="/privacy" className="hover:text-rose-gold">
            {t('privacy')}
          </Link>
          <Link href="/terms" className="hover:text-rose-gold">
            {t('terms')}
          </Link>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-rose-gold" />
            {maps ? (
              <TrackedLink
                href={maps}
                target="_blank"
                rel="noopener noreferrer"
                event="directions_click"
                eventParams={{ location: 'footer' }}
                className="hover:text-rose-gold"
              >
                {address}
              </TrackedLink>
            ) : (
              <span>{address}</span>
            )}
          </div>
          <div className="flex gap-2">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-rose-gold" />
            {tel ? (
              <TrackedLink
                href={`tel:${tel}`}
                event="call_click"
                eventParams={{ location: 'footer' }}
                className="hover:text-rose-gold"
              >
                {phone}
              </TrackedLink>
            ) : (
              <span>{phone}</span>
            )}
          </div>
          <div className="flex gap-2">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-rose-gold" />
            <span>{hours}</span>
          </div>
          <div className="flex gap-4 pt-2">
            <a
              href="https://www.instagram.com/nicenailsandspaphoenix?igsh=MW1ldGJ0aGUzeXFrbA=="
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 p-2 hover:border-rose-gold hover:text-rose-gold"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.facebook.com/nicenailsandspaphoenix"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 p-2 hover:border-rose-gold hover:text-rose-gold"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://www.youtube.com/@DailyNailInspoChannel"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 p-2 hover:border-rose-gold hover:text-rose-gold"
              aria-label="YouTube"
            >
              <Youtube size={18} />
            </a>
            <a
              href="https://yelp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 px-3 py-2 text-xs font-bold hover:border-rose-gold hover:text-rose-gold"
            >
              Yelp
            </a>
            <a
              href={reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 px-3 py-2 text-xs font-bold hover:border-rose-gold hover:text-rose-gold"
              aria-label="Leave a Google review"
            >
              ⭐ Google
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-cream/85">
        © {new Date().getFullYear()} {name}. {t('rights')}
      </div>
    </footer>
  );
}
