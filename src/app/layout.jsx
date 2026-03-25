import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingBookBtn from '@/components/FloatingBookBtn';
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

export const metadata = {
  title: 'Nice Nails & Spa | Nail Salon Phoenix AZ 85021',
  description:
    'Nice Nails & Spa on N 19th Ave — manicures, pedicures, dip powder, gel, waxing & lashes. Appointments & walk-ins. Book online.',
  keywords:
    'nail salon Phoenix AZ, nail salon 85021, manicure Phoenix, pedicure Phoenix, dip powder nails, gel nails, waxing, North Phoenix nails',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-cream font-sans antialiased text-ink">
        <Navbar />
        <main className="pt-[72px]">{children}</main>
        <Footer />
        <FloatingBookBtn />
      </body>
    </html>
  );
}
