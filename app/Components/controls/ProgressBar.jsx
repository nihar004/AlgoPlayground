import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useAppContext } from "@/app/context/AppContext";

// This component will only be rendered when the dynamic hook is loaded.
const ProgressBarContent = ({ dynamicHook }) => {
  // Call the dynamic hook (which is now guaranteed to exist)
  const { currentStateIndex, states } = dynamicHook();
  const progress =
    states && states.length > 1
      ? (currentStateIndex / (states.length - 1)) * 100
      : 0;

  return (
    <div
      className="bg-blue-500 h-full rounded-b-lg transition-all duration-300"
      style={{ width: `${progress}%` }} // Dynamic width based on progress
    ></div>
  );
};

const ProgressBar = () => {
  const { isDarkMode } = useTheme();
  const { currentCategory, currentAlgorithm } = useAppContext();
  const [contextHook, setContextHook] = useState(null);

  useEffect(() => {
    if (currentAlgorithm) {
      const lowerCaseCategory = currentCategory.toLowerCase();

      // Dynamically import the context based on the current algorithm
      import(`../../algorithms/${lowerCaseCategory}/${currentCategory}Context`)
        .then((module) => {
          // Get the hook from the module (default export or named export)
          const hook = module.default || module[`use${currentCategory}`];
          // Save it in state. We wrap it in a function so that it’s not called conditionally.
          setContextHook(() => hook);
        })
        .catch((error) => {
          console.error(
            `Failed to load context for ${lowerCaseCategory}:`,
            error
          );
        });
    }
  }, [currentAlgorithm, currentCategory]);

  return (
    <div
      className={`w-full h-3 mb-4 rounded-b-lg ${
        !isDarkMode ? "bg-zinc-200" : "bg-zinc-500"
      }`}
    >
      {contextHook ? (
        <ProgressBarContent dynamicHook={contextHook} />
      ) : (
        // Fallback progress bar (0% progress) while the dynamic hook is not loaded
        <div
          className="bg-blue-500 h-full rounded-b-lg transition-all duration-300"
          style={{ width: "0%" }}
        ></div>
      )}
    </div>
  );
};

export default ProgressBar;
