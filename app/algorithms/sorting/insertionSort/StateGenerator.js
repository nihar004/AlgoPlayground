export const generateStates = (arr) => {
  // Create a new array to avoid modifying the original
  const states = [];
  const array = [...arr];

  // Initial state - before sorting begins
  states.push({
    array: [...array],
    i: -1,
    j: -1,
    key: null,
    action: "start",
    description: "Starting insertion sort...",
  });

  // Main insertion sort loop: start from the second element (index 1)
  for (let i = 1; i < array.length; i++) {
    // The current element we're trying to insert in the right position
    let key = array[i];

    // Start comparing with the element to the left
    let j = i - 1;

    // Record state: selecting a new key to insert
    states.push({
      array: [...array],
      i,
      j: -1,
      key,
      action: "select",
      description: `Taking the element ${key} at position ${i} as our key to insert.`,
    });

    // Initial comparison with the element to the left of our key
    if (j >= 0) {
      states.push({
        array: [...array],
        i,
        j,
        key,
        action: "compare",
        description: `Is ${array[j]} (at position ${j}) larger than our key (${key})?`,
      });
    }

    // If the element is already in the right position
    if (j >= 0 && array[j] <= key) {
      states.push({
        array: [...array],
        i,
        j,
        key,
        action: "no-shift-needed",
        description: `${array[j]} is not larger than our key ${key}, so no shifting needed.`,
      });

      // Skip the rest of the process for this key since it's already in position
      states.push({
        array: [...array],
        i,
        j: -1,
        key: null,
        action: "section-sorted",
        description: `Elements from position 0 to ${i} are now in order.`,
      });

      // Continue to the next iteration
      continue;
    }

    // Shifting loop - move elements to the right until we find the correct position
    while (j >= 0 && array[j] > key) {
      // Move the larger element to the right
      array[j + 1] = array[j];

      // Record state: shifting an element
      states.push({
        array: [...array],
        i,
        j,
        key,
        action: "shift",
        description: `${array[j]} is larger than our key ${key}, so we shift it one position to the right.`,
      });

      // Move to the next element to the left
      j--;

      // If there are more elements to compare with
      if (j >= 0) {
        states.push({
          array: [...array],
          i,
          j,
          key,
          action: "compare",
          description: `Now comparing with element ${array[j]} at position ${j}.`,
        });
      }
    }

    // Explain why we stopped the shifting process
    if (j < 0) {
      states.push({
        array: [...array],
        i,
        j,
        key,
        action: "loop-end-reason",
        description: `Reached the start of array (j=${j}), so our key goes at position 0.`,
      });
    } else {
      states.push({
        array: [...array],
        i,
        j,
        key,
        action: "loop-end-reason",
        description: `${array[j]} is not larger than our key ${key}, so our key goes after it.`,
      });
    }

    // Insert the key into its correct position
    array[j + 1] = key;
    states.push({
      array: [...array],
      i,
      j: j + 1,
      key: null,
      action: "insert",
      description: `Placing our key ${key} at position ${j + 1}.`,
    });

    // Show that this section is now sorted
    states.push({
      array: [...array],
      i,
      j: -1,
      key: null,
      action: "section-sorted",
      description: `Elements from position 0 to ${i} are now in order.`,
    });
  }

  // Final state after sorting is complete
  states.push({
    array: [...array],
    i: array.length,
    j: -1,
    key: null,
    action: "complete",
    description: "Insertion Sort completed! The entire array is now sorted. 🎉",
  });

  return states;
};
