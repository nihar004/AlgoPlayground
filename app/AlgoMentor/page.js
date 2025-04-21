"use client";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import CodeEditor from "./components/CodeEditor";
import AnalysisResults from "./components/AnalysisResults";
import Visualization from "./components/Visualization";
import Header from "../category/Header";
import Footer from "../category/Footer";
import { ArrowRight, Sparkle, Zap } from "lucide-react";
import { NextResponse } from "next/server";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_API_KEY = "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";
const MODEL = "llama-3.3-70b-versatile";

// Add this utility function at the top of the file
const sanitizeJSONString = (str) => {
  return str
    .replace(/\\n/g, "\\n")
    .replace(/\\'/g, "\\'")
    .replace(/\\"/g, '\\"')
    .replace(/\\&/g, "\\&")
    .replace(/\\r/g, "\\r")
    .replace(/\\t/g, "\\t")
    .replace(/\\b/g, "\\b")
    .replace(/\\f/g, "\\f")
    .replace(/[\u0000-\u0019]+/g, "") // Remove control characters
    .replace(/```json\n?|\n?```/g, "") // Remove markdown
    .trim();
};

export default function Home() {
  const { isDarkMode } = useTheme();
  const [problemStatement, setProblemStatement] = useState("");
  const [code, setCode] = useState(
    "// Enter your algorithm code here\n\nfunction bubbleSort(arr) {\n  let len = arr.length;\n  for (let i = 0; i < len; i++) {\n    for (let j = 0; j < len - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        // Swap elements\n        let temp = arr[j];\n        arr[j] = arr[j + 1];\n        arr[j + 1] = temp;\n      }\n    }\n  }\n  return arr;\n}"
  );

  const [analysisResults, setAnalysisResults] = useState(null);
  const [showVisualization, setShowVisualization] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState({
    id: "javascript",
    name: "JavaScript",
  });
  const [visualizationCode, setVisualizationCode] = useState("");

  // Sample problem statements for dropdown
  const sampleProblems = [
    {
      id: "bubble-sort",
      name: "Bubble Sort",
      description:
        "Implement the Bubble Sort algorithm to sort an array of integers in ascending order.",
      template:
        "// Implement Bubble Sort\n\nfunction bubbleSort(arr) {\n  // Your code here\n}",
    },
    {
      id: "binary-search",
      name: "Binary Search",
      description:
        "Implement the Binary Search algorithm to find a target value in a sorted array.",
      template:
        "// Implement Binary Search\n\nfunction binarySearch(arr, target) {\n  // Your code here\n}",
    },
    {
      id: "merge-sort",
      name: "Merge Sort",
      description:
        "Implement the Merge Sort algorithm to sort an array of integers in ascending order.",
      template:
        "// Implement Merge Sort\n\nfunction mergeSort(arr) {\n  // Your code here\n}",
    },
  ];

  const LANGUAGES = [
    { id: "javascript", name: "JavaScript" },
    { id: "python", name: "Python" },
    { id: "java", name: "Java" },
  ];

  const detectCodeLanguage = async (code) => {
    try {
      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            {
              role: "system",
              content: `You are a code language detector. Respond with a simple JSON object: 
                {
                  &quot;language&quot;: &quot;[language]&quot;
                }
                Only valid values for language are: javascript, python, java, cpp.
                Base detection on syntax patterns and language-specific keywords.`,
            },
            {
              role: "user",
              content: `Detect the programming language of this code:\n\n${code}`,
            },
          ],
          temperature: 0.3,
          max_tokens: 50,
        }),
      });

      const data = await response.json();
      const content = data.choices[0].message.content;

      // Clean the response content to ensure valid JSON
      const cleanedContent = content.replace(/```json\n|\n```|```/g, "").trim();

      try {
        const result = JSON.parse(cleanedContent);
        return result.language;
      } catch (parseError) {
        // Fallback regex parsing if JSON parse fails
        const languageMatch = content.match(/"language"\s*:\s*"(\w+)"/);
        return languageMatch ? languageMatch[1] : null;
      }
    } catch (error) {
      console.error("Language detection error:", error);
      return null;
    }
  };

  const handleSelectProblem = (problemId) => {
    const problem = sampleProblems.find((p) => p.id === problemId);
    if (problem) {
      setProblemStatement(problem.description);
      setCode(problem.template);
    }
  };

  const handleAnalyzeCode = async () => {
    setIsAnalyzing(true);
    setShowTutorial(false);

    try {
      // First detect the language
      const detectionResponse = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            {
              role: "system",
              content: `You are a code language detector. Respond with a simple JSON object:
                {
                  &quot;language&quot;: &quot;[language]&quot;
                }
                Only valid values for language are: javascript, python, java, cpp.
                Base detection on syntax patterns and language-specific keywords.`,
            },
            {
              role: "user",
              content: `${code}`,
            },
          ],
          temperature: 0.3,
          max_tokens: 10,
        }),
      });

      const detectionData = await detectionResponse.json();
      const detectedLang = detectionData.choices[0].message.content
        .trim()
        .toLowerCase();

      // Now analyze the code with the detected language
      const analysisResponse = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            {
              role: "system",
              content: `You are a friendly code tutor helping beginners understand algorithms. 
                Provide analysis in valid JSON format without any markdown formatting.
                Focus on:
                1. Is the code correct? (true/false)
                2. If incorrect, what needs to be fixed?
                3. Provide a beginner-friendly explanation:
                  - Use simple language
                  - Break down complex concepts
                  - Explain why certain changes are needed
                  - Include examples if helpful
                
                Response format (strictly follow this structure):
                {
                  &quot;isCorrect&quot;: boolean,
                  &quot;explanation&quot;: &quot;beginner-friendly explanation&quot;,
                  &quot;correctedCode&quot;: &quot;code if needed&quot;,
                  &quot;complexity&quot;: {
                    &quot;time&quot;: &quot;Big O notation&quot;,
                    &quot;space&quot;: &quot;Big O notation&quot;
                  }
                }`,
            },
            {
              role: "user",
              content: `Problem: ${problemStatement}\n\nCode:\n${code}`,
            },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      const analysisData = await analysisResponse.json();
      const content = analysisData.choices[0].message.content;

      let analysisResult;
      try {
        // First attempt: Direct parse after sanitization
        const sanitizedContent = sanitizeJSONString(content);
        analysisResult = JSON.parse(sanitizedContent);
      } catch (parseError) {
        console.warn("First parse attempt failed:", parseError);
        try {
          // Second attempt: Extract JSON using regex
          const jsonMatch = content.match(/{[\s\S]*}/);
          if (jsonMatch) {
            const extractedJson = sanitizeJSONString(jsonMatch[0]);
            analysisResult = JSON.parse(extractedJson);
          } else {
            throw new Error("Could not extract valid JSON from response");
          }
        } catch (extractError) {
          console.error("JSON extraction failed:", extractError);
          throw new Error("Failed to parse analysis result");
        }
      }

      // Validate required fields
      if (!analysisResult || typeof analysisResult.isCorrect !== "boolean") {
        throw new Error("Invalid analysis result format");
      }

      setAnalysisResults({
        isCorrect: analysisResult.isCorrect,
        userCode: code,
        correctedCode: analysisResult.correctedCode || code,
        explanation: analysisResult.explanation || "No explanation provided",
        complexity: analysisResult.complexity || {
          time: "O(n)",
          space: "O(1)",
        },
        language: detectedLang,
      });
    } catch (error) {
      console.error("Analysis error:", error);
      // Add user feedback
      alert(
        "Failed to analyze code. Please try again. Error: " + error.message
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleVisualize = (code) => {
    setShowVisualization(true);
    setVisualizationCode(code);
  };

  const handleBackToCode = () => {
    setShowVisualization(false);
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
          : "bg-gradient-to-br from-white via-zinc-50 to-blue-50 text-zinc-800"
      }`}
    >
      <Header title="AlgoMentor" />

      <main className="flex-grow">
        {!showVisualization ? (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Hero Section with animated gradient */}
              <section className={`relative overflow-hidden py-12 px-6 mb-8`}>
                {/* Background with animated gradient */}
                <div
                  className={`absolute inset-0 z-0 ${
                    isDarkMode
                      ? "bg-gradient-to-br from-gray-900 to-gray-800"
                      : "bg-gradient-to-br from-blue-100 via-indigo-50 to-white"
                  }`}
                ></div>

                {/* Decorative circles/blobs */}
                <div
                  className={`absolute top-10 left-10 w-64 h-64 rounded-full ${
                    isDarkMode ? "bg-gray-800" : "bg-blue-200/30"
                  } blur-3xl`}
                ></div>
                <div
                  className={`absolute bottom-10 right-10 w-80 h-80 rounded-full ${
                    isDarkMode ? "bg-gray-700" : "bg-indigo-200/30"
                  } blur-3xl`}
                ></div>

                <div className="relative z-10">
                  <motion.h1
                    className={`text-4xl md:text-5xl font-bold mb-4 tracking-tight ${
                      isDarkMode
                        ? "bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent"
                        : "bg-gradient-to-r from-blue-800 via-blue-600 to-indigo-800 bg-clip-text text-transparent"
                    }`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    Algorithm Analysis & Visualization
                  </motion.h1>
                  <motion.p
                    className={`text-lg max-w-3xl leading-relaxed mb-8 ${
                      isDarkMode ? "text-zinc-300" : "text-zinc-600"
                    }`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Optimize your algorithms with real-time analysis,
                    visualization, and comprehensive feedback. Each algorithm
                    comes with detailed explanations, step-by-step
                    visualization, and performance metrics.
                  </motion.p>

                  <div className="flex flex-wrap gap-4">
                    <button
                      className="group relative px-6 py-3 rounded-lg font-medium text-sm text-white overflow-hidden"
                      onClick={handleAnalyzeCode}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:from-blue-500 group-hover:to-indigo-500 transition-all duration-300"></div>
                      <span className="relative flex items-center gap-2">
                        Start Analyzing
                        <ArrowRight width="17" height="17" />
                      </span>
                    </button>
                    <button
                      className={`relative px-6 py-3 rounded-lg font-medium text-sm overflow-hidden ${
                        isDarkMode ? "text-white" : "text-zinc-800"
                      }`}
                    >
                      <div
                        className={`absolute inset-0 ${
                          isDarkMode
                            ? "bg-slate-700 hover:bg-slate-600"
                            : "bg-white hover:bg-zinc-50"
                        } border ${
                          isDarkMode ? "border-zinc-700" : "border-zinc-200"
                        } transition-all duration-300`}
                      ></div>
                      <span className="relative">View Documentation</span>
                    </button>
                  </div>
                </div>
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 px-4">
                <div
                  className={`rounded-xl p-6 shadow-xl lg:col-span-1 ${
                    isDarkMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white/80 backdrop-blur-sm border border-zinc-200"
                  }`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2
                      className={`text-xl font-semibold ${
                        isDarkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      Problem Statement
                    </h2>
                    <div className="relative">
                      <select
                        className={`text-sm rounded-md px-3 py-2 border focus:border-transparent appearance-none cursor-pointer pr-8 ${
                          isDarkMode
                            ? "bg-slate-700 text-white border-slate-800 outline-none"
                            : "bg-white text-zinc-800 border-zinc-300 outline-zinc-300"
                        }`}
                        onChange={(e) => handleSelectProblem(e.target.value)}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select a problem...
                        </option>
                        {sampleProblems.map((problem) => (
                          <option key={problem.id} value={problem.id}>
                            {problem.name}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`relative rounded-lg border overflow-hidden mb-4 ${
                      isDarkMode
                        ? "bg-gray-900 border-gray-700"
                        : "bg-zinc-50 border-zinc-200"
                    }`}
                  >
                    <div
                      className={`absolute top-0 right-0 px-3 py-1 text-xs font-medium rounded-bl-lg ${
                        isDarkMode
                          ? "bg-gray-800 text-zinc-400"
                          : "bg-zinc-200 text-zinc-600"
                      }`}
                    >
                      Problem
                    </div>
                    <textarea
                      className={`w-full h-40 p-4 pt-8 outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent resize-none ${
                        isDarkMode
                          ? "bg-transparent text-white placeholder-gray-400"
                          : "bg-transparent text-zinc-800 placeholder-zinc-400"
                      }`}
                      placeholder="Enter the problem statement here..."
                      value={problemStatement}
                      onChange={(e) => setProblemStatement(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="space-y-4">
                    <div
                      className={`border rounded-lg p-4 ${
                        isDarkMode
                          ? "bg-blue-600/20 border-blue-800/30"
                          : "bg-blue-50 border-blue-200"
                      }`}
                    >
                      <h3
                        className={`text-sm font-medium flex items-center mb-2 ${
                          isDarkMode ? "text-blue-400" : "text-blue-600"
                        }`}
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        Algorithm Tips
                      </h3>
                      <p
                        className={`text-xs ${
                          isDarkMode ? "text-zinc-300" : "text-zinc-600"
                        }`}
                      >
                        For optimal results, ensure your code is well-structured
                        and includes the function declaration as shown in the
                        template. The analysis engine will evaluate correctness,
                        efficiency, and best practices.
                      </p>
                    </div>

                    <div
                      className={`rounded-lg p-4 border ${
                        isDarkMode
                          ? "bg-gray-900/50 border-zinc-700/50"
                          : "bg-zinc-50 border-zinc-200"
                      }`}
                    >
                      <h3
                        className={`text-sm font-medium mb-2 ${
                          isDarkMode ? "text-zinc-400" : "text-zinc-600"
                        }`}
                      >
                        Algorithm Analysis Features
                      </h3>
                      <ul
                        className={`text-xs space-y-2 ${
                          isDarkMode ? "text-zinc-400" : "text-zinc-600"
                        }`}
                      >
                        <li className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                          Correctness validation
                        </li>
                        <li className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                          Time & space complexity analysis
                        </li>
                        <li className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                          Optimization suggestions
                        </li>
                        <li className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                          Interactive visualization
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div
                  className={`rounded-xl p-6 shadow-xl lg:col-span-2 ${
                    isDarkMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white/80 backdrop-blur-sm border border-zinc-200"
                  }`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2
                      className={`text-xl font-semibold ${
                        isDarkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      Code Editor
                    </h2>
                    <div className="flex space-x-2">
                      <button
                        className={`text-sm px-3 py-1 rounded-md transition duration-200 border ${
                          isDarkMode
                            ? "bg-zinc-900 hover:bg-zinc-700 text-zinc-300 border-zinc-700"
                            : "bg-zinc-50 hover:bg-zinc-200 text-zinc-700 border-zinc-300"
                        }`}
                        onClick={() => setCode("")}
                      >
                        Clear
                      </button>
                      <button
                        className={`text-sm px-3 py-1 rounded-md transition duration-200 border ${
                          isDarkMode
                            ? "bg-zinc-900 hover:bg-zinc-700 text-zinc-300 border-zinc-700"
                            : "bg-zinc-50 hover:bg-zinc-200 text-zinc-700 border-zinc-300"
                        }`}
                        onClick={() => navigator.clipboard.writeText(code)}
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  <CodeEditor code={code} setCode={setCode} />

                  {showTutorial && (
                    <div
                      className={`mt-4 rounded-lg p-4 relative border ${
                        isDarkMode
                          ? "bg-indigo-900/40 border-indigo-700/30"
                          : "bg-indigo-50 border-indigo-200"
                      }`}
                    >
                      <button
                        className={`absolute top-2 right-2 ${
                          isDarkMode
                            ? "text-zinc-400 hover:text-white"
                            : "text-zinc-500 hover:text-zinc-800"
                        }`}
                        onClick={() => setShowTutorial(false)}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </button>
                      <h3
                        className={`text-sm font-medium mb-2 ${
                          isDarkMode ? "text-indigo-400" : "text-indigo-600"
                        }`}
                      >
                        Getting Started
                      </h3>
                      <p
                        className={`text-xs ${
                          isDarkMode ? "text-zinc-300" : "text-zinc-600"
                        }`}
                      >
                        1. Select a problem from the dropdown or write your own
                        <br />
                        2. Implement your algorithm in the editor
                        <br />
                        3. Click "Analyze Code" to get detailed feedback
                        <br />
                        4. View step-by-step visualization to understand the
                        execution
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-center mb-6">
                <motion.button
                  className="px-8 py-3 text-lg font-semibold rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg transition-all duration-300 flex items-center text-white"
                  onClick={handleAnalyzeCode}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Analyzing Code...
                    </>
                  ) : (
                    <>
                      <span>Analyze Code</span>
                      <Sparkle className="ml-2 h-5 w-5" />
                    </>
                  )}
                </motion.button>
              </div>

              {analysisResults && (
                <div className="px-4 mb-8">
                  <AnalysisResults
                    results={analysisResults}
                    onVisualize={handleVisualize}
                    isDarkMode={isDarkMode}
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Visualization
                code={visualizationCode}
                onBackToCode={handleBackToCode}
                isDarkMode={isDarkMode}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      <Footer />
    </div>
  );
}
