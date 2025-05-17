import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CTASection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 bg-[#0F172A] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid z-0"></div>
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#7E22CE] opacity-20 blur-[100px] rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 relative" ref={ref}>
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-grotesk font-bold mb-6"
            variants={itemVariants}
          >
            Ready to <span className="gradient-text">Transform</span> Your Trading?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Join our community today and gain access to premium trading resources, expert mentorship, and a supportive network of successful traders.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
            variants={itemVariants}
          >
            <a
              href="https://t.me/Access77bot"
              target="_blank"
              rel="noopener noreferrer"
              className="neon-button px-8 py-4 rounded-full text-white font-medium text-lg inline-flex items-center"
            >
              <i className="fab fa-telegram mr-3 text-xl"></i>
              Join Now via Telegram
            </a>
            <div className="text-gray-400 flex items-center">
              <i className="fas fa-shield-alt text-[#0AEFFF] mr-2"></i>
              <span>Secure & Confidential</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
