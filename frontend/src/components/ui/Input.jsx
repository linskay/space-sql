import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Input = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder,
  error,
  disabled = false,
  required = false,
  className = '',
  ...props 
}) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);
  
  const handleChange = (e) => {
    setHasValue(!!e.target.value);
    onChange?.(e);
  };
  
  const inputClasses = `cosmic-input ${error ? 'border-red-500' : ''} ${className}`;
  
  return (
    <div className="relative mb-6">
      {label && (
        <motion.label
          className={`absolute left-4 transition-all duration-300 pointer-events-none ${
            focused || hasValue 
              ? 'top-2 text-xs text-cosmic-purple' 
              : 'top-4 text-base text-gray-400'
          }`}
          animate={{
            y: focused || hasValue ? -8 : 0,
            scale: focused || hasValue ? 0.85 : 1,
            color: focused ? 'var(--cosmic-purple)' : error ? '#ef4444' : '#9ca3af'
          }}
        >
          {label} {required && '*'}
        </motion.label>
      )}
      
      <input
        type={type}
        value={value}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={!label ? placeholder : ''}
        disabled={disabled}
        className={inputClasses}
        {...props}
      />
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm mt-2 ml-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default Input;
