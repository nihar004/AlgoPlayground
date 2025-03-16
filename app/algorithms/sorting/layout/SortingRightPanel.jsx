import { useTheme } from "../../../context/ThemeContext";
import { Info, Copy, Check } from "lucide-react";
import { useSorting } from "../context/SortingContext";
import { languageAndHighlight } from "../bubbleSort/languageAndHighlight.js";
import { useState, useRef, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialLight,
  atomDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { metadata } from "../bubbleSort/metadata";
import { languages } from "../../registry/lang.js";

const SortingRightPanel = () => {
  const { isDarkMode } = useTheme();
  const { sortingStates, currentStateIndex } = useSorting();
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [fontSize, setFontSize] = useState(14); // Start with default font size
  const [isCopied, setIsCopied] = useState(false);
  const codeContainerRef = useRef(null);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(codeData.code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500); // Reset after 1.5 seconds
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const currentStep = sortingStates[currentStateIndex] || {};
  const highlightedLines =
    languageAndHighlight[selectedLanguage]?.lineHighlighting[
      currentStep.action
    ] || [];

  const codeData = languageAndHighlight[selectedLanguage] || {
    code: "// Code not found",
  };

  // Function to check for horizontal scroll and adjust font size
  const adjustFontSize = () => {
    const container = codeContainerRef.current;
    if (!container) return;

    const codeBlock = container.querySelector("pre");
    if (!codeBlock) return;

    // Reset font size to check natural width
    codeBlock.style.fontSize = "14px";

    // If code block is wider than container, gradually reduce font size
    while (
      codeBlock.scrollWidth > container.clientWidth &&
      parseInt(codeBlock.style.fontSize) > 8
    ) {
      const currentSize = parseInt(codeBlock.style.fontSize);
      codeBlock.style.fontSize = `${currentSize - 0.5}px`;
    }

    // Update state with the final font size
    setFontSize(parseInt(codeBlock.style.fontSize));
  };

  // Adjust font size on mount and when code or container width changes
  useEffect(() => {
    adjustFontSize();
    const resizeObserver = new ResizeObserver(adjustFontSize);
    if (codeContainerRef.current) {
      resizeObserver.observe(codeContainerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, [selectedLanguage, codeData.code]);

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Current Step */}
      <div
        className={`p-4 rounded-lg shadow-lg ${
          !isDarkMode ? "bg-white" : "bg-zinc-700"
        }`}
      >
        <h3 className="font-medium mb-2">Current Step</h3>
        <div className="flex items-center gap-2">
          {/* Message */}
          <p className="text-sm">
            {currentStep.description || "Sorting in progress..."}
          </p>

          {/* Indicator Box */}
          <div
            className={`min-w-[20px] min-h-[20px] rounded-sm flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              currentStep.action === "compare"
                ? "bg-yellow-400"
                : currentStep.action === "swap"
                ? "bg-red-600"
                : currentStep.action === "increment-j"
                ? "bg-blue-200"
                : currentStep.action === "bar-complete"
                ? "bg-green-500"
                : "bg-transparent"
            }`}
          />
        </div>
      </div>

      {/* Code Section */}
      <div
        ref={codeContainerRef}
        className={`p-4 rounded-lg shadow-lg overflow-hidden  ${
          !isDarkMode ? "bg-white" : "bg-zinc-700"
        }`}
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">Implementation</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCode}
              className={`p-1.5 rounded-md hover:scale-103 shadow-sm ${
                !isDarkMode
                  ? "bg-zinc-50 hover:bg-zinc-200"
                  : "bg-zinc-600 hover:bg-zinc-500"
              }`}
              title="Copy Code"
            >
              {isCopied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className={`text-sm px-2 py-1 rounded border outline-none ${
                !isDarkMode
                  ? "border-zinc-200 bg-white"
                  : "border-zinc-700 bg-zinc-600"
              }`}
            >
              {languages.sorting.map((curr) => (
                <option value={curr.id} key={curr.id}>
                  {curr.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg">
          <SyntaxHighlighter
            language={selectedLanguage}
            style={isDarkMode ? atomDark : materialLight}
            showLineNumbers
            wrapLines
            customStyle={{
              fontSize: `${fontSize}px`,
              margin: 0,
            }}
            lineProps={(lineNumber) =>
              highlightedLines.includes(lineNumber)
                ? {
                    style: {
                      backgroundColor: isDarkMode ? "#52525B" : "#E4E4E7",
                    },
                  }
                : {}
            }
          >
            {codeData.code}
          </SyntaxHighlighter>
        </div>
      </div>

      {/* Complexity Analysis */}
      <div className="grid grid-cols-4 gap-2 w-full">
        <div className="flex items-center justify-center bg-blue-500 px-3 py-1.5 rounded-lg text-md text-white font-medium hover:bg-blue-600 transition-colors hover:scale-102">
          Best: {metadata.timeComplexity.best}
        </div>
        <div className="flex items-center justify-center bg-blue-500 px-3 py-1.5 rounded-lg text-md text-white font-medium hover:bg-blue-600 transition-colors hover:scale-102">
          Avg: {metadata.timeComplexity.average}
        </div>
        <div className="flex items-center justify-center bg-blue-500 px-3 py-1.5 rounded-lg text-md text-white font-medium hover:bg-blue-600 transition-colors hover:scale-102">
          Worst: {metadata.timeComplexity.worst}
        </div>
        <div className="flex items-center justify-center bg-blue-500 px-3 py-1.5 rounded-lg text-md text-white font-medium hover:bg-blue-600 transition-colors hover:scale-102">
          Space: {metadata.spaceComplexity}
        </div>
      </div>
    </div>
  );
};

export default SortingRightPanel;
