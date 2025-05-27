"use client";
import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

export default function StackVisualizationUsingLL() {
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
            ${isDarkMode ? "bg-zinc-800 text-white" : "bg-white"}`}
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
                className={`absolute inset-0 flex items-center justify-center ${isDarkMode ? "text-zinc-400" : "text-gray-400"}`}
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

        {/* Linked List representation (horizontal) */}
        <div className="flex flex-col items-center">
          <h2
            className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-zinc-100" : "text-gray-800"}`}
          >
            Linked List
          </h2>
          <div className="flex flex-col">
            <div className="relative mt-12">
              {stack.length === 0 ? (
                <div
                  className={`h-16 w-64 flex items-center justify-center ${isDarkMode ? "text-zinc-400" : "text-gray-400"}`}
                >
                  Empty Linked List
                </div>
              ) : (
                <div className="flex items-center">
                  {/* Head pointer with TOP indicator */}
                  <div className="flex flex-col items-center mr-3 relative">
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                      {/* <span className="font-bold text-red-600">TOP</span> */}
                      {/* <div className="h-2 w-0.5 bg-red-600"></div> */}
                    </div>
                    <div
                      className={`font-semibold mb-1 ${isDarkMode ? "text-blue-400" : "text-blue-700"}`}
                    >
                      Head
                    </div>
                    <div
                      className={`h-8 border-r-2 ${isDarkMode ? "border-blue-400" : "border-blue-600"}`}
                    ></div>
                  </div>

                  {/* Nodes */}
                  {stack.map((item, index) => (
                    <div key={index} className="flex items-center">
                      {/* Node */}
                      <div
                        className={`flex flex-col border-2 rounded-lg shadow-md
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
                        <div
                          className={`border-b py-2 px-4 flex justify-center items-center min-w-16 text-lg font-semibold
                          ${isDarkMode ? "border-zinc-600" : "border-gray-500"}`}
                        >
                          {item}
                        </div>
                        <div className="py-2 px-4 flex justify-center items-center min-w-16 text-sm">
                          {index === stack.length - 1 ? "NULL" : "NEXT"}
                        </div>
                      </div>

                      {/* Arrow */}
                      {index < stack.length - 1 && (
                        <div className="flex items-center px-2">
                          <div
                            className={`w-10 h-0.5 ${isDarkMode ? "bg-blue-400" : "bg-blue-600"}`}
                          ></div>
                          <div
                            className={`w-0 h-0 border-l-8 border-y-4 border-solid 
                            ${
                              isDarkMode
                                ? "border-l-blue-400 border-y-transparent"
                                : "border-l-blue-600 border-y-transparent"
                            } ml-0.5`}
                          ></div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Remove the old TOP indicator that was here */}
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
                <strong>Push:</strong> Adds a new node at the beginning of the
                linked list (top of stack)
              </span>
            </li>
            <li className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-red-600 mr-2"></div>
              <span>
                <strong>Pop:</strong> Removes the head node from the linked list
                (top element)
              </span>
            </li>
            <li className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-green-600 mr-2"></div>
              <span>
                <strong>Peek:</strong> Views the head node value without
                removing it
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
