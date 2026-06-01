export const metadata = {
  title: 'Gallery | Nice Nails & Spa',
  description: 'Browse our nail art, manicures, pedicures, and more.',
  openGraph: {
    title: 'Nail Art Gallery | Nice Nails & Spa Phoenix',
    description: 'Browse our nail art, manicures, pedicures, and spa services — Nice Nails & Spa in North Phoenix AZ.',
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
