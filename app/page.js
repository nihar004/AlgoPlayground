"use client";

import { WarningProvider } from "./context/WarningContext";
import Warning from "./Components/common/Warning";
import { useAppContext } from "./context/AppContext";
import { algorithms } from "./algorithms/registry/algo";

export default function Home() {
  const { currentCategory, currentAlgorithm } = useAppContext();

  // Get the selected algorithm component
  const SelectedAlgorithm =
    algorithms[currentCategory]?.[currentAlgorithm]?.component;

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
