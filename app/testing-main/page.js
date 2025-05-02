"use client";

import { useState } from "react";
import {
  Play,
  Lock,
  CheckCircle,
  Star,
  X,
  Code,
  Eye,
  Youtube,
} from "lucide-react";

// Define node types and their colors
const nodeTypes = {
  ARRAY: {
    color: "bg-purple-500",
    name: "Array Valley",
    icon: <Code size={20} />,
  },
  LINKED_LIST: {
    color: "bg-blue-500",
    name: "Linked List Lane",
    icon: <Code size={20} />,
  },
  BINARY_SEARCH: {
    color: "bg-green-500",
    name: "Binary Search Forest",
    icon: <Code size={20} />,
  },
  SORTING: {
    color: "bg-yellow-500",
    name: "Sorting Summit",
    icon: <Eye size={20} />,
  },
  GRAPH: {
    color: "bg-red-500",
    name: "Graph Gardens",
    icon: <Code size={20} />,
  },
  DP: {
    color: "bg-pink-500",
    name: "Dynamic Programming Palace",
    icon: <Code size={20} />,
  },
  TREE: {
    color: "bg-teal-500",
    name: "Tree Terrace",
    icon: <Code size={20} />,
  },
  HASH: {
    color: "bg-orange-500",
    name: "Hash Table Haven",
    icon: <Code size={20} />,
  },
  VIDEO: {
    color: "bg-indigo-500",
    name: "Algorithm Analysis",
    icon: <Youtube size={20} />,
  },
};

// Define node status types
const STATUS = {
  LOCKED: "LOCKED",
  COMPLETED: "COMPLETED",
  CURRENT: "CURRENT",
  AVAILABLE: "AVAILABLE",
};

// Sample node data with path positions
const initialNodes = [
  {
    id: 1,
    type: "ARRAY",
    status: "COMPLETED",
    position: { x: 0, y: 2 },
    content: {
      type: "video",
      url: "https://www.youtube.com/watch?t=526&v=37E9ckMDdTk&feature=youtu.be",
      notes: "Introduction to arrays and their basic operations",
    },
  },
  {
    id: 2,
    type: "ARRAY",
    status: "COMPLETED",
    position: { x: 1, y: 1 },
    content: {
      type: "leetcode",
      problem: "Two Sum",
      description:
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    },
  },
  {
    id: 3,
    type: "LINKED_LIST",
    status: "CURRENT",
    position: { x: 2, y: 2 },
    content: {
      type: "leetcode",
      problem: "Reverse Linked List",
      description: "Reverse a singly linked list.",
    },
  },
  {
    id: 4,
    type: "BINARY_SEARCH",
    status: "AVAILABLE",
    position: { x: 3, y: 3 },
    content: {
      type: "visualization",
      title: "Binary Search Visualization",
      description: "Interactive visualization of binary search algorithm",
    },
  },
  {
    id: 5,
    type: "SORTING",
    status: "LOCKED",
    position: { x: 4, y: 2 },
    content: {
      type: "visualization",
      title: "Sorting Algorithms",
      description: "Visual comparison of different sorting algorithms",
    },
  },
  {
    id: 6,
    type: "GRAPH",
    status: "LOCKED",
    position: { x: 5, y: 1 },
    content: {
      type: "leetcode",
      problem: "Number of Islands",
      description: "Count the number of islands in a 2D grid map",
    },
  },
  {
    id: 7,
    type: "DP",
    status: "LOCKED",
    position: { x: 6, y: 0 },
    content: {
      type: "video",
      url: "https://youtube.com/embed/dQw4w9WgXcQ",
      notes: "Introduction to dynamic programming concepts",
    },
  },
  {
    id: 8,
    type: "TREE",
    status: "LOCKED",
    position: { x: 7, y: 1 },
    content: {
      type: "leetcode",
      problem: "Maximum Depth of Binary Tree",
      description: "Find the maximum depth of a binary tree",
    },
  },
  {
    id: 9,
    type: "VIDEO",
    status: "LOCKED",
    position: { x: 8, y: 2 },
    content: {
      type: "video",
      url: "https://youtube.com/embed/dQw4w9WgXcQ",
      notes: "Time and space complexity analysis",
    },
  },
  {
    id: 10,
    type: "HASH",
    status: "LOCKED",
    position: { x: 9, y: 3 },
    content: {
      type: "leetcode",
      problem: "Group Anagrams",
      description: "Group anagrams together from a given array of strings",
    },
  },
  {
    id: 11,
    type: "DP",
    status: "LOCKED",
    position: { x: 10, y: 2 },
    content: {
      type: "leetcode",
      problem: "Climbing Stairs",
      description: "Count the number of ways to climb n stairs",
    },
  },
  {
    id: 12,
    type: "BINARY_SEARCH",
    status: "LOCKED",
    position: { x: 11, y: 1 },
    content: {
      type: "leetcode",
      problem: "Search in Rotated Sorted Array",
      description: "Search for a target value in a rotated sorted array",
    },
  },
  {
    id: 13,
    type: "ARRAY",
    status: "LOCKED",
    position: { x: 12, y: 2 },
    content: {
      type: "leetcode",
      problem: "Merge Intervals",
      description: "Merge overlapping intervals",
    },
  },
  {
    id: 14,
    type: "GRAPH",
    status: "LOCKED",
    position: { x: 13, y: 3 },
    content: {
      type: "leetcode",
      problem: "Course Schedule",
      description:
        "Determine if you can finish all courses given prerequisites",
    },
  },
  {
    id: 15,
    type: "TREE",
    status: "LOCKED",
    position: { x: 14, y: 4 },
    content: {
      type: "visualization",
      title: "Tree Traversal",
      description: "Visualization of different tree traversal methods",
    },
  },
];

