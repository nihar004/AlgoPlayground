// // import { useTheme } from "../../../context/ThemeContext";
// // import { useLinkedList } from "../LinkedListContext";
// // import { useEffect, useRef, useState } from "react";
// // import ProgressBar from "@/app/Components/controls/ProgressBar";
// // import Controls from "@/app/Components/controls/Controls";
// // import { useAppContext } from "@/app/context/AppContext";

// // const VisualizationArea = () => {
// //   const { isDarkMode } = useTheme();
// //   const { currentStateIndex, states, isPlaying, currentOperation } =
// //     useLinkedList();
// //   const { layoutMode } = useAppContext();
// //   const containerRef = useRef(null);
// //   const [dimensions, setDimensions] = useState({ width: 800, height: 300 });

// //   // Get current state
// //   const currentState = states[currentStateIndex] || { nodes: [], head: null };
// //   const currentNodes = currentState.nodes || [];

// //   // Update container dimensions on mount and resize
// //   useEffect(() => {
// //     const updateDimensions = () => {
// //       if (containerRef.current) {
// //         const { width, height } = containerRef.current.getBoundingClientRect();
// //         setDimensions({
// //           width: width,
// //           height: height,
// //         });
// //       }
// //     };

// //     updateDimensions();

// //     const resizeObserver = new ResizeObserver(updateDimensions);
// //     if (containerRef.current) {
// //       resizeObserver.observe(containerRef.current);
// //     }

// //     return () => {
// //       if (containerRef.current) {
// //         resizeObserver.disconnect();
// //       }
// //     };
// //   }, []);

// //   // Constants for node layout
// //   const NODE_WIDTH = 100;
// //   const NODE_BASE_HEIGHT = 78;
// //   const NODE_MARGIN = 40; // Space between nodes
// //   const NULL_BOX_WIDTH = 50;
// //   const NULL_BOX_HEIGHT = 30;

// //   // Calculate positions using a more consistent approach
// //   const calculateNodePositions = () => {
// //     const { width, height } = dimensions;
// //     const totalItems = currentNodes.length;

// //     // Account for null terminator in total width calculation
// //     // For the last node with null next, we need space for the null box
// //     const hasNullTerminator = currentNodes.some((node) => node.next === null);

// //     // Calculate total width required including space for null terminator
// //     const totalWidth = totalItems * NODE_WIDTH + (totalItems - 1) * NODE_MARGIN;
// //     const totalRequiredWidth = hasNullTerminator
// //       ? totalWidth + NODE_MARGIN + NULL_BOX_WIDTH
// //       : totalWidth;

// //     // Calculate scale factor if needed
// //     const availableWidth = width - 60; // More padding from edges
// //     const scale = Math.min(1, availableWidth / totalRequiredWidth);

// //     // Calculate height scale based on available height
// //     const availableHeight = height - 40;
// //     const nodeHeight = Math.min(NODE_BASE_HEIGHT, availableHeight / 2);
// //     const heightScale = nodeHeight / NODE_BASE_HEIGHT;

// //     // Use the more restrictive scale between width and height
// //     const finalScale = Math.min(scale, heightScale);

// //     // Scale node dimensions
// //     const scaledNodeWidth = NODE_WIDTH * finalScale;
// //     const scaledNodeMargin = NODE_MARGIN * finalScale;
// //     const scaledNodeHeight = nodeHeight * finalScale;

// //     // Calculate starting position to center the list
// //     const startX = (width - totalRequiredWidth * finalScale) / 2;
// //     const centerY = height / 2;

// //     // Generate positions for each node
// //     return currentNodes.map((node, index) => ({
// //       ...node,
// //       x:
// //         startX +
// //         index * (scaledNodeWidth + scaledNodeMargin) +
// //         scaledNodeWidth / 2,
// //       y: centerY,
// //       width: scaledNodeWidth,
// //       height: scaledNodeHeight,
// //       scale: finalScale,
// //     }));
// //   };

// //   // Render a single node
// //   const renderNode = (node, position) => {
// //     const currentState = states[currentStateIndex] || {};
// //     const isHead = currentState.head === node.id;

// //     // Calculate font size based on scale
// //     const fontSize = Math.max(12, 14 * position.scale);
// //     const headerFontSize = Math.max(10, 12 * position.scale);
// //     const labelFontSize = Math.max(8, 10 * position.scale);

