export const languageAndHighlight = {
  cpp: {
    code: `void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high]; 
    int i = (low - 1); 

    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}`,
    lineHighlighting: {
      start: [1],
      "choose-pivot": [9],
      compare: [12],
      swap: [14, 15],
      "pivot-placed": [18],
      "sort-left": [4],
      "sort-right": [5],
      complete: [],
    },
  },
  java: {
    code: `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

private static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}`,
    lineHighlighting: {
      start: [1],
      "choose-pivot": [9],
      compare: [12],
      swap: [14, 15, 16],
      "pivot-placed": [19],
      "sort-left": [4],
      "sort-right": [5],
      complete: [],
    },
  },
  python: {
    code: `def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1

    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]

    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
    lineHighlighting: {
      start: [1],
      "choose-pivot": [7],
      compare: [10],
      swap: [12, 13],
      "pivot-placed": [15],
      "sort-left": [3],
      "sort-right": [4],
      complete: [],
    },
  },
  javascript: {
    code: `function quickSort(arr, low, high) {
    if (low < high) {
        let pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}`,
    lineHighlighting: {
      start: [1],
      "choose-pivot": [8],
      compare: [11],
      swap: [13],
      "pivot-placed": [15],
      "sort-left": [3],
      "sort-right": [4],
      complete: [],
    },
  },
};
