// components/ControlPanel.js
import React, { useState } from "react";
import styles from "./styles.module.css";

const ControlPanel = ({
  addCommand,
  clearCommands,
  executeCommands,
  isRunning,
  speed,
  setSpeed,
}) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [loopCount, setLoopCount] = useState(3);
  const [functionName, setFunctionName] = useState("");

  const handleAddCommand = (command) => {
    addCommand(command);
  };

  return (
    <div className={styles.controlPanel}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            activeTab === "basic" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("basic")}
        >
          Basic
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "conditional" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("conditional")}
        >
          If/Else
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "loops" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("loops")}
        >
          Loops
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "functions" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("functions")}
        >
          Functions
        </button>
      </div>

      <div className={styles.commandButtons}>
        {activeTab === "basic" && (
          <>
            <button
              onClick={() =>
                handleAddCommand({ type: "move", action: "forward" })
              }
              disabled={isRunning}
            >
              Move Forward
            </button>
            <button
              onClick={() =>
                handleAddCommand({ type: "move", action: "turn_right" })
              }
              disabled={isRunning}
            >
              Turn Right
            </button>
            <button
              onClick={() =>
                handleAddCommand({ type: "move", action: "turn_left" })
              }
              disabled={isRunning}
            >
              Turn Left
            </button>
          </>
        )}

        {activeTab === "conditional" && (
          <>
            <button
              onClick={() =>
                handleAddCommand({ type: "if", condition: "obstacle_ahead" })
              }
              disabled={isRunning}
            >
              If Obstacle Ahead
            </button>
            <button
              onClick={() =>
                handleAddCommand({ type: "if", condition: "at_goal" })
              }
              disabled={isRunning}
            >
              If At Goal
            </button>
            <button
              onClick={() => handleAddCommand({ type: "else" })}
              disabled={isRunning}
            >
              Else
            </button>
            <button
              onClick={() => handleAddCommand({ type: "endif" })}
              disabled={isRunning}
            >
              End If
            </button>
          </>
        )}

        {activeTab === "loops" && (
          <>
            <div className={styles.loopControls}>
              <input
                type="number"
                min="1"
                max="10"
                value={loopCount}
                onChange={(e) => setLoopCount(parseInt(e.target.value))}
                disabled={isRunning}
              />
              <button
                onClick={() =>
                  handleAddCommand({
                    type: "loop_start",
                    iterations: loopCount,
                  })
                }
                disabled={isRunning}
              >
                Start Loop ({loopCount} times)
              </button>
            </div>
            <button
              onClick={() => handleAddCommand({ type: "loop_end" })}
              disabled={isRunning}
            >
              End Loop
            </button>
            <button
              onClick={() => handleAddCommand({ type: "break" })}
              disabled={isRunning}
            >
              Break
            </button>
            <button
              onClick={() => handleAddCommand({ type: "continue" })}
              disabled={isRunning}
            >
              Continue
            </button>
          </>
        )}

        {activeTab === "functions" && (
          <>
            <div className={styles.functionControls}>
              <input
                type="text"
                placeholder="Function name"
                value={functionName}
                onChange={(e) => setFunctionName(e.target.value)}
                disabled={isRunning}
              />
              <button
                onClick={() => {
                  if (functionName.trim()) {
                    handleAddCommand({
                      type: "function_define",
                      name: functionName.trim(),
                    });
                  }
                }}
                disabled={isRunning || !functionName.trim()}
              >
                Define Function
              </button>
            </div>
            <button
              onClick={() => handleAddCommand({ type: "function_end" })}
              disabled={isRunning}
            >
              End Function
            </button>
            <button
              onClick={() => {
                if (functionName.trim()) {
                  handleAddCommand({
                    type: "function_call",
                    name: functionName.trim(),
                  });
                }
              }}
              disabled={isRunning || !functionName.trim()}
            >
              Call Function
            </button>
          </>
        )}
      </div>

      <div className={styles.executionControls}>
        <div className={styles.speedControl}>
          <label>Speed:</label>
          <input
            type="range"
            min="0.5"
            max="5"
            step="0.5"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            disabled={isRunning}
          />
          <span>{speed}x</span>
        </div>

        <button
          className={styles.executeButton}
          onClick={executeCommands}
          disabled={isRunning}
        >
          Run
        </button>

        <button
          className={styles.clearButton}
          onClick={clearCommands}
          disabled={isRunning}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
