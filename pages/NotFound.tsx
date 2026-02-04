import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MagneticButton from '../components/MagneticButton';
import SEO from '../components/SEO';

const NotFound: React.FC = () => {
  return (
    <>
      <SEO 
        title="404 - Page Not Found | Qognition"
        description="The page you are looking for does not exist."
        path="/404"
      />
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
        >
            <h1 className="font-display text-9xl md:text-[200px] font-bold text-white/5 leading-none select-none">
                404
            </h1>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                <h2 className="text-3xl md:text-5xl font-display font-medium mb-4 text-white">System Error</h2>
                <p className="text-gray-400 max-w-md mx-auto mb-8 text-lg">
                    The requested digital coordinates could not be found in our network matrix.
                </p>
                <Link to="/">
                    <MagneticButton variant="primary">Return Home</MagneticButton>
                </Link>
            </div>
        </motion.div>
      </div>
    </>
  );
};

export default NotFound;