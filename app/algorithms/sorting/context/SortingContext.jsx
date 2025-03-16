import { createContext, useContext, useState, useEffect } from "react";
import { generateStates } from "../bubbleSort/StateGenerator";

const SortingContext = createContext();

export const SortingProvider = ({ children }) => {
  const [size, setSize] = useState(9); // Add size state
  const [array, setArray] = useState([5, 3, 8, 4, 2, 3, 5, 6, 8]); // Default array
  const [is3D, setIs3D] = useState(false);
  const [sortingStates, setSortingStates] = useState(generateStates(array));

  const [currentStateIndex, setCurrentStateIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1); // Default speed (1000ms per step)

  useEffect(() => {
    setSortingStates(generateStates(array)); // Regenerate states when array changes
    setCurrentStateIndex(0); // Reset index
  }, [array]);

  useEffect(() => {
    let interval;
    if (isPlaying && currentStateIndex < sortingStates.length - 1) {
      interval = setInterval(() => {
        setCurrentStateIndex((prev) => prev + 1);
      }, 1000 / speed);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStateIndex, sortingStates, speed]);

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const reset = () => {
    setIsPlaying(false);
    setCurrentStateIndex(0);
  };
  const nextStep = () => {
    if (currentStateIndex < sortingStates.length - 1) {
      setCurrentStateIndex((prev) => prev + 1);
    }
  };
  const prevStep = () => {
    if (currentStateIndex > 0) {
      setCurrentStateIndex((prev) => prev - 1);
    }
  };

  return (
    <SortingContext.Provider
      value={{
        array,
        setArray,
        sortingStates,
        currentStateIndex,
        isPlaying,
        speed,
        setSpeed,
        size,
        setSize,
        play,
        pause,
        reset,
        nextStep,
        prevStep,
        is3D,
        setIs3D,
      }}
    >
      {children}
    </SortingContext.Provider>
  );
};

export const useSorting = () => useContext(SortingContext);
