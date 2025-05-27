import { createContext, useContext, useState, useEffect } from "react";
import { generateStates, OPERATIONS } from "./singly/StateGenerator/index";

const LinkedListContext = createContext();

export const LinkedListProvider = ({ children }) => {
  const [nodes, setNodes] = useState([
    { id: 1, value: 10, next: 2 },
    { id: 2, value: 20, next: 3 },
    { id: 3, value: 30, next: 4 },
    { id: 4, value: 40, next: 5 },
    { id: 5, value: 20, next: 6 },
    { id: 6, value: 30, next: 7 },
    { id: 7, value: 30, next: 9 },
    { id: 8, value: 30, next: 9 },
    { id: 9, value: 30, next: 10 },
    { id: 10, value: 30, next: 11 },
    { id: 11, value: 30, next: 12 },
    { id: 12, value: 30, next: 13 },
    { id: 13, value: 30, next: 14 },
    { id: 14, value: 50, next: null },
  ]);
  const [currentStateIndex, setCurrentStateIndex] = useState(0);
  const [states, setStates] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [listType, setListType] = useState("singly");
  const [currentOperation, setCurrentOperation] = useState({
    category: "traversal",
    type: "traverse",
  });
  const [head, setHead] = useState(1);

  // Generate initial states
  useEffect(() => {
    console.log("Initializing with nodes:", nodes);
    if (nodes.length > 0) {
      const initialStates = generateStates(nodes, "traverse", null, null, head);
      console.log("Initial states generated:", initialStates);
      setStates(initialStates);
    }
  }, []);

  // Update states when operation changes
  const updateOperation = (category, type, value = null, position = null) => {
    setCurrentOperation({ category, type });

    const newStates = generateStates(nodes, type, value, position, head);
    console.log("New states generated:", {
      operation: type,
      statesCount: newStates.length,
      states: newStates.map((state, index) => ({
        index,
        description: state.description,
        nodesCount: state.nodes.length,
        highlightedNodes: state.nodes
          .filter((n) => n.isHighlighted || n.isCurrent)
          .map((n) => n.id),
      })),
    });

    setStates(newStates);
    setCurrentStateIndex(0);
    setIsPlaying(false); // Reset playing state when operation changes
  };

  // Handle animation playback
  useEffect(() => {
    let animationTimer;
    if (isPlaying && currentStateIndex < states.length - 1) {
      animationTimer = setTimeout(() => {
        setCurrentStateIndex((prev) => prev + 1);
        console.log("Playing animation, current state:", currentStateIndex + 1);
      }, 1000 / speed);
    } else if (currentStateIndex >= states.length - 1) {
      setIsPlaying(false);
      console.log("Animation complete");
    }
    return () => clearTimeout(animationTimer);
  }, [isPlaying, currentStateIndex, states, speed]);

  // Log state changes
  useEffect(() => {
    console.log("Current state:", {
      stateIndex: currentStateIndex,
      totalStates: states.length,
      currentState: states[currentStateIndex],
      operation: currentOperation,
    });
  }, [currentStateIndex, states, currentOperation]);

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
    <LinkedListContext.Provider
      value={{
        nodes,
        setNodes,
        states,
        setStates,
        currentStateIndex,
        isPlaying,
        speed,
        setSpeed,
        listType,
        setListType,
        currentOperation,
        updateOperation,
        play,
        pause,
        reset,
        nextStep,
        prevStep,
        head,
        setHead,
      }}
    >
      {children}
    </LinkedListContext.Provider>
  );
};

export const useLinkedList = () => useContext(LinkedListContext);
