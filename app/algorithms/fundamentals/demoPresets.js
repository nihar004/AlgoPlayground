export const DEMO_COMMANDS = {
  ifelse: [
    { type: "move", action: "forward", explanation: "First move forward" },
    {
      type: "if",
      condition: "obstacle_ahead",
      explanation: "Checking if obstacle is ahead...",
    },
    {
      type: "move",
      action: "turn_left",
      explanation: "Turning left (obstacle detected)",
    },
    { type: "else" },
    {
      type: "move",
      action: "forward",
      explanation: "Moving forward (path clear)",
    },
    { type: "endif" },
    { type: "move", action: "forward", explanation: "First move forward" },
  ],
  loops: [
    {
      type: "loop_start",
      iterations: 8,
      explanation: "Starting loop (will run 8 times)",
    },
    {
      type: "move",
      action: "forward",
      explanation: "Loop: Moving forward",
    },
    { type: "loop_end" },
    {
      type: "move",
      action: "turn_right",
      explanation: "Loop: Turning right",
    },
    {
      type: "loop_start",
      iterations: 8,
      explanation: "Starting loop (will run 8 times)",
    },
    {
      type: "move",
      action: "forward",
      explanation: "Loop: Moving forward",
    },
    { type: "loop_end" },
  ],
  functions: [
    {
      type: "function_define",
      name: "moveSquare",
      explanation: "Defining moveSquare function",
    },
    {
      type: "move",
      action: "forward",
      explanation: "Function: First move",
    },
    {
      type: "move",
      action: "forward",
      explanation: "Function: Second move",
    },
    {
      type: "move",
      action: "turn_right",
      explanation: "Function: Turn right",
    },
    { type: "function_end" },
    {
      type: "function_call",
      name: "moveSquare",
      explanation: "Calling moveSquare function",
    },
  ],
};
