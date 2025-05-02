// components/PathSelector.jsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useProgress } from "../context/ProgressContext";
import { BookOpen, Code, Zap, Brain, Network, Award } from "lucide-react";

const predefinedPaths = [
  {
    id: "dsa-fundamentals",
    name: "DSA Fundamentals",
    description: "Core data structures and algorithms for beginners",
    icon: <BookOpen className="w-6 h-6 text-blue-500" />,
    categories: ["arrays", "sorting", "binary-search", "linked-lists"],
    difficulty: "beginner",
  },
  {
    id: "graph-algorithms",
    name: "Graph Algorithms",
    description: "Comprehensive path for mastering graph theory",
    icon: <Network className="w-6 h-6 text-purple-500" />,
    categories: ["graph"],
    difficulty: "intermediate",
  },
  {
    id: "dynamic-programming",
    name: "Dynamic Programming",
    description: "Master DP techniques with progressive challenges",
    icon: <Brain className="w-6 h-6 text-pink-500" />,
    categories: ["dynamic-programming"],
    difficulty: "advanced",
  },
  {
    id: "interview-prep",
    name: "Interview Preparation",
    description: "Curated problems frequently asked in tech interviews",
    icon: <Code className="w-6 h-6 text-green-500" />,
    categories: [
      "arrays",
      "binary-search",
      "sorting",
      "dynamic-programming",
      "graph",
    ],
    difficulty: "mixed",
  },
  {
    id: "competitive-coding",
    name: "Competitive Coding",
    description: "Advanced algorithms for competitive programming",
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    categories: ["dynamic-programming", "graph", "binary-search"],
    difficulty: "expert",
  },
];

export default function PathSelector({ onSelectPath }) {
  const [selectedPath, setSelectedPath] = useState(null);
  const { getPathProgress, resetPathProgress } = useProgress();

  const handleSelectPath = (path) => {
    setSelectedPath(path.id);
    onSelectPath(path);
  };

  const handleResetProgress = (e, pathId) => {
    e.stopPropagation();
    if (
      confirm("Are you sure you want to reset your progress for this path?")
    ) {
      resetPathProgress(pathId);
    }
  };

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Choose Your Learning Path
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {predefinedPaths.map((path) => {
          const { completedNodes } = getPathProgress(path.id);
          const progress = completedNodes.length;

          return (
            <motion.div
              key={path.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`p-6 rounded-xl cursor-pointer transition-all ${
                selectedPath === path.id
                  ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "bg-white dark:bg-zinc-800 hover:shadow-lg border border-zinc-200 dark:border-zinc-700"
              }`}
              onClick={() => handleSelectPath(path)}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-700">
                  {path.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{path.name}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-zinc-200 dark:bg-zinc-600">
                    {path.difficulty}
                  </span>
                </div>
              </div>

              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                {path.description}
              </p>

              {progress > 0 && (
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <button
                      onClick={(e) => handleResetProgress(e, path.id)}
                      className="text-red-500 hover:underline"
                    >
                      Reset
                    </button>
                  </div>
                  <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${Math.min(progress * 5, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
