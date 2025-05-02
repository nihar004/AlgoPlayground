// "use client";
// import { useState } from "react";
// import { usePaths } from "./utils/usePaths";
// import PathSurveyModal from "./components/PathSurveyModal";
// import Path from "./components/Path";
// import notesData from "../../public/notesData.json";
// import { ProgressProvider } from "./context/ProgressContext";
// import { BookOpen, Plus, Trash2 } from "lucide-react";
// import Header from "../category/Header";

// // Helper to generate a new path from survey (replace with LLM logic as needed)
// function generateCustomPath(survey) {
//   return {
//     id: `custom-${Date.now()}`,
//     name: `Custom Path (${survey.level}, ${survey.goal}, ${survey.focus})`,
//     survey,
//     createdAt: Date.now(),
//   };
// }

// const DEFAULT_PATH_ID = "default-full-dsa-path";

// export default function LearningPathPage() {
//   const { paths, addPath, removePath } = usePaths();
//   const [showSurvey, setShowSurvey] = useState(false);
//   const [activePathId, setActivePathId] = useState(null);

//   const [searchTerm, setSearchTerm] = useState("");

//   // All paths (default + custom)
//   const allPaths = [
//     {
//       id: DEFAULT_PATH_ID,
//       name: "Complete DSA Path",
//       description: "Full recommended path covering all DSA topics.",
//       icon: <BookOpen className="w-8 h-8 text-blue-600" />,
//       isDefault: true,
//     },
//     ...paths,
//   ];

//   // Filter notesData for a custom path (replace with your LLM logic)
//   function getNotesDataForPath(path) {
//     if (!path || path.isDefault) return notesData;
//     // Example: Filter categories by focus
//     if (path.survey.focus === "all") return notesData;
//     const filtered = { ...notesData, categories: {} };
//     Object.entries(notesData.categories).forEach(([cat, catData]) => {
//       if (cat.toLowerCase().includes(path.survey.focus)) {
//         filtered.categories[cat] = catData;
//       }
//     });
//     return filtered;
//   }

//   // Survey submit handler
//   const handleSurveySubmit = (survey) => {
//     const newPath = generateCustomPath(survey);
//     addPath(newPath);
//     setActivePathId(newPath.id);
//   };

//   // Render
//   return (
//     <ProgressProvider>
//       <Header title="Learning Path" />
//       <div className="">
//         {!activePathId && (
//           <>
//             <h1 className="text-3xl font-bold mb-6">My Learning Paths</h1>
//             <div className="mb-6 flex gap-3">
//               <button
//                 onClick={() => setActivePathId(DEFAULT_PATH_ID)}
//                 className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
//               >
//                 <BookOpen size={20} /> Start Default Path
//               </button>
//               <button
//                 onClick={() => setShowSurvey(true)}
//                 className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
//               >
//                 <Plus size={20} /> New Custom Path
//               </button>
//             </div>
//             <div className="space-y-4">
//               {allPaths.map((path) => (
//                 <div
//                   key={path.id}
//                   className="flex items-center justify-between bg-white dark:bg-zinc-800 p-4 rounded shadow border"
//                 >
//                   <div className="flex items-center gap-4">
//                     {path.icon || (
//                       <BookOpen className="w-8 h-8 text-blue-600" />
//                     )}
//                     <div>
//                       <div className="font-semibold">{path.name}</div>
//                       {path.description && (
//                         <div className="text-sm text-zinc-500">
//                           {path.description}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => setActivePathId(path.id)}
//                       className="bg-blue-500 text-white px-3 py-1 rounded"
//                     >
//                       Visit
//                     </button>
//                     {!path.isDefault && (
//                       <button
//                         onClick={() => removePath(path.id)}
//                         className="text-red-500 hover:bg-red-100 p-2 rounded"
//                         title="Delete Path"
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//             {showSurvey && (
//               <PathSurveyModal
//                 onClose={() => setShowSurvey(false)}
//                 onSubmit={handleSurveySubmit}
//               />
//             )}
//           </>
//         )}
//         {activePathId && (
//           <>
//             <div className="mb-4 w-full h-full">
//               <button
//                 onClick={() => setActivePathId(null)}
//                 className="text-blue-500 hover:underline flex items-center gap-1"
//               >
//                 ← Back to Paths
//               </button>
//             </div>
//             <div className="w-screen h-screen">
//               <Path
//                 notesData={getNotesDataForPath(
//                   allPaths.find((p) => p.id === activePathId)
//                 )}
//                 pathId={activePathId}
//               />
//             </div>
//           </>
//         )}
//       </div>
//     </ProgressProvider>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { usePaths } from "./utils/usePaths";
import Path from "./components/Path";
import notesData from "../../public/notesData.json";
import { ProgressProvider } from "./context/ProgressContext";
import {
  BookOpen,
  Plus,
  Trash2,
  ChevronRight,
  Target,
  BarChart3,
  Rocket,
  MessageSquare,
  ArrowLeft,
  Search,
  Clock,
  Star,
  Calendar,
} from "lucide-react";
import Header from "../category/Header";

