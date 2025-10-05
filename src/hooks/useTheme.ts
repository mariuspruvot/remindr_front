/**
 * Custom hook for theme management (light/dark mode)
 * Uses DaisyUI themes configured in index.css
 *
 * To change themes: Update src/config/themes.ts
 */

import { useEffect, useState } from "react";
import { THEMES, type Theme } from "../config/themes";

export const useTheme = () => {
  // Get initial theme from localStorage or system preference
  const getInitialTheme = (): Theme => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) return stored;

    // Check system preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return THEMES.dark;
    }
    return THEMES.light;
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Apply theme to HTML element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === THEMES.light ? THEMES.dark : THEMES.light));
  };

  return { theme, toggleTheme, isDark: theme === THEMES.dark };
};
