import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ServiceCardProps {
  icon: string;
  gradientFrom: string;
  gradientTo: string;
  title: string;
  description: string;
  features: string[];
  ctaText: string;
  delay?: number;
  telegramLinks?: string[];
}

const ServiceCard = ({ 
  icon, 
  gradientFrom, 
  gradientTo, 
  title, 
  description, 
  features,
  ctaText,
  delay = 0,
  telegramLinks
}: ServiceCardProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay }
      });
    }
  }, [controls, inView, delay]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (telegramLinks && telegramLinks.length > 0) {
      e.preventDefault();
      const randomIndex = Math.floor(Math.random() * telegramLinks.length);
      window.open(telegramLinks[randomIndex], '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className="neon-border rounded-3xl overflow-hidden transition-all duration-500 hover:transform hover:scale-105 group"
    >
      <div className="p-8 h-full flex flex-col">
        <div className={`bg-gradient-to-r from-[${gradientFrom}] to-[${gradientTo}] w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
          <i className={`fas ${icon} text-white text-3xl`}></i>
        </div>
        <h3 className="text-2xl font-grotesk font-bold mb-4">{title}</h3>
        <p className="text-gray-300 mb-6 flex-grow">{description}</p>
        <ul className="text-gray-300 space-y-3 mb-8">
          {features.map((feature: string, index: number) => (
            <li key={index} className="flex items-center">
              <i className="fas fa-check text-[#0AEFFF] mr-3"></i>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <a
          href={telegramLinks ? telegramLinks[0] : "https://t.me/Access77bot"}
          onClick={telegramLinks ? handleClick : undefined}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0AEFFF] font-medium inline-flex items-center group-hover:underline"
        >
          {ctaText}
          <i className="fas fa-arrow-right ml-2 transition-transform duration-300 group-hover:translate-x-2"></i>
        </a>
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const services = [
    {
      icon: "fa-book",
      gradientFrom: "#7E22CE",
      gradientTo: "#3B82F6",
      title: "Free Trading Resources",
      description: "Begin your journey with simplified, beginner-friendly lessons.",
      features: [
        "Foundational trading concepts",
        "Market analysis techniques",
        "Risk management principles"
      ],
      ctaText: "Start Learning",
      delay: 0.2
    },
    {
      icon: "fa-crown",
      gradientFrom: "#3B82F6",
      gradientTo: "#0AEFFF",
      title: "Premium Services",
      description: "Access lifetime mentorship, signals, and exclusive networking.",
      features: [
        "1-on-1 expert mentorship",
        "Real-time trading signals",
        "Elite community access"
      ],
      ctaText: "Explore Premium",
      delay: 0.4
    },
    {
      icon: "fa-building-columns",
      gradientFrom: "#0AEFFF",
      gradientTo: "#9D4EDD",
      title: "Prop Firm Assist",
      description: "Let our experts help you pass and manage funded accounts.",
      features: [
        "Challenge preparation",
        "Strategy optimization",
        "Account evaluation stage assistance"
      ],
      ctaText: "Get Funded",
      delay: 0.6,
      telegramLinks: [
        "https://t.me/Seventy7_Kapital",
        "https://t.me/Seventy7kapitaladmin1"
      ]
    }
  ];

  return (
    <section id="services" className="py-20 bg-[#0F172A] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid z-0"></div>
      
      <div className="container mx-auto px-4 z-10 relative" ref={ref}>
        <motion.div 
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={controls}
        >
          <h2 className="text-3xl md:text-5xl font-grotesk font-bold mb-6">
            What You <span className="gradient-text">Get</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Full spectrum of trading and financial resources tailored to your level and goals.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
