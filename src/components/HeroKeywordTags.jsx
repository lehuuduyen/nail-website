import { Link } from '@/i18n/navigation';

const TAGS = [
  { label: 'Manicure', href: '/services/manicure' },
  { label: 'Pedicure', href: '/services/pedicure' },
  { label: 'Acrylic & Gel Nails', href: '/services/nails' },
  { label: 'Lash Extensions', href: '/services/lash' },
  { label: 'Waxing', href: '/services/waxing' },
  { label: 'View All Services', href: '/services' },
];

/**
 * Internal keyword links under the hero — a real SEO asset, so every tag stays.
 * Restyled onto the tokens: the strip sits inside the hero's dark band, so these
 * were white pills carrying five raw hex values (#e2d9cc, #5c4a38, #D4AF37,
 * #fdf8f0, #8B6914) plus a pure-white fill. They are now quiet outlined chips.
 */
export default function HeroKeywordTags() {
  return (
    <div className="scrollbar-none w-full overflow-x-auto px-4 py-sm sm:px-6 lg:px-8">
      <div className="mx-auto flex w-max gap-xs">
        {TAGS.map((tag) => (
          <Link
            key={tag.label}
            href={tag.href}
            /* inline-flex, not the default inline — min-height has no effect on an
               inline box, and these need the 44px touch floor. */
            className="inline-flex min-h-11 items-center whitespace-nowrap rounded-pill border border-rule-dark px-md font-sans text-step-xs font-medium text-on-dark-2 no-underline transition-colors duration-short ease-out hover:border-gold hover:text-gold"
          >
            {tag.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
