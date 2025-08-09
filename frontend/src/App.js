import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import CosmicNavigation from './components/layout/CosmicNavigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Lessons from './pages/Lessons';
import Practice from './pages/Practice';
import LessonDetails from './components/LessonDetails';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import StarBackground from './components/StarBackground';

// Обёртка для страниц с космическим фоном
const CosmicLayout = ({ children }) => (
  <StarBackground isMainPage={false}>
    <CosmicNavigation />
    <motion.div 
      className="flex-1 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
    <Footer />
  </StarBackground>
);

// Компонент для анимированных переходов страниц
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const AppContent = () => {
  return (
    <div className="app-root min-h-screen flex flex-col">
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={
            <PageTransition>
              <Home />
            </PageTransition>
          } />
          <Route 
            path="/lessons" 
            element={
              <ProtectedRoute>
                <CosmicLayout>
                  <PageTransition>
                    <Lessons />
                  </PageTransition>
                </CosmicLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/lessons/:id" 
            element={
              <ProtectedRoute>
                <CosmicLayout>
                  <PageTransition>
                    <LessonDetails />
                  </PageTransition>
                </CosmicLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/practice" 
            element={
              <ProtectedRoute>
                <CosmicLayout>
                  <PageTransition>
                    <Practice />
                  </PageTransition>
                </CosmicLayout>
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={
            <PageTransition>
              <Login />
            </PageTransition>
          } />
          <Route path="/register" element={
            <PageTransition>
              <Register />
            </PageTransition>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}
