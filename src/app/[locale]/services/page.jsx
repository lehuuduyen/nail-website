import ServicesPageClient from './ServicesPageClient';
import ServiceSchema from '@/components/ServiceSchema';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { translatedMeta, ogLocale } from '@/lib/i18nMeta';
import { getSalonServices } from '@/lib/serverServices';

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('services.title'),
    description: t('services.description'),
    keywords:
      'nail salon phoenix az, manicure phoenix, pedicure phoenix, acrylic nails phoenix, gel nails phoenix, eyelash extensions phoenix, head spa phoenix, nail prices phoenix',
    openGraph: {
      title: t('services.title'),
      description: t('services.description'),
      type: 'website',
      ...ogLocale(locale),
    },
    ...translatedMeta(locale, '/services'),
  };
}

export default async function ServicesPage({ params: { locale } }) {
  setRequestLocale(locale);
  const services = await getSalonServices();
  return (
    <>
      <ServiceSchema services={services} />
      <BreadcrumbJsonLd items={[
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
      ]} />
      <ServicesPageClient services={services} />
    </>
  );
}
