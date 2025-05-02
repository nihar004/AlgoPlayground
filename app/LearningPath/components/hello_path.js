// // // components/LearningPath.jsx
// // "use client";

// // import { useState, useEffect } from "react";
// // import { PathNode } from "./PathNode";
// // import { NodeContent } from "./NodeContent";
// // import {
// //   processNotesData,
// //   getNodeTypes,
// //   STATUS,
// //   // statusIcons,
// // } from "./notesProcessor";

// // import {
// //   // CheckCircle,
// //   Lock,
// //   Play,
// //   // Star,
// //   Code,
// //   Eye,
// //   Youtube,
// // } from "lucide-react";

// // const decorations = [
// //   { x: 2, y: 0, element: "🌲", size: "text-3xl" },
// //   { x: 6, y: 2, element: "🏞️", size: "text-4xl" },
// //   { x: 10, y: 0, element: "🏔️", size: "text-4xl" },
// //   { x: 14, y: 1, element: "🌋", size: "text-3xl" },
// //   { x: 4, y: 4, element: "🌊", size: "text-3xl" },
// //   { x: 8, y: 4, element: "🏰", size: "text-4xl" },
// //   { x: 0, y: 0, element: "🚩", size: "text-3xl" },
// //   { x: 15, y: 4, element: "🏁", size: "text-3xl" },
// // ];

// // export const Path = ({ notesData }) => {
// //   const [nodes, setNodes] = useState([]);
// //   const [selectedNode, setSelectedNode] = useState(null);
// //   const nodeTypes = getNodeTypes();

// //   // Initialize nodes from notes data
// //   useEffect(() => {
// //     const initialNodes = processNotesData(notesData);
// //     setNodes(initialNodes);
// //   }, [notesData]);

// //   const handleNodeClick = (node) => {
// //     if (node.status !== STATUS.LOCKED) {
// //       setSelectedNode(node);
// //     }
// //   };

// //   const closePopup = () => {
// //     setSelectedNode(null);
// //   };

// //   const completeNode = (nodeId) => {
// //     setNodes((prevNodes) => {
// //       const updatedNodes = prevNodes.map((node) => {
// //         if (node.id === nodeId) {
// //           return { ...node, status: STATUS.COMPLETED };
// //         }

// //         // Find the next node in sequence and make it available
// //         const currentIndex = prevNodes.findIndex((n) => n.id === nodeId);
// //         if (currentIndex >= 0 && currentIndex < prevNodes.length - 1) {
// //           const nextNode = prevNodes[currentIndex + 1];
// //           if (node.id === nextNode.id && node.status === STATUS.LOCKED) {
// //             return { ...node, status: STATUS.CURRENT };
// //           }
// //         }

// //         return node;
// //       });

// //       return updatedNodes;
// //     });

// //     setSelectedNode(null);
// //   };

// //   // Create grid cells
// //   const gridSize = { rows: 5, cols: Math.max(16, nodes.length + 2) };
// //   const gridCells = [];

// //   for (let y = 0; y < gridSize.rows; y++) {
// //     for (let x = 0; x < gridSize.cols; x++) {
// //       const node = nodes.find((n) => n.position.x === x && n.position.y === y);
// //       const decoration = decorations.find((d) => d.x === x && d.y === y);
// //       gridCells.push({ x, y, node, decoration });
// //     }
// //   }

// //   // Render path connections
// //   const renderPath = () => {
// //     const sortedNodes = [...nodes].sort((a, b) => a.position.x - b.position.x);

// //     return (
// //       <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
// //         <path
// //           d={sortedNodes
// //             .map((node, index) => {
// //               const { x, y } = node.position;
// //               const cellWidth = 100 / gridSize.cols;
// //               const cellHeight = 100 / gridSize.rows;
// //               const centerX = (x + 0.5) * cellWidth;
// //               const centerY = (y + 0.5) * cellHeight;
// //               return index === 0
// //                 ? `M ${centerX} ${centerY}`
// //                 : `L ${centerX} ${centerY}`;
// //             })
// //             .join(" ")}
// //           stroke="#FFD700"
// //           strokeWidth="3"
// //           strokeDasharray="5,5"
// //           fill="none"
// //         />
// //       </svg>
// //     );
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-6">
// //       <div className="max-w-6xl mx-auto">
// //         <h1 className="text-4xl font-bold mb-8 text-center text-white">
// //           DSA Learning Path
// //         </h1>

// //         {/* Game board */}
// //         <div className="bg-gradient-to-br from-indigo-100 to-blue-200 p-4 rounded-xl shadow-2xl border-4 border-yellow-400 relative">
// //           {renderPath()}

// //           <div
// //             className="grid gap-1"
// //             style={{
// //               gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
// //               gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`,
// //               aspectRatio: `${gridSize.cols} / ${gridSize.rows}`,
// //             }}
// //           >
// //             {gridCells.map((cell) => (
// //               <div
// //                 key={`${cell.x}-${cell.y}`}
// //                 className={`relative flex items-center justify-center ${
// //                   (cell.x + cell.y) % 2 === 0 ? "bg-opacity-5" : "bg-opacity-10"
// //                 } bg-white rounded-lg`}
// //               >
// //                 {cell.node && (
// //                   <PathNode
// //                     node={cell.node}
// //                     onClick={handleNodeClick}
// //                     nodeTypes={nodeTypes}
// //                   />
// //                 )}
// //                 {cell.decoration && (
// //                   <div
// //                     className={`absolute z-0 ${cell.decoration.size} opacity-80`}
// //                   >
// //                     {cell.decoration.element}
// //                   </div>
// //                 )}
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Progress info */}
// //         <div className="mt-8 bg-white bg-opacity-90 p-4 rounded-lg shadow-md">
// //           <div className="flex justify-between items-center">
// //             <div>
// //               <h3 className="font-bold text-xl mb-2">Your DSA Adventure</h3>
// //               <p className="text-gray-700">
// //                 Complete challenges to unlock new levels!
// //               </p>
// //             </div>
// //             <div className="bg-yellow-100 p-3 rounded-xl border-2 border-yellow-400">
// //               <div className="flex items-center gap-2">
// //                 {/* <Star className="text-yellow-500" size={20} /> */}
// //                 <span className="font-bold">Level Progress: </span>
// //                 <span>
// //                   {nodes.filter((n) => n.status === STATUS.COMPLETED).length}/
// //                   {nodes.length}
// //                 </span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Legend */}
// //         <div className="mt-4 bg-white bg-opacity-90 p-4 rounded-lg shadow-md">
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //             <div className="flex items-center">
// //               <Lock className="text-gray-400 mr-2" />
// //               <span>Locked Level</span>
// //             </div>
// //             <div className="flex items-center">
// //               {/* <CheckCircle className="text-green-500 mr-2" /> */}
// //               <span>Completed</span>
// //             </div>
// //             <div className="flex items-center">
// //               {/* <Star className="text-yellow-400 mr-2" /> */}
// //               <span>Current Challenge</span>
// //             </div>
// //             <div className="flex items-center">
// //               <Play className="text-blue-500 mr-2" />
// //               <span>Available</span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Node Content Popup */}
// //       {selectedNode && (
// //         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-10 p-4">
// //           <div className="bg-white rounded-xl shadow-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4 border-yellow-400">
// //             <NodeContent
// //               node={selectedNode}
// //               onClose={closePopup}
// //               onComplete={completeNode}
// //               nodeTypes={nodeTypes}
// //             />
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };
