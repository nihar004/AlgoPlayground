import { useSorting } from "../../algorithms/sorting/context/SortingContext";
import { useTheme } from "../../context/ThemeContext";

const ProgressBar = () => {
  const { isDarkMode } = useTheme();
  const { currentStateIndex, sortingStates } = useSorting();

  // Calculate progress dynamically
  const progress =
    sortingStates.length > 1
      ? (currentStateIndex / (sortingStates.length - 1)) * 100
      : 0;

  return (
    <div
      className={`w-full h-3 mb-4 rounded-b-lg ${
        !isDarkMode ? "bg-zinc-200" : "bg-zinc-500"
      }`}
    >
      <div
        className="bg-blue-500 h-full rounded-b-lg transition-all duration-300"
        style={{ width: `${progress}%` }} // Dynamic width based on progress
      ></div>
    </div>
  );
};

export default ProgressBar;
