export const generateStates = (arr) => {
  const states = [];
  const array = [...arr];
  const completedBars = [];
  let swapped;

  states.push({
    array: [...array],
    i: -2,
    j: -2,
    action: "start",
    completedBars: [],
    description: "Starting bubble sort...",
  });

  states.push({
    array: [...array],
    i: -2,
    j: -2,
    action: "initialize",
    completedBars: [],
    description: "Initialize i and j to 0.",
  });

  for (let i = 0; i < array.length; i++) {
    swapped = false; // Track if any swap happens

    for (let j = 0; j < array.length - i - 1; j++) {
      states.push({
        array: [...array],
        i,
        j,
        action: "compare",
        completedBars: [...completedBars],
        description: `Comparing elements ${array[j]} and ${array[j + 1]}.`,
      });

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;
        states.push({
          array: [...array],
          i,
          j,
          action: "swap",
          completedBars: [...completedBars],
          description: `Swapping ${array[j]} and ${array[j + 1]}.`,
        });
      }

      states.push({
        array: [...array],
        i,
        j: j + 1,
        action: "increment-j",
        completedBars: [...completedBars],
        description: `Incrementing j to ${j + 1}.`,
      });
    }

    if (!swapped) {
      states.push({
        array: [...array],
        i,
        j: -2,
        action: "early-stop",
        completedBars: [...completedBars],
        description: "Array is already sorted, stopping early!",
      });
      break;
    }

    completedBars.push(array.length - i - 1);
    states.push({
      array: [...array],
      i: i,
      j: -2,
      action: "bar-complete",
      completedBars: [...completedBars],
      description: `Now ${
        array[array.length - i - 1]
      } is at its Correct Position!`,
    });

    states.push({
      array: [...array],
      i: i + 1,
      j: 0,
      action: "increment-i",
      completedBars: [...completedBars],
      description: `Incrementing i to ${i + 1}.`,
    });
  }

  states.push({
    array: [...array],
    i: array.length,
    j: 0,
    action: "complete",
    completedBars: [...completedBars],
    description: "Sorting complete! 🎉",
  });

  return states;
};
