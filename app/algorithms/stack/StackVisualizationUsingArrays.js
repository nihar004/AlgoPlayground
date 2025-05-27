"use client";
import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

export default function StackVisualizationUsingArrays() {
  const { isDarkMode } = useTheme();
  const [stack, setStack] = useState(["42", "13"]); // Default values
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [operation, setOperation] = useState(null);

  const handlePush = () => {
    if (value.trim() === "") {
      setMessage("Please enter a value to push");
      return;
    }

    // Highlight animation
    setOperation("push");
    setMessage(`Pushing ${value} onto the stack`);

    setTimeout(() => {
      setStack([...stack, value]);
      setValue("");
      setHighlightIndex(stack.length);

      setTimeout(() => {
        setHighlightIndex(null);
        setOperation(null);
        setMessage(`Successfully pushed ${value} onto the stack`);
      }, 1000);
    }, 500);
  };

  const handlePop = () => {
    if (stack.length === 0) {
      setMessage("Cannot pop from an empty stack");
      return;
    }

    // Highlight animation
    setOperation("pop");
    setHighlightIndex(stack.length - 1);
    setMessage(`Popping ${stack[stack.length - 1]} from the stack`);

    setTimeout(() => {
      const poppedValue = stack[stack.length - 1];
      setStack(stack.slice(0, -1));
      setHighlightIndex(null);
      setOperation(null);
      setMessage(`Successfully popped ${poppedValue} from the stack`);
    }, 1500);
  };

  const handlePeek = () => {
    if (stack.length === 0) {
      setMessage("Cannot peek an empty stack");
      return;
    }

    // Highlight animation
    setOperation("peek");
    setHighlightIndex(stack.length - 1);
    setMessage(
      `Peeking: ${stack[stack.length - 1]} is at the top of the stack`
    );

    setTimeout(() => {
      setHighlightIndex(null);
      setOperation(null);
    }, 2000);
  };

  return (
    <div
      className={`flex flex-col items-center p-8 w-full ${isDarkMode ? "bg-zinc-900" : "bg-gray-100"}`}
    >
      <h1
        className={`text-3xl font-bold mb-8 ${isDarkMode ? "text-blue-400" : "text-blue-800"}`}
      >
        Stack Visualization
      </h1>

      <div className="flex flex-col mb-8 w-full max-w-2xl">
        <div className="flex items-center mb-4 justify-center">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
            className={`border-2 rounded-lg px-4 py-3 mr-4 w-48 text-lg focus:outline-none shadow-sm
              ${
                isDarkMode
                  ? "bg-zinc-800 border-zinc-600 text-white focus:border-blue-400"
                  : "bg-white border-gray-400 focus:border-blue-500"
              }`}
          />
          <div className="flex gap-3">
            <button
              onClick={handlePush}
              className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition-colors font-bold shadow-md"
            >
              Push
            </button>
            <button
              onClick={handlePop}
              className="bg-red-600 text-white px-5 py-3 rounded-lg hover:bg-red-700 transition-colors font-bold shadow-md"
            >
              Pop
            </button>
            <button
              onClick={handlePeek}
              className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition-colors font-bold shadow-md"
            >
              Peek
            </button>
          </div>
        </div>

        {message && (
          <div
            className={`p-4 rounded-lg shadow-md text-center border-l-4 border-blue-500 text-lg
            ${isDarkMode ? "bg-zinc-800 text-white" : "bg-white text-gray-800"}`}
          >
            {message}
          </div>
        )}
      </div>

      <div className="flex justify-center w-full gap-16">
        {/* Stack visualization (vertical) */}
        <div className="flex flex-col items-center">
          <h2
            className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-zinc-100" : "text-gray-800"}`}
          >
            Stack
          </h2>
          <div
            className={`relative border-l-2 border-r-2 border-b-2 w-40 h-64 flex flex-col-reverse shadow-md
            ${
              isDarkMode
                ? "border-zinc-600 bg-zinc-800"
                : "border-gray-500 bg-gray-50"
            }`}
          >
            {stack.length === 0 ? (
              <div
                className={`absolute inset-0 flex items-center justify-center 
                ${isDarkMode ? "text-zinc-400" : "text-gray-400"}`}
              >
                Empty Stack
              </div>
            ) : (
              stack.map((item, index) => (
                <div
                  key={index}
                  className={`p-2 border-t-2 h-16 flex items-center justify-center text-lg relative
                    ${isDarkMode ? "border-zinc-600" : "border-gray-500"}
                    ${
                      highlightIndex === index
                        ? operation === "push"
                          ? "bg-blue-700 text-white animate-pulse"
                          : operation === "pop"
                            ? "bg-red-700 text-white animate-pulse"
                            : "bg-green-700 text-white animate-pulse"
                        : isDarkMode
                          ? "bg-zinc-700 text-white"
                          : "bg-white"
                    }`}
                >
                  {item}
                  {index === stack.length - 1 && (
                    <div className="absolute -right-24 top-1/2 transform -translate-y-1/2 flex items-center">
                      <div className="w-8 h-0.5 bg-red-600"></div>
                      <span className="font-bold text-red-600 ml-2">TOP</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Array representation (horizontal) */}
        <div className="flex flex-col items-center">
          <h2
            className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-zinc-100" : "text-gray-800"}`}
          >
            Array
          </h2>
          <div className="flex flex-col">
            <div
              className={`relative flex flex-row border-2 ${isDarkMode ? "border-zinc-600 bg-zinc-800" : "border-gray-500 bg-gray-50"} shadow-md`}
            >
              {stack.length === 0 ? (
                <div
                  className={`h-16 w-64 flex items-center justify-center ${isDarkMode ? "text-zinc-400" : "text-gray-400"}`}
                >
                  Empty Array
                </div>
              ) : (
                stack.map((item, index) => (
                  <div
                    key={index}
                    className={`p-2 border-r h-16 w-16 flex items-center justify-center text-lg
                      ${isDarkMode ? "border-zinc-600" : "border-gray-500"}
                      ${
                        highlightIndex === index
                          ? operation === "push"
                            ? "bg-blue-700 text-white animate-pulse"
                            : operation === "pop"
                              ? "bg-red-700 text-white animate-pulse"
                              : "bg-green-700 text-white animate-pulse"
                          : isDarkMode
                            ? "bg-zinc-700 text-white"
                            : "bg-white"
                      }`}
                  >
                    {item}
                  </div>
                ))
              )}
            </div>

            {/* Array indices */}
            <div className="flex flex-row">
              {stack.map((_, index) => (
                <div
                  key={index}
                  className={`w-16 text-center text-sm font-semibold ${isDarkMode ? "text-zinc-300" : "text-gray-700"}`}
                >
                  {index}
                </div>
              ))}
            </div>

            {/* Top pointer */}
            <div className="flex flex-row relative w-full">
              {stack.length > 0 && (
                <div
                  className="absolute transition-all duration-300"
                  style={{
                    left: `${(stack.length - 1) * 4}rem`,
                    top: "0.5rem",
                  }}
                >
                  <div className="h-6 border-l-2 border-red-600"></div>
                  <div className="text-sm font-semibold text-red-600 whitespace-nowrap">
                    TOP = {stack.length - 1}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 w-full max-w-2xl">
        <div
          className={`p-6 rounded-lg shadow-lg ${isDarkMode ? "bg-zinc-800" : "bg-white"}`}
        >
          <h3
            className={`text-xl font-semibold mb-4 border-b-2 pb-2
            ${isDarkMode ? "text-blue-400 border-zinc-700" : "text-blue-800 border-gray-200"}`}
          >
            Stack Operations:
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-blue-600 mr-2"></div>
              <span>
                <strong>Push:</strong> Adds an element to the top of the stack
              </span>
            </li>
            <li className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-red-600 mr-2"></div>
              <span>
                <strong>Pop:</strong> Removes the top element from the stack
              </span>
            </li>
            <li className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-green-600 mr-2"></div>
              <span>
                <strong>Peek:</strong> Views the top element without removing it
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
