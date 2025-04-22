import { useTheme } from "../../context/ThemeContext";
import {
  SkipForward,
  SkipBack,
  RefreshCcw,
  Play,
  Pause,
  AlertCircle,
} from "lucide-react";
import { useEffect } from "react";
import { useArray } from "./ArrayContext";

const Controls = () => {
  const {
    isPlaying,
    isPaused,
    isCompleted,
    play,
    pause,
    reset,
    nextStep,
    prevStep,
    currentStateIndex,
    algorithmStates,
  } = useArray();

  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (isPlaying && currentStateIndex >= algorithmStates.length - 1) {
      pause();
    }
  }, [currentStateIndex, isPlaying, algorithmStates, pause]);

  // Remove the automatic play() call as it shouldn't auto-start
  if (!algorithmStates || algorithmStates.length === 0) {
    return (
      <div className="flex justify-center items-center gap-2 mt-4 text-zinc-500">
        <AlertCircle className="w-5 h-5" />
        <span>No visualization steps available.</span>
        <AlertCircle className="w-5 h-5" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-center gap-4">
        {/* Prev Step Button */}
        <button
          className={`py-2 px-3 rounded-lg border border-zinc-300 hover:shadow-md transition hover:scale-103 ${
            isDarkMode ? "hover:bg-zinc-600" : "hover:bg-zinc-200/70"
          } ${currentStateIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={prevStep}
          disabled={currentStateIndex === 0}
        >
          <SkipBack className="w-5 h-5" />
        </button>

        {/* Play/Pause Button */}
        <button
          className={`p-2 rounded-lg border border-zinc-300 hover:shadow-md transition hover:scale-103 ${
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

        {/* Next Step Button */}
        <button
          className={`py-2 px-3 rounded-lg border border-zinc-300 hover:shadow-md transition hover:scale-103 ${
            isDarkMode ? "hover:bg-zinc-600" : "hover:bg-zinc-200/60"
          } ${
            currentStateIndex === algorithmStates.length - 1
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          onClick={nextStep}
          disabled={currentStateIndex === algorithmStates.length - 1}
        >
          <SkipForward className="w-5 h-5" />
        </button>

        {/* Reset Button */}
        <button
          className={`p-2 rounded-lg border border-zinc-300 hover:shadow-md transition hover:scale-103 ${
            isDarkMode ? "hover:bg-zinc-600" : "hover:bg-zinc-200/60"
          }`}
          onClick={reset}
        >
          <RefreshCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Controls;
