// export const generateStates = (arr) => {
//   // Create a new array to avoid modifying the original
//   const states = [];
//   const array = [...arr];

//   // Initial state - before sorting begins
//   states.push({
//     array: [...array],
//     i: -1,
//     j: -1,
//     key: null,
//     action: "start",
//     description: "Starting insertion sort...",
//   });

//   // Main insertion sort loop: start from the second element (index 1)
//   for (let i = 1; i < array.length; i++) {
//     // The current element we're trying to insert in the right position
//     let key = array[i];

//     // Start comparing with the element to the left
//     let j = i - 1;

//     // Record state: selecting a new key to insert
//     states.push({
//       array: [...array],
//       i,
//       j: -1,
//       key,
//       action: "select",
//       description: `Taking the element ${key} at position ${i} as our key to insert.`,
//     });

//     // Initial comparison with the element to the left of our key
//     if (j >= 0) {
//       states.push({
//         array: [...array],
//         i,
//         j,
//         key,
//         action: "compare",
//         description: `Is ${array[j]} (at position ${j}) larger than our key (${key})?`,
//       });
//     }

//     // If the element is already in the right position
//     if (j >= 0 && array[j] <= key) {
//       states.push({
//         array: [...array],
//         i,
//         j,
//         key,
//         action: "no-shift-needed",
//         description: `${array[j]} is not larger than our key ${key}, so no shifting needed.`,
//       });

//       // Skip the rest of the process for this key since it's already in position
//       states.push({
//         array: [...array],
//         i,
//         j: -1,
//         key: null,
//         action: "section-sorted",
//         description: `Elements from position 0 to ${i} are now in order.`,
//       });

//       // Continue to the next iteration
//       continue;
//     }

//     // Shifting loop - move elements to the right until we find the correct position
//     while (j >= 0 && array[j] > key) {
//       // Move the larger element to the right
//       array[j + 1] = array[j];

//       // Record state: shifting an element
//       states.push({
//         array: [...array],
//         i,
//         j,
//         key,
//         action: "shift",
//         description: `${array[j]} is larger than our key ${key}, so we shift it one position to the right.`,
//       });

//       // Move to the next element to the left
//       j--;

//       // If there are more elements to compare with
//       if (j >= 0) {
//         states.push({
//           array: [...array],
//           i,
//           j,
//           key,
//           action: "compare",
//           description: `Now comparing with element ${array[j]} at position ${j}.`,
//         });
//       }
//     }

//     // Explain why we stopped the shifting process
//     if (j < 0) {
//       states.push({
//         array: [...array],
//         i,
//         j,
//         key,
//         action: "loop-end-reason",
//         description: `Reached the start of array (j=${j}), so our key goes at position 0.`,
//       });
//     } else {
//       states.push({
//         array: [...array],
//         i,
//         j,
//         key,
//         action: "loop-end-reason",
//         description: `${array[j]} is not larger than our key ${key}, so our key goes after it.`,
//       });
//     }

//     // Insert the key into its correct position
//     array[j + 1] = key;
//     states.push({
//       array: [...array],
//       i,
//       j: j + 1,
//       key: null,
//       action: "insert",
//       description: `Placing our key ${key} at position ${j + 1}.`,
//     });

//     // Show that this section is now sorted
//     states.push({
//       array: [...array],
//       i,
//       j: -1,
//       key: null,
//       action: "section-sorted",
//       description: `Elements from position 0 to ${i} are now in order.`,
//     });
//   }

//   // Final state after sorting is complete
//   states.push({
//     array: [...array],
//     i: array.length,
//     j: -1,
//     key: null,
//     action: "complete",
//     description: "Insertion Sort completed! The entire array is now sorted. 🎉",
//   });

//   return states;
// };

