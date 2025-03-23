// export const generateStates = (arr) => {
//   const states = [];
//   const array = [...arr];

//   const mergeSort = (array, left, right) => {
//     if (left >= right) return;

//     const mid = Math.floor((left + right) / 2);

//     // Add a state showing the splitting action
//     states.push({
//       array: [...array],
//       left,
//       right,
//       mid,
//       action: "split",
//       description: `Splitting array from index ${left} to ${right} into two halves.`,
//     });

//     // Sort left half
//     mergeSort(array, left, mid);

//     // Add a state for the left half sorting
//     states.push({
//       array: [...array],
//       left,
//       mid,
//       right: mid, // Set right to mid for visualization purposes
//       action: "sort-left",
//       description: `Sorting the left half: index ${left} to ${mid}.`,
//     });

//     // Sort right half
//     mergeSort(array, mid + 1, right);

//     // Add a state for the right half sorting
//     states.push({
//       array: [...array],
//       left: mid + 1,
//       right,
//       mid: right, // Set mid to right for visualization purposes
//       action: "sort-right",
//       description: `Sorting the right half: index ${mid + 1} to ${right}.`,
//     });

//     // Merge the sorted halves
//     merge(array, left, mid, right);
//   };

//   const merge = (array, left, mid, right) => {
//     // Create a temporary copy of the subarray
//     const leftArr = array.slice(left, mid + 1);
//     const rightArr = array.slice(mid + 1, right + 1);

//     // Add a state for starting the merge
//     states.push({
//       array: [...array],
//       left,
//       mid,
//       right,
//       action: "merge-start",
//       description: `Merging sorted halves from index ${left} to ${right}.`,
//     });

//     let i = 0,
//       j = 0,
//       k = left;

//     // Compare and merge elements from both subarrays
//     while (i < leftArr.length && j < rightArr.length) {
//       // Visualize comparison between elements
//       const leftIndex = left + i;
//       const rightIndex = mid + 1 + j;

//       states.push({
//         array: [...array],
//         left,
//         mid,
//         right,
//         compareIndices: [leftIndex, rightIndex],
//         action: "compare",
//         description: `Comparing ${leftArr[i]} and ${rightArr[j]}.`,
//       });

//       // Pick the smaller element
//       if (leftArr[i] <= rightArr[j]) {
//         array[k] = leftArr[i];

//         // Visualize placing the element
//         states.push({
//           array: [...array],
//           left,
//           mid,
//           right,
//           placeIndex: k,
//           action: "place",
//           description: `Placing ${leftArr[i]} at position ${k}.`,
//         });

//         i++;
//       } else {
//         array[k] = rightArr[j];

//         // Visualize placing the element
//         states.push({
//           array: [...array],
//           left,
//           mid,
//           right,
//           placeIndex: k,
//           action: "place",
//           description: `Placing ${rightArr[j]} at position ${k}.`,
//         });

//         j++;
//       }

//       k++;
//     }

//     // Copy any remaining elements from left subarray
//     while (i < leftArr.length) {
//       array[k] = leftArr[i];

//       states.push({
//         array: [...array],
//         left,
//         mid,
//         right,
//         placeIndex: k,
//         action: "append-left",
//         description: `Appending remaining element ${leftArr[i]} from left half.`,
//       });

//       i++;
//       k++;
//     }

//     // Copy any remaining elements from right subarray
//     while (j < rightArr.length) {
//       array[k] = rightArr[j];

//       states.push({
//         array: [...array],
//         left,
//         mid,
//         right,
//         placeIndex: k,
//         action: "append-right",
//         description: `Appending remaining element ${rightArr[j]} from right half.`,
//       });

//       j++;
//       k++;
//     }

//     // Add a state for the completed merge
//     states.push({
//       array: [...array],
//       left,
//       mid,
//       right,
//       action: "sorted-subarray",
//       description: `Subarray from index ${left} to ${right} is now sorted!`,
//     });
//   };

//   // Initial state - all elements as bars at the bottom
//   states.push({
//     array: [...array],
//     action: "start",
//     description: "Starting Merge Sort... Let's divide and conquer!",
//   });

//   // Begin the sorting
//   mergeSort(array, 0, array.length - 1);

//   // Final state - all elements as bars at the bottom
//   states.push({
//     array: [...array],
//     action: "complete",
//     description: "Merge Sort completed! 🎉",
//   });

//   return states;
// };

