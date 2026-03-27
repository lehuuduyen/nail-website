import Link from 'next/link';
import { Instagram, Facebook, MapPin, Phone, Clock } from 'lucide-react';
import { salonName, salonHours, salonMapsUrl } from '@/lib/salon';

export default function Footer() {
  const name = salonName();
  const phone = process.env.NEXT_PUBLIC_SALON_PHONE || '';
  const address = process.env.NEXT_PUBLIC_SALON_ADDRESS || '';
  const hours = salonHours();
  const maps = salonMapsUrl();
  const tel = phone.replace(/\D/g, '');

  return (
    <footer className="border-t border-rose-gold/20 bg-charcoal text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3 md:px-6">
        <div>
          <p className="font-display text-2xl text-cream">{name}</p>
          <p className="mt-2 text-sm leading-relaxed text-cream">
            Quality products, skilled hands, and a relaxing space — appointments & walk-ins welcome.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <p className="font-semibold text-rose-gold">Explore</p>
          {/* <Link href="/#about" className="hover:text-rose-gold">
            About
          </Link> */}
          <Link href="/services" className="hover:text-rose-gold">
            Services
          </Link>
          <Link href="/gallery" className="hover:text-rose-gold">
            Gallery
          </Link>
          <Link href="/blog" className="hover:text-rose-gold">
            Blog
          </Link>
          <Link href="/booking" className="hover:text-rose-gold">
            Book online
          </Link>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-rose-gold" />
            {maps ? (
              <a href={maps} target="_blank" rel="noopener noreferrer" className="hover:text-rose-gold">
                {address}
              </a>
            ) : (
              <span>{address}</span>
            )}
          </div>
          <div className="flex gap-2">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-rose-gold" />
            {tel ? (
              <a href={`tel:${tel}`} className="hover:text-rose-gold">
                {phone}
              </a>
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
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 p-2 hover:border-rose-gold hover:text-rose-gold"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 p-2 hover:border-rose-gold hover:text-rose-gold"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://yelp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 px-3 py-2 text-xs font-bold hover:border-rose-gold hover:text-rose-gold"
            >
              Yelp
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-cream/85">
        © {new Date().getFullYear()} {name}. All rights reserved.
      </div>
    </footer>
  );
}
