// // import { useState, useRef, useEffect } from "react";
// // import ProgressBar from "../../../Components/controls/ProgressBar";
// // import Controls from "../../../Components/controls/Controls";
// // import { useTheme } from "../../../context/ThemeContext";
// // import { useSorting } from "../SortingContext";

// // const VisualizationArea = () => {
// //   const { isDarkMode } = useTheme();
// //   const { states, currentStateIndex } = useSorting();
// //   const [containerWidth, setContainerWidth] = useState(800);
// //   const [containerHeight, setContainerHeight] = useState(500);
// //   const containerRef = useRef(null);
// //   const [shadowHistory, setShadowHistory] = useState({});

// //   const currentState = states[currentStateIndex];
// //   const prevStateRef = useRef(null);

// //   // Calculate the maximum value in the array for scaling
// //   const maxValue = Math.max(...(currentState?.array || []));

// //   // Calculate number of layers needed for visualization
// //   const calculateLayers = (arrayLength) => {
// //     return Math.floor(Math.log2(arrayLength) - 0.0001) + 2;
// //   };

// //   // Update container dimensions on mount and resize
// //   useEffect(() => {
// //     const updateDimensions = () => {
// //       if (containerRef.current) {
// //         const width = containerRef.current.clientWidth - 64; // Account for padding
// //         const height = containerRef.current.clientHeight - 64;
// //         setContainerWidth(width);
// //         setContainerHeight(height);
// //       }
// //     };

// //     updateDimensions();
// //     window.addEventListener("resize", updateDimensions);
// //     return () => window.removeEventListener("resize", updateDimensions);
// //   }, []);

// //   // Track depth changes to create shadows
// //   useEffect(() => {
// //     if (!currentState || !prevStateRef.current) {
// //       prevStateRef.current = currentState;
// //       return;
// //     }

// //     const prevState = prevStateRef.current;
// //     if (
// //       !prevState.elementDepths ||
// //       !currentState.elementDepths ||
// //       !prevState.array ||
// //       !currentState.array
// //     ) {
// //       prevStateRef.current = currentState;
// //       return;
// //     }

// //     // Create new shadows when elements change depth
// //     const newShadows = { ...shadowHistory };

// //     currentState.array.forEach((value, index) => {
// //       const currentDepth = currentState.elementDepths[index];
// //       const prevDepth = prevState.elementDepths[index];

// //       // If depth has changed, create a shadow at the previous depth
// //       if (currentDepth !== prevDepth) {
// //         // Create a unique key for this shadow
// //         const shadowKey = `${value}-${prevDepth}-${Date.now()}`;

// //         // Store shadow information
// //         newShadows[shadowKey] = {
// //           value,
// //           index,
// //           depth: prevDepth,
// //           originalIndex: index, // Store the original array index
// //         };
// //       }

// //       // If element returns to a position where shadows exist, remove those shadows
// //       Object.keys(newShadows).forEach((key) => {
// //         const shadow = newShadows[key];
// //         if (shadow.originalIndex === index && shadow.depth === currentDepth) {
// //           delete newShadows[key];
// //         }
// //       });
// //     });

// //     setShadowHistory(newShadows);
// //     prevStateRef.current = currentState;
// //   }, [currentState, currentStateIndex]);

// //   // Get bar color based on merge sort state and depth
// //   const getBarColor = (index) => {
// //     if (!currentState || !currentState.elementDepths) return "bg-blue-500";

// //     // Get depth to determine color
// //     const depth = currentState.elementDepths[index];

// //     // Color based on depth - similar to your second image
// //     switch (depth) {
// //       case 0:
// //         return "bg-blue-300"; // Top level - light blue
// //       case 1:
// //         return "bg-lime-400"; // Second level - lime
// //       case 2:
// //         return "bg-yellow-400"; // Third level - yellow
// //       case 3:
// //         return "bg-orange-500"; // Fourth level - orange
// //       case 4:
// //         return "bg-red-500"; // Fifth level - red
// //       default:
// //         return `bg-purple-${Math.min(500 + depth * 100, 900)}`; // Deeper levels - darker purples
// //     }
// //   };

// //   // Calculate all dimensions and layout parameters
// //   const calculateLayout = () => {
// //     const arrayLength = currentState?.array?.length || 1;
// //     const layers = calculateLayers(arrayLength);

