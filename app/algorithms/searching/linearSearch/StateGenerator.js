export const generateStates = (arr, target) => {
  const states = [];
  const array = [...arr];

  // Initial state
  states.push({
    array: [...array],
    i: -1,
    action: "start",
    description: `Starting linear search...`,
  });

  // Iterate through the array
  for (let i = 0; i < array.length; i++) {
    // Compare state
    states.push({
      array: [...array],
      i,
      action: "compare",
      description: `Comparing element at index ${i} with the target value ${target}.`,
    });

    if (array[i] === target) {
      // Found state
      states.push({
        array: [...array],
        i,
        action: "found",
        description: `Element found at index ${i}!`,
      });
      return states;
    }

    // Increment i state
    states.push({
      array: [...array],
      i: i + 1,
      action: "increment-i",
      description: ` Values don't match. Moving to the next index ${
        i + 1
      } to continue the search.`,
    });
  }

  // Not found state
  states.push({
    array: [...array],
    i: -1,
    action: "not-found",
    description: "Element not found in the array.",
  });

  return states;
};
