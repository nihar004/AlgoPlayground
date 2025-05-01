import { LinkedListProvider } from "./LinkedListContext";
import LinkedListLeftPanel from "./layout/LinkedListLeftPanel";
import LinkedListRightPanel from "./layout/LinkedListRightPanel";
import VisualizationArea from "./layout/VisualizationArea";
import { useAppContext } from "@/app/context/AppContext";

function LinkedList() {
  const { layoutMode } = useAppContext();

  const getGridLayout = () => {
    switch (layoutMode) {
      case "minimal":
        return "grid-cols-1";
      default:
        return "grid-cols-15";
    }
  };

  const getVisualizationSpan = () => {
    switch (layoutMode) {
      case "minimal":
        return "col-span-full";
      default:
        return "col-span-9";
    }
  };

  return (
    <LinkedListProvider>
      <main className="w-full mx-auto p-4 relative">
        {/* Left Panel - Fixed position */}
        <div className="absolute top-4 left-4 z-50">
          <LinkedListLeftPanel />
        </div>

        {/* Main Content */}
        <div className={`grid ${getGridLayout()} gap-6`}>
          {/* Visualization Area */}
          <div className={getVisualizationSpan()}>
            <VisualizationArea />
          </div>

          {/* Right Panel */}
          {layoutMode != "minimal" && (
            <div className="col-span-6 space-y-4">
              <LinkedListRightPanel />
            </div>
          )}
        </div>
      </main>
    </LinkedListProvider>
  );
}

export default LinkedList;
