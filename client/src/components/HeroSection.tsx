import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoCheckmarkCircle } from 'react-icons/io5';
import CandlestickBackground from './CandlestickBackground';

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

  const keyPoints = [
    'Lifetime access to expert mentorship',
    'Prop firm evaluation assistance',
    'Signals and market insights',
    'Free trading materials and resources',
    'Global business and travel experiences'
  ];

  return (
    <section className="min-h-screen flex items-center justify-center bg-grid relative overflow-hidden" id="hero">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#7E22CE] opacity-20 blur-[100px] rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#0AEFFF] opacity-20 blur-[100px] rounded-full transform translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      {/* Transparent green candlestick chart overlay */}
      <CandlestickBackground className="z-1" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-20 z-10 relative">
        <motion.div 
          className="mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            <span className="block mb-2">Master the Markets.</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Build Generational Wealth.
            </span>
          </h1>
          
          <p className="text-base md:text-lg text-gray-300 mb-10 max-w-md mx-auto font-light">
            Join the elite circle of traders unlocking financial freedom through mentorship, capital, and consistent market profits.
          </p>
          
          <motion.div 
            className="flex flex-col items-center space-y-3 mb-10 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, staggerChildren: 0.1 }}
          >
            {keyPoints.map((point, index) => (
              <motion.div 
                key={index}
                className="flex items-start space-x-3 w-full"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <IoCheckmarkCircle className="text-green-400 text-xl flex-shrink-0 mt-0.5" />
                <span className="text-sm md:text-base text-white text-left">{point}</span>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
            <motion.a
              href="https://t.me/Access77bot"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold rounded-full text-base md:text-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Launch 77AccessBot
            </motion.a>
            
            <motion.a
              href="#about"
              className="px-6 py-3 bg-transparent border border-blue-400 text-blue-400 font-medium rounded-full text-base md:text-lg transition-all duration-300 hover:bg-blue-400/10 flex items-center justify-center"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More
            </motion.a>
          </div>
        </motion.div>
        
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
