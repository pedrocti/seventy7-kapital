import { motion } from 'framer-motion';
import { Link } from 'wouter';

const Disclaimer = () => {
  return (
    <div className="bg-[#020617] min-h-screen text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Link href="/" className="inline-flex items-center text-[#0AEFFF] mb-8 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Disclaimer</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="mb-4">Last Updated: May 19, 2025</p>
            
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">Trading Disclaimer</h2>
            <p>The information provided by Seventy7 Kapital ("we," "us," or "our") on our website and through our services is for general informational and educational purposes only. All information on our site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on our site.</p>
            
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">Risk Warning</h2>
            <p>Trading in financial instruments carries a high level of risk to your capital with the possibility of losing more than your initial investment. Trading is not suitable for everyone and requires knowledge and experience. You should only trade with funds you can afford to lose.</p>
            
            <p className="mt-4">Past performance is not indicative of future results. The value of your investments can go down as well as up. Trading involves risk and is not suitable for all investors. Please ensure that you fully understand the risks involved before trading.</p>
            
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">Not Financial Advice</h2>
            <p>The content on our website and our services does not constitute financial advice, trading advice, or any other type of advice. You should not treat any of the website's content as such. Seventy7 Kapital does not recommend that any financial instrument should be bought, sold, or held by you. You are solely responsible for making your own independent investment decisions.</p>
            
            <p className="mt-4">Before making any investment decisions, do your own research and seek advice from an independent financial advisor. Nothing contained on our site constitutes a solicitation, recommendation, endorsement, or offer by Seventy7 Kapital or any third party service provider to buy or sell any securities or other financial instruments.</p>
            
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">Prop Firm Services</h2>
            <p>Our services related to proprietary trading firms ("prop firms") are for educational and assistance purposes only. We do not guarantee that you will pass any prop firm challenges or evaluations. Success in our educational programs does not guarantee success in live trading environments or with prop firm challenges.</p>
            
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">External Links</h2>
            <p>Our website may contain links to external websites that are not provided or maintained by or in any way affiliated with Seventy7 Kapital. Please note that Seventy7 Kapital does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.</p>
            
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">Contact Us</h2>
            <p>If you have any questions about this disclaimer, please contact us at support@seventy7hub.com.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Disclaimer;