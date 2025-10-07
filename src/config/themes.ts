/**
 * Theme configuration - Single source of truth
 * Update these values when you change themes in index.css
 */

export const THEMES = {
  light: "pastel", // Your light theme from @plugin "daisyui"
  dark: "dark", // Your dark theme from @plugin "daisyui"
} as const;

export type Theme = typeof THEMES.light | typeof THEMES.dark;
