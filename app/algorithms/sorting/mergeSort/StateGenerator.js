// export const generateStates = (arr) => {
//   const states = [];
//   const array = [...arr];
//   // Initialize depths array with all elements at depth 0
//   const elementDepths = Array(array.length).fill(0);

//   // Helper function to add a state
//   const addState = (action, description, additionalData = {}) => {
//     states.push({
//       array: [...array],
//       elementDepths: [...elementDepths],
//       action,
//       description,
//       ...additionalData,
//     });
//   };

//   const mergeSort = (array, left, right, depth = 0) => {
//     // Base case: single element (already sorted)
//     if (left >= right) {
//       addState("single", "this element is single");
//       return;
//     }

//     const mid = Math.floor((left + right) / 2);

//     // Add a state showing the current array before splitting
//     addState(
//       "split",
//       `Splitting array from index ${left} to ${right} into two halves.`,
//       { left, right, depth, activeRegion: { start: left, end: right } }
//     );

//     // FIRST: Process left half

//     // Increase depth for left half elements
//     for (let i = left; i <= mid; i++) {
//       elementDepths[i] = depth + 1;
//     }

//     // Add a state after updating depths for left half
//     addState(
//       "depth-left-half",
//       `Increased depth for left half elements from index ${left} to ${mid}.`,
//       { left, mid, right, depth, activeRegion: { start: left, end: mid } }
//     );

//     // Recursively sort left half (deeper level)
//     mergeSort(array, left, mid, depth + 1);

//     // After left recursion completes, now process right half

//     // Increase depth for right half elements
//     for (let i = mid + 1; i <= right; i++) {
//       elementDepths[i] = depth + 1;
//     }

//     // Add a state after updating depths for right half
//     addState(
//       "depth-right-half",
//       `Increased depth for right half elements from index ${
//         mid + 1
//       } to ${right}.`,
//       { left, mid, right, depth, activeRegion: { start: mid + 1, end: right } }
//     );

//     // Recursively sort right half (deeper level)
//     mergeSort(array, mid + 1, right, depth + 1);

//     // Both halves are now sorted at deeper level
//     // Proceed to merge them and bring result to current depth

//     addState(
//       "merge-start",
//       `Merging sorted halves from index ${left} to ${right}.`,
//       { left, mid, right, depth, activeRegion: { start: left, end: right } }
//     );

//     // Merge the sorted halves
//     merge(array, left, mid, right, depth);
//   };

//   const merge = (array, left, mid, right, depth) => {
//     // Create temporary arrays for the two halves
//     const leftArr = array.slice(left, mid + 1);
//     const rightArr = array.slice(mid + 1, right + 1);

//     // Create a working copy of the array
//     const workingArray = [...array];

//     let i = 0, // index for leftArr
//       j = 0, // index for rightArr
//       k = left; // index for main array

//     // Compare and merge elements
//     while (i < leftArr.length && j < rightArr.length) {
//       // Visualize comparison
//       const leftIndex = left + i;
//       const rightIndex = mid + 1 + j;

//       addState(
//         "compare",
//         `Comparing ${leftArr[i]} from left half and ${rightArr[j]} from right half.`,
//         {
//           left,
//           mid,
//           right,
//           depth,
//           compareIndices: [leftIndex, rightIndex],
//           activeRegion: { start: left, end: right },
//         }
//       );

//       // Place the smaller element
//       if (leftArr[i] <= rightArr[j]) {
//         workingArray[k] = leftArr[i];
//         // Reduce depth as we merge back to current level
//         elementDepths[k] = depth;

//         addState(
//           "place",
//           `Placing ${leftArr[i]} at position ${k} with depth ${depth}.`,
//           {
//             left,
//             mid,
//             right,
//             depth,
//             array: [...workingArray],
//             placeIndex: k,
//             activeRegion: { start: left, end: right },
//           }
//         );

//         i++;
//       } else {
//         workingArray[k] = rightArr[j];
//         // Reduce depth as we merge back to current level
//         elementDepths[k] = depth;

//         addState(
//           "place",
//           `Placing ${rightArr[j]} at position ${k} with depth ${depth}.`,
//           {
//             left,
//             mid,
//             right,
//             depth,
//             array: [...workingArray],
//             placeIndex: k,
//             activeRegion: { start: left, end: right },
//           }
//         );

//         j++;
//       }
//       k++;
//     }

//     // Copy remaining elements from left array
//     while (i < leftArr.length) {
//       workingArray[k] = leftArr[i];
//       elementDepths[k] = depth;

//       addState(
//         "append-left",
//         `Appending remaining element ${leftArr[i]} from left half with depth ${depth}.`,
//         {
//           left,
//           mid,
//           right,
//           depth,
//           array: [...workingArray],
//           placeIndex: k,
//           activeRegion: { start: left, end: right },
//         }
//       );

//       i++;
//       k++;
//     }

//     // Copy remaining elements from right array
//     while (j < rightArr.length) {
//       workingArray[k] = rightArr[j];
//       elementDepths[k] = depth;

