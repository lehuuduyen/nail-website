import dynamic from 'next/dynamic';
import HeroSection from '@/components/HeroSection';
import HeroKeywordTags from '@/components/HeroKeywordTags';
import HomeHashScroll from '@/components/HomeHashScroll';
import HomeAboutSection from '@/components/HomeAboutSection';
import HomeServiceAreasSection from '@/components/HomeServiceAreasSection';
import HomeFaqSection from '@/components/HomeFaqSection';
import LocationSection from '@/components/LocationSection';
import BookingCtaBanner from '@/components/BookingCtaBanner';
import { absoluteUrl } from '@/lib/siteUrl';
import { getDisplayReviews } from '@/lib/googleReviews';

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
  const reviews = await getDisplayReviews();
  return (
    <>
      {/* preconnect for Google Maps iframe — only needed on this page */}
      <link rel="preconnect" href="https://maps.google.com" />
      <link rel="preconnect" href="https://maps.gstatic.com" crossOrigin="anonymous" />
      <HomeHashScroll />
      <div className="relative bg-[#1a1a1a]">
        <HeroSection />
        <HeroKeywordTags />
      </div>
      <WhyLoveSection />
      <OurLuxuryServicesSection />
      <ServicesSection />
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
