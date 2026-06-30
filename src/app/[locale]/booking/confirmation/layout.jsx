import { untranslatedMeta } from '@/lib/i18nMeta';

const metadata = {
  title: 'Booking Confirmed | Nice Nails & Spa',
  description: 'Your appointment is confirmed.',
};

export default function ConfirmationLayout({ children }) {
  return children;
}

export async function generateMetadata({ params: { locale } }) {
  return { ...metadata, ...untranslatedMeta(locale, '/booking/confirmation') };
}
