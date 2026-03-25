import ServicesPageClient from './ServicesPageClient';
import ServiceSchema from '@/components/ServiceSchema';
import { SERVICES } from '@/data/services';

export const metadata = {
  title: 'Nail Salon Services & Prices | Nice Nails & Spa Phoenix AZ',
  description:
    'View all nail salon services and prices at Nice Nails & Spa in Phoenix, AZ. Manicure $30, Pedicure $35, Acrylic nails $40, eyelash extensions, head spa, facials & more.',
  keywords:
    'nail salon phoenix az, manicure phoenix, pedicure phoenix, acrylic nails phoenix, gel nails phoenix, eyelash extensions phoenix, head spa phoenix, nail prices phoenix',
  openGraph: {
    title: 'Nail Services & Prices — Nice Nails & Spa Phoenix',
    description:
      'Manicure $30 · Pedicure $35 · Acrylic nails $40 · Book online today!',
    type: 'website',
  },
  alternates: {
    canonical: '/services',
  },
};

export default function ServicesPage() {
  return (
    <>
      <ServiceSchema services={SERVICES} />
      <ServicesPageClient />
    </>
  );
}
