import { useTheme } from "../../context/ThemeContext";
import { SkipForward, SkipBack, RefreshCcw, Play, Pause } from "lucide-react";
import { useSorting } from "../../algorithms/sorting/SortingContext";
import { useEffect } from "react";

const Controls = () => {
  const { isDarkMode } = useTheme();
  const {
    isPlaying,
    play,
    pause,
    reset,
    nextStep,
    prevStep,
    currentStateIndex,
    sortingStates,
  } = useSorting();

  useEffect(() => {
    // If we're playing and reach the end, pause the playback
    if (isPlaying && currentStateIndex === sortingStates.length - 1) {
      pause();
    }
  }, [currentStateIndex, isPlaying, sortingStates.length, pause]);

  return (
    <>
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
            currentStateIndex === sortingStates.length - 1
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          onClick={nextStep}
          disabled={currentStateIndex === sortingStates.length - 1}
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
    </>
  );
};

export default Controls;
