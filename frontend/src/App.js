import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Navigation from './components/layout/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Lessons from './pages/Lessons';
import Practice from './pages/Practice';
import LessonDetails from './components/LessonDetails';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import StarBackground from './components/StarBackground';
import './styles.css';

// Обёртка для страниц с тёмным фоном
const DarkLayout = ({ children }) => (
  <StarBackground isMainPage={false}>
    <Navigation />
    <div className="page-content">
      {children}
    </div>
    <Footer className="transparent-footer" />
  </StarBackground>
);

const AppContent = () => {
  return (
    <div className="app-root">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/lessons" 
          element={
            <ProtectedRoute>
              <DarkLayout>
                <Lessons />
              </DarkLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/lessons/:id" 
          element={
            <ProtectedRoute>
              <DarkLayout>
                <LessonDetails />
              </DarkLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/practice" 
          element={
            <ProtectedRoute>
              <div className="practice-page-wrapper">
                <Practice />
                <Footer className="transparent-footer" />
              </div>
            </ProtectedRoute>
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
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
