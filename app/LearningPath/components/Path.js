import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  processNotesData,
  getNodeTypes,
  STATUS,
} from "../utils/notesProcessor";
import { useTheme } from "../../context/ThemeContext";
import {
  Lock,
  Play,
  Code,
  Eye,
  Check,
  Star,
  Map,
  Award,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  X,
  CornerRightDown,
  Zap,
  Compass,
  Video,
  Target,
  Youtube,
} from "lucide-react";
import { NodeContent } from "./NodeContent";
import { PathNode } from "./PathNode";

// Theme values for each region, based on isDarkMode
const regionThemes = [
  {
    name: "Foundations",
    light: {
      bgGradient: "from-slate-50 to-gray-100",
      nodeColor: "bg-slate-600",
      pathColor: "rgba(71, 85, 105, 0.3)",
      decorations: ["⚡", "💫", "✨", "⭐", "🔮"],
      completedColor: "bg-slate-700",
      textColor: "text-slate-900",
    },
    dark: {
      bgGradient: "from-emerald-950 to-green-900",
      nodeColor: "bg-emerald-600",
      pathColor: "rgba(16, 185, 129, 0.7)",
      decorations: ["🌲", "🌳", "🍃", "🦊", "🌿"],
      completedColor: "bg-emerald-500",
      textColor: "text-emerald-100",
    },
  },
  {
    name: "Mountains",
    light: {
      bgGradient: "from-blue-50 to-indigo-100",
      nodeColor: "bg-blue-600",
      pathColor: "rgba(37, 99, 235, 0.3)",
      decorations: ["📊", "🔄", "📈", "🔋", "💠"],
      completedColor: "bg-blue-700",
      textColor: "text-blue-900",
    },
    dark: {
      bgGradient: "from-blue-950 to-indigo-900",
      nodeColor: "bg-indigo-600",
      pathColor: "rgba(99, 102, 241, 0.7)",
      decorations: ["🏔️", "⛰️", "🦅", "❄️", "🌨️"],
      completedColor: "bg-indigo-500",
      textColor: "text-indigo-100",
    },
  },
  {
    name: "Volcano",
    light: {
      bgGradient: "from-orange-50 to-red-100",
      nodeColor: "bg-red-500",
      pathColor: "rgba(239, 68, 68, 0.7)",
      decorations: ["🌋", "🔥", "🧪", "💥", "🌡️"],
      completedColor: "bg-red-400",
      textColor: "text-red-900",
    },
    dark: {
      bgGradient: "from-red-950 to-orange-900",
      nodeColor: "bg-red-600",
      pathColor: "rgba(239, 68, 68, 0.7)",
      decorations: ["🌋", "🔥", "🧪", "💥", "🌡️"],
      completedColor: "bg-red-500",
      textColor: "text-red-100",
    },
  },
  {
    name: "Ocean",
    light: {
      bgGradient: "from-cyan-50 to-blue-100",
      nodeColor: "bg-blue-500",
      pathColor: "rgba(59, 130, 246, 0.7)",
      decorations: ["🌊", "🐬", "🐙", "🐚", "⚓"],
      completedColor: "bg-blue-400",
      textColor: "text-blue-900",
    },
    dark: {
      bgGradient: "from-blue-950 to-cyan-900",
      nodeColor: "bg-blue-600",
      pathColor: "rgba(59, 130, 246, 0.7)",
      decorations: ["🌊", "🐬", "🐙", "🐚", "⚓"],
      completedColor: "bg-blue-500",
      textColor: "text-blue-200",
    },
  },
  {
    name: "Desert",
    light: {
      bgGradient: "from-amber-50 to-yellow-100",
      nodeColor: "bg-amber-500",
      pathColor: "rgba(217, 119, 6, 0.7)",
      decorations: ["🏜️", "🌵", "🦂", "☀️", "🏺"],
      completedColor: "bg-amber-400",
      textColor: "text-amber-900",
    },
    dark: {
      bgGradient: "from-amber-950 to-yellow-900",
      nodeColor: "bg-amber-600",
      pathColor: "rgba(217, 119, 6, 0.7)",
      decorations: ["🏜️", "🌵", "🦂", "☀️", "🏺"],
      completedColor: "bg-amber-500",
      textColor: "text-amber-100",
    },
  },
];

const GRID_SIZE = {
  rows: 5,
  cols: 16,
  gap: 4,
};

const nodeVariants = {
  hover: { scale: 1.1, transition: { duration: 0.3 } },
  tap: { scale: 0.95, transition: { duration: 0.1 } },
  inactive: { scale: 1, transition: { duration: 0.3 } },
};