export const generateStates = (arr) => {
  // Comprehensive state tracking for learning visualization
  const states = [];

  // Create a copy of the original array to avoid modifying the input
  const array = [...arr];

  // Initial setup state with helpful description
  states.push({
    array: [...array],
    i: -1,
    j: -1,
    key: null,
    action: "start",
    description:
      "Let's learn Insertion Sort! We'll sort the array step by step.",
    tips: [
      "Insertion Sort works like sorting a hand of playing cards.",
      "We'll build a sorted section from left to right.",
      "Each new element will be 'inserted' into its correct position.",
    ],
  });

  // Main sorting loop - starting from the second element
  for (let i = 1; i < array.length; i++) {
    // Pick the current element to insert
    let key = array[i];

    // Track the position to compare with
    let j = i - 1;

    // State to show which element we're about to insert
    states.push({
      array: [...array],
      i,
      j: -1,
      key,
      action: "select",
      description: `We're going to insert ${key} (at index ${i}) into the sorted portion.`,
      tips: [
        "This is the element we want to put in the right place.",
        "We'll compare it with elements to its left.",
        "We'll shift elements to make space if needed.",
      ],
    });

    // First comparison state
    if (j >= 0) {
      states.push({
        array: [...array],
        i,
        j,
        key,
        action: "compare",
        description: `Compare ${key} with ${array[j]} (at index ${j}).`,
        tips: [
          "Is the element we're comparing larger than our key?",
          "If yes, we'll need to move it to the right.",
          "If no, we've found the right spot for our key.",
        ],
      });
    }

    // Handling cases where no shift is needed
    if (j >= 0 && array[j] <= key) {
      states.push({
        array: [...array],
        i,
        j,
        key,
        action: "no-shift-needed",
        description: `${array[j]} is not larger than ${key}, so no shifting required.`,
        tips: [
          "The element is already in the right place!",
          "We can move to the next element.",
          "Our sorted section grows by one element.",
        ],
      });

      // Mark the current section as sorted
      states.push({
        array: [...array],
        i,
        j: -1,
        key: null,
        action: "section-sorted",
        description: `Elements from index 0 to ${i} are now in order.`,
        tips: [
          "Our sorted section keeps getting larger.",
          "We're building the sorted portion from left to right.",
        ],
      });

      continue; // Move to next iteration
    }

    // Shifting elements to make space
    while (j >= 0 && array[j] > key) {
      // Move larger element to the right
      array[j + 1] = array[j];

      // State to show element shifting
      states.push({
        array: [...array],
        i,
        j,
        key,
        action: "shift",
        description: `Shift ${array[j]} to the right to make space.`,
        tips: [
          "We're moving larger elements to the right.",
          "This creates space to insert our key.",
          "We want to find the right spot for our key.",
        ],
      });

      // Move to previous element
      j--;

      // Comparison state for next iteration
      if (j >= 0) {
        states.push({
          array: [...array],
          i,
          j,
          key,
          action: "compare",
          description: `Compare ${key} with ${array[j]} (at index ${j}).`,
          tips: [
            "Continue comparing and shifting.",
            "We're looking for the right spot for our key.",
          ],
        });
      }
    }

    // Explanation for why shifting stopped
    states.push({
      array: [...array],
      i,
      j,
      key,
      action: "loop-end-reason",
      description:
        j < 0
          ? `Reached the start of the array, key goes at index 0.`
          : `Found the right spot for the key after ${array[j]}.`,
      tips: [
        "We've found where our key belongs.",
        "Time to insert it in the correct position.",
      ],
    });

    // Insert the key in its correct position
    array[j + 1] = key;
    states.push({
      array: [...array],
      i,
      j: j + 1,
      key: null,
      action: "insert",
      description: `Place ${key} at index ${j + 1}.`,
      tips: [
        "Key is now in its correct sorted position!",
        "Our sorted section grows by one element.",
        "We'll continue with the next unsorted element.",
      ],
    });

    // Mark the current section as sorted
    states.push({
      array: [...array],
      i,
      j: -1,
      key: null,
      action: "section-sorted",
      description: `Elements from index 0 to ${i} are now in order.`,
      tips: [
        "Our sorted section keeps expanding.",
        "We're building the sorted array from left to right.",
      ],
    });
  }

  // Final state showing completed sort
  states.push({
    array: [...array],
    i: array.length,
    j: -1,
    key: null,
    action: "complete",
    description:
      "Insertion Sort is complete! The entire array is now sorted. 🎉",
    tips: [
      "Congratulations! You've sorted the entire array.",
      "Insertion Sort has placed each element in its correct position.",
      "The array is now sorted from smallest to largest.",
    ],
  });

  return states;
};
