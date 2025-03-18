import SortingLeftPanel from "./layout/SortingLeftPanel";
import SortingRightPanel from "./layout/SortingRightPanel";
import VisualizationArea from "./layout/VisualizationArea";
import { SortingProvider } from "./SortingContext";

function Sort() {
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
          <div className="col-span-9">{<VisualizationArea />}</div>

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
