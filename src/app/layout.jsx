import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingBookBtn from '@/components/FloatingBookBtn';
import LocalBusinessJsonLd from '@/components/LocalBusinessJsonLd';
import 'react-datepicker/dist/react-datepicker.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm',
  display: 'swap',
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-cream font-sans antialiased text-ink">
        <LocalBusinessJsonLd />
        <Navbar />
        <main className="pt-[72px]">{children}</main>
        <Footer />
        <FloatingBookBtn />
      </body>
    </html>
  );
}
