import dynamic from 'next/dynamic';
import HeroSection from '@/components/HeroSection';
import HeroKeywordTags from '@/components/HeroKeywordTags';
import HomeHashScroll from '@/components/HomeHashScroll';
import HomeAboutSection from '@/components/HomeAboutSection';
import HomeServiceAreasSection from '@/components/HomeServiceAreasSection';
import HomeFaqSection from '@/components/HomeFaqSection';
import LocationSection from '@/components/LocationSection';
import BookingCtaBanner from '@/components/BookingCtaBanner';
import FeaturedVideos from '@/components/FeaturedVideos';
import HomePromoSection from '@/components/HomePromoSection';
import NewCustomerPromo from '@/components/NewCustomerPromo';
import { getNewCustomerOfferEnabled } from '@/lib/serverSettings';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { absoluteUrl } from '@/lib/siteUrl';
import { translatedMeta, ogLocale } from '@/lib/i18nMeta';
import { getDisplayReviews, fetchPlaceStats } from '@/lib/googleReviews';
import { getVideos } from '@/lib/serverVideos';

// Sections below-fold dùng framer-motion — lazy load để không chặn LCP
const WhyLoveSection        = dynamic(() => import('@/components/WhyLoveSection'));
const OurLuxuryServicesSection = dynamic(() => import('@/components/OurLuxuryServicesSection'));
const ServicesSection       = dynamic(() => import('@/components/ServicesSection'));
const TestimonialsSection   = dynamic(() => import('@/components/TestimonialsSection'));
const GallerySection        = dynamic(() => import('@/components/GallerySection'));

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: { absolute: t('home.title') },
    description: t('home.description'),
    keywords: [
      'nail salon Phoenix AZ',
      'nail salon North Phoenix',
      'manicure Phoenix',
      'pedicure Phoenix AZ 85021',
      'acrylic nails Phoenix',
    ],
    openGraph: {
      title: t('home.title'),
      description: t('home.description'),
      ...ogLocale(locale),
      url: absoluteUrl('/'),
      images: [
        {
          url: '/images/hero-luxury-banner.jpg',
          width: 1200,
          height: 630,
          alt: t('ogImageAlt'),
        },
      ],
    },
    ...translatedMeta(locale, '/'),
  };
}

export default async function HomePage({ params: { locale } }) {
  setRequestLocale(locale);
  const [reviews, placeStats, videos] = await Promise.all([
    getDisplayReviews(),
    fetchPlaceStats(),
    getVideos(),
  ]);
  const reviewCount = placeStats?.reviewCount ?? '700';
  const ratingValue = placeStats?.rating ?? '4.9';
  const newCustomerOfferOn = await getNewCustomerOfferEnabled();
  return (
    <>
      {/* preconnect for Google Maps iframe — only needed on this page */}
      <link rel="preconnect" href="https://maps.google.com" />
      <link rel="preconnect" href="https://maps.gstatic.com" crossOrigin="anonymous" />
      <HomeHashScroll />
      <div className="relative bg-[#1a1a1a]">
        <HeroSection reviewCount={reviewCount} rating={ratingValue} />
        <HeroKeywordTags />
      </div>
      <HomePromoSection />
      {newCustomerOfferOn && (
        <section className="bg-cream px-0 py-12 md:py-16">
          <NewCustomerPromo />
        </section>
      )}
      <WhyLoveSection reviewCount={reviewCount} rating={ratingValue} />
      <OurLuxuryServicesSection />
      <ServicesSection />
      <FeaturedVideos videos={videos} />
      <TestimonialsSection reviews={reviews} />
      <BookingCtaBanner />
      <GallerySection />
      <HomeServiceAreasSection />
      <HomeAboutSection />
      <HomeFaqSection />
      <LocationSection />
    </>
  );
}
