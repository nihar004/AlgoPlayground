"use client";
import React, { useState } from "react";
import { DEMO_COMMANDS } from "./demoPresets";
import styles from "./styles.module.css";

const ControlPanel = ({
  addCommand,
  commands,
  clearCommands,
  executeCommands,
  isRunning,
  speed,
  setSpeed,
  resetPosition,
  stopExecution,
  mode,
  currentExplanation,
}) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [loopCount, setLoopCount] = useState(3);
  const [functionName, setFunctionName] = useState("");
  const [isLoadingDemo, setIsLoadingDemo] = useState(false);

  const handleAddCommand = (command) => {
    addCommand(command);
  };

  const isDisabled = isRunning || mode === "demo";

  const loadDemoCommands = (demoType) => {
    clearCommands(); // Clear existing commands first

    // Use setTimeout to ensure state updates properly
    setTimeout(() => {
      const demoCommands = DEMO_COMMANDS[demoType];
      demoCommands.forEach((command) => {
        addCommand(command);
      });
    }, 0);
  };
  return (
    <div className={styles.controlPanel}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            activeTab === "basic" ? styles.active : ""
          } ${mode === "demo" ? styles.disabledTab : ""}`}
          onClick={() => mode !== "demo" && setActiveTab("basic")}
        >
          Basic
        </button>

        <button
          className={`${styles.tab} ${
            activeTab === "conditional" ? styles.active : ""
          }`}
          onClick={() => {
            setActiveTab("conditional");
            if (mode === "demo") {
              loadDemoCommands("ifelse");
            }
          }}
        >
          If/Else
        </button>

        <button
          className={`${styles.tab} ${
            activeTab === "loops" ? styles.active : ""
          }`}
          onClick={() => {
            setActiveTab("loops");
            if (mode === "demo") {
              loadDemoCommands("loops");
            }
          }}
        >
          Loops
        </button>

        <button
          className={`${styles.tab} ${
            activeTab === "functions" ? styles.active : ""
          } ${isLoadingDemo ? styles.loadingTab : ""}`}
          onClick={() => {
            setActiveTab("functions");
            if (mode === "demo") loadDemoCommands("functions");
          }}
          disabled={isDisabled && mode !== "demo"}
        >
          {isLoadingDemo && activeTab === "functions"
            ? "Loading..."
            : "Functions"}
        </button>
      </div>

      {mode === "demo" && !isRunning && !isLoadingDemo && (
        <div className={styles.demoHelperText}>
          {activeTab === "conditional" && "Full if/else demo loaded!"}
          {activeTab === "loops" && "Complete loop demo loaded!"}
          {activeTab === "functions" && "Function demo loaded!"}
        </div>
      )}

      <div className={styles.commandButtons}>
        {activeTab === "basic" && (
          <>
            <button
              onClick={() =>
                handleAddCommand({ type: "move", action: "forward" })
              }
              disabled={isDisabled}
            >
              Move Forward
            </button>
            <button
              onClick={() =>
                handleAddCommand({ type: "move", action: "turn_right" })
              }
              disabled={isDisabled}
            >
              Turn Right
            </button>
            <button
              onClick={() =>
                handleAddCommand({ type: "move", action: "turn_left" })
              }
              disabled={isDisabled}
            >
              Turn Left
            </button>
          </>
        )}

        {activeTab === "conditional" && mode !== "demo" && (
          <>
            <button
              onClick={() =>
                handleAddCommand({ type: "if", condition: "obstacle_ahead" })
              }
              disabled={isDisabled}
            >
              If Obstacle Ahead
            </button>
            <button
              onClick={() => handleAddCommand({ type: "else" })}
              disabled={isDisabled}
            >
              Else
            </button>
            <button
              onClick={() => handleAddCommand({ type: "endif" })}
              disabled={isDisabled}
            >
              End If
            </button>
          </>
        )}

        {activeTab === "loops" && mode !== "demo" && (
          <>
            <div className={styles.loopControls}>
              <input
                type="number"
                min="1"
                max="10"
                value={loopCount}
                onChange={(e) => setLoopCount(parseInt(e.target.value))}
                disabled={isDisabled}
              />
              <button
                onClick={() =>
                  handleAddCommand({
                    type: "loop_start",
                    iterations: loopCount,
                  })
                }
                disabled={isDisabled}
              >
                Start Loop ({loopCount} times)
              </button>
            </div>
            <button
              onClick={() => handleAddCommand({ type: "loop_end" })}
              disabled={isDisabled}
            >
              End Loop
            </button>
            <button
              onClick={() => handleAddCommand({ type: "break" })}
              disabled={isDisabled}
            >
              Break
            </button>
            <button
              onClick={() => handleAddCommand({ type: "continue" })}
              disabled={isDisabled}
            >
              Continue
            </button>
          </>
        )}

        {activeTab === "functions" && mode !== "demo" && (
          <>
            <div className={styles.functionControls}>
              <input
                type="text"
                placeholder="Function name"
                value={functionName}
                onChange={(e) => setFunctionName(e.target.value)}
                disabled={isDisabled}
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
                disabled={isDisabled || !functionName.trim()}
              >
                Define Function
              </button>
            </div>
            <button
              onClick={() => handleAddCommand({ type: "function_end" })}
              disabled={isDisabled}
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
              disabled={isDisabled || !functionName.trim()}
            >
              Call Function
            </button>
          </>
        )}
      </div>

      {isRunning && currentExplanation && (
        <div className={styles.executionExplanation}>
          <div className={styles.explanationBubble}>{currentExplanation}</div>
        </div>
      )}

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

        <div className={styles.actionButtons}>
          {!isRunning ? (
            <>
              <button
                className={styles.executeButton}
                onClick={executeCommands}
                disabled={
                  (mode === "demo" && commands.length === 0) || isRunning
                }
              >
                Run
              </button>
              <button className={styles.resetButton} onClick={resetPosition}>
                Reset
              </button>
              <button className={styles.clearButton} onClick={clearCommands}>
                Clear
              </button>
            </>
          ) : (
            <button className={styles.stopButton} onClick={stopExecution}>
              Stop
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