// //     const baseNodeStyle = isDarkMode
// //       ? "bg-zinc-800 text-zinc-200"
// //       : "bg-white text-zinc-800";

// //     // Handle different node states from stateGenerator
// //     const getNodeHighlightStyle = () => {
// //       if (node.isCurrent) return "ring-2 ring-yellow-400 border-yellow-500";
// //       if (node.isHighlighted) return "ring-2 ring-blue-400 border-blue-500";
// //       if (node.isNext) return "ring-2 ring-teal-400 border-teal-500";
// //       if (node.isPrev) return "ring-2 ring-indigo-400 border-indigo-500";
// //       if (isHead) return "ring-2 ring-green-400 border-green-500";
// //       if (node.isNew) return "ring-2 ring-purple-400 border-purple-500";
// //       if (node.isCycle) return "ring-2 ring-red-400 border-red-500";
// //       return isDarkMode
// //         ? "border-2 border-zinc-700"
// //         : "border-2 border-zinc-300";
// //     };

// //     // Determine header background based on node state
// //     const getHeaderStyle = () => {
// //       if (node.isCurrent) return "bg-yellow-600";
// //       if (node.isHighlighted) return "bg-blue-600";
// //       if (node.isNext) return "bg-teal-600";
// //       if (node.isPrev) return "bg-indigo-600";
// //       if (isHead) return "bg-green-600";
// //       if (node.isNew) return "bg-purple-600";
// //       if (node.isCycle) return "bg-red-600";
// //       return isDarkMode ? "bg-zinc-700" : "bg-zinc-200";
// //     };

// //     // Calculate header height based on scale
// //     const headerHeight = Math.max(18, 24 * position.scale);

// //     return (
// //       <div
// //         className={`absolute flex flex-col overflow-hidden rounded-md shadow-md transition-all duration-300
// //           ${baseNodeStyle} ${getNodeHighlightStyle()}`}
// //         style={{
// //           left: `${position.x - position.width / 2}px`,
// //           top: `${position.y - position.height / 2}px`,
// //           width: `${position.width}px`,
// //           height: `${position.height}px`,
// //         }}
// //       >
// //         {/* Header */}
// //         <div
// //           className={`w-full text-center font-medium ${getHeaderStyle()}`}
// //           style={{
// //             height: `${headerHeight}px`,
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             fontSize: `${headerFontSize}px`,
// //             color: isHead ? "white" : "",
// //           }}
// //         >
// //           Node {node.id}
// //           {isHead && " (Head)"}
// //         </div>

// //         {/* Content */}
// //         <div className="flex flex-1" style={{ fontSize: `${fontSize}px` }}>
// //           <div className="w-3/5 flex flex-col items-center justify-center p-1">
// //             <div
// //               className="uppercase font-semibold opacity-70"
// //               style={{ fontSize: `${labelFontSize}px` }}
// //             >
// //               Data
// //             </div>
// //             <div className="font-mono">{node.value}</div>
// //           </div>
// //           <div
// //             className={`w-2/5 flex flex-col items-center justify-center
// //             ${isDarkMode ? "border-l border-zinc-600" : "border-l border-zinc-300"}`}
// //           >
// //             <div
// //               className="uppercase font-semibold opacity-70"
// //               style={{ fontSize: `${labelFontSize}px` }}
// //             >
// //               Next
// //             </div>
// //             <div className="font-mono">
// //               {node.next === null ? "null" : node.next}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   // Generate a standard straight arrow between nodes
// //   const generateArrow = (source, target, scale) => {
// //     // Determine arrow color based on state from stateGenerator
// //     const arrowColor =
// //       source.isCurrent ||
// //       source.isHighlighted ||
// //       source.isNext ||
// //       (source.next === target.id && (source.isCurrent || source.isHighlighted))
// //         ? isDarkMode
// //           ? "#60a5fa"
// //           : "#3b82f6"
// //         : isDarkMode
// //           ? "#a1a1aa"
// //           : "#71717a";

// //     // Determine stroke width based on highlighting
// //     const strokeWidth =
// //       source.isCurrent ||
// //       source.isHighlighted ||
// //       source.isNext ||
// //       (source.next === target.id && (source.isCurrent || source.isHighlighted))
// //         ? 3
// //         : 2;

