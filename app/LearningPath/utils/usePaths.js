import { useState, useEffect } from "react";

const PATHS_KEY = "dsa-user-paths";

export function usePaths() {
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(PATHS_KEY);
    if (stored) setPaths(JSON.parse(stored));
    else setPaths([]);
  }, []);

  useEffect(() => {
    localStorage.setItem(PATHS_KEY, JSON.stringify(paths));
  }, [paths]);

  const addPath = (path) => setPaths((prev) => [...prev, path]);
  const removePath = (id) =>
    setPaths((prev) => prev.filter((p) => p.id !== id));
  const updatePath = (id, updates) =>
    setPaths((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );

  return { paths, addPath, removePath, updatePath };
}
