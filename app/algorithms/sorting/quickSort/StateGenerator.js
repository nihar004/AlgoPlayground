export const generateStates = (arr) => {
  const states = [];
  const array = [...arr];

  const quickSort = (low, high) => {
    if (low < high) {
      states.push({
        array: [...array],
        low,
        high,
        pivot: array[high],
        action: "choose-pivot",
        description: `Choosing pivot: ${array[high]} at index ${high} (Last Element as Pivot)`,
      });

      let pi = partition(low, high);

      states.push({
        array: [...array],
        low,
        high,
        pivot: array[pi],
        action: "pivot-placed",
        description: `Placing pivot ${array[pi]} at its correct position`,
      });

      states.push({
        array: [...array],
        low,
        high: pi - 1,
        action: "sort-left",
        description: `Recursively sorting the left half (low: ${low}, high: ${
          pi - 1
        })`,
      });
      quickSort(low, pi - 1);

      states.push({
        array: [...array],
        low: pi + 1,
        high,
        action: "sort-right",
        description: `Recursively sorting the right half (low: ${
          pi + 1
        }, high: ${high})`,
      });
      quickSort(pi + 1, high);
    }
  };

  const partition = (low, high) => {
    let pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      states.push({
        array: [...array],
        i,
        j,
        pivot,
        action: "compare",
        description: `Comparing ${array[j]} with pivot ${pivot}`,
      });

      if (array[j] < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];

        states.push({
          array: [...array],
          i,
          j,
          pivot,
          action: "swap",
          description: `Swapping ${array[i]} and ${array[j]}`,
        });
      }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];

    states.push({
      array: [...array],
      i: i + 1,
      high,
      pivot,
      action: "pivot-placed",
      description: `Placing pivot ${pivot} at its correct position`,
    });

    return i + 1;
  };

  states.push({
    array: [...array],
    action: "start",
    description: "Starting Quick Sort...",
  });

  quickSort(0, array.length - 1);

  states.push({
    array: [...array],
    action: "complete",
    description: "Quick Sort completed! 🎉",
  });

  return states;
};
