import { createState, cloneNodes } from "./helpers";

export const generateDeleteHeadStates = (nodes, head) => {
  const states = [];
  const initialNodes = cloneNodes(nodes);

  states.push(
    createState(initialNodes, "Preparing to delete head node", "delete-init", [
      head,
    ])
  );

  const headNode = initialNodes.find((node) => node.id === head);
  if (!headNode) {
    return [
      createState(
        initialNodes,
        "Cannot delete from empty list",
        "delete-error"
      ),
    ];
  }

  const newHead = headNode.next;
  const updatedNodes = initialNodes.filter((node) => node.id !== head);

  states.push(
    createState(
      initialNodes,
      `Updating next node (${newHead}) as new head`,
      "delete-update",
      [head, newHead],
      newHead
    )
  );

  states.push(
    createState(
      updatedNodes,
      "Head node deleted successfully",
      "delete-complete",
      [newHead],
      newHead
    )
  );

  return states;
};

export const generateDeleteTailStates = (nodes, head) => {
  const states = [];
  const initialNodes = cloneNodes(nodes);
  let current = head;
  let prev = null;

  states.push(
    createState(initialNodes, "Preparing to delete tail node", "delete-init")
  );

  // Traverse to find the tail and its previous node
  while (current !== null) {
    const currentNode = initialNodes.find((node) => node.id === current);
    if (!currentNode) break;

    states.push(
      createState(
        initialNodes,
        "Traversing to find tail node",
        "delete-traverse",
        [current],
        current,
        null,
        prev
      )
    );

    if (currentNode.next === null) break;
    prev = current;
    current = currentNode.next;
  }

  if (!prev) {
    // Only one node in the list
    return generateDeleteHeadStates(nodes, head);
  }

  // Update previous node's next pointer
  const updatedNodes = initialNodes
    .map((node) => (node.id === prev ? { ...node, next: null } : node))
    .filter((node) => node.id !== current);

  states.push(
    createState(
      updatedNodes,
      "Updating previous node's next pointer to null",
      "delete-update",
      [prev],
      prev
    )
  );

  states.push(
    createState(
      updatedNodes,
      "Tail node deleted successfully",
      "delete-complete",
      [prev],
      prev
    )
  );

  return states;
};

export const generateDeleteAtStates = (nodes, position, head) => {
  const states = [];
  const initialNodes = cloneNodes(nodes);
  let current = head;
  let prev = null;
  let currentPos = 0;

  if (position === null || position === undefined) {
    return [
      createState(
        initialNodes,
        "Error: Position must be provided for delete operation",
        "delete-error"
      ),
    ];
  }

  if (position === 0) {
    return generateDeleteHeadStates(nodes, head);
  }

  states.push(
    createState(
      initialNodes,
      `Preparing to delete node at position ${position}`,
      "delete-init"
    )
  );

  // Traverse to the node at position
  while (current !== null && currentPos < position) {
    const currentNode = initialNodes.find((node) => node.id === current);
    if (!currentNode) break;

    states.push(
      createState(
        initialNodes,
        `Finding node at position ${currentPos}`,
        "delete-traverse",
        [current],
        current,
        null,
        prev
      )
    );

    prev = current;
    current = currentNode.next;
    currentPos++;
  }

  if (currentPos < position || !current) {
    return [
      createState(
        initialNodes,
        `Error: Position ${position} is out of bounds`,
        "delete-error"
      ),
    ];
  }

  const currentNode = initialNodes.find((node) => node.id === current);
  const updatedNodes = initialNodes
    .map((node) =>
      node.id === prev ? { ...node, next: currentNode.next } : node
    )
    .filter((node) => node.id !== current);

  states.push(
    createState(
      updatedNodes,
      `Updating previous node's next pointer to skip deleted node`,
      "delete-update",
      [prev, currentNode.next],
      prev,
      currentNode.next
    )
  );

  states.push(
    createState(
      updatedNodes,
      `Node at position ${position} deleted successfully`,
      "delete-complete",
      [prev],
      prev
    )
  );

  return states;
};

export const generateDeleteByValueStates = (nodes, value, head) => {
  const states = [];
  const initialNodes = cloneNodes(nodes);
  let current = head;
  let prev = null;
  let found = false;

  if (value === null || value === undefined) {
    return [
      createState(
        initialNodes,
        "Error: Value must be provided for delete operation",
        "delete-error"
      ),
    ];
  }

  states.push(
    createState(
      initialNodes,
      `Preparing to delete node with value ${value}`,
      "delete-init"
    )
  );

  while (current !== null) {
    const currentNode = initialNodes.find((node) => node.id === current);
    if (!currentNode) break;

    states.push(
      createState(
        initialNodes,
        `Checking node ${current} with value ${currentNode.value}`,
        "delete-search",
        [current],
        current,
        null,
        prev
      )
    );

    if (currentNode.value == value) {
      found = true;
      if (!prev) {
        // If the first node matches, use deleteHead
        return generateDeleteHeadStates(nodes, head);
      }

      const updatedNodes = initialNodes
        .map((node) =>
          node.id === prev ? { ...node, next: currentNode.next } : node
        )
        .filter((node) => node.id !== current);

      states.push(
        createState(
          updatedNodes,
          `Found node with value ${value}. Updating links to remove it.`,
          "delete-update",
          [prev, currentNode.next],
          prev,
          currentNode.next
        )
      );

      states.push(
        createState(
          updatedNodes,
          `Node with value ${value} deleted successfully`,
          "delete-complete",
          [prev],
          prev
        )
      );
      break;
    }

    prev = current;
    current = currentNode.next;
  }

  if (!found) {
    states.push(
      createState(
        initialNodes,
        `Value ${value} not found in the list`,
        "delete-not-found"
      )
    );
  }

  return states;
};
