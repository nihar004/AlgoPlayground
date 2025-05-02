"use client";

import { motion } from "framer-motion";
import { Lock, Play, CheckCircle, Star } from "lucide-react";

const statusStyles = {
  LOCKED: {
    ring: "ring-2 ring-gray-300",
    icon: <Lock size={18} className="text-gray-400" />,
    bg: "bg-gray-200 dark:bg-gray-700 opacity-60 grayscale",
    cursor: "cursor-not-allowed",
    glow: "",
  },
  AVAILABLE: {
    ring: "ring-2 ring-blue-300",
    icon: <Play size={18} className="text-blue-500" />,
    bg: "",
    cursor: "cursor-pointer",
    glow: "",
  },
  CURRENT: {
    ring: "ring-4 ring-yellow-400",
    icon: <Star size={18} className="text-yellow-400 animate-pulse" />,
    bg: "",
    cursor: "cursor-pointer",
    glow: "shadow-[0_0_12px_2px_rgba(250,204,21,0.6)] animate-glow",
  },
  COMPLETED: {
    ring: "ring-2 ring-green-400",
    icon: <CheckCircle size={18} className="text-green-500" />,
    bg: "",
    cursor: "cursor-pointer",
    glow: "",
  },
};

export const PathNode = ({ node, onClick, nodeTypes }) => {
  const nodeType = nodeTypes[node.type] || nodeTypes.BASICS;
  const status = statusStyles[node.status] || statusStyles.LOCKED;

  return (
    <motion.div
      role="button"
      tabIndex={node.status !== "LOCKED" ? 0 : -1}
      aria-label={node.content?.title || nodeType.name || "Node"}
      initial={{ scale: 1, zIndex: 1 }}
      whileHover={node.status !== "LOCKED" ? { scale: 1.12, zIndex: 2 } : {}}
      whileTap={node.status !== "LOCKED" ? { scale: 0.97 } : {}}
      className={`
        relative flex flex-col items-center group
        transition-all duration-200
        ${status.cursor}
        focus:outline-none
        ${status.glow}
      `}
      onClick={() => node.status !== "LOCKED" && onClick(node)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && node.status !== "LOCKED") onClick(node);
      }}
    >
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 max-w-[150px]">
        <span className="text-sm text-white font-medium px-2 py-1 bg-white/90 dark:bg-zinc-800/90 rounded-md shadow-sm block truncate">
          {node.content?.video?.title || nodeType.name}
        </span>
      </div>

      {/* Status badge */}
      <div className="absolute -top-2 -right-2 z-10">
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-white shadow ring-1 ring-gray-200 dark:ring-gray-700">
          {status.icon}
        </div>
      </div>
      {/* Node icon */}
      <div
        className={`
          w-16 h-16 rounded-full flex items-center justify-center shadow-lg bg-zinc-600
          ${status.bg}
          ${status.ring}
          transition-all duration-200
        `}
      >
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-black bg-opacity-90">
          {nodeType.icon}
        </div>
      </div>
    </motion.div>
  );
};
