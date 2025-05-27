export const createState = (
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
    head: nodes.find(n => n.isHead)?.id || null,
    description,
    action,
  };
};

export const cloneNodes = (nodes) => JSON.parse(JSON.stringify(nodes));