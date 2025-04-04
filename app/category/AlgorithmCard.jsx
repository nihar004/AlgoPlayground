"use client";

import React from "react";
import { useAppContext } from "../context/AppContext";
import { useRouter } from "next/navigation";
import { useTheme } from "../context/ThemeContext";

const AlgorithmCard = ({ categoryData, data }) => {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const { setCurrentCategory, setCurrentAlgorithm } = useAppContext();

  // Convert categoryData object to array for mapping if it's an object
  const algorithmsArray = Array.isArray(categoryData)
    ? categoryData
    : Object.values(categoryData || {});

  // Handle click on an algorithm
  const handleAlgorithmClick = (algo) => {
    setCurrentCategory(data.name);
    setCurrentAlgorithm(algo.id);
    router.push("/");
  };

  // Handle click on explore button
  const handleExploreClick = (data) => {
    // Set the category and the first algorithm as default
    setCurrentCategory(data.name);
    if (algorithmsArray.length > 0) {
      setCurrentAlgorithm(algorithmsArray[0].id);
    }

    router.push("/");
  };

  return (
    <div className="p-2">
      <div
        className={`
          rounded-lg overflow-hidden w-full shadow-xl
          ${isDarkMode ? " shadow-blue-900/5" : " shadow-blue-500/10"}
        `}
      >
        {/* Card Content Container */}
        <div
          className={`w-full flex flex-col items-center p-5 bg-radial-[at_center] ${data.background} to-90%`}
        >
          {data.image && (
            <div className="mb-1 overflow-hidden rounded-lg">
              <img
                src={data.image}
                alt={`${data.name} illustration`}
                className="object-cover w-40 h-40 transition-transform duration-700 hover:scale-110"
                style={{
                  boxShadow: isDarkMode
                    ? "0 10px 30px -5px rgba(0, 0, 0, 0.5)"
                    : "0 10px 30px -5px rgba(59, 130, 246, 0.3)",
                }}
              />
            </div>
          )}
          {/* Title */}
          <h3
            className={`text-xl font-bold text-center transition-all duration-300 mb-2 text-zinc-700`}
          >
            {data.name}
          </h3>

          {/* Divider */}
          <div
            className={`mb-4 w-16 h-0.5 rounded-full transition-all duration-500 bg-gradient-to-r ${data.button}`}
          ></div>

          {/* Algorithms list */}
          <div className="w-full flex flex-wrap justify-center gap-2 mb-6">
            {algorithmsArray.map((algo, index) => (
              <span
                key={algo.id || index}
                onClick={() => handleAlgorithmClick(algo)}
                className={`px-3 py-1 text-xs rounded-full transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                  isDarkMode
                    ? "bg-blue-900/30 hover:bg-blue-800/40 text-blue-100 hover:text-white"
                    : "bg-blue-100 hover:bg-blue-200 text-blue-800"
                } border ${
                  isDarkMode ? "border-blue-800/30" : "border-blue-200"
                }`}
              >
                {algo.name}
              </span>
            ))}
          </div>

          {/* Explore button */}

          <button
            onClick={() => handleExploreClick(data)}
            className={`w-full py-2.5 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-105 relative overflow-hidden group border-1 ${`bg-gradient-to-r ${data.button} text-white`}`}
          >
            <span className="relative z-10 flex items-center justify-center">
              Explore {data.name}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmCard;
