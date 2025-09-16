import React from 'react';
import { motion } from 'framer-motion';

interface AnomaLogoProps {
  size?: number;
  className?: string;
  animated?: boolean;
  logoSrc?: string; // Optional external logo source
}

const AnomaLogo: React.FC<AnomaLogoProps> = ({
  size = 80,
  className = '',
  animated = true,
  logoSrc
}) => {
  // If external logo is provided, use it instead of custom SVG
  if (logoSrc) {
    return (
      <motion.div
        className={`anoma-logo ${className}`}
        initial={animated ? { scale: 0, rotate: -180 } : undefined}
        animate={animated ? { scale: 1, rotate: 0 } : undefined}
        transition={animated ? {
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 1
        } : undefined}
        style={{ width: size, height: size }}
      >
        <img
          src={logoSrc}
          alt="Anoma Logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.3))'
          }}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`anoma-logo ${className}`}
      initial={animated ? { scale: 0, rotate: -180 } : undefined}
      animate={animated ? { scale: 1, rotate: 0 } : undefined}
      transition={animated ? {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 1
      } : undefined}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Circle */}
        <motion.circle
          cx="100"
          cy="100"
          r="95"
          stroke="url(#gradient1)"
          strokeWidth="3"
          fill="none"
          initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
          animate={animated ? { pathLength: 1, opacity: 1 } : undefined}
          transition={animated ? { duration: 1.5, ease: "easeInOut" } : undefined}
        />

        {/* Inner Hexagon */}
        <motion.path
          d="M100 30 L155 65 L155 135 L100 170 L45 135 L45 65 Z"
          stroke="url(#gradient2)"
          strokeWidth="2.5"
          fill="rgba(139, 92, 246, 0.1)"
          initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
          animate={animated ? { pathLength: 1, opacity: 1 } : undefined}
          transition={animated ? { duration: 1.5, ease: "easeInOut", delay: 0.2 } : undefined}
        />

        {/* Center "A" Shape */}
        <motion.path
          d="M75 140 L100 80 L125 140 M85 120 L115 120"
          stroke="url(#gradient3)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
          animate={animated ? { pathLength: 1, opacity: 1 } : undefined}
          transition={animated ? { duration: 1.5, ease: "easeInOut", delay: 0.4 } : undefined}
        />

        {/* Connecting Lines */}
        <motion.path
          d="M100 30 L100 80 M100 140 L100 170"
          stroke="url(#gradient2)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
          animate={animated ? { pathLength: 1, opacity: 1 } : undefined}
          transition={animated ? { duration: 1.5, ease: "easeInOut", delay: 0.6 } : undefined}
        />

        {/* Side Connectors */}
        <motion.path
          d="M45 65 L75 80 M125 80 L155 65 M45 135 L75 120 M125 120 L155 135"
          stroke="url(#gradient2)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.7"
          initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
          animate={animated ? { pathLength: 1, opacity: 0.7 } : undefined}
          transition={animated ? { duration: 1.5, ease: "easeInOut", delay: 0.8 } : undefined}
        />

        {/* Decorative Dots */}
        <motion.circle
          cx="100" cy="50" r="3"
          fill="url(#gradient3)"
          initial={animated ? { scale: 0 } : undefined}
          animate={animated ? { scale: 1 } : undefined}
          transition={animated ? { delay: 1, duration: 0.3 } : undefined}
        />
        <motion.circle
          cx="100" cy="150" r="3"
          fill="url(#gradient3)"
          initial={animated ? { scale: 0 } : undefined}
          animate={animated ? { scale: 1 } : undefined}
          transition={animated ? { delay: 1.1, duration: 0.3 } : undefined}
        />
        <motion.circle
          cx="65" cy="75" r="2"
          fill="url(#gradient2)"
          initial={animated ? { scale: 0 } : undefined}
          animate={animated ? { scale: 1 } : undefined}
          transition={animated ? { delay: 1.2, duration: 0.3 } : undefined}
        />
        <motion.circle
          cx="135" cy="75" r="2"
          fill="url(#gradient2)"
          initial={animated ? { scale: 0 } : undefined}
          animate={animated ? { scale: 1 } : undefined}
          transition={animated ? { delay: 1.3, duration: 0.3 } : undefined}
        />
        <motion.circle
          cx="65" cy="125" r="2"
          fill="url(#gradient2)"
          initial={animated ? { scale: 0 } : undefined}
          animate={animated ? { scale: 1 } : undefined}
          transition={animated ? { delay: 1.4, duration: 0.3 } : undefined}
        />
        <motion.circle
          cx="135" cy="125" r="2"
          fill="url(#gradient2)"
          initial={animated ? { scale: 0 } : undefined}
          animate={animated ? { scale: 1 } : undefined}
          transition={animated ? { delay: 1.5, duration: 0.3 } : undefined}
        />

        {/* Gradients */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>

          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>

          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>

          {/* Glow Effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Apply glow to all elements */}
        <style>
          {`
            .anoma-logo svg * {
              filter: url(#glow);
            }
          `}
        </style>
      </svg>
    </motion.div>
  );
};

export default AnomaLogo;