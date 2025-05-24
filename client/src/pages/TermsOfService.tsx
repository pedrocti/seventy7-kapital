import { motion } from 'framer-motion';
import { Link } from 'wouter';

const TermsOfService = () => {
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
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Terms of Service</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="mb-4">Last Updated: May 19, 2025</p>
            
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. Agreement to Terms</h2>
            <p>By accessing our website at www.seventy7kapital.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
            
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials on Seventy7 Kapital's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li>modify or copy the materials;</li>
              <li>use the materials for any commercial purpose, or for any public display;</li>
              <li>attempt to decompile or reverse engineer any software contained on Seventy7 Kapital's website;</li>
              <li>remove any copyright or other proprietary notations from the materials; or</li>
              <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">3. Disclaimer</h2>
            <p>The materials on Seventy7 Kapital's website are provided on an 'as is' basis. Seventy7 Kapital makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">4. Limitations</h2>
            <p>In no event shall Seventy7 Kapital or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Seventy7 Kapital's website, even if Seventy7 Kapital or a Seventy7 Kapital authorized representative has been notified orally or in writing of the possibility of such damage.</p>
            
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">5. Accuracy of Materials</h2>
            <p>The materials appearing on Seventy7 Kapital's website could include technical, typographical, or photographic errors. Seventy7 Kapital does not warrant that any of the materials on its website are accurate, complete or current. Seventy7 Kapital may make changes to the materials contained on its website at any time without notice.</p>
            
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">6. Links</h2>
            <p>Seventy7 Kapital has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Seventy7 Kapital of the site. Use of any such linked website is at the user's own risk.</p>
            
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">7. Modifications</h2>
            <p>Seventy7 Kapital may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>
            
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">8. Governing Law</h2>
            <p>These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
            
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">9. Contact Us</h2>
            <p>If you have any questions about these Terms of Service, please contact us at support@seventy7hub.com.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;