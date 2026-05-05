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

// Sections below-fold dùng framer-motion — lazy load để không chặn LCP
const WhyLoveSection        = dynamic(() => import('@/components/WhyLoveSection'));
const OurLuxuryServicesSection = dynamic(() => import('@/components/OurLuxuryServicesSection'));
const ServicesSection       = dynamic(() => import('@/components/ServicesSection'));
const TestimonialsSection   = dynamic(() => import('@/components/TestimonialsSection'));
const GallerySection        = dynamic(() => import('@/components/GallerySection'));

const HOME_TITLE =
  'Nice Nails & Spa | Best Nail Salon in North Phoenix AZ 85021 | Manicure & Pedicure';
const HOME_DESCRIPTION =
  'Top-rated nail salon in North Phoenix AZ 85021. Manicure, pedicure, acrylic nails & nail art. 4.9★ 656+ reviews. Book online or walk-ins welcome!';

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
  },
};

export default function HomePage() {
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
      <TestimonialsSection />
      <BookingCtaBanner />
      <GallerySection />
      <HomeServiceAreasSection />
      <HomeAboutSection />
      <HomeFaqSection />
      <LocationSection />
    </>
  );
}
