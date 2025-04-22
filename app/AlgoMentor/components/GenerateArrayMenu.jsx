import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useArray } from "./ArrayContext";
import { useWarnings } from "@/app/context/WarningContext";

const GenerateArrayMenu = ({ setShowGenerateMenu, setIsExpanded }) => {
  const [selectedOption, setSelectedOption] = useState("random");
  const [manualInput, setManualInput] = useState("");
  const { isDarkMode } = useTheme();
  const { setArray, size, setSize, play } = useArray();
  const { showWarning } = useWarnings();

  const generateOptions = [
    { id: "random", label: "Random" },
    { id: "sorted", label: "Sorted" },
    { id: "nearlySorted", label: "Nearly Sorted" },
    { id: "reversed", label: "Reverse Sorted" },
    { id: "duplicates", label: "Many Duplicates" },
    { id: "manual", label: "Manual Input" },
  ];

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateArray = () => {
    let newArray = [];
    const min = 1;
    const max = 50;

    switch (selectedOption) {
      case "random":
        newArray = Array.from({ length: size }, () =>
          getRandomNumber(min, max)
        );
        break;

      case "nearlySorted":
        newArray = Array.from({ length: size }, (_, i) =>
          Math.max(min, Math.floor((i / size) * max))
        );
        // Swap a few elements to make it nearly sorted
        for (let i = 0; i < size * 0.1; i++) {
          const idx1 = getRandomNumber(0, size - 1);
          const idx2 = getRandomNumber(0, size - 1);
          [newArray[idx1], newArray[idx2]] = [newArray[idx2], newArray[idx1]];
        }
        break;

      case "duplicates":
        const possibleValues = Array.from({ length: 5 }, () =>
          getRandomNumber(min, max)
        );
        newArray = Array.from(
          { length: size },
          () => possibleValues[getRandomNumber(0, possibleValues.length - 1)]
        );
        break;

      case "sorted":
        newArray = Array.from({ length: size }, (_, i) => {
          return (
            Math.floor((i / (size - 1)) * (max - min)) +
            getRandomNumber(0, 5) +
            min
          );
        });
        newArray.sort((a, b) => a - b);
        break;

      case "reversed":
        newArray = Array.from({ length: size }, (_, i) => {
          return Math.max(
            min,
            Math.floor(((size - 1 - i) / (size - 1)) * (max - min)) -
              getRandomNumber(0, 5) +
              min
          );
        });
        newArray.sort((a, b) => b - a);
        break;

      case "manual":
        const parsedArray = manualInput
          .split(",")
          .map((num) => parseInt(num.trim()))
          .filter((num) => !isNaN(num));

        if (parsedArray.length === 0) {
          showWarning("Please enter valid numbers separated by commas");
          return;
        }

        if (parsedArray.length < 3) {
          showWarning("Please enter at least 3 valid numbers.");
          return;
        }

        const validNumbers = parsedArray.filter(
          (num) => num >= min && num <= max
        );
        const invalidNumbers = parsedArray.filter(
          (num) => num < min || num > max
        );

        if (invalidNumbers.length > 0) {
          showWarning(
            `Numbers must be between ${min} and ${max}. Invalid numbers: ${invalidNumbers.join(", ")}`
          );
        }

        if (validNumbers.length > 0) {
          newArray = validNumbers;
        } else {
          showWarning("No valid numbers in the range 1-50 were provided");
          return;
        }
        break;

      default:
        newArray = [];
    }

    setSize(newArray.length);
    setArray(newArray);
    setShowGenerateMenu(false);
    setIsExpanded(false);
    play();
  };

  return (
    <>
      <div
        className={`absolute left-[107%] rounded-2xl shadow-lg p-4 w-64 -top-105 ${
          !isDarkMode ? "bg-white" : "bg-zinc-600"
        }`}
      >
        <div className="space-y-2">
          {generateOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`w-full text-left py-2 px-4 rounded transition-transform duration-250 ${
                selectedOption === option.id
                  ? "bg-blue-100 text-blue-700 font-bold"
                  : !isDarkMode
                    ? "hover:bg-zinc-100 hover:scale-103 hover:font-medium"
                    : "hover:bg-zinc-500 hover:scale-103 hover:font-medium"
              }`}
            >
              {option.label}
            </button>
          ))}

          {selectedOption === "manual" && (
            <div className="space-y-2">
              <input
                type="text"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                placeholder="Enter numbers (e.g., 1, 2, 3, 4)"
                className="w-full p-2 border rounded"
              />
              <div
                className={`text-xs ${
                  !isDarkMode ? "text-gray-600" : "text-gray-300"
                }`}
              >
                *Numbers must be between 1 and 50
              </div>
            </div>
          )}

          <button
            className="w-full bg-green-500 text-white py-2 px-4 rounded mt-2 hover:bg-green-400 hover:scale-101"
            onClick={generateArray}
          >
            Generate
          </button>
        </div>
      </div>
    </>
  );
};

export default GenerateArrayMenu;
