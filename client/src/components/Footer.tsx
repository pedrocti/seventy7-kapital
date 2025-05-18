import { motion } from 'framer-motion';
import logoImage from '../assets/logo.jpeg';

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.footer 
      className="pt-16 pb-8 relative overflow-hidden bg-[#020617]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <motion.div variants={itemVariants}>
            <div className="flex items-center mb-6">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0AEFFF] to-[#7E22CE] rounded-full opacity-70 blur-sm group-hover:opacity-100 transition duration-300"></div>
                <img 
                  src={logoImage} 
                  alt="Seventy7 Kapital Logo" 
                  className="relative h-10 w-auto object-contain rounded-full" 
                />
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering traders with premium resources and mentorship for financial success.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#0AEFFF] transition-colors duration-300">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#0AEFFF] transition-colors duration-300">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="https://t.me/Access77bot" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0AEFFF] transition-colors duration-300">
                <i className="fab fa-telegram text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#0AEFFF] transition-colors duration-300">
                <i className="fab fa-discord text-xl"></i>
              </a>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-grotesk font-bold text-lg mb-6">Services</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#services" className="hover:text-[#0AEFFF] transition-colors duration-300">Trading Education</a></li>
              <li><a href="#services" className="hover:text-[#0AEFFF] transition-colors duration-300">Mentorship Program</a></li>
              <li><a href="#services" className="hover:text-[#0AEFFF] transition-colors duration-300">Prop Firm Support</a></li>
              <li><a href="#services" className="hover:text-[#0AEFFF] transition-colors duration-300">Trading Signals</a></li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-grotesk font-bold text-lg mb-6">About</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#about" className="hover:text-[#0AEFFF] transition-colors duration-300">Our Mission</a></li>
              <li><a href="#about" className="hover:text-[#0AEFFF] transition-colors duration-300">The Team</a></li>
              <li><a href="#testimonials" className="hover:text-[#0AEFFF] transition-colors duration-300">Testimonials</a></li>
              <li><a href="#" className="hover:text-[#0AEFFF] transition-colors duration-300">Blog</a></li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-grotesk font-bold text-lg mb-6">Contact</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-3 text-[#0AEFFF]"></i>
                <span>support@seventy7kapital.com</span>
              </li>
              <li className="flex items-start">
                <i className="fab fa-telegram mt-1 mr-3 text-[#0AEFFF]"></i>
                <a 
                  href="https://t.me/Access77bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0AEFFF] transition-colors duration-300"
                >
                  @Seventy7Kapital
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          variants={itemVariants}
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-500 mb-4 md:mb-0">&copy; {new Date().getFullYear()} Seventy7 Kapital. All rights reserved.</p>
          <div className="flex space-x-6 text-gray-500">
            <a href="#" className="hover:text-[#0AEFFF] transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-[#0AEFFF] transition-colors duration-300">Terms of Service</a>
            <a href="#" className="hover:text-[#0AEFFF] transition-colors duration-300">Disclaimer</a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
