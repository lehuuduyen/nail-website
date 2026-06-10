import ServicesPageClient from './ServicesPageClient';
import ServiceSchema from '@/components/ServiceSchema';
import { getSalonServices } from '@/lib/serverServices';

export const metadata = {
  title: 'Nail Salon Services & Prices | Nice Nails & Spa North Phoenix AZ 85021',
  description:
    'Full menu & prices at Nice Nails & Spa, North Phoenix AZ 85021. Gel manicures from $30, spa pedicures from $35, acrylic full sets from $40, lash extensions, head spa, facials & more.',
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

export default async function ServicesPage() {
  const services = await getSalonServices();
  return (
    <>
      <ServiceSchema services={services} />
      <ServicesPageClient services={services} />
    </>
  );
}
