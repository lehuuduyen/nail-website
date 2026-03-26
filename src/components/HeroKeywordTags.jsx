import Link from 'next/link';

const TAGS = [
  { label: '💅 Nail Salon Near Me', href: '/services' },
  { label: '✨ Manicure Phoenix AZ', href: '/services/manicure' },
  { label: '🦶 Pedicure Phoenix AZ', href: '/services/pedicure' },
  { label: '💎 Acrylic Nails Phoenix', href: '/services/nails' },
  { label: '🌸 Dip Powder Nails', href: '/services/nails' },
  { label: '👁️ Lash Extensions Phoenix', href: '/services/lash' },
  { label: '🧖 Head Spa Phoenix', href: '/services/head_spa' },
  { label: '✨ Gel Nails Phoenix', href: '/services/nails' },
  { label: '🌿 Nail Salon 85021', href: '/services' },
  { label: '💆 Spa Pedicure Near Me', href: '/services/pedicure' },
  { label: '🎨 Nail Art Phoenix', href: '/services/nails' },
  { label: '👶 Kids Nail Salon Phoenix', href: '/services/kids' },
  { label: '🌟 Ombré Nails Phoenix', href: '/services/nails' },
  { label: '💋 Waxing Near Me Phoenix', href: '/services/waxing' },
  { label: '✨ Facial Phoenix AZ', href: '/services/facial' },
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