// //     // Horizontal gap calculations
// //     let horizontalGap;
// //     if (arrayLength <= 10) horizontalGap = 8;
// //     else if (arrayLength <= 20) horizontalGap = 4;
// //     else horizontalGap = 2;

// //     const verticalGap = 20; // Gap between layers

// //     // Bar width calculation
// //     const totalGapWidth = (arrayLength - 1) * horizontalGap;
// //     const barWidth = Math.floor((containerWidth - totalGapWidth) / arrayLength);
// //     const finalWidth = Math.min(Math.max(barWidth, 16), 48);

// //     // Height calculation
// //     // Reserve 90% of container height for visualization
// //     const visualHeight = containerHeight * 0.9;
// //     const maxBarHeight = (visualHeight - (layers - 1) * verticalGap) / layers;

// //     return {
// //       width: finalWidth,
// //       gap: horizontalGap,
// //       verticalGap,
// //       maxBarHeight,
// //       layers,
// //     };
// //   };

// //   // Calculate horizontal position for the array elements based on their original indices
// //   const getHorizontalPosition = (index) => {
// //     const { width, gap } = calculateLayout();
// //     return index * (width + gap);
// //   };

// //   // Calculate vertical position based on element depth
// //   const getVerticalPosition = (depth) => {
// //     if (depth === undefined) return 0;

// //     const { maxBarHeight, verticalGap } = calculateLayout();

// //     // Position from the bottom, moving up based on depth
// //     // Start at the bottom of the container and move up
// //     const basePosition = containerHeight - 450; // Give some bottom margin
// //     return basePosition + depth * (maxBarHeight + verticalGap);
// //   };

// //   // Determine if an element is being actively compared or placed
// //   const isActiveElement = (index) => {
// //     if (!currentState) return false;

// //     // Check if element is being compared
// //     if (
// //       currentState.compareIndices &&
// //       currentState.compareIndices.includes(index)
// //     ) {
// //       return true;
// //     }

// //     // Check if element is being placed
// //     if (currentState.placeIndex === index) {
// //       return true;
// //     }

// //     return false;
// //   };

// //   // Render shadow elements
// //   const renderShadows = () => {
// //     if (!shadowHistory || Object.keys(shadowHistory).length === 0) return null;

// //     const { width: barWidth, maxBarHeight } = calculateLayout();
// //     return Object.keys(shadowHistory).map((key) => {
// //       const shadow = shadowHistory[key];

// //       // Calculate height based on value relative to maxValue
// //       const heightPercentage = (shadow.value / maxValue) * maxBarHeight;
// //       const barHeight = Math.max(heightPercentage, 3); // Minimum 3px height

// //       // Calculate positions
// //       const horizontalPosition = getHorizontalPosition(shadow.originalIndex);
// //       const verticalPosition = getVerticalPosition(shadow.depth);

// //       return (
// //         <div
// //           key={key}
// //           className="absolute transition-all duration-500 bg-gray-400 opacity-30 rounded-md"
// //           style={{
// //             height: `${barHeight}px`,
// //             width: `${barWidth}px`,
// //             left: `${horizontalPosition + 32}px`,
// //             bottom: `${verticalPosition}px`,
// //             zIndex: 5 + shadow.depth, // Below actual elements but maintain depth order
// //           }}
// //         >
// //           {/* Value text in shadow */}
// //           <div className="absolute inset-0 flex items-center justify-center text-center font-bold text-gray-600">
// //             {shadow.value}
// //           </div>
// //         </div>
// //       );
// //     });
// //   };

// //   // Render elements based on their depth positioning
// //   const renderSortingElements = () => {
// //     if (!currentState || !currentState.array) return null;

// //     const { width: barWidth, maxBarHeight } = calculateLayout();

// //     return currentState.array.map((value, index) => {
// //       // Calculate height based on value relative to maxValue
// //       const heightPercentage = (value / maxValue) * maxBarHeight;
// //       const barHeight = Math.max(heightPercentage, 3); // Minimum 3px height

// //       // Calculate positions
// //       const horizontalPosition = getHorizontalPosition(index);
// //       const verticalPosition = getVerticalPosition(
// //         currentState.elementDepths[index]
// //       );

