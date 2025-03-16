export const languageAndHighlight = {
  cpp: {
    code: `void bubbleSort(int arr[]) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) { 
        for (int j = 0; j < n - 1 - i; j++) { 
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) { 
                // Swap them if they are in wrong order
                swap(arr[j], arr[j + 1]); 
            }
        }
    }
}`,
    lineHighlighting: {
      start: [1],
      initialize: [3, 4],
      "increment-i": [3],
      "increment-j": [4],
      compare: [5, 6],
      swap: [7, 8],
      complete: [],
    },
  },
  java: {
    code: `public static void bubbleSort(int[] arr) {
    int n = arr.length; 
    for (int i = 0; i < n - 1; i++) { 
        for (int j = 0; j < n - 1 - i; j++) {
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) { 
                // Swap them if they are in wrong order
                int temp = arr[j]; 
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
    lineHighlighting: {
      start: [1],
      initialize: [3, 4],
      "increment-i": [3],
      "increment-j": [4],
      compare: [5, 6],
      swap: [7, 8, 9, 10],
      complete: [],
    },
  },
  python: {
    code: `def bubble_sort(arr):
    n = len(arr) 
    for i in range(n - 1): 
        for j in range(n - 1 - i): 
            # Compare adjacent elements
            if arr[j] > arr[j + 1]:
                # Swap them if they are in wrong order
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
    lineHighlighting: {
      start: [1],
      initialize: [3, 4],
      "increment-i": [3],
      "increment-j": [4],
      compare: [5, 6],
      swap: [7, 8],
      complete: [],
    },
  },
  javascript: {
    code: `function bubbleSort(arr) {
    let n = arr.length; 
    for (let i = 0; i < n - 1; i++) { 
        for (let j = 0; j < n - 1 - i; j++) { 
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) { 
              // Swap them if they are in wrong order
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
}`,
    lineHighlighting: {
      start: [1],
      initialize: [3, 4],
      "increment-i": [3],
      "increment-j": [4],
      compare: [5, 6],
      swap: [7, 8],
      complete: [],
    },
  },
};
