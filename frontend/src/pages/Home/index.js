import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import StarBackground from '../../components/StarBackground';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui';
import { useAuth } from '../../contexts/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col">
      {/* Звёздный фон */}
      <div className="absolute inset-0 z-0">
        <StarBackground isMainPage={true} />
      </div>
      
      {/* Основной контент — стартовый экран без карточек */}
      <div className="relative flex-1 flex flex-col justify-center items-center z-10 text-center px-6">
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 max-w-3xl"
        >
          <motion.h1 
            variants={itemVariants}
            className="cosmic-title text-5xl lg:text-7xl"
          >
            DevUniverse
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl lg:text-2xl text-white/80 font-space leading-relaxed"
          >
            Изучайте SQL, покоряя космос
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              variant="ghost"
              size="lg"
              starColor="#8a2be2"
              borderColor="rgba(138,43,226,0.5)"
              glowEffect
              magnetic
              onClick={() => navigate(currentUser ? '/lessons' : '/register')}
              className="px-10"
            >
              🚀 {currentUser ? 'Продолжить обучение' : 'Начать обучение'}
            </Button>

            {!currentUser && (
              <Button 
                variant="ghost"
                size="lg"
                starColor="#2de2e6"
                borderColor="rgba(45,226,230,0.45)"
                magnetic
                onClick={() => navigate('/login')}
                className="px-10"
              >
                Войти в систему
              </Button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
