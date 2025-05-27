// // Registry of all algorithms using objects instead of arrays
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
      id: "singly",
      name: "Singly Linked List",
      operation: {
        // Traversal & Basic Ops
        traversal: {
          traverse: { id: "traverse", name: "Traverse" },
          search: { id: "search", name: "Search by Value" },
          length: { id: "length", name: "Get Length" },
        },

        // Insertion Ops
        insertion: {
          insertHead: { id: "insert-head", name: "Insert at Head" },
          insertTail: { id: "insert-tail", name: "Insert at Tail" },
          insertAt: { id: "insert-at", name: "Insert at Index" },
        },

        // Deletion Ops
        deletion: {
          deleteHead: { id: "delete-head", name: "Delete Head" },
          deleteTail: { id: "delete-tail", name: "Delete Tail" },
          deleteValue: { id: "delete-value", name: "Delete by Value" },
          deleteAt: { id: "delete-at", name: "Delete at Index" },
        },

        // Cycle-Related Ops
        cycle: {
          detectCycle: { id: "detect-cycle", name: "Cycle Detection" },
          cycleSize: { id: "cycle-size", name: "Cycle Size" },
        },

        utility: {
          middle: { id: "middle", name: "Middle Element" },
          reverse: { id: "reverse", name: "Reverse List" },
        },
      },
    },
    doubly: {
      id: "doubly",
      name: "Doubly Linked List",
      operation: {
        traversal: {
          traversalForward: {
            id: "traverse-forward",
            name: "Forward Traversal",
          },
          traversalBackward: {
            id: "traverse-backward",
            name: "Backward Traversal",
          },
          search: { id: "search", name: "Search by Value" },
          length: { id: "length", name: "Get Length" },
        },
        insertion: {
          insertHead: { id: "insert-head", name: "Insert at Head" },
          insertTail: { id: "insert-tail", name: "Insert at Tail" },
          insertAt: { id: "insert-at", name: "Insert at Index" },
        },
        deletion: {
          deleteHead: { id: "delete-head", name: "Delete Head" },
          deleteTail: { id: "delete-tail", name: "Delete Tail" },
          deleteValue: { id: "delete-value", name: "Delete by Value" },
          deleteAt: { id: "delete-at", name: "Delete at Index" },
        },
        utility: {
          reverse: { id: "reverse", name: "Reverse List" },
          middle: { id: "middle", name: "Middle Element" },
        },
      },
    },
    circular: {
      id: "circular",
      name: "Circular Linked List",
      operation: {
        traversal: { id: "circular-traverse", name: "Traversal" },
        insertHead: { id: "circular-insert-head", name: "Insert at Head" },
        insertTail: { id: "circular-insert-tail", name: "Insert at Tail" },
        insertAt: { id: "circular-insert-at", name: "Insert at Index" },
        deleteHead: { id: "circular-delete-head", name: "Delete Head" },
        deleteTail: { id: "circular-delete-tail", name: "Delete Tail" },
        deleteValue: { id: "circular-delete-value", name: "Delete by Value" },
        deleteAt: { id: "circular-delete-at", name: "Delete at Index" },
        search: { id: "circular-search", name: "Search by Value" },
        josephus: { id: "circular-josephus", name: "Josephus Problem" },
        length: { id: "circular-length", name: "Get Length" },
      },
    },
  },
  Stack: {
    array: {
      id: "array",
      name: "Array Implementation",
      ops: {
        push: { id: "stack-array-push", name: "Push" },
        pop: { id: "stack-array-pop", name: "Pop" },
        peek: { id: "stack-array-peek", name: "Peek" },
      },
    },
    linkedList: {
      id: "linkedList",
      name: "Linked List Implementation",
      ops: {
        push: { id: "stack-ll-push", name: "Push" },
        pop: { id: "stack-ll-pop", name: "Pop" },
      },
    },
  },
  Queue: {
    array: {
      id: "queue-array",
      name: "Array Implementation",
      ops: {
        enqueue: { id: "queue-array-enqueue", name: "Enqueue" },
        dequeue: { id: "queue-array-dequeue", name: "Dequeue" },
        peek: { id: "queue-array-peek", name: "Peek" },
      },
    },
    linkedList: {
      id: "queue-ll",
      name: "Linked List Implementation",
      ops: {
        enqueue: { id: "queue-ll-enqueue", name: "Enqueue" },
        dequeue: { id: "queue-ll-dequeue", name: "Dequeue" },
      },
    },
    circular: {
      id: "queue-circular",
      name: "Circular Queue",
      ops: {
        enqueue: { id: "queue-circular-enqueue", name: "Enqueue" },
        dequeue: { id: "queue-circular-dequeue", name: "Dequeue" },
      },
    },
    priority: {
      id: "queue-priority",
      name: "Priority Queue",
      ops: {
        insert: { id: "queue-priority-insert", name: "Insert" },
        deleteMax: { id: "queue-priority-delete-max", name: "Delete Maximum" },
      },
    },
  },
  Trees: {
    binary: {
      id: "tree-binary",
      name: "Binary Tree",
      ops: {
        traverseInorder: {
          id: "tree-binary-inorder",
          name: "Inorder Traversal",
        },
        traversePreorder: {
          id: "tree-binary-preorder",
          name: "Preorder Traversal",
        },
        traversePostorder: {
          id: "tree-binary-postorder",
          name: "Postorder Traversal",
        },
        levelOrder: {
          id: "tree-binary-level-order",
          name: "Level Order Traversal",
        },
      },
    },
    bst: {
      id: "tree-bst",
      name: "Binary Search Tree",
      ops: {
        insert: { id: "tree-bst-insert", name: "Insertion" },
        delete: { id: "tree-bst-delete", name: "Deletion" },
        search: { id: "tree-bst-search", name: "Search" },
      },
    },
    avl: {
      id: "tree-avl",
      name: "AVL Tree",
      ops: {
        insert: { id: "tree-avl-insert", name: "Insertion" },
        delete: { id: "tree-avl-delete", name: "Deletion" },
        rotations: { id: "tree-avl-rotations", name: "Rotations" },
      },
    },
    redBlack: {
      id: "tree-rb",
      name: "Red-Black Tree",
      ops: {
        insert: { id: "tree-rb-insert", name: "Insertion" },
        delete: { id: "tree-rb-delete", name: "Deletion" },
      },
    },
    trie: {
      id: "tree-trie",
      name: "Trie",
      ops: {
        insert: { id: "tree-trie-insert", name: "Insertion" },
        search: { id: "tree-trie-search", name: "Search" },
        delete: { id: "tree-trie-delete", name: "Deletion" },
      },
    },
  },
  HashTable: {
    directAddressing: {
      id: "hash-direct",
      name: "Direct Addressing",
    },
    openAddressing: {
      id: "hash-open",
      name: "Open Addressing",
      ops: {
        linearProbing: { id: "hash-open-linear", name: "Linear Probing" },
        quadraticProbing: {
          id: "hash-open-quadratic",
          name: "Quadratic Probing",
        },
        doubleHashing: { id: "hash-open-double", name: "Double Hashing" },
      },
    },
    separateChaining: {
      id: "hash-separate",
      name: "Separate Chaining",
    },
    hashFunctions: {
      id: "hash-functions",
      name: "Hash Functions",
      ops: {
        divisionMethod: { id: "hash-func-division", name: "Division Method" },
        multiplicationMethod: {
          id: "hash-func-multiplication",
          name: "Multiplication Method",
        },
        universalHashing: {
          id: "hash-func-universal",
          name: "Universal Hashing",
        },
      },
    },
  },
  Heap: {
    minHeap: {
      id: "heap-min",
      name: "Min Heap",
      ops: {
        insert: { id: "heap-min-insert", name: "Insertion" },
        extractMin: { id: "heap-min-extract", name: "Extract Min" },
        decreaseKey: { id: "heap-min-decrease", name: "Decrease Key" },
        heapify: { id: "heap-min-heapify", name: "Heapify" },
      },
    },
    maxHeap: {
      id: "heap-max",
      name: "Max Heap",
      ops: {
        insert: { id: "heap-max-insert", name: "Insertion" },
        extractMax: { id: "heap-max-extract", name: "Extract Max" },
        increaseKey: { id: "heap-max-increase", name: "Increase Key" },
        heapify: { id: "heap-max-heapify", name: "Heapify" },
      },
    },
    fibonacciHeap: {
      id: "heap-fibonacci",
      name: "Fibonacci Heap",
      ops: {
        insert: { id: "heap-fibonacci-insert", name: "Insertion" },
        union: { id: "heap-fibonacci-union", name: "Union" },
        extractMin: { id: "heap-fibonacci-extract-min", name: "Extract Min" },
      },
    },
  },
  Graph: {
    representation: {
      id: "graph-rep",
      name: "Graph Representation",
      ops: {
        adjacencyMatrix: { id: "graph-rep-matrix", name: "Adjacency Matrix" },
        adjacencyList: { id: "graph-rep-list", name: "Adjacency List" },
      },
    },
    traversal: {
      id: "graph-traversal",
      name: "Graph Traversal",
      ops: {
        bfs: { id: "graph-bfs", name: "Breadth-First Search" },
        dfs: { id: "graph-dfs", name: "Depth-First Search" },
      },
    },
    shortestPath: {
      id: "graph-shortest",
      name: "Shortest Path Algorithms",
      ops: {
        dijkstra: { id: "graph-dijkstra", name: "Dijkstra's Algorithm" },
        bellmanFord: {
          id: "graph-bellman-ford",
          name: "Bellman-Ford Algorithm",
        },
        floydWarshall: {
          id: "graph-floyd-warshall",
          name: "Floyd-Warshall Algorithm",
        },
      },
    },
    mst: {
      id: "graph-mst",
      name: "Minimum Spanning Tree",
      ops: {
        kruskal: { id: "graph-kruskal", name: "Kruskal's Algorithm" },
        prim: { id: "graph-prim", name: "Prim's Algorithm" },
      },
    },
    topologicalSort: {
      id: "graph-topo",
      name: "Topological Sort",
    },
    stronglyConnected: {
      id: "graph-scc",
      name: "Strongly Connected Components",
      ops: {
        kosaraju: { id: "graph-kosaraju", name: "Kosaraju's Algorithm" },
        tarjan: { id: "graph-tarjan", name: "Tarjan's Algorithm" },
      },
    },
  },
  Fundamentals: {
    "if-else": {
      id: "fundamentals-if-else",
      name: "If-Else Statements",
    },
    forLoop: {
      id: "fundamentals-for-loop",
      name: "For Loop",
    },
    functions: {
      id: "fundamentals-functions",
      name: "Functions",
    },
    // asymptotic: {
    //   id: "fundamentals-asymptotic",
    //   name: "Asymptotic Analysis",
    //   ops: {
    //     bigO: { id: "fundamentals-big-o", name: "Big O Notation" },
    //     bigOmega: { id: "fundamentals-big-omega", name: "Big Omega Notation" },
    //     bigTheta: { id: "fundamentals-big-theta", name: "Big Theta Notation" },
    //   },
    // },
    // recursion: {
    //   id: "fundamentals-recursion",
    //   name: "Recursion",
    //   ops: {
    //     factorial: {
    //       id: "fundamentals-recursion-factorial",
    //       name: "Factorial",
    //     },
    //     fibonacci: {
    //       id: "fundamentals-recursion-fibonacci",
    //       name: "Fibonacci",
    //     },
    //   },
    // },
    // divideConquer: {
    //   id: "fundamentals-dc",
    //   name: "Divide and Conquer",
    //   ops: {
    //     binarySearch: {
    //       id: "fundamentals-dc-binsearch",
    //       name: "Binary Search",
    //     },
    //     mergeSort: { id: "fundamentals-dc-mergesort", name: "Merge Sort" },
    //   },
    // },
    // dynamicProgramming: {
    //   id: "fundamentals-dp",
    //   name: "Dynamic Programming",
    //   ops: {
    //     fibonacci: { id: "fundamentals-dp-fibonacci", name: "Fibonacci" },
    //     knapsack: { id: "fundamentals-dp-knapsack", name: "0/1 Knapsack" },
    //     lcs: { id: "fundamentals-dp-lcs", name: "Longest Common Subsequence" },
    //   },
    // },
    // greedy: {
    //   id: "fundamentals-greedy",
    //   name: "Greedy Algorithms",
    //   ops: {
    //     activitySelection: {
    //       id: "fundamentals-greedy-activity",
    //       name: "Activity Selection",
    //     },
    //     huffmanCoding: {
    //       id: "fundamentals-greedy-huffman",
    //       name: "Huffman Coding",
    //     },
    //   },
    // },
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
    name: "LinkedList",
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
