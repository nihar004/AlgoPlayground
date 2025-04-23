import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import SortingLeftPanel from "./layout/SortingLeftPanel";
import SortingRightPanel from "./layout/SortingRightPanel";
import { SortingProvider } from "./SortingContext";
import { useAppContext } from "@/app/context/AppContext";
import VisualizationAreaSimple from "./layout/VisualizationArea_simple";

function Sort() {
  const { currentAlgorithm, layoutMode } = useAppContext();
  const [VisualizationComponent, setVisualizationComponent] = useState(
    () => VisualizationAreaSimple
  );

  useEffect(() => {
    if (currentAlgorithm === "merge") {
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
          setVisualizationComponent(() => VisualizationAreaSimple);
        }
      };

      loadComplexVisualization();
    } else {
      setVisualizationComponent(() => VisualizationAreaSimple);
    }
  }, [currentAlgorithm]);

  // Get grid layout based on selected layout mode
  const getGridLayout = () => {
    switch (layoutMode) {
      case "minimal":
        return "grid-cols-1";
      default: // both default and centered use the same grid
        return "grid-cols-15";
    }
  };

  // Get column span for visualization area based on layout mode
  const getVisualizationSpan = () => {
    switch (layoutMode) {
      case "minimal":
        return "col-span-full";
      default:
        return "col-span-9";
    }
  };

  return (
    <SortingProvider>
      <main className="w-full mx-auto p-4 relative">
        {/* Left Panel (Fixed) - Show in all layouts */}
        <div className="absolute top-4 left-4 z-50">
          <SortingLeftPanel />
        </div>

        {/* Main Content */}
        <div className={`grid ${getGridLayout()} gap-6`}>
          {/* Visualization Area */}
          <div className={getVisualizationSpan()}>
            <VisualizationComponent />
          </div>

          {/* Right Panel - Show in default and centered layouts */}
          {layoutMode !== "minimal" && (
            <div className="col-span-6 space-y-4">
              <SortingRightPanel />
            </div>
          )}
        </div>
      </main>
    </SortingProvider>
  );
}

export default Sort;
