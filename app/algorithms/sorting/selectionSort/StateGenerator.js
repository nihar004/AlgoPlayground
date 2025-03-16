export const generateStates = (arr) => {
  const states = [];
  const array = [...arr];
  const completedBars = [];

  states.push({
    array: [...array],
    i: -2,
    j: -2,
    action: "start",
    completedBars: [],
    description: "Starting selection sort...",
  });

  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;

    states.push({
      array: [...array],
      i,
      j: -1,
      action: "new-min",
      completedBars: [...completedBars],
      description: ` Starting new pass: assuming element at index ${i} (${array[i]}) is the smallest.`,
    });

    for (let j = i + 1; j < array.length; j++) {
      states.push({
        array: [...array],
        i,
        j,
        action: "compare",
        completedBars: [...completedBars],
        description: `Comparing current min ${array[minIndex]} with ${array[j]}`,
      });

      if (array[j] < array[minIndex]) {
        minIndex = j;
        states.push({
          array: [...array],
          i,
          j,
          action: "update-min",
          completedBars: [...completedBars],
          description: ` Found new minimum at index ${minIndex} (${array[minIndex]})`,
        });
      }
    }

    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      states.push({
        array: [...array],
        i,
        j: minIndex,
        action: "swap",
        completedBars: [...completedBars],
        description: `Swapping ${array[minIndex]} and ${array[i]}`,
      });
    }

    completedBars.push(i);
    states.push({
      array: [...array],
      i,
      j: -2,
      action: "bar-complete",
      completedBars: [...completedBars],
      description: `Element ${array[i]} is now in its correct position.`,
    });
  }

  states.push({
    array: [...array],
    i: array.length - 1,
    j: -2,
    action: "bar-complete",
    completedBars: [...completedBars, array.length - 1],
    description: "Sorting complete! 🎉",
  });

  return states;
};
