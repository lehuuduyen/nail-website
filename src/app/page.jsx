import HeroSection from '@/components/HeroSection';
import TrustBar from '@/components/TrustBar';
import WhyLoveSection from '@/components/WhyLoveSection';
import OurLuxuryServicesSection from '@/components/OurLuxuryServicesSection';
import ServicesSection from '@/components/ServicesSection';
import GallerySection from '@/components/GallerySection';
import TestimonialsSection from '@/components/TestimonialsSection';
import BookingCtaBanner from '@/components/BookingCtaBanner';

export default function HomePage() {
  return (
    <>
      <div className="relative bg-[#1a1a1a]">
        <HeroSection />
        <TrustBar />
      </div>
      <WhyLoveSection />
      <OurLuxuryServicesSection />
      <ServicesSection />
      <GallerySection />
      <TestimonialsSection />
      <BookingCtaBanner />
    </>
  );
}
