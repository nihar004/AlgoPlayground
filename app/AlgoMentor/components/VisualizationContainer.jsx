import { ArrayContextProvider, useArray } from "./ArrayContext";
import { WarningProvider } from "../../context/WarningContext";
import VisualizationArea from "./VisualizationArea";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import { useTheme } from "../../context/ThemeContext";
import Header from "./Header";
import { useEffect, useState } from "react";
import { checkVisualization } from "../../lib/visualizationService";
import { generateAlgorithmStates } from "../../lib/algorithmService";

const VisualizationContent = ({ code, onBack }) => {
  const { isDarkMode } = useTheme();
  const { setArray, setAlgorithmStates, setGenerateStatesFunction } =
    useArray();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function initializeVisualization() {
      try {
        setIsLoading(true);
        setError(null);

        const visualizationCheck = await checkVisualization(code);

        if (!visualizationCheck.isVisualizable) {
          throw new Error(
            visualizationCheck.reason || "Code cannot be visualized"
          );
        }

        if (!mounted) return;

        const initialInput = Array.isArray(visualizationCheck.initialInput)
          ? visualizationCheck.initialInput
          : [5, 3, 8, 4, 2];

        setArray(initialInput);

        const { states, generateFunction } = await generateAlgorithmStates(
          code,
          initialInput
        );

        if (!mounted) return;

        if (!states || !Array.isArray(states) || states.length === 0) {
          throw new Error("Failed to generate visualization states");
        }

        setGenerateStatesFunction(() => generateFunction);
        setAlgorithmStates(states);
      } catch (error) {
        if (mounted) {
          console.error("Visualization error:", error);
          setError(error.message);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    initializeVisualization();

    return () => {
      mounted = false;
    };
  }, [code, setArray, setAlgorithmStates, setGenerateStatesFunction]);

  if (isLoading) {
    return <div>Loading visualization...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="w-full mx-auto p-4 relative">
        <div className="absolute top-4 left-4 z-50">
          <LeftPanel />
        </div>

        <div className="grid grid-cols-15 gap-6">
          <div className="col-span-9">
            <VisualizationArea />
          </div>

          <div className="col-span-6 space-y-4">
            <RightPanel code={code} onBack={onBack} />
          </div>
        </div>
      </main>
    </div>
  );
};

const VisualizationContainer = ({ code, onBack }) => {
  return (
    <WarningProvider>
      <ArrayContextProvider>
        <VisualizationContent code={code} onBack={onBack} />
      </ArrayContextProvider>
    </WarningProvider>
  );
};

export default VisualizationContainer;
