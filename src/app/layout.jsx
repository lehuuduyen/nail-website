import { Playfair_Display, Lato } from 'next/font/google';
import './globals.css';
import LocalBusinessJsonLd from '@/components/LocalBusinessJsonLd';
import { HERO_IMAGE } from '@/lib/siteImages';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingBookBtn from '@/components/FloatingBookBtn';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
  display: 'swap',
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

/** Bump NEXT_PUBLIC_ICON_VERSION sau mỗi lần đổi favicon để trình duyệt không dùng bản cache cũ. */
const iconV = process.env.NEXT_PUBLIC_ICON_VERSION;
const iconQ = iconV ? `?v=${encodeURIComponent(iconV)}` : '';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Nice Nails & Spa | Nail Salon Phoenix AZ',
    template: '%s | Nice Nails & Spa Phoenix',
  },
  description:
    'Premier nail salon in Phoenix, AZ. Manicure, pedicure, acrylic & gel nails, eyelash extensions, head spa & facial. Book online!',
  keywords: [
    'nail salon Phoenix',
    'manicure phoenix az',
    'pedicure phoenix',
    'acrylic nails phoenix',
    'gel nails phoenix az',
    'eyelash extensions phoenix',
    'head spa phoenix',
    'nail salon near me',
  ],
  authors: [{ name: 'Nice Nails & Spa' }],
  creator: 'Nice Nails & Spa',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl.replace(/\/$/, ''),
    siteName: 'Nice Nails & Spa',
    title: 'Nice Nails & Spa | Nail Salon Phoenix AZ',
    description:
      'Nice Nails & Spa - Manicure, Pedicure, Acrylic & Gel nails in Phoenix AZ. Book online!',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nice Nails & Spa | Phoenix AZ',
    description: 'Manicure, pedicure, gel, lashes, head spa & more — book online.',
  },
  ...(googleVerification
    ? { verification: { google: googleVerification } }
    : {}),
  icons: {
    icon: [
      { url: `/favicon.ico${iconQ}`, sizes: '32x32' },
      { url: `/favicon-16x16.png${iconQ}`, sizes: '16x16', type: 'image/png' },
      { url: `/favicon-32x32.png${iconQ}`, sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: `/apple-touch-icon.png${iconQ}`, sizes: '180x180', type: 'image/png' }],
    other: [
      {
        rel: 'icon',
        url: `/android-chrome-192x192.png${iconQ}`,
        sizes: '192x192',
        type: 'image/png',
      },
      {
        rel: 'icon',
        url: `/android-chrome-512x512.png${iconQ}`,
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
};

const heroImageType = HERO_IMAGE.src.endsWith('.webp')
  ? 'image/webp'
  : HERO_IMAGE.src.endsWith('.png')
    ? 'image/png'
    : 'image/jpeg';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://maps.google.com" />
        <link rel="preconnect" href="https://maps.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="image"
          href={HERO_IMAGE.src}
          type={heroImageType}
          fetchPriority="high"
        />
        <LocalBusinessJsonLd />
      </head>
      <body className="min-h-screen bg-cream font-sans antialiased text-ink" suppressHydrationWarning>
        <Navbar />
        <main className="pt-[72px]">{children}</main>
        <Footer />
        <FloatingBookBtn />
      </body>
    </html>
  );
}
