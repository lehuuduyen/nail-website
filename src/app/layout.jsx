import { Playfair_Display, Lato } from 'next/font/google';
import './globals.css';
import LocalBusinessJsonLd from '@/components/LocalBusinessJsonLd';
import SiteJsonLd from '@/components/SiteJsonLd';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingBookBtn from '@/components/FloatingBookBtn';
import BottomTabBar from '@/components/BottomTabBar';
import AnnouncementBar from '@/components/AnnouncementBar';
import { getPromos } from '@/lib/serverPromos';
import { pickFeatured } from '@/lib/promos';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
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
    images: [
      {
        url: '/images/hero-luxury-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Nice Nails & Spa — Nail Salon in Phoenix AZ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nice Nails & Spa | Phoenix AZ',
    description: 'Manicure, pedicure, gel, lashes, head spa & more — book online.',
  },
  ...(googleVerification
    ? { verification: { google: googleVerification } }
    : {}),
  other: {
    'facebook-domain-verification': 'obr6q7f0psklcy3o8j14vvcbvf4w7k',
  },
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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover', // let content extend under the notch; safe-area insets handle padding
  themeColor: '#3D3836', // matches the charcoal navbar / bottom tab bar → app-like status bar
};

export default async function RootLayout({ children }) {
  const featuredPromo = pickFeatured(await getPromos());
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`} suppressHydrationWarning>
      <head />
      <body
        className="min-h-screen bg-cream font-sans antialiased text-ink pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0"
        suppressHydrationWarning
      >
        <SiteJsonLd />
        <LocalBusinessJsonLd />
        <div className="sticky top-0 z-50">
          <AnnouncementBar promo={featuredPromo} />
          <Navbar />
        </div>
        <main>{children}</main>
        <Footer />
        <FloatingBookBtn />
        <BottomTabBar />
      </body>
    </html>
  );
}
