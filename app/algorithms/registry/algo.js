// // Registry of all algorithms using objects instead of arrays

import dynamic from "next/dynamic";

// Static import for frequently used components
import BubbleSort from "../sorting/bubbleSort/BubbleSort";

export const algorithms = {
  Sorting: {
    bubble: {
      id: "bubble",
      name: "Bubble Sort",
      category: "Sorting",
      component: BubbleSort, // Statically imported
    },
    selection: {
      id: "selection",
      name: "Selection Sort",
      category: "Sorting",
      component: dynamic(
        () => import("../sorting/selectionSort/SelectionSort"),
        { ssr: false }
      ), //  Dynamically imported
    },
    // quick: {
    //   id: "quick",
    //   name: "Quick Sort",
    //   category: "Sorting",
    //   component: dynamic(() => import("../sorting/quickSort/QuickSort"), {
    //     ssr: false,
    //   }), //  Dynamically imported
    // },
  },
};
