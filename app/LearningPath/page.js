"use client";

import { useState, useEffect } from "react";
import { usePaths } from "./utils/usePaths"; // [4] Custom hook for managing paths
import Path from "./components/Path"; // [6] Component to display the active path
import notesData from "../../public/notesData.json"; // [1] Your learning content data
import { ProgressProvider } from "./context/ProgressContext"; // Context for progress tracking
import Header from "../category/Header"; // [2] Assuming Header component path is correct
import {
  // Icons imported from lucide-react based on page.js [2] and others
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
  X, // For close button
  // Add any other icons needed by Path component or elsewhere
  Zap,
  Code,
  Eye,
  CheckCircle,
} from "lucide-react";

// --- Constants ---

// Default paths available to all users [2]
const DEFAULT_PATHS = [
  {
    id: "default-full-dsa-path",
    name: "Complete DSA Mastery",
    description: "Full recommended path covering all essential DSA topics.",
    icon: <BookOpen size={24} className="text-indigo-500" />, // Assign Lucide icon
    isDefault: true,
    createdAt: Date.now() - 86400000 * 30, // Example date
    lastAccessed: Date.now() - 86400000 * 2, // Example date
    progress: 45, // Example progress
  },
  // Add other default paths if needed, ensuring 'icon' is assigned correctly
  // {
  //   id: "default-interview-prep",
  //   name: "Technical Interview Prep",
  //   description: "Focus on common interview questions and problem patterns.",
  //   icon: <Target size={24} className="text-green-500" />, // Assign Lucide icon
  //   isDefault: true,
  //   createdAt: Date.now() - 86400000 * 15,
  //   lastAccessed: Date.now() - 86400000 * 5,
  //   progress: 30,
  // },
];

// --- Helper Functions ---

// Generates a custom path object from AI-collected parameters [2]
function generateCustomPath(pathData) {
  console.log("Generating custom path with data:", pathData); // DEBUG
  const name =
    pathData?.name ||
    `Custom Path (${pathData?.level || "N/A"}, ${pathData?.goal || "N/A"})`;
  const description =
    pathData?.description ||
    `A ${pathData?.level || "custom"} path focusing on ${pathData?.focus || "various topics"} for ${pathData?.goal || "learning"}.`;

  return {
    id: `custom-${Date.now()}`, // Unique ID
    name: name,
    description: description,
    survey: pathData || {}, // Store the parameters collected
    createdAt: Date.now(),
    lastAccessed: Date.now(),
    progress: 0, // Starts with 0 progress
    icon: <Target size={20} className="text-green-600 dark:text-green-500" />, // Default icon for custom paths [2]
    isDefault: false, // Mark as custom
  };
}

