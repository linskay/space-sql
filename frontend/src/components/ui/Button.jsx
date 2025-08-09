import React, { useMemo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

// Thickness border effect: smooth border-width and glow on hover/press
const ThicknessBorder = ({ color = '#2de2e6', borderColor = 'rgba(138,43,226,0.35)' }) => (
  <>
    {/* Base subtle border */}
    <div
      aria-hidden
      className="absolute inset-0 rounded-xl pointer-events-none"
      style={{ border: `1px solid ${borderColor}` }}
    />
    {/* Animated thick border on hover */}
    <motion.div
      aria-hidden
      className="absolute inset-0 rounded-xl pointer-events-none"
      initial={{ borderWidth: 1, boxShadow: 'none', opacity: 0.9 }}
      whileHover={{ borderWidth: 2, boxShadow: `0 0 12px ${color}` }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      style={{ borderStyle: 'solid', borderColor: color }}
    />
  </>
);

// Neon flow along the contour (thin, precise, intermittent glow)
const NeonFlowBorder = ({
  from = '#8a2be2',
  to = '#2de2e6',
  opacity = 0.5,
  gradientId = 'btn-neon-grad',
}) => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-xl opacity-60 group-hover:opacity-95 transition-opacity duration-300 z-[1]" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
    <defs>
      <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor={from} />
        <stop offset="50%" stopColor={to} />
        <stop offset="100%" stopColor={from} />
      </linearGradient>
    </defs>
    {/* Hairline base to keep contour crisp */}
    <rect x="1" y="1" width="98" height="98" rx="12" ry="12" fill="none" stroke={from} strokeOpacity="0.1" strokeWidth="0.6" />
    {/* Moving highlight segment */}
    <motion.rect
      x="1" y="1" width="98" height="98" rx="12" ry="12"
      fill="none"
      stroke={`url(#${gradientId})`}
      strokeWidth="0.7"
      strokeDasharray="28 360"
      animate={{ strokeDashoffset: [0, -388], opacity: [opacity, 0.06, opacity] }}
      transition={{ repeat: Infinity, duration: 3.2, ease: 'linear' }}
      style={{ filter: `drop-shadow(0 0 3px ${to})` }}
    />
  </svg>
);

// New animated button inspired by star-border, adapted to project palette
const StarButton = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  onClick,
  type = 'button',
  starColor = '#2de2e6',
  borderColor = 'rgba(138,43,226,0.35)',
  glowEffect = true,
  magnetic = false,
  'aria-label': ariaLabel,
  ...props
}) => {
  // Backward-compat for old size values
  const normalizedSize = useMemo(() => {
    if (size === 'small') return 'sm';
    if (size === 'medium') return 'md';
    if (size === 'large') return 'lg';
    return size;
  }, [size]);

  const sizeClasses = {
    sm: 'py-1.5 px-4 text-sm',
    md: 'py-2.5 px-6 text-base',
    lg: 'py-3.5 px-8 text-lg',
  };

  const variantClasses = {
    // Все варианты без заливки, с текстом и границей анимацией сверху
    primary: 'bg-transparent text-white',
    secondary: 'bg-transparent text-cosmic-blue',
    ghost: 'bg-transparent text-white/90',
    danger: 'bg-transparent text-red-400',
  };

  const baseClasses = `group relative inline-flex items-center justify-center font-bold rounded-xl border transition-all duration-300 select-none
    focus:outline-none focus-visible:ring-2 focus-visible:ring-cosmic-purple focus-visible:ring-offset-2 focus-visible:ring-offset-space-dark
    disabled:opacity-50 disabled:cursor-not-allowed`;

  const buttonClasses = `${baseClasses} ${variantClasses[variant] || ''} ${sizeClasses[normalizedSize] || ''} ${className}`;

  // Magnetic effect (slight attraction towards cursor)
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const handleMouseMove = useCallback((e) => {
    if (!magnetic || disabled) return;
    const target = e.currentTarget.getBoundingClientRect();
    const cx = target.left + target.width / 2;
    const cy = target.top + target.height / 2;
    const dx = (e.clientX - cx) / (target.width / 2);
    const dy = (e.clientY - cy) / (target.height / 2);
    const strength = 6; // px
    setOffset({ x: Math.max(-strength, Math.min(strength, dx * strength)), y: Math.max(-strength, Math.min(strength, dy * strength)) });
  }, [magnetic, disabled]);
  const resetOffset = useCallback(() => setOffset({ x: 0, y: 0 }), []);

  // Ripple effect from cursor on click
  const [ripples, setRipples] = useState([]);
  const handleInternalClick = useCallback((e) => {
    if (disabled || loading) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Math.random().toString(36).slice(2);
    setRipples((prev) => [...prev, { id, x, y }]);
    // auto remove ripple
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 700);
    if (onClick) onClick(e);
  }, [disabled, loading, onClick]);

  return (
    <motion.button
      type={type}
      aria-label={ariaLabel}
      aria-disabled={disabled || loading}
      className={buttonClasses}
      style={{ borderColor }}
      disabled={disabled || loading}
      onClick={handleInternalClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetOffset}
      initial={false}
      whileHover={{
        scale: disabled ? 1 : 1.03,
        x: offset.x,
        y: offset.y,
        boxShadow: glowEffect && !disabled ? `0 0 12px ${starColor}` : 'none',
      }}
      whileTap={{ scale: disabled ? 1 : 0.98, filter: glowEffect && !disabled ? `brightness(1.06)` : 'none' }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      {...props}
    >
      {/* Thickness border effect */}
      <ThicknessBorder color={starColor} borderColor={borderColor} />
      {/* Neon flow border (unique gradient id per instance) */}
      <NeonFlowBorder
        from={borderColor.includes('rgba') ? '#8a2be2' : borderColor}
        to={starColor}
        opacity={0.5}
        gradientId={`btn-neon-${Math.random().toString(36).slice(2)}`}
      />

      {/* Content */}
      <div className="relative z-10 inline-flex items-center">
        {loading && <div className="loading-spinner mr-2" />}
        {children}
      </div>

      {/* Ripples */}
      <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none" aria-hidden>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ opacity: 0.5, scale: 0 }}
            animate={{ opacity: 0, scale: 2.2 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: r.y,
              left: r.x,
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${starColor} 0%, transparent 60%)`,
              transform: 'translate(-50%, -50%)',
              filter: `drop-shadow(0 0 8px ${starColor})`,
            }}
          />
        ))}
      </div>
    </motion.button>
  );
};

export default StarButton;
