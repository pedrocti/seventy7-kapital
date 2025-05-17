import { motion } from 'framer-motion';
import logoImage from '../assets/logo.jpeg';

const LoadingScreen = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#0F172A] flex justify-center items-center z-[9999]">
      <div className="text-center">
        <motion.div 
          className="w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center overflow-hidden border-4 border-[#7E22CE]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [1, 0.8, 1],
            borderColor: ['#7E22CE', '#0AEFFF', '#7E22CE']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img 
            src={logoImage} 
            alt="Seventy7 Kapital Logo" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        <motion.p 
          className="text-white text-xl font-grotesk"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading Experience...
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingScreen;