// Formats timestamp to a readable date string [2]
const formatDate = (timestamp) => {
  if (!timestamp) return "";
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// **REVISED/CONFIRMED** Filter function (from previous steps)
// Filters notesData based on custom path's survey parameters [1]
function getNotesDataForPath(path) {
  // 1. Handle default paths or paths without survey data -> return all notes [1]
  if (!path || path.isDefault || !path.survey) {
    console.log(
      "[getNotesDataForPath] Path is default or has no survey, returning all notesData."
    );
    return notesData;
  }
  // 2. Extract focus and level, providing defaults if missing
  const focus = path.survey.focus?.toLowerCase() || "all";
  const level = path.survey.level?.toLowerCase() || "intermediate";
  console.log(
    `[getNotesDataForPath] Filtering path "${path.name}" for focus: "${focus}", level: "${level}"`
  );
  // 3. Handle broad focus terms -> return all notes [1]
  if (
    focus === "all" ||
    focus === "general dsa" ||
    focus === "general dsa fundamentals"
  ) {
    console.log(
      "[getNotesDataForPath] Broad focus detected, returning all notesData."
    );
    return notesData;
  }
  // 4. Define which categories to include based on focus
  let targetCategories = new Set(["basics"]); // Always include 'basics'
  // Explicit mapping for common broad focus terms
  if (focus === "interview prep") {
    [
      "arrays",
      "strings",
      "linked-lists",
      "stack-&-queue",
      "sorting",
      "binary-search",
      "recursion",
      "bit-manipulation",
      "greedy",
      "binary-tree",
      "binary-search-tree",
      "heap",
      "graph",
      "dynamic-programming",
      "tries",
    ].forEach((cat) => targetCategories.add(cat));
    console.log(
      "[getNotesDataForPath] Focus 'Interview Prep', adding relevant categories:",
      Array.from(targetCategories)
    );
  } else {
    // Try exact match first, then `includes` for specific topics
    let foundMatch = false;
    Object.keys(notesData.categories).forEach((catKey) => {
      // [1]
      const lowerCatKey = catKey.toLowerCase();
      if (lowerCatKey === focus) {
        targetCategories.add(lowerCatKey);
        foundMatch = true;
      }
    });
    if (!foundMatch) {
      Object.keys(notesData.categories).forEach((catKey) => {
        // [1]
        const lowerCatKey = catKey.toLowerCase();
        if (lowerCatKey.includes(focus)) {
          targetCategories.add(lowerCatKey);
        }
      });
    }
    console.log(
      `[getNotesDataForPath] Focus "${focus}" mapped to target categories:`,
      Array.from(targetCategories)
    );
  }
  // 5. Filter categories and difficulties
  const filteredCategories = {};
  Object.entries(notesData.categories).forEach(([catKey, catData]) => {
    // [1]
    const lowerCatKey = catKey.toLowerCase();
    if (targetCategories.has(lowerCatKey)) {
      const filteredDifficulties = {};
      let categoryHasContent = false;
      Object.entries(catData).forEach(([difficultyKey, difficultyData]) => {
        const lowerDifficultyKey = difficultyKey.toLowerCase();
        let includeDifficulty = false;
        if (level === "beginner" && lowerDifficultyKey === "easy")
          includeDifficulty = true;
        else if (
          level === "intermediate" &&
          (lowerDifficultyKey === "easy" || lowerDifficultyKey === "medium")
        )
          includeDifficulty = true;
        else if (level === "advanced") includeDifficulty = true; // Include all for advanced
        if (includeDifficulty && Object.keys(difficultyData).length > 0) {
          filteredDifficulties[difficultyKey] = difficultyData;
          categoryHasContent = true;
        }
      });
      if (categoryHasContent) filteredCategories[catKey] = filteredDifficulties;
    }
  });
  // 6. Check if any categories remain after filtering
  if (Object.keys(filteredCategories).length === 0) {
    console.warn(
      `[getNotesDataForPath] No nodes matched filter. Returning basics fallback.`
    );
    // Fallback: return only the 'basics' category if available, otherwise empty.
    return {
      ...notesData,
      categories: notesData.categories.basics
        ? { basics: notesData.categories.basics }
        : {},
    }; // [1]
  }
  // 7. Return the filtered data structure
  console.log(
    "[getNotesDataForPath] Final filtered categories:",
    Object.keys(filteredCategories)
  );
  return { ...notesData, categories: filteredCategories };
}

// --- Main Component ---

export default function LearningPathPage() {
  const { paths, addPath, removePath } = usePaths(); // [4] Load/save custom paths
  const [activePathId, setActivePathId] = useState(null); // ID of the path being viewed
  const [searchTerm, setSearchTerm] = useState(""); // For filtering paths
  const [showChatbot, setShowChatbot] = useState(false); // Toggle AI chat modal
  const [chatMessages, setChatMessages] = useState([
    // Stores the conversation
    {
      role: "system",
      content:
        "Let's create your personalized learning path! To start, what topic or area would you like to focus on?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState(""); // User's current message in chat
  const [isLoading, setIsLoading] = useState(false); // Loading state for AI response
  const [isChatComplete, setIsChatComplete] = useState(false); // State to control chat UI after completion

  // --- Derived State ---
  const notesDataCategories = notesData
    ? Object.keys(notesData.categories)
    : []; // [1] Get category names for AI
  const allPaths = [...DEFAULT_PATHS, ...paths]; // Combine default and user-created paths [2, 4]
  const filteredPaths = allPaths.filter(
    // Apply search filter [2]
    (path) =>
      path.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (path.description &&
        path.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Effect to log path changes (for debugging `addPath`)
  useEffect(() => {
    console.log("Paths state updated (from usePaths):", paths); // [4] Check if state reflects additions
  }, [paths]);

  // --- Chat Logic ---

  // Adds a message to the chat display
  const addChatMessage = (role, content) => {
    setChatMessages((prev) => [...prev, { role, content }]);
  };

  // Resets chat state and closes the modal
  const resetAndCloseChat = () => {
    setShowChatbot(false); // Hide modal
    setIsChatComplete(false); // Reset completion flag
    setIsLoading(false); // Reset loading flag
    // Reset chat messages to initial state
    setChatMessages([
      {
        role: "system",
        content:
          "Let's create your personalized learning path! To start, what topic or area would you like to focus on?",
      },
    ]);
    setInputMessage(""); // Clear input field
  };

  // Handles sending messages to the AI backend and processing responses
  const handleSubmitChat = async () => {
    // Prevent sending empty messages or during loading/completion
    if (!inputMessage.trim() || isLoading || isChatComplete) return;

    const userMessage = { role: "user", content: inputMessage };
    const currentMessages = [...chatMessages, userMessage]; // Add user's message

    setChatMessages(currentMessages); // Update UI immediately
    setInputMessage(""); // Clear input field
    setIsLoading(true); // Show loading indicator
    console.log("Sending to API:", {
      messages: currentMessages,
      notesDataCategories,
    }); // DEBUG

    try {
      // Call the Next.js API route
      const response = await fetch("/api/create-path-chat", {
        // Verify this is the correct API endpoint path
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: currentMessages,
          notesDataCategories,
        }), // Send conversation history and available topics
      });

      setIsLoading(false); // Hide loading indicator

      // Log raw response for debugging
      const responseText = await response.text();
      console.log("API Response Status:", response.status); // DEBUG
      console.log("API Response Text:", responseText); // DEBUG

      if (!response.ok) {
        // Handle API errors (like 4xx, 5xx)
        let errorMsg = `API Error: ${response.status}`;
        try {
          const errorData = JSON.parse(responseText); // Try to get specific error message
          errorMsg = errorData.error || errorMsg;
        } catch (e) {
          /* Ignore parsing error if response isn't JSON */
        }
        console.error("API Error Details:", errorMsg);
        addChatMessage("system", `Error: ${errorMsg}`);
        return;
      }

      // Try parsing the successful response as JSON
      let data;
      try {
        data = JSON.parse(responseText);
        console.log("Parsed API Data:", data); // DEBUG
      } catch (e) {
        // Handle cases where API returns non-JSON success response
        console.error("Failed to parse API response JSON:", e);
        addChatMessage(
          "system",
          "Error: Received invalid response from AI assistant."
        );
        return;
      }

      // *** Process the parsed data ***
      if (data && data.status === "complete" && data.parameters) {
        // AI signaled completion, create the path
        console.log("API signaled completion. Parameters:", data.parameters); // DEBUG
        try {
          const newPath = generateCustomPath(data.parameters); // Create the path object
          console.log("Generated new path object:", newPath); // DEBUG
          addPath(newPath); // Add path using the custom hook [4]
          console.log("Called addPath successfully."); // DEBUG
          addChatMessage(
            "system",
            `Great! I've created the "${newPath.name}" learning path. You can close this chat.`
          );
          setIsChatComplete(true); // Update UI to show "Done" button
        } catch (generationError) {
          // Catch errors during path object creation or state update
          console.error(
            "Error during path generation or adding:",
            generationError
          );
          addChatMessage(
            "system",
            `Error: Failed to create the path locally. ${generationError.message}`
          );
        }
      } else if (data && data.status === "in-progress" && data.response) {
        // AI is asking another question, continue conversation
        console.log("API in progress. Response:", data.response); // DEBUG
        addChatMessage("system", data.response); // Add AI's response to chat
      } else {
        // Handle unexpected structure in the successful response
        console.warn("Unexpected API response structure:", data);
        // Show the raw response if available, otherwise a generic message
        addChatMessage(
          "system",
          data.response ||
            "Sorry, I received an unexpected response. Please try again."
        );
      }
    } catch (error) {
      // Catch network errors or other exceptions during fetch/processing
      setIsLoading(false);
      console.error("Fetch/handleSubmitChat Error:", error);
      addChatMessage(
        "system",
        `Error: ${error.message || "Could not reach the AI assistant."}`
      );
    }
  };

  // --- Render Logic ---
  return (
    // ProgressProvider likely wraps around layout.js or template.js for broader context
    // If not, keep it here. [2]
    <ProgressProvider>
      {/* Assuming Header is part of the standard page layout */}
      <Header /> {/* [2] Render the Header component */}
      <div className="container mx-auto px-4 py-8 min-h-screen">
        {/* Conditionally render Path List or Active Path View */}
        {!activePathId ? (
          // --- Path Listing View (when no path is selected) --- [2]
          <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                  My Learning Paths
                </h1>
                {/* Description text from original page.js [2] */}
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Track your progress across different data structures and
                  algorithms topics
                </p>
              </div>
              {/* Button to open AI chat modal */}
              <button
                onClick={() => {
                  setShowChatbot(true);
                  setIsChatComplete(false);
                }} // Open modal, reset completion state
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md transition-all w-full sm:w-auto"
              >
                <Plus size={18} /> Create With AI
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search paths..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-800 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
                aria-label="Search learning paths"
              />
            </div>

            {/* Featured Paths Section */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
                Featured Paths
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Map through DEFAULT_PATHS that also match the filter [2] */}
                {DEFAULT_PATHS.filter((path) =>
                  filteredPaths.includes(path)
                ).map((path) => (
                  <div
                    key={path.id}
                    className="bg-white dark:bg-zinc-800 p-5 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
                  >
                    {/* Path details */}
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        {/* Render the path icon component */}
                        <span className="flex-shrink-0">{path.icon}</span>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                          {path.name}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                        {path.description}
                      </p>
                    </div>
                    {/* Metadata and Progress */}
                    <div className="text-xs text-gray-500 dark:text-gray-500 mb-3">
                      Created {formatDate(path.createdAt)}
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
                      <div
                        className="bg-indigo-600 h-2.5 rounded-full transition-width duration-500"
                        style={{ width: `${path.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-3">
                      {path.progress}% Complete
                    </div>
                    {/* Action Button */}
                    <button
                      onClick={() => setActivePathId(path.id)} // Set this path as active
                      className="w-full bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/40 text-indigo-700 dark:text-indigo-300 py-2 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors text-sm"
                    >
                      Continue Learning <ChevronRight size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Custom Paths Section - Render only if custom paths exist and match filter [2, 4] */}
            {paths.filter((path) => filteredPaths.includes(path)).length >
              0 && (
              <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
                  My Custom Paths
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Map through the 'paths' state from usePaths, applying filter [4] */}
                  {paths
                    .filter((path) => filteredPaths.includes(path))
                    .map((path) => (
                      <div
                        key={path.id}
                        className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
                      >
                        {/* Path details */}
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2 flex-grow mr-2">
                              {/* Render the custom path icon */}
                              <span className="flex-shrink-0">{path.icon}</span>
                              <h3
                                className="text-md font-semibold text-gray-800 dark:text-white truncate"
                                title={path.name}
                              >
                                {path.name}
                              </h3>
                            </div>
                            {/* Delete button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removePath(path.id);
                              }} // Call removePath from usePaths [4]
                              className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-700 flex-shrink-0"
                              title="Delete Path"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          {/* Use path description, fallback if missing [2] */}
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                            {path.description ||
                              `Custom path created on ${formatDate(path.createdAt)}`}
                          </p>
                        </div>
                        {/* Metadata */}
                        <div className="text-xs text-gray-500 dark:text-gray-500 mb-3">
                          Created {formatDate(path.createdAt)}
                        </div>
                        {/* Action Button */}
                        <button
                          onClick={() => setActivePathId(path.id)} // Set this path as active
                          className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-gray-800 dark:text-gray-200 py-2 px-3 rounded-lg flex items-center justify-center gap-1 text-sm font-medium transition-colors"
                        >
                          View Path <ChevronRight size={14} />
                        </button>
                      </div>
                    ))}
                </div>
              </section>
            )}
            {/* Message if search yields no results [2] */}
            {filteredPaths.length === 0 && searchTerm && (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                No paths found matching &quot;{searchTerm}&quot;.
              </div>
            )}
            {/* Message if no custom paths exist yet */}
            {paths.length === 0 && !searchTerm && (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                You haven&apos;t created any custom paths yet. Use &quot;Create
                With AI&quot; to get started!
              </div>
            )}
          </div>
        ) : (
          // --- Active Path View (when a path is selected) --- [2, 6]
          <div>
            {/* Back button and Path Title */}
            <div className="flex items-center mb-6">
              <button
                onClick={() => setActivePathId(null)} // Go back to the list view
                className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200 flex items-center gap-1 font-medium mr-4 p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-700"
                aria-label="Back to My Paths"
              >
                <ArrowLeft size={18} /> Back
              </button>
              {/* Display the active path's name */}
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white truncate">
                {allPaths.find((p) => p.id === activePathId)?.name ||
                  "Learning Path"}
              </h2>
            </div>
            {/* Render the Path component [6] */}
            <Path
              // Find the active path data and pass the filtered notesData [1, 6]
              notesData={getNotesDataForPath(
                allPaths.find((p) => p.id === activePathId)
              )}
              pathId={activePathId} // Pass the ID for context within Path component
            />
          </div>
        )}

        {/* Chatbot Modal Overlay */}
        {showChatbot && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            {/* Modal Structure [2] */}
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-lg max-h-[85vh] flex flex-col border border-gray-200 dark:border-gray-700">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center flex-shrink-0">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Create Custom Learning Path
                </h3>
                {/* Close button uses reset function */}
                <button
                  onClick={resetAndCloseChat}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-700"
                  aria-label="Close chat"
                >
                  <X size={20} />
                </button>
              </div>
              {/* Chat Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                {/* Map through chat messages */}
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {/* Message bubble styling */}
                    <div
                      className={`max-w-[85%] px-4 py-2 rounded-xl shadow-sm ${msg.role === "user" ? "bg-indigo-600 text-white" : "bg-gray-100 dark:bg-zinc-700 text-gray-800 dark:text-white"}`}
                    >
                      {/* Basic handling for newlines in messages */}
                      {msg.content.split("\n").map((line, i) => (
                        <p key={i} className={i > 0 ? "mt-1" : ""}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
                {/* Loading Indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-zinc-700 text-gray-800 dark:text-white shadow-sm">
                      <div className="flex space-x-1.5 items-center h-[1.5em]">
                        {" "}
                        {/* Animated dots */}
                        <span className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"></span>
                        <span
                          style={{ animationDelay: "0.1s" }}
                          className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"
                        ></span>
                        <span
                          style={{ animationDelay: "0.2s" }}
                          className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"
                        ></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* Chat Input Area */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                {/* Show input field or "Done" button based on chat completion state */}
                {!isChatComplete ? (
                  <div className="flex gap-2">
                    {/* Input field */}
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)} // Update input state
                      placeholder="Type your response..."
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-zinc-800 dark:text-white disabled:opacity-70"
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSubmitChat()
                      } // Send on Enter key
                      disabled={isLoading} // Disable while loading
                      aria-label="Chat input"
                    />
                    {/* Send button */}
                    <button
                      onClick={handleSubmitChat} // Trigger send action
                      disabled={isLoading || !inputMessage.trim()} // Disable if loading or input is empty
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                      aria-label="Send message"
                    >
                      Send
                    </button>
                  </div>
                ) : (
                  // "Done" button shown after successful path creation
                  <button
                    onClick={resetAndCloseChat} // Close modal on click
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg transition-colors font-medium"
                    aria-label="Close chat after completion"
                  >
                    Done - Close Chat
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </ProgressProvider> // [2] End ProgressProvider
  );
}
