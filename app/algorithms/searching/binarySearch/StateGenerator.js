export const generateStates = (arr, target) => {
  const states = [];
  const array = [...arr];
  let left = 0;
  let right = array.length - 1;

  // Start State
  states.push({
    array: [...array],
    left: -1,
    right: -1,
    mid: -1,
    action: "start",
    description: "Starting binary search...",
  });

  // Initialize State
  states.push({
    array: [...array],
    left,
    right,
    mid: -1,
    action: "initialize",
    description: `Initializing left to ${left} and right to ${right}.`,
  });

  while (left <= right) {
    // Calculate Mid State
    const mid = Math.floor((left + right) / 2);
    states.push({
      array: [...array],
      left,
      right,
      mid,
      action: "calculate-mid",
      description: `Calculating mid index: (${left} + ${right}) / 2 = ${mid}.`,
    });

    // Compare Mid with Target State
    if (array[mid] === target) {
      states.push({
        array: [...array],
        left,
        right,
        mid,
        action: "found",
        description: `Element ${array[mid]} at index ${mid} matches the target value ${target}.`,
      });
      return states;
    } else if (array[mid] < target) {
      states.push({
        array: [...array],
        left,
        right,
        mid,
        action: "compare-mid-smaller",
        description: `Element ${array[mid]} at index ${mid} is smaller than the target value ${target}. Searching the right half.`,
      });

      left = mid + 1;
      // Adjust Pointers - Left Increment
      states.push({
        array: [...array],
        left,
        right,
        mid,
        action: "adjust-pointers-left",
        description: ` Increasing left to ${left} (mid+1) as the target is greater than ${array[mid]}.`,
      });
    } else {
      states.push({
        array: [...array],
        left,
        right,
        mid,
        action: "compare-mid-larger",
        description: `Element ${array[mid]} at index ${mid} is larger than the target value ${target}. Searching the left half.`,
      });

      right = mid - 1;
      // Adjust Pointers - Right Decrement
      states.push({
        array: [...array],
        left,
        right,
        mid,
        action: "adjust-pointers-right",
        description: `Decreasing right to ${right} (mid-1) as the target is smaller than ${array[mid]}.`,
      });
    }
  }

  // Not Found State
  states.push({
    array: [...array],
    left: -1,
    right: -1,
    mid: -1,
    action: "not-found",
    description: "Element not found in the array.",
  });

  return states;
};
