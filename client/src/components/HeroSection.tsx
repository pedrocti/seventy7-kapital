import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoCheckmarkCircle } from 'react-icons/io5';

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
    'Funded trading account assistance',
    'Real-time trade signals & market insights',
    'Premium strategies that actually work',
    'Global business & travel experiences'
  ];

  return (
    <section className="min-h-screen flex items-center justify-center bg-grid relative overflow-hidden" id="hero">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#7E22CE] opacity-20 blur-[100px] rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#0AEFFF] opacity-20 blur-[100px] rounded-full transform translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 z-10 relative">
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block mb-2">Escape the 9–5.</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0AEFFF] to-[#7E22CE]">
              Earn While You Sleep.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Join the elite circle of traders unlocking financial freedom through mentorship, capital, and consistent market profits.
          </p>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, staggerChildren: 0.1 }}
          >
            {keyPoints.map((point, index) => (
              <motion.div 
                key={index}
                className="flex items-start space-x-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <IoCheckmarkCircle className="text-green-400 text-2xl flex-shrink-0 mt-1" />
                <span className="text-white text-lg">{point}</span>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <motion.a
              href="https://t.me/Access77bot"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-[#0AEFFF] to-[#7E22CE] text-white font-bold rounded-full text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-glow flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Launch 77AccessBot
            </motion.a>
            
            <motion.a
              href="#about"
              className="px-8 py-4 bg-transparent border-2 border-[#0AEFFF] text-[#0AEFFF] font-bold rounded-full text-lg transform transition-all duration-300 hover:bg-[#0AEFFF10] flex items-center justify-center"
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
