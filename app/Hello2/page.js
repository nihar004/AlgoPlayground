"use client";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const LinkedListVisualizer = () => {
  const { isDarkMode } = useTheme();
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 300 });

  // Sample linked list data with explanatory notes for educational purposes
  const [listData, setListData] = useState({
    nodes: [
      { id: 1, value: 10, next: 2 },
      { id: 2, value: 20, next: 3 },
      { id: 3, value: 30, next: 4 },
      { id: 4, value: 40, next: 5 },
      { id: 5, value: 50, next: 6 },
      { id: 6, value: 60, next: 2 },
    ],
    head: 1,
    activeNode: null,
  });

  // Update container dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: width - 32, // Account for padding
          height: height - 32,
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

  // Function to highlight a node when clicked and show its details
  const handleNodeClick = (nodeId) => {
    setListData((prev) => ({
      ...prev,
      activeNode: prev.activeNode === nodeId ? null : nodeId,
    }));
  };

  // Base calculations for node layout
  const calculateNodeLayout = () => {
    const { width } = dimensions;
    const nodeWidth = Math.min(140, width * 0.18); // Slightly wider nodes
    const nodeHeight = 78; // Taller nodes for better visibility
    const nodePadding = Math.min(80, width * 0.08); // More spacing between nodes

    return {
      nodeWidth,
      nodeHeight,
      nodePadding,
    };
  };

  // Generate node positions in a more intuitive layout
  const generateNodePositions = () => {
    const { width, height } = dimensions;
    const { nodeWidth, nodePadding } = calculateNodeLayout();

    // Calculate total width needed for nodes in a single line
    const totalNodesWidth =
      listData.nodes.length * (nodeWidth + nodePadding) - nodePadding;

    // Scale factor for horizontal positioning
    const scaleFactor = totalNodesWidth > width ? width / totalNodesWidth : 1;

    // Position all nodes in a single horizontal line with more space for clarity
    return listData.nodes.map((node, index) => {
      return {
        id: node.id,
        x:
          (width - totalNodesWidth * scaleFactor) / 2 +
          index * (nodeWidth + nodePadding) * scaleFactor +
          (nodeWidth / 2) * scaleFactor,
        y: height / 2,
        next: node.next,
      };
    });
  };

  // Determine connection type based on node positions and linking
  const determineConnectionType = (source, target, nodePositions) => {
    // Find the positions of source and target in the array
    const sourceIndex = nodePositions.findIndex((pos) => pos.id === source.id);
    const targetIndex = nodePositions.findIndex((pos) => pos.id === target.id);

    // If target is to the left of source (going backwards)
    if (targetIndex < sourceIndex) {
      return "backwards";
    }
    // If target is immediately after source (going forwards)
    else if (targetIndex === sourceIndex + 1) {
      return "straight";
    }
    // If target is further ahead but not immediately after source
    else {
      return "forward-jump";
    }
  };

  // Generate path between two nodes based on their positions
  const generatePath = (source, target, connectionType) => {
    const { nodeWidth, nodeHeight } = calculateNodeLayout();
    const halfNodeWidth = nodeWidth / 2;
    const halfNodeHeight = nodeHeight / 2;

    // Adjust these values for better arrow visibility
    const uTurnHeight = 80; // More space for curves
    const arrowPadding = 12; // Keep arrows from disappearing under nodes

    switch (connectionType) {
      case "straight":
        // Direct connection to the next node with visible arrowheads
        return `
          M ${source.x + halfNodeWidth - arrowPadding} ${source.y}
          L ${target.x - halfNodeWidth + arrowPadding - 10} ${source.y}
        `;

      case "forward-jump":
        // Curved path for skipping over nodes
        return `
            M ${source.x} ${source.y}
            L ${source.x} ${source.y - uTurnHeight}
            L ${target.x} ${target.y - uTurnHeight}
            L ${target.x} ${target.y - halfNodeHeight}
          `;

      case "backwards":
        // Curved path for going backwards (loop)
        return `
            M ${source.x} ${source.y}
            L ${source.x} ${source.y + uTurnHeight}
            L ${target.x} ${target.y + uTurnHeight}
            L ${target.x} ${target.y + halfNodeHeight}
          `;

      default:
        // Default to straight line
        return `
          M ${source.x + halfNodeWidth - arrowPadding} ${source.y}
          L ${target.x - halfNodeWidth + arrowPadding - 10} ${source.y}
        `;
    }
  };

  // Render the linked list
  const renderLinkedList = () => {
    const nodePositions = generateNodePositions();
    const { nodeWidth, nodeHeight } = calculateNodeLayout();

    return (
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
            refX="9"
            refY="3.5"
            orient="auto"
            className="transition-all duration-300"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill={isDarkMode ? "#60a5fa" : "#3b82f6"}
            />
          </marker>
        </defs>

        {/* Render connections and null boxes */}
        <g className="connections">
          {nodePositions.map((source) => {
            if (source.next === null) {
              // Render null box
              const nullBoxWidth = 60;
              const nullBoxHeight = 30;
              const nullBoxX = source.x + nodeWidth / 2 + 40; // Position after the node
              const nullBoxY = source.y - nullBoxHeight / 2;

              return (
                <g key={`null-connection-${source.id}`}>
                  {/* Connection line to null box */}
                  <path
                    d={`M ${source.x + nodeWidth / 2 - 12} ${source.y}
                       L ${nullBoxX - 10} ${source.y}`}
                    fill="none"
                    stroke={isDarkMode ? "#a1a1aa" : "#71717a"}
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                    className="transition-all duration-300"
                  />

                  {/* Null box */}
                  <rect
                    x={nullBoxX}
                    y={nullBoxY}
                    width={nullBoxWidth}
                    height={nullBoxHeight}
                    rx={6}
                    className={`${isDarkMode ? "fill-zinc-700 stroke-zinc-600" : "fill-zinc-100 stroke-zinc-300"} transition-all duration-300`}
                    strokeWidth="2"
                  />
                  <text
                    x={nullBoxX + nullBoxWidth / 2}
                    y={nullBoxY + nullBoxHeight / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={`text-sm font-mono ${isDarkMode ? "fill-zinc-300" : "fill-zinc-600"}`}
                  >
                    null
                  </text>
                </g>
              );
            }

            const target = nodePositions.find((pos) => pos.id === source.next);
            if (!target) return null;

            const connectionType = determineConnectionType(
              source,
              target,
              nodePositions
            );

            // Make arrows more visible with thicker strokes and animated dash pattern
            const isActive = listData.activeNode === source.id;

            return (
              <g key={`connection-${source.id}-${target.id}`}>
                <path
                  d={generatePath(source, target, connectionType)}
                  fill="none"
                  stroke={
                    isDarkMode
                      ? isActive
                        ? "#60a5fa"
                        : "#a1a1aa"
                      : isActive
                        ? "#3b82f6"
                        : "#71717a"
                  }
                  strokeWidth={isActive ? "3" : "2"}
                  strokeDasharray={isActive ? "none" : "none"}
                  markerEnd="url(#arrowhead)"
                  data-connection-type={connectionType}
                  className="transition-all duration-300"
                />

                {/* Add a subtle glow effect for active arrows */}
                {isActive && (
                  <path
                    d={generatePath(source, target, connectionType)}
                    fill="none"
                    stroke={isDarkMode ? "#60a5fa30" : "#3b82f630"}
                    strokeWidth="6"
                    className="transition-all duration-300"
                  />
                )}
              </g>
            );
          })}
        </g>

        {/* Render nodes with improved styling */}
        <g className="nodes">
          {nodePositions.map((position) => {
            const node = listData.nodes.find((n) => n.id === position.id);
            return (
              <foreignObject
                key={`node-${node.id}`}
                x={position.x - nodeWidth / 2}
                y={position.y - nodeHeight / 2}
                width={nodeWidth}
                height={nodeHeight} // Extra space for note below
                className="transition-all duration-300"
              >
                {renderNode(node, 0, 0, nodeWidth, nodeHeight)}
              </foreignObject>
            );
          })}
        </g>
      </svg>
    );
  };

  // Render a single node with improved styling
  const renderNode = (node, x, y, width, height) => {
    const isActive = listData.activeNode === node.id;
    const isHead = listData.head === node.id;

    // Enhanced node styling with better visual hierarchy
    const baseNodeStyle = isDarkMode
      ? "bg-zinc-800 text-zinc-200"
      : "bg-white text-zinc-800";

    const borderStyle = isActive
      ? isDarkMode
        ? "ring-2 ring-blue-400 border border-blue-500"
        : "ring-2 ring-blue-500 border border-blue-400"
      : isHead
        ? isDarkMode
          ? "ring-2 ring-green-400 border border-green-500"
          : "ring-2 ring-green-500 border border-green-400"
        : isDarkMode
          ? "border-2 border-zinc-700"
          : "border-2 border-zinc-300";

    // Enhanced header for node ID
    const headerStyle = isHead
      ? isDarkMode
        ? "bg-green-700 text-white"
        : "bg-green-600 text-white"
      : isActive
        ? isDarkMode
          ? "bg-blue-700 text-white"
          : "bg-blue-600 text-white"
        : isDarkMode
          ? "bg-zinc-700 text-zinc-200"
          : "bg-zinc-200 text-zinc-800";

    // Animated glow effect for active node
    const glowEffect = isActive
      ? isDarkMode
        ? "shadow-lg shadow-blue-500/20"
        : "shadow-lg shadow-blue-500/30"
      : isHead
        ? isDarkMode
          ? "shadow-md shadow-green-500/20"
          : "shadow-md shadow-green-500/30"
        : "shadow-md";

    return (
      <div
        className={`absolute flex flex-col cursor-pointer overflow-hidden transition-all duration-300 ${baseNodeStyle} ${borderStyle} ${glowEffect}`}
        style={{
          left: `${x}px`,
          top: `${y}px`,
          width: `${width}px`,
          height: `${height}px`,
          transform: isActive ? "scale(1.005)" : "scale(1)",
        }}
        onClick={() => handleNodeClick(node.id)}
      >
        {/* Header with node ID */}
        <div
          className={`w-full text-center py-1 font-medium text-sm ${headerStyle}`}
        >
          Node {node.id}
          {isHead && " (Head)"}
        </div>

        {/* Main node content */}
        <div className="flex flex-1">
          {/* Data part (60%) */}
          <div className="w-3/5 flex flex-col items-center justify-center p-1">
            <div className="text-xs uppercase font-semibold opacity-70">
              Data
            </div>
            <div className="font-mono text-md">{node.value}</div>
          </div>

          {/* Next pointer part (40%) with divider */}
          <div
            className={`w-2/5 flex flex-col items-center justify-center ${isDarkMode ? "border-l border-zinc-600" : "border-l border-zinc-300"}`}
          >
            <div className="text-xs uppercase font-semibold opacity-70">
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

  // Show details of selected node
  const renderNodeDetails = () => {
    if (listData.activeNode === null) return null;

    const selectedNode = listData.nodes.find(
      (n) => n.id === listData.activeNode
    );
    if (!selectedNode) return null;

    return (
      <div
        className={`p-3 rounded-md mt-2 ${
          isDarkMode ? "bg-zinc-700 text-zinc-200" : "bg-zinc-100 text-zinc-800"
        }`}
      >
        <h3 className="font-bold mb-1">Node {selectedNode.id} Details:</h3>
        <ul className="text-sm space-y-1">
          <li>
            <span className="font-semibold">Value:</span> {selectedNode.value}
          </li>
          <li>
            <span className="font-semibold">Points to:</span>{" "}
            {selectedNode.next === null ? "null" : `Node ${selectedNode.next}`}
          </li>
          {listData.head === selectedNode.id && (
            <li className="font-semibold text-green-500">
              This is the head node (entry point of the list)
            </li>
          )}
        </ul>
      </div>
    );
  };

  return (
    <div
      className={`rounded-lg shadow-lg ${
        isDarkMode ? "bg-zinc-900" : "bg-white"
      }`}
    >
      <div
        className={`border-b ${isDarkMode ? "border-zinc-700" : "border-zinc-200"} p-4`}
      >
        <h2
          className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-zinc-800"}`}
        >
          Linked List Visualizer
        </h2>
        <p
          className={`text-sm mt-1 ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}
        >
          Click on any node to see details. The arrows show references between
          nodes.
        </p>
      </div>

      <div ref={containerRef} className="relative w-full h-72 p-4">
        {renderLinkedList()}
      </div>

      {/* Node Details Section */}
      <div className="px-4 pb-2">{renderNodeDetails()}</div>

      {/* Legend with improved visuals */}
      <div
        className={`p-4 border-t ${isDarkMode ? "border-zinc-700 bg-zinc-800" : "border-zinc-200 bg-zinc-50"}`}
      >
        <h3
          className={`text-sm font-bold mb-2 ${isDarkMode ? "text-zinc-200" : "text-zinc-700"}`}
        >
          Visual Guide
        </h3>
        <div className="flex flex-wrap gap-5 text-xs">
          <div className="flex items-center gap-2">
            <div
              className={`w-4 h-4 rounded-full border ${isDarkMode ? "bg-green-700 border-green-500" : "bg-green-600 border-green-400"}`}
            ></div>
            <span className={isDarkMode ? "text-zinc-300" : "text-zinc-700"}>
              Head Node (Entry Point)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`w-4 h-4 rounded-full border ${isDarkMode ? "bg-blue-700 border-blue-500" : "bg-blue-600 border-blue-400"}`}
            ></div>
            <span className={isDarkMode ? "text-zinc-300" : "text-zinc-700"}>
              Selected Node
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedListVisualizer;
