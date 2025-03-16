// export const languageAndHighlight = {
//   cpp: {
//     code: `int binarySearch(int arr[], int size, int target) {
//     int left = 0, right = size - 1;
//     while (left <= right) {
//         int mid = left + (right - left) / 2;
//         // Compare middle element with target
//         if (arr[mid] == target) return mid;
//         else if (arr[mid] < target) left = mid + 1;
//         else right = mid - 1;
//     }
//     return -1; // Not found
// }`,
//     lineHighlighting: {
//       start: [1],
//       initialize: [2],
//       "calculate-mid": [4],
//       compare: [5],
//       found: [6],
//       "move-right": [7],
//       "move-left": [8],
//       "not-found": [10],
//       complete: [],
//     },
//   },
//   java: {
//     code: `int binarySearch(int arr[], int target) {
//     int left = 0, right = arr.length - 1;
//     while (left <= right) {
//         int mid = left + (right - left) / 2;
//         // Compare middle element with target
//         if (arr[mid] == target) return mid;
//         else if (arr[mid] < target) left = mid + 1;
//         else right = mid - 1;
//     }
//     return -1; // Not found
// }`,
//     lineHighlighting: {
//       start: [1],
//       initialize: [2],
//       "calculate-mid": [4],
//       compare: [5],
//       found: [6],
//       "move-right": [7],
//       "move-left": [8],
//       "not-found": [10],
//       complete: [],
//     },
//   },
//   python: {
//     code: `def binary_search(arr, target):
//     left, right = 0, len(arr) - 1
//     while left <= right:
//         mid = left + (right - left) // 2
//         # Compare middle element with target
//         if arr[mid] == target:
//             return mid
//         elif arr[mid] < target:
//             left = mid + 1
//         else:
//             right = mid - 1
//     return -1  # Not found`,
//     lineHighlighting: {
//       start: [1],
//       initialize: [2],
//       "calculate-mid": [4],
//       compare: [5],
//       found: [6],
//       "move-right": [7],
//       "move-left": [9],
//       "not-found": [11],
//       complete: [],
//     },
//   },
//   javascript: {
//     code: `function binarySearch(arr, target) {
//     let left = 0, right = arr.length - 1;
//     while (left <= right) {
//         let mid = Math.floor((left + right) / 2);
//         // Compare middle element with target
//         if (arr[mid] === target) return mid;
//         else if (arr[mid] < target) left = mid + 1;
//         else right = mid - 1;
//     }
//     return -1; // Not found
// }`,
//     lineHighlighting: {
//       start: [1],
//       initialize: [2],
//       "calculate-mid": [4],
//       compare: [5],
//       found: [6],
//       "move-right": [7],
//       "move-left": [8],
//       "not-found": [10],
//       complete: [],
//     },
//   },
// };

export const languageAndHighlight = {
  cpp: {
    code: `int binarySearch(int arr[], int size, int target) {
    int left = 0, right = size - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        // Checking if mid is the target
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1; // Not found
}`,
    lineHighlighting: {
      start: [1],
      initialize: [2],
      "calculate-mid": [4],
      "check-mid": [5],
      compare: [5],
      found: [6],
      "move-right": [7],
      "move-left": [8],
      "not-found": [10],
      complete: [],
    },
  },
  java: {
    code: `int binarySearch(int arr[], int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        // Checking if mid is the target
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1; // Not found
}`,
    lineHighlighting: {
      start: [1],
      initialize: [2],
      "calculate-mid": [4],
      "check-mid": [5],
      compare: [5],
      found: [6],
      "move-right": [7],
      "move-left": [8],
      "not-found": [10],
      complete: [],
    },
  },
  python: {
    code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = left + (right - left) // 2
        # Checking if mid is the target
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1  # Not found`,
    lineHighlighting: {
      start: [1],
      initialize: [2],
      "calculate-mid": [4],
      "check-mid": [5],
      compare: [5],
      found: [6],
      "move-right": [7],
      "move-left": [9],
      "not-found": [11],
      complete: [],
    },
  },
  javascript: {
    code: `function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        // Checking if mid is the target
        if (arr[mid] === target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1; // Not found
}`,
    lineHighlighting: {
      start: [1],
      initialize: [2],
      "calculate-mid": [4],
      "check-mid": [5],
      compare: [5],
      found: [6],
      "move-right": [7],
      "move-left": [8],
      "not-found": [10],
      complete: [],
    },
  },
};
