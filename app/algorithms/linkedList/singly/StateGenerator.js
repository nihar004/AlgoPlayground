/**
 * Generate visualization states for linked list operations
 * @param {Array} nodes - Current nodes in the linked list
 * @param {String} operation - Operation type from the operations object
 * @param {*} value - Value for operations that require it (e.g., insert, search)
 * @param {Number} position - Position/index for operations that require it
 * @param {Number} head - The current head node ID
 * @return {Array} Array of states for visualization
 */
export const generateStates = (
  nodes,
  operation,
  value = null,
  position = null,
  head = 1
) => {
  // Create a deep copy of nodes to avoid mutations
  const initialNodes = JSON.parse(JSON.stringify(nodes));
  const states = [];

  // Helper function to create a state
  const createState = (
    nodes,
    description,
    action,
    focusNodes = [],
    currentNode = null,
    nextPointer = null,
    prevPointer = null,
    newNode = null,
    cycleNodes = []
  ) => {
    return {
      nodes: nodes.map((node) => ({
        ...node,
        isHighlighted: focusNodes.includes(node.id),
        isCurrent: node.id === currentNode,
        isNext: node.id === nextPointer,
        isPrev: node.id === prevPointer,
        isNew: node.id === newNode,
        isCycle: cycleNodes.includes(node.id),
      })),
      head,
      description,
      action,
    };
  };

  // Initial state - always start with a clean slate
  states.push(
    createState(initialNodes, `Starting operation: ${operation}`, "start")
  );

  // Implementation for different operations
  switch (operation) {
    case "traverse": {
      // Track current node ID starting from head
      let current = head;
      let step = 1;

      while (current !== null) {
        const currentNode = initialNodes.find((node) => node.id === current);
        if (!currentNode) break;

        states.push(
          createState(
            initialNodes,
            `Step ${step}: Visiting node ${current} with value ${currentNode.value}`,
            "traverse",
            [], // focus nodes
            current // current node
          )
        );

        current = currentNode.next;
        step++;
      }

      states.push(
        createState(
          initialNodes,
          "Traversal complete. Reached end of list.",
          "complete"
        )
      );
      break;
    }

    case "search": {
      if (value === null) {
        states.push(
          createState(initialNodes, "Error: No search value provided", "error")
        );
        break;
      }

      let current = head;
      let step = 1;
      let found = false;

      while (current !== null) {
        const currentNode = initialNodes.find((node) => node.id === current);
        if (!currentNode) break;

        if (currentNode.value === value) {
          states.push(
            createState(
              initialNodes,
              `Step ${step}: Found value ${value} at node ${current}!`,
              "found",
              [current], // highlight the found node
              current
            )
          );
          found = true;
          break;
        } else {
          states.push(
            createState(
              initialNodes,
              `Step ${step}: Checking node ${current} with value ${currentNode.value}. Not a match, moving to next.`,
              "search",
              [], // no focus nodes
              current, // current node
              currentNode.next // next pointer
            )
          );
        }

        current = currentNode.next;
        step++;
      }

      if (!found) {
        states.push(
          createState(
            initialNodes,
            `Value ${value} not found in the list after checking all nodes.`,
            "not-found"
          )
        );
      }
      break;
    }

    case "length": {
      let current = head;
      let length = 0;
      let step = 1;

      while (current !== null) {
        const currentNode = initialNodes.find((node) => node.id === current);
        if (!currentNode) break;

        length++;
        states.push(
          createState(
            initialNodes,
            `Step ${step}: Counting node ${current}. Length so far: ${length}`,
            "count",
            [], // no focus nodes
            current // current node
          )
        );

        current = currentNode.next;
        step++;
      }

      states.push(
        createState(
          initialNodes,
          `Length calculation complete. The list has ${length} nodes.`,
          "complete"
        )
      );
      break;
    }

    case "insert-head": {
      if (value === null) {
        states.push(
          createState(
            initialNodes,
            "Error: No value provided for insertion",
            "error"
          )
        );
        break;
      }

      // Create a copy of nodes to modify
      let updatedNodes = JSON.parse(JSON.stringify(initialNodes));

      // Find max id to create new node
      const maxId = Math.max(...updatedNodes.map((node) => node.id), 0);
      const newNodeId = maxId + 1;

      // Create new node pointing to current head
      const newNode = { id: newNodeId, value, next: head };

      // Show the new node being created
      states.push(
        createState(
          [...updatedNodes, newNode],
          `Creating new node with ID ${newNodeId} and value ${value}`,
          "create-node",
          [newNodeId], // focus on new node
          null, // no current node
          null, // no next pointer
          null, // no prev pointer
          newNodeId // mark as new node
        )
      );

      // Show the new node's next pointer being set to head
      states.push(
        createState(
          [...updatedNodes, newNode],
          `Setting new node's next pointer to current head (Node ${head})`,
          "set-pointer",
          [newNodeId, head], // focus on new node and head
          newNodeId, // current node is new node
          head // next pointer is head
        )
      );

      // Update head to point to new node
      const newHead = newNodeId;

      // Final state with updated head
      states.push(
        createState(
          [...updatedNodes, newNode],
          `Updating head to point to new node. Node ${newNodeId} is now the head.`,
          "update-head",
          [newNodeId] // focus on new node
        )
      );

      // Update head in result
      states[states.length - 1].head = newHead;
      break;
    }

    case "insert-tail": {
      if (value === null) {
        states.push(
          createState(
            initialNodes,
            "Error: No value provided for insertion",
            "error"
          )
        );
        break;
      }

      // Create a copy of nodes to modify
      let updatedNodes = JSON.parse(JSON.stringify(initialNodes));

      // Find max id to create new node
      const maxId = Math.max(...updatedNodes.map((node) => node.id), 0);
      const newNodeId = maxId + 1;

      // Create new node with null next pointer
      const newNode = { id: newNodeId, value, next: null };

      // Show the new node being created
      states.push(
        createState(
          [...updatedNodes, newNode],
          `Creating new node with ID ${newNodeId} and value ${value}`,
          "create-node",
          [newNodeId], // focus on new node
          null, // no current node
          null, // no next pointer
          null, // no prev pointer
          newNodeId // mark as new node
        )
      );

      // Find the tail node (node with null next)
      let current = head;
      let prev = null;
      let step = 1;

      while (current !== null) {
        const currentNode = updatedNodes.find((node) => node.id === current);
        if (!currentNode) break;

        states.push(
          createState(
            [...updatedNodes, newNode],
            `Step ${step}: Traversing to find the tail. Currently at node ${current}.`,
            "traverse",
            [], // no focus nodes
            current // current node is being checked
          )
        );

        if (currentNode.next === null) {
          // Found the tail
          break;
        }

        prev = current;
        current = currentNode.next;
        step++;
      }

      if (current === null) {
        // Empty list case
        states.push(
          createState(
            [...updatedNodes, newNode],
            "List is empty. New node will become the head.",
            "update-head",
            [newNodeId] // focus on new node
          )
        );
        states[states.length - 1].head = newNodeId;
      } else {
        // Update tail's next pointer to new node
        const tailNode = updatedNodes.find((node) => node.id === current);
        tailNode.next = newNodeId;

        states.push(
          createState(
            [...updatedNodes, newNode],
            `Updating tail node ${current}'s next pointer to new node ${newNodeId}`,
            "update-pointer",
            [current, newNodeId], // focus on tail and new node
            current, // current node is tail
            newNodeId // next pointer is new node
          )
        );
      }

      states.push(
        createState(
          [...updatedNodes, newNode],
          `Insertion at tail complete. Node ${newNodeId} is now the new tail.`,
          "complete",
          [newNodeId] // focus on new node
        )
      );
      break;
    }

    case "insert-at": {
      if (value === null || position === null) {
        states.push(
          createState(
            initialNodes,
            "Error: Missing value or position for insertion",
            "error"
          )
        );
        break;
      }

      // Create a copy of nodes to modify
      let updatedNodes = JSON.parse(JSON.stringify(initialNodes));

      // Find max id to create new node
      const maxId = Math.max(...updatedNodes.map((node) => node.id), 0);
      const newNodeId = maxId + 1;

      // Create new node (next will be set later)
      const newNode = { id: newNodeId, value, next: null };

      // Show the new node being created
      states.push(
        createState(
          [...updatedNodes, newNode],
          `Creating new node with ID ${newNodeId} and value ${value}`,
          "create-node",
          [newNodeId], // focus on new node
          null, // no current node
          null, // no next pointer
          null, // no prev pointer
          newNodeId // mark as new node
        )
      );

      // Special case: insert at position 0 (new head)
      if (position === 0) {
        newNode.next = head;

        states.push(
          createState(
            [...updatedNodes, newNode],
            `Insertion at position 0: Setting new node's next to current head (${head})`,
            "update-pointer",
            [newNodeId, head], // focus on new node and head
            newNodeId, // current node is new node
            head // next pointer is head
          )
        );

        states.push(
          createState(
            [...updatedNodes, newNode],
            `Updating head to the new node ${newNodeId}`,
            "update-head",
            [newNodeId] // focus on new node
          )
        );

        states[states.length - 1].head = newNodeId;
        break;
      }

      // For other positions, find the node at position-1
      let current = head;
      let prev = null;
      let currentPos = 0;

      while (current !== null && currentPos < position) {
        const currentNode = updatedNodes.find((node) => node.id === current);
        if (!currentNode) break;

        states.push(
          createState(
            [...updatedNodes, newNode],
            `Step ${currentPos + 1}: Traversing to position ${position}. Currently at position ${currentPos}.`,
            "traverse",
            [], // no focus nodes
            current, // current node
            currentNode.next, // next pointer
            prev // prev pointer
          )
        );

        prev = current;
        current = currentNode.next;
        currentPos++;
      }

      if (currentPos < position) {
        // Position is out of bounds
        states.push(
          createState(
            initialNodes,
            `Error: Position ${position} is out of bounds. List length is ${currentPos}.`,
            "error"
          )
        );
        break;
      }

      // Get the nodes before and after insertion point
      const prevNode = updatedNodes.find((node) => node.id === prev);

      // Update pointers
      newNode.next = current;
      if (prevNode) prevNode.next = newNodeId;

      // Show setting the new node's next pointer
      states.push(
        createState(
          [...updatedNodes, newNode],
          `Setting new node's next pointer to node ${current || "null"}`,
          "update-pointer",
          [newNodeId, current].filter(Boolean), // focus on new node and next node if it exists
          newNodeId, // current node is new node
          current // next pointer
        )
      );

      // Show updating the previous node's next pointer
      if (prevNode) {
        states.push(
          createState(
            [...updatedNodes, newNode],
            `Updating node ${prev}'s next pointer to the new node ${newNodeId}`,
            "update-pointer",
            [prev, newNodeId], // focus on prev and new node
            prev, // current node is prev
            newNodeId // next pointer is new node
          )
        );
      }

      states.push(
        createState(
          [...updatedNodes, newNode],
          `Insertion at position ${position} complete. Node ${newNodeId} inserted successfully.`,
          "complete",
          [newNodeId] // focus on new node
        )
      );
      break;
    }

    case "delete-head": {
      if (head === null) {
        states.push(
          createState(
            initialNodes,
            "Error: Cannot delete head from empty list",
            "error"
          )
        );
        break;
      }

      // Create a copy of nodes to modify
      let updatedNodes = JSON.parse(JSON.stringify(initialNodes));

      // Find the current head node
      const headNode = updatedNodes.find((node) => node.id === head);
      if (!headNode) {
        states.push(
          createState(initialNodes, "Error: Head node not found", "error")
        );
        break;
      }

      // Show the head node being selected for deletion
      states.push(
        createState(
          updatedNodes,
          `Selecting head node ${head} for deletion`,
          "select",
          [head], // focus on head
          head // current node is head
        )
      );

      // Get the next node after head
      const newHead = headNode.next;

      // Show updating the head pointer
      states.push(
        createState(
          updatedNodes,
          newHead !== null
            ? `Updating head to point to the next node ${newHead}`
            : "Removing the only node in the list. List will be empty.",
          "update-head",
          newHead !== null ? [newHead] : [], // focus on new head if exists
          newHead // current node is new head
        )
      );

      // Remove the old head node
      updatedNodes = updatedNodes.filter((node) => node.id !== head);

      states.push(
        createState(
          updatedNodes,
          `Head node ${head} deleted successfully.`,
          "complete",
          newHead !== null ? [newHead] : [] // focus on new head if exists
        )
      );

      // Update head in result
      states[states.length - 1].head = newHead;
      break;
    }

    case "delete-tail": {
      if (head === null) {
        states.push(
          createState(
            initialNodes,
            "Error: Cannot delete tail from empty list",
            "error"
          )
        );
        break;
      }

      // Create a copy of nodes to modify
      let updatedNodes = JSON.parse(JSON.stringify(initialNodes));

      // Special case: Only one node (head is tail)
      const headNode = updatedNodes.find((node) => node.id === head);
      if (headNode.next === null) {
        states.push(
          createState(
            updatedNodes,
            `Only one node in the list. Head node ${head} is also the tail and will be deleted.`,
            "select",
            [head], // focus on head
            head // current node is head
          )
        );

        updatedNodes = [];

        states.push(
          createState(
            updatedNodes,
            `Node ${head} deleted. List is now empty.`,
            "complete"
          )
        );

        // Update head in result
        states[states.length - 1].head = null;
        break;
      }

      // Regular case: Find the tail node and its predecessor
      let current = head;
      let prev = null;
      let step = 1;

      while (current !== null) {
        const currentNode = updatedNodes.find((node) => node.id === current);
        if (!currentNode) break;

        if (currentNode.next === null) {
          // Found the tail
          break;
        }

        states.push(
          createState(
            updatedNodes,
            `Step ${step}: Traversing to find the tail. Currently at node ${current}.`,
            "traverse",
            [], // no focus nodes
            current, // current node
            currentNode.next, // next pointer
            prev // prev pointer
          )
        );

        prev = current;
        current = currentNode.next;
        step++;
      }

      if (current === null) {
        states.push(
          createState(initialNodes, "Error: Tail node not found", "error")
        );
        break;
      }

      // Show the tail node being selected for deletion
      states.push(
        createState(
          updatedNodes,
          `Found tail node ${current}. Selecting for deletion.`,
          "select",
          [current], // focus on tail
          current, // current node is tail
          null, // no next for tail
          prev // prev pointer
        )
      );

      // Update previous node's next pointer to null
      const prevNode = updatedNodes.find((node) => node.id === prev);
      prevNode.next = null;

      states.push(
        createState(
          updatedNodes,
          `Updating node ${prev}'s next pointer to null, making it the new tail`,
          "update-pointer",
          [prev], // focus on prev
          prev // current node is prev
        )
      );

      // Remove the tail node
      updatedNodes = updatedNodes.filter((node) => node.id !== current);

      states.push(
        createState(
          updatedNodes,
          `Tail node ${current} deleted successfully.`,
          "complete",
          [prev] // focus on new tail
        )
      );
      break;
    }

    case "delete-value": {
      if (value === null) {
        states.push(
          createState(
            initialNodes,
            "Error: No value provided for deletion",
            "error"
          )
        );
        break;
      }

      if (head === null) {
        states.push(
          createState(
            initialNodes,
            "Error: Cannot delete from empty list",
            "error"
          )
        );
        break;
      }

      // Create a copy of nodes to modify
      let updatedNodes = JSON.parse(JSON.stringify(initialNodes));

      // Special case: If head has the value, delete head
      const headNode = updatedNodes.find((node) => node.id === head);
      if (headNode.value === value) {
        states.push(
          createState(
            updatedNodes,
            `Found value ${value} at head node ${head}. Selecting for deletion.`,
            "select",
            [head], // focus on head
            head // current node is head
          )
        );

        // Update head to next node
        const newHead = headNode.next;

        states.push(
          createState(
            updatedNodes,
            newHead !== null
              ? `Updating head to point to the next node ${newHead}`
              : "Removing the only node in the list. List will be empty.",
            "update-head",
            newHead !== null ? [newHead] : [], // focus on new head if exists
            newHead // current node is new head
          )
        );

        // Remove the old head node
        updatedNodes = updatedNodes.filter((node) => node.id !== head);

        states.push(
          createState(
            updatedNodes,
            `Node ${head} with value ${value} deleted successfully.`,
            "complete",
            newHead !== null ? [newHead] : [] // focus on new head if exists
          )
        );

        // Update head in result
        states[states.length - 1].head = newHead;
        break;
      }

      // Regular case: Find the node with the value and its predecessor
      let current = headNode.next;
      let prev = head;
      let step = 1;
      let found = false;

      while (current !== null) {
        const currentNode = updatedNodes.find((node) => node.id === current);
        if (!currentNode) break;

        states.push(
          createState(
            updatedNodes,
            `Step ${step}: Checking node ${current} with value ${currentNode.value}.`,
            "check",
            [], // no focus nodes
            current, // current node
            currentNode.next, // next pointer
            prev // prev pointer
          )
        );

        if (currentNode.value === value) {
          found = true;
          break;
        }

        prev = current;
        current = currentNode.next;
        step++;
      }

      if (!found) {
        states.push(
          createState(
            initialNodes,
            `Value ${value} not found in the list.`,
            "not-found"
          )
        );
        break;
      }

      // Show the node being selected for deletion
      states.push(
        createState(
          updatedNodes,
          `Found node ${current} with value ${value}. Selecting for deletion.`,
          "select",
          [current], // focus on node to delete
          current, // current node
          null, // no next pointer
          prev // prev pointer
        )
      );

      // Get the node after the one to be deleted
      const currentNode = updatedNodes.find((node) => node.id === current);
      const nextNode = currentNode.next;

      // Update previous node's next pointer to skip the current node
      const prevNode = updatedNodes.find((node) => node.id === prev);
      prevNode.next = nextNode;

      states.push(
        createState(
          updatedNodes,
          `Updating node ${prev}'s next pointer to ${nextNode !== null ? nextNode : "null"}`,
          "update-pointer",
          [prev, nextNode].filter(Boolean), // focus on prev and next node if it exists
          prev, // current node is prev
          nextNode // next pointer
        )
      );

      // Remove the node
      updatedNodes = updatedNodes.filter((node) => node.id !== current);

      states.push(
        createState(
          updatedNodes,
          `Node ${current} with value ${value} deleted successfully.`,
          "complete",
          [prev] // focus on prev node
        )
      );
      break;
    }

    case "delete-at": {
      if (position === null) {
        states.push(
          createState(
            initialNodes,
            "Error: No position provided for deletion",
            "error"
          )
        );
        break;
      }

      if (head === null) {
        states.push(
          createState(
            initialNodes,
            "Error: Cannot delete from empty list",
            "error"
          )
        );
        break;
      }

      // Create a copy of nodes to modify
      let updatedNodes = JSON.parse(JSON.stringify(initialNodes));

      // Special case: Delete at position 0 (head)
      if (position === 0) {
        states.push(
          createState(
            updatedNodes,
            `Deleting node at position 0 (head node ${head})`,
            "select",
            [head], // focus on head
            head // current node is head
          )
        );

        // Get the next node after head
        const headNode = updatedNodes.find((node) => node.id === head);
        const newHead = headNode.next;

        states.push(
          createState(
            updatedNodes,
            newHead !== null
              ? `Updating head to point to the next node ${newHead}`
              : "Removing the only node in the list. List will be empty.",
            "update-head",
            newHead !== null ? [newHead] : [], // focus on new head if exists
            newHead // current node is new head
          )
        );

        // Remove the old head node
        updatedNodes = updatedNodes.filter((node) => node.id !== head);

        states.push(
          createState(
            updatedNodes,
            `Head node ${head} deleted successfully.`,
            "complete",
            newHead !== null ? [newHead] : [] // focus on new head if exists
          )
        );

        // Update head in result
        states[states.length - 1].head = newHead;
        break;
      }

      // Regular case: Find the node at the given position
      let current = head;
      let prev = null;
      let currentPos = 0;

      while (current !== null && currentPos < position) {
        const currentNode = updatedNodes.find((node) => node.id === current);
        if (!currentNode) break;

        states.push(
          createState(
            updatedNodes,
            `Step ${currentPos + 1}: Traversing to position ${position}. Currently at position ${currentPos}.`,
            "traverse",
            [], // no focus nodes
            current, // current node
            currentNode.next, // next pointer
            prev // prev pointer
          )
        );

        prev = current;
        current = currentNode.next;
        currentPos++;
      }

      if (current === null) {
        states.push(
          createState(
            initialNodes,
            `Error: Position ${position} is out of bounds. List length is ${currentPos}.`,
            "error"
          )
        );
        break;
      }

      // Show the node being selected for deletion
      states.push(
        createState(
          updatedNodes,
          `Found node ${current} at position ${position}. Selecting for deletion.`,
          "select",
          [current], // focus on node to delete
          current, // current node
          null, // no next pointer
          prev // prev pointer
        )
      );

      // Get the node after the one to be deleted
      const currentNode = updatedNodes.find((node) => node.id === current);
      const nextNode = currentNode.next;

      // Update previous node's next pointer to skip the current node
      const prevNode = updatedNodes.find((node) => node.id === prev);
      prevNode.next = nextNode;

      states.push(
        createState(
          updatedNodes,
          `Updating node ${prev}'s next pointer to ${nextNode !== null ? nextNode : "null"}`,
          "update-pointer",
          [prev, nextNode].filter(Boolean), // focus on prev and next node if it exists
          prev, // current node is prev
          nextNode // next pointer
        )
      );

      // Remove the node
      updatedNodes = updatedNodes.filter((node) => node.id !== current);

      states.push(
        createState(
          updatedNodes,
          `Node ${current} at position ${position} deleted successfully.`,
          "complete",
          [prev] // focus on prev node
        )
      );
      break;
    }

    case "detect-cycle": {
      if (head === null) {
        states.push(
          createState(
            initialNodes,
            "List is empty. No cycle detection needed.",
            "complete"
          )
        );
        break;
      }

      // Using Floyd's Cycle-Finding Algorithm (Tortoise and Hare)
      let slow = head;
      let fast = head;
      let step = 1;
      let cycleDetected = false;

      states.push(
        createState(
          initialNodes,
          "Starting cycle detection using Floyd's Tortoise and Hare algorithm.",
          "start-cycle-detection",
          [], // no focus nodes yet
          slow, // slow pointer (tortoise)
          fast // fast pointer (hare)
        )
      );

      // Find meeting point if cycle exists
      while (fast !== null) {
        const slowNode = initialNodes.find((node) => node.id === slow);
        if (!slowNode) break;

        // Move slow pointer one step
        slow = slowNode.next;

        // Move fast pointer two steps
        const fastNode = initialNodes.find((node) => node.id === fast);
        if (!fastNode || fastNode.next === null) {
          // No cycle if fast reaches end
          break;
        }

        fast = fastNode.next;
        const fastNextNode = initialNodes.find((node) => node.id === fast);
        if (!fastNextNode) break;

        fast = fastNextNode.next;

        states.push(
          createState(
            initialNodes,
            `Step ${step}: Slow pointer at node ${slow}, Fast pointer at node ${fast || "null"}`,
            "tortoise-hare",
            [], // no focus nodes
            slow, // slow pointer (current)
            fast, // fast pointer (next)
            null, // no prev pointer
            null, // no new node
            [] // no cycle nodes yet
          )
        );

        // If they meet, there is a cycle
        if (slow === fast && fast !== null) {
          cycleDetected = true;
          break;
        }

        step++;
      }

      if (!cycleDetected) {
        states.push(
          createState(
            initialNodes,
            "No cycle detected in the linked list.",
            "no-cycle"
          )
        );
        break;
      }

      // Cycle detected, find the start of the cycle
      states.push(
        createState(
          initialNodes,
          `Cycle detected! Slow and fast pointers met at node ${slow}.`,
          "cycle-detected",
          [slow], // focus on meeting point
          slow, // current node is meeting point
          null, // no next pointer
          null, // no prev pointer
          null, // no new node
          [slow] // cycle node
        )
      );

      // Reset slow pointer to head to find cycle start
      slow = head;
      step = 1;

      states.push(
        createState(
          initialNodes,
          "Resetting slow pointer to head to find the start of the cycle.",
          "find-cycle-start",
          [slow, fast], // focus on both pointers
          slow, // slow is current
          fast // fast is next
        )
      );

      // Find the start of the cycle
      let cycleStart = null;
      const cycleNodes = [];

      while (slow !== fast) {
        const slowNode = initialNodes.find((node) => node.id === slow);
        const fastNode = initialNodes.find((node) => node.id === fast);

        if (!slowNode || !fastNode) break;

        states.push(
          createState(
            initialNodes,
            `Step ${step}: Moving both pointers one step. Slow at node ${slow}, Fast at node ${fast}`,
            "find-cycle-start",
            [slow, fast], // focus on both pointers
            slow, // slow is current
            fast, // fast is next
            null, // no prev pointer
            null, // no new node
            cycleNodes // highlight cycle nodes found so far
          )
        );

        slow = slowNode.next;
        fast = fastNode.next;
        step++;
      }

      // Now slow points to the start of the cycle
      cycleStart = slow;
      cycleNodes.push(cycleStart);

      states.push(
        createState(
          initialNodes,
          `Found cycle start at node ${cycleStart}!`,
          "cycle-start-found",
          [cycleStart], // focus on cycle start
          cycleStart, // current node is cycle start
          null, // no next pointer
          null, // no prev pointer
          null, // no new node
          cycleNodes // highlight cycle nodes
        )
      );

      // Traverse the cycle to identify all nodes in it
      let current = initialNodes.find((node) => node.id === cycleStart).next;
      while (current !== cycleStart) {
        cycleNodes.push(current);

        states.push(
          createState(
            initialNodes,
            `Identifying cycle node: ${current}`,
            "identify-cycle",
            [current], // focus on current node
            current, // current node
            null, // no next pointer
            null, // no prev pointer
            null, // no new node
            cycleNodes // highlight all cycle nodes
          )
        );

        current = initialNodes.find((node) => node.id === current).next;
      }

      states.push(
        createState(
          initialNodes,
          `Cycle detection complete. Found cycle of ${cycleNodes.length} nodes starting at node ${cycleStart}.`,
          "complete",
          [], // no focus nodes
          null, // no current node
          null, // no next pointer
          null, // no prev pointer
          null, // no new node
          cycleNodes // highlight all cycle nodes
        )
      );
      break;
    }

    case "cycle-size": {
      if (head === null) {
        states.push(
          createState(
            initialNodes,
            "List is empty. No cycle detection needed.",
            "complete"
          )
        );
        break;
      }

      // Using Floyd's Cycle-Finding Algorithm first to detect if there's a cycle
      let slow = head;
      let fast = head;
      let step = 1;
      let cycleDetected = false;

      states.push(
        createState(
          initialNodes,
          "Starting cycle detection using Floyd's Tortoise and Hare algorithm.",
          "start-cycle-detection",
          [], // no focus nodes yet
          slow, // slow pointer (tortoise)
          fast // fast pointer (hare)
        )
      );

      // Find meeting point if cycle exists
      while (fast !== null) {
        const slowNode = initialNodes.find((node) => node.id === slow);
        if (!slowNode) break;

        // Move slow pointer one step
        slow = slowNode.next;

        // Move fast pointer two steps
        const fastNode = initialNodes.find((node) => node.id === fast);
        if (!fastNode || fastNode.next === null) {
          // No cycle if fast reaches end
          break;
        }

        fast = fastNode.next;
        const fastNextNode = initialNodes.find((node) => node.id === fast);
        if (!fastNextNode) break;

        fast = fastNextNode.next;

        states.push(
          createState(
            initialNodes,
            `Step ${step}: Slow pointer at node ${slow}, Fast pointer at node ${fast || "null"}`,
            "tortoise-hare",
            [], // no focus nodes
            slow, // slow pointer (current)
            fast // fast pointer (next)
          )
        );

        // If they meet, there is a cycle
        if (slow === fast && fast !== null) {
          cycleDetected = true;
          break;
        }

        step++;
      }

      if (!cycleDetected) {
        states.push(
          createState(
            initialNodes,
            "No cycle detected in the linked list.",
            "no-cycle"
          )
        );
        break;
      }

      // Cycle detected, find the start of the cycle
      states.push(
        createState(
          initialNodes,
          `Cycle detected! Slow and fast pointers met at node ${slow}.`,
          "cycle-detected",
          [slow], // focus on meeting point
          slow // current node is meeting point
        )
      );

      // Reset slow pointer to head to find cycle start
      slow = head;
      step = 1;

      states.push(
        createState(
          initialNodes,
          "Resetting slow pointer to head to find the start of the cycle.",
          "find-cycle-start",
          [slow, fast], // focus on both pointers
          slow, // slow is current
          fast // fast is next
        )
      );

      // Find the start of the cycle
      let cycleStart = null;

      while (slow !== fast) {
        const slowNode = initialNodes.find((node) => node.id === slow);
        const fastNode = initialNodes.find((node) => node.id === fast);

        if (!slowNode || !fastNode) break;

        states.push(
          createState(
            initialNodes,
            `Step ${step}: Moving both pointers one step. Slow at node ${slow}, Fast at node ${fast}`,
            "find-cycle-start",
            [slow, fast], // focus on both pointers
            slow, // slow is current
            fast // fast is next
          )
        );

        slow = slowNode.next;
        fast = fastNode.next;
        step++;
      }

      // Now slow points to the start of the cycle
      cycleStart = slow;

      states.push(
        createState(
          initialNodes,
          `Found cycle start at node ${cycleStart}!`,
          "cycle-start-found",
          [cycleStart], // focus on cycle start
          cycleStart // current node is cycle start
        )
      );

      // Measure the cycle length
      let cycleLength = 1;
      let current = initialNodes.find((node) => node.id === cycleStart).next;
      const cycleNodes = [cycleStart];

      while (current !== cycleStart) {
        cycleLength++;
        cycleNodes.push(current);

        states.push(
          createState(
            initialNodes,
            `Counting cycle node ${current}. Length so far: ${cycleLength}`,
            "count-cycle",
            [current], // focus on current node
            current, // current node
            null, // no next pointer
            null, // no prev pointer
            null, // no new node
            cycleNodes // highlight cycle nodes
          )
        );

        current = initialNodes.find((node) => node.id === current).next;
      }

      states.push(
        createState(
          initialNodes,
          `Cycle size calculation complete. The cycle has ${cycleLength} nodes.`,
          "complete",
          [], // no focus nodes
          null, // no current node
          null, // no next pointer
          null, // no prev pointer
          null, // no new node
          cycleNodes // highlight cycle nodes
        )
      );
      break;
    }

    case "middle": {
      if (head === null) {
        states.push(
          createState(
            initialNodes,
            "List is empty. No middle element.",
            "complete"
          )
        );
        break;
      }

      // Using fast and slow pointer technique to find middle
      let slow = head;
      let fast = head;
      let step = 1;

      states.push(
        createState(
          initialNodes,
          "Starting middle element search using fast and slow pointers.",
          "start-middle-search",
          [], // no focus nodes yet
          slow, // slow pointer
          fast // fast pointer
        )
      );

      // Move fast pointer twice as fast as slow pointer
      while (fast !== null && fast !== undefined) {
        const fastNode = initialNodes.find((node) => node.id === fast);
        if (!fastNode || fastNode.next === null) {
          break;
        }

        fast = fastNode.next;

        states.push(
          createState(
            initialNodes,
            `Step ${step}: Moving fast pointer to node ${fast}`,
            "move-fast",
            [], // no focus nodes
            slow, // slow pointer (current)
            fast // fast pointer (next)
          )
        );

        const slowNode = initialNodes.find((node) => node.id === slow);
        slow = slowNode.next;

        states.push(
          createState(
            initialNodes,
            `Step ${step}: Moving slow pointer to node ${slow}`,
            "move-slow",
            [], // no focus nodes
            slow, // slow pointer (current)
            fast // fast pointer (next)
          )
        );

        step++;
      }

      states.push(
        createState(
          initialNodes,
          `Middle element found! Node ${slow} is the middle of the list.`,
          "middle-found",
          [slow], // focus on middle node
          slow // current node is middle
        )
      );
      break;
    }

    case "reverse": {
      if (head === null) {
        states.push(
          createState(
            initialNodes,
            "List is empty. Nothing to reverse.",
            "complete"
          )
        );
        break;
      }

      // Create a copy of nodes to modify
      let updatedNodes = JSON.parse(JSON.stringify(initialNodes));

      states.push(
        createState(
          updatedNodes,
          "Starting list reversal. We'll flip each node's 'next' pointer.",
          "start-reverse"
        )
      );

      let prev = null;
      let current = head;
      let next = null;
      let step = 1;

      while (current !== null) {
        const currentNode = updatedNodes.find((node) => node.id === current);
        if (!currentNode) break;

        next = currentNode.next;

        states.push(
          createState(
            updatedNodes,
            `Step ${step}: At node ${current}. Saving next node (${next}) before changing pointer.`,
            "save-next",
            [current], // focus on current node
            current, // current node
            next, // next pointer
            prev // prev pointer
          )
        );

        // Reverse the current node's pointer
        currentNode.next = prev;

        states.push(
          createState(
            updatedNodes,
            `Step ${step}: Reversing node ${current}'s next pointer to point to ${prev !== null ? prev : "null"}`,
            "reverse-pointer",
            [current, prev].filter(Boolean), // focus on current and prev node if it exists
            current, // current node
            prev // next pointer is now prev
          )
        );

        // Move pointers one step forward
        prev = current;
        current = next;

        states.push(
          createState(
            updatedNodes,
            `Step ${step}: Moving to next node. Current: ${current !== null ? current : "null"}, Previous: ${prev}`,
            "move-pointers",
            [current, prev].filter(Boolean), // focus on current and prev node if they exist
            current !== null ? current : prev, // current node or prev if current is null
            null, // no next pointer
            prev // prev pointer
          )
        );

        step++;
      }

      states.push(
        createState(
          updatedNodes,
          `Reversal complete. The new head is node ${prev}.`,
          "complete",
          [prev], // focus on new head
          prev // current node is new head
        )
      );

      // Update head in result
      states[states.length - 1].head = prev;
      break;
    }

    default:
      states.push(
        createState(
          initialNodes,
          `Operation '${operation}' not implemented.`,
          "not-implemented"
        )
      );
      break;
  }

  return states;
};
