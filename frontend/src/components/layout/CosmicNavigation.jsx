import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui';

const CosmicNavigation = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Главная', icon: '🏠' },
    { path: '/lessons', label: 'Уроки', icon: '📚', protected: true },
    { path: '/practice', label: 'Практика', icon: '⚡', protected: true },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.nav 
      className="relative z-50 bg-space-dark bg-opacity-90 backdrop-blur-lg border-b border-cosmic-purple border-opacity-30"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div variants={itemVariants}>
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-2xl font-cosmic text-cosmic-purple hover:text-cosmic-blue transition-colors duration-300"
            >
              <span className="text-3xl">🚀</span>
              <span className="glow-text">DevUniverse</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              if (item.protected && !currentUser) return null;
              
              return (
                <motion.div key={item.path} variants={itemVariants}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      isActive(item.path)
                        ? 'bg-cosmic-purple bg-opacity-20 text-cosmic-purple border border-cosmic-purple'
                        : 'text-gray-300 hover:text-cosmic-blue hover:bg-cosmic-blue hover:bg-opacity-10'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span className="font-space">{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <motion.div 
                className="flex items-center space-x-4"
                variants={itemVariants}
              >
                <div className="flex items-center space-x-3 bg-space-purple bg-opacity-30 px-4 py-2 rounded-full border border-cosmic-purple border-opacity-30">
                  <div className="w-8 h-8 bg-cosmic-purple rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {currentUser.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-cosmic-green font-space text-sm">
                    {currentUser.email}
                  </span>
                </div>
                <Button variant="danger" size="small" onClick={handleLogout}>
                  Выйти
                </Button>
              </motion.div>
            ) : (
              <motion.div 
                className="flex items-center space-x-3"
                variants={itemVariants}
              >
                <Button 
                  variant="secondary" 
                  size="small"
                  onClick={() => navigate('/login')}
                >
                  Вход
                </Button>
                <Button 
                  variant="primary" 
                  size="small"
                  onClick={() => navigate('/register')}
                >
                  Регистрация
                </Button>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-cosmic-purple hover:text-cosmic-blue transition-colors duration-300 p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-space-purple bg-opacity-20 rounded-lg mt-2 overflow-hidden"
            >
              <div className="px-4 py-3 space-y-3">
                {navItems.map((item) => {
                  if (item.protected && !currentUser) return null;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                        isActive(item.path)
                          ? 'bg-cosmic-purple bg-opacity-30 text-cosmic-purple'
                          : 'text-gray-300 hover:text-cosmic-blue hover:bg-cosmic-blue hover:bg-opacity-10'
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span className="font-space">{item.label}</span>
                    </Link>
                  );
                })}
                
                {currentUser ? (
                  <div className="pt-3 border-t border-cosmic-purple border-opacity-30">
                    <div className="flex items-center space-x-3 px-3 py-2 mb-3">
                      <div className="w-8 h-8 bg-cosmic-purple rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {currentUser.email?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-cosmic-green font-space text-sm">
                        {currentUser.email}
                      </span>
                    </div>
                    <Button 
                      variant="danger" 
                      size="small" 
                      className="w-full"
                      onClick={handleLogout}
                    >
                      Выйти
                    </Button>
                  </div>
                ) : (
                  <div className="pt-3 border-t border-cosmic-purple border-opacity-30 space-y-2">
                    <Button 
                      variant="secondary" 
                      size="small"
                      className="w-full"
                      onClick={() => {
                        navigate('/login');
                        setIsMenuOpen(false);
                      }}
                    >
                      Вход
                    </Button>
                    <Button 
                      variant="primary" 
                      size="small"
                      className="w-full"
                      onClick={() => {
                        navigate('/register');
                        setIsMenuOpen(false);
                      }}
                    >
                      Регистрация
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default CosmicNavigation;
