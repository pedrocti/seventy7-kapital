import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImage from '../assets/logo.jpeg';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Blog', href: '#blog' },
  ];

  const handleNavLinkClick = (href: string) => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
    
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'backdrop-blur-lg bg-[#0F172A]/80 py-2 shadow-lg shadow-[#7E22CE]/10' : 'py-3'}`}>
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <motion.div 
          className="flex items-center space-x-3 md:space-x-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a href="#" onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0AEFFF] to-[#7E22CE] rounded-full opacity-70 blur-sm group-hover:opacity-100 transition duration-300"></div>
              <img 
                src={logoImage} 
                alt="Seventy7 Kapital Logo" 
                className="relative h-10 w-auto object-contain rounded-full"
              />
            </div>
          </a>
        </motion.div>
        
        <div className="hidden md:flex items-center space-x-5">
          {navLinks.map((link, index) => (
            <motion.a 
              key={index}
              href={link.href}
              className="text-white text-sm uppercase tracking-wider font-medium hover:text-[#0AEFFF] transition-all duration-300 relative group"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              onClick={(e) => {
                e.preventDefault();
                handleNavLinkClick(link.href);
              }}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0AEFFF] to-[#7E22CE] group-hover:w-full transition-all duration-300"></span>
            </motion.a>
          ))}
          <motion.a 
            href="https://t.me/Access77bot"
            target="_blank"
            rel="noopener noreferrer"
            className="neon-button px-5 py-2 rounded-md text-white font-medium flex items-center space-x-2 shadow-lg shadow-[#7E22CE]/20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <i className="fab fa-telegram"></i>
            <span>Join Now</span>
          </motion.a>
        </div>
        
        <motion.button 
          className="md:hidden text-white focus:outline-none relative z-20"
          onClick={toggleMobileMenu}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="relative">
            <div className={`w-6 h-0.5 bg-gradient-to-r from-[#0AEFFF] to-[#7E22CE] rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white rounded-full my-1.5 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-gradient-to-r from-[#7E22CE] to-[#0AEFFF] rounded-full transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
          </div>
        </motion.button>
      </nav>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden fixed inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 backdrop-blur-lg bg-[#0F172A]/95"></div>
            
            <motion.div 
              className="relative h-full flex flex-col justify-center items-center p-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <div className="flex flex-col space-y-8 items-center">
                {navLinks.map((link, index) => (
                  <motion.a 
                    key={index}
                    href={link.href}
                    className="text-white text-xl font-medium hover:text-[#0AEFFF] transition-all duration-300 relative group overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavLinkClick(link.href);
                    }}
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0AEFFF] to-[#7E22CE] group-hover:w-full transition-all duration-300"></span>
                  </motion.a>
                ))}
                <motion.a 
                  href="https://t.me/Access77bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neon-button px-6 py-3 rounded-md text-white font-medium text-center flex items-center space-x-2 mt-4 shadow-lg shadow-[#7E22CE]/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <i className="fab fa-telegram"></i>
                  <span>Join Now</span>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
