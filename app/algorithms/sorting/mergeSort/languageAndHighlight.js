export const languageAndHighlight = {
  javascript: {
    code: `// The main merge sort function that sorts an array from index "left" to "right"
function mergeSort(arr, left, right) {
    // Base case: If the array has 0 or 1 elements, it's already sorted
    if (left >= right) {
        return;
    }
    
    // Step 1: Find the middle point of the array
    let mid = Math.floor((left + right) / 2);
    
    // Step 2: Sort the left half recursively
    mergeSort(arr, left, mid);
    
    // Step 3: Sort the right half recursively
    mergeSort(arr, mid + 1, right);
    
    // Step 4: Merge the two sorted halves
    merge(arr, left, mid, right);
}

// This function combines two sorted parts of an array into one sorted part
function merge(arr, left, mid, right) {
    // Step 1: Create temporary arrays to hold the two halves
    // left half: from "left" to "mid"
    let leftHalf = [];
    for (let i = left; i <= mid; i++) {
        leftHalf.push(arr[i]);
    }
    
    // right half: from "mid+1" to "right"
    let rightHalf = [];
    for (let i = mid + 1; i <= right; i++) {
        rightHalf.push(arr[i]);
    }
    
    // Step 2: Merge the two halves back into the original array
    let leftIndex = 0;        // Current position in leftHalf
    let rightIndex = 0;       // Current position in rightHalf
    let currentIndex = left;  // Current position in original array
    
    // Compare elements from both halves and place the smaller one first
    while (leftIndex < leftHalf.length && rightIndex < rightHalf.length) {
        if (leftHalf[leftIndex] <= rightHalf[rightIndex]) {
            // If left element is smaller or equal, take it
            arr[currentIndex] = leftHalf[leftIndex];
            leftIndex++;
        } else {
            // If right element is smaller, take it
            arr[currentIndex] = rightHalf[rightIndex];
            rightIndex++;
        }
        currentIndex++;
    }
    
    // If there are any remaining elements in the left half, add them
    while (leftIndex < leftHalf.length) {
        arr[currentIndex] = leftHalf[leftIndex];
        leftIndex++;
        currentIndex++;
    }
    
    // If there are any remaining elements in the right half, add them
    while (rightIndex < rightHalf.length) {
        arr[currentIndex] = rightHalf[rightIndex];
        rightIndex++;
        currentIndex++;
    }
}`,
    lineHighlighting: {
      start: [46], // The main mergeSort function
      split: [51], // Finding the middle point
      "sort-left": [54], // Sorting the left half
      "sort-right": [57], // Sorting the right half
      "merge-start": [60], // Starting the merge process
      compare: [21, 22], // Comparing elements from both halves
      place: [23, 27], // Placing elements in the result array
      "append-left": [33], // Appending remaining elements from left half
      "append-right": [40], // Appending remaining elements from right half
      "sorted-subarray": [44], // After merging (end of merge function)
      complete: [],
    },
  },

  python: {
    code: `# The main merge sort function that sorts an array from index "left" to "right"
def merge_sort(arr, left, right):
    # Base case: If the array has 0 or 1 elements, it's already sorted
    if left >= right:
        return
    
    # Step 1: Find the middle point of the array
    mid = (left + right) // 2
    
    # Step 2: Sort the left half recursively
    merge_sort(arr, left, mid)
    
    # Step 3: Sort the right half recursively
    merge_sort(arr, mid + 1, right)
    
    # Step 4: Merge the two sorted halves
    merge(arr, left, mid, right)

# This function combines two sorted parts of an array into one sorted part
def merge(arr, left, mid, right):
    # Step 1: Create temporary arrays to hold the two halves
    # left half: from "left" to "mid"
    left_half = []
    for i in range(left, mid + 1):
        left_half.append(arr[i])
    
    # right half: from "mid+1" to "right"
    right_half = []
    for i in range(mid + 1, right + 1):
        right_half.append(arr[i])
    
    # Step 2: Merge the two halves back into the original array
    left_index = 0        # Current position in left_half
    right_index = 0       # Current position in right_half
    current_index = left  # Current position in original array
    
    # Compare elements from both halves and place the smaller one first
    while left_index < len(left_half) and right_index < len(right_half):
        if left_half[left_index] <= right_half[right_index]:
            # If left element is smaller or equal, take it
            arr[current_index] = left_half[left_index]
            left_index += 1
        else:
            # If right element is smaller, take it
            arr[current_index] = right_half[right_index]
            right_index += 1
        current_index += 1
    
    # If there are any remaining elements in the left half, add them
    while left_index < len(left_half):
        arr[current_index] = left_half[left_index]
        left_index += 1
        current_index += 1
    
    # If there are any remaining elements in the right half, add them
    while right_index < len(right_half):
        arr[current_index] = right_half[right_index]
        right_index += 1
        current_index += 1`,
    lineHighlighting: {
      start: [46], // The main merge_sort function
      split: [51], // Finding the middle point
      "sort-left": [54], // Sorting the left half
      "sort-right": [57], // Sorting the right half
      "merge-start": [60], // Starting the merge process
      compare: [21, 22], // Comparing elements from both halves
      place: [23, 27], // Placing elements in the result array
      "append-left": [33], // Appending remaining elements from left half
      "append-right": [40], // Appending remaining elements from right half
      "sorted-subarray": [44], // After merging (end of merge function)
      complete: [],
    },
  },

  java: {
    code: `// The main merge sort function that sorts an array from index "left" to "right"
void mergeSort(int arr[], int left, int right) {
    // Base case: If the array has 0 or 1 elements, it's already sorted
    if (left >= right) {
        return;
    }
    
    // Step 1: Find the middle point of the array
    int mid = left + (right - left) / 2;
    
    // Step 2: Sort the left half recursively
    mergeSort(arr, left, mid);
    
    // Step 3: Sort the right half recursively
    mergeSort(arr, mid + 1, right);
    
    // Step 4: Merge the two sorted halves
    merge(arr, left, mid, right);
}
    
// This function combines two sorted parts of an array into one sorted part
void merge(int arr[], int left, int mid, int right) {
    // Step 1: Create temporary arrays to hold the two halves
    // Calculate sizes of the two halves
    int leftSize = mid - left + 1;
    int rightSize = right - mid;
    
    // Create temporary arrays
    int leftHalf[] = new int[leftSize];
    int rightHalf[] = new int[rightSize];
    
    // Copy data to temporary arrays
    for (int i = 0; i < leftSize; i++) {
        leftHalf[i] = arr[left + i];  // left half: from "left" to "mid"
    }
    
    for (int i = 0; i < rightSize; i++) {
        rightHalf[i] = arr[mid + 1 + i];  // right half: from "mid+1" to "right"
    }
    
    // Step 2: Merge the two halves back into the original array
    int leftIndex = 0;        // Current position in leftHalf
    int rightIndex = 0;       // Current position in rightHalf
    int currentIndex = left;  // Current position in original array
    
    // Compare elements from both halves and place the smaller one first
    while (leftIndex < leftSize && rightIndex < rightSize) {
        if (leftHalf[leftIndex] <= rightHalf[rightIndex]) {
            // If left element is smaller or equal, take it
            arr[currentIndex] = leftHalf[leftIndex];
            leftIndex++;
        } else {
            // If right element is smaller, take it
            arr[currentIndex] = rightHalf[rightIndex];
            rightIndex++;
        }
        currentIndex++;
    }
    
    // If there are any remaining elements in the left half, add them
    while (leftIndex < leftSize) {
        arr[currentIndex] = leftHalf[leftIndex];
        leftIndex++;
        currentIndex++;
    }
    
    // If there are any remaining elements in the right half, add them
    while (rightIndex < rightSize) {
        arr[currentIndex] = rightHalf[rightIndex];
        rightIndex++;
        currentIndex++;
    }
}`,
    lineHighlighting: {
      start: [55], // The main mergeSort function
      split: [60], // Finding the middle point
      "sort-left": [63], // Sorting the left half
      "sort-right": [66], // Sorting the right half
      "merge-start": [69], // Starting the merge process
      compare: [27, 28], // Comparing elements from both halves
      place: [29, 33], // Placing elements in the result array
      "append-left": [40], // Appending remaining elements from left half
      "append-right": [47], // Appending remaining elements from right half
      "sorted-subarray": [52], // After merging (end of merge function)
      complete: [],
    },
  },

  cpp: {
    code: `// The main merge sort function that sorts an array from index "left" to "right"
void mergeSort(int arr[], int left, int right) {
    // Base case: If the array has 0 or 1 elements, it's already sorted
    if (left >= right) {
        return;
    }
    
    // Step 1: Find the middle point of the array
    int mid = left + (right - left) / 2;
    
    // Step 2: Sort the left half recursively
    mergeSort(arr, left, mid);
    
    // Step 3: Sort the right half recursively
    mergeSort(arr, mid + 1, right);
    
    // Step 4: Merge the two sorted halves
    merge(arr, left, mid, right);
}
    
// This function combines two sorted parts of an array into one sorted part
void merge(int arr[], int left, int mid, int right) {
    // Step 1: Create temporary arrays to hold the two halves
    // Calculate sizes of the two halves
    int leftSize = mid - left + 1;
    int rightSize = right - mid;
    
    // Create temporary arrays
    int leftHalf[leftSize];
    int rightHalf[rightSize];
    
    // Copy data to temporary arrays
    for (int i = 0; i < leftSize; i++) {
        leftHalf[i] = arr[left + i];  // left half: from "left" to "mid"
    }
    
    for (int i = 0; i < rightSize; i++) {
        rightHalf[i] = arr[mid + 1 + i];  // right half: from "mid+1" to "right"
    }
    
    // Step 2: Merge the two halves back into the original array
    int leftIndex = 0;        // Current position in leftHalf
    int rightIndex = 0;       // Current position in rightHalf
    int currentIndex = left;  // Current position in original array
    
    // Compare elements from both halves and place the smaller one first
    while (leftIndex < leftSize && rightIndex < rightSize) {
        if (leftHalf[leftIndex] <= rightHalf[rightIndex]) {
            // If left element is smaller or equal, take it
            arr[currentIndex] = leftHalf[leftIndex];
            leftIndex++;
        } else {
            // If right element is smaller, take it
            arr[currentIndex] = rightHalf[rightIndex];
            rightIndex++;
        }
        currentIndex++;
    }
    
    // If there are any remaining elements in the left half, add them
    while (leftIndex < leftSize) {
        arr[currentIndex] = leftHalf[leftIndex];
        leftIndex++;
        currentIndex++;
    }
    
    // If there are any remaining elements in the right half, add them
    while (rightIndex < rightSize) {
        arr[currentIndex] = rightHalf[rightIndex];
        rightIndex++;
        currentIndex++;
    }
}`,
    lineHighlighting: {
      start: [53], // The main mergeSort function
      split: [59], // Finding the middle point
      "sort-left": [62], // Sorting the left half
      "sort-right": [65], // Sorting the right half
      "merge-start": [68], // Starting the merge process
      compare: [27, 28], // Comparing elements from both halves
      place: [29, 33], // Placing elements in the result array
      "append-left": [40], // Appending remaining elements from left half
      "append-right": [47], // Appending remaining elements from right half
      "sorted-subarray": [53], // After merging (end of merge function)
      complete: [],
    },
  },
};
