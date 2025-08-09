import React from 'react';
import { motion } from 'framer-motion';

const Loading = ({ 
  message = 'Загрузка...', 
  size = 'medium',
  className = '' 
}) => {
  const sizes = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8', 
    large: 'w-12 h-12',
  };

  const textSizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-xl',
  };

  return (
    <motion.div 
      className={`flex flex-col items-center justify-center space-y-4 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`loading-spinner ${sizes[size]}`} />
      
      <motion.p 
        className={`text-cosmic-blue font-space ${textSizes[size]}`}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {message}
      </motion.p>
      
      {/* Дополнительные звезды для космического эффекта */}
      <div className="relative">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}px`,
              top: `${Math.random() * 50}px`,
            }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{ 
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity 
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Loading;
