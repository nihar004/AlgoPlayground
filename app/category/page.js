"use client";

import React, { useState } from "react";

const AlgorithmsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Algorithm categories with their respective algorithms
  const categories = [
    {
      name: "Sorting",
      description: "Algorithms that arrange elements in a specific order",
      algorithms: [
        { name: "Bubble Sort", complexity: "O(n²)", space: "O(1)" },
        { name: "Merge Sort", complexity: "O(n log n)", space: "O(n)" },
        { name: "Quick Sort", complexity: "O(n log n)", space: "O(log n)" },
        { name: "Heap Sort", complexity: "O(n log n)", space: "O(1)" },
      ],
      bg: "bg-gradient-to-br from-blue-500 to-cyan-400",
      icon: "📊",
    },
    {
      name: "Searching",
      description: "Algorithms that find elements in data structures",
      algorithms: [
        { name: "Linear Search", complexity: "O(n)", space: "O(1)" },
        { name: "Binary Search", complexity: "O(log n)", space: "O(1)" },
        { name: "Depth-First Search", complexity: "O(V+E)", space: "O(V)" },
        { name: "Breadth-First Search", complexity: "O(V+E)", space: "O(V)" },
      ],
      bg: "bg-gradient-to-br from-purple-500 to-indigo-400",
      icon: "🔍",
    },
    {
      name: "Graph",
      description: "Algorithms that solve problems on graphs",
      algorithms: [
        {
          name: "Dijkstra's Algorithm",
          complexity: "O(V² + E)",
          space: "O(V)",
        },
        {
          name: "Kruskal's Algorithm",
          complexity: "O(E log E)",
          space: "O(V+E)",
        },
        { name: "Bellman-Ford", complexity: "O(VE)", space: "O(V)" },
        { name: "Floyd-Warshall", complexity: "O(V³)", space: "O(V²)" },
      ],
      bg: "bg-gradient-to-br from-green-500 to-emerald-400",
      icon: "🕸️",
    },
    {
      name: "Dynamic Programming",
      description:
        "Algorithms that solve complex problems by breaking them down",
      algorithms: [
        { name: "Fibonacci", complexity: "O(n)", space: "O(1)" },
        { name: "Knapsack Problem", complexity: "O(nW)", space: "O(nW)" },
        {
          name: "Longest Common Subsequence",
          complexity: "O(mn)",
          space: "O(mn)",
        },
        { name: "Edit Distance", complexity: "O(mn)", space: "O(mn)" },
      ],
      bg: "bg-gradient-to-br from-orange-500 to-amber-400",
      icon: "🧩",
    },
  ];

  const AlgorithmCard = ({ category }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className={`relative overflow-hidden rounded-xl shadow-xl transition-all duration-500 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } ${isHovered ? "scale-102 shadow-2xl" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ height: "400px" }}
      >
        {/* Background decoration */}
        <div
          className={`absolute top-0 right-0 w-32 h-32 -mt-8 -mr-8 rounded-full opacity-20 ${category.bg}`}
        ></div>
        <div
          className={`absolute bottom-0 left-0 w-40 h-40 -mb-12 -ml-12 rounded-full opacity-20 ${category.bg}`}
        ></div>

        {/* Card Header */}
        <div className={`relative p-6 ${category.bg} text-white`}>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold tracking-tight">
              {category.name}
            </h3>
            <span className="text-3xl">{category.icon}</span>
          </div>
          <p className="mt-2 opacity-90">{category.description}</p>
        </div>

        {/* Card Content */}
        <div className="relative p-6">
          <div className="space-y-4">
            {category.algorithms.map((algo, idx) => (
              <div
                key={algo.name}
                className={`transition-all duration-300 ${
                  isHovered
                    ? "translate-y-0 opacity-100"
                    : `translate-y-${idx * 2} opacity-${100 - idx * 20}`
                }`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <div
                  className={`flex justify-between items-center p-3 rounded-lg ${
                    isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-100 hover:bg-gray-200"
                  } cursor-pointer transition-colors`}
                >
                  <span className="font-medium">{algo.name}</span>
                  <div className="flex space-x-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-md ${
                        isDarkMode
                          ? "bg-gray-900 text-blue-300"
                          : "bg-white text-blue-600"
                      }`}
                    >
                      {algo.complexity}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded-md ${
                        isDarkMode
                          ? "bg-gray-900 text-green-300"
                          : "bg-white text-green-600"
                      }`}
                    >
                      {algo.space}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Card Footer */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-500 ${
              isHovered ? "opacity-100" : "opacity-80"
            }`}
          >
            <button
              className={`w-full py-3 rounded-lg font-medium transition-colors ${category.bg} text-white`}
            >
              Explore {category.name}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Header */}
      <header
        className={`py-4 px-6 flex justify-between items-center ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } shadow-md`}
      >
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">AlgoPlayground</h1>
        </div>
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex space-x-6 mr-8">
            <a
              href="#"
              className={`font-medium ${
                isDarkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Home
            </a>
            <a
              href="#"
              className={`font-medium ${
                isDarkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              Algorithms
            </a>
            <a
              href="#"
              className={`font-medium ${
                isDarkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Visualizations
            </a>
            <a
              href="#"
              className={`font-medium ${
                isDarkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Learn
            </a>
          </nav>
          <button
            className={`px-4 py-2 rounded-md font-medium ${
              isDarkMode
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white transition-colors`}
          >
            Subscribe
          </button>
          <button
            className={`px-4 py-2 rounded-md font-medium border transition-colors ${
              isDarkMode
                ? "border-gray-600 hover:bg-gray-700"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            Submit
          </button>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {isDarkMode ? "🌞" : "🌙"}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className={`py-12 px-6 ${isDarkMode ? "bg-gray-800" : "bg-blue-50"}`}
      >
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-4">Algorithm Categories</h2>
          <p className="text-lg max-w-3xl">
            Explore our comprehensive collection of algorithms with interactive
            visualizations. Each category offers detailed explanations, code
            implementations, and performance analysis.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <AlgorithmCard key={category.name} category={category} />
          ))}
        </div>

        {/* Additional Section */}
        <section className="mt-16 mb-8">
          <div
            className={`p-8 rounded-xl ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } shadow-lg`}
          >
            <h3 className="text-2xl font-bold mb-4">Ready to dive deeper?</h3>
            <p className="mb-6">
              Our interactive visualizations bring algorithms to life. See how
              they work step-by-step, compare performance metrics, and
              understand the underlying principles.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                className={`px-6 py-3 rounded-lg font-medium ${
                  isDarkMode
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white transition-colors`}
              >
                View All Algorithms
              </button>
              <button
                className={`px-6 py-3 rounded-lg font-medium ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-200 hover:bg-gray-300"
                } transition-colors`}
              >
                Start Learning Path
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className={`py-8 px-6 ${
          isDarkMode
            ? "bg-gray-800 border-t border-gray-700"
            : "bg-white border-t border-gray-200"
        }`}
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="text-3xl font-bold mb-6 md:mb-0">
              AlgoPlayground
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="#"
                className={`${
                  isDarkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                }`}
              >
                Typographic
              </a>
              <a
                href="#"
                className={`${
                  isDarkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                }`}
              >
                Small Type
              </a>
              <a
                href="#"
                className={`${
                  isDarkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                }`}
              >
                Illustrative
              </a>
              <a
                href="#"
                className={`${
                  isDarkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                }`}
              >
                Grid
              </a>
              <a
                href="#"
                className={`${
                  isDarkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                }`}
              >
                Flat
              </a>
              <a
                href="#"
                className={`${
                  isDarkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                }`}
              >
                Animated
              </a>
              <a
                href="#"
                className={`${
                  isDarkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                }`}
              >
                Cards
              </a>
              <a
                href="#"
                className={`${isDarkMode ? "" : "font-bold"} ${
                  isDarkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                }`}
              >
                Bright
              </a>
              <a
                href="#"
                className={`${isDarkMode ? "font-bold" : ""} ${
                  isDarkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                }`}
              >
                Dark
              </a>
              <a
                href="#"
                className={`${
                  isDarkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                }`}
              >
                View All
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <div
              className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
            >
              Info
            </div>
            <div
              className={`${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
            >
              Get more inspiration{" "}
              <span className="text-blue-500">@algoplayground</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AlgorithmsPage;
