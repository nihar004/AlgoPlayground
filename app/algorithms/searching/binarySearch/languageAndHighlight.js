export const languageAndHighlight = {
  cpp: {
    code: `int binarySearch(int arr[], int target) {
    int left = 0, int right = arr.size()-1,
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target){
          return mid;
        } else if (arr[mid] < target){
          left = mid + 1;
        } else{
          right = mid - 1;
        }
    }
    return -1;
}`,
    lineHighlighting: {
      start: [1],
      initialize: [2],
      "calculate-mid": [4],
      "compare-mid-smaller": [7],
      "compare-mid-larger": [9],
      "adjust-pointers-left": [8],
      "adjust-pointers-right": [10],
      found: [4],
      "not-found": [13],
    },
  },

  java: {
    code: `int binarySearch(int[] arr, int target) {
    int left = 0, int right = arr.length-1,
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target){
          return mid;
        } else if(arr[mid] < target){
          left = mid + 1;
        } else{
          right = mid - 1;
        } 
    }
    return -1;
}`,
    lineHighlighting: {
      start: [1],
      initialize: [2],
      "calculate-mid": [4],
      "compare-mid-smaller": [7],
      "compare-mid-larger": [9],
      "adjust-pointers-left": [8],
      "adjust-pointers-right": [10],
      found: [4],
      "not-found": [13],
    },
  },

  python: {
    code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
    lineHighlighting: {
      start: [1],
      initialize: [2],
      "calculate-mid": [4],
      "compare-mid-smaller": [7],
      "compare-mid-larger": [9],
      "adjust-pointers-left": [8],
      "adjust-pointers-right": [10],
      found: [5, 6],
      "not-found": [11],
    },
  },

  javascript: {
    code: `function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === target){
          return mid;
        } else if (arr[mid] < target){
          left = mid + 1;
        } else{
          right = mid - 1;
        } 
    }
    return -1;
}`,
    lineHighlighting: {
      start: [1],
      initialize: [2],
      "calculate-mid": [4],
      "compare-mid-smaller": [7],
      "compare-mid-larger": [8],
      "adjust-pointers-left": [8],
      "adjust-pointers-right": [9],
      found: [5, 6],
      "not-found": [13],
    },
  },
};
