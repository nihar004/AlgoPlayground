// export const generateBinarySearchStates = (arr, target) => {
//   const states = [];
//   const array = [...arr].sort((a, b) => a - b); // Binary search requires a sorted array
//   let left = 0,
//     right = array.length - 1;

//   states.push({
//     array: [...array],
//     left,
//     right,
//     mid: -1,
//     action: "start",
//     description: "Starting binary search...",
//   });

//   while (left <= right) {
//     let mid = Math.floor((left + right) / 2);

//     states.push({
//       array: [...array],
//       left,
//       right,
//       mid,
//       action: "calculate-mid",
//       description: `Calculating mid: ${mid}, Value: ${array[mid]}`,
//     });

//     if (array[mid] === target) {
//       states.push({
//         array: [...array],
//         left,
//         right,
//         mid,
//         action: "found",
//         description: `Element found at index ${mid}!`,
//       });
//       return states;
//     }

//     if (array[mid] < target) {
//       states.push({
//         array: [...array],
//         left,
//         right,
//         mid,
//         action: "move-right",
//         description: `The target is greater than ${array[mid]}, so we move to the right half`,
//       });
//       left = mid + 1;
//     } else {
//       states.push({
//         array: [...array],
//         left,
//         right,
//         mid,
//         action: "move-left",
//         description: `The target is smaller than ${array[mid]}, so we move to the left half`,
//       });
//       right = mid - 1;
//     }
//   }

//   states.push({
//     array: [...array],
//     left,
//     right,
//     mid: -1,
//     action: "not-found",
//     description: "Element not found in the array.",
//   });

//   return states;
// };

export const generateStates = (arr, target) => {
  const states = [];
  const array = [...arr].sort((a, b) => a - b); // Binary search requires a sorted array
  let left = 0,
    right = array.length - 1;

  states.push({
    array: [...array],
    left,
    right,
    mid: -1,
    action: "start",
    description: "Starting the binary search...",
  });

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    states.push({
      array: [...array],
      left,
      right,
      mid,
      action: "calculate-mid",
      description: `Checking the middle element at index ${mid}: ${array[mid]}`,
    });

    states.push({
      array: [...array],
      left,
      right,
      mid,
      action: "check-mid",
      description: `Is ${array[mid]} the number we're looking for?`,
    });

    if (array[mid] === target) {
      states.push({
        array: [...array],
        left,
        right,
        mid,
        action: "found",
        description: `Element found at index ${mid}! 🎯`,
      });
      return states;
    }

    if (array[mid] < target) {
      states.push({
        array: [...array],
        left,
        right,
        mid,
        action: "move-right",
        description: `The target is greater than ${array[mid]}, so we move to the right half ➡`,
      });
      left = mid + 1;
    } else {
      states.push({
        array: [...array],
        left,
        right,
        mid,
        action: "move-left",
        description: `The target is smaller than ${array[mid]}, so we move to the left half ⬅`,
      });
      right = mid - 1;
    }
  }

  states.push({
    array: [...array],
    left,
    right,
    mid: -1,
    action: "not-found",
    description: "Element not found in the array. ❌",
  });

  return states;
};
