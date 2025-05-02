"use client";

import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import AlgorithmCard from "./AlgorithmCard";
import { algorithms, algorithmCardData } from "../algorithms/registry/algo";
import { ArrowRight, Sparkle, Zap } from "lucide-react";
import Footer from "./Footer";
import Header from "./Header";

const AlgorithmsPage = () => {
  const { isDarkMode } = useTheme();
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div
      className={`min-h-screen ${
        isDarkMode
          ? "bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 text-white"
          : "bg-gradient-to-br from-white via-zinc-50 to-blue-50 text-zinc-800"
      }`}
    >
      {/* Header with glassmorphism effect when scrolled */}
      <Header title="AlgoPlayground" />

      {/* Hero Section with animated gradient and particles */}
      <section className={`relative overflow-hidden py-20 px-6`}>
        {/* Background with animated gradient */}
        <div className="absolute inset-0 z-0">
          <div
            className={`w-full h-full ${
              isDarkMode
                ? "bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-zinc-900"
                : "bg-gradient-to-br from-blue-100 via-indigo-50 to-white"
            }`}
          ></div>

          {/* Decorative circles/blobs */}
          <div
            className={`absolute top-20 left-10 w-64 h-64 rounded-full ${
              isDarkMode ? "bg-blue-500/5" : "bg-blue-200/30"
            } blur-3xl`}
          ></div>
          <div
            className={`absolute bottom-10 right-10 w-80 h-80 rounded-full ${
              isDarkMode ? "bg-purple-500/5" : "bg-indigo-200/30"
            } blur-3xl`}
          ></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:max-w-2xl mb-12 md:mb-0">
              <div className="inline-block px-4 py-1 rounded-full mb-4 text-sm font-medium bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-200/20">
                Interactive Learning
              </div>
              <h2
                className={`text-4xl md:text-5xl font-bold mb-2 tracking-tight py-2 ${
                  isDarkMode
                    ? "bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-blue-800 via-blue-600 to-indigo-800 bg-clip-text text-transparent"
                }`}
              >
                Algorithms Visualized
              </h2>
              <p className="text-lg max-w-2xl leading-relaxed mb-8">
                Explore our comprehensive collection of algorithms with
                interactive visualizations. Each category offers detailed
                explanations, code implementations, and performance analysis.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="group relative px-6 py-3 rounded-lg font-medium text-sm text-white overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:from-blue-500 group-hover:to-indigo-500 transition-all duration-300"></div>
                  <span className="relative flex items-center gap-2">
                    Start Exploring
                    <ArrowRight width="17" height="17" />
                  </span>
                </button>
                <button
                  className={`relative px-6 py-3 rounded-lg font-medium text-sm overflow-hidden ${
                    isDarkMode ? "text-white" : "text-zinc-800"
                  }`}
                >
                  <div
                    className={`absolute inset-0 ${
                      isDarkMode
                        ? "bg-zinc-800 hover:bg-zinc-700"
                        : "bg-white hover:bg-zinc-50"
                    } border ${
                      isDarkMode ? "border-zinc-700" : "border-zinc-200"
                    } transition-all duration-300`}
                  ></div>
                  <span className="relative">View Documentation</span>
                </button>
              </div>
            </div>
            <div className="relative">
              {/* Decorative circles animation */}
              <div
                className={`absolute -top-6 -left-6 w-12 h-12 rounded-full ${
                  isDarkMode ? "bg-blue-500/20" : "bg-blue-200"
                } animate-pulse`}
              ></div>
              <div
                className={`absolute -bottom-4 -right-4 w-8 h-8 rounded-full ${
                  isDarkMode ? "bg-purple-500/20" : "bg-indigo-200"
                } animate-pulse delay-700`}
              ></div>

              {/* Main hero image/illustration */}
              <div
                className={`relative w-72 h-72 rounded-2xl overflow-hidden ${
                  isDarkMode
                    ? "bg-gradient-to-br from-zinc-800 to-zinc-700"
                    : "bg-gradient-to-br from-white to-blue-50"
                } shadow-lg border ${
                  isDarkMode ? "border-zinc-700" : "border-zinc-200"
                } flex items-center justify-center group`}
              >
                <div
                  className={`absolute inset-0 ${
                    isDarkMode ? "bg-blue-500/5" : "bg-blue-100/50"
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>

                {/* Algorithm visualization mockup */}
                <div className="relative z-10 p-6 w-full h-full flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <div
                      className={`text-sm font-bold ${
                        isDarkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      Binary Search Tree
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                  </div>

                  <div className="flex-1 flex items-center justify-center">
                    <svg
                      width="160"
                      height="120"
                      viewBox="0 0 160 120"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${
                        isDarkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      {/* BST visualization */}
                      <circle
                        cx="80"
                        cy="20"
                        r="15"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill={isDarkMode ? "#1e293b" : "#eff6ff"}
                      />
                      <text
                        x="80"
                        y="25"
                        textAnchor="middle"
                        fill="currentColor"
                        fontSize="12"
                      >
                        50
                      </text>

                      <line
                        x1="70"
                        y1="30"
                        x2="50"
                        y2="50"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle
                        cx="40"
                        cy="60"
                        r="15"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill={isDarkMode ? "#1e293b" : "#eff6ff"}
                      />
                      <text
                        x="40"
                        y="65"
                        textAnchor="middle"
                        fill="currentColor"
                        fontSize="12"
                      >
                        25
                      </text>

                      <line
                        x1="90"
                        y1="30"
                        x2="110"
                        y2="50"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle
                        cx="120"
                        cy="60"
                        r="15"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill={isDarkMode ? "#1e293b" : "#eff6ff"}
                      />
                      <text
                        x="120"
                        y="65"
                        textAnchor="middle"
                        fill="currentColor"
                        fontSize="12"
                      >
                        75
                      </text>

                      <line
                        x1="30"
                        y1="70"
                        x2="20"
                        y2="85"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle
                        cx="15"
                        cy="95"
                        r="12"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill={isDarkMode ? "#1e293b" : "#eff6ff"}
                      />
                      <text
                        x="15"
                        y="99"
                        textAnchor="middle"
                        fill="currentColor"
                        fontSize="10"
                      >
                        10
                      </text>

                      <line
                        x1="50"
                        y1="70"
                        x2="60"
                        y2="85"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle
                        cx="65"
                        cy="95"
                        r="12"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill={isDarkMode ? "#1e293b" : "#eff6ff"}
                      />
                      <text
                        x="65"
                        y="99"
                        textAnchor="middle"
                        fill="currentColor"
                        fontSize="10"
                      >
                        30
                      </text>
                    </svg>
                  </div>

                  <div
                    className={`h-6 w-full rounded-full border-1 bg-zinc-100 ${
                      isDarkMode ? "border-zinc-800" : "border-zinc-200"
                    } overflow-hidden`}
                  >
                    <div
                      className={`h-full w-3/4 ${
                        isDarkMode
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600"
                          : "bg-gradient-to-r from-blue-500 to-indigo-500"
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Bar with glassmorphism */}
      <div
        className={`py-4 px-6 ${
          isDarkMode
            ? "bg-zinc-900/90 backdrop-blur-md border-b border-zinc-600/50"
            : "bg-white/90 backdrop-blur-md border-b border-zinc-200 shadow-sm"
        }`}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`text-sm font-medium ${
                isDarkMode ? "text-zinc-400" : "text-zinc-500"
              }`}
            >
              Filter by:
            </span>

            {["all", "sorting", "searching", "graph", "dynamic"].map(
              (category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                    activeCategory === category
                      ? isDarkMode
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-900/20"
                        : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md shadow-blue-500/20"
                      : isDarkMode
                        ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-200"
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-800"
                  }`}
                >
                  {category === "all"
                    ? "All Categories"
                    : category === "dynamic"
                      ? "Dynamic Programming"
                      : `${category.charAt(0).toUpperCase() + category.slice(1)}`}
                </button>
              )
            )}

            <div className="ml-auto">
              <select
                className={`px-4 py-2 text-sm rounded-lg ${
                  isDarkMode
                    ? "bg-zinc-800 text-zinc-300 border-zinc-700"
                    : "bg-white text-zinc-600 border-zinc-200"
                } border focus:outline-none focus:ring-2 ${
                  isDarkMode ? "focus:ring-blue-600" : "focus:ring-blue-500"
                }`}
              >
                <option>Sort: Most Popular</option>
                <option>Sort: Newest First</option>
                <option>Sort: A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with improved cards */}
      <main className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Category headings */}
        <div className="mb-8">
          <h2
            className={`text-2xl font-bold mb-2 ${
              isDarkMode
                ? "bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-blue-800 to-indigo-700 bg-clip-text text-transparent"
            }`}
          >
            {activeCategory === "all"
              ? "All Algorithms"
              : activeCategory === "dynamic"
                ? "Dynamic Programming"
                : `${
                    activeCategory.charAt(0).toUpperCase() +
                    activeCategory.slice(1)
                  } Algorithms`}
          </h2>
          <p
            className={`text-base ${
              isDarkMode ? "text-zinc-400" : "text-zinc-600"
            }`}
          >
            {activeCategory === "all"
              ? "Explore our comprehensive collection of algorithms across different categories."
              : `Discover ${activeCategory} algorithms with step-by-step visualizations and implementations.`}
          </p>
        </div>
        {/* Algorithm cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.keys(algorithmCardData)
            .filter(
              (category) =>
                activeCategory === "all" ||
                category.toLowerCase().includes(activeCategory)
            )
            .map((category) => (
              <div key={category} className="group">
                <AlgorithmCard
                  categoryData={algorithms[category]}
                  data={algorithmCardData[category]}
                />
              </div>
            ))}
        </div>
        {/* Additional info cards section */}
        <section className="mt-16 grid md:grid-cols-2 gap-8">
          <div
            className={`rounded-xl overflow-hidden ${
              isDarkMode
                ? "bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-zinc-800 border border-blue-900/30"
                : "bg-gradient-to-br from-blue-50 via-blue-100/50 to-white border border-blue-100"
            } shadow-lg`}
          >
            <div className="p-8">
              <div
                className={`w-12 h-12 mb-6 rounded-lg flex items-center justify-center ${
                  isDarkMode ? "bg-blue-500/20" : "bg-blue-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`w-6 h-6 ${
                    isDarkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  <path d="M12 9V1"></path>
                  <path d="M19 9V1"></path>
                  <path d="M5 9V1"></path>
                  <path d="M1 9h22"></path>
                  <path d="M3 20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9H1v11Z"></path>
                </svg>
              </div>
              <h3
                className={`text-xl font-bold mb-3 ${
                  isDarkMode ? "text-white" : "text-zinc-800"
                }`}
              >
                Interactive Learning Path
              </h3>
              <p
                className={`mb-6 ${
                  isDarkMode ? "text-zinc-300" : "text-zinc-600"
                }`}
              >
                Follow our structured learning paths to master algorithms from
                beginner to advanced levels. Each path includes interactive
                lessons, coding exercises, AI assistants and visualizations to
                help you learn effectively.
              </p>
              <button
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                  isDarkMode
                    ? "text-blue-400 hover:text-blue-300"
                    : "text-blue-600 hover:text-blue-700"
                }`}
              >
                <a href="/LearningPath">Explore learning paths</a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
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
              </button>
            </div>
          </div>

          <div
            className={`rounded-xl overflow-hidden ${
              isDarkMode
                ? "bg-gradient-to-br from-purple-900/20 via-purple-800/10 to-zinc-800 border border-purple-900/30"
                : "bg-gradient-to-br from-indigo-50 via-purple-100/50 to-white border border-purple-100"
            } shadow-lg`}
          >
            <div className="p-8">
              <div
                className={`w-12 h-12 mb-6 rounded-lg flex items-center justify-center ${
                  isDarkMode ? "bg-purple-500/20" : "bg-purple-100"
                }`}
              >
                <Sparkle
                  height={12}
                  width={12}
                  className={`w-6 h-6 ${
                    isDarkMode ? "text-purple-400" : "text-purple-600"
                  }`}
                />
              </div>
              <h3
                className={`text-xl font-bold mb-3 ${
                  isDarkMode ? "text-white" : "text-zinc-800"
                }`}
              >
                Algorithm Challenges
              </h3>
              <p
                className={`mb-6 ${
                  isDarkMode ? "text-zinc-300" : "text-zinc-600"
                }`}
              >
                Test your skills with our algorithm challenges. Solve problems,
                optimize solutions, and compare your performance against others
                in the community.
              </p>
              <button
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
                  isDarkMode
                    ? "text-purple-400 hover:text-purple-300"
                    : "text-purple-600 hover:text-purple-700"
                }`}
              >
                <span>Start a challenge</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
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
              </button>
            </div>
          </div>
        </section>
        {/* Enhanced call-to-action section */}
        <section className="mt-16 mb-12">
          <div className="relative overflow-hidden rounded-xl shadow-xl">
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
              <div
                className={`w-full h-full ${
                  isDarkMode
                    ? "bg-gradient-to-br from-zinc-800 via-blue-900/10 to-purple-900/10"
                    : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
                }`}
              ></div>

              {/* Decorative elements */}
              <div
                className={`absolute -top-20 -right-20 w-64 h-64 rounded-full ${
                  isDarkMode ? "bg-blue-500/5" : "bg-blue-200/50"
                } blur-2xl`}
              ></div>
              <div
                className={`absolute -bottom-20 -left-20 w-64 h-64 rounded-full ${
                  isDarkMode ? "bg-purple-500/5" : "bg-purple-200/50"
                } blur-2xl`}
              ></div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-10">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:max-w-2xl mb-8 md:mb-0">
                  <h3
                    className={`text-3xl font-bold mb-4 ${
                      isDarkMode
                        ? "bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent"
                        : "bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent"
                    }`}
                  >
                    Ready to dive deeper?
                  </h3>
                  <p
                    className={`mb-6 text-lg leading-relaxed ${
                      isDarkMode ? "text-zinc-300" : "text-zinc-700"
                    }`}
                  >
                    Our interactive visualizations bring algorithms to life. See
                    how they work step-by-step, compare performance metrics, and
                    understand the underlying principles.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="group relative px-6 py-3 rounded-lg font-medium text-sm text-white overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:from-blue-500 group-hover:to-indigo-500 transition-all duration-300"></div>
                      <span className="relative flex items-center gap-2">
                        View All Algorithms
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
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
                    <button
                      className={`relative px-6 py-3 rounded-lg font-medium text-sm overflow-hidden ${
                        isDarkMode ? "text-white" : "text-zinc-800"
                      }`}
                    >
                      <div
                        className={`absolute inset-0 ${
                          isDarkMode
                            ? "bg-zinc-800 hover:bg-zinc-700"
                            : "bg-white hover:bg-zinc-50"
                        } border ${
                          isDarkMode ? "border-zinc-700" : "border-zinc-200"
                        } transition-all duration-300`}
                      ></div>
                      <span className="relative">Start Learning Path</span>
                    </button>
                  </div>
                </div>
                <div className="hidden md:block relative">
                  <div
                    className={`w-64 h-64 rounded-full flex items-center justify-center ${
                      isDarkMode ? "bg-blue-900/10" : "bg-blue-100/50"
                    } border ${
                      isDarkMode ? "border-blue-800/30" : "border-blue-200"
                    }`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={`w-56 h-56 rounded-full ${
                          isDarkMode ? "bg-purple-900/10" : "bg-purple-100/50"
                        } border ${
                          isDarkMode
                            ? "border-purple-800/30"
                            : "border-purple-200"
                        }`}
                      ></div>
                    </div>
                    <div className="relative z-10">
                      <Zap
                        height={24}
                        width={24}
                        className={`w-16 h-16 ${
                          isDarkMode ? "text-blue-400" : "text-blue-600"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Statistics section - New addition */}
      <section
        className={`py-16 ${
          isDarkMode
            ? "bg-gradient-to-br from-zinc-800 to-zinc-900"
            : "bg-gradient-to-br from-zinc-50 to-blue-50"
        }`}
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl font-bold mb-4 ${
                isDarkMode
                  ? "bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent"
              }`}
            >
              Learning by Numbers
            </h2>
            <p
              className={`max-w-2xl mx-auto ${
                isDarkMode ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              Our platform provides a comprehensive learning experience with a
              wide range of algorithms and interactive visualizations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "100+", label: "Algorithms", icon: "database" },
              { number: "50K+", label: "Active Learners", icon: "users" },
              {
                number: "200K+",
                label: "Visualizations Run",
                icon: "bar-chart",
              },
              { number: "4.9/5", label: "User Rating", icon: "star" },
            ].map((stat, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl text-center ${
                  isDarkMode
                    ? "bg-zinc-800/50 border border-zinc-700"
                    : "bg-white/80 border border-zinc-100"
                } shadow-md transition-transform hover:transform hover:scale-105`}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 mb-4 rounded-full flex items-center justify-center ${
                      isDarkMode ? "bg-blue-500/10" : "bg-blue-100"
                    }`}
                  >
                    {stat.icon === "database" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={
                          isDarkMode ? "text-blue-400" : "text-blue-600"
                        }
                      >
                        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                      </svg>
                    )}
                    {stat.icon === "users" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={
                          isDarkMode ? "text-blue-400" : "text-blue-600"
                        }
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    )}
                    {stat.icon === "bar-chart" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={
                          isDarkMode ? "text-blue-400" : "text-blue-600"
                        }
                      >
                        <line x1="12" y1="20" x2="12" y2="10"></line>
                        <line x1="18" y1="20" x2="18" y2="4"></line>
                        <line x1="6" y1="20" x2="6" y2="16"></line>
                      </svg>
                    )}
                    {stat.icon === "star" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={
                          isDarkMode ? "text-blue-400" : "text-blue-600"
                        }
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    )}
                  </div>
                  <h3
                    className={`text-3xl font-bold mb-2 ${
                      isDarkMode
                        ? "bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
                        : "bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent"
                    }`}
                  >
                    {stat.number}
                  </h3>
                  <p className={isDarkMode ? "text-zinc-400" : "text-zinc-600"}>
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials section - New addition */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl font-bold mb-4 ${
                isDarkMode
                  ? "bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent"
              }`}
            >
              What Our Users Say
            </h2>
            <p
              className={`max-w-2xl mx-auto ${
                isDarkMode ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              Hear from students, educators, and developers who use
              AlgoPlayground to enhance their learning and teaching experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "The visualizations helped me understand complex algorithms in ways textbooks never could. It's now my go-to resource for CS studies.",
                name: "Alex Johnson",
                title: "Computer Science Student",
                avatar: "A",
              },
              {
                quote:
                  "I use AlgoPlayground in my algorithm classes. The interactive elements keep students engaged and help visualize abstract concepts.",
                name: "Dr. Rahul Soni",
                title: "CS Professor",
                avatar: "R",
              },
              {
                quote:
                  "As a self-taught developer, this platform filled the gaps in my algorithm knowledge. The step-by-step approach is perfect.",
                name: "Michael Rodriguez",
                title: "Software Engineer",
                avatar: "M",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${
                  isDarkMode
                    ? "bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700"
                    : "bg-gradient-to-br from-white to-zinc-50 border border-zinc-200"
                } shadow-lg transition-transform hover:transform hover:scale-105`}
              >
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={`w-5 h-5 inline-block mr-1 ${
                        isDarkMode ? "text-yellow-400" : "text-yellow-500"
                      }`}
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  ))}
                </div>
                <p
                  className={`italic mb-6 ${
                    isDarkMode ? "text-zinc-300" : "text-zinc-700"
                  }`}
                >
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                      isDarkMode
                        ? "bg-gradient-to-br from-blue-600 to-indigo-600"
                        : "bg-gradient-to-br from-blue-500 to-indigo-500"
                    } text-white font-bold`}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4
                      className={`font-semibold ${
                        isDarkMode ? "text-white" : "text-zinc-800"
                      }`}
                    >
                      {testimonial.name}
                    </h4>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-zinc-400" : "text-zinc-600"
                      }`}
                    >
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter section - New addition */}
      <section className="py-16 relative overflow-hidden">
        {/* Background with animated gradient */}
        <div className="absolute inset-0 z-0">
          <div
            className={`w-full h-full ${
              isDarkMode
                ? "bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-zinc-900"
                : "bg-gradient-to-br from-blue-100 via-indigo-50 to-white"
            }`}
          ></div>

          {/* Decorative elements */}
          <div
            className={`absolute top-0 left-0 w-64 h-64 rounded-full ${
              isDarkMode ? "bg-blue-500/5" : "bg-blue-200/30"
            } blur-3xl`}
          ></div>
          <div
            className={`absolute bottom-0 right-0 w-64 h-64 rounded-full ${
              isDarkMode ? "bg-purple-500/5" : "bg-purple-200/30"
            } blur-3xl`}
          ></div>
        </div>

        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div
            className={`p-10 rounded-2xl ${
              isDarkMode
                ? "bg-zinc-800/80 backdrop-blur-md border border-zinc-700"
                : "bg-white/80 backdrop-blur-md border border-zinc-200"
            } shadow-xl`}
          >
            <div className="text-center mb-8">
              <h2
                className={`text-3xl font-bold mb-4 ${
                  isDarkMode
                    ? "bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent"
                }`}
              >
                Stay Updated
              </h2>
              <p
                className={`max-w-2xl mx-auto ${
                  isDarkMode ? "text-zinc-300" : "text-zinc-700"
                }`}
              >
                Subscribe to our newsletter for the latest algorithm tutorials,
                updates, and learning resources.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className={`flex-1 px-5 py-3 rounded-lg ${
                  isDarkMode
                    ? "bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400"
                    : "bg-white border-zinc-300 text-zinc-800 placeholder:text-zinc-400"
                } border focus:outline-none focus:ring-2 ${
                  isDarkMode ? "focus:ring-blue-500" : "focus:ring-blue-400"
                }`}
              />
              <button className="group relative px-6 py-3 rounded-lg font-medium text-sm text-white overflow-hidden whitespace-nowrap">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:from-blue-500 group-hover:to-indigo-500 transition-all duration-300"></div>
                <span className="relative">Subscribe</span>
              </button>
            </div>

            <p
              className={`text-xs mt-4 text-center ${
                isDarkMode ? "text-zinc-500" : "text-zinc-500"
              }`}
            >
              By subscribing, you agree to our Privacy Policy and Terms of
              Service.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AlgorithmsPage;
