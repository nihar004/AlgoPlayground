import { useTheme } from "../../context/ThemeContext";
import { Info, Copy, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialLight,
  atomDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useArray } from "./ArrayContext";
import { getAlgorithmComplexity } from "../../lib/algorithmService";

const RightPanel = ({ code, onBack }) => {
  const { isDarkMode } = useTheme();
  const [isCopied, setIsCopied] = useState(false);
  const codeContainerRef = useRef(null);
  const { algorithmStates, currentStateIndex } = useArray();
  const [metadata, setMetadata] = useState({
    timeComplexity: { best: "O(?)", average: "O(?)", worst: "O(?)" },
    spaceComplexity: "O(?)",
    explanation: "",
  });

  useEffect(() => {
    async function getComplexity() {
      if (code) {
        const complexityData = await getAlgorithmComplexity(code);
        setMetadata(complexityData);
      }
    }
    getComplexity();
  }, [code]);

  const currentState = algorithmStates?.[currentStateIndex] || {
    array: array, // Use the array from context as fallback
    indices: {
      i: null,
      j: null,
      minIndex: null,
      current: null,
      pivotIndex: null,
      compareIndices: null,
      swapIndices: null,
    },
    variables: {},
    action: "",
    finalPositions: [],
    description: "Algorithm visualization not started",
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const getAdaptiveFontClass = (text) => {
    if (!text) return "text-sm";
    const length = text.toString().length;
    if (length > 12) return "text-xs";
    if (length > 8) return "text-sm";
    return "text-md";
  };

  const ComplexityCard = ({ label, value, tooltip }) => (
    <div className="group relative">
      <div className="flex items-center justify-center bg-blue-500 px-2 py-1.5 rounded-lg text-white font-medium hover:bg-blue-600 transition-colors hover:scale-102 overflow-hidden">
        <span className="whitespace-nowrap overflow-hidden text-ellipsis">
          <span className="font-bold mr-1">{label}:</span>
          <span className={getAdaptiveFontClass(value)}>{value}</span>
        </span>
      </div>
      {tooltip && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
          {tooltip}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-4 h-full">
      <div
        className={`p-4 rounded-lg shadow-lg ${
          !isDarkMode ? "bg-white" : "bg-zinc-700"
        }`}
      >
        <h3 className="font-medium mb-2">Current Step</h3>
        <div className="flex items-center gap-2">
          <p className="text-sm">
            {currentState.description || "Visualizing algorithm..."}
          </p>
        </div>
      </div>

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
            <button
              onClick={onBack}
              className={`flex items-center gap-1 px-2 py-1.5 rounded-md bg-blue-500 hover:bg-blue-600/90 text-sm text-white hover:scale-103 `}
            >
              Back To Code
            </button>
          </div>
        </div>
        <div className="overflow-auto max-h-[350px] rounded-lg">
          <SyntaxHighlighter
            language="javascript"
            style={isDarkMode ? atomDark : materialLight}
            showLineNumbers
            wrapLines
            customStyle={{
              fontSize: `14px`,
              margin: 0,
            }}
          >
            {code || "// No code available"}
          </SyntaxHighlighter>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full">
        <ComplexityCard
          label="Best"
          value={metadata.timeComplexity.best}
          tooltip="Best case time complexity"
        />
        <ComplexityCard
          label="Avg"
          value={metadata.timeComplexity.average}
          tooltip="Average case time complexity"
        />
        <ComplexityCard
          label="Worst"
          value={metadata.timeComplexity.worst}
          tooltip="Worst case time complexity"
        />
        <ComplexityCard
          label="Space"
          value={metadata.spaceComplexity}
          tooltip={metadata.explanation}
        />
      </div>
    </div>
  );
};

export default RightPanel;
