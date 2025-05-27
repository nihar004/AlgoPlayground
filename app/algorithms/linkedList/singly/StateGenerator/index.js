import * as basicOps from "./basicOperations";
import * as insertOps from "./insertOperations";
import * as deleteOps from "./deleteOperations";
import * as utilityOps from "./utilityOperations";
import { createState, cloneNodes } from "./helpers";

export const OPERATIONS = {
  BASIC: {
    TRAVERSE: "traverse",
    SEARCH: "search",
    LENGTH: "length",
  },
  INSERT: {
    HEAD: "insertHead",
    TAIL: "insertTail",
    AT: "insertAt",
  },
  DELETE: {
    HEAD: "deleteHead",
    TAIL: "deleteTail",
    AT: "deleteAt",
    VALUE: "deleteValue",
  },
  UTILITY: {
    REVERSE: "reverse",
    MIDDLE: "middle", // Changed from "findMiddle" to "middle"
  },
};

export const generateStates = (
  nodes,
  operation,
  value = null,
  position = null,
  head = 1
) => {
  const initialNodes = cloneNodes(nodes);

  switch (operation) {
    // Basic Operations
    case OPERATIONS.BASIC.TRAVERSE:
      return basicOps.generateTraversalStates(initialNodes, head);
    case OPERATIONS.BASIC.SEARCH:
      return basicOps.generateSearchStates(initialNodes, value, head);
    case OPERATIONS.BASIC.LENGTH:
      return basicOps.generateLengthStates(initialNodes, head);

    // Insert Operations
    case "insertHead": // Match the exact string being passed
      return insertOps.generateInsertHeadStates(initialNodes, value, head);
    case "insertTail":
      return insertOps.generateInsertTailStates(initialNodes, value, head);
    case "insertAt":
      return insertOps.generateInsertAtStates(
        initialNodes,
        value,
        position,
        head
      );

    // Delete Operations
    case "deleteHead":
      return deleteOps.generateDeleteHeadStates(initialNodes, head);
    case "deleteTail":
      return deleteOps.generateDeleteTailStates(initialNodes, head);
    case "deleteAt":
      return deleteOps.generateDeleteAtStates(initialNodes, position, head);
    case "deleteValue":
      return deleteOps.generateDeleteByValueStates(initialNodes, value, head);

    // Utility Operations
    case "reverse":
      return utilityOps.generateReverseStates(initialNodes, head);
    case "middle": // Changed from "findMiddle" to "middle"
      return utilityOps.generateFindMiddleStates(initialNodes, head);

    default:
      console.log("Operation not found:", operation); // Debug log
      return [
        createState(
          initialNodes,
          `Operation '${operation}' not implemented.`,
          "not-implemented"
        ),
      ];
  }
};
