"use client";
// import { useState, useRef, useEffect } from "react";
// import { useTheme } from "../context/ThemeContext";

// const LinkedListVisualizer = () => {
//   const { isDarkMode } = useTheme();
//   const containerRef = useRef(null);
//   const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

//   // Track whether to show a loop or straight line
//   const [displayMode, setDisplayMode] = useState("straight");

//   // Sample linked list data
//   const [listData, setListData] = useState({
//     nodes: [
//       { id: 1, value: 10, next: 2 },
//       { id: 2, value: 20, next: 3 },
//       { id: 3, value: 30, next: 4 },
//       { id: 4, value: 40, next: 5 },
//       { id: 5, value: 50, next: 1 },
//     ],
//     activeNode: null,
//     loopStart: null,
//     loopEnd: null,
//   });

//   // Update container dimensions on mount and resize
//   useEffect(() => {
//     const updateDimensions = () => {
//       if (containerRef.current) {
//         const { width, height } = containerRef.current.getBoundingClientRect();
//         setDimensions({
//           width: width - 32, // Account for padding
//           height: height - 32,
//         });
//       }
//     };

//     updateDimensions();

//     const resizeObserver = new ResizeObserver(updateDimensions);
//     if (containerRef.current) {
//       resizeObserver.observe(containerRef.current);
//     }

//     return () => {
//       if (containerRef.current) {
//         resizeObserver.disconnect();
//       }
//     };
//   }, []);

//   // Function to toggle between straight and loop display
//   const toggleDisplayMode = () => {
//     if (displayMode === "straight") {
//       setDisplayMode("loop");
//       // Create a loop from the last node to the third node
//       const updatedNodes = [...listData.nodes];
//       const lastIndex = updatedNodes.length - 1;
//       updatedNodes[lastIndex] = { ...updatedNodes[lastIndex], next: 3 };
//       setListData({
//         ...listData,
//         nodes: updatedNodes,
//         loopStart: 3,
//         loopEnd: lastIndex + 1,
//       });
//     } else {
//       setDisplayMode("straight");
//       // Remove the loop
//       const updatedNodes = [...listData.nodes];
//       const lastIndex = updatedNodes.length - 1;
//       updatedNodes[lastIndex] = { ...updatedNodes[lastIndex], next: null };
//       setListData({
//         ...listData,
//         nodes: updatedNodes,
//         loopStart: null,
//         loopEnd: null,
//       });
//     }
//   };

//   // Function to create a new node
//   const addNode = () => {
//     const newNodeId = listData.nodes.length + 1;
//     const newNodeValue = Math.floor(Math.random() * 100);

//     let updatedNodes = [...listData.nodes];

//     if (displayMode === "straight") {
//       // In straight mode, the new node is added at the end
//       const lastNode = updatedNodes[updatedNodes.length - 1];
//       updatedNodes[updatedNodes.length - 1] = { ...lastNode, next: newNodeId };
//       updatedNodes.push({ id: newNodeId, value: newNodeValue, next: null });
//     } else {
//       // In loop mode, the new node is added before the loop closure
//       const loopEndNode = updatedNodes[updatedNodes.length - 1];
//       updatedNodes[updatedNodes.length - 1] = {
//         ...loopEndNode,
//         next: newNodeId,
//       };
//       updatedNodes.push({
//         id: newNodeId,
//         value: newNodeValue,
//         next: listData.loopStart,
//       });
//       setListData((prev) => ({
//         ...prev,
//         loopEnd: newNodeId,
//       }));
//     }

//     setListData((prev) => ({
//       ...prev,
//       nodes: updatedNodes,
//       activeNode: newNodeId,
//     }));
//   };

//   // Function to highlight a node when clicked
//   const handleNodeClick = (nodeId) => {
//     setListData((prev) => ({
//       ...prev,
//       activeNode: prev.activeNode === nodeId ? null : nodeId,
//     }));
//   };

//   // Base calculations for node layout
//   const calculateNodeLayout = () => {
//     const { width, height } = dimensions;
//     const nodeWidth = Math.min(120, width * 0.15);
//     const nodeHeight = 50;
//     const nodePadding = Math.min(60, width * 0.06);

//     return {
//       nodeWidth,
//       nodeHeight,
//       nodePadding,
//     };
//   };

//   // Add new utility functions for grid and path generation
//   const generateGridSystem = (width, height, nodes) => {
//     const gridSize = {
//       cols: Math.ceil(Math.sqrt(nodes.length * 2)),
//       rows: Math.ceil(nodes.length / Math.ceil(Math.sqrt(nodes.length * 2))),
//     };

