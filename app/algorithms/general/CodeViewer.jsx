// components/CodeViewer.js
import React from "react";
import styles from "./styles.module.css";

const CodeViewer = ({
  commands,
  removeCommand,
  moveCommand,
  executionPointer,
  isRunning,
}) => {
  // Helper function to get indentation level
  const getIndentLevel = (index) => {
    let indentLevel = 0;

    for (let i = 0; i < index; i++) {
      const cmd = commands[i];

      if (
        cmd.type === "if" ||
        cmd.type === "loop_start" ||
        cmd.type === "function_define"
      ) {
        indentLevel++;
      } else if (
        cmd.type === "endif" ||
        cmd.type === "loop_end" ||
        cmd.type === "function_end"
      ) {
        indentLevel = Math.max(0, indentLevel - 1);
      }
    }

    return indentLevel;
  };

  // Convert command to readable text
  const getCommandText = (command) => {
    switch (command.type) {
      case "move":
        if (command.action === "forward") return "Move Forward";
        if (command.action === "turn_right") return "Turn Right";
        if (command.action === "turn_left") return "Turn Left";
        return "Move";

      case "if":
        if (command.condition === "obstacle_ahead")
          return "if (obstacleAhead()) {";
        if (command.condition === "at_goal") return "if (atGoal()) {";
        return "if (condition) {";

      case "else":
        return "} else {";

      case "endif":
        return "}";

      case "loop_start":
        return `for (let i = 0; i < ${command.iterations}; i++) {`;

      case "loop_end":
        return "}";

      case "break":
        return "break;";

      case "continue":
        return "continue;";

      case "function_define":
        return `function ${command.name}() {`;

      case "function_end":
        return "}";

      case "function_call":
        return `${command.name}();`;

      default:
        return "Unknown command";
    }
  };

  return (
    <div className={styles.codeViewer}>
      <h3>Command Sequence</h3>
      <div className={styles.commandList}>
        {commands.map((command, index) => {
          const indentLevel = getIndentLevel(index);
          const indentStyle = { marginLeft: `${indentLevel * 20}px` };

          return (
            <div
              key={`command-${index}`}
              className={`
                ${styles.commandItem} 
                ${executionPointer === index ? styles.executing : ""}
              `}
              style={indentStyle}
            >
              <span className={styles.commandText}>
                {getCommandText(command)}
              </span>

              {!isRunning && (
                <div className={styles.commandActions}>
                  <button
                    onClick={() => moveCommand(index, -1)}
                    disabled={index === 0}
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveCommand(index, 1)}
                    disabled={index === commands.length - 1}
                  >
                    ↓
                  </button>
                  <button onClick={() => removeCommand(index)}>×</button>
                </div>
              )}
            </div>
          );
        })}

        {commands.length === 0 && (
          <div className={styles.emptyMessage}>
            No commands added yet. Use the control panel to add commands.
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeViewer;
