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
      if (pathname === "/category") return "Algorithms";
      if (pathname === "/AlgoMentor") return "AlgoMentor";
      if (pathname === "/LearningPath") return "LearningPath";
      if (pathname === "/about") return "About Us";
      return "Home";
    };

    setActiveTab(getInitialTab());
  }, []); // Only run once on mount

  // Add logging when states change
  useEffect(() => {
    console.log("Current Category:", currentCategory);
    console.log("Current Algorithm:", currentAlgorithm);
  }, [currentCategory, currentAlgorithm]);

  const changeCategory = (category) => {
    console.log("Changing category to:", category);
    if (algorithms[category]) {
      setCurrentCategory(category);
      // If category is fundamentals, set appropriate initial algorithm
      if (category === "Fundamentals") {
        console.log("Setting default Fundamentals algorithm");
        setCurrentAlgorithm("fundamentals-if-else"); // or whatever your default fundamentals algorithm is
      }
    } else {
      console.warn("Invalid category:", category);
    }
  };

  const changeAlgorithm = (algorithmId) => {
    console.log("Attempting to change algorithm to:", algorithmId);
    // const categoryAlgorithms = algorithms[currentCategory];
    // if (categoryAlgorithms && categoryAlgorithms[algorithmId]) {
    //   console.log("Algorithm change successful:", {
    //     category: currentCategory,
    //     algorithm: algorithmId,
    //   });
    setCurrentAlgorithm(algorithmId);
    // } else {
    //   console.warn("Invalid algorithm for category:", {
    //     category: currentCategory,
    //     attemptedAlgorithm: algorithmId,
    //   });
    // }
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
