// src/context/ThemeContext.jsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const value = {
    isDarkMode,
    toggleTheme,
  };

  useEffect(() => {
    document.body.className = !isDarkMode
      ? "bg-zinc-50 text-zinc-900"
      : "bg-zinc-900 text-zinc-50";
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
