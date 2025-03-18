import { useState, useRef, useEffect } from "react";
import ProgressBar from "../../../Components/controls/ProgressBar";
import Controls from "../../../Components/controls/Controls";
import { useTheme } from "../../../context/ThemeContext";
import { useSorting } from "../SortingContext";
import SortingVisualization3D from "./SortingVisualization3D";
import { useWarnings } from "../../../context/WarningContext";

const VisualizationArea = () => {
  const { isDarkMode } = useTheme();
  const [showAutoAdjustOption, setShowAutoAdjustOption] = useState(false);
  const { sortingStates, currentStateIndex, setArray, setSize, is3D, setIs3D } =
    useSorting();
  const { addWarning } = useWarnings();
  const [containerWidth, setContainerWidth] = useState(800);
  const containerRef = useRef(null);

  const currentState = sortingStates[currentStateIndex];

  // Check if array meets 3D visualization requirements
  const checkArrayRequirements = (array) => {
    const meetsLengthRequirement = array.length <= 10;
    const meetsValueRequirement = array.every((value) => value <= 20);

    return meetsLengthRequirement && meetsValueRequirement;
  };

  useEffect(() => {
    if (showAutoAdjustOption) {
      const timer = setTimeout(() => setShowAutoAdjustOption(false), 3000);

      return () => clearTimeout(timer);
    }
  }, [showAutoAdjustOption]);

  // Auto-adjust array to meet 3D visualization requirements
  const autoAdjustArray = () => {
    // Take only the first 10 elements if array is longer than 10
    const slicedArray = currentState.array.slice(0, 10);
    setSize(slicedArray.length);

    // Adjust values: if value > 20, subtract a random number between 0-5
    const adjustedArray = slicedArray.map((value) => {
      if (value > 20) {
        return 20 - Math.floor(Math.random() * 6); // Random number between 0-5
      }
      return value;
    });

    setArray(adjustedArray);

    // Hide auto-adjust option and reset view
    setIs3D(true);
    setShowAutoAdjustOption(false);
  };

  // Check array requirements when switching to 3D mode
  const handle3DButtonClick = () => {
    const meetsRequirements = checkArrayRequirements(currentState.array);

    if (!meetsRequirements) {
      // Show auto-adjust option
      setShowAutoAdjustOption(true);

      // Add warning about requirements
      addWarning(
        "3D visualization requires array length ≤ 10 and values ≤ 20",
        5000
      );
    } else {
      setShowAutoAdjustOption(false);
      setIs3D(true);
    }
  };

  // Calculate the maximum value in the array for scaling
  const maxValue = Math.max(...(sortingStates[currentStateIndex].array || []));

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

  const getBarColor = (index) => {
    // Color bars green if they are in the completed bars list
    if (
      currentState.completedBars &&
      currentState.completedBars.includes(index)
    ) {
      return "bg-green-500";
    }

    // Color currently compared bars yellow
    if (index === currentState.j || index === currentState.j + 1) {
      return currentState.action === "swap" ? "bg-red-600" : "bg-yellow-400";
    }

    // Default color is blue, especially at the start
    return "bg-blue-500";
  };

  // Calculate dynamic bar width based on array length (max 30)
  const calculateBarDimensions = () => {
    const arrayLength = currentState?.array.length || 1;

    // Adjust gap based on array length
    let gap;
    if (arrayLength <= 10) gap = 8;
    else if (arrayLength <= 20) gap = 4;
    else gap = 2;

    // Calculate bar width using actual caontainer width
    const totalGapWidth = (arrayLength - 1) * gap;
    const barWidth = Math.floor((containerWidth - totalGapWidth) / arrayLength);

    // Ensure minimum and maximum widths
    const finalWidth = Math.min(Math.max(barWidth, 16), 48);

    return { width: finalWidth, gap };
  };

  const { width: barWidth, gap } = calculateBarDimensions();

  return (
    <>
      {/* Visualization Area */}
      <div
        className={`h-130 rounded-t-lg flex items-center justify-center relative shadow-lg ${
          is3D
            ? !isDarkMode
              ? "bg-zinc-100 "
              : "bg-zinc-700"
            : !isDarkMode
            ? "bg-white "
            : "bg-zinc-700"
        }`}
      >
        {/* Auto-adjust option */}
        {showAutoAdjustOption && (
          <div
            className={`
              absolute 
              top-4 
              right-4 
              z-10 
              px-4 
              py-2 
              rounded-md 
              shadow-lg 
              flex 
              items-center 
              justify-between 
              font-medium
              ${
                !isDarkMode
                  ? "bg-blue-50 border border-blue-200 text-blue-700"
                  : "bg-zinc-500 border border-zinc-700"
              }
            `}
          >
            <span className="text-sm mr-4">
              Auto-adjust for 3D visualization?
            </span>
            <button
              onClick={autoAdjustArray}
              className={`
                px-3 
                py-1 
                rounded 
                text-sm 
                font-medium 
                transition-colors 
                duration-200
                bg-blue-500 text-white
                hover:bg-blue-600              
              `}
            >
              Adjust
            </button>
            <button
              onClick={() => setShowAutoAdjustOption(false)}
              className={`
                px-3 
                py-1 
                rounded 
                text-sm 
                font-medium 
                transition-colors 
                duration-200
                ml-2 bg-blue-500 text-white hover:bg-blue-600                
              `}
            >
              Cancel
            </button>
          </div>
        )}

        {is3D ? (
          // 3D visualization code
          <div className="w-full h-full">
            <SortingVisualization3D />
          </div>
        ) : (
          // 2D visualization code
          <div
            ref={containerRef}
            className="flex items-end justify-center h-full w-full p-8 mb-2"
            style={{ gap: `${gap}px` }}
          >
            {currentState?.array.map((value, index) => {
              // Calculate the percentage height
              const heightPercentage = Math.max(
                (value / maxValue) * 85,
                value > 0 ? 3 : 0
              );

              // Determine text visibility and styling
              const isTextVisible = value > 0;
              const textStyle = {
                fontSize: barWidth < 35 ? "0.625rem" : "0.875rem", // text-xs : text-sm
                color: "white",
                fontWeight: 600,
                textAlign: "center",
                position: "absolute",
                bottom: "2px",
                left: 0,
                right: 0,
                visibility:
                  isTextVisible && heightPercentage > 3 ? "visible" : "hidden",
              };

              return (
                <div
                  key={index}
                  className={`rounded-t-xs transition-all duration-500 relative ${getBarColor(
                    index
                  )}`}
                  style={{
                    height: `${heightPercentage}%`,
                    width: `${barWidth}px`,
                  }}
                >
                  <div style={textStyle}>{value}</div>
                </div>
              );
            })}

            {/* Indices Container */}

            <div
              className="flex items-center justify-center w-full p-8 absolute -bottom-6"
              style={{ gap: `${gap}px` }}
            >
              {currentState?.array.map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center relative transition-all duration-300 ease-in-out"
                  style={{ width: `${barWidth}px` }}
                >
                  {/* Index (Only visible if j is NOT at this position) */}
                  {currentState.j !== index && (
                    <div
                      className={`text-center ${
                        !isDarkMode ? "text-zinc-500" : "text-zinc-300"
                      } ${barWidth < 35 ? "text-xs" : "text-sm"}`}
                    >
                      {index}
                    </div>
                  )}

                  {/* j indicator replacing index when it matches */}
                  {currentState.j === index && (
                    <div
                      className={
                        "p-1 rounded-md text-xs font-bold bg-blue-200 text-blue-800 transition-all duration-400 ease-in-out"
                      }
                    >
                      j = {index}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View Toggle - Absolute positioned */}
        <div className="absolute top-4 right-4 rounded-lg shadow-lg">
          <div
            className={`flex rounded-lg font-medium hover:scale-101 ${
              !isDarkMode ? "bg-zinc-100 " : "bg-zinc-600"
            }`}
          >
            <button
              className={`px-4 py-2 rounded-l-lg ${
                !is3D
                  ? "bg-blue-500 text-zinc-100 hover:bg-blue-600"
                  : isDarkMode
                  ? "hover:bg-zinc-500"
                  : "hover:bg-zinc-200"
              }`}
              onClick={() => setIs3D(false)}
            >
              2D
            </button>
            <button
              className={`px-4 py-2 rounded-r-lg ${
                is3D
                  ? "bg-blue-500 text-zinc-100 hover:bg-blue-600"
                  : isDarkMode
                  ? "hover:bg-zinc-500"
                  : "hover:bg-zinc-200"
              }`}
              onClick={() => handle3DButtonClick()}
            >
              3D
            </button>
          </div>
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
