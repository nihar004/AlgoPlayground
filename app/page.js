"use client";

import { WarningProvider } from "./context/WarningContext";
import Warning from "./Components/common/Warning";
import { useAppContext } from "./context/AppContext";
import { path } from "./algorithms/registry/path.js";

export default function Home() {
  const { currentCategory } = useAppContext();

  // Get the selected algorithm component
  const SelectedAlgorithm = path[currentCategory];

  return (
    <>
      <WarningProvider>
        <Warning />
        {SelectedAlgorithm ? (
          <SelectedAlgorithm />
        ) : (
          <div>No Algorithm Selected</div>
        )}
      </WarningProvider>
    </>
  );
}
