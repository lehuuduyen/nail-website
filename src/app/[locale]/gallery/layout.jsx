import { untranslatedMeta } from '@/lib/i18nMeta';

const metadata = {
  title: { absolute: 'Nail Art Gallery Phoenix AZ | Nice Nails & Spa' },
  description:
    'Browse real photos of nail art, manicures, pedicures, acrylic nails, gel sets, eyelash extensions & head spa from Nice Nails & Spa in North Phoenix AZ 85021.',
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Nail Art Gallery Phoenix AZ | Nice Nails & Spa',
    description:
      'Real client photos — nail art, manicures, pedicures, acrylic & gel nails, lashes, head spa. Nice Nails & Spa, North Phoenix AZ 85021.',
    url: '/gallery',
    images: [
      {
        url: '/images/popular-nail-art.webp',
        width: 1200,
        height: 630,
        alt: 'Nail art gallery — Nice Nails & Spa Phoenix AZ',
      },
    ],
  },
};

export default function GalleryLayout({ children }) {
  return children;
}

export async function generateMetadata({ params: { locale } }) {
  return { ...metadata, ...untranslatedMeta(locale, '/gallery') };
}