// //     // For straight connections (standard case)
// //     if (target.x > source.x) {
// //       return (
// //         <path
// //           d={`M ${source.x + source.width / 2} ${source.y}
// //              L ${target.x - target.width / 2} ${target.y}`}
// //           fill="none"
// //           stroke={arrowColor}
// //           strokeWidth={strokeWidth}
// //           markerEnd="url(#arrowhead)"
// //         />
// //       );
// //     }

// //     // For backwards connections (when next pointer points to an earlier node)
// //     const arcHeight = 60 * scale;
// //     return (
// //       <path
// //         d={`M ${source.x} ${source.y + source.height / 4}
// //            C ${source.x} ${source.y + arcHeight},
// //              ${target.x} ${target.y + arcHeight},
// //              ${target.x} ${target.y + target.height / 4}`}
// //         fill="none"
// //         stroke={arrowColor}
// //         strokeWidth={strokeWidth}
// //         markerEnd="url(#arrowhead)"
// //       />
// //     );
// //   };

// //   // Render null terminator
// //   const renderNullTerminator = (source) => {
// //     const nullBoxWidth = NULL_BOX_WIDTH * source.scale;
// //     const nullBoxHeight = NULL_BOX_HEIGHT * source.scale;

// //     // Calculate null box position
// //     const nullX =
// //       source.x + source.width / 2 + (NODE_MARGIN * source.scale) / 2;
// //     const nullY = source.y - nullBoxHeight / 2;

// //     // Determine arrow color based on node state
// //     const arrowColor =
// //       source.isCurrent || source.isHighlighted || source.isNext
// //         ? isDarkMode
// //           ? "#60a5fa"
// //           : "#3b82f6"
// //         : isDarkMode
// //           ? "#a1a1aa"
// //           : "#71717a";

// //     // Get stroke width based on node state
// //     const strokeWidth =
// //       source.isCurrent || source.isHighlighted || source.isNext ? 3 : 2;

// //     return (
// //       <g key={`null-${source.id}`}>
// //         <path
// //           d={`M ${source.x + source.width / 2} ${source.y}
// //              L ${nullX - 5} ${source.y}`}
// //           fill="none"
// //           stroke={arrowColor}
// //           strokeWidth={strokeWidth}
// //           markerEnd="url(#arrowhead)"
// //         />
// //         <rect
// //           x={nullX}
// //           y={nullY}
// //           width={nullBoxWidth}
// //           height={nullBoxHeight}
// //           rx={5}
// //           className={`${isDarkMode ? "fill-zinc-700 stroke-zinc-600" : "fill-zinc-100 stroke-zinc-300"}`}
// //           strokeWidth="2"
// //         />
// //         <text
// //           x={nullX + nullBoxWidth / 2}
// //           y={nullY + nullBoxHeight / 2}
// //           textAnchor="middle"
// //           dominantBaseline="middle"
// //           className={`text-sm font-mono ${isDarkMode ? "fill-zinc-300" : "fill-zinc-600"}`}
// //           style={{ fontSize: `${12 * source.scale}px` }}
// //         >
// //           null
// //         </text>
// //       </g>
// //     );
// //   };

// //   // Main render function for the linked list
// //   const renderLinkedList = () => {
// //     const nodePositions = calculateNodePositions();

// //     return (
// //       <div className="relative w-full h-full">
// //         <svg
// //           width={dimensions.width}
// //           height={dimensions.height}
// //           className="absolute inset-0"
// //         >
// //           <defs>
// //             <marker
// //               id="arrowhead"
// //               markerWidth="10"
// //               markerHeight="7"
// //               refX="7"
// //               refY="3.5"
// //               orient="auto"
// //             >
// //               <polygon
// //                 points="0 0, 10 3.5, 0 7"
// //                 fill={isDarkMode ? "#60a5fa" : "#3b82f6"}
// //               />
// //             </marker>
// //           </defs>

// //           {/* Connections */}
// //           <g className="connections">
// //             {nodePositions.map((source) => {
// //               if (source.next === null) {
// //                 return renderNullTerminator(source);
// //               }

// //               const target = nodePositions.find(
// //                 (pos) => pos.id === source.next
// //               );
// //               if (!target) return null;

