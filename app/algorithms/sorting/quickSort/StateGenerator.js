export const generateStates = (arr) => {
  const states = [];
  const array = [...arr];
  // Track which positions are correctly sorted
  const correctPositions = new Array(array.length).fill(false);

  const quickSort = (low, high) => {
    // Handle case when subarray has only one element (or is empty)
    if (low >= high) {
      // If only one element is left, it's already in correct position
      if (low === high) {
        correctPositions[low] = true;

        // Add state for single element subarray
        states.push({
          array: [...array],
          low,
          high,
          correctPositions: [...correctPositions],
          action: "single-element",
          description: `Element ${array[low]} at index ${low} is already in its correct position (subarray of size 1)`,
        });
      }
      return;
    }

    // Choose pivot state
    states.push({
      array: [...array],
      low,
      high,
      pivotIndex: high, // Use index for pivot instead of value
      pivotValue: array[high], // Keep value for descriptive purposes
      correctPositions: [...correctPositions], // Add array of correct positions
      action: "choose-pivot",
      description: `Step 1: Choose a pivot element - we're using ${array[high]} (the last element)`,
    });

    let pi = partition(low, high);

    // Mark the pivot position as correctly sorted
    correctPositions[pi] = true;

    // Pivot placed state
    states.push({
      array: [...array],
      low,
      high,
      pivotIndex: pi,
      pivotValue: array[pi],
      correctPositions: [...correctPositions],
      action: "pivot-placed",
      description: `Great! Pivot ${array[pi]} is now in its final sorted position (index ${pi})`,
    });

    // Sort left half state
    states.push({
      array: [...array],
      low,
      high: pi - 1,
      pivotIndex: pi,
      correctPositions: [...correctPositions],
      action: "sort-left",
      description: `Next, we'll sort the left side (elements smaller than ${array[pi]})`,
    });
    quickSort(low, pi - 1);

    // Sort right half state
    states.push({
      array: [...array],
      low: pi + 1,
      high,
      pivotIndex: pi,
      correctPositions: [...correctPositions],
      action: "sort-right",
      description: `Now we'll sort the right side (elements larger than ${array[pi]})`,
    });
    quickSort(pi + 1, high);
  };

  const partition = (low, high) => {
    let pivotValue = array[high];
    let i = low - 1;

    // Partition start state
    states.push({
      array: [...array],
      low,
      high,
      pivotIndex: high,
      pivotValue,
      correctPositions: [...correctPositions],
      action: "partition-start",
      description: `Starting partition: We'll arrange elements so smaller values go left of pivot ${pivotValue} and larger values go right`,
    });

    for (let j = low; j < high; j++) {
      // Compare state
      states.push({
        array: [...array],
        i,
        j,
        pivotIndex: high,
        pivotValue,
        correctPositions: [...correctPositions],
        action: "compare",
        description: `Comparing element ${array[j]} with pivot ${pivotValue}. Is ${array[j]} < ${pivotValue}?`,
      });

      if (array[j] < pivotValue) {
        i++;

        // Prepare to swap state
        if (i !== j) {
          states.push({
            array: [...array],
            i,
            j,
            pivotIndex: high,
            pivotValue,
            correctPositions: [...correctPositions],
            action: "swap-prepare",
            description: `${array[j]} is smaller than pivot! Moving it to the left side (swapping with position ${i})`,
          });
        } else {
          states.push({
            array: [...array],
            i,
            j,
            pivotIndex: high,
            pivotValue,
            correctPositions: [...correctPositions],
            action: "swap-prepare",
            description: `${array[j]} is smaller than pivot! It's already in the correct region (position ${i})`,
          });
        }

        [array[i], array[j]] = [array[j], array[i]];

        // Swap state
        states.push({
          array: [...array],
          i,
          j,
          pivotIndex: high,
          pivotValue,
          correctPositions: [...correctPositions],
          action: "swap",
          description: `Swapped ${array[i]} and ${array[j]} to keep smaller elements on the left`,
        });
      } else {
        // No swap needed state
        states.push({
          array: [...array],
          i,
          j,
          pivotIndex: high,
          pivotValue,
          correctPositions: [...correctPositions],
          action: "no-swap",
          description: `${array[j]} is NOT smaller than pivot ${pivotValue}, so we leave it where it is`,
        });
      }
    }

    // Prepare for final pivot swap
    states.push({
      array: [...array],
      i: i + 1,
      high,
      pivotIndex: high,
      pivotValue,
      correctPositions: [...correctPositions],
      action: "pivot-swap-prepare",
      description: `Now we'll place the pivot ${pivotValue} in its correct position (between smaller and larger elements)`,
    });

    [array[i + 1], array[high]] = [array[high], array[i + 1]];

    // Final pivot position state
    states.push({
      array: [...array],
      i: i + 1,
      high,
      pivotIndex: i + 1, // Update pivot index to new position
      pivotValue,
      correctPositions: [...correctPositions],
      action: "pivot-placed",
      description: `Placed pivot ${pivotValue} at index ${
        i + 1
      }. All elements to the left are smaller, all to the right are larger!`,
    });

    return i + 1;
  };

  // Initial state
  states.push({
    array: [...array],
    correctPositions: [...correctPositions],
    action: "start",
    description:
      "Starting Quick Sort! This algorithm works by selecting pivot elements and arranging elements around them.",
  });

  quickSort(0, array.length - 1);

  // When sorting is complete, mark all positions as correct
  correctPositions.fill(true);

  // Final state
  states.push({
    array: [...array],
    correctPositions: [...correctPositions],
    action: "complete",
    description:
      "Quick Sort completed! 🎉 The array is now fully sorted in ascending order.",
  });

  return states;
};
