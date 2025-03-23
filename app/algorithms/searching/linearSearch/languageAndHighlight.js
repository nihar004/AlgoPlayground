export const languageAndHighlight = {
  cpp: {
    code: `int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        // Compare current element with target
        if (arr[i] == target) {
            // Element found, return index
            return i;
        }
    }
    // Element not found, return -1
    return -1;
}`,
    lineHighlighting: {
      start: [1],
      compare: [3, 4],
      "increment-i": [2],
      found: [5, 6],
      "not-found": [9, 10],
    },
  },
  java: {
    code: `public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        // Compare current element with target
        if (arr[i] == target) {
            // Element found, return index
            return i;
        }
    }
    // Element not found, return -1
    return -1;
}`,
    lineHighlighting: {
      start: [1],
      compare: [3, 4],
      "increment-i": [2],
      found: [5, 6],
      "not-found": [9, 10],
    },
  },
  python: {
    code: `def linear_search(arr, target):
    for i in range(len(arr)):
        # Compare current element with target
        if arr[i] == target:
            # Element found, return index
            return i
    # Element not found, return -1
    return -1`,
    lineHighlighting: {
      start: [1],
      compare: [3, 4],
      "increment-i": [2],
      found: [5, 6],
      "not-found": [7, 8],
    },
  },
  javascript: {
    code: `function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        // Compare current element with target
        if (arr[i] === target) {
            // Element found, return index
            return i;
        }
    }
    // Element not found, return -1
    return -1;
}`,
    lineHighlighting: {
      start: [1],
      compare: [3, 4],
      "increment-i": [2],
      found: [5, 6],
      "not-found": [9, 10],
    },
  },
};
