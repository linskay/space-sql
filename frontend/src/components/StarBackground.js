import React, { useEffect, useState } from 'react';
import '../styles.css';

export default function StarBackground({ children, isMainPage = false }) {
  const [stars, setStars] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Создаем случайные звезды
    const newStars = [];
    const starCount = isMainPage ? 150 : 80;
    
    for (let i = 0; i < starCount; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.5 + 0.2
      });
    }
    
    setStars(newStars);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth * 50,
        y: e.clientY / window.innerHeight * 50
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMainPage]);

  return (
    <div 
      className="star-container"
      style={{
        background: isMainPage 
          ? 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' 
          : '#0f0c29'
      }}
    >
      <div 
        className="star-field"
        style={{
          transform: `translate(-${mousePosition.x}px, -${mousePosition.y}px)`
        }}
      >
        {stars.map(star => (
          <div 
            key={star.id}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              transform: `translate(${mousePosition.x * star.speed}px, ${mousePosition.y * star.speed}px)`
            }}
          />
        ))}
      </div>
      <div className="content-layer">
        {children}
      </div>
    </div>
  );
}
