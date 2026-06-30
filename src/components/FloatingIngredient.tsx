import React from 'react';
import { motion } from 'motion/react';

interface FloatingIngredientProps {
  type: 'basil' | 'tomato' | 'chili' | 'olive' | 'mushroom' | 'onion';
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  xOffset?: number;
  rotateOffset?: number;
}

export const FloatingIngredient: React.FC<FloatingIngredientProps> = ({
  type,
  className = '',
  delay = 0,
  duration = 6,
  yOffset = 20,
  xOffset = 10,
  rotateOffset = 15,
}) => {
  // Return premium vector SVGs with gradient styling
  const renderSvg = () => {
    switch (type) {
      case 'basil':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="basilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ADE80" />
                <stop offset="50%" stopColor="#22C55E" />
                <stop offset="100%" stopColor="#15803D" />
              </linearGradient>
              <linearGradient id="basilVein" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#86EFAC" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#166534" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {/* Main leaf body */}
            <path
              d="M 10 50 C 30 15, 70 15, 90 50 C 70 85, 30 85, 10 50 Z"
              fill="url(#basilGrad)"
            />
            {/* Center vein */}
            <path
              d="M 10 50 Q 50 48, 90 50"
              stroke="url(#basilVein)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Side veins */}
            <path d="M 30 46 Q 38 32, 45 28" stroke="url(#basilVein)" strokeWidth="1.5" fill="none" />
            <path d="M 50 48 Q 58 32, 65 28" stroke="url(#basilVein)" strokeWidth="1.5" fill="none" />
            <path d="M 35 54 Q 43 68, 50 72" stroke="url(#basilVein)" strokeWidth="1.5" fill="none" />
            <path d="M 55 52 Q 63 68, 70 72" stroke="url(#basilVein)" strokeWidth="1.5" fill="none" />
          </svg>
        );

      case 'tomato':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
            <defs>
              <radialGradient id="tomatoGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#F87171" />
                <stop offset="40%" stopColor="#EF4444" />
                <stop offset="85%" stopColor="#B91C1C" />
                <stop offset="100%" stopColor="#7F1D1D" />
              </radialGradient>
              <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ADE80" />
                <stop offset="100%" stopColor="#15803D" />
              </linearGradient>
            </defs>
            {/* Tomato Sphere */}
            <circle cx="50" cy="53" r="38" fill="url(#tomatoGrad)" />
            
            {/* Tomato Stem/Calyx */}
            <path
              d="M 50 15 L 47 22 L 40 18 L 45 25 L 37 28 L 46 30 L 50 32 L 54 30 L 63 28 L 55 25 L 60 18 L 53 22 Z"
              fill="url(#stemGrad)"
            />
            {/* Gloss Highlight */}
            <ellipse cx="38" cy="38" rx="8" ry="4" transform="rotate(-30, 38, 38)" fill="#FFFFFF" fillOpacity="0.4" />
          </svg>
        );

      case 'chili':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="chiliGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ADE80" />
                <stop offset="60%" stopColor="#16A34A" />
                <stop offset="100%" stopColor="#14532D" />
              </linearGradient>
            </defs>
            {/* Curved Chili Body */}
            <path
              d="M 20 20 C 40 45, 55 75, 50 85 C 48 83, 35 60, 15 45 C 5 35, 10 25, 20 20 Z"
              fill="url(#chiliGrad)"
            />
            {/* Green Stem */}
            <path
              d="M 18 18 C 22 14, 28 8, 30 10 C 27 12, 22 16, 20 20 Z"
              fill="#15803D"
            />
          </svg>
        );

      case 'olive':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
            <defs>
              <radialGradient id="oliveGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#4B5563" />
                <stop offset="60%" stopColor="#1F2937" />
                <stop offset="100%" stopColor="#030712" />
              </radialGradient>
            </defs>
            {/* Sliced olive (ring) */}
            <path
              d="M 50 15 C 69.33 15, 85 30.67, 85 50 C 85 69.33, 69.33 85, 50 85 C 30.67 85, 15 69.33, 15 50 C 15 30.67, 30.67 15, 50 15 Z M 50 32 C 40.06 32, 32 40.06, 32 50 C 32 59.94, 40.06 68, 50 68 C 59.94 68, 68 59.94, 68 50 C 68 40.06, 59.94 32, 50 32 Z"
              fill="url(#oliveGrad)"
            />
            {/* Shine */}
            <circle cx="35" cy="35" r="4" fill="#FFFFFF" fillOpacity="0.25" />
          </svg>
        );

      case 'mushroom':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="mushCap" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E2E8F0" />
                <stop offset="100%" stopColor="#CBD5E1" />
              </linearGradient>
              <linearGradient id="mushGills" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#94A3B8" />
                <stop offset="50%" stopColor="#64748B" />
                <stop offset="100%" stopColor="#94A3B8" />
              </linearGradient>
            </defs>
            {/* Stem */}
            <path
              d="M 42 50 L 58 50 L 55 85 L 45 85 Z"
              fill="#F1F5F9"
              stroke="#CBD5E1"
              strokeWidth="2"
            />
            {/* Gills under cap */}
            <ellipse cx="50" cy="50" rx="35" ry="12" fill="url(#mushGills)" />
            {/* Cap */}
            <path
              d="M 12 50 C 12 20, 88 20, 88 50 C 80 47, 20 47, 12 50 Z"
              fill="url(#mushCap)"
              stroke="#94A3B8"
              strokeWidth="1.5"
            />
            {/* Gill lines */}
            <line x1="30" y1="50" x2="33" y2="44" stroke="#475569" strokeWidth="1.5" />
            <line x1="40" y1="52" x2="42" y2="44" stroke="#475569" strokeWidth="1.5" />
            <line x1="50" y1="52" x2="50" y2="44" stroke="#475569" strokeWidth="1.5" />
            <line x1="60" y1="52" x2="58" y2="44" stroke="#475569" strokeWidth="1.5" />
            <line x1="70" y1="50" x2="67" y2="44" stroke="#475569" strokeWidth="1.5" />
          </svg>
        );

      case 'onion':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
            <defs>
              <linearGradient id="onionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F472B6" />
                <stop offset="70%" stopColor="#DB2777" />
                <stop offset="100%" stopColor="#831843" />
              </linearGradient>
            </defs>
            {/* Red onion ring */}
            <path
              d="M 50 10 C 72.1 10, 90 27.9, 90 50 C 90 72.1, 72.1 90, 50 90 C 27.9 90, 10 72.1, 10 50 C 10 27.9, 27.9 10, 50 10 Z M 50 22 C 34.54 22, 22 34.54, 22 50 C 22 65.46, 34.54 78, 50 78 C 65.46 78, 78 65.46, 78 50 C 78 34.54, 65.46 22, 50 22 Z"
              fill="url(#onionGrad)"
            />
            {/* Inner rings (slight translucent lines) */}
            <circle cx="50" cy="50" r="34" stroke="#FCE7F3" strokeWidth="1.5" fill="none" strokeOpacity="0.4" />
            <circle cx="50" cy="50" r="30" stroke="#FCE7F3" strokeWidth="1" fill="none" strokeOpacity="0.3" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      className={`absolute select-none pointer-events-none ${className}`}
      initial={{ x: 0, y: 0, rotate: 0 }}
      animate={{
        y: [0, yOffset, -yOffset, 0],
        x: [0, xOffset, -xOffset, 0],
        rotate: [0, rotateOffset, -rotateOffset, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        delay: delay,
      }}
    >
      {renderSvg()}
    </motion.div>
  );
};