//       addState(
//         "append-right",
//         `Appending remaining element ${rightArr[j]} from right half with depth ${depth}.`,
//         {
//           left,
//           mid,
//           right,
//           depth,
//           array: [...workingArray],
//           placeIndex: k,
//           activeRegion: { start: left, end: right },
//         }
//       );

//       j++;
//       k++;
//     }

//     // Update the main array with merged result
//     for (let i = left; i <= right; i++) {
//       array[i] = workingArray[i];
//     }

//     // Add a state for completed merge
//     addState(
//       "sorted-subarray",
//       `Subarray from index ${left} to ${right} is now sorted at depth ${depth}!`,
//       {
//         left,
//         mid,
//         right,
//         depth,
//         completedRange: { start: left, end: right },
//         activeRegion: { start: left, end: right },
//       }
//     );
//   };

//   // Initial state
//   addState("start", "Starting Merge Sort... Let's divide and conquer!", {
//     activeRegion: { start: 0, end: array.length - 1 },
//   });

//   // Begin the sorting
//   mergeSort(array, 0, array.length - 1);

//   // Final state
//   addState("complete", "Merge Sort completed! 🎉", {
//     completedRange: { start: 0, end: array.length - 1 },
//     activeRegion: { start: 0, end: array.length - 1 },
//   });

//   return states;
// };

// 666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
//FIXME: //TODO:

