import { Link } from '@/i18n/navigation';

const TAGS = [
  { label: 'Manicure', href: '/services/manicure' },
  { label: 'Pedicure', href: '/services/pedicure' },
  { label: 'Acrylic & Gel Nails', href: '/services/nails' },
  { label: 'Lash Extensions', href: '/services/lash' },
  { label: 'Waxing', href: '/services/waxing' },
  { label: 'View All Services', href: '/services' },
];

export default function HeroKeywordTags() {
  return (
    <div className="w-full overflow-x-auto scrollbar-none py-3 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-max gap-2">
        {TAGS.map((tag) => (
          <Link
            key={tag.label}
            href={tag.href}
            className="whitespace-nowrap rounded-full border border-[#e2d9cc] bg-white px-4 py-1.5 font-sans text-xs font-medium text-[#5c4a38] no-underline shadow-sm transition hover:border-[#D4AF37] hover:bg-[#fdf8f0] hover:text-[#8B6914]"
          >
            {tag.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
