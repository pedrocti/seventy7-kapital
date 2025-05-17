import { motion, AnimatePresence } from 'framer-motion';

const StickyCTA = ({ visible }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          className="fixed bottom-0 left-0 w-full glass-effect py-4 px-4 z-50"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto flex justify-between items-center">
            <p className="text-white font-medium hidden sm:block">Ready to transform your trading career?</p>
            <a
              href="https://t.me/Access77bot"
              target="_blank"
              rel="noopener noreferrer"
              className="neon-button px-5 py-2 rounded-full text-white font-medium flex items-center space-x-2 mx-auto sm:mx-0"
            >
              <i className="fab fa-telegram"></i>
              <span>Join Now via Telegram</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;
