import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import GallerySection from '@/components/GallerySection';
import WhyChooseSection from '@/components/WhyChooseSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import BookingCtaBanner from '@/components/BookingCtaBanner';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <WhyChooseSection />
      <TestimonialsSection />
      <BookingCtaBanner />
    </>
  );
}
