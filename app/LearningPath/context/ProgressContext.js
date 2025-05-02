// context/ProgressContext.jsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Load progress from localStorage on initial render
  useEffect(() => {
    const savedProgress = localStorage.getItem("dsa-learning-progress");
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch (error) {
        console.error("Failed to parse saved progress:", error);
      }
    }
    setIsLoading(false);
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("dsa-learning-progress", JSON.stringify(progress));
    }
  }, [progress, isLoading]);

  // Mark a node as completed in a specific path
  const completeNode = (pathId, nodeId) => {
    setProgress((prevProgress) => {
      const pathProgress = prevProgress[pathId] || {
        completedNodes: [],
        currentNodeId: null,
      };

      // Add to completed nodes if not already there
      if (!pathProgress.completedNodes.includes(nodeId)) {
        return {
          ...prevProgress,
          [pathId]: {
            ...pathProgress,
            completedNodes: [...pathProgress.completedNodes, nodeId],
          },
        };
      }
      return prevProgress;
    });
  };

  // Set the current active node for a path
  const setCurrentNode = (pathId, nodeId) => {
    setProgress((prevProgress) => {
      const pathProgress = prevProgress[pathId] || {
        completedNodes: [],
        currentNodeId: null,
      };
      return {
        ...prevProgress,
        [pathId]: {
          ...pathProgress,
          currentNodeId: nodeId,
        },
      };
    });
  };

  // Get progress for a specific path
  const getPathProgress = (pathId) => {
    return progress[pathId] || { completedNodes: [], currentNodeId: null };
  };

  // Reset progress for a specific path
  const resetPathProgress = (pathId) => {
    setProgress((prevProgress) => {
      const newProgress = { ...prevProgress };
      delete newProgress[pathId];
      return newProgress;
    });
  };

  // Reset all progress
  const resetAllProgress = () => {
    setProgress({});
    localStorage.removeItem("dsa-learning-progress");
  };

  const value = {
    completeNode,
    setCurrentNode,
    getPathProgress,
    resetPathProgress,
    resetAllProgress,
    isLoading,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}