// Helper to generate a new path from survey or chatbot interaction
function generateCustomPath(pathData) {
  return {
    id: `custom-${Date.now()}`,
    name: pathData.name || `Custom Path (${pathData.level}, ${pathData.goal})`,
    description:
      pathData.description || `Focus: ${pathData.focus || "General DSA"}`,
    survey: pathData,
    createdAt: Date.now(),
    lastAccessed: Date.now(),
    progress: 0,
    icon: <Target className="w-8 h-8 text-indigo-600" />,
  };
}

const DEFAULT_PATHS = [
  {
    id: "default-full-dsa-path",
    name: "Complete DSA Mastery",
    description: "Full recommended path covering all essential DSA topics.",
    icon: <BookOpen className="w-8 h-8 text-blue-600" />,
    isDefault: true,
    createdAt: Date.now(), // 30 days ago
    lastAccessed: Date.now(), // 2 days ago
    progress: 45,
  },
  // {
  //   id: "default-interview-prep",
  //   name: "Technical Interview Prep",
  //   description: "Focus on common interview questions and problem patterns.",
  //   icon: <Star className="w-8 h-8 text-yellow-500" />,
  //   isDefault: true,
  //   createdAt: Date.now() - 86400000 * 15, // 15 days ago
  //   lastAccessed: Date.now() - 86400000 * 5, // 5 days ago
  //   progress: 30,
  // },
];