export const generateStates = (arr) => {
  const states = [];
  const array = [...arr];
  // Initialize depths array with all elements at depth 0
  const elementDepths = Array(array.length).fill(0);

  // Helper function to add a state
  const addState = (action, description, additionalData = {}) => {
    states.push({
      array: [...array],
      elementDepths: [...elementDepths],
      action,
      description,
      ...additionalData,
    });
  };

  const mergeSort = (array, left, right, depth = 0) => {
    // Base case: single element (already sorted)
    if (left >= right) {
      addState("single", "this element is single");
      return;
    }

    const mid = Math.floor((left + right) / 2);

    // Add a state showing the current array before splitting
    addState(
      "split",
      `Splitting array from index ${left} to ${right} into two halves.`,
      { left, right, depth, activeRegion: { start: left, end: right } }
    );

    // FIRST: Process left half

    // Increase depth for left half elements
    for (let i = left; i <= mid; i++) {
      elementDepths[i] = depth + 1;
    }

    // Add a state after updating depths for left half
    addState(
      "depth-left-half",
      `Increased depth for left half elements from index ${left} to ${mid}.`,
      { left, mid, right, depth, activeRegion: { start: left, end: mid } }
    );

    // Recursively sort left half (deeper level)
    mergeSort(array, left, mid, depth + 1);

    // After left recursion completes, now process right half

    // Increase depth for right half elements
    for (let i = mid + 1; i <= right; i++) {
      elementDepths[i] = depth + 1;
    }

    // Add a state after updating depths for right half
    addState(
      "depth-right-half",
      `Increased depth for right half elements from index ${
        mid + 1
      } to ${right}.`,
      { left, mid, right, depth, activeRegion: { start: mid + 1, end: right } }
    );

    // Recursively sort right half (deeper level)
    mergeSort(array, mid + 1, right, depth + 1);

    // Both halves are now sorted at deeper level
    // Proceed to merge them and bring result to current depth

    addState(
      "merge-start",
      `Merging sorted halves from index ${left} to ${right}.`,
      { left, mid, right, depth, activeRegion: { start: left, end: right } }
    );

    // Merge the sorted halves
    merge(array, left, mid, right, depth);
  };

  const merge = (array, left, mid, right, depth) => {
    // Create temporary arrays for the two halves
    const leftArr = array.slice(left, mid + 1);
    const rightArr = array.slice(mid + 1, right + 1);

    // Create a working copy of the array
    const workingArray = [...array];

    let i = 0, // index for leftArr
      j = 0, // index for rightArr
      k = left; // index for main array

    // Compare and merge elements
    while (i < leftArr.length && j < rightArr.length) {
      // Visualize comparison
      const leftIndex = left + i;
      const rightIndex = mid + 1 + j;

      addState(
        "compare",
        `Comparing ${leftArr[i]} from left half and ${rightArr[j]} from right half.`,
        {
          left,
          mid,
          right,
          depth,
          compareIndices: [leftIndex, rightIndex],
          activeRegion: { start: left, end: right },
        }
      );

      // Place the smaller element
      if (leftArr[i] <= rightArr[j]) {
        workingArray[k] = leftArr[i];
        // Reduce depth as we merge back to current level
        elementDepths[k] = depth;

        addState(
          "place",
          `Placing ${leftArr[i]} at position ${k} with depth ${depth}.`,
          {
            left,
            mid,
            right,
            depth,
            array: [...workingArray],
            placeIndex: k,
            activeRegion: { start: left, end: right },
          }
        );

        i++;
      } else {
        workingArray[k] = rightArr[j];
        // Reduce depth as we merge back to current level
        elementDepths[k] = depth;

        addState(
          "place",
          `Placing ${rightArr[j]} at position ${k} with depth ${depth}.`,
          {
            left,
            mid,
            right,
            depth,
            array: [...workingArray],
            placeIndex: k,
            activeRegion: { start: left, end: right },
          }
        );

        j++;
      }
      k++;
    }

    // Copy remaining elements from left array
    while (i < leftArr.length) {
      workingArray[k] = leftArr[i];
      elementDepths[k] = depth;

      addState(
        "append-left",
        `Appending remaining element ${leftArr[i]} from left half with depth ${depth}.`,
        {
          left,
          mid,
          right,
          depth,
          array: [...workingArray],
          placeIndex: k,
          activeRegion: { start: left, end: right },
        }
      );

      i++;
      k++;
    }

    // Copy remaining elements from right array
    while (j < rightArr.length) {
      workingArray[k] = rightArr[j];
      elementDepths[k] = depth;

      addState(
        "append-right",
        `Appending remaining element ${rightArr[j]} from right half with depth ${depth}.`,
        {
          left,
          mid,
          right,
          depth,
          array: [...workingArray],
          placeIndex: k,
          activeRegion: { start: left, end: right },
        }
      );

      j++;
      k++;
    }

    // Update the main array with merged result
    for (let i = left; i <= right; i++) {
      array[i] = workingArray[i];
    }

    // Add a state for completed merge
    addState(
      "sorted-subarray",
      `Subarray from index ${left} to ${right} is now sorted at depth ${depth}!`,
      {
        left,
        mid,
        right,
        depth,
        completedRange: { start: left, end: right },
        activeRegion: { start: left, end: right },
      }
    );
  };

  // Initial state
  addState("start", "Starting Merge Sort... Let's divide and conquer!", {
    activeRegion: { start: 0, end: array.length - 1 },
  });

  // Begin the sorting
  mergeSort(array, 0, array.length - 1);

  // Final state
  addState("complete", "Merge Sort completed! 🎉", {
    completedRange: { start: 0, end: array.length - 1 },
    activeRegion: { start: 0, end: array.length - 1 },
  });

  return states;
};
