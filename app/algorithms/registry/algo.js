// Registry of all algorithms using objects instead of arrays

export const algorithms = {
  Sorting: {
    bubble: {
      id: "bubble",
      name: "Bubble Sort",
    },
    selection: {
      id: "selection",
      name: "Selection Sort",
    },
    insertion: {
      id: "insertion",
      name: "Insertion Sort",
    },
    quick: {
      id: "quick",
      name: "Quick Sort",
    },
    merge: {
      id: "merge",
      name: "Merge Sort",
    },
  },
  Searching: {
    linear: {
      id: "linear",
      name: "Linear Search",
    },
    binary: {
      id: "binary",
      name: "Binary Search",
    },
  },
};

export const algorithmCardData = {
  Sorting: {
    name: "Sorting",
    background: "from-blue-100 via-blue-400 to-blue-600",
    button: "from-blue-600 from-blue-300",
    image: "sorting_img.png",
  },
  Searching: {
    name: "Searching",
    background: "from-purple-200 to-indigo-600",
    image: "searching_img.png",
    button: "from-indigo-700 to-indigo-400",
  },
  Graph: {
    name: "Graph",
    background: "from-green-50 via-green-300 to-green-600",
    button: "from-green-600 to-green-400",
    image: "graph_img.png",
  },
  // "Dynamic Programming": {
  //   background: "from-orange-500 to-amber-400",
  // },
};