export default function LearningPathPage() {
  const { paths, addPath, removePath } = usePaths();
  const [activePathId, setActivePathId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      role: "system",
      content:
        "I'll help you create a personalized learning path. What would you like to focus on?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [pathBeingCreated, setPathBeingCreated] = useState({
    name: "",
    level: "intermediate",
    goal: "",
    focus: "",
    description: "",
  });
  const [creationStep, setCreationStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // All paths (default + custom)
  const allPaths = [...DEFAULT_PATHS, ...paths];

  const filteredPaths = allPaths.filter(
    (path) =>
      path.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (path.description &&
        path.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Filter notesData for a custom path
  function getNotesDataForPath(path) {
    if (!path || path.isDefault) return notesData;
    // Filter categories by focus
    if (!path.survey || path.survey.focus === "all") return notesData;
    const filtered = { ...notesData, categories: {} };
    Object.entries(notesData.categories).forEach(([cat, catData]) => {
      if (cat.toLowerCase().includes(path.survey.focus)) {
        filtered.categories[cat] = catData;
      }
    });
    return filtered;
  }

  // Chat logic
  const addChatMessage = (role, content) => {
    setChatMessages((prev) => [...prev, { role, content }]);
  };

  const handleSubmitChat = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    addChatMessage("user", inputMessage);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      setIsLoading(false);

      // Update path being created based on user input
      if (creationStep === 0) {
        setPathBeingCreated((prev) => ({ ...prev, focus: inputMessage }));
        addChatMessage(
          "system",
          `Great! I'll focus on ${inputMessage}. What's your current level of expertise? (beginner, intermediate, advanced)`
        );
        setCreationStep(1);
      } else if (creationStep === 1) {
        setPathBeingCreated((prev) => ({
          ...prev,
          level: inputMessage.toLowerCase(),
        }));
        addChatMessage(
          "system",
          "What's your main goal with learning this material? (e.g. interview prep, project work, academic learning)"
        );
        setCreationStep(2);
      } else if (creationStep === 2) {
        setPathBeingCreated((prev) => ({ ...prev, goal: inputMessage }));
        addChatMessage(
          "system",
          "What would you like to name your learning path?"
        );
        setCreationStep(3);
      } else if (creationStep === 3) {
        setPathBeingCreated((prev) => ({ ...prev, name: inputMessage }));

        // Create description
        const description = `A ${pathBeingCreated.level} level path focused on ${pathBeingCreated.focus} for ${pathBeingCreated.goal}.`;
        setPathBeingCreated((prev) => ({ ...prev, description }));

        addChatMessage(
          "system",
          `Perfect! I've created a "${inputMessage}" learning path based on your preferences. You can now access it from your dashboard.`
        );

        // Create the path
        setTimeout(() => {
          const newPath = generateCustomPath({
            ...pathBeingCreated,
            name: inputMessage,
            description,
          });
          addPath(newPath);
          setCreationStep(4);
        }, 1000);
      }

      setInputMessage("");
    }, 1500);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Render
  return (
    <ProgressProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-900">
        <Header title="Learning Paths" />

        {!activePathId ? (
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  My Learning Paths
                </h1>
                {/* <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Track your progress across different data structures and
                  algorithms topics
                </p> */}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowChatbot(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md transition-all"
                >
                  <MessageSquare size={20} /> Create With AI
                </button>
              </div>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-zinc-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search paths..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Featured paths section */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Featured Paths
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {DEFAULT_PATHS.map((path) => (
                  <div
                    key={path.id}
                    className="bg-white dark:bg-zinc-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-zinc-700 hover:shadow-lg transition-shadow"
                  >
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        {path.icon}
                        <div className="font-semibold text-lg text-gray-900 dark:text-white">
                          {path.name}
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {path.description}
                      </p>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Calendar size={16} className="mr-2" />
                          <span>Created {formatDate(path.createdAt)}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-300">
                            Progress
                          </span>
                          <span className="font-medium text-indigo-600">
                            {path.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{ width: `${path.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <button
                        onClick={() => setActivePathId(path.id)}
                        className="w-full bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/40 text-indigo-700 dark:text-indigo-300 py-2 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
                      >
                        Continue Learning <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom paths section */}
            {paths.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  My Custom Paths
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {paths.map((path) => (
                    <div
                      key={path.id}
                      className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-zinc-700 hover:shadow-md transition-shadow"
                    >
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {path.icon || (
                              <Target className="w-6 h-6 text-indigo-600" />
                            )}
                            <div className="font-medium text-gray-900 dark:text-white">
                              {path.name}
                            </div>
                          </div>
                          <button
                            onClick={() => removePath(path.id)}
                            className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                            title="Delete Path"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                          {path.description}
                        </p>

                        <div className="mb-3 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-2" />
                            <span>Created {formatDate(path.createdAt)}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => setActivePathId(path.id)}
                          className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-3 rounded-lg flex items-center justify-center gap-1 text-sm font-medium transition-colors"
                        >
                          View Path <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-800 flex items-center">
              <button
                onClick={() => setActivePathId(null)}
                className="text-indigo-600 hover:text-indigo-800 flex items-center gap-2 font-medium mr-4"
              >
                <ArrowLeft size={18} /> Back
              </button>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {allPaths.find((p) => p.id === activePathId)?.name ||
                  "Learning Path"}
              </h2>
            </div>
            <div className="w-full h-full">
              <Path
                notesData={getNotesDataForPath(
                  allPaths.find((p) => p.id === activePathId)
                )}
                pathId={activePathId}
              />
            </div>
          </div>
        )}
      </div>

      {/* Chatbot overlay */}
      {showChatbot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-800 w-full max-w-lg h-3/4 rounded-xl shadow-xl flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="font-semibold text-lg">
                Create Custom Learning Path
              </h3>
              <button
                onClick={() => {
                  setShowChatbot(false);
                  setChatMessages([
                    {
                      role: "system",
                      content:
                        "I'll help you create a personalized learning path. What would you like to focus on?",
                    },
                  ]);
                  setCreationStep(0);
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                &times;
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-3/4 p-3 rounded-lg ${
                      msg.role === "user"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 dark:bg-zinc-700 text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-3/4 p-3 rounded-lg bg-gray-100 dark:bg-zinc-700">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              {creationStep < 4 ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your response..."
                    className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-700 dark:text-white"
                    onKeyPress={(e) => e.key === "Enter" && handleSubmitChat()}
                  />
                  <button
                    onClick={handleSubmitChat}
                    disabled={isLoading}
                    className={`bg-indigo-600 text-white p-2 rounded-r-lg ${isLoading ? "opacity-70" : "hover:bg-indigo-700"}`}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setShowChatbot(false);
                    setChatMessages([
                      {
                        role: "system",
                        content:
                          "I'll help you create a personalized learning path. What would you like to focus on?",
                      },
                    ]);
                    setCreationStep(0);
                  }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition-colors"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </ProgressProvider>
  );
}
