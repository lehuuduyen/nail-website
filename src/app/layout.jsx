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

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Nice Nails & Spa | Nail Salon Phoenix AZ',
  description:
    'Nice Nails & Spa - Manicure, Pedicure, Acrylic & Gel nails in Phoenix AZ. Book online!',
  keywords:
    'nail salon Phoenix AZ, nail salon 85021, manicure Phoenix, pedicure Phoenix, dip powder nails, gel nails, waxing, North Phoenix nails',
  openGraph: {
    title: 'Nice Nails & Spa | Nail Salon Phoenix AZ',
    description:
      'Nice Nails & Spa - Manicure, Pedicure, Acrylic & Gel nails in Phoenix AZ. Book online!',
    type: 'website',
  },
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
