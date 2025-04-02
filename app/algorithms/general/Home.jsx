// pages/index.js
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import GridEnvironment from "./GridEnvironment";
import ControlPanel from "./ControlPanel";
import CodeViewer from "./CodeViewer";
import styles from "./styles.module.css";

export default function Home() {
  const [grid, setGrid] = useState([]);
  const [soldier, setSoldier] = useState({ x: 0, y: 0, direction: "right" });
  const [commands, setCommands] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1); // seconds per move
  const [executionPointer, setExecutionPointer] = useState(-1);

  // Initialize grid
  useEffect(() => {
    // Create 10x10 grid
    const newGrid = Array(10)
      .fill()
      .map(() => Array(10).fill("empty"));

    // Add some obstacles
    newGrid[2][3] = "obstacle";
    newGrid[3][7] = "obstacle";
    newGrid[5][5] = "obstacle";
    newGrid[7][2] = "obstacle";

    // Add goal
    newGrid[8][8] = "goal";

    setGrid(newGrid);
  }, []);

  // Function to add a command to the sequence
  const addCommand = (command) => {
    setCommands([...commands, command]);
  };

  // Function to remove a command
  const removeCommand = (index) => {
    const newCommands = [...commands];
    newCommands.splice(index, 1);
    setCommands(newCommands);
  };

  // Function to clear all commands
  const clearCommands = () => {
    setCommands([]);
  };

  // Function to move commands up/down in the sequence
  const moveCommand = (index, direction) => {
    if (
      (index === 0 && direction === -1) ||
      (index === commands.length - 1 && direction === 1)
    )
      return;

    const newCommands = [...commands];
    const temp = newCommands[index];
    newCommands[index] = newCommands[index + direction];
    newCommands[index + direction] = temp;
    setCommands(newCommands);
  };

  // Execute commands
  const executeCommands = async () => {
    if (commands.length === 0) return;

    setIsRunning(true);
    setSoldier({ x: 0, y: 0, direction: "right" }); // Reset soldier position

    // Implementation of command execution logic
    let commandIndex = 0;
    let loopCounters = {};
    let loopStartIndices = {};
    let functionDefinitions = {};

    while (commandIndex < commands.length) {
      setExecutionPointer(commandIndex);
      const command = commands[commandIndex];

      // Process each command type
      if (command.type === "move") {
        await executeMoveCommand(command);
        commandIndex++;
      } else if (command.type === "if") {
        const condition = evaluateCondition(command.condition);
        if (condition) {
          commandIndex++; // Move to if block
        } else {
          // Skip to else or next block after if
          commandIndex = findElseOrEndIf(commandIndex);
        }
      } else if (command.type === "else") {
        // Skip to end of if block
        commandIndex = findEndIf(commandIndex);
      } else if (command.type === "loop_start") {
        if (!loopCounters[commandIndex]) {
          loopCounters[commandIndex] = 0;
          loopStartIndices[commandIndex] = commandIndex;
        }

        if (loopCounters[commandIndex] < command.iterations) {
          loopCounters[commandIndex]++;
          commandIndex++;
        } else {
          // Loop complete, find the end
          commandIndex = findLoopEnd(commandIndex);
          delete loopCounters[commandIndex];
          delete loopStartIndices[commandIndex];
        }
      } else if (command.type === "loop_end") {
        // Go back to loop start
        const loopStartIndex = Object.keys(loopStartIndices).find(
          (key) => loopStartIndices[key] === findLoopStart(commandIndex)
        );
        if (loopStartIndex) {
          commandIndex = parseInt(loopStartIndex);
        } else {
          commandIndex++;
        }
      } else if (command.type === "break") {
        // Find the end of the current loop
        commandIndex = findEnclosingLoopEnd(commandIndex);
      } else if (command.type === "continue") {
        // Go to the start of the current loop
        commandIndex = findEnclosingLoopStart(commandIndex);
      } else if (command.type === "function_define") {
        // Store function definition
        functionDefinitions[command.name] = {
          startIndex: commandIndex + 1,
          endIndex: findFunctionEnd(commandIndex),
        };
        // Skip the function body
        commandIndex = functionDefinitions[command.name].endIndex + 1;
      } else if (command.type === "function_call") {
        // Execute the function
        if (functionDefinitions[command.name]) {
          let { startIndex, endIndex } = functionDefinitions[command.name];
          for (let i = startIndex; i < endIndex; i++) {
            await executeCommand(commands[i]);
          }
        }
        commandIndex++;
      } else {
        commandIndex++;
      }

      await sleep(1000 / speed);
    }

    setIsRunning(false);
    setExecutionPointer(-1);
  };

  // Helper function to execute move command
  const executeMoveCommand = async (command) => {
    const { x, y, direction } = soldier;
    let newX = x;
    let newY = y;
    let newDirection = direction;

    if (command.action === "forward") {
      if (direction === "right") newX += 1;
      else if (direction === "left") newX -= 1;
      else if (direction === "up") newY -= 1;
      else if (direction === "down") newY += 1;
    } else if (command.action === "turn_right") {
      if (direction === "right") newDirection = "down";
      else if (direction === "down") newDirection = "left";
      else if (direction === "left") newDirection = "up";
      else if (direction === "up") newDirection = "right";
    } else if (command.action === "turn_left") {
      if (direction === "right") newDirection = "up";
      else if (direction === "up") newDirection = "left";
      else if (direction === "left") newDirection = "down";
      else if (direction === "down") newDirection = "right";
    }

    // Check if new position is valid
    if (isValidPosition(newX, newY)) {
      setSoldier({ x: newX, y: newY, direction: newDirection });
    } else {
      setSoldier({ ...soldier, direction: newDirection });
    }
  };

  // Helper function to check if position is valid
  const isValidPosition = (x, y) => {
    return x >= 0 && x < 10 && y >= 0 && y < 10 && grid[y][x] !== "obstacle";
  };

  // Helper function to evaluate conditions
  const evaluateCondition = (condition) => {
    const { x, y, direction } = soldier;

    if (condition === "obstacle_ahead") {
      let checkX = x;
      let checkY = y;

      if (direction === "right") checkX += 1;
      else if (direction === "left") checkX -= 1;
      else if (direction === "up") checkY -= 1;
      else if (direction === "down") checkY += 1;

      return !isValidPosition(checkX, checkY);
    }

    if (condition === "at_goal") {
      return grid[y][x] === "goal";
    }

    return false;
  };

  // Various helper functions for finding block ends/starts
  const findElseOrEndIf = (index) => {
    // Implementation to find the matching else or endif
    let depth = 1;
    let i = index + 1;

    while (i < commands.length) {
      if (commands[i].type === "if") depth++;
      else if (commands[i].type === "else" && depth === 1) return i + 1;
      else if (commands[i].type === "endif") {
        depth--;
        if (depth === 0) return i + 1;
      }
      i++;
    }

    return commands.length;
  };

  const findEndIf = (index) => {
    // Implementation to find the end of if block
    let depth = 1;
    let i = index + 1;

    while (i < commands.length) {
      if (commands[i].type === "if") depth++;
      else if (commands[i].type === "endif") {
        depth--;
        if (depth === 0) return i + 1;
      }
      i++;
    }

    return commands.length;
  };

  const findLoopEnd = (index) => {
    // Implementation to find the end of loop
    let depth = 1;
    let i = index + 1;

    while (i < commands.length) {
      if (commands[i].type === "loop_start") depth++;
      else if (commands[i].type === "loop_end") {
        depth--;
        if (depth === 0) return i + 1;
      }
      i++;
    }

    return commands.length;
  };

  const findLoopStart = (index) => {
    // Implementation to find the start of loop
    let depth = 1;
    let i = index - 1;

    while (i >= 0) {
      if (commands[i].type === "loop_end") depth++;
      else if (commands[i].type === "loop_start") {
        depth--;
        if (depth === 0) return i;
      }
      i--;
    }

    return 0;
  };

  const findEnclosingLoopEnd = (index) => {
    // Implementation to find the enclosing loop end
    let depth = 1;
    let i = index + 1;

    while (i < commands.length) {
      if (commands[i].type === "loop_start") depth++;
      else if (commands[i].type === "loop_end") {
        depth--;
        if (depth === 0) return i + 1;
      }
      i++;
    }

    return commands.length;
  };

  const findEnclosingLoopStart = (index) => {
    // Implementation to find the enclosing loop start
    let depth = 0;
    let i = index;

    while (i >= 0) {
      if (commands[i].type === "loop_end") depth++;
      else if (commands[i].type === "loop_start") {
        if (depth === 0) return i;
        depth--;
      }
      i--;
    }

    return 0;
  };

  const findFunctionEnd = (index) => {
    // Implementation to find function end
    let depth = 1;
    let i = index + 1;

    while (i < commands.length) {
      if (commands[i].type === "function_define") depth++;
      else if (commands[i].type === "function_end") {
        depth--;
        if (depth === 0) return i;
      }
      i++;
    }

    return commands.length;
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div className={styles.container}>
      <Head>
        <title>DSA Visualization - Control Flow</title>
        <meta
          name="description"
          content="Interactive visualization for control flow concepts"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Control Flow Visualization</h1>

        <div className={styles.visualization}>
          <div className={styles.gridContainer}>
            <GridEnvironment grid={grid} soldier={soldier} />
          </div>

          <div className={styles.controlContainer}>
            <ControlPanel
              addCommand={addCommand}
              clearCommands={clearCommands}
              executeCommands={executeCommands}
              isRunning={isRunning}
              speed={speed}
              setSpeed={setSpeed}
            />

            <CodeViewer
              commands={commands}
              removeCommand={removeCommand}
              moveCommand={moveCommand}
              executionPointer={executionPointer}
              isRunning={isRunning}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
