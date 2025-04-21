import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Visualization({ onBackToCode }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000); // milliseconds between steps

  // Mock visualization data
  const visualizationSteps = [
    {
      id: 1,
      description: "Initializing array with random values",
      data: [5, 3, 8, 4, 2],
    },
    {
      id: 2,
      description: "Compare elements at position 0 and 1",
      data: [5, 3, 8, 4, 2],
      comparing: [0, 1],
    },
    {
      id: 3,
      description: "Swap elements as 5 > 3",
      data: [3, 5, 8, 4, 2],
      swapped: [0, 1],
    },
    {
      id: 4,
      description: "Compare elements at position 1 and 2",
      data: [3, 5, 8, 4, 2],
      comparing: [1, 2],
    },
    {
      id: 5,
      description: "Elements are already in order, moving on",
      data: [3, 5, 8, 4, 2],
    },
    {
      id: 6,
      description: "Compare elements at position 2 and 3",
      data: [3, 5, 8, 4, 2],
      comparing: [2, 3],
    },
    {
      id: 7,
      description: "Swap elements as 8 > 4",
      data: [3, 5, 4, 8, 2],
      swapped: [2, 3],
    },
    {
      id: 8,
      description: "Compare elements at position 3 and 4",
      data: [3, 5, 4, 8, 2],
      comparing: [3, 4],
    },
    {
      id: 9,
      description: "Swap elements as 8 > 2",
      data: [3, 5, 4, 2, 8],
      swapped: [3, 4],
    },
    {
      id: 10,
      description: "First pass complete, largest element (8) is at the end",
      data: [3, 5, 4, 2, 8],
    },
    {
      id: 11,
      description: "Starting second pass of the bubble sort",
      data: [3, 5, 4, 2, 8],
    },
    {
      id: 12,
      description: "Algorithm complete, array is sorted",
      data: [2, 3, 4, 5, 8],
    },
  ];

  useEffect(() => {
    let interval;

    if (isPlaying && currentStep < visualizationSteps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep((prev) => prev + 1);

        if (currentStep === visualizationSteps.length - 2) {
          setIsPlaying(false);
        }
      }, speed);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentStep, visualizationSteps.length, speed]);

  const handleStepForward = () => {
    if (currentStep < visualizationSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const currentStepData = visualizationSteps[currentStep];

  return (
    <motion.div
      className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-purple-400">
          Algorithm Visualization
        </h2>
        <motion.button
          className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white flex items-center"
          onClick={onBackToCode}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Back to Code
        </motion.button>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6 h-64 flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-4 left-4 bg-gray-800 rounded-md px-3 py-1 text-sm">
          Step {currentStep + 1} of {visualizationSteps.length}
        </div>

        <div className="flex items-end justify-center space-x-2 h-full pb-12">
          {currentStepData.data.map((value, index) => {
            const isComparing = currentStepData.comparing?.includes(index);
            const isSwapped = currentStepData.swapped?.includes(index);

            return (
              <motion.div
                key={index}
                className={`w-16 flex flex-col items-center ${
                  isComparing
                    ? "bg-yellow-500"
                    : isSwapped
                    ? "bg-green-500"
                    : "bg-blue-500"
                } rounded-t-md relative`}
                style={{ height: `${value * 30}px` }}
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  backgroundColor: isComparing
                    ? "#EAB308" // yellow-500
                    : isSwapped
                    ? "#22C55E" // green-500
                    : "#3B82F6", // blue-500
                }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                }}
              >
                <span className="absolute -bottom-8 text-white">{value}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 mb-6">
        <h3 className="text-lg font-medium text-blue-400 mb-2">
          Current Step Explanation
        </h3>
        <p className="text-gray-300">{currentStepData.description}</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <div className="flex space-x-4">
          <motion.button
            className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
            onClick={handleStepBackward}
            disabled={currentStep === 0}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>

          <motion.button
            className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 flex items-center justify-center"
            onClick={togglePlayPause}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? (
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
                  d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
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
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </motion.button>

          <motion.button
            className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center"
            onClick={handleStepForward}
            disabled={currentStep === visualizationSteps.length - 1}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Speed:</span>
          <input
            type="range"
            min="200"
            max="2000"
            step="100"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-32 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm text-gray-400">{speed / 1000}s</span>
        </div>
      </div>
    </motion.div>
  );
}
