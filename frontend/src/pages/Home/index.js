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
      
      {/* Основной контент */}
      <div className="relative flex-1 flex flex-col justify-center items-center z-10 text-center px-4">
        <div className="bg-space-dark bg-opacity-70 backdrop-blur-lg rounded-3xl p-8 lg:p-12 max-w-4xl mx-auto border border-cosmic-purple border-opacity-30">
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.h1 
              variants={itemVariants}
              className="cosmic-title text-5xl lg:text-7xl"
            >
              Space SQL
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl lg:text-2xl text-gray-300 font-space max-w-2xl mx-auto leading-relaxed"
            >
              Изучайте SQL, покоряя космос
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button 
                size="large"
                onClick={() => navigate(currentUser ? '/lessons' : '/register')}
                className="text-lg px-10 py-4"
              >
                🚀 {currentUser ? 'Продолжить обучение' : 'Начать обучение'}
              </Button>
              
              {!currentUser && (
                <Button 
                  variant="secondary"
                  size="large"
                  onClick={() => navigate('/login')}
                  className="text-lg px-10 py-4"
                >
                  Войти в систему
                </Button>
              )}
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-sm"
            >
              <div className="flex flex-col items-center space-y-2">
                <span className="text-2xl">📚</span>
                <span className="text-cosmic-blue font-space">Интерактивные уроки</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <span className="text-2xl">⚡</span>
                <span className="text-cosmic-green font-space">Практические задания</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <span className="text-2xl">🌟</span>
                <span className="text-cosmic-purple font-space">Космический опыт</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Футер */}
      <div className="relative z-10 bg-space-dark bg-opacity-80 backdrop-blur-sm border-t border-cosmic-purple border-opacity-20">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
