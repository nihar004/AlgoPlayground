export const languageAndHighlight = {
  cpp: {
    code: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        // Move elements greater than key one position ahead
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
    lineHighlighting: {
      start: [1],
      select: [2, 3],
      compare: [6],
      shift: [7],
      insert: [9],
      "increment-i": [2],
      complete: [],
    },
  },
  java: {
    code: `public static void insertionSort(int[] arr) {
    int n = arr.length;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        // Move elements greater than key one position ahead
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
    lineHighlighting: {
      start: [1],
      select: [3, 4],
      compare: [7],
      shift: [8],
      insert: [10],
      "increment-i": [3],
      complete: [],
    },
  },
  python: {
    code: `def insertion_sort(arr):
    n = len(arr)
    for i in range(1, n):
        key = arr[i]
        j = i - 1
        # Move elements greater than key one position ahead
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key`,
    lineHighlighting: {
      start: [1],
      select: [3, 4],
      compare: [7],
      shift: [8],
      insert: [10],
      "increment-i": [3],
      complete: [],
    },
  },
  javascript: {
    code: `function insertionSort(arr) {
    let n = arr.length;
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        // Move elements greater than key one position ahead
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
    lineHighlighting: {
      start: [1],
      select: [3, 4],
      compare: [7],
      shift: [8],
      insert: [10],
      "increment-i": [3],
      complete: [],
    },
  },
};
