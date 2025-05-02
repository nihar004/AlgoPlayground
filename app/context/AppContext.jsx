"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { algorithms } from "../algorithms/registry/algo";
import { usePathname, useRouter } from "next/navigation";

// Create the context
const AppContext = createContext();

// Custom hook for using this context
export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // Core states for tracking selections
  const [currentCategory, setCurrentCategory] = useState("Sorting");
  const [currentAlgorithm, setCurrentAlgorithm] = useState("bubble");
  const [activeTab, setActiveTab] = useState("Algorithms");

  // Add new layout state
  const [layoutMode, setLayoutMode] = useState("default"); // 'default', 'centered', 'minimal'

  const pathname = usePathname();
  const router = useRouter();

  // Sync active tab with the current URL path only on initial load
  useEffect(() => {
    const getInitialTab = () => {
      if (pathname === "/") return "Home";
      if (pathname === "/category" || pathname.includes("/algorithm/"))
        return "Algorithms";
      if (pathname === "/AlgoMentor") return "AlgoMentor";
      if (pathname === "/LearningPath") return "LearningPath";
      if (pathname === "/about") return "About Us";
      return "Home";
    };

    setActiveTab(getInitialTab());
  }, []); // Only run once on mount

  const changeCategory = (category) => {
    if (algorithms[category]) {
      setCurrentCategory(category);
    }
  };

  const changeAlgorithm = (algorithmId) => {
    if (algorithms[currentCategory][algorithmId]) {
      setCurrentAlgorithm(algorithmId);
    }
  };

  const changeTab = async (tabName, href) => {
    if (
      ["Home", "Algorithms", "AlgoMentor", "LearningPath", "About Us"].includes(
        tabName
      )
    ) {
      setActiveTab(tabName);
      if (href) {
        await router.push(href);
      }
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
    activeTab,
    changeTab,
    layoutMode,
    setLayoutMode,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppContext;
