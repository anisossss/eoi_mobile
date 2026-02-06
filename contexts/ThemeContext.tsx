/**
 * CSIR EOI 8119 - Theme Context
 */

import React, { createContext, useContext, ReactNode } from "react";
import { colors, typography, spacing } from "@/constants/theme";

interface ThemeContextType {
  colors: typeof colors;
  typography: typeof typography;
  spacing: typeof spacing;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = {
    colors,
    typography,
    spacing,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