const decorationVariants = {
  float: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "mirror",
    },
  },
};

const NodeIcon = ({ type, status, size = 24 }) => {
  switch (type) {
    case "video":
      return <Youtube size={size} className="text-white" />;
    case "code":
      return <Code size={size} className="text-white" />;
    case "reading":
      return <BookOpen size={size} className="text-white" />;
    case "challenge":
      return <Award size={size} className="text-white" />;
    case "visualization":
      return <Eye size={size} className="text-white" />;
    default:
      return status === STATUS.LOCKED ? (
        <Lock size={size} className="text-white opacity-70" />
      ) : status === STATUS.COMPLETED ? (
        <Check size={size} className="text-white" />
      ) : (
        <Play size={size} className="text-white" />
      );
  }
};

const divideIntoSegments = (nodes, segmentSize = 5) => {
  const segments = [];
  for (let i = 0; i < nodes.length; i += segmentSize) {
    segments.push(nodes.slice(i, i + segmentSize));
  }
  return segments;
};

const EmptyPathState = () => (
  <div className="min-h-[320px] flex flex-col items-center justify-center text-center p-8">
    <Map className="w-16 h-16 text-slate-400 mb-4" />
    <h3 className="text-xl font-semibold mb-2">No Learning Path Available</h3>
    <p className="text-slate-600 dark:text-slate-400 max-w-md">
      The learning path is currently being updated. Please check back later for
      new challenges and content.
    </p>
  </div>
);

