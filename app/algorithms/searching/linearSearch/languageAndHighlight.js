export const languageAndHighlight = {
  cpp: {
    code: `int linearSearch(int arr[], int size, int target) {
    for (int i = 0; i < size; i++) { 
        // Compare current element with target
        if (arr[i] == target) {
            return i; // Found, return index
        }
    }
    return -1; // Not found
}`,
    lineHighlighting: {
      start: [1],
      initialize: [2],
      compare: [3, 4],
      found: [5],
      "increment-i": [2],
      "not-found": [7],
      complete: [],
    },
  },
  java: {
    code: `int linearSearch(int arr[], int target) {
    for (int i = 0; i < arr.length; i++) { 
        // Compare current element with target
        if (arr[i] == target) {
            return i; // Found, return index
        }
    }
    return -1; // Not found
}`,
    lineHighlighting: {
      start: [1],
      initialize: [2],
      compare: [3, 4],
      found: [5],
      "increment-i": [2],
      "not-found": [7],
      complete: [],
    },
  },
  python: {
    code: `def linear_search(arr, target):
    for i in range(len(arr)): 
        # Compare current element with target
        if arr[i] == target:
            return i  # Found, return index
    return -1  # Not found`,
    lineHighlighting: {
      start: [1],
      initialize: [2],
      compare: [3, 4],
      found: [5],
      "increment-i": [2],
      "not-found": [6],
      complete: [],
    },
  },
  javascript: {
    code: `function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) { 
        // Compare current element with target
        if (arr[i] === target) {
            return i; // Found, return index
        }
    }
    return -1; // Not found
}`,
    lineHighlighting: {
      start: [1],
      initialize: [2],
      compare: [3, 4],
      found: [5],
      "increment-i": [2],
      "not-found": [7],
      complete: [],
    },
  },
};
