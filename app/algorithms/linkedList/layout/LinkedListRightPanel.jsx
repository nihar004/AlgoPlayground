import { useTheme } from "../../../context/ThemeContext";
import { Copy, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialLight,
  atomDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { languages } from "../../registry/lang.js";
import { useAppContext } from "@/app/context/AppContext";
import { useLinkedList } from "../LinkedListContext";
import { algorithms } from "../../registry/algo";

const LinkedListRightPanel = () => {
  const { isDarkMode } = useTheme();
  const { states, currentStateIndex, updateOperation } = useLinkedList();
  const { layoutMode, currentAlgorithm } = useAppContext();
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [selectedCategory, setSelectedCategory] = useState("traversal");
  const [selectedOperation, setSelectedOperation] = useState("traverse");
  const [isCopied, setIsCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState("");
  const tooltipTimeout = useRef(null);
  const codeContainerRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [deletePosition, setDeletePosition] = useState("");
  const [deleteValue, setDeleteValue] = useState("");

  const [metadata, setMetadata] = useState({
    timeComplexity: { best: "N/A", average: "N/A", worst: "N/A" },
    spaceComplexity: "N/A",
  });

  const [codeData, setCodeData] = useState({ code: "// Loading Code..." });
  const [highlightedLines, setHighlightedLines] = useState({
    lineHighlighting: {},
  });

  const categoryOptions = Object.keys(algorithms.LinkedList.singly.operation);

  // Update the getOperationOptions function
  const getOperationOptions = (category) => {
    return Object.entries(algorithms.LinkedList.singly.operation[category]).map(
      ([id, op]) => ({
        id,
        name: op.name,
      })
    );
  };

  // Update the initial state to match the first operation of the first category
  useEffect(() => {
    if (categoryOptions.length > 0) {
      const firstCategory = categoryOptions[0];
      const firstOperation = getOperationOptions(firstCategory)[0];
      setSelectedCategory(firstCategory);
      setSelectedOperation(firstOperation.id);
    }
  }, []);

  // Separate useEffect for category changes
  useEffect(() => {
    if (selectedCategory) {
      const operations = getOperationOptions(selectedCategory);
      if (operations.length > 0) {
        setSelectedOperation(operations[0].id);
      }
    }
  }, [selectedCategory]);

  // Update the useEffect for code and metadata updates
  useEffect(() => {
    if (currentAlgorithm && selectedCategory && selectedOperation) {
      updateMetadataForOperation();
      updateCodeDataForOperation();
    }
  }, [currentAlgorithm, selectedCategory, selectedOperation, selectedLanguage]);

  const updateMetadataForOperation = () => {
    import(`../${currentAlgorithm}/metadata.js`)
      .then((module) => {
        const operationMetadata =
          module.metadata[selectedCategory]?.[selectedOperation];
        if (operationMetadata) {
          // Handle different metadata structures
          const metadata = {
            timeComplexity: {
              best:
                typeof operationMetadata.timeComplexity === "object" &&
                operationMetadata.timeComplexity.best
                  ? operationMetadata.timeComplexity.best
                  : {
                      value: operationMetadata.timeComplexity?.value || "N/A",
                      explanation:
                        operationMetadata.timeComplexity?.explanation || "",
                    },
              average:
                typeof operationMetadata.timeComplexity === "object" &&
                operationMetadata.timeComplexity.average
                  ? operationMetadata.timeComplexity.average
                  : { value: "N/A", explanation: "" },
              worst:
                typeof operationMetadata.timeComplexity === "object" &&
                operationMetadata.timeComplexity.worst
                  ? operationMetadata.timeComplexity.worst
                  : { value: "N/A", explanation: "" },
            },
            spaceComplexity:
              typeof operationMetadata.spaceComplexity === "object"
                ? operationMetadata.spaceComplexity
                : {
                    value: operationMetadata.spaceComplexity || "N/A",
                    explanation: "",
                  },
          };
          setMetadata(metadata);
        } else {
          setMetadata({
            timeComplexity: {
              best: { value: "N/A", explanation: "" },
              average: { value: "N/A", explanation: "" },
              worst: { value: "N/A", explanation: "" },
            },
            spaceComplexity: { value: "N/A", explanation: "" },
          });
        }
      })
      .catch(console.error);
  };

  // Update the updateCodeDataForOperation function
  const updateCodeDataForOperation = () => {
    import(`../${currentAlgorithm}/languageAndHighlight.js`)
      .then((module) => {
        const implementation = module.singlyLinkedListImplementation;
        if (
          implementation?.[selectedLanguage]?.[selectedCategory]?.[
            selectedOperation
          ]
        ) {
          const langData =
            implementation[selectedLanguage][selectedCategory][
              selectedOperation
            ];
          setCodeData({ code: langData });
        } else {
          setCodeData({ code: "// Code not available for this operation" });
        }
      })
      .catch((error) => {
        console.error("Error loading code:", error);
        setCodeData({ code: "// Error loading code" });
      });
  };

  const handleTooltipEnter = (content) => {
    tooltipTimeout.current = setTimeout(() => {
      setTooltipContent(content);
      setShowTooltip(true);
    }, 500);
  };

  const handleTooltipLeave = () => {
    if (tooltipTimeout.current) {
      clearTimeout(tooltipTimeout.current);
    }
    setTimeout(() => {
      setShowTooltip(false);
    }, 500);
  };

  const getAdaptiveFontClass = (text) => {
    if (!text) return "text-sm";
    const length = text.toString().length;
    if (length > 12) return "text-xs";
    if (length > 8) return "text-sm";
    return "text-md";
  };

  const getCodeAreaMaxHeight = () => {
    return layoutMode === "centered" ? "max-h-[450px]" : "max-h-[350px]";
  };

  const currentStep = states[currentStateIndex] || {};
  const currHighlightedLines =
    highlightedLines?.lineHighlighting?.[currentStep.action] || [];

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(codeData.code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    const operations = getOperationOptions(newCategory);
    if (operations.length > 0) {
      const firstOperation = operations[0];
      setSelectedOperation(firstOperation.id);
      updateOperation(newCategory, firstOperation.id);
    }
  };

  const handleOperationChange = (e) => {
    const newOperation = e.target.value;
    setSelectedOperation(newOperation);

    if (newOperation === "search") {
      updateOperation(selectedCategory, newOperation, searchValue || null);
    } else if (newOperation === "deleteAt") {
      updateOperation(
        selectedCategory,
        newOperation,
        null,
        deletePosition || null
      );
    } else if (newOperation === "deleteValue") {
      updateOperation(selectedCategory, newOperation, deleteValue || null);
    } else {
      updateOperation(selectedCategory, newOperation);
    }
  };

  const handleSearchValueChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (selectedOperation === "search") {
      updateOperation(selectedCategory, selectedOperation, value || null);
    }
  };

  const handleDeletePositionChange = (e) => {
    const value = e.target.value;
    setDeletePosition(value);
    if (selectedOperation === "deleteAt") {
      updateOperation(selectedCategory, selectedOperation, null, value || null);
    }
  };

  const handleDeleteValueChange = (e) => {
    const value = e.target.value;
    setDeleteValue(value);
    if (selectedOperation === "deleteValue") {
      updateOperation(selectedCategory, selectedOperation, value || null);
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Current Step - Only show if not in centered layout */}
      {layoutMode !== "centered" && (
        <div
          className={`p-4 rounded-lg shadow-lg ${
            !isDarkMode ? "bg-white" : "bg-zinc-700"
          }`}
        >
          <h3 className="font-medium mb-2">Current Step</h3>
          <div className="flex items-center gap-2">
            <p className="text-sm">
              {currentStep.description || "In progress..."}
            </p>
          </div>
        </div>
      )}

      {/* Code Section */}
      <div
        ref={codeContainerRef}
        className={`p-4 rounded-lg shadow-lg overflow-hidden ${
          !isDarkMode ? "bg-white" : "bg-zinc-700"
        }`}
      >
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className={`text-sm px-2 py-1 rounded border outline-none ${
                !isDarkMode
                  ? "border-zinc-200 bg-white"
                  : "border-zinc-700 bg-zinc-600"
              }`}
            >
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            <select
              value={selectedOperation}
              onChange={handleOperationChange}
              className={`text-sm px-2 py-1 rounded border outline-none ${
                !isDarkMode
                  ? "border-zinc-200 bg-white"
                  : "border-zinc-700 bg-zinc-600"
              }`}
            >
              {getOperationOptions(selectedCategory).map((op) => (
                <option key={op.id} value={op.id}>
                  {op.name}
                </option>
              ))}
            </select>
            {selectedOperation === "search" && (
              <input
                type="number"
                value={searchValue}
                onChange={handleSearchValueChange}
                placeholder="Enter value to search"
                className={`text-sm px-2 py-1 rounded border outline-none ${
                  !isDarkMode
                    ? "border-zinc-200 bg-white"
                    : "border-zinc-700 bg-zinc-600"
                }`}
              />
            )}
            {selectedOperation === "deleteAt" && (
              <input
                type="number"
                value={deletePosition}
                onChange={handleDeletePositionChange}
                placeholder="Enter position"
                className={`text-sm px-2 py-1 rounded border outline-none ${
                  !isDarkMode
                    ? "border-zinc-200 bg-white"
                    : "border-zinc-700 bg-zinc-600"
                }`}
              />
            )}
            {selectedOperation === "deleteValue" && (
              <input
                type="number"
                value={deleteValue}
                onChange={handleDeleteValueChange}
                placeholder="Enter value to delete"
                className={`text-sm px-2 py-1 rounded border outline-none ${
                  !isDarkMode
                    ? "border-zinc-200 bg-white"
                    : "border-zinc-700 bg-zinc-600"
                }`}
              />
            )}
          </div>
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
              {languages.linkedList.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={`overflow-auto rounded-lg ${getCodeAreaMaxHeight()}`}>
          <SyntaxHighlighter
            language={selectedLanguage}
            style={isDarkMode ? atomDark : materialLight}
            showLineNumbers
            wrapLines
            customStyle={{
              fontSize: "14px",
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

      {/* Complexity Analysis with Tooltips */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full">
        <div
          className="flex items-center justify-center bg-blue-500 px-2 py-1.5 rounded-lg text-white font-medium hover:bg-blue-600 transition-colors hover:scale-102"
          onMouseEnter={() =>
            handleTooltipEnter(metadata.timeComplexity?.best?.explanation)
          }
          onMouseLeave={handleTooltipLeave}
        >
          <span className="whitespace-nowrap">
            <span className="font-bold mr-1">Best:</span>
            <span
              className={getAdaptiveFontClass(
                metadata.timeComplexity?.best?.value
              )}
            >
              {metadata.timeComplexity?.best?.value || "N/A"}
            </span>
          </span>
        </div>
        <div
          className="flex items-center justify-center bg-blue-500 px-2 py-1.5 rounded-lg text-white font-medium hover:bg-blue-600 transition-colors hover:scale-102"
          onMouseEnter={() =>
            handleTooltipEnter(metadata.timeComplexity?.average?.explanation)
          }
          onMouseLeave={handleTooltipLeave}
        >
          <span className="whitespace-nowrap">
            <span className="font-bold mr-1">Avg:</span>
            <span
              className={getAdaptiveFontClass(
                metadata.timeComplexity?.average?.value
              )}
            >
              {metadata.timeComplexity?.average?.value || "N/A"}
            </span>
          </span>
        </div>
        <div
          className="flex items-center justify-center bg-blue-500 px-2 py-1.5 rounded-lg text-white font-medium hover:bg-blue-600 transition-colors hover:scale-102"
          onMouseEnter={() =>
            handleTooltipEnter(metadata.timeComplexity?.worst?.explanation)
          }
          onMouseLeave={handleTooltipLeave}
        >
          <span className="whitespace-nowrap">
            <span className="font-bold mr-1">Worst:</span>
            <span
              className={getAdaptiveFontClass(
                metadata.timeComplexity?.worst?.value
              )}
            >
              {metadata.timeComplexity?.worst?.value || "N/A"}
            </span>
          </span>
        </div>
        <div
          className="flex items-center justify-center bg-blue-500 px-2 py-1.5 rounded-lg text-white font-medium hover:bg-blue-600 transition-colors hover:scale-102"
          onMouseEnter={() =>
            handleTooltipEnter(metadata.spaceComplexity?.explanation)
          }
          onMouseLeave={handleTooltipLeave}
        >
          <span className="whitespace-nowrap">
            <span className="font-bold mr-1">Space:</span>
            <span
              className={getAdaptiveFontClass(metadata.spaceComplexity?.value)}
            >
              {metadata.spaceComplexity?.value || "N/A"}
            </span>
          </span>
        </div>
      </div>

      {/* Tooltip */}
      {showTooltip && tooltipContent && (
        <div className="fixed bg-black text-white p-2 rounded shadow-lg text-sm max-w-xs z-50">
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default LinkedListRightPanel;
