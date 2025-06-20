import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Lessons from './pages/Lessons';
import LessonDetails from './components/LessonDetails';
import StarBackground from './components/StarBackground';
import './styles.css';

export default function App() {
  return (
    <Router>
      <div className="app-root">
        <Routes>
          <Route 
            path="/" 
            element={
              <StarBackground isMainPage={true}>
                <Header />
                <Home />
              </StarBackground>
            } 
          />
          <Route 
            path="/lessons" 
            element={
              <div className="lessons-page-wrapper">
                <StarBackground isMainPage={false}>
                  <Header />
                  <Lessons />
                  <Footer className="transparent-footer" />
                </StarBackground>
              </div>
            } 
          />
          <Route 
            path="/lessons/:id" 
            element={
              <div className="lesson-page-wrapper">
                <Header />
                <LessonDetails />
                <Footer className="transparent-footer" />
              </div>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}
