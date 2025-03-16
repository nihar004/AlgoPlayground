/* 

*********************Detailed Workflow:*********************

Initial State: Empty warning array []

Scenario 1: First Warning
- Warning "Array too large" added
- Displayed immediately
- 3-second timer starts
- After 3 seconds, warning disappears

Scenario 2: Multiple Warnings
- First warning "Array too large" displayed
- Second warning "Invalid input" added
- Both warnings displayed
- Each has 3-second timer
- After 6 seconds, both warnings gone

Scenario 3: Queued Warnings
- First 2 warnings displayed
- Third warning "Sorting error" added
- Waits in queue
- When first warning disappears, third warning appears


*/

import { useEffect } from "react";
import { X } from "lucide-react";
import { useWarnings } from "../../context/WarningContext";
import { useTheme } from "../../context/ThemeContext";

const Warning = () => {
  const { isDarkMode } = useTheme();
  const { warnings, removeWarning } = useWarnings();

  useEffect(() => {
    const timers = warnings.map((warning) =>
      setTimeout(() => removeWarning(warning.id), warning.duration || 3000)
    );

    return () => timers.forEach(clearTimeout);
  }, [warnings, removeWarning]);

  const displayedWarnings = warnings.slice(0, 2);

  const getWarningClasses = () => {
    return `
      px-4 py-2 
      text-red-500
      rounded-sm 
      relative 
      animate-slide-in-right
      shadow-sm
      border
      flex 
      items-center 
      justify-between
      transition-colors 
      duration-300
      font-medium
      ${
        !isDarkMode ? "bg-white border-zinc-100" : "bg-zinc-700 border-zinc-700"
      }
    `;
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2 w-full max-w-xl px-4">
      {displayedWarnings.map((warning) => (
        <div key={warning.id} className={getWarningClasses()} role="alert">
          <span className="flex-grow text-sm">{warning.message}</span>

          <button
            onClick={() => removeWarning(warning.id)}
            className={`
              ml-2 
              ${
                !isDarkMode
                  ? "text-zinc-500 hover:text-zinc-700"
                  : "text-zinc-400 hover:text-zinc-200"
              }
              focus:outline-none
            `}
            aria-label="Close warning"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Warning;