// //               return (
// //                 <g key={`connection-${source.id}-${target.id}`}>
// //                   {generateArrow(source, target, source.scale)}
// //                 </g>
// //               );
// //             })}
// //           </g>
// //         </svg>

// //         {/* Render nodes */}
// //         {nodePositions.map((position) => (
// //           <div key={`node-${position.id}`} className="absolute">
// //             {renderNode(position, position)}
// //           </div>
// //         ))}
// //       </div>
// //     );
// //   };

// //   return (
// //     <>
// //       <div
// //         className={`h-[500px] min-h-[300px] rounded-t-lg flex flex-col items-center relative shadow-lg overflow-hidden
// //           ${!isDarkMode ? "bg-white" : "bg-zinc-900"}`}
// //       >
// //         {layoutMode !== "centered" && (
// //           <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
// //             <p
// //               className="text-sm px-3 py-1.5 rounded-md bg-blue-500/10
// //               text-blue-600 dark:text-blue-400"
// //             >
// //               {currentState.description || "In progress..."}
// //             </p>
// //           </div>
// //         )}

// //         <div
// //           ref={containerRef}
// //           className="relative flex items-center justify-center w-full h-full p-4 md:p-8 overflow-hidden"
// //         >
// //           {currentNodes.length > 0 ? (
// //             renderLinkedList()
// //           ) : (
// //             <div className="text-center text-gray-500">Empty List</div>
// //           )}
// //         </div>
// //       </div>

// //       <ProgressBar
// //         current={currentStateIndex}
// //         total={states.length - 1}
// //         isPlaying={isPlaying}
// //       />
// //       <Controls />
// //     </>
// //   );
// // };

// // export default VisualizationArea;

import { useTheme } from "../../../context/ThemeContext";
import { useLinkedList } from "../LinkedListContext";
import { useEffect, useRef, useState } from "react";
import ProgressBar from "@/app/Components/controls/ProgressBar";
import Controls from "@/app/Components/controls/Controls";
import { useAppContext } from "@/app/context/AppContext";

