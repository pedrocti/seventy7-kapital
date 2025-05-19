import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const MarketImpactVisual = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  // Animation for bulls and bears
  const containerVariants = {
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
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };
  
  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  // Market stats with animated counters
  const [stats, setStats] = useState({
    pips: 0,
    trades: 0,
    winRate: 0,
    avgReturn: 0
  });
  
  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setStats(prevStats => {
          const newStats = { ...prevStats };
          
          if (newStats.pips < 21250) {
            newStats.pips = Math.min(21250, newStats.pips + 425);
          }
          
          if (newStats.trades < 1460) {
            newStats.trades = Math.min(1460, newStats.trades + 30);
          }
          
          if (newStats.winRate < 76.5) {
            newStats.winRate = Math.min(76.5, newStats.winRate + 1.5);
          }
          
          if (newStats.avgReturn < 11.8) {
            newStats.avgReturn = Math.min(11.8, newStats.avgReturn + 0.2);
          }
          
          return newStats;
        });
      }, 30);
      
      return () => clearInterval(interval);
    }
  }, [inView]);
  
  // Array of forex pairs
  const forexPairs = [
    { pair: 'EUR/USD', bull: Math.random() > 0.5 },
    { pair: 'GBP/USD', bull: Math.random() > 0.5 },
    { pair: 'USD/JPY', bull: Math.random() > 0.5 },
    { pair: 'AUD/USD', bull: Math.random() > 0.5 },
    { pair: 'USD/CAD', bull: Math.random() > 0.5 },
    { pair: 'NZD/USD', bull: Math.random() > 0.5 },
    { pair: 'EUR/GBP', bull: Math.random() > 0.5 },
    { pair: 'EUR/JPY', bull: Math.random() > 0.5 },
  ];
  
  // Market insights for the knowledge section
  const marketInsights = [
    {
      title: "Market Structure",
      content: "We identify higher highs and lower lows to determine trend direction before trading.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0AEFFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      title: "Smart Money Concepts",
      content: "Our strategies follow the footprints of institutional traders through order blocks and liquidity grabs.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0AEFFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Risk Management",
      content: "Capital preservation is key. We only risk 1-2% per trade with predefined stop losses.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0AEFFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Psychological Edge",
      content: "Trading psychology separates winners from losers. We teach emotional control and consistency.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0AEFFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    }
  ];
  
  return (
    <div 
      ref={ref}
      className="py-20 bg-gradient-to-b from-[#060714] to-[#0a0d1f] overflow-hidden relative"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#0AEFFF] rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#7E22CE] rounded-full filter blur-[120px]"></div>
      </div>
    
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-6">
            Market <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0AEFFF] to-[#7E22CE]">Analysis</span> & Insights
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-300 max-w-3xl mx-auto text-lg">
            Our sophisticated market analysis combines technical precision with psychological insights to identify high-probability trade setups.
          </motion.p>
        </motion.div>
        
        {/* Market Stats Section */}
        <motion.div 
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          <motion.div 
            variants={itemVariants}
            className="bg-[#0c1629] rounded-xl p-6 border border-gray-800 text-center overflow-hidden hover:border-[#0AEFFF] transition-all duration-300 relative group"
          >
            <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Total Pips Captured</h3>
            <p className="text-3xl md:text-4xl font-bold text-white">
              {stats.pips.toLocaleString()} <span className="text-[#0AEFFF]">pips</span>
            </p>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#0AEFFF] to-[#7E22CE] opacity-0 group-hover:opacity-20 rounded-xl blur transition-opacity duration-300"></div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="bg-[#0c1629] rounded-xl p-6 border border-gray-800 text-center overflow-hidden hover:border-[#0AEFFF] transition-all duration-300 relative group"
          >
            <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Successful Trades</h3>
            <p className="text-3xl md:text-4xl font-bold text-white">
              {stats.trades.toLocaleString()} <span className="text-[#0AEFFF]">trades</span>
            </p>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#0AEFFF] to-[#7E22CE] opacity-0 group-hover:opacity-20 rounded-xl blur transition-opacity duration-300"></div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="bg-[#0c1629] rounded-xl p-6 border border-gray-800 text-center overflow-hidden hover:border-[#0AEFFF] transition-all duration-300 relative group"
          >
            <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Win Rate</h3>
            <p className="text-3xl md:text-4xl font-bold text-white">
              {stats.winRate.toFixed(1)}<span className="text-[#0AEFFF]">%</span>
            </p>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#0AEFFF] to-[#7E22CE] opacity-0 group-hover:opacity-20 rounded-xl blur transition-opacity duration-300"></div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="bg-[#0c1629] rounded-xl p-6 border border-gray-800 text-center overflow-hidden hover:border-[#0AEFFF] transition-all duration-300 relative group"
          >
            <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Avg. Monthly Return</h3>
            <p className="text-3xl md:text-4xl font-bold text-white">
              {stats.avgReturn.toFixed(1)}<span className="text-[#0AEFFF]">%</span>
            </p>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#0AEFFF] to-[#7E22CE] opacity-0 group-hover:opacity-20 rounded-xl blur transition-opacity duration-300"></div>
          </motion.div>
        </motion.div>
        
        {/* Bulls and Bears Market Visualization */}
        <motion.div 
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mb-16"
        >
          <motion.div variants={itemVariants} className="bg-[#0c1629] rounded-xl p-6 border border-gray-800 overflow-hidden">
            <h3 className="text-xl font-bold text-white mb-6">Current Market Sentiment</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {forexPairs.map((pair, index) => (
                <motion.div
                  key={index}
                  variants={iconVariants}
                  className="flex flex-col items-center justify-center p-4 bg-[#06091a] rounded-lg"
                >
                  <p className="font-mono text-lg font-semibold mb-3">{pair.pair}</p>
                  
                  {pair.bull ? (
                    <div className="flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-green-500">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" />
                        <path d="M10.3 8.29a.996.996 0 01-1.42 1.42l-2-2a.996.996 0 111.41-1.41L10 8.59l3.29-3.29a.996.996 0 111.41 1.41l-4 4a.997.997 0 01-.7.29c-.27 0-.52-.1-.7-.3z" />
                      </svg>
                      <p className="mt-2 text-green-500 font-medium">Bullish</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-red-500">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                        <path d="M16 11h-3V8c0-.55-.45-1-1-1s-1 .45-1 1v3H8c-.55 0-1 .45-1 1s.45 1 1 1h3v3c0 .55.45 1 1 1s1-.45 1-1v-3h3c.55 0 1-.45 1-1s-.45-1-1-1z" />
                      </svg>
                      <p className="mt-2 text-red-500 font-medium">Bearish</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            
            <div className="bg-[#06091a] rounded-lg p-4 md:p-6">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Bull Market Strategies</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <span className="inline-block h-2 w-2 rounded-full bg-green-500 mt-2 mr-2"></span>
                      <span>Breakout trading with momentum indicators</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block h-2 w-2 rounded-full bg-green-500 mt-2 mr-2"></span>
                      <span>Pullback entries on rising moving averages</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block h-2 w-2 rounded-full bg-green-500 mt-2 mr-2"></span>
                      <span>Trading from institutional order blocks</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Bear Market Strategies</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <span className="inline-block h-2 w-2 rounded-full bg-red-500 mt-2 mr-2"></span>
                      <span>Counter-trend reversals at key resistances</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block h-2 w-2 rounded-full bg-red-500 mt-2 mr-2"></span>
                      <span>Shorting after liquidity sweeps</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block h-2 w-2 rounded-full bg-red-500 mt-2 mr-2"></span>
                      <span>Range trading with aggressive risk management</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Trading Knowledge Base */}
        <motion.div 
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {marketInsights.map((insight, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-[#0c1629] rounded-xl p-6 border border-gray-800 overflow-hidden hover:border-[#0AEFFF] transition-all duration-300 group"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 p-2 bg-[#06091a] rounded-lg mr-4 group-hover:bg-gradient-to-r group-hover:from-[#0AEFFF20] group-hover:to-[#7E22CE20] transition-all duration-300">
                  {insight.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{insight.title}</h3>
                  <p className="text-gray-300">{insight.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MarketImpactVisual;