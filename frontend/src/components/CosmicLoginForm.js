import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Input, Card } from './ui';

const CosmicLoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  isSubmitting,
  error,
}) => {
  const formVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <Card className="animate-float">
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-cosmic text-center text-cosmic-purple glow-text mb-8">
              Вход в систему
            </h2>
          </motion.div>

          {error && (
            <motion.div 
              variants={itemVariants}
              className="bg-red-900 bg-opacity-30 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6 text-center"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants}>
              <Input
                type="email"
                label="Электронная почта"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Input
                type="password"
                label="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                {isSubmitting ? 'Вход...' : 'Войти'}
              </Button>
            </motion.div>
          </form>

          <motion.div variants={itemVariants} className="text-center mt-6">
            <p className="text-gray-400">
              Еще нет аккаунта?{' '}
              <Link 
                to="/register" 
                className="text-cosmic-blue hover:text-cosmic-purple transition-colors duration-300 font-space"
              >
                Зарегистрируйтесь
              </Link>
            </p>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
};

export default CosmicLoginForm;
