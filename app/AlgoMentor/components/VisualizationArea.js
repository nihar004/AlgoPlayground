import { useState, useRef, useEffect } from "react";
import Controls from "../components/Controls";
import { useTheme } from "../../context/ThemeContext";
import { useArray } from "./ArrayContext";
import ProgressBar from "../components/ProgressBar";

const VisualizationArea = () => {
  const { isDarkMode } = useTheme();
  const {
    algorithmStates = [],
    currentStateIndex = 0,
    array = [],
  } = useArray();
  const [containerWidth, setContainerWidth] = useState(800);
  const [containerHeight, setContainerHeight] = useState(500);
  const containerRef = useRef(null);

  // Get the current state or provide a default empty state
  const currentState = algorithmStates?.[currentStateIndex] || {
    array: array, // Use the array from context as fallback
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
    description: "Algorithm visualization not started",
  };

  // Calculate the maximum value in the array for scaling
  const maxValue = Math.max(
    ...(currentState?.array?.length ? currentState.array : [1])
  );

  // Update container dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth - 64; // Account for padding
        const height = containerRef.current.clientHeight - 64;
        setContainerWidth(width);
        setContainerHeight(height);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Universal color mapping function
  const getBarColor = (index) => {
    if (!currentState) return isDarkMode ? "bg-slate-400" : "bg-slate-200";

    // 1. Completed elements (highest priority)
    if (
      Array.isArray(currentState.finalPositions) &&
      (currentState.finalPositions.includes(index) ||
        currentState.finalPositions[index] === true)
    ) {
      return "bg-green-500";
    }

    // Get all indices from the state
    const { i, j, minIndex, current, pivotIndex, compareIndices, swapIndices } =
      currentState.indices || {};

    // 2. Elements being operated on
    const action = (currentState.action || "").toLowerCase();

    // Elements being compared
    if (action.includes("compare")) {
      if (
        index === i ||
        index === j ||
        (Array.isArray(compareIndices) && compareIndices.includes(index))
      ) {
        return "bg-yellow-400";
      }
    }

    // Elements being swapped
    if (action.includes("swap")) {
      if (
        index === i ||
        index === j ||
        (Array.isArray(swapIndices) && swapIndices.includes(index))
      ) {
        return "bg-rose-500";
      }
    }

    // Element being inserted or moved
    if (action.includes("insert") || action.includes("shift")) {
      if (index === i || index === current) {
        return "bg-amber-500";
      }
    }

    // 3. Algorithm-specific coloring
    if (minIndex === index) {
      return "bg-sky-500";
    }

    if (pivotIndex === index) {
      return "bg-purple-500";
    }

    // 4. Region-based coloring
    if (currentState.activeRegion) {
      const { start, end } = currentState.activeRegion;
      if (index >= start && index <= end) {
        return "bg-blue-400";
      }
    }

    // 5. Elements marked in any way
    if (
      Array.isArray(currentState.marked) &&
      currentState.marked.includes(index)
    ) {
      return "bg-teal-400";
    }

    // Default color
    return isDarkMode ? "bg-slate-400" : "bg-slate-200";
  };

  // Calculate dynamic bar width based on array length
  const calculateBarDimensions = () => {
    const arrayLength = currentState?.array.length || 1;

    // Adjust gap based on array length
    let gap;
    if (arrayLength <= 10) gap = 8;
    else if (arrayLength <= 20) gap = 4;
    else gap = 2;

    // Calculate bar width using container width
    const totalGapWidth = (arrayLength - 1) * gap;
    const barWidth = Math.floor((containerWidth - totalGapWidth) / arrayLength);

    // Ensure minimum and maximum widths
    const finalWidth = Math.min(Math.max(barWidth, 16), 48);

    return { width: finalWidth, gap };
  };

  const { width: barWidth, gap } = calculateBarDimensions();

  // Unified index marker function with tooltips
  const renderIndexMarkers = (index) => {
    if (!currentState || !currentState.indices) return null;

    const { i, j, minIndex, current, pivotIndex } = currentState.indices || {};
    const markers = [];

    // Common indices across algorithms with tooltips
    if (i === index) {
      markers.push(
        <div key="i-marker" className="group relative">
          <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
            i
          </div>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Main Loop Index
          </div>
        </div>
      );
    }

    if (j === index) {
      markers.push(
        <div key="j-marker" className="group relative">
          <div className="w-5 h-5 rounded-full bg-amber-600 flex items-center justify-center text-white text-sm font-medium">
            j
          </div>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Compare Index
          </div>
        </div>
      );
    }

    if (minIndex === index) {
      markers.push(
        <div key="min-marker" className="group relative">
          <div className="w-6 h-5 rounded-sm bg-purple-400 flex items-center justify-center text-white text-xs font-medium">
            min
          </div>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Minimum Index
          </div>
        </div>
      );
    }

    if (pivotIndex === index) {
      markers.push(
        <div key="pivot-marker" className="group relative">
          <div
            className={`${
              barWidth < 35 ? "w-6" : "w-10"
            } h-5 rounded-sm bg-purple-500 flex items-center justify-center text-white text-xs font-medium`}
          >
            {barWidth < 35 ? "P" : "Pivot"}
          </div>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Pivot Element
          </div>
        </div>
      );
    }

    if (current === index) {
      markers.push(
        <div key="current-marker" className="group relative">
          <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-medium">
            c
          </div>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Current Element
          </div>
        </div>
      );
    }

    return markers;
  };

  // Render additional visualization elements
  const renderAlgorithmSpecificElements = () => {
    if (!currentState) return null;

    const elements = [];
    const vars = currentState.variables || {};

    // Display important variables
    const importantVars = ["key", "pivot", "sum", "count", "ele1", "ele2"];

    importantVars.forEach((varName, index) => {
      if (vars[varName] !== undefined) {
        elements.push(
          <div
            key={`var-${varName}`}
            className={`absolute top-4 right-${
              10 + index * 30
            } rounded-lg px-3 py-1 text-md font-bold text-blue-900 ${
              !isDarkMode ? "bg-blue-200" : "bg-blue-200"
            }`}
            style={{ right: `${10 + index * 110}px` }}
          >
            <span className="opacity-60 mr-2">{varName}:</span>
            {vars[varName]}
          </div>
        );
      }
    });

    return elements;
  };

  // Add this new component for the variable legend
  const VariableLegend = () => (
    <div
      className={`absolute top-18 left-4 p-3 rounded-lg ${
        !isDarkMode ? "bg-white/90" : "bg-zinc-800/90"
      } shadow-lg`}
    >
      <h4 className="text-sm font-medium mb-2">Variable Guide</h4>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm">
            i
          </div>
          <span className="text-xs">Main Index</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-amber-600 flex items-center justify-center text-white text-sm">
            j
          </div>
          <span className="text-xs">Compare Index</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs">
            c
          </div>
          <span className="text-xs">Current Element</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-5 rounded-sm bg-purple-400 flex items-center justify-center text-white text-xs">
            min
          </div>
          <span className="text-xs">Minimum Index</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-5 rounded-sm bg-purple-500 flex items-center justify-center text-white text-xs">
            P
          </div>
          <span className="text-xs">Pivot Element</span>
        </div>
      </div>
    </div>
  );

  // Add this new component for state information
  const StateInfo = ({ currentState }) => (
    <div
      className={`absolute top-4 right-4 p-3 rounded-lg ${
        !isDarkMode ? "bg-white/90" : "bg-zinc-800/90"
      } shadow-lg max-w-md`}
    >
      <div className="text-sm mb-2">
        <span className="font-medium">Action: </span>
        <span
          className={`px-2 py-0.5 rounded ${
            currentState.action === "compare"
              ? "bg-yellow-100 text-yellow-800"
              : currentState.action === "swap"
                ? "bg-rose-100 text-rose-800"
                : currentState.action === "insert"
                  ? "bg-green-100 text-green-800"
                  : "bg-blue-100 text-blue-800"
          }`}
        >
          {currentState.action || "Initial"}
        </span>
      </div>
      <p className="text-sm">{currentState.description}</p>
    </div>
  );

  return (
    <>
      {/* Main Visualization Area */}
      <div
        className={`h-130 rounded-t-lg flex items-center justify-center relative shadow-lg ${
          !isDarkMode ? "bg-white" : "bg-zinc-700"
        }`}
      >
        {/* Add Legend and State Info */}
        <VariableLegend />
        <StateInfo currentState={currentState} />

        <div
          ref={containerRef}
          className="flex items-end justify-center h-full w-full p-8 relative"
        >
          {renderAlgorithmSpecificElements()}

          {/* Main visualization bars */}
          <div
            className="flex items-end justify-center w-full h-full mb-6"
            style={{ gap: `${gap}px` }}
          >
            {currentState?.array.map((value, index) => {
              const heightPercentage = Math.max((value / maxValue) * 85, 3);
              const textStyle = {
                fontSize: barWidth < 35 ? "0.6rem" : "0.875rem",
                fontWeight: 600,
                textAlign: "center",
                position: "absolute",
                bottom: "2px",
                left: 0,
                right: 0,
              };

              return (
                <div
                  key={index}
                  className={`rounded-t-sm transition-all duration-500 relative ${getBarColor(
                    index
                  )}`}
                  style={{
                    height: `${heightPercentage}%`,
                    width: `${barWidth}px`,
                  }}
                >
                  <div className="text-white" style={textStyle}>
                    {value}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Indices Container */}
          <div
            className="flex items-center justify-center w-full p-8 absolute -bottom-8"
            style={{ gap: `${gap}px` }}
          >
            {currentState?.array.map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center relative"
                style={{ width: `${barWidth}px`, height: "3rem" }}
              >
                <div className="flex items-center justify-center space-x-1">
                  {renderIndexMarkers(index)}
                </div>
                <div
                  className={`text-center ${
                    !isDarkMode ? "text-zinc-500" : "text-zinc-300"
                  } ${barWidth < 35 ? "text-xs" : "text-sm"}`}
                >
                  {index}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Bar attached directly below visualization */}
      <div className="mt-0">
        <ProgressBar />
      </div>

      {/* Controls attached below progress bar */}
      <div className="mt-2">
        <Controls />
      </div>
    </>
  );
};

export default VisualizationArea;
