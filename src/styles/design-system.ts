/**
 * Design System - Unified styling constants
 * Central source of truth for all UI components
 * 
 * Usage:
 * import { BUTTON_STYLES, CARD_STYLES } from '../styles/design-system';
 */

// Button Variants - Using DaisyUI classes
export const BUTTON_STYLES = {
  primary: "btn btn-primary shadow-lg hover:shadow-xl transition-all",
  secondary: "btn btn-secondary shadow-lg hover:shadow-xl transition-all",
  accent: "btn btn-accent shadow-lg hover:shadow-xl transition-all",
  ghost: "btn btn-ghost hover:bg-base-300 transition-all",
  outline: "btn btn-outline hover:shadow-md transition-all",
  success: "btn btn-success shadow-lg hover:shadow-xl transition-all",
  error: "btn btn-error shadow-lg hover:shadow-xl transition-all",
  warning: "btn btn-warning shadow-lg hover:shadow-xl transition-all",
  info: "btn btn-info shadow-lg hover:shadow-xl transition-all",
} as const;

// Badge Variants - DaisyUI badges
export const BADGE_STYLES = {
  primary: "badge badge-primary",
  secondary: "badge badge-secondary",
  accent: "badge badge-accent",
  success: "badge badge-success",
  error: "badge badge-error",
  warning: "badge badge-warning",
  info: "badge badge-info",
  ghost: "badge badge-ghost",
  neutral: "badge badge-neutral",
} as const;

// Card Styles - Consistent cards throughout
export const CARD_STYLES = {
  base: "card bg-base-100 border border-base-300 shadow-lg hover:shadow-xl transition-all duration-200",
  elevated: "card bg-base-100 border border-base-300 shadow-xl hover:shadow-2xl transition-all duration-200",
  interactive: "card bg-base-100 border border-base-300 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-200 cursor-pointer",
  compact: "card bg-base-100 border border-base-300 shadow-md hover:shadow-lg transition-all duration-200",
} as const;

// Input Styles
export const INPUT_STYLES = {
  base: "input input-bordered w-full focus:input-primary transition-all",
  error: "input input-bordered input-error w-full",
  success: "input input-bordered input-success w-full",
} as const;

// Status Colors - Semantic colors
export const STATUS_COLORS = {
  sent: {
    bg: "bg-success/10",
    text: "text-success",
    border: "border-success/30",
    badge: "badge badge-success badge-sm",
  },
  pending: {
    bg: "bg-info/10",
    text: "text-info",
    border: "border-info/30",
    badge: "badge badge-info badge-sm",
  },
  error: {
    bg: "bg-error/10",
    text: "text-error",
    border: "border-error/30",
    badge: "badge badge-error badge-sm",
  },
  warning: {
    bg: "bg-warning/10",
    text: "text-warning",
    border: "border-warning/30",
    badge: "badge badge-warning badge-sm",
  },
} as const;

// Alert Styles
export const ALERT_STYLES = {
  success: "alert alert-success shadow-lg",
  error: "alert alert-error shadow-lg",
  warning: "alert alert-warning shadow-lg",
  info: "alert alert-info shadow-lg",
} as const;

// Spacing - Consistent padding and margins
export const SPACING = {
  page: "p-4 sm:p-6 lg:p-8",
  card: "p-4 sm:p-6",
  section: "mb-6 sm:mb-8",
} as const;

// Border Radius
export const RADIUS = {
  sm: "rounded-lg",
  md: "rounded-xl",
  lg: "rounded-2xl",
  full: "rounded-full",
} as const;

// Shadows
export const SHADOWS = {
  sm: "shadow-sm hover:shadow-md",
  md: "shadow-md hover:shadow-lg",
  lg: "shadow-lg hover:shadow-xl",
  xl: "shadow-xl hover:shadow-2xl",
} as const;