//     const cellSize = {
//       width: width / gridSize.cols,
//       height: height / gridSize.rows,
//     };

//     return { gridSize, cellSize };
//   };

//   const generateNodePositions = (nodes, displayMode) => {
//     const { width, height } = dimensions;
//     const { gridSize, cellSize } = generateGridSystem(width, height, nodes);

//     if (displayMode === "straight") {
//       return nodes.map((node, index) => {
//         const col = index % gridSize.cols;
//         const row = Math.floor(index / gridSize.cols);

//         return {
//           id: node.id,
//           x: cellSize.width * (col + 0.5),
//           y: cellSize.height * (row + 0.5),
//           next: node.next,
//         };
//       });
//     } else {
//       // For circular layout
//       const center = { x: width / 2, y: height / 2 };
//       const radius = Math.min(width, height) * 0.35;

//       return nodes.map((node, index) => {
//         const angle = (2 * Math.PI * index) / nodes.length;
//         return {
//           id: node.id,
//           x: center.x + radius * Math.cos(angle),
//           y: center.y + radius * Math.sin(angle),
//           next: node.next,
//         };
//       });
//     }
//   };

//   // Path generator using d3-shape
//   const generatePath = (source, target, isLoop) => {
//     if (isLoop) {
//       return `
//         M ${source.x} ${source.y}
//         C ${source.x + 100} ${source.y - 100},
//           ${target.x + 100} ${target.y - 100},
//           ${target.x} ${target.y}
//       `;
//     }

//     // For straight connections with curve
//     const midX = (source.x + target.x) / 2;
//     const midY = (source.y + target.y) / 2;
//     const offset = 30;

//     return `
//       M ${source.x} ${source.y}
//       Q ${midX} ${midY - offset},
//         ${target.x} ${target.y}
//     `;
//   };

//   // Updated render function using SVG
//   const renderLinkedList = () => {
//     const nodePositions = generateNodePositions(listData.nodes, displayMode);

//     return (
//       <svg
//         width={dimensions.width}
//         height={dimensions.height}
//         className="absolute inset-0"
//       >
//         <defs>
//           <marker
//             id="arrowhead"
//             markerWidth="10"
//             markerHeight="7"
//             refX="9"
//             refY="3.5"
//             orient="auto"
//           >
//             <polygon
//               points="0 0, 10 3.5, 0 7"
//               fill={isDarkMode ? "#d4d4d8" : "#71717a"}
//             />
//           </marker>
//         </defs>

//         {/* Render Connections */}
//         <g className="connections">
//           {nodePositions.map((source) => {
//             if (source.next === null) return null;
//             const target = nodePositions.find((pos) => pos.id === source.next);
//             if (!target) return null;

//             const isLoopConnection =
//               source.id === listData.loopEnd &&
//               source.next === listData.loopStart;

//             return (
//               <path
//                 key={`path-${source.id}-${target.id}`}
//                 d={generatePath(source, target, isLoopConnection)}
//                 fill="none"
//                 stroke={isDarkMode ? "#d4d4d8" : "#71717a"}
//                 strokeWidth="2"
//                 markerEnd="url(#arrowhead)"
//                 className={`transition-all duration-500 ${
//                   isLoopConnection ? "opacity-70" : ""
//                 }`}
//               />
//             );
//           })}
//         </g>

//         {/* Render Nodes */}
//         <g className="nodes">
//           {nodePositions.map((position) => {
//             const node = listData.nodes.find((n) => n.id === position.id);
//             return (
//               <foreignObject
//                 key={`node-${node.id}`}
//                 x={position.x - calculateNodeLayout().nodeWidth / 2}
//                 y={position.y - calculateNodeLayout().nodeHeight / 2}
//                 width={calculateNodeLayout().nodeWidth}
//                 height={calculateNodeLayout().nodeHeight}
//                 className="transition-all duration-500"
//               >
//                 {renderNode(
//                   node,
//                   0,
//                   0,
//                   calculateNodeLayout().nodeWidth,
//                   calculateNodeLayout().nodeHeight
//                 )}
//               </foreignObject>
//             );
//           })}
//         </g>
//       </svg>
//     );
//   };

//   // Render a single node
//   const renderNode = (node, x, y, width, height) => {
//     const isActive = listData.activeNode === node.id;
//     const isLoopStart = listData.loopStart === node.id;

