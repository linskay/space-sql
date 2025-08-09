import React, { useEffect, useState, useRef, useCallback } from 'react';
import '../styles.css';

const StarBackground = ({ children, isMainPage = true }) => {
  const [stars, setStars] = useState([]);
  const containerRef = useRef(null);
  // Separate RAF refs for smoothing loop and star update loop
  const smoothRafRef = useRef(null);
  const starsRafRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const cursorPx = useRef({ x: 0, y: 0 });

  // Create stars with more variety
  useEffect(() => {
    const starCount = isMainPage ? 200 : 100;
    const newStars = [];
    
    for (let i = 0; i < starCount; i++) {
      // Size distribution: 55% small (1-2.5), 35% medium (2.5-4.5), 10% large (5-8)
      const r = Math.random();
      let size;
      if (r < 0.55) {
        size = isMainPage ? Math.random() * 1.5 + 1 : Math.random() * 1 + 0.5;
      } else if (r < 0.9) {
        size = isMainPage ? Math.random() * 2 + 2.5 : Math.random() * 1.5 + 1.5;
      } else {
        size = isMainPage ? Math.random() * 3 + 5 : Math.random() * 2 + 3.5;
      }
      const opacity = isMainPage ? Math.random() * 0.8 + 0.2 : Math.random() * 0.5 + 0.1;
      
      newStars.push({
        id: `star-${i}-${Math.random().toString(36).substr(2, 9)}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: size,
        opacity: opacity,
        speed: (Math.random() * 0.6 + 0.2) * (isMainPage ? 1 : 0.5),
        // Add some twinkle effect
        twinkleSpeed: Math.random() * 0.01 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2
      });
    }
    
    setStars(newStars);
  }, [isMainPage]);

  // Update stars position based on mouse movement with enhanced parallax + subtle magnetic effect
  const updateStars = useCallback(() => {
    if (!isMainPage) return;
    
    const container = containerRef.current;
    const starElements = container ? container.querySelectorAll('.star') : [];
    const time = Date.now();
    if (!container) return;
    
    // Get container dimensions for center calculation
    const rect = container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    starElements.forEach((starEl, index) => {
      const star = stars[index];
      if (!star) return;
      
      // Calculate distance from center (0 to 1)
      const dx = (star.x / 100 * rect.width - centerX) / centerX;
      const dy = (star.y / 100 * rect.height - centerY) / centerY;
      const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);
      
      // More subtle parallax effect that follows cursor direction
      const parallaxMultiplier = 0.5 + distanceFromCenter * 1.5; // Reduced base multiplier
      // Stars move in the same direction as cursor but with varying intensity
      const offsetX = mousePosition.current.x * star.speed * parallaxMultiplier * 0.6; // Reduced multiplier
      const offsetY = mousePosition.current.y * star.speed * parallaxMultiplier * 0.6;
      
      // Subtle magnetic attraction towards the cursor when nearby
      const starPosX = (star.x / 100) * rect.width;
      const starPosY = (star.y / 100) * rect.height;
      const toCursorX = cursorPx.current.x - starPosX;
      const toCursorY = cursorPx.current.y - starPosY;
      const distToCursor = Math.hypot(toCursorX, toCursorY);
      const magnetRadius = 140; // px
      const magnetStrength = 0.35; // base strength
      let magnetX = 0;
      let magnetY = 0;
      if (distToCursor > 0 && distToCursor < magnetRadius) {
        const influence = 1 - distToCursor / magnetRadius; // 0..1
        const strength = magnetStrength * influence * influence * star.speed; // ease-in
        magnetX = toCursorX * strength;
        magnetY = toCursorY * strength;
      }

      // Add dynamic twinkling effect
      const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.4 + 0.6;
      const currentOpacity = star.opacity * twinkle;
      
      // Add subtle scale effect based on movement
      const moveIntensity = (Math.abs(mousePosition.current.x) + Math.abs(mousePosition.current.y)) / 50;
      const scale = 1 + (moveIntensity * star.speed * 0.2);
      
      // Apply transformations and styles with enhanced effects
      starEl.style.transform = `translate(${offsetX + magnetX}px, ${offsetY + magnetY}px) scale(${scale})`;
      starEl.style.opacity = currentOpacity;
      
      // Add color shift based on position and time
      const hue = (time * 0.01 + star.x + star.y) % 360;
      starEl.style.backgroundColor = `hsla(${hue}, 80%, 90%, ${currentOpacity * 0.8})`;
      starEl.style.boxShadow = `0 0 ${star.size * 4}px ${star.size / 2}px hsla(${hue}, 80%, 90%, ${currentOpacity * 0.3})`;
    });
    
    // Continue the animation loop
    starsRafRef.current = requestAnimationFrame(updateStars);
  }, [isMainPage, stars]);


  // Mouse move handler with smoother tracking
  useEffect(() => {
    if (!isMainPage) return;

    // Smoother mouse position tracking
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    const easing = 0.05; // Lower = smoother but slower to respond

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      // Calculate position relative to center (-0.5 to 0.5)
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 60; // Increased range for more movement
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 60;
      // Store absolute cursor position in container space for magnet effect
      cursorPx.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const animate = () => {
      // Smoothly interpolate current position towards target
      currentX += (targetX - currentX) * easing;
      currentY += (targetY - currentY) * easing;
      
      // Apply the smoothed position
      mousePosition.current = { x: currentX, y: currentY };
      
      // Continue the animation loop
      smoothRafRef.current = requestAnimationFrame(animate);
    };

    // Track mouse globally so фон позади контента тоже реагирует
    window.addEventListener('mousemove', handleMouseMove);
    // Start the animation loop
    smoothRafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      // Clean up animation frame
      if (smoothRafRef.current) cancelAnimationFrame(smoothRafRef.current);
      if (starsRafRef.current) cancelAnimationFrame(starsRafRef.current);
    };
  }, [isMainPage]);

  // Start the star update loop when stars are created
  useEffect(() => {
    if (!isMainPage) return;
    if (stars.length === 0) return;
    // Kick off the loop once, it will re-schedule itself
    starsRafRef.current = requestAnimationFrame(updateStars);
    return () => {
      if (starsRafRef.current) cancelAnimationFrame(starsRafRef.current);
    };
  }, [isMainPage, stars, updateStars]);

  // Generate star elements with optimized rendering
  const renderStars = () => {
    return stars.map((star) => (
      <div 
        key={star.id}
        className="star"
        style={{
          position: 'absolute',
          left: `${star.x}%`,
          top: `${star.y}%`,
          width: `${star.size}px`,
          height: `${star.size}px`,
          opacity: star.opacity,
          borderRadius: '50%',
          backgroundColor: 'white',
          pointerEvents: 'none',
          transform: 'translate(0, 0)',
          transition: 'transform 0.1s ease-out, opacity 1s ease-in-out',
          willChange: 'transform, opacity',
          zIndex: 1,
          boxShadow: `0 0 ${star.size * 3}px ${star.size / 2}px rgba(255, 255, 255, ${star.opacity * 0.5})`
        }}
      />
    ));
  };

  return (
    <div 
      ref={containerRef}
      className="star-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: isMainPage 
          ? 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' 
          : 'linear-gradient(135deg, #0a081a 0%, #201d47 50%, #18182f 100%)',
        zIndex: -1
      }}
    >
      <div className="star-field">
        {renderStars()}
      </div>
      
      <div className="content-layer">
        {children}
      </div>
    </div>
  );
};

export default React.memo(StarBackground);
