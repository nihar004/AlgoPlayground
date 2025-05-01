export const metadata = {
  traversal: {
    traverse: {
      timeComplexity: {
        best: { value: "O(n)", explanation: "Must visit every node once" },
        average: {
          value: "O(n)",
          explanation: "Always requires visiting all nodes",
        },
        worst: { value: "O(n)", explanation: "No shortcuts possible" },
      },
      spaceComplexity: {
        value: "O(1)",
        explanation: "Uses a single temporary pointer",
      },
    },
    search: {
      timeComplexity: {
        best: { value: "O(1)", explanation: "Element found at head" },
        average: {
          value: "O(n)",
          explanation: "Typically checks half the list",
        },
        worst: { value: "O(n)", explanation: "Element at tail or not present" },
      },
      spaceComplexity: {
        value: "O(1)",
        explanation: "No additional memory needed",
      },
    },
    length: {
      timeComplexity: {
        best: { value: "O(n)", explanation: "Must count all nodes" },
        average: {
          value: "O(n)",
          explanation: "Always requires full traversal",
        },
        worst: { value: "O(n)", explanation: "No optimization possible" },
      },
      spaceComplexity: {
        value: "O(1)",
        explanation: "Uses a single counter",
      },
    },
  },

  utility: {
    middle: {
      timeComplexity: {
        best: {
          value: "O(n)",
          explanation: "Fast pointer must traverse full list",
        },
        average: { value: "O(n)", explanation: "Consistent linear time" },
        worst: { value: "O(n)", explanation: "No better case exists" },
      },
      spaceComplexity: {
        value: "O(1)",
        explanation: "Two-pointer technique",
      },
    },
    reverse: {
      timeComplexity: {
        best: { value: "O(n)", explanation: "Must process all nodes" },
        average: { value: "O(n)", explanation: "Linear time operation" },
        worst: { value: "O(n)", explanation: "Always requires full traversal" },
      },
      spaceComplexity: {
        value: "O(1)",
        explanation: "In-place pointer manipulation",
      },
    },
  },

  insertion: {
    insertHead: {
      timeComplexity: {
        best: { value: "O(1)", explanation: "Direct head modification" },
        average: { value: "O(1)", explanation: "Constant time operation" },
        worst: { value: "O(1)", explanation: "Never depends on list size" },
      },
      spaceComplexity: {
        value: "O(1)",
        explanation: "Single node allocation",
      },
    },
    insertTail: {
      timeComplexity: {
        best: { value: "O(n)", explanation: "Must traverse full list" },
        average: {
          value: "O(n)",
          explanation: "Linear time without pointer",
        },
        worst: { value: "O(n)", explanation: "No optimization possible" },
      },
      spaceComplexity: {
        value: "O(1)",
        explanation: "Single node allocation",
      },
    },
    insertAt: {
      timeComplexity: {
        best: { value: "O(1)", explanation: "Inserting at head position" },
        average: {
          value: "O(n)",
          explanation: "Typically requires partial traversal",
        },
        worst: {
          value: "O(n)",
          explanation: "Inserting at tail without pointer",
        },
      },
      spaceComplexity: {
        value: "O(1)",
        explanation: "Single node allocation",
      },
    },
  },

  deletion: {
    deleteHead: {
      timeComplexity: {
        best: { value: "O(1)", explanation: "Direct head pointer update" },
        average: { value: "O(1)", explanation: "Constant time operation" },
        worst: { value: "O(1)", explanation: "Never depends on list size" },
      },
      spaceComplexity: {
        value: "O(1)",
        explanation: "No additional memory needed",
      },
    },
    deleteTail: {
      timeComplexity: {
        best: { value: "O(n)", explanation: "Must find second-to-last node" },
        average: { value: "O(n)", explanation: "Typically full traversal" },
        worst: { value: "O(n)", explanation: "No optimization possible" },
      },
      spaceComplexity: {
        value: "O(1)",
        explanation: "In-place pointer updates",
      },
    },
    deleteValue: {
      timeComplexity: {
        best: { value: "O(1)", explanation: "Value at head" },
        average: {
          value: "O(n)",
          explanation: "Typically checks half the list",
        },
        worst: { value: "O(n)", explanation: "Value at tail or not present" },
      },
      spaceComplexity: {
        value: "O(1)",
        explanation: "Modifies existing links",
      },
    },
    deleteAt: {
      timeComplexity: {
        best: { value: "O(1)", explanation: "Deleting head node" },
        average: { value: "O(n)", explanation: "Typically partial traversal" },
        worst: { value: "O(n)", explanation: "Deleting tail without pointer" },
      },
      spaceComplexity: {
        value: "O(1)",
        explanation: "In-place modification",
      },
    },
  },

  cycle: {
    detectCycle: {
      timeComplexity: {
        best: { value: "O(n)", explanation: "Cycle at beginning" },
        average: { value: "O(n)", explanation: "Linear time detection" },
        worst: { value: "O(n)", explanation: "Cycle at end" },
      },
      spaceComplexity: {
        value: "O(1)",
        explanation: "Two-pointer technique",
      },
    },
    cycleSize: {
      timeComplexity: {
        best: { value: "O(n)", explanation: "Cycle detected early" },
        average: { value: "O(n)", explanation: "Full cycle traversal" },
        worst: { value: "O(n)", explanation: "Maximum cycle length" },
      },
      spaceComplexity: {
        value: "O(1)",
        explanation: "Constant space counters",
      },
    },
  },
};
