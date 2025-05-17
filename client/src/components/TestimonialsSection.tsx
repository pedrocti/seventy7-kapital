import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Testimonial = ({ image, name, position, quote, rating, animation }) => {
  return (
    <motion.div 
      variants={animation}
      className="neon-border rounded-3xl p-8"
    >
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="text-xl font-grotesk font-bold">{name}</h4>
          <p className="text-gray-400">{position}</p>
        </div>
      </div>
      <p className="text-gray-300 mb-6">
        {quote}
      </p>
      <div className="flex text-[#0AEFFF]">
        {[...Array(Math.floor(rating))].map((_, i) => (
          <i key={i} className="fas fa-star"></i>
        ))}
        {rating % 1 !== 0 && (
          <i className="fas fa-star-half-alt"></i>
        )}
      </div>
    </motion.div>
  );
};

const TestimonialsSection = () => {
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

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const itemLeftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 }
    }
  };

  const itemMiddleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  const itemRightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 }
    }
  };

  const testimonials = [
    {
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
      name: "James Wilson",
      position: "Forex Trader",
      quote: "The mentorship program at Seventy7 Kapital gave me the edge I needed to consistently profit in the forex market. Their approach is unmatched.",
      rating: 5,
      animation: itemLeftVariants
    },
    {
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
      name: "Sarah Chen",
      position: "Crypto Trader",
      quote: "Passed my prop firm challenge on the first attempt thanks to the strategies I learned here. Now managing a six-figure account!",
      rating: 5,
      animation: itemMiddleVariants
    },
    {
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
      name: "Michael Rodriguez",
      position: "Futures Trader",
      quote: "From struggling retail trader to consistent profitability in just 3 months. The community support here is incredible.",
      rating: 4.5,
      animation: itemRightVariants
    }
  ];

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#7E22CE] opacity-20 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-[#0AEFFF] opacity-20 blur-[100px] rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 relative" ref={ref}>
        <motion.div 
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={controls}
        >
          <h2 className="text-3xl md:text-5xl font-grotesk font-bold mb-6">
            What Our <span className="gradient-text">Traders Say</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join traders who have transformed their financial futures with Seventy7 Kapital.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
