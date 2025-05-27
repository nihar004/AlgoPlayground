import { createState, cloneNodes } from "./helpers";

export const generateReverseStates = (nodes, head) => {
  const states = [];
  const initialNodes = cloneNodes(nodes);
  let prev = null;
  let current = head;

  states.push(
    createState(
      initialNodes,
      "Starting to reverse the linked list",
      "reverse-init",
      [head]
    )
  );

  while (current !== null) {
    const currentNode = initialNodes.find((node) => node.id === current);
    if (!currentNode) break;

    const next = currentNode.next;

    states.push(
      createState(
        initialNodes,
        `Reversing pointer for node ${current}`,
        "reverse-step",
        [current],
        current,
        next,
        prev
      )
    );

    // Update the current node's next pointer
    currentNode.next = prev;
    prev = current;
    current = next;
  }

  states.push(
    createState(
      initialNodes,
      "Linked list reversed successfully",
      "reverse-complete",
      [prev],
      prev
    )
  );

  return states;
};

export const generateFindMiddleStates = (nodes, head) => {
  const states = [];
  const initialNodes = cloneNodes(nodes);
  let slow = head;
  let fast = head;

  states.push(
    createState(
      initialNodes,
      "Starting to find middle node using slow and fast pointers",
      "middle-init",
      [head]
    )
  );

  while (fast !== null && fast.next !== null) {
    const fastNode = initialNodes.find((node) => node.id === fast);
    if (!fastNode || !fastNode.next) break;

    states.push(
      createState(
        initialNodes,
        "Moving slow pointer one step and fast pointer two steps",
        "middle-move",
        [slow, fast],
        slow,
        fast
      )
    );

    slow = initialNodes.find((node) => node.id === slow).next;
    fast = initialNodes.find((node) => node.id === fastNode.next).next;
  }

  states.push(
    createState(
      initialNodes,
      `Found middle node: ${slow}`,
      "middle-found",
      [slow],
      slow
    )
  );

  return states;
};
