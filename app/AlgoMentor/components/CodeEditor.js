import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

export default function CodeEditor({ code, setCode }) {
  const editorRef = useRef(null);
  const lineNumbersRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [activeLine, setActiveLine] = useState(1);
  const { isDarkMode } = useTheme();

  // Calculate lines for line numbers
  const lines = code.split("\n");
  const lineCount = lines.length;

  // Handle tab key for indentation
  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + "  " + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
  };

  // Update active line based on cursor position
  const handleCursorMove = () => {
    if (editorRef.current) {
      const cursorPosition = editorRef.current.selectionStart;
      const textBeforeCursor = editorRef.current.value.substring(
        0,
        cursorPosition
      );
      const lineNumber = (textBeforeCursor.match(/\n/g) || []).length + 1;
      setActiveLine(lineNumber);
    }
  };

  // Add scroll sync handler
  const handleScroll = (e) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.target.scrollTop;
    }
  };

  return (
    <div
      className={`relative rounded-lg overflow-hidden border ${
        isDarkMode ? "border-gray-700" : "border-zinc-200"
      } shadow-md`}
    >
      {/* Editor toolbar */}
      <div
        className={`${isDarkMode ? "bg-gray-900" : "bg-gray-100"} border-b ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        } px-4 py-2 flex items-center justify-between`}
      >
        <div className="flex items-center space-x-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>

        <div className="flex items-center">
          <div
            className={`text-xs ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Line: {activeLine}
          </div>
        </div>
      </div>

      <div className="flex h-96 overflow-hidden">
        {/* Line numbers */}
        <div
          ref={lineNumbersRef}
          className={`px-2 py-2 text-right ${
            isDarkMode
              ? "bg-gray-900 text-gray-500"
              : "bg-zinc-50 text-zinc-400"
          } select-none border-r ${
            isDarkMode ? "border-gray-700" : "border-zinc-200"
          } overflow-hidden`}
          style={{
            paddingTop: "8px",
            minWidth: "3rem",
          }}
        >
          {Array.from({ length: lineCount }).map((_, i) => (
            <div
              key={i}
              className={`text-xs ${
                activeLine === i + 1
                  ? isDarkMode
                    ? "text-white bg-gray-700"
                    : "text-zinc-800 bg-zinc-200"
                  : ""
              }`}
              style={{ height: "20px", lineHeight: "20px" }}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Code editor */}
        <motion.div
          className={`relative flex-1 ${
            isDarkMode ? "bg-gray-900" : "bg-gray-50"
          }`}
        >
          <textarea
            ref={editorRef}
            className={`w-full h-full p-2 font-mono text-sm ${
              isDarkMode ? "text-white" : "text-gray-800"
            } focus:outline-none resize-none overflow-auto`}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            onClick={handleCursorMove}
            onKeyUp={handleCursorMove}
            onScroll={handleScroll}
            spellCheck="false"
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            style={{
              lineHeight: "20px",
              padding: "8px",
            }}
          />
        </motion.div>
      </div>

      {/* Updated Status bar */}
      <div
        className={`${isDarkMode ? "bg-gray-900" : "bg-gray-100"} border-t ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        } px-3 py-1 flex items-center justify-between text-xs ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        <div className="flex items-center">
          <span className="mr-3">
            {lineCount} line{lineCount !== 1 ? "s" : ""}
          </span>
          <span>
            {code.length} character{code.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`text-xs ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Supports:
          </span>
          <span
            className={`px-1.5 py-0.5 rounded bg-blue-100 text-blue-600 ${
              isDarkMode ? "bg-blue-900/30 text-blue-400" : ""
            }`}
          >
            JavaScript
          </span>
          <span
            className={`px-1.5 py-0.5 rounded bg-green-100 text-green-600 ${
              isDarkMode ? "bg-green-900/30 text-green-400" : ""
            }`}
          >
            Python
          </span>
          <span
            className={`px-1.5 py-0.5 rounded bg-orange-100 text-orange-600 ${
              isDarkMode ? "bg-orange-900/30 text-orange-400" : ""
            }`}
          >
            Java
          </span>
          <span
            className={`px-1.5 py-0.5 rounded bg-purple-100 text-purple-600 ${
              isDarkMode ? "bg-purple-900/30 text-purple-400" : ""
            }`}
          >
            C++
          </span>
          <span
            className={`ml-2 px-1.5 py-0.5 rounded ${
              isDarkMode ? "bg-gray-800" : "bg-gray-200"
            }`}
          >
            UTF-8
          </span>
        </div>
      </div>
    </div>
  );
}
