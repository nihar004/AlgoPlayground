import { createState, cloneNodes } from "./helpers";

export const generateInsertHeadStates = (nodes, value = -1, head) => {
  const states = [];
  const initialNodes = cloneNodes(nodes);

  // Use default value if none provided
  const insertValue = value === null ? -1 : value;

  states.push(
    createState(
      initialNodes,
      `Preparing to insert value ${insertValue} at head`,
      "insert-init"
    )
  );

  // Create new node
  const newNodeId = Math.max(...initialNodes.map((n) => n.id)) + 1;
  const newNode = {
    id: newNodeId,
    value: insertValue,
    next: head,
  };

  // Add new node to nodes array
  const updatedNodes = [...initialNodes, newNode];

  states.push(
    createState(
      updatedNodes,
      "Created new node",
      "insert-create",
      [],
      null,
      null,
      null,
      newNodeId
    )
  );

  states.push(
    createState(
      updatedNodes,
      `Setting new node's next pointer to current head (${head})`,
      "insert-link",
      [head],
      newNodeId,
      head
    )
  );

  states.push(
    createState(
      updatedNodes,
      "Insert complete. New node is now the head",
      "insert-complete",
      [],
      newNodeId
    )
  );

  return states;
};

export const generateInsertTailStates = (nodes, value = -1, head) => {
  const states = [];
  const initialNodes = cloneNodes(nodes);
  const insertValue = value === null ? -1 : value;
  let current = head;

  states.push(
    createState(
      initialNodes,
      `Preparing to insert value ${insertValue} at tail`,
      "insert-init"
    )
  );

  // Find the tail node
  while (current !== null) {
    const currentNode = initialNodes.find((node) => node.id === current);
    if (!currentNode) break;

    states.push(
      createState(
        initialNodes,
        "Traversing to find tail node",
        "insert-traverse",
        [current],
        current
      )
    );

    if (currentNode.next === null) break;
    current = currentNode.next;
  }

  // Create new node
  const newNodeId = Math.max(...initialNodes.map((n) => n.id)) + 1;
  const newNode = {
    id: newNodeId,
    value: insertValue,
    next: null,
  };

  // Add new node and update tail's next pointer
  const updatedNodes = initialNodes.map((node) =>
    node.id === current ? { ...node, next: newNodeId } : node
  );
  updatedNodes.push(newNode);

  states.push(
    createState(
      updatedNodes,
      "Created new node",
      "insert-create",
      [],
      null,
      null,
      null,
      newNodeId
    )
  );

  states.push(
    createState(
      updatedNodes,
      `Linking tail node to new node`,
      "insert-link",
      [current],
      current,
      newNodeId
    )
  );

  states.push(
    createState(
      updatedNodes,
      "Insert complete. New node added at tail",
      "insert-complete",
      [],
      newNodeId
    )
  );

  return states;
};

export const generateInsertAtStates = (nodes, value = -1, position, head) => {
  const states = [];
  const initialNodes = cloneNodes(nodes);
  const insertValue = value === null ? -1 : value;
  let current = head;
  let prev = null;
  let currentPos = 0;

  states.push(
    createState(
      initialNodes,
      `Preparing to insert value ${insertValue} at position ${position}`,
      "insert-init"
    )
  );

  // Traverse to position
  while (current !== null && currentPos < position) {
    const currentNode = initialNodes.find((node) => node.id === current);
    if (!currentNode) break;

    states.push(
      createState(
        initialNodes,
        `Finding insertion position. Current position: ${currentPos}`,
        "insert-traverse",
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

  // Create new node
  const newNodeId = Math.max(...initialNodes.map((n) => n.id)) + 1;
  const newNode = {
    id: newNodeId,
    value: insertValue,
    next: current,
  };

  // Update nodes array
  const updatedNodes = initialNodes.map((node) =>
    node.id === prev ? { ...node, next: newNodeId } : node
  );
  updatedNodes.push(newNode);

  states.push(
    createState(
      updatedNodes,
      "Created new node",
      "insert-create",
      [],
      null,
      null,
      null,
      newNodeId
    )
  );

  states.push(
    createState(
      updatedNodes,
      `Linking new node to next node`,
      "insert-link",
      [newNodeId, current],
      newNodeId,
      current
    )
  );

  if (prev !== null) {
    states.push(
      createState(
        updatedNodes,
        `Linking previous node to new node`,
        "insert-link-prev",
        [prev, newNodeId],
        prev,
        newNodeId
      )
    );
  }

  states.push(
    createState(
      updatedNodes,
      `Insert complete. Node inserted at position ${position}`,
      "insert-complete",
      [],
      newNodeId
    )
  );

  return states;
};