export default function Path({ notesData }) {
  const [nodes, setNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeSegment, setActiveSegment] = useState(0);
  const [segments, setSegments] = useState([]);
  const scrollContainerRef = useRef(null);
  const nodeTypes = getNodeTypes();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const initialNodes = processNotesData(notesData);
    setNodes(initialNodes);
    const nodeSegments = divideIntoSegments(initialNodes);
    setSegments(nodeSegments);
  }, [notesData]);

  const handleNodeClick = (node) => {
    if (node.status !== STATUS.LOCKED) setSelectedNode(node);
  };

  const closePopup = () => setSelectedNode(null);

  const completeNode = (nodeId) => {
    setNodes((prevNodes) => {
      const updatedNodes = [...prevNodes];
      const currentIndex = updatedNodes.findIndex((n) => n.id === nodeId);

      if (currentIndex >= 0) {
        // Mark current node as completed
        updatedNodes[currentIndex] = {
          ...updatedNodes[currentIndex],
          status: STATUS.COMPLETED,
        };

        // Update next node status if it exists
        if (currentIndex + 1 < updatedNodes.length) {
          const nextNode = updatedNodes[currentIndex + 1];
          if (nextNode.status === STATUS.LOCKED) {
            updatedNodes[currentIndex + 1] = {
              ...nextNode,
              status: STATUS.CURRENT,
            };
          }

          // Make the node after next available if it exists
          if (currentIndex + 2 < updatedNodes.length) {
            const nodeAfterNext = updatedNodes[currentIndex + 2];
            if (nodeAfterNext.status === STATUS.LOCKED) {
              updatedNodes[currentIndex + 2] = {
                ...nodeAfterNext,
                status: STATUS.AVAILABLE,
              };
            }
          }
        }
      }

      return updatedNodes;
    });
    setSelectedNode(null);
  };

  const nextSegment = () => {
    if (activeSegment < segments.length - 1)
      setActiveSegment(activeSegment + 1);
  };

  const prevSegment = () => {
    if (activeSegment > 0) setActiveSegment(activeSegment - 1);
  };

  const totalNodes = nodes.length;
  const completedNodes = nodes.filter(
    (n) => n.status === STATUS.COMPLETED
  ).length;
  const progressPercentage =
    totalNodes > 0 ? Math.round((completedNodes / totalNodes) * 100) : 0;

  // Select region theme based on segment and isDarkMode
  const region = regionThemes[activeSegment % regionThemes.length];
  const currentTheme = isDarkMode ? region.dark : region.light;

  if (!nodes.length) {
    return (
      <div className="py-6 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">
              DSA Learning Path
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Master data structures and algorithms through structured learning
              paths
            </p>
          </motion.header>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <EmptyPathState />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`py-6 px-4 md:px-6 ${isDarkMode ? "bg-zinc-900" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`mb-8 ${
            isDarkMode
              ? "bg-zinc-800 border border-zinc-700"
              : "bg-white border border-zinc-200"
          } rounded-xl p-6 shadow-lg`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className={`p-4 rounded-lg ${isDarkMode ? "bg-zinc-700" : "bg-zinc-100"}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Progress</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {completedNodes} of {totalNodes} challenges
                  </p>
                </div>
                <Star className="text-yellow-500" size={28} />
              </div>
              <div className="mt-3 bg-slate-200 dark:bg-slate-600 rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                ></motion.div>
              </div>
            </div>
            <div
              className={`p-4 rounded-lg ${isDarkMode ? "bg-zinc-700" : "bg-zinc-100"}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Current Region</h3>
                  <p
                    className={`text-sm ${isDarkMode ? "text-zinc-600" : "text-zinc-400"}`}
                  >
                    {region.name}
                  </p>
                </div>
                <Compass
                  className="text-blue-500 dark:text-blue-400"
                  size={28}
                />
              </div>
              <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                {segments.length > 0 && (
                  <p>
                    Section {activeSegment + 1} of {segments.length}
                  </p>
                )}
              </div>
            </div>
            <div
              className={`p-4 rounded-lg ${isDarkMode ? "bg-zinc-700" : "bg-zinc-100"}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Next Challenge</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 truncate max-w-xs">
                    {nodes.find((n) => n.status === STATUS.CURRENT)?.title ||
                      "Complete all available challenges"}
                  </p>
                </div>
                <CornerRightDown
                  className="text-purple-500 dark:text-purple-400"
                  size={28}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Controls and Dots */}
        <div className="flex justify-between items-center mb-4 w-full max-w-full mx-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevSegment}
            disabled={activeSegment === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-zinc-100 ${
              activeSegment === 0
                ? "opacity-50 cursor-not-allowed"
                : "bg-white dark:bg-slate-600 hover:bg-opacity-100 shadow-sm border border-zinc-200 dark:border-zinc-700"
            }`}
          >
            <ChevronLeft size={18} />
            <span className="hidden md:inline ">Previous Region</span>
          </motion.button>
          <div className="flex items-center gap-2">
            {segments.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveSegment(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  activeSegment === index
                    ? "bg-blue-500 dark:bg-blue-400"
                    : "bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400 dark:hover:bg-zinc-500"
                }`}
              />
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextSegment}
            disabled={activeSegment === segments.length - 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-zinc-100 ${
              activeSegment === segments.length - 1
                ? "opacity-50 cursor-not-allowed"
                : "bg-white dark:bg-slate-600 hover:bg-opacity-100 shadow-sm border border-zinc-200 dark:border-zinc-700"
            }`}
          >
            <span className="hidden md:inline">Next Region</span>
            <ChevronRight size={18} />
          </motion.button>
        </div>

        {/* Main Content Area with Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mb-8"
        >
          {segments.length > 0 && (
            <div
              className={`bg-gradient-to-br ${currentTheme.bgGradient} rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden`}
            >
              <div className="relative min-h-[400px]">
                {/* Grid Background with circular cells */}
                <div
                  className="absolute inset-0 grid gap-0.5"
                  style={{
                    gridTemplateColumns: `repeat(${GRID_SIZE.cols}, 1fr)`,
                    gridTemplateRows: `repeat(${GRID_SIZE.rows}, 1fr)`,
                  }}
                >
                  {Array.from({ length: GRID_SIZE.rows * GRID_SIZE.cols }).map(
                    (_, index) => (
                      <div
                        key={index}
                        className={`rounded-xl transition-opacity duration-300 hover:opacity-40 ${
                          isDarkMode ? "bg-white/40" : "bg-black/8"
                        } ${
                          (Math.floor(index / GRID_SIZE.cols) +
                            (index % GRID_SIZE.cols)) %
                            2 ===
                          0
                            ? "opacity-30"
                            : "opacity-20"
                        }`}
                      />
                    )
                  )}
                </div>

                {/* Decorations, centered in grid */}
                {currentTheme.decorations.map((decoration, i) => {
                  const gridPosition = {
                    row:
                      Math.floor(GRID_SIZE.rows / 2) +
                      Math.floor(Math.sin(i) * 2),
                    col: Math.floor(
                      (i + 1) *
                        (GRID_SIZE.cols / (currentTheme.decorations.length + 1))
                    ),
                  };
                  return (
                    <motion.div
                      key={i}
                      className="absolute text-3xl md:text-4xl opacity-70"
                      style={{
                        top: `calc(${((gridPosition.row + 0.5) / GRID_SIZE.rows) * 100}%)`,
                        left: `calc(${((gridPosition.col + 0.5) / GRID_SIZE.cols) * 100}%)`,
                        transform: "translate(-50%, -50%)",
                      }}
                      variants={decorationVariants}
                      animate="float"
                      custom={i}
                    >
                      {decoration}
                    </motion.div>
                  );
                })}

                {/* Path and Nodes, centered */}
                <div className="absolute w-full h-full p-4 md:p-8 flex items-center justify-center">
                  <div
                    ref={scrollContainerRef}
                    className="flex items-center justify-center h-full w-full"
                  >
                    {segments[activeSegment] && (
                      <>
                        <svg className="absolute h-full w-full pointer-events-none z-0">
                          <motion.path
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            d={segments[activeSegment]
                              .map((_, index, arr) => {
                                const step = 100 / (arr.length - 1);
                                return index === 0
                                  ? `M ${index * step}% 50%`
                                  : `L ${index * step}% 50%`;
                              })
                              .join(" ")}
                            stroke={currentTheme.pathColor}
                            strokeWidth="6"
                            strokeDasharray="10,5"
                            fill="none"
                          />
                        </svg>
                        <div className="flex items-center justify-between w-full relative z-10">
                          {segments[activeSegment].map((node, index) => (
                            <PathNode
                              key={node.id}
                              node={node}
                              onClick={handleNodeClick}
                              nodeTypes={nodeTypes}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Legend */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`${
            isDarkMode
              ? "bg-zinc-800 border border-zinc-700"
              : "bg-white border border-zinc-200"
          } rounded-xl p-6 shadow-lg`}
        >
          <h3
            className={`text-lg font-semibold mb-4 ${
              isDarkMode ? "text-white" : "text-zinc-800"
            }`}
          >
            Path Guide
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-zinc-500 dark:bg-zinc-600 opacity-60 flex items-center justify-center">
                <Lock size={16} className="text-white" />
              </div>
              <span className="text-sm">Locked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center">
                <Play size={16} className="text-white" />
              </div>
              <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(250, 204, 21, 0.4)",
                    "0 0 15px rgba(250, 204, 21, 0.7)",
                    "0 0 0 rgba(250, 204, 21, 0.4)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="w-8 h-8 rounded-full bg-yellow-400 dark:bg-yellow-500 ring-2 ring-yellow-300 dark:ring-yellow-400 flex items-center justify-center"
              >
                <Star size={16} className="text-white" />
              </motion.div>
              <span className="text-sm">Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500 dark:bg-green-600 flex items-center justify-center">
                <Check size={16} className="text-white" />
              </div>
              <span className="text-sm">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-500 dark:bg-purple-600 flex items-center justify-center">
                <Award size={16} className="text-white" />
              </div>
              <span className="text-sm">Challenge</span>
            </div>
          </div>
        </motion.div> */}

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div
            className={`p-6 rounded-xl ${
              isDarkMode
                ? "bg-zinc-800/50 border border-zinc-700"
                : "bg-white border border-zinc-200"
            } shadow-lg`}
          >
            <h3
              className={`text-xl font-semibold mb-4 ${
                isDarkMode ? "text-white" : "text-zinc-800"
              }`}
            >
              Learning Resources
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
                <span
                  className={isDarkMode ? "text-zinc-300" : "text-zinc-600"}
                >
                  Comprehensive study notes
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Youtube className="w-5 h-5 text-blue-500" />
                <span
                  className={isDarkMode ? "text-zinc-300" : "text-zinc-600"}
                >
                  Video explanations
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-500" />
                <span
                  className={isDarkMode ? "text-zinc-300" : "text-zinc-600"}
                >
                  Implementation examples
                </span>
              </li>
            </ul>
          </div>
          <div
            className={`p-6 rounded-xl ${
              isDarkMode
                ? "bg-zinc-800/50 border border-zinc-700"
                : "bg-white border border-zinc-200"
            } shadow-lg`}
          >
            <h3
              className={`text-xl font-semibold mb-4 ${
                isDarkMode ? "text-white" : "text-zinc-800"
              }`}
            >
              Practice & Assessment
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-500" />
                <span
                  className={isDarkMode ? "text-zinc-300" : "text-zinc-600"}
                >
                  Curated LeetCode problems
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-500" />
                <span
                  className={isDarkMode ? "text-zinc-300" : "text-zinc-600"}
                >
                  Interactive visualizations
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-500" />
                <span
                  className={isDarkMode ? "text-zinc-300" : "text-zinc-600"}
                >
                  Progress tracking
                </span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
      {/* Node Content Popup */}
      <AnimatePresence>
        {selectedNode && (
          <div className="p-6">
            <NodeContent
              node={selectedNode}
              onClose={closePopup}
              onComplete={completeNode}
              nodeTypes={nodeTypes}
              isDarkMode={isDarkMode}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
