"use client";

import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/AppContext";
import Marquee from "react-fast-marquee";

const AlgorithmCard = ({ categoryData, data }) => {
  const { isDarkMode } = useTheme();
  const { changeCategory, changeAlgorithm } = useAppContext();
  const router = useRouter();

  // Extract colors from button gradient
  const getGradientColors = () => {
    const gradientMatch = data.button.match(/from-(.*?)\s+to-(.*?)(\s|$)/);
    return {
      from: gradientMatch ? gradientMatch[1] : "blue-500",
      to: gradientMatch ? gradientMatch[2] : "indigo-500",
    };
  };

  const colors = getGradientColors();
  const algorithmsArray = Object.values(categoryData);

  // Handle algorithm selection
  const handleAlgorithmClick = (algo) => {
    // First set the selected algorithm
    changeAlgorithm(algo.id);
    // Then set its parent category
    changeCategory(data.name);
    // Finally navigate to home
    router.push("/");
  };

  // Handle explore button click
  const handleExplore = () => {
    // Get the first algorithm from the category
    const firstAlgo = Object.values(categoryData)[0];
    // Set the selected algorithm
    changeAlgorithm(firstAlgo.id);
    // Set its parent category
    changeCategory(data.name);
    // Navigate to home
    router.push("/");
  };

  return (
    <div className="p-2">
      <div
        className={`rounded-lg overflow-hidden w-full shadow-xl ${
          isDarkMode ? "shadow-blue-900/5" : "shadow-blue-500/10"
        }`}
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

          {/* Replace the scrolling section with Marquee */}
          <div className="relative w-full mb-4 overflow-hidden">
            <Marquee
              gradient={false}
              speed={40}
              pauseOnHover={true}
              className="py-3"
            >
              <div className="flex gap-3 px-2">
                {algorithmsArray.map((algo, index) => (
                  <span
                    key={algo.id || index}
                    onClick={() => handleAlgorithmClick(algo)}
                    className={`inline-block px-4 py-2 rounded-full text-sm font-medium text-white border-white
                  ${
                    isDarkMode
                      ? `bg-${colors.from}/40 hover:bg-${colors.to}/50 shadow-lg shadow-${colors.from}/30`
                      : `bg-${colors.from}/30 hover:bg-${colors.to}/40 shadow-md shadow-${colors.from}/20`
                  } border `}
                  >
                    {algo.name}
                  </span>
                ))}
              </div>
            </Marquee>
          </div>

          {/* Explore button */}
          <button
            onClick={handleExplore}
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
