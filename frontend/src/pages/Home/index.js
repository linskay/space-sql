import React from 'react';
import { Link } from 'react-router-dom';
import StarBackground from '../../components/StarBackground';
import Footer from '../../components/Footer';

const Home = () => {

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Звёздный фон */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1
      }}>
        <StarBackground isMainPage={true} />
      </div>
      
      {/* Основной контент */}
      <div style={{
        position: 'relative',
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        color: 'white',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: 'rgba(10, 10, 26, 0.7)'
      }}>
      <h1 style={{
        fontSize: '3rem',
        marginBottom: '1.5rem',
        background: 'linear-gradient(90deg, #8a2be2, #00ff9d)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontFamily: '"Press Start 2P", cursive',
      }}>
        Space SQL
      </h1>
      
      <p style={{
        fontSize: '1.5rem',
        marginBottom: '3rem',
        fontFamily: '"Roboto Mono", monospace',
      }}>
        Изучайте SQL, покоряя космос
      </p>
      
      <Link 
        to="/lessons" 
        style={{
          padding: '1rem 2.5rem',
          background: 'linear-gradient(45deg, #8a2be2, #00ff9d)',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          textDecoration: 'none',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(138, 43, 226, 0.4)',
        }}
      >
        Начать обучение
      </Link>
      </div>
      
      {/* Футер */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        backgroundColor: 'rgba(15, 12, 41, 0.8)',
        backdropFilter: 'blur(5px)',
        padding: '1rem 0',
        marginTop: 'auto'
      }}>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
