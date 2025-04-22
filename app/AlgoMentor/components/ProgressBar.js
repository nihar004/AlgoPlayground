import { useTheme } from "../../context/ThemeContext";
import { useArray } from "./ArrayContext";

const ProgressBar = () => {
  const { isDarkMode } = useTheme();
  const { currentStateIndex, algorithmStates } = useArray();

  // Calculate progress percentage
  const progress =
    algorithmStates && algorithmStates.length > 1
      ? (currentStateIndex / (algorithmStates.length - 1)) * 100
      : 0;

  return (
    <div
      className={`w-full h-3 mb-4 rounded-b-lg ${
        !isDarkMode ? "bg-zinc-200" : "bg-zinc-700"
      }`}
    >
      <div
        className="bg-blue-500 h-full rounded-b-lg transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