// //       // Determine if element is active (being compared or placed)
// //       const isActive = isActiveElement(index);

// //       // Highlight border for active elements
// //       const activeBorder = isActive ? "border-2 border-white" : "";

// //       return (
// //         <div
// //           key={`element-${index}`}
// //           className={`absolute transition-all duration-500 ${getBarColor(
// //             index
// //           )} ${activeBorder} rounded-md shadow-md`}
// //           style={{
// //             height: `${barHeight}px`,
// //             width: `${barWidth}px`,
// //             left: `${horizontalPosition + 32}px`, // Add padding offset
// //             bottom: `${verticalPosition}px`,
// //             transition: "height 400ms, left 400ms, bottom 600ms",
// //             zIndex: 10 + currentState.elementDepths[index], // Elements at deeper depths appear in front
// //           }}
// //         >
// //           {/* Value text */}
// //           <div className="absolute inset-0 flex items-center justify-center text-center font-bold">
// //             {value}
// //           </div>

// //           {/* Index indicator below the bar */}
// //           <div
// //             className={`absolute -bottom-6 left-0 right-0 text-center text-xs ${
// //               isDarkMode ? "text-gray-300" : "text-gray-700"
// //             }`}
// //           >
// //             {index}
// //           </div>
// //         </div>
// //       );
// //     });
// //   };

// //   return (
// //     <>
// //       {/* Visualization Area */}
// //       <div
// //         className={`h-130 rounded-t-lg flex items-center justify-center relative shadow-lg ${
// //           !isDarkMode ? "bg-white " : "bg-zinc-700"
// //         }`}
// //       >
// //         <div ref={containerRef} className="w-full h-full relative p-8">
// //           {/* Container for the staggered elements */}
// //           <div className="relative w-full h-full">
// //             {renderShadows()}
// //             {renderSortingElements()}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Progress Bar */}
// //       <ProgressBar />

// //       {/* Controls */}
// //       <Controls />
// //     </>
// //   );
// // };

// // export default VisualizationArea;

// // 7877777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777v  //FIXME:

// import { useState, useRef, useEffect } from "react";
// import ProgressBar from "../../../Components/controls/ProgressBar";
// import Controls from "../../../Components/controls/Controls";
// import { useTheme } from "../../../context/ThemeContext";
// import { useSorting } from "../SortingContext";

// const VisualizationArea = () => {
//   const { isDarkMode } = useTheme();
//   const { states, currentStateIndex } = useSorting();
//   const [containerWidth, setContainerWidth] = useState(800);
//   const [containerHeight, setContainerHeight] = useState(500);
//   const containerRef = useRef(null);
//   const [shadows, setShadows] = useState([]);
//   const prevStateRef = useRef(null);

//   const currentState = states[currentStateIndex];

//   // Calculate the maximum value in the array for scaling
//   const maxValue = Math.max(...(currentState?.array || []));

//   // Calculate number of layers needed for visualization
//   const calculateLayers = (arrayLength) => {
//     return Math.floor(Math.log2(arrayLength) - 0.0001) + 2;
//   };

//   // Update container dimensions on mount and resize
//   useEffect(() => {
//     const updateDimensions = () => {
//       if (containerRef.current) {
//         const width = containerRef.current.clientWidth - 64; // Account for padding
//         const height = containerRef.current.clientHeight - 64;
//         setContainerWidth(width);
//         setContainerHeight(height);
//       }
//     };

//     updateDimensions();
//     window.addEventListener("resize", updateDimensions);
//     return () => window.removeEventListener("resize", updateDimensions);
//   }, []);

//   // Process transitions and update shadows
//   useEffect(() => {
//     if (!currentState || !currentState.transitions) {
//       prevStateRef.current = currentState;
//       return;
//     }

//     // Clone existing shadows
//     const newShadows = [...shadows];

