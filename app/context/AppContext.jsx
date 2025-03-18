"use client";
import React, { createContext, useContext, useState } from "react";
import { algorithms } from "../algorithms/registry/algo";

// Create the context
const AppContext = createContext();

// Custom hook for using this context
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // Core states for tracking selections
  const [currentCategory, setCurrentCategory] = useState("Sorting");
  const [currentAlgorithm, setCurrentAlgorithm] = useState("selection"); // Make sure this matches your registry

  const changeCategory = (category) => {
    if (algorithms[category]) {
      setCurrentCategory(category);
      // Optionally reset algorithm when category changes
      const firstAlgorithm = Object.keys(algorithms[category])[0];
      if (firstAlgorithm) {
        setCurrentAlgorithm(firstAlgorithm);
      }
    }
  };

  const changeAlgorithm = (algorithmId) => {
    if (algorithms[currentCategory][algorithmId]) {
      setCurrentAlgorithm(algorithmId);
    }
  };

  // Value object to be provided by the context
  const contextValue = {
    currentCategory,
    setCurrentCategory,
    currentAlgorithm,
    setCurrentAlgorithm,
    changeAlgorithm,
    changeCategory,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppContext;
