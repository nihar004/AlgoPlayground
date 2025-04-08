// Registry of all algorithms using objects instead of arrays

export const algorithms = {
  Sorting: {
    bubble: {
      id: "bubble",
      name: "Bubble Sort",
    },
    selection: {
      id: "selection",
      name: "Selection Sort",
    },
    insertion: {
      id: "insertion",
      name: "Insertion Sort",
    },
    quick: {
      id: "quick",
      name: "Quick Sort",
    },
    merge: {
      id: "merge",
      name: "Merge Sort",
    },
  },
  Searching: {
    linear: {
      id: "linear",
      name: "Linear Search",
    },
    binary: {
      id: "binary",
      name: "Binary Search",
    },
  },
  LinkedList: {
    singly: {
      id: "ll-singly",
      name: "Singly Linked List",
      ops: {
        traversal: { id: "ll-singly-traverse", name: "Traversal" },
        insert: { id: "ll-singly-insert", name: "Insertion" },
        delete: { id: "ll-singly-delete", name: "Deletion" },
      },
    },
    doubly: {
      id: "ll-doubly",
      name: "Doubly Linked List",
      ops: {
        insertHead: { id: "ll-doubly-insert-head", name: "Head Insertion" },
        deleteTail: { id: "ll-doubly-delete-tail", name: "Tail Deletion" },
      },
    },
    circular: {
      id: "ll-circular",
      name: "Circular Linked List",
      ops: {
        josephus: { id: "ll-circular-josephus", name: "Josephus Problem" },
      },
    },
  },
};

export const algorithmCardData = {
  Fundamentals: {
    name: "Fundamentals",
    background: "from-yellow-100 via-yellow-300 to-yellow-500",
    button: "from-yellow-500 to-yellow-300",
    image: "fundamentals_img.png",
  },
  Sorting: {
    name: "Sorting",
    background: "from-blue-100 via-blue-400 to-blue-600",
    button: "from-blue-600 to-blue-300",
    image: "sorting_img.png",
  },
  Searching: {
    name: "Searching",
    background: "from-purple-200 to-indigo-600",
    button: "from-indigo-700 to-indigo-400",
    image: "searching_img.png",
  },
  LinkedList: {
    name: "Linked List",
    background: "from-red-100 via-red-300 to-red-500",
    button: "from-red-500 to-red-300",
    image: "linkedlist_img.png",
  },
  Stack: {
    name: "Stack",
    background: "from-orange-100 via-orange-300 to-orange-500",
    button: "from-orange-500 to-orange-300",
    image: "stack_img.png",
  },
  Queue: {
    name: "Queue",
    background: "from-pink-100 via-pink-300 to-pink-500",
    button: "from-pink-500 to-pink-300",
    image: "queue_img.png",
  },
  Trees: {
    name: "Trees",
    background: "from-green-100 via-green-300 to-green-500",
    button: "from-green-500 to-green-300",
    image: "trees_img.png",
  },
  HashTable: {
    name: "Hash Table",
    background: "from-teal-100 via-teal-300 to-teal-500",
    button: "from-teal-500 to-teal-300",
    image: "hashtable_img.png",
  },
  Heap: {
    name: "Heap",
    background: "from-cyan-100 via-cyan-300 to-cyan-500",
    button: "from-cyan-500 to-cyan-300",
    image: "heap_img.png",
  },
  Graph: {
    name: "Graph",
    background: "from-green-50 via-green-300 to-green-600",
    button: "from-green-600 to-green-400",
    image: "graph_img.png",
  },
};
