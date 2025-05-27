import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useState, useEffect } from "react";
import { Eye, EyeOff, RefreshCw } from "lucide-react";

const formatCodeWithGroq = async (code) => {
  try {
    const response = await fetch("/api/format-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to format code");
    }

    const data = await response.json();
    return data.formattedCode;
  } catch (error) {
    console.error("Error formatting code:", error);
    return code; // Return original code on error
  }
};

export default function AnalysisResults({ results, onVisualize }) {
  const { isDarkMode } = useTheme();
  const { isCorrect, userCode, correctedCode, explanation } = results;
  const [showHighlight, setShowHighlight] = useState(true);
  const [formattedUserCode, setFormattedUserCode] = useState(userCode);
  const [formattedCorrectedCode, setFormattedCorrectedCode] =
    useState(correctedCode);
  const [isFormatting, setIsFormatting] = useState(false);

  useEffect(() => {
    // Update state when props change
    setFormattedUserCode(userCode);
    setFormattedCorrectedCode(correctedCode);
  }, [userCode, correctedCode]);

  const formatCode = async () => {
    setIsFormatting(true);
    try {
      // Format both user code and corrected code if it exists
      const formattedUser = await formatCodeWithGroq(userCode);
      setFormattedUserCode(formattedUser);

      if (!isCorrect && correctedCode) {
        const formattedCorrected = await formatCodeWithGroq(correctedCode);
        setFormattedCorrectedCode(formattedCorrected);
      }
    } catch (error) {
      console.error("Error during code formatting:", error);
      // You might want to add a toast or error message here
    } finally {
      setIsFormatting(false);
    }
  };

  const renderCodeWithDiff = (originalCode, correctedCode) => {
    const originalLines = originalCode.split("\n");
    const correctedLines = correctedCode.split("\n");
    const diff = [];

    for (
      let i = 0;
      i < Math.max(originalLines.length, correctedLines.length);
      i++
    ) {
      if (i >= originalLines.length) {
        // Added lines in corrected code
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
      } else if (i >= correctedLines.length) {
        // Removed lines from original
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
      } else if (originalLines[i] !== correctedLines[i]) {
        // Different lines
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
      } else {
        // Unchanged lines
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
      <div className="mb-6 flex justify-between items-center">
        <h2
          className={`text-2xl font-bold flex items-center ${
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

        <motion.button
          className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all
            ${
              isDarkMode
                ? "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
                : "bg-purple-100 text-purple-600 hover:bg-purple-200"
            }`}
          onClick={formatCode}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isFormatting}
        >
          <RefreshCw
            className={`w-4 h-4 mr-2 ${isFormatting ? "animate-spin" : ""}`}
          />
          <span>{isFormatting ? "Formatting..." : "Format Code"}</span>
        </motion.button>
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
            className={`text-sm font-mono whitespace-pre-wrap p-2 mb-4 overflow-auto max-h-[400px] ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            {formattedUserCode}
          </pre>
          <div className="mt-auto">
            <VisualizeButton
              code={formattedUserCode}
              label="▶ Visualize Your Code"
            />
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
              className={`text-sm font-mono whitespace-pre-wrap p-2 mb-4 overflow-auto max-h-[400px] ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              {showHighlight
                ? renderCodeWithDiff(formattedUserCode, formattedCorrectedCode)
                : formattedCorrectedCode}
            </pre>
            <div className="mt-auto">
              <VisualizeButton
                code={formattedCorrectedCode}
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
