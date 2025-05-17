import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [scrollIndicator, setScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrollIndicator(false);
      } else {
        setScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-grid relative overflow-hidden" id="hero">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#7E22CE] opacity-20 blur-[100px] rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#0AEFFF] opacity-20 blur-[100px] rounded-full transform translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 z-10 relative">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0 md:pr-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-grotesk font-bold mb-6">
              <span className="block mb-2">Unlock Your</span>
              <span className="neon-text gradient-text">Financial Power</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              Access premium trading mentorship, funding support, and life-changing financial resources.
            </p>
            <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex">
              <a
                href="https://t.me/Access77bot"
                target="_blank"
                rel="noopener noreferrer"
                className="neon-button px-8 py-4 rounded-full text-white font-medium text-lg inline-flex items-center animate-pulse-slow"
              >
                <i className="fab fa-telegram mr-3"></i>
                Launch 77AccessBot
              </a>
              <a
                href="#about"
                className="neon-border px-8 py-4 rounded-full text-white font-medium text-lg inline-block text-center"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn More
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', width: '100%' }}>
              <div className="relative w-full overflow-hidden group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0AEFFF] to-[#7E22CE] opacity-70 blur-sm rounded-2xl group-hover:opacity-100 transition-opacity duration-300"></div>
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  style={{ 
                    width: '100%', 
                    maxWidth: '1000px', 
                    height: 'auto', 
                    borderRadius: '16px', 
                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    position: 'relative'
                  }}
                >
                  <source src="https://res.cloudinary.com/dyiwnim9t/video/upload/v1715613140/trading-chart-animation_f5gfjd.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </motion.div>
        </div>
        
        {scrollIndicator && (
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <i className="fas fa-chevron-down text-white text-xl"></i>
            </motion.div>
            <p className="text-sm text-gray-400 mt-2">Scroll to explore</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
