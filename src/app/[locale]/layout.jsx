import { Playfair_Display, Lato } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale, getMessages, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { translatedMeta, ogLocale } from '@/lib/i18nMeta';
import '../globals.css';
import ClarityScript from '@/components/analytics/ClarityScript';
import LocalBusinessJsonLd from '@/components/LocalBusinessJsonLd';
import SiteJsonLd from '@/components/SiteJsonLd';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingBookBtn from '@/components/FloatingBookBtn';
import BottomTabBar from '@/components/BottomTabBar';
import ScrollToTopButton from '@/components/ScrollToTopButton';
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t('defaultTitle'),
      template: t('titleTemplate'),
    },
    description: t('description'),
    keywords: t('keywords')
      .split('|')
      .map((k) => k.trim())
      .filter(Boolean),
    authors: [{ name: 'Nice Nails & Spa' }],
    creator: 'Nice Nails & Spa',
    openGraph: {
      type: 'website',
      ...ogLocale(locale),
      url: siteUrl.replace(/\/$/, ''),
      siteName: 'Nice Nails & Spa',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: [
        {
          url: '/images/hero-luxury-banner.jpg',
          width: 1200,
          height: 630,
          alt: t('ogImageAlt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twTitle'),
      description: t('twDescription'),
    },
    ...(googleVerification
      ? { verification: { google: googleVerification } }
      : {}),
    other: {
      'facebook-domain-verification': 'obr6q7f0psklcy3o8j14vvcbvf4w7k',
    },
    ...translatedMeta(locale, '/'),
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
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover', // let content extend under the notch; safe-area insets handle padding
  themeColor: '#3D3836', // matches the charcoal navbar / bottom tab bar → app-like status bar
};

export default async function LocaleLayout({ children, params: { locale } }) {
  // Locale không hợp lệ → 404 (chặn path lạ lọt qua matcher).
  if (!routing.locales.includes(locale)) notFound();
  // Bật static rendering cho cây con (giữ SSG → không tụt CWV).
  setRequestLocale(locale);

  const messages = await getMessages();
  const featuredPromo = pickFeatured(await getPromos());
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang={locale} className={`${playfair.variable} ${lato.variable}`} suppressHydrationWarning>
      <head />
      <body
        className="min-h-screen bg-cream font-sans antialiased text-ink pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0"
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          <SiteJsonLd />
          <LocalBusinessJsonLd />
          <div id="site-header" className="sticky top-0 z-50">
            <AnnouncementBar promo={featuredPromo} />
            <Navbar />
          </div>
          <main>{children}</main>
          <Footer />
          <FloatingBookBtn />
          <ScrollToTopButton />
          <BottomTabBar />
          {/* Analytics — both load after render (no LCP/CLS impact) and only when their ID is set.
              GA4 via @next/third-parties auto-sends pageviews, so we never fire pageview manually. */}
          <ClarityScript />
          {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
