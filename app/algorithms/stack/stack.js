"use client";
import { useAppContext } from "@/app/context/AppContext";
import StackVisualizationUsingArrays from "./StackVisualizationUsingArrays";
import StackVisualizationUsingLL from "./StackVisualizationUsingLL";

function Stack() {
  const { currentAlgorithm } = useAppContext();

  // Render the appropriate implementation based on currentAlgorithm
  const renderImplementation = () => {
    switch (currentAlgorithm) {
      case "array":
        return <StackVisualizationUsingArrays />;
      case "linkedList":
        return <StackVisualizationUsingLL />;
      default:
        return (
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-red-600">
              Please select a stack implementation
            </h2>
          </div>
        );
    }
  };

  return (
    <main>
      <div className="container mx-auto">{renderImplementation()}</div>
    </main>
  );
}

export default Stack;
