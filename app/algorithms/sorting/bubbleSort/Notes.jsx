import React, { useState } from "react";

const Notes = () => {
  const [notesOpen, setNotesOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  const toggleDropdown = (type) => {
    if (type === "notes") {
      setNotesOpen(!notesOpen);
    } else if (type === "video") {
      setVideoOpen(!videoOpen);
    }
  };

  return (
    <div className="bg-gradient-to-br from-zinc-100 to-zinc-200 text-zinc-800 min-h-screen">
      <div className="max-w-5xl mx-auto p-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-xl shadow-lg flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-800 font-bold">
              B
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              BUBBLE SORT NOTES
            </h1>
          </div>
          <button
            onClick={() => window.history.back()}
            className="bg-white text-blue-800 px-5 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium shadow-md"
          >
            Back
          </button>
        </div>

        {/* Introduction */}
        <div className="mt-8 p-6 bg-white rounded-xl shadow-md border border-zinc-100">
          <h2 className="text-xl font-bold text-blue-800">
            What is Bubble Sort?
          </h2>
          <p className="mt-3 text-zinc-700 leading-relaxed">
            Bubble Sort is the simplest sorting algorithm that works by
            repeatedly swapping the adjacent elements if they are in the wrong
            order. This algorithm is not suitable for large data sets as its
            average and worst-case time complexity are quite high.
          </p>
        </div>

        {/* Working of Bubble Sort */}
        <div className="mt-8 p-6 bg-white rounded-xl shadow-md border border-zinc-100">
          <h2 className="text-xl font-bold text-blue-800">How does it work?</h2>
          <p className="mt-3 text-zinc-700 leading-relaxed">
            Bubble Sort works by repeatedly swapping adjacent elements if they
            are in the wrong order. The largest element bubbles up to the right
            in each pass.
          </p>

          {/* Notes Dropdown */}
          <div className="mt-6">
            <button
              onClick={() => toggleDropdown("notes")}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-left px-6 py-3 rounded-lg shadow-md flex justify-between items-center focus:outline-none transition-all duration-200"
            >
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                <span className="font-semibold tracking-wide">
                  STEP-BY-STEP NOTES
                </span>
              </div>
              <span
                className={`transform transition-transform duration-300 ${
                  notesOpen ? "rotate-90" : "rotate-0"
                }`}
              >
                ⮞
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 bg-zinc-50 rounded-lg shadow-inner mt-1 ${
                notesOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-6">
                {[1, 2, 3, 4, 5].map((iteration) => (
                  <div key={iteration} className="mb-8 last:mb-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                        {iteration}
                      </div>
                      <p className="text-lg text-blue-800 font-bold">
                        Iteration {iteration}
                      </p>
                    </div>
                    <div className="mt-3 p-4 bg-white rounded-lg shadow-md border border-zinc-100">
                      <img
                        src={`/img/bubblesort/iteration-${iteration}.png`}
                        alt={`Bubble Sort Iteration ${iteration}`}
                        className="w-full rounded-lg shadow-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Video Dropdown */}
          <div className="mt-6">
            <button
              onClick={() => toggleDropdown("video")}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-left px-6 py-3 rounded-lg shadow-md flex justify-between items-center focus:outline-none transition-all duration-200"
            >
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
                <span className="font-semibold tracking-wide">
                  VIDEO EXPLANATION
                </span>
              </div>
              <span
                className={`transform transition-transform duration-300 ${
                  videoOpen ? "rotate-90" : "rotate-0"
                }`}
              >
                ⮞
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 bg-zinc-50 rounded-lg shadow-inner mt-1 ${
                videoOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-6">
                <div className="flex justify-center">
                  <div className="relative w-full aspect-video bg-black rounded-lg shadow-xl overflow-hidden">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src="https://www.youtube.com/embed/HGk_ypEuS24"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Complexity Analysis */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl shadow-md border border-zinc-100">
            <h2 className="text-xl font-bold text-blue-800 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Time Complexity
            </h2>
            <ul className="mt-4 space-y-2 text-zinc-700">
              <li className="flex items-center">
                <span className="w-24 font-medium">Best Case:</span>
                <span className="font-mono bg-blue-50 text-blue-600 px-2 py-1 rounded">
                  O(n)
                </span>
              </li>
              <li className="flex items-center">
                <span className="w-24 font-medium">Average:</span>
                <span className="font-mono bg-blue-50 text-blue-600 px-2 py-1 rounded">
                  O(n²)
                </span>
              </li>
              <li className="flex items-center">
                <span className="w-24 font-medium">Worst Case:</span>
                <span className="font-mono bg-blue-50 text-blue-600 px-2 py-1 rounded">
                  O(n²)
                </span>
              </li>
              <li className="flex items-center">
                <span className="w-24 font-medium">Space:</span>
                <span className="font-mono bg-blue-50 text-blue-600 px-2 py-1 rounded">
                  O(1)
                </span>
              </li>
            </ul>
          </div>

          {/* Advantages */}
          <div className="p-6 bg-white rounded-xl shadow-md border border-zinc-100">
            <h2 className="text-xl font-bold text-green-700 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Advantages
            </h2>
            <ul className="mt-4 space-y-3 text-zinc-700">
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Easy to understand and implement</span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>No additional memory space required</span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Stable sorting algorithm (maintains relative order)</span>
              </li>
            </ul>
          </div>

          {/* Disadvantages */}
          <div className="p-6 bg-white rounded-xl shadow-md border border-zinc-100">
            <h2 className="text-xl font-bold text-red-700 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Disadvantages
            </h2>
            <ul className="mt-4 space-y-3 text-zinc-700">
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-red-500 mr-2 mt-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  Very slow for large data sets (O(n²) time complexity)
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-red-500 mr-2 mt-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  Limited real-world applications (mostly used for educational
                  purposes)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Code Implementation */}
        <div className="mt-8 p-6 bg-white rounded-xl shadow-md border border-zinc-100">
          <h2 className="text-xl font-bold text-blue-800 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
            Implementation
          </h2>
          <div className="mt-4 bg-zinc-900 text-white p-5 rounded-lg overflow-x-auto">
            <pre className="font-mono text-sm">
              <code>{`function bubbleSort(arr) {
  const n = arr.length;
  
  // Optimize - if we go through a pass without any swaps, the array is sorted
  let swapped;
  
  for (let i = 0; i < n - 1; i++) {
    swapped = false;
    
    // Last i elements are already in place
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap them if they are in wrong order
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    
    // If no swapping occurred in this pass, array is sorted
    if (!swapped) break;
  }
  
  return arr;
}`}</code>
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-zinc-500 text-sm">
          <p>© 2025 AlgoPlayground • All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Notes;
