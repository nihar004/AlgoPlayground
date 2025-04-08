import { useState, useRef, useEffect } from "react";
import ProgressBar from "../../../Components/controls/ProgressBar";
import Controls from "../../../Components/controls/Controls";
import { useTheme } from "../../../context/ThemeContext";
import { useSorting } from "../SortingContext";

const VisualizationAreaComplex = () => {
  const { isDarkMode } = useTheme();
  const { states, currentStateIndex } = useSorting();
  const [containerWidth, setContainerWidth] = useState(800);
  const [containerHeight, setContainerHeight] = useState(500);
  const containerRef = useRef(null);
  const prevStateRef = useRef(null);
  const [leftMargin, setLeftMargin] = useState(100);

  const currentState = states[currentStateIndex];

  // Calculate the maximum value in the array for scaling
  const maxValue = Math.max(...(currentState?.array || []));

  // Calculate number of layers needed for visualization
  const calculateLayers = (arrayLength) => {
    return Math.floor(Math.log2(arrayLength) - 0.0001) + 2;
  };

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

  // useEffect to calculate and update leftMargin whenever relevant dependencies change
  useEffect(() => {
    if (!currentState?.array || !containerWidth) return;

    const { width: barWidth, gap } = calculateLayout();
    const arrayLength = currentState.array.length;

    // Calculate the total width of all bars and gaps
    const totalElementsWidth = (barWidth + gap) * arrayLength - gap; // Subtract the last gap

    // Calculate the margin needed to center the elements
    const newLeftMargin = Math.max(
      0,
      (containerWidth - totalElementsWidth - 50) / 2
    );

    // Update the left margin
    setLeftMargin(newLeftMargin);
  }, [currentState?.array, containerWidth, containerHeight]);

  useEffect(() => {
    prevStateRef.current = currentState;
  }, [currentState, currentStateIndex]);

  // Get bar color based on merge sort state and depth
  const getBarColor = (depth) => {
    if (depth === undefined) return "bg-blue-500";

    // Color based on depth - using a consistent color scheme for easier understanding
    switch (depth) {
      case 0:
        return "bg-blue-500"; // Top level - blue
      case 1:
        return "bg-green-400"; // Second level - green
      case 2:
        return "bg-yellow-400"; // Third level - yellow
      case 3:
        return "bg-orange-500"; // Fourth level - orange
      case 4:
        return "bg-red-500"; // Fifth level - red
      default:
        return `bg-purple-500`; // Deeper levels - purple
    }
  };

  // Get shadow color based on depth
  const getShadowColor = (depth) => {
    if (depth === undefined) return "bg-zinc-300";

    // Zinc colors for shadows based on depth
    switch (depth) {
      case 0:
        return "bg-zinc-400"; // Top level
      case 1:
        return "bg-zinc-500"; // Second level
      case 2:
        return "bg-zinc-600"; // Third level
      case 3:
        return "bg-zinc-700"; // Fourth level
      case 4:
        return "bg-zinc-800"; // Fifth level
      default:
        return `bg-zinc-900`; // Deeper levels
    }
  };

  // Calculate all dimensions and layout parameters
  const calculateLayout = () => {
    const arrayLength = currentState?.array?.length || 1;
    const layers = calculateLayers(arrayLength);

    // Horizontal gap calculations
    let horizontalGap;
    if (arrayLength <= 10) horizontalGap = 8;
    else if (arrayLength <= 20) horizontalGap = 4;
    else horizontalGap = 2;

    const verticalGap = 20; // Gap between layers

    // Bar width calculation
    const totalGapWidth = (arrayLength - 1) * horizontalGap;
    const barWidth = Math.floor((containerWidth - totalGapWidth) / arrayLength);
    const finalWidth = Math.min(Math.max(barWidth, 16), 48);

    // Height calculation
    // Reserve 90% of container height for visualization
    const visualHeight = containerHeight * 0.9;
    const maxBarHeight = (visualHeight - (layers - 1) * verticalGap) / layers;

    return {
      width: finalWidth,
      gap: horizontalGap,
      verticalGap,
      maxBarHeight,
      layers,
    };
  };

  // Calculate horizontal position for the array elements based on column position
  const getHorizontalPosition = (position) => {
    const { width, gap } = calculateLayout();
    return position * (width + gap);
  };

  // Calculate vertical position based on element depth
  const getVerticalPosition = (depth) => {
    if (depth === undefined) return 0;

    const { maxBarHeight, verticalGap } = calculateLayout();

    // Position from the bottom, moving up based on depth
    // Start at the bottom of the container and move up
    const basePosition = containerHeight - 450; // Give some bottom margin
    return basePosition + depth * (maxBarHeight + verticalGap);
  };

  // FIXME:
  // TODO: it is not correcly returning true and false, and the blocks which should not be highlighted are being highlighted
  // Determine if an element is being actively compared or placed
  const isActiveElement = (value, position, depth) => {
    if (!currentState || !currentState.activeRegion) return false;

    // Get the active region boundaries
    const { start, end } = currentState.activeRegion;

    if (position < start || position > end) {
      return false; // Not in active region
    }

    if (currentState.compareIndices) {
      if (currentState.compareIndices.includes(position)) {
        return true;
      }
    }

    if (currentState.placeIndex !== undefined) {
      if (position === currentState.placeIndex) {
        return true;
      }
    }

    // Not being compared or placed
    return false;
  };

  // Render shadow elements from the shadow matrix
  const renderShadows = () => {
    if (!currentState || !currentState.shadowMatrix) return null;

    const { width: barWidth, maxBarHeight } = calculateLayout();
    const shadows = [];

    // Loop through the shadow matrix to render each shadow
    const shadowMatrix = currentState.shadowMatrix;

    for (let depth = 0; depth < shadowMatrix.length; depth++) {
      for (
        let position = 0;
        position < shadowMatrix[depth].length;
        position++
      ) {
        const value = shadowMatrix[depth][position];

        // Skip empty cells
        if (value === null) continue;

        // Calculate height based on value relative to maxValue
        const heightPercentage = (value / maxValue) * maxBarHeight;
        const barHeight = Math.max(heightPercentage, 15); // Minimum 3px height

        // Calculate positions
        const horizontalPosition = getHorizontalPosition(position);
        const verticalPosition = getVerticalPosition(depth);

        shadows.push(
          <div
            key={`shadow-${value}-${position}-${depth}`}
            className={`absolute transition-all duration-500 ${getShadowColor(
              depth
            )} opacity-40 rounded-md`}
            style={{
              height: `${barHeight}px`,
              width: `${barWidth}px`,
              left: `${horizontalPosition + 32}px`,
              bottom: `${verticalPosition}px`,
              zIndex: 5 + depth, // Below actual elements but maintain depth order
              transition: "height 400ms, left 400ms, bottom 600ms",
            }}
          >
            {/* Value text in shadow */}
            <div className="absolute inset-0 flex items-center justify-center text-center font-bold text-white">
              {value}
            </div>
            {/* Add index label for elements at depth 0 */}
            {depth === 0 && (
              <div
                className={`absolute text-center ${
                  !isDarkMode ? "text-zinc-500" : "text-zinc-300"
                } ${barWidth < 35 ? "text-xs" : "text-sm"}`}
                style={{
                  bottom: `-24px`,
                  width: "100%",
                  left: "0",
                }}
              >
                {position}
              </div>
            )}
          </div>
        );
      }
    }

    return shadows;
  };

  // Render elements based on depth matrix
  const renderSortingElements = () => {
    if (!currentState || !currentState.depthMatrix) return null;

    const { width: barWidth, maxBarHeight } = calculateLayout();
    const elements = [];

    // Loop through the depth matrix to render each element
    const depthMatrix = currentState.depthMatrix;

    for (let depth = 0; depth < depthMatrix.length; depth++) {
      for (let position = 0; position < depthMatrix[depth].length; position++) {
        const value = depthMatrix[depth][position];

        // Skip empty cells
        if (value === null) continue;

        // Calculate height based on value relative to maxValue
        const heightPercentage = (value / maxValue) * maxBarHeight;
        const barHeight = Math.max(heightPercentage, 15); // Minimum 3px height

        // Calculate positions
        const horizontalPosition = getHorizontalPosition(position);
        const verticalPosition = getVerticalPosition(depth);

        // Find index in the current array
        const index = currentState.array.indexOf(value);

        // Determine if element is active (being compared or placed)
        const isActive = isActiveElement(value, position, depth);

        // Highlight border for active elements
        const activeBorder = isActive
          ? "border-1 border-white ring-2 ring-yellow-500"
          : "";
        const activeClass = isActive ? "animate-pulse" : "";

        elements.push(
          <div
            key={`element-${value}-${position}-${depth}`}
            className={`absolute transition-all duration-500 ${getBarColor(
              depth
            )} ${activeBorder} ${activeClass} rounded-sm shadow-md`}
            style={{
              height: `${barHeight}px`,
              width: `${barWidth}px`,
              left: `${horizontalPosition + 32}px`, // Add padding offset
              bottom: `${verticalPosition}px`,
              transition: "height 400ms, left 400ms, bottom 600ms",
              zIndex: 10 + depth, // Elements at deeper depths appear in front
            }}
          >
            {/* Value text */}
            <div className="absolute inset-0 flex items-center justify-center text-center font-bold">
              {value}
            </div>
            {/* Add index label for elements at depth 0 */}
            {depth === 0 && (
              <div
                className={`absolute text-center ${
                  !isDarkMode ? "text-zinc-500" : "text-zinc-300"
                } ${barWidth < 35 ? "text-xs" : "text-sm"}`}
                style={{
                  bottom: `-24px`,
                  width: "100%",
                  left: "0",
                }}
              >
                {position}
              </div>
            )}
          </div>
        );
      }
    }

    return elements;
  };

  return (
    <>
      {/* Visualization Area */}
      <div
        className={`h-130 rounded-t-lg flex items-center justify-center relative shadow-lg ${
          !isDarkMode ? "bg-white " : "bg-zinc-700"
        }`}
      >
        <div
          ref={containerRef}
          className="relative flex items-end justify-center h-full w-full p-8"
        >
          {/* Container for the staggered elements */}
          <div
            className={"relative w-full h-full mr-5"}
            style={{ marginLeft: `${leftMargin}px` }}
          >
            {renderShadows()}
            {renderSortingElements()}
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

export default VisualizationAreaComplex;
