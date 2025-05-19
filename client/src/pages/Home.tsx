import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import BlogSection from '@/components/BlogSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import ParticleBackground from '@/components/ParticleBackground';
import TradingVisuals from '@/components/TradingVisuals';
import MarketImpactVisual from '@/components/MarketImpactVisual';
import { Helmet } from 'react-helmet';

const Home = () => {
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen font-inter text-white hide-scrollbar">
      <Helmet>
        <title>Seventy7 Kapital | Premium Trading & Financial Empowerment</title>
        <meta name="description" content="Access premium trading mentorship, funding support, and life-changing financial resources with Seventy7 Kapital." />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      
      <ParticleBackground />
      
      <Navbar />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <TradingVisuals />
        <MarketImpactVisual />
        <BlogSection />
        <CTASection />
      </main>
      
      <Footer />
      
      <StickyCTA visible={showStickyCTA} />
    </div>
  );
};

export default Home;