const VisualizationArea = () => {
  const { isDarkMode } = useTheme();
  const { currentStateIndex, states, isPlaying, currentOperation } =
    useLinkedList();
  const { layoutMode } = useAppContext();
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 300 });

  // Get current state
  const currentState = states[currentStateIndex] || { nodes: [], head: null };
  const currentNodes = currentState.nodes || [];

  // Update container dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: width,
          height: height,
        });
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  // Constants for node layout
  const NODE_WIDTH = 100;
  const MIN_NODE_WIDTH = 110; // Minimum node width to ensure readability
  const NODE_BASE_HEIGHT = 78;
  const MIN_NODE_HEIGHT = 60; // Minimum node height
  const NODE_MARGIN = 50; // Space between nodes
  const NULL_BOX_WIDTH = 50;
  const NULL_BOX_HEIGHT = 30;
  const ROW_SPACING = 50; // Vertical space between rows of nodes

  // Calculate positions using a more consistent approach
  const calculateNodePositions = () => {
    const { width, height } = dimensions;
    const totalItems = currentNodes.length;

    if (totalItems === 0) return [];

    // Set minimum width for nodes
    const effectiveNodeWidth = Math.max(MIN_NODE_WIDTH, NODE_WIDTH);

    // Account for null terminator in total width calculation
    const hasNullTerminator = currentNodes.some((node) => node.next === null);

    // Calculate available space
    const availableWidth = width - 60; // Padding from edges
    const availableHeight = height - 40;

    // Calculate how many nodes can fit in a single row
    const nodesPerRow = Math.max(
      1,
      Math.floor(availableWidth / (effectiveNodeWidth + NODE_MARGIN))
    );

    // Calculate number of rows needed
    const numRows = Math.ceil(totalItems / nodesPerRow);

    // Calculate actual node dimensions based on available space
    const nodeWidth = Math.max(
      MIN_NODE_WIDTH,
      Math.min(
        NODE_WIDTH,
        (availableWidth - (nodesPerRow - 1) * NODE_MARGIN) / nodesPerRow
      )
    );

    // Calculate proper height considering multiple rows
    const maxNodeHeight = Math.min(
      NODE_BASE_HEIGHT,
      (availableHeight - (numRows - 1) * ROW_SPACING) / numRows
    );
    const nodeHeight = Math.max(MIN_NODE_HEIGHT, maxNodeHeight);

    // Calculate scale for consistent elements
    const widthScale = nodeWidth / NODE_WIDTH;
    const heightScale = nodeHeight / NODE_BASE_HEIGHT;
    const finalScale = Math.min(widthScale, heightScale);

    // Determine starting position to center the list
    const startY =
      (height - (numRows * nodeHeight + (numRows - 1) * ROW_SPACING)) / 2 +
      nodeHeight / 2;

    // Generate positions for each node
    return currentNodes.map((node, index) => {
      // Calculate row and column for this node
      const row = Math.floor(index / nodesPerRow);
      const col = index % nodesPerRow;

      // Calculate number of nodes in this row
      const nodesInThisRow =
        row === numRows - 1 ? totalItems - row * nodesPerRow : nodesPerRow;

      // Calculate starting X position for this row to center it
      const rowWidth =
        nodesInThisRow * nodeWidth + (nodesInThisRow - 1) * NODE_MARGIN;
      const startX = (width - rowWidth) / 2 - 20;

      // Calculate x and y positions with alternating direction for odd rows
      let x;
      if (row % 2 === 0) {
        // Even rows: left to right
        x = startX + nodeWidth / 2 + col * (nodeWidth + NODE_MARGIN);
      } else {
        // Odd rows: right to left
        x = startX + rowWidth - nodeWidth / 2 - col * (nodeWidth + NODE_MARGIN);
      }
      const y = startY + row * (nodeHeight + ROW_SPACING);

      return {
        ...node,
        x,
        y,
        width: nodeWidth,
        height: nodeHeight,
        scale: finalScale,
        row,
        col,
      };
    });
  };

  // Render a single node
  const renderNode = (node, position) => {
    const currentState = states[currentStateIndex] || {};
    const isHead = currentState.head === node.id;

    // Calculate font size based on scale
    const fontSize = Math.max(12, 14 * position.scale);
    const headerFontSize = Math.max(10, 12 * position.scale);
    const labelFontSize = Math.max(8, 10 * position.scale);

    const baseNodeStyle = isDarkMode
      ? "bg-zinc-800 text-zinc-200"
      : "bg-white text-zinc-800";

    // Handle different node states from stateGenerator with improved visuals
    const getNodeHighlightStyle = () => {
      if (node.isCurrent)
        return "ring-1 ring-yellow-400 shadow-lg shadow-yellow-400/20";
      if (node.isHighlighted)
        return "ring-1 ring-blue-400 shadow-lg shadow-blue-400/20";
      if (node.isNext)
        return "ring-1 ring-teal-400 shadow-lg shadow-teal-400/20";
      if (node.isPrev)
        return "ring-1 ring-indigo-400 shadow-lg shadow-indigo-400/20";
      if (isHead) return "ring-1 ring-green-400 shadow-lg shadow-green-400/20";
      if (node.isNew)
        return "ring-3 ring-purple-400 shadow-lg shadow-purple-400/20";
      if (node.isCycle)
        return "ring-3 ring-red-400 shadow-lg shadow-red-400/20";
      return isDarkMode
        ? "border-2 border-zinc-700"
        : "border-2 border-zinc-300";
    };

    // Determine header background based on node state
    const getHeaderStyle = () => {
      if (node.isCurrent) return "bg-yellow-600";
      if (node.isHighlighted) return "bg-blue-600";
      if (node.isNext) return "bg-teal-600";
      if (node.isPrev) return "bg-indigo-600";
      if (isHead) return "bg-green-600";
      if (node.isNew) return "bg-purple-600";
      if (node.isCycle) return "bg-red-600";
      return isDarkMode ? "bg-zinc-700" : "bg-zinc-200";
    };

    // Get node label based on state
    const getNodeLabel = () => {
      let labels = [];
      if (isHead) labels.push("Head");
      if (node.isCurrent) labels.push(node.label || "Current");
      if (node.isNext) labels.push(node.label || "Next");
      if (node.isPrev) labels.push(node.label || "Prev");
      if (node.isNew) labels.push(node.label || "New");
      if (node.isCycle) labels.push(node.label || "Cycle");

      return labels.length > 0 ? `(${labels.join(", ")})` : "";
    };

    // Calculate header height based on scale
    const headerHeight = Math.max(18, 24 * position.scale);

    return (
      <div
        className={`absolute flex flex-col overflow-hidden shadow-md transition-all duration-300 
          ${baseNodeStyle} ${getNodeHighlightStyle()}`}
        style={{
          left: `${position.x - position.width / 2}px`,
          top: `${position.y - position.height / 2}px`,
          width: `${position.width}px`,
          height: `${position.height}px`,
          zIndex: node.isCurrent || node.isHighlighted || isHead ? 10 : 1,
        }}
      >
        {/* Header */}
        <div
          className={`w-full text-center font-medium ${getHeaderStyle()}`}
          style={{
            height: `${headerHeight}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: `${headerFontSize}px`,
            color: "white",
          }}
        >
          Node {node.id} {getNodeLabel()}
        </div>

        {/* Content */}
        <div className="flex flex-1" style={{ fontSize: `${fontSize}px` }}>
          <div className="w-3/5 flex flex-col items-center justify-center p-1">
            <div
              className="uppercase font-semibold opacity-70"
              style={{ fontSize: `${labelFontSize}px` }}
            >
              Data
            </div>
            <div className="font-mono">{node.value}</div>
          </div>
          <div
            className={`w-2/5 flex flex-col items-center justify-center 
            ${isDarkMode ? "border-l border-zinc-600" : "border-l border-zinc-300"}`}
          >
            <div
              className="uppercase font-semibold opacity-70"
              style={{ fontSize: `${labelFontSize}px` }}
            >
              Next
            </div>
            <div className="font-mono">
              {node.next === null ? "null" : node.next}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Generate arrows between nodes with improved path calculation
  const generateArrow = (source, target, nodePositions) => {
    // Determine arrow color based on state from stateGenerator
    const arrowColor =
      source.isCurrent ||
      source.isHighlighted ||
      source.isNext ||
      (source.next === target.id && (source.isCurrent || source.isHighlighted))
        ? "#3b82f6"
        : isDarkMode
          ? "#a1a1aa"
          : "#71717a";

    // Determine stroke width based on highlighting
    const strokeWidth =
      source.isCurrent ||
      source.isHighlighted ||
      source.isNext ||
      (source.next === target.id && (source.isCurrent || source.isHighlighted))
        ? 3
        : 2;

    // Calculate path parameters
    const uTurnHeight = 40 * source.scale;
    const halfNodeHeight = source.height / 2;

    // Use exact center points for consistency
    const sourceX = source.x;
    const sourceY = source.y;
    const targetX = target.x;
    const targetY = target.y;

    // Connection points based on node sides
    const sourceRightX = source.x + source.width / 2;
    const sourceLeftX = source.x - source.width / 2;
    const sourceTopY = source.y - source.height / 2;
    const sourceBottomY = source.y + source.height / 2;

    const targetRightX = target.x + target.width / 2;
    const targetLeftX = target.x - target.width / 2;
    const targetTopY = target.y - target.height / 2;
    const targetBottomY = target.y + target.height / 2;

    // Determine the connection type
    let pathType = "direct";

    // Same row, target is after source
    if (
      source.row === target.row &&
      ((source.row % 2 === 0 && target.col > source.col) ||
        (source.row % 2 === 1 && target.col < source.col))
    ) {
      // Direct neighbors or skipping nodes in the same row
      const isDirectNeighbor = Math.abs(target.col - source.col) === 1;
      pathType = isDirectNeighbor ? "direct" : "forward-jump";
    }
    // Same row, reverse direction (backwards)
    else if (source.row === target.row) {
      pathType = "backwards";
    }
    // Different rows
    else {
      pathType = source.row < target.row ? "down-row" : "up-row";
    }

    // Generate the appropriate path
    let pathD;
    switch (pathType) {
      case "direct":
        // Straight line for adjacent nodes - consistent with row direction
        if (source.row % 2 === 0) {
          // Left to right
          pathD = `M ${sourceRightX} ${sourceY} L ${targetLeftX} ${targetY}`;
        } else {
          // Right to left
          pathD = `M ${sourceLeftX} ${sourceY} L ${targetRightX} ${targetY}`;
        }
        break;

      case "forward-jump":
        // Curved path for skipping over nodes in the same row
        if (source.row % 2 === 0) {
          // Left to right
          pathD = `M ${sourceRightX} ${sourceY} 
                  L ${sourceRightX + 10} ${sourceTopY - 10} 
                  L ${targetLeftX - 10} ${targetTopY - 10} 
                  L ${targetLeftX} ${targetY}`;
        } else {
          // Right to left
          pathD = `M ${sourceLeftX} ${sourceY} 
                  L ${sourceLeftX - 10} ${sourceTopY - 10} 
                  L ${targetRightX + 10} ${targetTopY - 10} 
                  L ${targetRightX} ${targetY}`;
        }
        break;

      case "backwards":
        // Curved path for going backwards in the same row
        if (source.row % 2 === 0) {
          // Backward in left-to-right row
          pathD = `M ${sourceRightX} ${sourceY} 
                  L ${sourceRightX + 10} ${sourceBottomY + 10} 
                  L ${targetLeftX - 10} ${targetBottomY + 10} 
                  L ${targetLeftX} ${targetY}`;
        } else {
          // Backward in right-to-left row
          pathD = `M ${sourceLeftX} ${sourceY} 
                  L ${sourceLeftX - 10} ${sourceBottomY + 10} 
                  L ${targetRightX + 10} ${targetBottomY + 10} 
                  L ${targetRightX} ${targetY}`;
        }
        break;

      case "down-row":
        // Path for connecting to a node in the row below
        if (source.row % 2 === 0 && target.row % 2 === 1) {
          // From left-to-right row to right-to-left row
          pathD = `M ${sourceRightX} ${sourceY} 
                  L ${sourceRightX + 15} ${sourceY + halfNodeHeight} 
                  L ${targetRightX + 15} ${targetY - halfNodeHeight} 
                  L ${targetRightX} ${targetY}`;
        } else if (source.row % 2 === 1 && target.row % 2 === 0) {
          // From right-to-left row to left-to-right row
          pathD = `M ${sourceLeftX} ${sourceY} 
                  L ${sourceLeftX - 15} ${sourceY + halfNodeHeight} 
                  L ${targetLeftX - 15} ${targetY - halfNodeHeight} 
                  L ${targetLeftX} ${targetY}`;
        } else {
          // Generic case
          pathD = `M ${sourceX} ${sourceBottomY} 
                  L ${sourceX} ${sourceBottomY + uTurnHeight / 3} 
                  L ${targetX} ${targetTopY - uTurnHeight / 3} 
                  L ${targetX} ${targetTopY}`;
        }
        break;

      case "up-row":
        // Path for connecting to a node in the row above
        if (source.row % 2 === 1 && target.row % 2 === 0) {
          // From right-to-left row to left-to-right row
          pathD = `M ${sourceRightX} ${sourceY} 
                  L ${sourceRightX + 15} ${sourceY - halfNodeHeight} 
                  L ${targetRightX + 15} ${targetY + halfNodeHeight} 
                  L ${targetRightX} ${targetY}`;
        } else if (source.row % 2 === 0 && target.row % 2 === 1) {
          // From left-to-right row to right-to-left row
          pathD = `M ${sourceLeftX} ${sourceY} 
                  L ${sourceLeftX - 15} ${sourceY - halfNodeHeight} 
                  L ${targetLeftX - 15} ${targetY + halfNodeHeight} 
                  L ${targetLeftX} ${targetY}`;
        } else {
          // Generic case
          pathD = `M ${sourceX} ${sourceTopY} 
                  L ${sourceX} ${sourceTopY - uTurnHeight / 3} 
                  L ${targetX} ${targetBottomY + uTurnHeight / 3} 
                  L ${targetX} ${targetBottomY}`;
        }
        break;
    }

    return (
      <path
        d={pathD}
        fill="none"
        stroke={arrowColor}
        strokeWidth={strokeWidth}
        markerEnd="url(#arrowhead)"
      />
    );
  };

  // Render null terminator with consistent arrow size and position
  const renderNullTerminator = (source) => {
    const nullBoxWidth = NULL_BOX_WIDTH * source.scale;
    const nullBoxHeight = NULL_BOX_HEIGHT * source.scale;

    // Calculate source connection point based on row direction
    const sourceConnectX =
      source.row % 2 === 0
        ? source.x + source.width / 2 // Even rows: connect from right side
        : source.x - source.width / 2; // Odd rows: connect from left side

    // Calculate null box position based on row direction
    const nullX =
      source.row % 2 === 0
        ? source.x + source.width / 2 + 20 // Even rows: place to the right
        : source.x - source.width / 2 - 20 - nullBoxWidth; // Odd rows: place to the left

    const sourceY = source.y;

    // Determine arrow color based on node state
    const arrowColor =
      source.isCurrent || source.isHighlighted || source.isNext
        ? isDarkMode
          ? "#60a5fa"
          : "#3b82f6"
        : isDarkMode
          ? "#a1a1aa"
          : "#71717a";

    // Get stroke width based on node state
    const strokeWidth =
      source.isCurrent || source.isHighlighted || source.isNext ? 3 : 2;

    // Create the path based on row direction
    const pathD =
      source.row % 2 === 0
        ? `M ${sourceConnectX} ${sourceY} L ${nullX - 5} ${sourceY}` // Even rows: right to left
        : `M ${sourceConnectX} ${sourceY} L ${nullX + nullBoxWidth + 5} ${sourceY}`; // Odd rows: left to right

    return (
      <g key={`null-${source.id}`}>
        <path
          d={pathD}
          fill="none"
          stroke={arrowColor}
          strokeWidth={strokeWidth}
          markerEnd="url(#arrowhead)"
        />
        <rect
          x={nullX}
          y={sourceY - nullBoxHeight / 2}
          width={nullBoxWidth}
          height={nullBoxHeight}
          rx={5}
          className={`${isDarkMode ? "fill-zinc-700 stroke-zinc-600" : "fill-zinc-100 stroke-zinc-300"}`}
          strokeWidth="2"
        />
        <text
          x={nullX + nullBoxWidth / 2}
          y={sourceY}
          textAnchor="middle"
          dominantBaseline="middle"
          className={`text-sm font-mono ${isDarkMode ? "fill-zinc-300" : "fill-zinc-600"}`}
          style={{ fontSize: `${12 * source.scale}px` }}
        >
          null
        </text>
      </g>
    );
  };

  // Main render function for the linked list
  const renderLinkedList = () => {
    const nodePositions = calculateNodePositions();

    return (
      <div className="relative w-full h-full">
        <svg
          width={dimensions.width}
          height={dimensions.height}
          className="absolute inset-0"
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="7"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill={isDarkMode ? "#60a5fa" : "#3b82f6"}
              />
            </marker>
          </defs>

          {/* Connections */}
          <g className="connections">
            {nodePositions.map((source) => {
              if (source.next === null) {
                return renderNullTerminator(source);
              }

              const target = nodePositions.find(
                (pos) => pos.id === source.next
              );
              if (!target) return null;

              return (
                <g key={`connection-${source.id}-${target.id}`}>
                  {generateArrow(source, target, nodePositions)}
                </g>
              );
            })}
          </g>
        </svg>

        {/* Render nodes */}
        {nodePositions.map((position) => (
          <div key={`node-${position.id}`} className="absolute">
            {renderNode(position, position)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div
        className={`h-[500px] min-h-[300px] rounded-t-lg flex flex-col items-center relative shadow-lg overflow-hidden
          ${!isDarkMode ? "bg-white" : "bg-zinc-900"}`}
      >
        {layoutMode !== "centered" && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
            <p
              className="text-sm px-3 py-1.5 rounded-md bg-blue-500/10 
              text-blue-600 dark:text-blue-400"
            >
              {currentState.description || "In progress..."}
            </p>
          </div>
        )}

        <div
          ref={containerRef}
          className="relative flex items-center justify-center w-full h-full p-4 md:p-8 overflow-hidden"
        >
          {currentNodes.length > 0 ? (
            renderLinkedList()
          ) : (
            <div className="text-center text-gray-500">Empty List</div>
          )}
        </div>
      </div>

      <ProgressBar
        current={currentStateIndex}
        total={states.length - 1}
        isPlaying={isPlaying}
      />
      <Controls />
    </>
  );
};

export default VisualizationArea;