// Status icons mapping
const statusIcons = {
  [STATUS.LOCKED]: <Lock className="text-gray-400" />,
  [STATUS.COMPLETED]: <CheckCircle className="text-green-500" />,
  [STATUS.CURRENT]: <Star className="text-yellow-400" />,
  [STATUS.AVAILABLE]: <Play className="text-blue-500" />,
};

// Theme elements for the game board
const decorations = [
  { x: 2, y: 0, element: "🌲", size: "text-3xl" },
  { x: 6, y: 2, element: "🏞️", size: "text-4xl" },
  { x: 10, y: 0, element: "🏔️", size: "text-4xl" },
  { x: 14, y: 1, element: "🌋", size: "text-3xl" },
  { x: 4, y: 4, element: "🌊", size: "text-3xl" },
  { x: 8, y: 4, element: "🏰", size: "text-4xl" },
  { x: 0, y: 0, element: "🚩", size: "text-3xl" },
  { x: 15, y: 4, element: "🏁", size: "text-3xl" },
];

export default function LearningPathUI() {
  const [nodes, setNodes] = useState(initialNodes);
  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeClick = (node) => {
    if (node.status !== STATUS.LOCKED) {
      setSelectedNode(node);
    }
  };

  const closePopup = () => {
    setSelectedNode(null);
  };

  const completeNode = (nodeId) => {
    setNodes(
      nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, status: STATUS.COMPLETED };
        }

        // Find the next node in the path and make it available/current
        const currentNodeIndex = nodes.findIndex((n) => n.id === nodeId);
        if (currentNodeIndex >= 0 && currentNodeIndex < nodes.length - 1) {
          const nextNode = nodes[currentNodeIndex + 1];
          if (node.id === nextNode.id && node.status === STATUS.LOCKED) {
            return { ...node, status: STATUS.CURRENT };
          }
          if (node.id === nextNode.id + 1 && node.status === STATUS.LOCKED) {
            return { ...node, status: STATUS.AVAILABLE };
          }
        }

        return node;
      })
    );
    setSelectedNode(null);

    // Add some celebration effect (could be expanded)
    const completionSound = new Audio(
      "https://www.soundjay.com/buttons/sounds/button-09.mp3"
    );
    completionSound.play().catch(() => {});
  };

  // Create grid cells for the game board
  const gridSize = { rows: 5, cols: 16 };
  const gridCells = [];

  for (let y = 0; y < gridSize.rows; y++) {
    for (let x = 0; x < gridSize.cols; x++) {
      // Find if there's a node at this position
      const node = nodes.find((n) => n.position.x === x && n.position.y === y);

      // Find if there's a decoration at this position
      const decoration = decorations.find((d) => d.x === x && d.y === y);

      gridCells.push({ x, y, node, decoration });
    }
  }

  // Draw the path connections
  const renderPath = () => {
    // Sort nodes by their x position to get the correct order
    const sortedNodes = [...nodes].sort((a, b) => a.position.x - b.position.x);

    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <path
          d={sortedNodes
            .map((node, index) => {
              const { x, y } = node.position;
              const cellWidth = 100 / gridSize.cols;
              const cellHeight = 100 / gridSize.rows;

              // Calculate the center of the cell as a percentage
              const centerX = (x + 0.5) * cellWidth;
              const centerY = (y + 0.5) * cellHeight;

              return index === 0
                ? `M ${centerX} ${centerY}`
                : `L ${centerX} ${centerY}`;
            })
            .join(" ")}
          stroke="#FFD700"
          strokeWidth="3"
          strokeDasharray="5,5"
          fill="none"
        />
      </svg>
    );
  };

  // Render the node content popup based on content type
  const renderNodeContent = (node) => {
    const { content } = node;

    switch (content.type) {
      case "video":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{nodeTypes[node.type].name}</h3>
            <div className="aspect-video bg-black rounded overflow-hidden">
              <iframe
                className="w-full h-full"
                src={content.url}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Notes:</h4>
              <p>{content.notes}</p>
            </div>
          </div>
        );

      case "leetcode":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{content.problem}</h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p>{content.description}</p>
            </div>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-gray-200 p-2 font-mono text-sm">
                // Write your solution here
              </div>
              <div className="p-4 font-mono text-sm h-64 bg-gray-50">
                <pre>{`function solution(input) {
  // Your code here

}`}</pre>
              </div>
            </div>
          </div>
        );

      case "visualization":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{content.title}</h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p>{content.description}</p>
            </div>
            <div className="h-64 border border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
              <p className="text-gray-500">
                Interactive visualization would render here
              </p>
            </div>
          </div>
        );

      default:
        return <p>Unknown content type</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">
          DSA Learning Path
        </h1>

        {/* Game board container */}
        <div className="bg-gradient-to-br from-indigo-100 to-blue-200 p-4 rounded-xl shadow-2xl border-4 border-yellow-400 relative">
          {/* Path connections */}
          {renderPath()}

          {/* Grid */}
          <div
            className="grid gap-1"
            style={{
              gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
              gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`,
              aspectRatio: `${gridSize.cols} / ${gridSize.rows}`,
            }}
          >
            {gridCells.map((cell) => (
              <div
                key={`${cell.x}-${cell.y}`}
                className={`relative flex items-center justify-center ${
                  (cell.x + cell.y) % 2 === 0 ? "bg-opacity-5" : "bg-opacity-10"
                } bg-white rounded-lg`}
              >
                {cell.node && (
                  <div
                    onClick={() => handleNodeClick(cell.node)}
                    className={`
                      w-16 h-16 rounded-full flex flex-col items-center justify-center
                      ${nodeTypes[cell.node.type].color}
                      ${cell.node.status === STATUS.LOCKED ? "opacity-50 grayscale" : "opacity-100"}
                      cursor-pointer transition-all duration-200 hover:shadow-lg transform hover:scale-110
                      border-4 ${
                        cell.node.status === STATUS.CURRENT
                          ? "border-yellow-300 animate-pulse"
                          : cell.node.status === STATUS.COMPLETED
                            ? "border-green-300"
                            : cell.node.status === STATUS.AVAILABLE
                              ? "border-blue-300"
                              : "border-gray-400"
                      }
                    `}
                  >
                    <div className="absolute -top-2 -right-2 z-10">
                      {statusIcons[cell.node.status]}
                    </div>
                    <div className="flex items-center justify-center w-10 h-10 bg-white bg-opacity-90 rounded-full">
                      {nodeTypes[cell.node.type].icon}
                    </div>
                    <div className="absolute -bottom-8 text-xs font-medium bg-white px-2 py-1 rounded-full shadow-md">
                      {cell.node.id}
                    </div>
                  </div>
                )}

                {cell.decoration && (
                  <div
                    className={`absolute z-0 ${cell.decoration.size} opacity-80`}
                  >
                    {cell.decoration.element}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Level info */}
        <div className="mt-8 bg-white bg-opacity-90 p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-xl mb-2">Your DSA Adventure</h3>
              <p className="text-gray-700">
                Complete challenges to unlock new levels!
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-xl border-2 border-yellow-400">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-500" size={20} />
                <span className="font-bold">Level Progress: </span>
                <span>
                  {nodes.filter((n) => n.status === STATUS.COMPLETED).length}/
                  {nodes.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 bg-white bg-opacity-90 p-4 rounded-lg shadow-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center">
              <Lock className="text-gray-400 mr-2" />
              <span>Locked Level</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="text-green-500 mr-2" />
              <span>Completed</span>
            </div>
            <div className="flex items-center">
              <Star className="text-yellow-400 mr-2" />
              <span>Current Challenge</span>
            </div>
            <div className="flex items-center">
              <Play className="text-blue-500 mr-2" />
              <span>Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Node Content Popup */}
      {selectedNode && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-10 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4 border-yellow-400">
            <div className="flex justify-between items-center mb-4">
              <span
                className={`px-3 py-1 rounded-full text-white text-sm font-medium ${nodeTypes[selectedNode.type].color}`}
              >
                {nodeTypes[selectedNode.type].name}
              </span>
              <button
                onClick={closePopup}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-6">{renderNodeContent(selectedNode)}</div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={closePopup}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
              {selectedNode.status !== STATUS.COMPLETED && (
                <button
                  onClick={() => completeNode(selectedNode.id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center"
                >
                  <CheckCircle size={20} className="mr-2" />
                  Complete Challenge
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
