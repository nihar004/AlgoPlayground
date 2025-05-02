import {
  Lock,
  Play,
  Code,
  Eye,
  Youtube,
  List,
  Shuffle,
  GitBranch,
  Hash,
  Layers3,
  BookOpen,
  BarChart2,
  Sigma,
  Brain,
  TreePine,
  Network,
  Award,
} from "lucide-react";

// Helper: Map category to a nice icon and color
export const getNodeTypes = () => ({
  ARRAY: {
    color: "bg-purple-500",
    name: "Array Valley",
    icon: <List size={20} />, // List for arrays
  },
  LINKED_LIST: {
    color: "bg-blue-500",
    name: "Linked List",
    icon: <GitBranch size={20} />, // GitBranch for linked lists
  },
  BINARY_SEARCH: {
    color: "bg-green-500",
    name: "Binary Search",
    icon: <BarChart2 size={20} />, // BarChart for search
  },
  SORTING: {
    color: "bg-yellow-500",
    name: "Sorting",
    icon: <Shuffle size={20} />, // Shuffle for sorting
  },
  GRAPH: {
    color: "bg-red-500",
    name: "Graph",
    icon: <Network size={20} />, // Network for graphs
  },
  DP: {
    color: "bg-pink-500",
    name: "Dynamic Programming",
    icon: <Brain size={20} />, // Brain for DP
  },
  TREE: {
    color: "bg-teal-500",
    name: "Tree",
    icon: <TreePine size={20} />, // TreePine for trees
  },
  HASH: {
    color: "bg-orange-500",
    name: "Hash Table",
    icon: <Hash size={20} />, // Hash for hash tables
  },
  VIDEO: {
    color: "bg-indigo-500",
    name: "Algorithm Analysis",
    icon: <Youtube size={20} />, // Youtube for video
  },
  BASICS: {
    color: "bg-gray-500",
    name: "Basics",
    icon: <BookOpen size={20} />, // BookOpen for basics
  },
  BASIC_LOGIC: {
    color: "bg-gray-600",
    name: "Basic Logic",
    icon: <Sigma size={20} />, // Sigma for logic/math
  },
  BASIC_MATH: {
    color: "bg-gray-700",
    name: "Basic Math",
    icon: <Sigma size={20} />, // Sigma for math
  },
  BASIC_HASHING: {
    color: "bg-gray-800",
    name: "Basic Hashing",
    icon: <Hash size={20} />, // Hash for hashing
  },
  VISUALIZATION: {
    color: "bg-cyan-500",
    name: "Visualization",
    icon: <Eye size={20} />, // Eye for visualizations
  },
  CHALLENGE: {
    color: "bg-purple-700",
    name: "Challenge",
    icon: <Award size={20} />, // Award for challenge
  },
});

// Status constants
export const STATUS = {
  LOCKED: "LOCKED",
  COMPLETED: "COMPLETED",
  CURRENT: "CURRENT",
  AVAILABLE: "AVAILABLE",
};

// Flatten notesData into a linear array of nodes
export const processNotesData = (notesData) => {
  const nodes = [];
  let idCounter = 1;

  Object.entries(notesData.categories).forEach(([category, categoryData]) => {
    Object.entries(categoryData).forEach(([difficulty, difficultyData]) => {
      Object.entries(difficultyData).forEach(([key, content], index) => {
        nodes.push({
          id: idCounter++,
          key: `${category}-${difficulty}-${key.split("-")[1]}`,
          type: category.toUpperCase().replace("-", "_"),
          difficulty,
          status: STATUS.AVAILABLE, // Changed from LOCKED to AVAILABLE
          position: {
            x: nodes.length,
            y: Math.floor(Math.random() * 3) + 1, // Random y position between 1-3
          },
          content,
          meta: {
            category,
            originalKey: key,
          },
        });
      });
    });
  });

  return nodes;
};
