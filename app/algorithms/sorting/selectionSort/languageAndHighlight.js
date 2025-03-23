export const languageAndHighlight = {
  cpp: {
    code: `void selectionSort(int arr[], int n) {
    // Iterating through each element in the array
    for (int i = 0; i < n - 1; i++) {  
        // Finding the minimum element in the unsorted portion of the array
        int minIndex = i;
        for (int j = i + 1; j < n; j++) {  
            // Compare the current element with the current minimum
            if (arr[j] < arr[minIndex]) {  
                minIndex = j;
            }
        }
        // Swapping the smallest element found with the first element of the unsorted part
        if (minIndex != i) {
            swap(arr[i], arr[minIndex]);
        }
    }
}`,
    lineHighlighting: {
      start: [1],
      initialize: [3],
      "initialize-j": [4],
      compare: [5, 6],
      "update-min": [6],
      "find-min-complete": [],
      swap: [9, 10],
      "increment-i": [3],
      complete: [],
    },
  },
  java: {
    code: `public static void selectionSort(int[] arr) {
    int n = arr.length;
    // Iterating through each element in the array
    for (int i = 0; i < n - 1; i++) {  
        // Finding the minimum element in the unsorted portion of the array
        int minIndex = i;
        for (int j = i + 1; j < n; j++) {  
            // Compare the current element with the current minimum
            if (arr[j] < arr[minIndex]) {  
                minIndex = j;
            }
        }
        // Swapping the smallest element found with the first element of the unsorted part
        if (minIndex != i) {
            int temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
}`,
    lineHighlighting: {
      start: [1],
      initialize: [4],
      "initialize-j": [5],
      compare: [6, 7],
      "update-min": [7],
      "find-min-complete": [],
      swap: [10, 11, 12, 13],
      "increment-i": [4],
      complete: [],
    },
  },
  python: {
    code: `def selection_sort(arr):
    n = len(arr)
    # Iterating through each element in the array
    for i in range(n - 1):
        # Finding the minimum element in the unsorted portion of the array
        min_index = i
        for j in range(i + 1, n):
            # Compare the current element with the current minimum
            if arr[j] < arr[min_index]:
                min_index = j
        # Swapping the smallest element found with the first element of the unsorted part
        if min_index != i:
            arr[i], arr[min_index] = arr[min_index], arr[i]
`,
    lineHighlighting: {
      start: [1],
      initialize: [3],
      "initialize-j": [5],
      compare: [6, 7],
      "update-min": [7],
      "find-min-complete": [],
      swap: [9, 10],
      "increment-i": [3],
      complete: [],
    },
  },
  javascript: {
    code: `function selectionSort(arr) {
    let n = arr.length;
    // Iterating through each element in the array
    for (let i = 0; i < n - 1; i++) {
        // Finding the minimum element in the unsorted portion of the array
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            // Compare the current element with the current minimum
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        // Swapping the smallest element found with the first element of the unsorted part
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
}`,
    lineHighlighting: {
      start: [1],
      initialize: [3],
      "initialize-j": [5],
      compare: [6, 7],
      "update-min": [7],
      "find-min-complete": [],
      swap: [9, 10],
      "increment-i": [3],
      complete: [],
    },
  },
};
