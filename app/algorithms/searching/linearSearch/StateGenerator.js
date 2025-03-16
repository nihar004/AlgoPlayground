export const generateStates = (arr, target) => {
  const states = [];
  const array = [...arr];

  states.push({
    array: [...array],
    i: -1,
    action: "start",
    foundIndex: -1,
    description: "Starting linear search...",
  });

  states.push({
    array: [...array],
    i: 0,
    action: "initialize",
    foundIndex: -1,
    description: "Initializing index i to 0.",
  });

  for (let i = 0; i < array.length; i++) {
    states.push({
      array: [...array],
      i,
      action: "compare",
      foundIndex: -1,
      description: `Comparing ${array[i]} with target ${target}.`,
    });

    if (array[i] === target) {
      states.push({
        array: [...array],
        i,
        action: "found",
        foundIndex: i,
        description: `Target ${target} found at index ${i}!`,
      });

      states.push({
        array: [...array],
        i,
        action: "complete",
        foundIndex: i,
        description: "Search complete!",
      });

      return states;
    }

    states.push({
      array: [...array],
      i,
      action: "increment-i",
      foundIndex: -1,
      description: `Incrementing i to ${i + 1}.`,
    });
  }

  states.push({
    array: [...array],
    i: array.length,
    action: "not-found",
    foundIndex: -1,
    description: `Target ${target} not found in the array.`,
  });

  return states;
};
