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
import { absoluteUrl } from '@/lib/siteUrl';
import { getDisplayReviews, fetchPlaceStats } from '@/lib/googleReviews';
import { getVideos } from '@/lib/serverVideos';

// Sections below-fold dùng framer-motion — lazy load để không chặn LCP
const WhyLoveSection        = dynamic(() => import('@/components/WhyLoveSection'));
const OurLuxuryServicesSection = dynamic(() => import('@/components/OurLuxuryServicesSection'));
const ServicesSection       = dynamic(() => import('@/components/ServicesSection'));
const TestimonialsSection   = dynamic(() => import('@/components/TestimonialsSection'));
const GallerySection        = dynamic(() => import('@/components/GallerySection'));

const HOME_TITLE =
  'Nice Nails & Spa | Best Nail Salon in North Phoenix AZ 85021 | Manicure & Pedicure';
const HOME_DESCRIPTION =
  'Gel manicures, dip powder, acrylic full sets, spa pedicures, lash extensions & more in North Phoenix AZ 85021. Serving Moon Valley, Glendale & Peoria. 4.9★ · 700+ reviews.';

export const metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  keywords: [
    'nail salon Phoenix AZ',
    'nail salon North Phoenix',
    'manicure Phoenix',
    'pedicure Phoenix AZ 85021',
    'acrylic nails Phoenix',
  ],
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: absoluteUrl('/'),
    images: [
      {
        url: '/images/hero-luxury-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Nice Nails & Spa — Premier Nail Salon in North Phoenix AZ',
      },
    ],
  },
};

export default async function HomePage() {
  const [reviews, placeStats, videos] = await Promise.all([
    getDisplayReviews(),
    fetchPlaceStats(),
    getVideos(),
  ]);
  const reviewCount = placeStats?.reviewCount ?? '700';
  const ratingValue = placeStats?.rating ?? '4.9';
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
