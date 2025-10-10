/**
 * Animation constants and configurations
 * Used for consistent motion design across the app
 */

/**
 * Custom easing curves for smooth animations
 * Inspired by Apple's design system
 */
export const EASING = {
  /** Smooth ease-out for natural motion */
  smooth: [0.16, 1, 0.3, 1] as const,
  /** Default ease for general animations */
  default: [0.25, 0.4, 0.25, 1] as const,
} as const;

/**
 * Animation durations in seconds
 */
export const DURATION = {
  fast: 0.4,
  medium: 1,
  slow: 1.2,
  verySlow: 2,
} as const;

/**
 * Animation delays for staggered effects
 */
export const DELAY = {
  none: 0,
  short: 0.2,
  medium: 0.4,
  long: 0.6,
  veryLong: 0.8,
} as const;

/**
 * Common animation variants
 */
export const VARIANTS = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  },
} as const;
