export const languageAndHighlight = {
  cpp: {
    code: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < n; j++) {
            // Compare with current minimum
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        // Swap if a smaller element was found
        if (minIndex != i) {
            swap(arr[i], arr[minIndex]);
        }
    }
}`,
    lineHighlighting: {
      start: [1],
      "new-min": [3],
      compare: [5, 6],
      "update-min": [7],
      swap: [10, 11],
      "bar-complete": [2],
      complete: [],
    },
  },
  java: {
    code: `void selectionSort(int arr[]) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < n; j++) {
            // Compare with current minimum
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        // Swap if a smaller element was found
        if (minIndex != i) {
            int temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
}`,
    lineHighlighting: {
      start: [1],
      "new-min": [3],
      compare: [5, 6],
      "update-min": [7],
      swap: [10, 11, 12, 13],
      "bar-complete": [2],
      complete: [],
    },
  },
  python: {
    code: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_index = i
        for j in range(i + 1, n):
            # Compare with current minimum
            if arr[j] < arr[min_index]:
                min_index = j
        # Swap if a smaller element was found
        if min_index != i:
            arr[i], arr[min_index] = arr[min_index], arr[i]
    return arr`,
    lineHighlighting: {
      start: [1],
      "new-min": [3],
      compare: [5, 6],
      "update-min": [7],
      swap: [9, 10],
      "bar-complete": [2],
      complete: [],
    },
  },
  javascript: {
    code: `function selectionSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            // Compare with current minimum
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        // Swap if a smaller element was found
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    return arr;
}`,
    lineHighlighting: {
      start: [1],
      "new-min": [3],
      compare: [5, 6],
      "update-min": [7],
      swap: [10, 11],
      "bar-complete": [2],
      complete: [],
    },
  },
};
