import 'react-datepicker/dist/react-datepicker.css';
import { untranslatedMeta } from '@/lib/i18nMeta';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import './datepicker.css';

const metadata = {
  title: 'Book Online | Nice Nails & Spa',
  description: 'Choose your service, stylist, and time — book in minutes.',
};

export default function BookingLayout({ children }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Book Online', path: '/booking' },
        ]}
      />
      {children}
    </>
  );
}

export async function generateMetadata({ params: { locale } }) {
  return { ...metadata, ...untranslatedMeta(locale, '/booking') };
}
