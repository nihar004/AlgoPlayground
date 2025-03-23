import SearchLeftPanel from "./layout/SearchLeftPanel";
import SearchRightPanel from "./layout/SearchRightPanel";
import VisualizationArea from "./layout/VisualizationArea";
import { SearchingProvider } from "./SearchingContext";

function Search() {
  return (
    <SearchingProvider>
      <main className="w-full mx-auto p-4 relative">
        {/* Left Panel (Fixed) */}
        <div className="absolute top-4 left-4 z-50">
          <SearchLeftPanel />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-15 gap-6">
          {/* Visualization Area */}
          <div className="col-span-9">{<VisualizationArea />}</div>

          {/* Right Panel */}
          <div className="col-span-6 space-y-4">
            <SearchRightPanel />
          </div>
        </div>
      </main>
    </SearchingProvider>
  );
}

export default Search;