//     // Determine node style based on state
//     const nodeStyle = isActive
//       ? `${!isDarkMode ? "bg-blue-500" : "bg-blue-600"} text-white ring-2 ring-yellow-400`
//       : isLoopStart
//         ? `${!isDarkMode ? "bg-red-500" : "bg-red-600"} text-white`
//         : `${!isDarkMode ? "bg-white" : "bg-zinc-700"} ${!isDarkMode ? "text-zinc-800" : "text-zinc-200"} border border-zinc-300 dark:border-zinc-500`;

//     return (
//       <div
//         className={`absolute flex rounded-2xl cursor-pointer overflow-hidden ${isActive ? "shadow-lg" : "shadow-md"} ${nodeStyle}`}
//         style={{
//           left: `${x}px`,
//           top: `${y}px`,
//           width: `${width}px`,
//           height: `${height}px`,
//           transition: "all 0.5s ease-in-out",
//         }}
//         onClick={() => handleNodeClick(node.id)}
//       >
//         {/* Data part (70%) */}
//         <div className="w-2/3 flex items-center justify-center font-bold">
//           {node.value}
//         </div>

//         {/* Next pointer part (30%) with divider */}
//         <div className="w-1/3 flex items-center justify-center border-l border-zinc-300 dark:border-zinc-500">
//           <span className="text-sm">
//             {node.next === null ? "null" : node.next}
//           </span>
//         </div>

//         {/* Node ID below */}
//         <div
//           className={`absolute text-xs px-2 py-0.5 rounded-full ${!isDarkMode ? "bg-zinc-200 text-zinc-600" : "bg-zinc-800 text-zinc-300"}`}
//           style={{
//             bottom: `-18px`,
//             left: "50%",
//             transform: "translateX(-50%)",
//           }}
//         >
//           {node.id}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div
//       className={`h-130 rounded-lg shadow-lg ${
//         !isDarkMode ? "bg-white" : "bg-zinc-700"
//       }`}
//     >
//       <div ref={containerRef} className="relative w-full h-full p-4">
//         {renderLinkedList()}
//       </div>

//       {/* Controls */}
//       <div
//         className={`flex items-center justify-between p-4 rounded-b-lg ${!isDarkMode ? "bg-zinc-100" : "bg-zinc-800"}`}
//       >
//         <div className="flex items-center space-x-3">
//           <button
//             onClick={toggleDisplayMode}
//             className="px-3 py-1 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors"
//           >
//             {displayMode === "straight"
//               ? "Switch to Loop"
//               : "Switch to Straight"}
//           </button>
//         </div>

//         <div className="flex items-center space-x-3">
//           <button
//             onClick={addNode}
//             className="px-3 py-1 rounded-md bg-green-500 hover:bg-green-600 text-white transition-colors"
//           >
//             Add Node
//           </button>

//           <span className="text-sm">
//             {displayMode === "loop" &&
//               "Loop starts at node " + listData.loopStart}
//           </span>
//         </div>

//         <div className="text-sm">
//           <span>{listData.nodes.length} nodes</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LinkedListVisualizer;

import { useRef, useEffect, useState } from "react";

