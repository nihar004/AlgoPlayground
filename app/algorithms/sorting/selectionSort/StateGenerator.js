// export const generateStates = (arr) => {
//   const states = [];
//   const array = [...arr];

//   states.push({
//     array: [...array],
//     i: -1,
//     j: -1,
//     minIndex: -1,
//     action: "start",
//     description: "Starting selection sort...",
//   });

//   for (let i = 0; i < array.length - 1; i++) {
//     states.push({
//       array: [...array],
//       i,
//       j: -1,
//       minIndex: i,
//       action: "initialize",
//       description: `Setting i to ${i}. Starting to find the minimum from index ${i} onwards.`,
//     });

//     states.push({
//       array: [...array],
//       i,
//       j: i + 1,
//       minIndex: i,
//       action: "initialize-j",
//       description: `Setting j to ${
//         i + 1
//       } and iterating through the unsorted portion.`,
//     });

//     let minIndex = i;
//     for (let j = i + 1; j < array.length; j++) {
//       states.push({
//         array: [...array],
//         i,
//         j,
//         minIndex,
//         action: "compare",
//         description: `Comparing elements ${array[j]} and ${array[minIndex]}, as ${array[minIndex]} is smaller, hence no change.`,
//       });

//       if (array[j] < array[minIndex]) {
//         minIndex = j;
//         states.push({
//           array: [...array],
//           i,
//           j,
//           minIndex,
//           action: "update-min",
//           description: `${array[j]} is smaller. Updating the minimum index to ${j}.`,
//         });
//       }
//     }

//     states.push({
//       array: [...array],
//       i,
//       j: -1,
//       minIndex,
//       action: "find-min-complete",
//       description: `Minimum element ${array[minIndex]} found for this iteration.`,
//     });

//     if (minIndex !== i) {
//       [array[i], array[minIndex]] = [array[minIndex], array[i]];
//       states.push({
//         array: [...array],
//         i,
//         j: -1,
//         minIndex,
//         action: "swap",
//         description: `Swapping ${array[minIndex]} with ${array[i]}.`,
//       });
//     }

//     states.push({
//       array: [...array],
//       i,
//       j: -1,
//       minIndex,
//       action: "bar-complete",
//       description: `Element ${array[i]} is now at its correct position!`,
//     });

//     states.push({
//       array: [...array],
//       i: i + 1,
//       j: -1,
//       minIndex: -1,
//       action: "increment-i",
//       description: `Incrementing i to ${
//         i + 1
//       } to place the next smallest element.`,
//     });
//   }

//   states.push({
//     array: [...array],
//     i: array.length,
//     j: -1,
//     minIndex: -1,
//     action: "complete",
//     description: "Selection sort complete! 🎉",
//   });

//   return states;
// };

export const generateStates = (arr) => {
  const states = [];
  const array = [...arr];

  states.push({
    array: [...array],
    i: -1,
    j: -1,
    minIndex: -1,
    action: "start",
    description: "Starting selection sort...",
  });

  for (let i = 0; i < array.length - 1; i++) {
    states.push({
      array: [...array],
      i,
      j: -1,
      minIndex: i,
      action: "initialize",
      description: `Setting i to ${i}. Starting to find the minimum from index ${i} onwards.`,
    });

    states.push({
      array: [...array],
      i,
      j: i + 1,
      minIndex: i,
      action: "initialize-j",
      description: `Setting j to ${
        i + 1
      } and iterating through the unsorted portion.`,
    });

    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      states.push({
        array: [...array],
        i,
        j,
        minIndex,
        action: "compare",
        description: `Comparing elements ${array[j]} and ${array[minIndex]}, as ${array[minIndex]} is smaller, hence no change.`,
      });

      if (array[j] < array[minIndex]) {
        minIndex = j;
        states.push({
          array: [...array],
          i,
          j,
          minIndex,
          action: "update-min",
          description: `${array[j]} is smaller. Updating the minimum index to ${j}.`,
        });
      }
    }

    states.push({
      array: [...array],
      i,
      j: -1,
      minIndex,
      action: "find-min-complete",
      description: `Minimum element ${array[minIndex]} found for this iteration.`,
    });

    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      states.push({
        array: [...array],
        i,
        j: -1,
        minIndex,
        action: "swap",
        description: `Swapping ${array[minIndex]} with ${array[i]}.`,
      });
    }

    states.push({
      array: [...array],
      i,
      j: -1,
      minIndex: -1,
      action: "bar-complete",
      description: `Element ${array[i]} is now at its correct position!`,
    });

    states.push({
      array: [...array],
      i: i + 1,
      j: -1,
      minIndex: -1,
      action: "increment-i",
      description: `Incrementing i to ${
        i + 1
      } to place the next smallest element.`,
    });
  }

  states.push({
    array: [...array],
    i: array.length,
    j: -1,
    minIndex: -1,
    action: "complete",
    description: "Selection sort complete! 🎉",
  });

  return states;
};