export const generateStates = (arr) => {
  const states = [];
  const array = [...arr];
  const numLayers = Math.floor(Math.log2(array.length)) + 2;

  // Initialize depths array with all elements at depth 0
  const elementDepths = Array(array.length).fill(0);

  // Create a depth matrix to track elements at each depth
  // Matrix[depth][position] = value or null
  const createEmptyMatrix = () => {
    const matrix = [];
    for (let i = 0; i < numLayers; i++) {
      matrix.push(Array(array.length).fill(null));
    }
    return matrix;
  };

  // Initialize matrix with all elements at depth 0
  let depthMatrix = createEmptyMatrix();
  for (let i = 0; i < array.length; i++) {
    depthMatrix[0][i] = array[i];
  }

  // Track the original positions of elements as they move
  let elementPositionTracker = Array(array.length)
    .fill(0)
    .map((_, i) => i);

  // Helper function to add a state
  const addState = (action, description, additionalData = {}) => {
    // Create a deep copy of the matrix for this state
    const matrixCopy = depthMatrix.map((row) => [...row]);

    // Track any transitions (elements moving between depths)
    const transitions = [];

    // If we're updating the matrix, calculate transitions
    if (additionalData.newMatrix) {
      for (let depth = 0; depth < numLayers; depth++) {
        for (let pos = 0; pos < array.length; pos++) {
          // If value changed at this position and depth
          if (
            depthMatrix[depth][pos] !== additionalData.newMatrix[depth][pos]
          ) {
            // If value was removed (became null)
            if (
              additionalData.newMatrix[depth][pos] === null &&
              depthMatrix[depth][pos] !== null
            ) {
              transitions.push({
                value: depthMatrix[depth][pos],
                fromDepth: depth,
                fromPosition: pos,
                toDepth: null,
                toPosition: null,
                type: "remove",
              });
            }
            // If value was added (was null before)
            else if (
              depthMatrix[depth][pos] === null &&
              additionalData.newMatrix[depth][pos] !== null
            ) {
              transitions.push({
                value: additionalData.newMatrix[depth][pos],
                fromDepth: null,
                fromPosition: null,
                toDepth: depth,
                toPosition: pos,
                type: "add",
              });
            }
          }
        }
      }

      // Find movements (when an element disappears from one spot and appears in another)
      const removals = transitions.filter((t) => t.type === "remove");
      const additions = transitions.filter((t) => t.type === "add");

      for (const removal of removals) {
        for (const addition of additions) {
          if (removal.value === addition.value) {
            // This is a movement, not just a removal and addition
            transitions.push({
              value: removal.value,
              fromDepth: removal.fromDepth,
              fromPosition: removal.fromPosition,
              toDepth: addition.toDepth,
              toPosition: addition.toPosition,
              type: "move",
            });
            // Mark these as processed
            removal.processed = true;
            addition.processed = true;
          }
        }
      }

      // Update the matrix
      depthMatrix = additionalData.newMatrix;
    }

    states.push({
      array: [...array],
      elementDepths: [...elementDepths],
      depthMatrix: matrixCopy,
      transitions: transitions.filter((t) => !t.processed), // Only include unprocessed transitions
      elementPositions: [...elementPositionTracker],
      action,
      description,
      ...additionalData,
    });
  };

  const mergeSort = (array, left, right, depth = 0) => {
    // Base case: single element (already sorted)
    if (left >= right) {
      addState("single", "This element is already sorted");
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
    // Create a new matrix to track changes
    const newMatrixLeft = depthMatrix.map((row) => [...row]);

    // Move elements from current depth to depth+1
    for (let i = left; i <= mid; i++) {
      // Record value at current depth
      const value = newMatrixLeft[depth][i];
      if (value !== null) {
        // Move to deeper level
        newMatrixLeft[depth][i] = null;
        newMatrixLeft[depth + 1][i] = value;

        // Update element depths array too
        elementDepths[i] = depth + 1;
      }
    }

    // Add a state after updating depths for left half
    addState(
      "depth-left-half",
      `Increased depth for left half elements from index ${left} to ${mid}.`,
      {
        left,
        mid,
        right,
        depth,
        activeRegion: { start: left, end: mid },
        newMatrix: newMatrixLeft,
      }
    );

    // Recursively sort left half (deeper level)
    mergeSort(array, left, mid, depth + 1);

    // After left recursion completes, now process right half
    // Create a new matrix to track changes
    const newMatrixRight = depthMatrix.map((row) => [...row]);

    // Increase depth for right half elements
    for (let i = mid + 1; i <= right; i++) {
      // Record value at current depth
      const value = newMatrixRight[depth][i];
      if (value !== null) {
        // Move to deeper level
        newMatrixRight[depth][i] = null;
        newMatrixRight[depth + 1][i] = value;

        // Update element depths array too
        elementDepths[i] = depth + 1;
      }
    }

    // Add a state after updating depths for right half
    addState(
      "depth-right-half",
      `Increased depth for right half elements from index ${
        mid + 1
      } to ${right}.`,
      {
        left,
        mid,
        right,
        depth,
        activeRegion: { start: mid + 1, end: right },
        newMatrix: newMatrixRight,
      }
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

    // Save the original positions before merging
    const originalPositions = elementPositionTracker.slice(left, right + 1);

    // Create a working copy of the array
    const workingArray = [...array];
    const workingPositions = [...elementPositionTracker];

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

      // Create a new matrix for this step
      const newMatrix = depthMatrix.map((row) => [...row]);

      // Place the smaller element
      if (leftArr[i] <= rightArr[j]) {
        workingArray[k] = leftArr[i];
        // Track where this element came from
        workingPositions[k] = elementPositionTracker[left + i];

        // Update matrix - move from depth+1 to depth
        const value = leftArr[i];
        const originalPos = left + i;

        // Find this value in the matrix at depth+1
        for (let p = 0; p < array.length; p++) {
          if (newMatrix[depth + 1][p] === value) {
            // Remove from depth+1
            newMatrix[depth + 1][p] = null;
            break;
          }
        }
        // Add to depth at new position
        newMatrix[depth][k] = value;

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
            elementPositions: [...workingPositions],
            placeIndex: k,
            activeRegion: { start: left, end: right },
            newMatrix,
          }
        );

        i++;
      } else {
        workingArray[k] = rightArr[j];
        // Track where this element came from
        workingPositions[k] = elementPositionTracker[mid + 1 + j];

        // Update matrix - move from depth+1 to depth
        const value = rightArr[j];
        const originalPos = mid + 1 + j;

        // Find this value in the matrix at depth+1
        for (let p = 0; p < array.length; p++) {
          if (newMatrix[depth + 1][p] === value) {
            // Remove from depth+1
            newMatrix[depth + 1][p] = null;
            break;
          }
        }
        // Add to depth at new position
        newMatrix[depth][k] = value;

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
            elementPositions: [...workingPositions],
            placeIndex: k,
            activeRegion: { start: left, end: right },
            newMatrix,
          }
        );

        j++;
      }
      k++;
    }

    // Process remaining elements from left and right arrays
    // Similar pattern as above but for remaining elements...
    // (code for remaining elements follows same pattern with matrix updates)

    // Copy remaining elements from left array
    while (i < leftArr.length) {
      const newMatrix = depthMatrix.map((row) => [...row]);

      workingArray[k] = leftArr[i];
      workingPositions[k] = elementPositionTracker[left + i];

      // Update matrix - move from depth+1 to depth
      const value = leftArr[i];

      // Find this value in the matrix at depth+1
      for (let p = 0; p < array.length; p++) {
        if (newMatrix[depth + 1][p] === value) {
          // Remove from depth+1
          newMatrix[depth + 1][p] = null;
          break;
        }
      }
      // Add to depth at new position
      newMatrix[depth][k] = value;

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
          elementPositions: [...workingPositions],
          placeIndex: k,
          activeRegion: { start: left, end: right },
          newMatrix,
        }
      );

      i++;
      k++;
    }

    // Copy remaining elements from right array
    while (j < rightArr.length) {
      const newMatrix = depthMatrix.map((row) => [...row]);

      workingArray[k] = rightArr[j];
      workingPositions[k] = elementPositionTracker[mid + 1 + j];

      // Update matrix - move from depth+1 to depth
      const value = rightArr[j];

      // Find this value in the matrix at depth+1
      for (let p = 0; p < array.length; p++) {
        if (newMatrix[depth + 1][p] === value) {
          // Remove from depth+1
          newMatrix[depth + 1][p] = null;
          break;
        }
      }
      // Add to depth at new position
      newMatrix[depth][k] = value;

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
          elementPositions: [...workingPositions],
          placeIndex: k,
          activeRegion: { start: left, end: right },
          newMatrix,
        }
      );

      j++;
      k++;
    }

    // Update the main array and position tracker with merged result
    for (let i = left; i <= right; i++) {
      array[i] = workingArray[i];
      elementPositionTracker[i] = workingPositions[i];
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
