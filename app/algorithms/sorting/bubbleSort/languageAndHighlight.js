export const languageAndHighlight = {
  cpp: {
    code: `void bubbleSort(int arr[]) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) { 
        bool swapped = false;
        for (int j = 0; j < n - 1 - i; j++) { 
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) { 
                // Swap them if they are in wrong order
                swap(arr[j], arr[j + 1]);
                swapped = true; 
            }
        }
        // Early stop if no swaps were done
        if (!swapped) break;
    }
}`,
    lineHighlighting: {
      start: [1],
      initialize: [3, 4],
      "increment-i": [3],
      "increment-j": [5],
      compare: [6, 7],
      swap: [8, 9],
      "early-stop": [13, 14],
      complete: [],
    },
  },
  java: {
    code: `public static void bubbleSort(int[] arr) {
    int n = arr.length; 
    for (int i = 0; i < n - 1; i++) { 
        boolean swapped = false;
        for (int j = 0; j < n - 1 - i; j++) {
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) { 
                // Swap them if they are in wrong order
                int temp = arr[j]; 
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        // Early stop if no swaps were done
        if (!swapped) break;
    }
}`,
    lineHighlighting: {
      start: [1],
      initialize: [3, 4],
      "increment-i": [3],
      "increment-j": [5],
      compare: [6, 7],
      swap: [8, 9, 10, 11],
      "early-stop": [15, 16],
      complete: [15, 16],
    },
  },
  python: {
    code: `def bubble_sort(arr):
    n = len(arr) 
    for i in range(n - 1): 
        swapped = False
        for j in range(n - 1 - i): 
            # Compare adjacent elements
            if arr[j] > arr[j + 1]:
                # Swap them if they are in wrong order
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        # Early stop if no swaps were done
        if not swapped:
            break`,
    lineHighlighting: {
      start: [1],
      initialize: [3, 4],
      "increment-i": [3],
      "increment-j": [5],
      compare: [6, 7],
      swap: [8, 9],
      "early-stop": [12, 13],
      complete: [],
    },
  },
  javascript: {
    code: `function bubbleSort(arr) {
    let n = arr.length; 
    for (let i = 0; i < n - 1; i++) { 
        let swapped = false;
        for (let j = 0; j < n - 1 - i; j++) { 
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) { 
                // Swap them if they are in wrong order
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        // Early stop if no swaps were done
        if (!swapped) break;
    }
}`,
    lineHighlighting: {
      start: [1],
      initialize: [3, 4],
      "increment-i": [3],
      "increment-j": [5],
      compare: [6, 7],
      swap: [8, 9],
      "early-stop": [13, 14],
      complete: [],
    },
  },
};
