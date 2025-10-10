/**
 * Theme configuration - Single source of truth
 * Update these values when you change themes in index.css
 * 
 * Using clean, professional themes:
 * - winter: Clean, minimal, professional light theme
 * - nord: Elegant, minimal dark theme inspired by Nordic design
 */

export const THEMES = {
  light: "winter", // Clean professional light theme
  dark: "nord", // Elegant Nordic dark theme
} as const;

export type Theme = typeof THEMES.light | typeof THEMES.dark;
