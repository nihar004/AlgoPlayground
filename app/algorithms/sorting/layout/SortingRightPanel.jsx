import { useTheme } from "../../../context/ThemeContext";
import { Info, Copy, Check } from "lucide-react";
import { useSorting } from "../SortingContext";
import { useState, useRef, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialLight,
  atomDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { languages } from "../../registry/lang.js";
import { useAppContext } from "@/app/context/AppContext";

const SortingRightPanel = () => {
  const { isDarkMode } = useTheme();
  const { states, currentStateIndex } = useSorting();
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [isCopied, setIsCopied] = useState(false);
  const codeContainerRef = useRef(null);
  const { currentAlgorithm } = useAppContext();
  const [metadata, setMetadata] = useState({
    timeComplexity: { best: "N/A", average: "N/A", worst: "N/A" },
    spaceComplexity: "N/A",
  });

  const [codeData, setCodeData] = useState({ code: "// Loading Code..." });
  const [highlightedLines, setHighlightedLines] = useState({
    lineHighlighting: {},
  });

  // Load algorithm-Specific data when algorithm changes
  useEffect(() => {
    if (!currentAlgorithm) return;

    // Load metadata
    import(`../${currentAlgorithm}Sort/metadata.js`)
      .then((module) => {
        setMetadata(
          module.metadata || {
            timeComplexity: { best: "N/A", average: "N/A", worst: "N/A" },
            spaceComplexity: "N/A",
          }
        );
      })
      .catch((err) => {
        console.log(`Failed to load metadata for ${currentAlgorithm}:`, err);
        setMetadata({
          timeComplexity: { best: "N/A", average: "N/A", worst: "N/A" },
          spaceComplexity: "N/A",
        });
      });

    // Load language and highlighting data
    updateCodeDataForCurrentAlgorithm();
  }, [currentAlgorithm]);

  // Update code data when language changes
  useEffect(() => {
    if (currentAlgorithm) {
      updateCodeDataForCurrentAlgorithm();
    }
  }, [selectedLanguage]);

  const updateCodeDataForCurrentAlgorithm = () => {
    import(`../${currentAlgorithm}Sort/languageAndHighlight.js`)
      .then((module) => {
        const langData = module.languageAndHighlight || {};

        if (langData[selectedLanguage]) {
          setCodeData(langData[selectedLanguage]);
        } else {
          setCodeData({
            code: `// Code not available for ${selectedLanguage}`,
          });
        }

        // Update highlighted lines after setting code data
        updateHighlightedLines(langData);
      })
      .catch((err) => {
        console.error(`Failed to load code for ${currentAlgorithm}:`, err);
        setCodeData({ code: `// Failed to load code for ${currentAlgorithm}` });
        setHighlightedLines([]);
      });
  };

  // Helper function to update highlighted lines based on current step
  const updateHighlightedLines = (langData = null) => {
    if (langData) {
      // If languageData is provided, use it directly
      if (langData[selectedLanguage]?.lineHighlighting) {
        setHighlightedLines(langData[selectedLanguage]);
      } else {
        setHighlightedLines({
          lineHighlighting: {},
        });
      }
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(codeData.code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500); // Reset after 1.5 seconds
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  // Function to adapt font size based on text length
  const getAdaptiveFontClass = (text) => {
    if (!text) return "text-sm";

    const length = text.toString().length;
    if (length > 12) return "text-xs";
    if (length > 8) return "text-sm";
    return "text-md";
  };

  const currentStep = states[currentStateIndex] || {};
  const currHighlightedLines =
    highlightedLines?.lineHighlighting?.[currentStep.action] || [];

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
        className={`p-4 rounded-lg shadow-lg overflow-hidden ${
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
        <div className="overflow-auto max-h-[350px] rounded-lg">
          <SyntaxHighlighter
            language={selectedLanguage}
            style={isDarkMode ? atomDark : materialLight}
            showLineNumbers
            wrapLines
            customStyle={{
              fontSize: `14px`,
              margin: 0,
            }}
            lineProps={(lineNumber) =>
              currHighlightedLines.includes(lineNumber)
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

      {/* Complexity Analysis - Responsive Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full">
        <div className="flex items-center justify-center bg-blue-500 px-2 py-1.5 rounded-lg text-white font-medium hover:bg-blue-600 transition-colors hover:scale-102 overflow-hidden">
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="font-bold mr-1">Best:</span>
            <span
              className={getAdaptiveFontClass(metadata.timeComplexity.best)}
            >
              {metadata.timeComplexity.best}
            </span>
          </span>
        </div>
        <div className="flex items-center justify-center bg-blue-500 px-2 py-1.5 rounded-lg text-white font-medium hover:bg-blue-600 transition-colors hover:scale-102 overflow-hidden">
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="font-bold mr-1">Avg:</span>
            <span
              className={getAdaptiveFontClass(metadata.timeComplexity.average)}
            >
              {metadata.timeComplexity.average}
            </span>
          </span>
        </div>
        <div className="flex items-center justify-center bg-blue-500 px-2 py-1.5 rounded-lg text-white font-medium hover:bg-blue-600 transition-colors hover:scale-102 overflow-hidden">
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="font-bold mr-1">Worst:</span>
            <span
              className={getAdaptiveFontClass(metadata.timeComplexity.worst)}
            >
              {metadata.timeComplexity.worst}
            </span>
          </span>
        </div>
        <div className="flex items-center justify-center bg-blue-500 px-2 py-1.5 rounded-lg text-white font-medium hover:bg-blue-600 transition-colors hover:scale-102 overflow-hidden">
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="font-bold mr-1">Space:</span>
            <span className={getAdaptiveFontClass(metadata.spaceComplexity)}>
              {metadata.spaceComplexity}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SortingRightPanel;