const LinkedListVisualizer = ({ nodes }) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [layout, setLayout] = useState([]);

  // Calculate container dimensions and responsive layout
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Compute node positions based on linked list structure
  useEffect(() => {
    if (dimensions.width === 0 || !nodes.length) return;

    const nodeRadius = Math.min(40, dimensions.width / 12);
    const nodePositions = [];
    const visited = new Set();
    let currentIndex = 0;
    let x = nodeRadius * 2;
    let y = dimensions.height / 2;
    let row = 0;
    let maxRowWidth = 0;

    // First pass - position nodes in sequence
    while (currentIndex !== null && !visited.has(currentIndex)) {
      visited.add(currentIndex);
      nodePositions[currentIndex] = { x, y, row };

      // Update maximum row width for centering
      maxRowWidth = Math.max(maxRowWidth, x);

      // Move to next node
      x += nodeRadius * 3;
      if (x > dimensions.width - nodeRadius * 2) {
        x = nodeRadius * 2;
        y += nodeRadius * 3;
        row++;
      }
      currentIndex = nodes[currentIndex]?.next ?? null;
    }

    // Second pass - handle loops and arbitrary pointers
    nodes.forEach((node, index) => {
      if (
        !nodePositions[index] &&
        node.next !== null &&
        node.next !== undefined
      ) {
        // Position nodes that weren't reached in first pass
        const targetPos = nodePositions[node.next];
        if (targetPos) {
          // Position near the target node
          nodePositions[index] = {
            x: targetPos.x - nodeRadius * 2,
            y: targetPos.y - targetPos.row * nodeRadius,
            row: targetPos.row + 1,
          };
        }
      }
    });

    setLayout(nodePositions);
  }, [nodes, dimensions]);

  // Calculate curved path between two points
  const calculatePath = (start, end) => {
    if (!start || !end) return "";

    // Straight line
    if (Math.abs(start.y - end.y) < 10 && start.x < end.x) {
      return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
    }

    // U-shaped connection (points backward)
    if (start.x > end.x && Math.abs(start.y - end.y) < 10) {
      const controlY = start.y - 50;
      return `M ${start.x} ${start.y} 
              Q ${start.x} ${controlY}, ${(start.x + end.x) / 2} ${controlY}
              Q ${end.x} ${controlY}, ${end.x} ${end.y}`;
    }

    // Curved connection (loop or arbitrary pointer)
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const controlX1 = start.x + dx * 0.5;
    const controlY1 = start.y + dy * 0.2;
    const controlX2 = start.x + dx * 0.5;
    const controlY2 = start.y + dy * 0.8;

    return `M ${start.x} ${start.y} 
            C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${end.x} ${end.y}`;
  };

  if (!layout.length)
    return (
      <div ref={containerRef} className="w-full h-64 bg-gray-50 rounded-lg" />
    );

  const nodeRadius = Math.min(40, dimensions.width / 12);
  const centerX = dimensions.width / 2;
  const maxRow = Math.max(...layout.filter(Boolean).map((pos) => pos.row));
  const verticalOffset =
    (dimensions.height - (maxRow * nodeRadius * 3 + nodeRadius * 2)) / 2;

  return (
    <div
      ref={containerRef}
      className="w-full h-64 bg-gray-50 rounded-lg relative overflow-hidden"
    >
      <svg width="100%" height="100%">
        {/* Define arrow marker */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#374151" />
          </marker>
        </defs>

        {/* Render connections first (so nodes appear on top) */}
        {nodes.map((node, index) => {
          if (node.next === null || node.next === undefined) return null;
          const start = layout[index];
          const end = layout[node.next];
          if (!start || !end) return null;

          return (
            <path
              key={`conn-${index}`}
              d={calculatePath(start, end)}
              stroke="#374151"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead)"
              className="transition-all duration-300"
            />
          );
        })}

        {/* Render nodes */}
        {nodes.map((node, index) => {
          const position = layout[index];
          if (!position) return null;

          const yPos = position.y + verticalOffset;
          const isHead = index === 0;
          const isTail = node.next === null || node.next === undefined;

          return (
            <g
              key={`node-${index}`}
              transform={`translate(${position.x}, ${yPos})`}
            >
              {/* Node circle */}
              <circle
                cx="0"
                cy="0"
                r={nodeRadius}
                fill="white"
                stroke="#1E40AF"
                strokeWidth="2"
                className="transition-all duration-300"
              />

              {/* Node value */}
              <foreignObject
                x={-nodeRadius}
                y={-nodeRadius}
                width={nodeRadius * 2}
                height={nodeRadius * 2}
              >
                <div className="flex items-center justify-center w-full h-full">
                  <span className="text-lg font-bold">{node.value}</span>
                </div>
              </foreignObject>

              {/* Head/Tail labels */}
              {isHead && (
                <text
                  x="0"
                  y={-nodeRadius - 5}
                  textAnchor="middle"
                  className="text-xs fill-gray-500"
                >
                  Head
                </text>
              )}
              {isTail && (
                <text
                  x="0"
                  y={nodeRadius + 15}
                  textAnchor="middle"
                  className="text-xs fill-gray-500"
                >
                  Tail
                </text>
              )}

              {/* Node index (small) */}
              <text x={nodeRadius + 5} y="5" className="text-xs fill-gray-400">
                {index}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const complexLinkedList = [
  { value: "A", next: 1 }, // 0
  { value: "B", next: 2 }, // 1
  { value: "C", next: 3 }, // 2
  { value: "D", next: 4 }, // 3
  { value: "E", next: 2 }, // 4 (points back to C)
  { value: "F", next: null }, // 5 (unconnected)
  { value: "G", next: 0 }, // 6 (points to head)
];

export default function Page() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Advanced Linked List Visualizer
      </h1>
      <div className="mb-8 p-2 bg-white rounded-xl shadow-md">
        <LinkedListVisualizer nodes={complexLinkedList} />
      </div>
    </div>
  );
}