//     // Process transitions from the current state
//     if (currentState.transitions.length > 0) {
//       // Handle each transition
//       currentState.transitions.forEach((transition) => {
//         if (transition.type === "remove") {
//           // Element removed, create a shadow
//           newShadows.push({
//             value: transition.value,
//             position: transition.fromPosition,
//             depth: transition.fromDepth,
//             createdAt: Date.now(),
//             id: `shadow-${transition.value}-${transition.fromPosition}-${
//               transition.fromDepth
//             }-${Date.now()}`,
//           });
//         } else if (transition.type === "move") {
//           // Check if we need a shadow for this movement
//           // Usually when an element changes depth or position significantly
//           if (transition.fromDepth !== transition.toDepth) {
//             newShadows.push({
//               value: transition.value,
//               position: transition.fromPosition,
//               depth: transition.fromDepth,
//               createdAt: Date.now(),
//               id: `shadow-${transition.value}-${transition.fromPosition}-${
//                 transition.fromDepth
//               }-${Date.now()}`,
//             });
//           }
//         }
//       });
//     }

//     // Clean up shadows that are too old (optional)
//     const currentTime = Date.now();
//     const filteredShadows = newShadows.filter((shadow) => {
//       return currentTime - shadow.createdAt < 5000; // Remove shadows older than 5 seconds
//     });

//     // Remove shadows if an element occupies the same position and depth
//     if (currentState.depthMatrix) {
//       const updatedShadows = filteredShadows.filter((shadow) => {
//         // Check if there's a real element at this position+depth
//         const elementAtShadowLocation =
//           currentState.depthMatrix[shadow.depth][shadow.position];
//         // Keep shadow only if spot is empty now
//         return elementAtShadowLocation === null;
//       });

//       setShadows(updatedShadows);
//     } else {
//       setShadows(filteredShadows);
//     }

//     prevStateRef.current = currentState;
//   }, [currentState, currentStateIndex]);

//   // Get bar color based on merge sort state and depth
//   const getBarColor = (depth) => {
//     if (depth === undefined) return "bg-blue-500";

//     // Color based on depth - similar to your second image
//     switch (depth) {
//       case 0:
//         return "bg-blue-300"; // Top level - light blue
//       case 1:
//         return "bg-lime-400"; // Second level - lime
//       case 2:
//         return "bg-yellow-400"; // Third level - yellow
//       case 3:
//         return "bg-orange-500"; // Fourth level - orange
//       case 4:
//         return "bg-red-500"; // Fifth level - red
//       default:
//         return `bg-purple-${Math.min(500 + depth * 100, 900)}`; // Deeper levels - darker purples
//     }
//   };

//   // Calculate all dimensions and layout parameters
//   const calculateLayout = () => {
//     const arrayLength = currentState?.array?.length || 1;
//     const layers = calculateLayers(arrayLength);

//     // Horizontal gap calculations
//     let horizontalGap;
//     if (arrayLength <= 10) horizontalGap = 8;
//     else if (arrayLength <= 20) horizontalGap = 4;
//     else horizontalGap = 2;

//     const verticalGap = 20; // Gap between layers

//     // Bar width calculation
//     const totalGapWidth = (arrayLength - 1) * horizontalGap;
//     const barWidth = Math.floor((containerWidth - totalGapWidth) / arrayLength);
//     const finalWidth = Math.min(Math.max(barWidth, 16), 48);

//     // Height calculation
//     // Reserve 90% of container height for visualization
//     const visualHeight = containerHeight * 0.9;
//     const maxBarHeight = (visualHeight - (layers - 1) * verticalGap) / layers;

//     return {
//       width: finalWidth,
//       gap: horizontalGap,
//       verticalGap,
//       maxBarHeight,
//       layers,
//     };
//   };

//   // Calculate horizontal position for the array elements based on column position
//   const getHorizontalPosition = (position) => {
//     const { width, gap } = calculateLayout();
//     return position * (width + gap);
//   };

//   // Calculate vertical position based on element depth
//   const getVerticalPosition = (depth) => {
//     if (depth === undefined) return 0;

//     const { maxBarHeight, verticalGap } = calculateLayout();

//     // Position from the bottom, moving up based on depth
//     // Start at the bottom of the container and move up
//     const basePosition = containerHeight - 450; // Give some bottom margin
//     return basePosition + depth * (maxBarHeight + verticalGap);
//   };

//   // Determine if an element is being actively compared or placed
//   const isActiveElement = (index) => {
//     if (!currentState) return false;

//     // Check if element is being compared
//     if (
//       currentState.compareIndices &&
//       currentState.compareIndices.includes(index)
//     ) {
//       return true;
//     }

//     // Check if element is being placed
//     if (currentState.placeIndex === index) {
//       return true;
//     }

