/**
 * Helper function to create a new linked list with random values
 * @param {Number} size - Number of nodes to create
 * @param {Boolean} hasCycle - Whether to create a cycle in the list
 * @param {Number} cyclePos - Position to create cycle at (if hasCycle is true)
 * @return {Object} Object containing nodes array and head ID
 */
export const createLinkedList = (
  size = 5,
  hasCycle = false,
  cyclePos = null
) => {
  if (size <= 0) return { nodes: [], head: null };

  // Create nodes with random values
  const nodes = [];
  for (let i = 1; i <= size; i++) {
    const value = Math.floor(Math.random() * 100); // Random value between 0-99
    nodes.push({
      id: i,
      value,
      next: i < size ? i + 1 : null, // Point to next node, or null if last node
    });
  }

  // Create cycle if requested
  if (hasCycle && cyclePos !== null && cyclePos < size) {
    const lastNode = nodes[size - 1];
    lastNode.next = cyclePos + 1; // Point last node to node at cycle position (1-indexed)
  }

  return {
    nodes,
    head: 1, // First node is head
  };
};

/**
 * Apply a state to the current linked list visualization
 * @param {Object} state - State object from generateStates
 * @return {Object} Updated linked list data for visualization
 */
export const applyState = (state) => {
  return {
    nodes: state.nodes,
    head: state.head || 1,
    activeNode: state.nodes.find((node) => node.isCurrent)?.id || null,
    highlightedNodes: state.nodes
      .filter((node) => node.isHighlighted)
      .map((node) => node.id),
    nextPointer: state.nodes.find((node) => node.isNext)?.id || null,
    prevPointer: state.nodes.find((node) => node.isPrev)?.id || null,
    newNode: state.nodes.find((node) => node.isNew)?.id || null,
    cycleNodes: state.nodes
      .filter((node) => node.isCycle)
      .map((node) => node.id),
    description: state.description,
    action: state.action,
  };
};

/**
 * Generate a demo state sequence for the selected operation
 * @param {String} operation - The operation to demonstrate
 * @return {Array} Array of states for the demo
 */
export const generateDemoStates = (operation) => {
  // Create a sample linked list for the demo
  let { nodes, head } = createLinkedList(6);

  // For cycle demos, create a list with a cycle
  if (operation === "detect-cycle" || operation === "cycle-size") {
    ({ nodes, head } = createLinkedList(6, true, 2));
  }

  // Generate demo states based on operation
  switch (operation) {
    case "traverse":
    case "length":
      return generateStates(nodes, operation, null, null, head);

    case "search":
      // Search for a value that exists in the list
      return generateStates(nodes, operation, nodes[2].value, null, head);

    case "insert-head":
      return generateStates(nodes, operation, 999, null, head);

    case "insert-tail":
      return generateStates(nodes, operation, 888, null, head);

    case "insert-at":
      return generateStates(nodes, operation, 777, 2, head);

    case "delete-head":
      return generateStates(nodes, operation, null, null, head);

    case "delete-tail":
      return generateStates(nodes, operation, null, null, head);

    case "delete-value":
      return generateStates(nodes, operation, nodes[2].value, null, head);

    case "delete-at":
      return generateStates(nodes, operation, null, 2, head);

    case "detect-cycle":
    case "cycle-size":
      return generateStates(nodes, operation, null, null, head);

    case "middle":
      return generateStates(nodes, operation, null, null, head);

    case "reverse":
      return generateStates(nodes, operation, null, null, head);

    default:
      return generateStates(nodes, "traverse", null, null, head);
  }
};
