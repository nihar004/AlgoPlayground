import React, { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import { useSearching } from "../SearchingContext";
import { useWarnings } from "../../../context/WarningContext";

const GenerateArrayMenu = ({ setShowGenerateMenu, setIsExpanded }) => {
  const [selectedOption, setSelectedOption] = useState("random");
  const [manualInput, setManualInput] = useState("");
  const { isDarkMode } = useTheme();
  const { setArray, size, setSize, play } = useSearching();
  const { addWarning } = useWarnings();

  const generateOptions = [
    { id: "random", label: "Random" },
    { id: "sorted", label: "Sorted" },
    { id: "nearlySorted", label: "Nearly Sorted" },
    { id: "manual", label: "Manual Input" },
  ];

  // Array generation functions remain the same
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateArray = () => {
    let newArray = [];
    const min = -100;
    const max = 100;

    switch (selectedOption) {
      case "random":
        newArray = Array.from({ length: size }, () =>
          getRandomNumber(min, max)
        );
        break;
      case "nearlySorted":
        // Ensure minimum value is at least 1
        newArray = Array.from({ length: size }, (_, i) =>
          Math.max(min, Math.floor((i / size) * max))
        );
        for (let i = 0; i < size * 0.1; i++) {
          const idx1 = getRandomNumber(0, size - 1);
          const idx2 = getRandomNumber(0, size - 1);
          [newArray[idx1], newArray[idx2]] = [newArray[idx2], newArray[idx1]];
        }
        break;
      case "sorted":
        // Create a strictly increasing array starting from min (1)
        newArray = Array.from({ length: size }, (_, i) => {
          // Ensure a consistent increase with some small randomness
          return (
            Math.floor((i / (size - 1)) * (max - min)) +
            getRandomNumber(0, 5) +
            min
          );
        });
        // Sort to ensure strictly increasing
        newArray.sort((a, b) => a - b);
        break;
      case "manual":
        // Parse the input string into an array of numbers
        const parsedArray = manualInput
          .split(",")
          .map((num) => parseInt(num.trim()))
          .filter((num) => !isNaN(num));

        // Check if the array is empty
        if (parsedArray.length === 0) {
          addWarning("Please enter valid numbers separated by commas", 5000);
          return;
        }

        // Check if there are at least 5 elements
        if (parsedArray.length < 5) {
          addWarning("Please enter at least 5 valid numbers.", 5000);
          return;
        }

        // Validate the range (-100 to 100) and filter out invalid numbers
        const validNumbers = [];
        const invalidNumbers = [];

        parsedArray.forEach((num) => {
          if (num >= min && num <= max) {
            validNumbers.push(num);
          } else {
            invalidNumbers.push(num);
          }
        });

        // If there are any invalid numbers, show a warning
        if (invalidNumbers.length > 0) {
          addWarning(
            `Numbers must be between ${min} and ${max}. Invalid numbers: ${invalidNumbers.join(
              ", "
            )}`,
            5000
          );
        }

        // If we have at least some valid numbers, use them
        if (validNumbers.length > 0) {
          newArray = validNumbers;
        } else {
          // If no valid numbers, don't proceed
          addWarning(
            "No valid numbers in the range -100 to 100 were provided",
            5000
          );
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
        className={`absolute left-[107%] rounded-2xl shadow-lg p-4 w-64 top-4 ${
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
                *Numbers must be between -100 to 100
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
