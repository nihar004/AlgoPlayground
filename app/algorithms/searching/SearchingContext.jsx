import { createContext, useContext, useState, useEffect } from "react";
import { useAppContext } from "@/app/context/AppContext";

const SearchContext = createContext();

export const SearchingProvider = ({ children }) => {
  const [size, setSize] = useState(10); // Add size state
  const [array, setArray] = useState([
    37, -43, -84, -14, -23, -30, 79, -7, -38, 17,
  ]); // Default array
  const [states, setStates] = useState([]);

  const [currentStateIndex, setCurrentStateIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1); // Default speed (1000ms per step)
  const { currentAlgorithm } = useAppContext();
  const [target, setTarget] = useState(79);

  useEffect(() => {
    if (!currentAlgorithm) return;

    import(`./${currentAlgorithm}Search/StateGenerator`)
      .then((module) => {
        // Assuming each module exports a generateStates function
        const generateStates = module.generateStates;
        const newStates = generateStates(array, target);
        setStates(newStates);
        setCurrentStateIndex(0);
      })
      .catch((err) => {
        console.error(
          `Failed to load StateGenerator for ${currentAlgorithm}:`,
          err
        );
        // Optionally, fallback to an empty state or a default generator
        setStates([]);
        setCurrentStateIndex(0);
      });
  }, [currentAlgorithm, array, target]);

  useEffect(() => {
    let interval;
    if (isPlaying && currentStateIndex < states.length - 1) {
      interval = setInterval(() => {
        setCurrentStateIndex((prev) => prev + 1);
      }, 1000 / speed);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStateIndex, states, speed]);

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const reset = () => {
    setIsPlaying(false);
    setCurrentStateIndex(0);
  };
  const nextStep = () => {
    if (currentStateIndex < states.length - 1) {
      setCurrentStateIndex((prev) => prev + 1);
    }
  };
  const prevStep = () => {
    if (currentStateIndex > 0) {
      setCurrentStateIndex((prev) => prev - 1);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        array,
        setArray,
        states,
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
        target,
        setTarget,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearching = () => useContext(SearchContext);