//     return false;
//   };

//   // Render shadow elements
//   const renderShadows = () => {
//     if (!shadows || shadows.length === 0) return null;

//     const { width: barWidth, maxBarHeight } = calculateLayout();

//     return shadows.map((shadow) => {
//       // Calculate height based on value relative to maxValue
//       const heightPercentage = (shadow.value / maxValue) * maxBarHeight;
//       const barHeight = Math.max(heightPercentage, 3); // Minimum 3px height

//       // Calculate positions
//       const horizontalPosition = getHorizontalPosition(shadow.position);
//       const verticalPosition = getVerticalPosition(shadow.depth);

//       return (
//         <div
//           key={shadow.id}
//           className="absolute transition-all duration-500 bg-gray-400 opacity-30 rounded-md"
//           style={{
//             height: `${barHeight}px`,
//             width: `${barWidth}px`,
//             left: `${horizontalPosition + 32}px`,
//             bottom: `${verticalPosition}px`,
//             zIndex: 5 + shadow.depth, // Below actual elements but maintain depth order
//           }}
//         >
//           {/* Value text in shadow */}
//           <div className="absolute inset-0 flex items-center justify-center text-center font-bold text-gray-600">
//             {shadow.value}
//           </div>
//         </div>
//       );
//     });
//   };

//   // Render elements based on depth matrix
//   const renderSortingElements = () => {
//     if (!currentState || !currentState.depthMatrix) return null;

//     const { width: barWidth, maxBarHeight } = calculateLayout();
//     const elements = [];

//     // Loop through the depth matrix to render each element
//     const depthMatrix = currentState.depthMatrix;

//     for (let depth = 0; depth < depthMatrix.length; depth++) {
//       for (let position = 0; position < depthMatrix[depth].length; position++) {
//         const value = depthMatrix[depth][position];

//         // Skip empty cells
//         if (value === null) continue;

//         // Calculate height based on value relative to maxValue
//         const heightPercentage = (value / maxValue) * maxBarHeight;
//         const barHeight = Math.max(heightPercentage, 3); // Minimum 3px height

//         // Calculate positions
//         const horizontalPosition = getHorizontalPosition(position);
//         const verticalPosition = getVerticalPosition(depth);

//         // Find index in the current array
//         const index = currentState.array.indexOf(value);

//         // Determine if element is active (being compared or placed)
//         const isActive = isActiveElement(index);

//         // Highlight border for active elements
//         const activeBorder = isActive ? "border-2 border-white" : "";

//         elements.push(
//           <div
//             key={`element-${value}-${position}-${depth}`}
//             className={`absolute transition-all duration-500 ${getBarColor(
//               depth
//             )} ${activeBorder} rounded-md shadow-md`}
//             style={{
//               height: `${barHeight}px`,
//               width: `${barWidth}px`,
//               left: `${horizontalPosition + 32}px`, // Add padding offset
//               bottom: `${verticalPosition}px`,
//               transition: "height 400ms, left 400ms, bottom 600ms",
//               zIndex: 10 + depth, // Elements at deeper depths appear in front
//             }}
//           >
//             {/* Value text */}
//             <div className="absolute inset-0 flex items-center justify-center text-center font-bold">
//               {value}
//             </div>

//             {/* Index indicator below the bar */}
//             <div
//               className={`absolute -bottom-6 left-0 right-0 text-center text-xs ${
//                 isDarkMode ? "text-gray-300" : "text-gray-700"
//               }`}
//             >
//               {index !== -1 ? index : position}
//             </div>
//           </div>
//         );
//       }
//     }

//     return elements;
//   };

//   return (
//     <>
//       {/* Visualization Area */}
//       <div
//         className={`h-130 rounded-t-lg flex items-center justify-center relative shadow-lg ${
//           !isDarkMode ? "bg-white " : "bg-zinc-700"
//         }`}
//       >
//         <div ref={containerRef} className="w-full h-full relative p-8">
//           {/* Container for the staggered elements */}
//           <div className="relative w-full h-full">
//             {renderShadows()}
//             {renderSortingElements()}
//           </div>
//         </div>
//       </div>

//       {/* Progress Bar */}
//       <ProgressBar />

//       {/* Controls */}
//       <Controls />
//     </>
//   );
// };

// export default VisualizationArea;
