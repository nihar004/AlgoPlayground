import { createState, cloneNodes } from "./helpers";

export const generateTraversalStates = (nodes, head) => {
  const states = [];
  const initialNodes = cloneNodes(nodes);
  let current = head;
  let step = 1;

  states.push(createState(initialNodes, "Starting traversal", "start"));

  while (current !== null) {
    const currentNode = initialNodes.find((node) => node.id === current);
    if (!currentNode) break;

    states.push(
      createState(
        initialNodes,
        `Step ${step}: Visiting node ${current} with value ${currentNode.value}`,
        "traverse",
        [],
        current
      )
    );

    current = currentNode.next;
    step++;
  }

  states.push(createState(initialNodes, "Traversal complete", "complete"));
  return states;
};

export const generateSearchStates = (nodes, value, head) => {
  const states = [];
  const initialNodes = cloneNodes(nodes);
  let current = head;
  let step = 1;
  let found = false;

  // If no value provided, search for the middle node's value
  if (value === null) {
    // Find middle node value using slow/fast pointer
    let slow = head;
    let fast = head;
    let middleValue;

    while (fast !== null && fast.next !== null) {
      const fastNode = initialNodes.find((n) => n.id === fast);
      if (!fastNode || !fastNode.next) break;

      slow = initialNodes.find((n) => n.id === slow).next;
      fast = initialNodes.find((n) => n.id === fastNode.next).next;
    }

    middleValue = initialNodes.find((n) => n.id === slow).value;
    value = middleValue;
    states.push(
      createState(
        initialNodes,
        `No search value provided. Searching for middle node value: ${value}`,
        "search-init"
      )
    );
  } else {
    states.push(
      createState(
        initialNodes,
        `Starting search for value: ${value}`,
        "search-init"
      )
    );
  }

  while (current !== null) {
    const currentNode = initialNodes.find((node) => node.id === current);
    if (!currentNode) break;

    states.push(
      createState(
        initialNodes,
        `Step ${step}: Checking node ${current} with value ${currentNode.value}`,
        "search",
        [current], // Highlight current node being checked
        current
      )
    );

    if (currentNode.value == value) {
      found = true;
      states.push(
        createState(
          initialNodes,
          `Found value ${value} at node ${current}!`,
          "search-found",
          [current],
          current
        )
      );
      break;
    }

    current = currentNode.next;
    step++;
  }

  if (!found) {
    states.push(
      createState(
        initialNodes,
        `Value ${value} not found in the list`,
        "search-not-found"
      )
    );
  }

  return states;
};

export const generateLengthStates = (nodes, head) => {
  const states = [];
  const initialNodes = cloneNodes(nodes);
  let current = head;
  let length = 0;
  let step = 1;

  states.push(
    createState(initialNodes, "Starting length calculation", "length-init")
  );

  while (current !== null) {
    const currentNode = initialNodes.find((node) => node.id === current);
    if (!currentNode) break;

    length++;
    states.push(
      createState(
        initialNodes,
        `Step ${step}: Counting node ${current}. Current length: ${length}`,
        "length-count",
        [current],
        current
      )
    );

    current = currentNode.next;
    step++;
  }

  states.push(
    createState(
      initialNodes,
      `List length calculation complete. Total length: ${length}`,
      "length-complete",
      []
    )
  );

  return states;
};
