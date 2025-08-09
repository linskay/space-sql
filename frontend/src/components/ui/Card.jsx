import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = true,
  glow = false,
  onClick,
  ...props 
}) => {
  const baseClasses = 'cosmic-card transition-all duration-300';
  const hoverClasses = hover ? 'hover:transform hover:-translate-y-2 cursor-pointer' : '';
  const glowClasses = glow ? 'shadow-cosmic hover:shadow-cosmic-lg' : '';
  
  const cardClasses = `${baseClasses} ${hoverClasses} ${glowClasses} ${className}`;
  
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: hover ? { 
      y: -8,
      boxShadow: '0 20px 50px rgba(138, 43, 226, 0.3)',
      transition: { type: 'spring', stiffness: 300 }
    } : {},
  };
  
  return (
    <motion.div
      className={cardClasses}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onClick={onClick}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
