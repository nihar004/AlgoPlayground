import { useState, useRef, useEffect } from "react";
import ProgressBar from "../../../Components/controls/ProgressBar";
import Controls from "../../../Components/controls/Controls";
import { useTheme } from "../../../context/ThemeContext";
import { useSearching } from "../SearchingContext";
import { useAppContext } from "@/app/context/AppContext";

const VisualizationArea = () => {
  const { isDarkMode } = useTheme();
  const { states, currentStateIndex, setArray, setSize, target } =
    useSearching();
  const [containerWidth, setContainerWidth] = useState(800);
  const containerRef = useRef(null);
  const { currentAlgorithm } = useAppContext();

  const currentState = states[currentStateIndex];

  // Update container width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth - 64; // Subtract padding (32px on each side)
        setContainerWidth(width);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const getSquareColor = (index) => {
    // For Binary Search
    if (currentAlgorithm === "binary") {
      // Element found (match with target)
      if (currentState.action === "found" && index === currentState.mid) {
        return `border-green-500 scale-110 text-zinc-700 ${
          isDarkMode ? "bg-green-200" : "bg-green-100"
        }`;
      }

      // Element not found
      if (currentState.action === "not-found") {
        return `border-red-400 text-zinc-700 ${
          isDarkMode ? "bg-red-200" : "bg-red-100"
        }`;
      }

      // Current mid element being compared
      if (
        index === currentState.mid &&
        ["calculate-mid", "compare-mid-smaller", "compare-mid-larger"].includes(
          currentState.action
        )
      ) {
        return `scale-110 text-zinc-700 ${
          isDarkMode
            ? "border-yellow-500 bg-yellow-200"
            : "border-yellow-400 bg-yellow-100"
        }`;
      }

      // Elements in current search range (between left and right pointers)
      if (
        currentState.left !== -1 &&
        currentState.right !== -1 &&
        index >= currentState.left &&
        index <= currentState.right
      ) {
        return `border-blue-500 text-zinc-700 ${
          isDarkMode ? "bg-blue-50" : "bg-blue-50"
        }`;
      }

      // Elements outside the current search range (eliminated)
      if (currentState.left !== -1 || currentState.right !== -1) {
        return `border-zinc-300 text-zinc-500 ${
          isDarkMode ? "bg-zinc-200" : "bg-zinc-100"
        } opacity-60`;
      }

      // Default color
      return "border-blue-500";
    }
    // For Linear Search
    else {
      // Already checked squares with light blue
      if (currentState.action === "not-found") {
        return `border-red-400 text-zinc-700 ${
          isDarkMode ? "bg-red-200" : "bg-red-100"
        }`;
      }

      if (index < currentState.i) {
        return `border-blue-300 text-zinc-700 ${
          isDarkMode ? "bg-blue-200" : "bg-blue-100"
        }`;
      }

      if (currentState.action === "found" && index === currentState.i) {
        return `border-green-500 scale-115 text-zinc-700 ${
          isDarkMode ? "bg-green-200" : "bg-green-100"
        }`;
      }

      // Color currently comparing square yellow
      if (index === currentState.i && currentState.action === "compare") {
        return `scale-115 text-zinc-700 ${
          isDarkMode
            ? "border-yellow-500 bg-yellow-200"
            : "border-yellow-400 bg-yellow-100"
        }`;
      }

      // Default color is blue
      return "border-blue-500";
    }
  };

  // Calculate dynamic square dimensions based on array length
  const calculateSquareDimensions = () => {
    const arrayLength = currentState?.array.length || 1;

    // Adjust gap based on array length
    let gap;
    if (arrayLength <= 10) gap = 16;
    else if (arrayLength <= 20) gap = 8;
    else gap = 4;

    // Calculate square size using actual container width
    const totalGapWidth = (arrayLength - 1) * gap;
    const squareSize = Math.floor(
      (containerWidth - totalGapWidth) / arrayLength
    );

    // Ensure minimum and maximum sizes
    const finalSize = Math.min(Math.max(squareSize, 40), 80);

    return { size: finalSize, gap };
  };

  const { size: squareSize, gap } = calculateSquareDimensions();

  // Determine if a pointer should be displayed at this index
  const getPointerLabel = (index) => {
    const pointers = [];

    if (currentState.left === index) pointers.push("L");
    if (currentState.right === index) pointers.push("R");
    if (currentState.mid === index) pointers.push("M");

    return pointers.join(",");
  };

  return (
    <>
      {/* Visualization Area */}
      <div
        className={`h-130 rounded-t-lg flex flex-col items-center justify-center relative shadow-lg ${
          !isDarkMode ? "bg-white " : "bg-zinc-700"
        }`}
      >
        {/* Target Element Display */}
        <div className="mb-8 flex flex-col items-center">
          <div className="text-lg font-semibold mb-2">Target:</div>
          <div
            className={`border-4 border-violet-500 rounded-lg flex items-center justify-center font-bold text-zinc-700 ${
              isDarkMode ? "bg-violet-300" : "bg-violet-200"
            }`}
            style={{
              width: `${squareSize}px`,
              height: `${squareSize}px`,
              fontSize: squareSize < 60 ? "1rem" : "1.25rem",
            }}
          >
            {target || "?"}
          </div>
        </div>

        {/* Binary Search Pointers */}
        {currentAlgorithm === "binary" && (
          <div className="flex items-center justify-center w-full px-8 mb-4">
            <div className="flex gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm">Left (L)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                <span className="text-sm">Right (R)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-sm">Mid (M)</span>
              </div>
            </div>
          </div>
        )}

        {/* 2D Visualization - Array of Squares */}
        <div
          ref={containerRef}
          className="flex items-center justify-center w-full px-8"
          style={{ gap: `${gap}px` }}
        >
          {currentState?.array.map((value, index) => (
            <div
              key={index}
              className={`rounded-lg transition-all duration-300 ease-in-out shadow-md flex flex-col border-4 ${getSquareColor(
                index
              )}`}
              style={{
                width: `${squareSize}px`,
                height: `${squareSize}px`,
              }}
            >
              {/* Value inside the square */}
              <div
                className="flex-1 flex items-center justify-center font-bold"
                style={{ fontSize: squareSize < 60 ? ".9rem" : "1.25rem" }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Indices and Pointers Container */}
        <div
          className="flex items-center justify-center w-full px-8 mt-3"
          style={{ gap: `${gap}px` }}
        >
          {currentState?.array.map((_, index) => {
            const pointerLabel = getPointerLabel(index);
            return (
              <div
                key={`index-${index}`}
                className="flex flex-col items-center justify-center transition-all duration-300"
                style={{ width: `${squareSize}px` }}
              >
                {/* Display pointers if this index has any */}
                {pointerLabel && (
                  <div className="flex gap-1 mb-1">
                    {pointerLabel.includes("L") && (
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                        L
                      </div>
                    )}
                    {pointerLabel.includes("M") && (
                      <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-bold">
                        M
                      </div>
                    )}
                    {pointerLabel.includes("R") && (
                      <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">
                        R
                      </div>
                    )}
                  </div>
                )}

                {/* Display index */}
                <div
                  className={`text-center ${
                    !isDarkMode ? "text-zinc-500" : "text-zinc-300"
                  } ${squareSize < 60 ? "text-sm" : "text-md"}`}
                >
                  {index}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar />

      {/* Controls */}
      <Controls />
    </>
  );
};

export default VisualizationArea;
