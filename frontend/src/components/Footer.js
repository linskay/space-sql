import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer 
      className="relative z-10 text-center py-6 border-t border-cosmic-purple border-opacity-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-gray-400 font-space text-sm">
          🚀 DevUniverse © 2025 • No PHP - No Problems • 
          <span className="text-cosmic-purple ml-2">Made with ❤️ in the cosmos</span>
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
