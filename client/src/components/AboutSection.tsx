import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AboutSection = () => {
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

  const leftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 }
    }
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-[#7E22CE] opacity-20 blur-[100px] rounded-full transform -translate-y-1/2"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-[#3B82F6] opacity-20 blur-[100px] rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 z-10 relative" ref={ref}>
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-16"
          variants={itemVariants}
          initial="hidden"
          animate={controls}
        >
          <h2 className="text-[1.8rem] md:text-[2.5rem] font-grotesk font-bold mb-8 relative inline-block">
            What is <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Seventy7 Kapital</span>?
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500 opacity-60"></div>
          </h2>
          
          <div className="space-y-8">
            <motion.p 
              className="text-[1rem] md:text-[1.2rem] text-[#E0F7FA] leading-relaxed font-light"
              variants={itemVariants}
            >
              Seventy7 Kapital is a financial freedom accelerator. We exist to empower everyday people with the tools, mentorship, and funding assistance they need to thrive in global markets. Through expert guidance, strategic resources, and a network of ambitious traders, we help you turn your trading potential into lasting wealth and a life of true independence.
            </motion.p>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            variants={leftVariants}
            initial="hidden"
            animate={controls}
          >
            <div className="rounded-3xl overflow-hidden relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-purple-500 opacity-70 blur-sm rounded-3xl group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" 
                  alt="Professional trader analyzing market data" 
                  className="w-full h-auto object-cover rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="space-y-8"
          >
            <motion.div 
              variants={itemVariants}
              className="p-6 rounded-2xl flex items-start space-x-4 hover:scale-105 transition-transform duration-300 bg-opacity-10 bg-white backdrop-blur-sm"
              style={{ boxShadow: '0 0 20px rgba(0, 255, 255, 0.1)' }}
            >
              <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-3 rounded-xl">
                <i className="fas fa-rocket text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-grotesk font-bold mb-2 text-[#E0F7FA]">Modern Trading Approach</h3>
                <p className="text-[#E0F7FA] opacity-80">Combining technical analysis with cutting-edge technology for optimal results.</p>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="p-6 rounded-2xl flex items-start space-x-4 hover:scale-105 transition-transform duration-300 bg-opacity-10 bg-white backdrop-blur-sm"
              style={{ boxShadow: '0 0 20px rgba(0, 255, 255, 0.1)' }}
            >
              <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-3 rounded-xl">
                <i className="fas fa-users text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-grotesk font-bold mb-2 text-[#E0F7FA]">Community-Driven</h3>
                <p className="text-[#E0F7FA] opacity-80">A network of like-minded traders sharing insights and growing together.</p>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="p-6 rounded-2xl flex items-start space-x-4 hover:scale-105 transition-transform duration-300 bg-opacity-10 bg-white backdrop-blur-sm"
              style={{ boxShadow: '0 0 20px rgba(0, 255, 255, 0.1)' }}
            >
              <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-3 rounded-xl">
                <i className="fas fa-graduation-cap text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-grotesk font-bold mb-2 text-[#E0F7FA]">Education First</h3>
                <p className="text-[#E0F7FA] opacity-80">Our focus is on building financial literacy and trading competence.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
