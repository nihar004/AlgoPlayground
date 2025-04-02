import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import SortingLeftPanel from "./layout/SortingLeftPanel";
import SortingRightPanel from "./layout/SortingRightPanel";
import { SortingProvider } from "./SortingContext";
import { useAppContext } from "@/app/context/AppContext";
import VisualizationAreaSimple from "./layout/VisualizationArea_simple";

function Sort() {
  const { currentAlgorithm } = useAppContext();
  // Default to the simple visualization component
  const [VisualizationComponent, setVisualizationComponent] = useState(
    () => VisualizationAreaSimple
  );

  useEffect(() => {
    // If the algorithm requires a complex visualization, load it dynamically.
    if (currentAlgorithm === "merge" || currentAlgorithm === "quick") {
      const loadComplexVisualization = async () => {
        try {
          const complexModule = await import(
            "./layout/VisualizationArea_complex"
          );
          setVisualizationComponent(() =>
            dynamic(() => Promise.resolve(complexModule.default), {
              loading: () => <div>Loading...</div>,
            })
          );
        } catch (err) {
          console.error("Failed to load VisualizationArea_complex:", err);
          // Fallback to simple visualization in case of an error.
          setVisualizationComponent(() => VisualizationAreaSimple);
        }
      };

      loadComplexVisualization();
    } else {
      // Otherwise, use the simple component.
      setVisualizationComponent(() => VisualizationAreaSimple);
    }
  }, [currentAlgorithm]);

  return (
    <SortingProvider>
      <main className="w-full mx-auto p-4 relative">
        {/* Left Panel (Fixed) */}
        <div className="absolute top-4 left-4 z-50">
          <SortingLeftPanel />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-15 gap-6">
          {/* Visualization Area */}
          <div className="col-span-9">
            <VisualizationComponent />
          </div>

          {/* Right Panel */}
          <div className="col-span-6 space-y-4">
            <SortingRightPanel />
          </div>
        </div>
      </main>
    </SortingProvider>
  );
}

export default Sort;
