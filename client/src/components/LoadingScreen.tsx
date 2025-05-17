import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#0F172A] flex justify-center items-center z-[9999]">
      <div className="text-center">
        <motion.div 
          className="w-24 h-24 bg-gradient-to-r from-[#7E22CE] to-[#0AEFFF] rounded-full mx-auto mb-8 flex items-center justify-center"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [1, 0.8, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="font-orbitron text-white text-3xl font-bold">77</span>
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
