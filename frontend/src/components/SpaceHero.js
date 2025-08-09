import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles.css';

export default function SpaceHero() {
  return (
    <div className="hero-content">
      <motion.h1 
        className="hero-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        DevUniverse
      </motion.h1>
      
      <motion.p 
        className="hero-subtitle"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Изучайте SQL, покоряя космос
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Link 
          to="/lessons" 
          className="primary-button"
        >
          Начать обучение
        </Link>
      </motion.div>
    </div>
  );
}
