"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Head from "next/head";
import React from "react";
import GridEnvironment from "./GridEnvironment";
import ControlPanel from "./ControlPanel";
import CodeViewer from "./CodeViewer";
import styles from "./styles.module.css";
import { DEMO_COMMANDS } from "./demoPresets";
import { useTheme } from "../../context/ThemeContext";

export default function Fundamentals() {
  const { isDarkMode } = useTheme();
  const [grid, setGrid] = useState([]);
  const [soldier, setSoldier] = useState({ x: 0, y: 0, direction: "right" });
  const [commands, setCommands] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [functionDefinitions, setFunctionDefinitions] = useState({});
  const [executionPointer, setExecutionPointer] = useState(-1);
  const [showGoalPopup, setShowGoalPopup] = useState(false);
  const [hasReachedGoal, setHasReachedGoal] = useState(false);
  const [mode, setMode] = useState("manual"); // 'manual' or 'demo'
  const [currentExplanation, setCurrentExplanation] = useState("");
  const [speed, setSpeed] = useState(1); // seconds per move
  const [executionController, setExecutionController] = useState(
    new AbortController()
  );

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
  const addCommand = useCallback((command) => {
    setCommands((prevCommands) => [...prevCommands, command]);
  }, []);

  // Function to remove a command
  const removeCommand = (index) => {
    const newCommands = [...commands];
    newCommands.splice(index, 1);
    setCommands(newCommands);
  };

  // Function to clear all commands
  const clearCommands = () => {
    setCommands([]);
    setHasReachedGoal(false); // Use this instead of setGoalReached
    setShowGoalPopup(false);
  };

  const startDemo = async () => {
    if (!demoType) return;

    // Clear previous commands and reset states
    setCommands([]);
    resetSoldierPosition();
    setHasReachedGoal(false);
    setShowGoalPopup(false);
    setCurrentExplanation("");

    // Load demo commands after a small delay to allow state to update
    await new Promise((resolve) => setTimeout(resolve, 50));
    setCommands(DEMO_COMMANDS[demoType]);

    // Start execution after another small delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    executeCommands();
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

  const stopExecution = () => {
    executionController.abort();
    setIsRunning(false);
    setExecutionPointer(-1);
    setCurrentExplanation("");
    setExecutionController(new AbortController());
  };

  const executeFunction = async (functionName, controller) => {
    const func = functionDefinitions[functionName];
    if (!func) return;

    let commandIndex = func.startIndex;
    let loopCounters = {};
    let loopStartIndices = {};

    while (commandIndex <= func.endIndex && !controller.signal.aborted) {
      const command = commands[commandIndex];
      setExecutionPointer(commandIndex);

      if (command.type === "move") {
        await executeMoveCommand(command);
        commandIndex++;
      } else if (command.type === "if") {
        const conditionMet = evaluateCondition(command.condition);
        if (conditionMet) {
          commandIndex++;
        } else {
          commandIndex =
            (findMatchingElse(commandIndex) ||
              findMatchingEndIf(commandIndex)) + 1;
        }
      } else if (command.type === "else") {
        commandIndex = findMatchingEndIf(commandIndex) + 1;
      } else if (command.type === "endif") {
        commandIndex++;
      } else if (command.type === "loop_start") {
        if (!loopCounters[commandIndex]) {
          loopCounters[commandIndex] = 0;
          loopStartIndices[commandIndex] = commandIndex;
        }

        if (loopCounters[commandIndex] < command.iterations) {
          loopCounters[commandIndex]++;
          commandIndex++;
        } else {
          commandIndex = findLoopEnd(commandIndex) + 1;
          delete loopCounters[commandIndex];
          delete loopStartIndices[commandIndex];
        }
      } else if (command.type === "loop_end") {
        const loopStartIndex = findLoopStart(commandIndex);
        commandIndex = loopStartIndex ?? commandIndex + 1;
      } else if (command.type === "break") {
        commandIndex = findEnclosingLoopEnd(commandIndex) + 1;
      } else if (command.type === "continue") {
        commandIndex = findEnclosingLoopStart(commandIndex);
      } else if (command.type === "function_call") {
        if (functionDefinitions[command.name]) {
          await executeFunction(command.name, controller);
        }
        commandIndex++;
      } else {
        commandIndex++;
      }

      if (!controller.signal.aborted) {
        await sleep(1000 / speed);
      }
    }
  };

  // Execute commands
  const executeCommands = async () => {
    if ((commands.length === 0 && mode === "manual") || isRunning) return;

    // Reset goal states when starting new execution
    setHasReachedGoal(false);
    setShowGoalPopup(false);
    setCurrentExplanation(""); // Clear previous explanations

    const controller = new AbortController();
    setExecutionController(controller);
    setIsRunning(true);
    setExecutionPointer(-1);

    let loopCounters = {};
    let loopStartIndices = {};

    try {
      let commandIndex = 0;
      while (commandIndex < commands.length) {
        if (controller.signal.aborted) break;

        const command = commands[commandIndex];
        setExecutionPointer(commandIndex);

        // Show explanation if available (for demo mode)
        if (command.explanation) {
          setCurrentExplanation(command.explanation);
          // Pause slightly longer for explanations
          await sleep(mode === "demo" ? 1500 / speed : 1000 / speed);
        }

        // Process each command type
        if (command.type === "move") {
          await executeMoveCommand(command);
          commandIndex++;
        } else if (command.type === "if") {
          const conditionMet = evaluateCondition(command.condition);
          if (conditionMet) {
            commandIndex++; // Enter if block
          } else {
            // Skip to else or endif
            const elseIndex = findMatchingElse(commandIndex);
            commandIndex =
              elseIndex !== null
                ? elseIndex + 1
                : findMatchingEndIf(commandIndex) + 1;
          }
        } else if (command.type === "else") {
          // Skip to endif
          commandIndex = findMatchingEndIf(commandIndex) + 1;
        } else if (command.type === "endif") {
          commandIndex++; // Just continue
        } else if (command.type === "loop_start") {
          if (!loopCounters[commandIndex]) {
            loopCounters[commandIndex] = 0;
            loopStartIndices[commandIndex] = commandIndex;
          }

          if (loopCounters[commandIndex] < command.iterations) {
            loopCounters[commandIndex]++;
            commandIndex++;
          } else {
            commandIndex = findLoopEnd(commandIndex) + 1;
            delete loopCounters[commandIndex];
            delete loopStartIndices[commandIndex];
          }
        } else if (command.type === "loop_end") {
          const loopStartIndex = findLoopStart(commandIndex);
          commandIndex = loopStartIndex ?? commandIndex + 1;
        } else if (command.type === "function_define") {
          const newFunctionDefinitions = { ...functionDefinitions };
          newFunctionDefinitions[command.name] = {
            startIndex: commandIndex + 1,
            endIndex: findFunctionEnd(commandIndex),
          };
          setFunctionDefinitions(newFunctionDefinitions);
          commandIndex = newFunctionDefinitions[command.name].endIndex + 1;
        } else if (command.type === "function_call") {
          if (functionDefinitions[command.name]) {
            await executeFunction(command.name, controller);
          }
          commandIndex++;
        } else {
          commandIndex++;
        }

        if (!controller.signal.aborted) {
          await sleep(1000 / speed);
        }
      }
    } catch (error) {
      console.error("Execution error:", error);
    } finally {
      if (!controller.signal.aborted) {
        setIsRunning(false);
        setExecutionPointer(-1);
        setCurrentExplanation("");
      }
    }
  };

  // Helper function to execute move command
  const executeMoveCommand = async (command) => {
    if (executionController.signal.aborted) return;

    await new Promise((resolve) => {
      if (executionController.signal.aborted) return resolve();

      setSoldier((prevSoldier) => {
        const { x, y, direction } = prevSoldier;
        let newX = x;
        let newY = y;
        let newDirection = direction;

        // Process direction changes first
        if (command.action === "turn_right") {
          newDirection =
            direction === "right"
              ? "down"
              : direction === "down"
                ? "left"
                : direction === "left"
                  ? "up"
                  : "right";
        } else if (command.action === "turn_left") {
          newDirection =
            direction === "right"
              ? "up"
              : direction === "up"
                ? "left"
                : direction === "left"
                  ? "down"
                  : "right";
        }
        // Process movement
        else if (command.action === "forward") {
          if (direction === "right") newX += 1;
          else if (direction === "left") newX -= 1;
          else if (direction === "up") newY -= 1;
          else if (direction === "down") newY += 1;
        }

        // Validate new position
        if (command.action === "forward") {
          if (!isValidPosition(newX, newY)) {
            resolve();
            return prevSoldier; // Don't move if invalid
          }

          // Check for goal ONLY after validating position
          if (!hasReachedGoal && grid[newY]?.[newX] === "goal") {
            setHasReachedGoal(true);
            setShowGoalPopup(true);
          }
        }

        resolve();
        return { x: newX, y: newY, direction: newDirection };
      });
    });

    if (!executionController.signal.aborted) {
      await sleep(1000 / speed);
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
      // Check multiple cells ahead based on direction
      for (let steps = 1; steps <= 3; steps++) {
        let checkX = x;
        let checkY = y;

        switch (direction) {
          case "right":
            checkX += steps;
            break;
          case "left":
            checkX -= steps;
            break;
          case "up":
            checkY -= steps;
            break;
          case "down":
            checkY += steps;
            break;
        }

        // Corrected line with proper parentheses:
        if (!isValidPosition(checkX, checkY)) return true;
        if (grid[checkY]?.[checkX] === "obstacle") return true;
      }
      return false;
    }

    return false;
  };

  // Various helper functions for finding block ends/starts
  const findMatchingElse = (ifIndex) => {
    let depth = 1;
    for (let i = ifIndex + 1; i < commands.length; i++) {
      if (commands[i].type === "if") depth++;
      if (commands[i].type === "else" && depth === 1) return i;
      if (commands[i].type === "endif") depth--;
    }
    return null;
  };

  const findMatchingEndIf = (startIndex) => {
    let depth = 1;
    for (let i = startIndex + 1; i < commands.length; i++) {
      if (commands[i].type === "if") depth++;
      if (commands[i].type === "endif") {
        depth--;
        if (depth === 0) return i;
      }
    }
    return commands.length;
  };

  const findLoopStart = (endIndex) => {
    let depth = 1;
    for (let i = endIndex - 1; i >= 0; i--) {
      if (commands[i].type === "loop_end") depth++;
      if (commands[i].type === "loop_start") {
        depth--;
        if (depth === 0) return i;
      }
    }
    return null;
  };

  const findLoopEnd = (startIndex) => {
    let depth = 1;
    for (let i = startIndex + 1; i < commands.length; i++) {
      if (commands[i].type === "loop_start") depth++;
      if (commands[i].type === "loop_end") {
        depth--;
        if (depth === 0) return i;
      }
    }
    return commands.length;
  };

  const findFunctionEnd = (startIndex) => {
    let depth = 1;
    for (let i = startIndex + 1; i < commands.length; i++) {
      if (commands[i].type === "function_define") depth++;
      if (commands[i].type === "function_end") {
        depth--;
        if (depth === 0) return i;
      }
    }
    return commands.length;
  };

  const findEnclosingLoopStart = (index) => {
    let depth = 0;
    // Search backward from the current position
    for (let i = index - 1; i >= 0; i--) {
      if (commands[i].type === "loop_end") {
        depth++;
      } else if (commands[i].type === "loop_start") {
        if (depth === 0) {
          return i; // Found the matching loop start
        }
        depth--;
      }
    }
    return null; // No enclosing loop found
  };

  const findEnclosingLoopEnd = (index) => {
    let depth = 0;
    // Search forward from the current position
    for (let i = index + 1; i < commands.length; i++) {
      if (commands[i].type === "loop_start") {
        depth++;
      } else if (commands[i].type === "loop_end") {
        if (depth === 0) {
          return i; // Found the matching loop end
        }
        depth--;
      }
    }
    return commands.length; // Return end of commands if not found
  };

  // Add this with your other state functions
  const resetSoldierPosition = () => {
    setSoldier({ x: 0, y: 0, direction: "right" });
    setShowGoalPopup(false);
    setHasReachedGoal(false);
    if (mode === "demo") {
      setCommands([]); // Just clear commands, no demoType needed
    }
  };

  const GoalPopupComponent = ({ isDarkMode, onClose }) => (
    <div
      className={`${styles.goalPopup} ${isDarkMode ? "bg-zinc-800/95" : "bg-white/95"}`}
    >
      <div
        className={`${styles.popupContent} ${isDarkMode ? "text-zinc-100" : "text-zinc-900"}`}
      >
        <h3 className="text-2xl font-bold mb-4">🎉 Congratulations! 🎉</h3>
        <p className="mb-6">You&apos;ve successfully reached the goal!</p>
        <button
          onClick={onClose}
          className={`${styles.popupButton} ${
            isDarkMode
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          } transition-colors`}
        >
          Continue
        </button>
      </div>
    </div>
  );

  const GoalPopup = React.memo(GoalPopupComponent);

  // Add to your existing state

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div
      className={`${styles.container} ${isDarkMode ? "bg-zinc-900" : "bg-zinc-50"}`}
    >
      <Head>
        <title>DSA Visualization - Control Flow</title>
        <meta
          name="description"
          content="Interactive visualization for control flow concepts"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={`${styles.main} ${isDarkMode ? "text-zinc-100" : "text-zinc-900"}`}
      >
        <div
          className={`${styles.modeSelector} ${isDarkMode ? "text-zinc-100" : "text-zinc-900"}`}
        >
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={mode === "manual"}
              onChange={() => {
                setMode("manual");
                clearCommands();
              }}
              className={`${isDarkMode ? "accent-blue-500" : "accent-blue-600"}`}
            />
            Manual Mode
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={mode === "demo"}
              onChange={() => {
                setMode("demo");
                clearCommands();
              }}
              className={`${isDarkMode ? "accent-blue-500" : "accent-blue-600"}`}
            />
            Demonstration Mode
          </label>
        </div>

        <div
          className={`${styles.visualization} ${isDarkMode ? "bg-zinc-800" : "bg-white"} rounded-lg shadow-lg`}
        >
          <div
            className={`${styles.gridContainer} ${isDarkMode ? "border-zinc-700" : "border-gray-200"}`}
          >
            <GridEnvironment
              grid={grid}
              soldier={soldier}
              isDarkMode={isDarkMode}
            />
          </div>

          <div className={styles.controlContainer}>
            <ControlPanel
              commands={commands}
              addCommand={addCommand}
              clearCommands={clearCommands}
              executeCommands={executeCommands}
              isRunning={isRunning}
              speed={speed}
              setSpeed={setSpeed}
              resetPosition={resetSoldierPosition}
              stopExecution={stopExecution}
              mode={mode}
              isDarkMode={isDarkMode}
            />

            <CodeViewer
              commands={commands}
              removeCommand={removeCommand}
              moveCommand={moveCommand}
              executionPointer={executionPointer}
              isRunning={isRunning}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </main>

      {showGoalPopup && (
        <div
          className={`${styles.goalPopup} ${isDarkMode ? "bg-zinc-800/95" : "bg-white/95"}`}
        >
          <div
            className={`${styles.popupContent} ${isDarkMode ? "text-zinc-100" : "text-zinc-900"}`}
          >
            <h3 className="text-2xl font-bold mb-4">🎉 Congratulations! 🎉</h3>
            <p className="mb-6">You&apos;ve successfully reached the goal!</p>
            <button
              onClick={() => setShowGoalPopup(false)}
              className={`${styles.popupButton} ${
                isDarkMode
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              } transition-colors`}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
