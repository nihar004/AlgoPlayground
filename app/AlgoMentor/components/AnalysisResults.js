import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function AnalysisResults({ results, onVisualize }) {
  const { isDarkMode } = useTheme();
  const { isCorrect, userCode, correctedCode, explanation } = results;
  const [showHighlight, setShowHighlight] = useState(true);

  const renderCodeWithDiff = (originalCode, correctedCode) => {
    const originalLines = originalCode.split("\n");
    const correctedLines = correctedCode.split("\n");
    const diff = [];

    for (
      let i = 0;
      i < Math.max(originalLines.length, correctedLines.length);
      i++
    ) {
      if (originalLines[i] !== correctedLines[i]) {
        if (i < originalLines.length) {
          diff.push(
            <div
              key={`removed-${i}`}
              className={`${
                isDarkMode
                  ? "bg-red-900/20 text-red-300"
                  : "bg-red-100 text-red-600"
              } px-2 border-l-2 border-red-500`}
            >
              - {originalLines[i]}
            </div>
          );
        }
        if (i < correctedLines.length) {
          diff.push(
            <div
              key={`added-${i}`}
              className={`${
                isDarkMode
                  ? "bg-green-900/20 text-green-300"
                  : "bg-green-100 text-green-600"
              } px-2 border-l-2 border-green-500`}
            >
              + {correctedLines[i]}
            </div>
          );
        }
      } else {
        diff.push(
          <div
            key={i}
            className={isDarkMode ? "text-gray-300" : "text-gray-800"}
          >
            {originalLines[i]}
          </div>
        );
      }
    }

    return diff;
  };

  // Visualization button component
  const VisualizeButton = ({ code, label }) => (
    <motion.button
      className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all
        ${
          isDarkMode
            ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
            : "bg-blue-100 text-blue-600 hover:bg-blue-200"
        }`}
      onClick={() => onVisualize(code)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span>{label}</span>
    </motion.button>
  );

  return (
    <motion.div
      className={`rounded-xl p-6 shadow-lg border ${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-zinc-200"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h2
          className={`text-2xl font-bold mb-4 flex items-center ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Analysis Results
          {isCorrect ? (
            <span className="ml-3 text-green-500 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Correct
            </span>
          ) : (
            <span className="ml-3 text-red-500 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Incorrect
            </span>
          )}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* User Code Section */}
        <div
          className={`rounded-lg p-4 border ${
            isDarkMode
              ? "bg-gray-900 border-gray-700"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="mb-4">
            <h3
              className={`text-lg font-medium ${
                isDarkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              Your Code
            </h3>
          </div>
          <pre
            className={`text-sm font-mono whitespace-pre-wrap p-2 mb-4 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            {userCode}
          </pre>
          <div className="mt-auto">
            <VisualizeButton code={userCode} label="▶ Visualize Your Code" />
          </div>
        </div>

        {/* Corrected Code Section */}
        {!isCorrect && (
          <div
            className={`rounded-lg p-4 border ${
              isDarkMode
                ? "bg-gray-900 border-gray-700"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3
                className={`text-lg font-medium ${
                  isDarkMode ? "text-green-400" : "text-green-600"
                }`}
              >
                Corrected Code
              </h3>
              <button
                onClick={() => setShowHighlight(!showHighlight)}
                className={`flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-colors
                  ${
                    showHighlight
                      ? isDarkMode
                        ? "bg-green-500/20 text-green-400"
                        : "bg-green-100 text-green-600"
                      : isDarkMode
                        ? "bg-gray-700 text-gray-400"
                        : "bg-gray-200 text-gray-600"
                  }`}
              >
                {showHighlight ? (
                  <>
                    <Eye className="w-3 h-3 mr-1" /> Show Changes
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3 h-3 mr-1" /> Hide Changes
                  </>
                )}
              </button>
            </div>
            <pre
              className={`text-sm font-mono whitespace-pre-wrap p-2 mb-4 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              {showHighlight
                ? renderCodeWithDiff(userCode, correctedCode)
                : correctedCode}
            </pre>
            <div className="mt-auto">
              <VisualizeButton
                code={correctedCode}
                label="▶ Visualize Corrected Code"
              />
            </div>
          </div>
        )}
      </div>

      {/* Explanation Section */}
      <div
        className={`rounded-lg p-4 border mb-6 ${
          isDarkMode
            ? "bg-gray-900 border-gray-700"
            : "bg-gray-50 border-gray-200"
        }`}
      >
        <h3
          className={`text-lg font-medium mb-2 ${
            isDarkMode ? "text-purple-400" : "text-purple-600"
          }`}
        >
          Explanation
        </h3>
        <p
          className={`${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          } text-sm leading-relaxed`}
        >
          {explanation || "No explanation available"}
        </p>
      </div>
    </motion.div>
  );
}
