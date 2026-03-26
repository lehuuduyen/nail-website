import HeroSection from '@/components/HeroSection';
import HeroKeywordTags from '@/components/HeroKeywordTags';
import TrustBar from '@/components/TrustBar';
import HomeAboutSection from '@/components/HomeAboutSection';
import HomeHashScroll from '@/components/HomeHashScroll';
import HomeServiceAreasSection from '@/components/HomeServiceAreasSection';
import HomeFaqSection from '@/components/HomeFaqSection';
import WhyLoveSection from '@/components/WhyLoveSection';
import OurLuxuryServicesSection from '@/components/OurLuxuryServicesSection';
import ServicesSection from '@/components/ServicesSection';
import GallerySection from '@/components/GallerySection';
import TestimonialsSection from '@/components/TestimonialsSection';
import BookingCtaBanner from '@/components/BookingCtaBanner';
import { absoluteUrl } from '@/lib/siteUrl';

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
      <HomeHashScroll />
      <div className="relative bg-[#1a1a1a]">
        <HeroSection />
        <HeroKeywordTags />
        {/* <TrustBar /> */}
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
    </>
  );
}
