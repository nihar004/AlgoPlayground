import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const ArrayContext = createContext();

export const ArrayContextProvider = ({ children }) => {
  // Basic array controls
  const [size, setSize] = useState(9);
  const [array, setArray] = useState([5, 3, 8, 4, 2, 3, 5, 6, 8]);

  // Ensure algorithmStates is always initialized with a default state
  const defaultState = {
    array: array,
    indices: {
      i: null,
      j: null,
      minIndex: null,
      current: null,
      pivotIndex: null,
      compareIndices: null,
      swapIndices: null,
    },
    variables: {},
    action: "",
    finalPositions: [],
    description: "Initial state",
  };

  // Initialize with default state
  const [algorithmStates, setAlgorithmStates] = useState([defaultState]);
  const [currentStateIndex, setCurrentStateIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [isPaused, setIsPaused] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [generateStatesFunction, setGenerateStatesFunction] = useState(null);

  useEffect(() => {
    let interval;
    // Add null check for algorithmStates
    if (
      isPlaying &&
      algorithmStates &&
      currentStateIndex < algorithmStates.length - 1
    ) {
      interval = setInterval(() => {
        setCurrentStateIndex((prev) => prev + 1);
      }, 1000 / speed);
    } else if (
      algorithmStates &&
      currentStateIndex >= algorithmStates.length - 1
    ) {
      setIsPlaying(false);
      setIsCompleted(true);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentStateIndex, algorithmStates, speed]);

  // Control functions
  const play = () => {
    setIsPlaying(true);
    setIsPaused(false);
  };

  const pause = () => {
    setIsPlaying(false);
    setIsPaused(true);
  };

  const reset = () => {
    setIsPlaying(false);
    setIsPaused(true);
    setCurrentStateIndex(0);
    setIsCompleted(false);
    setCurrentStep(0);
  };

  // Add safety check for algorithmStates in control functions
  const nextStep = () => {
    if (algorithmStates && currentStateIndex < algorithmStates.length - 1) {
      setCurrentStateIndex((prev) => prev + 1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStateIndex > 0) {
      setCurrentStateIndex((prev) => prev - 1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Add function to generate new random array
  const generateArray = (size) => {
    const newArray = Array.from(
      { length: size },
      () => Math.floor(Math.random() * 50) + 1
    );
    setArray(newArray);
    reset();
  };

  // Update the updateStatesWithNewArray function with error handling
  const updateStatesWithNewArray = useCallback(
    (newArray) => {
      if (generateStatesFunction) {
        try {
          const states = generateStatesFunction(newArray);
          if (Array.isArray(states) && states.length > 0) {
            setAlgorithmStates(states);
            setCurrentStateIndex(0);
            setIsCompleted(false);
          }
        } catch (error) {
          console.error("Error generating new states:", error);
          setAlgorithmStates([
            {
              array: newArray,
              indices: {
                i: null,
                j: null,
                minIndex: null,
                current: null,
                pivotIndex: null,
                compareIndices: null,
                swapIndices: null,
              },
              variables: {},
              action: "error",
              description: "Error generating visualization states",
              finalPositions: [],
            },
          ]);
        }
      }
    },
    [generateStatesFunction]
  );

  return (
    <ArrayContext.Provider
      value={{
        array,
        setArray,
        algorithmStates,
        setAlgorithmStates,
        currentStateIndex,
        isPlaying,
        isPaused,
        isCompleted,
        speed,
        setSpeed,
        size,
        setSize,
        currentStep,
        play,
        pause,
        reset,
        nextStep,
        prevStep,
        generateArray,
        generateStatesFunction,
        setGenerateStatesFunction,
        updateStatesWithNewArray,
      }}
    >
      {children}
    </ArrayContext.Provider>
  );
};

export const useArray = () => useContext(ArrayContext);
