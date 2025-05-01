import { useTheme } from "../../context/ThemeContext";
import { SkipForward, SkipBack, RefreshCcw, Play, Pause } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppContext } from "@/app/context/AppContext";

const ControlsContent = ({ contextHook }) => {
  const {
    isPlaying,
    play,
    pause,
    reset,
    nextStep,
    prevStep,
    currentStateIndex,
    states,
  } = contextHook();

  useEffect(() => {
    if (isPlaying && currentStateIndex === states.length - 1) {
      pause();
    }
  }, [currentStateIndex, isPlaying, states.length, pause]);

  const { isDarkMode } = useTheme();

  return (
    <div className="flex justify-center gap-4">
      <button
        className={`py-2 px-3 rounded-lg border border-zinc-300 hover:shadow-md transition-colors hover:scale-103 ${
          isDarkMode ? "hover:bg-zinc-600" : "hover:bg-zinc-200/70"
        } ${currentStateIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={prevStep}
        disabled={currentStateIndex === 0}
      >
        <SkipBack className="w-5 h-5" />
      </button>
      <button
        className={`p-2 rounded-lg border border-zinc-300 hover:shadow-md transition-colors hover:scale-103 ${
          isDarkMode ? "hover:bg-zinc-600" : "hover:bg-zinc-200/60"
        }`}
        onClick={isPlaying ? pause : play}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5" />
        )}
      </button>
      <button
        className={`py-2 px-3 rounded-lg border border-zinc-300 hover:shadow-md transition-colors hover:scale-103 ${
          isDarkMode ? "hover:bg-zinc-600" : "hover:bg-zinc-200/60"
        } ${
          currentStateIndex === states.length - 1
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
        onClick={nextStep}
        disabled={currentStateIndex === states.length - 1}
      >
        <SkipForward className="w-5 h-5" />
      </button>
      <button
        className={`p-2 rounded-lg border border-zinc-300 hover:shadow-md transition-colors hover:scale-103 ${
          isDarkMode ? "hover:bg-zinc-600" : "hover:bg-zinc-200/60"
        }`}
        onClick={reset}
      >
        <RefreshCcw className="w-5 h-5" />
      </button>
    </div>
  );
};

const Controls = () => {
  const { currentCategory, currentAlgorithm } = useAppContext();
  const [contextHook, setContextHook] = useState(null);

  useEffect(() => {
    if (currentAlgorithm) {
      const lowerCaseCategory =
        currentCategory.charAt(0).toLowerCase() + currentCategory.slice(1);
      import(`../../algorithms/${lowerCaseCategory}/${currentCategory}Context`)
        .then((module) => {
          const hook = module.default || module[`use${currentCategory}`];
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
    <>
      {contextHook ? (
        <ControlsContent contextHook={contextHook} />
      ) : (
        <div className="flex justify-center">Loading Controls...</div>
      )}
    </>
  );
};

export default Controls;
