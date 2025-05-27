"use client";

import { useEffect } from "react";
import {
  X,
  CheckCircle,
  ExternalLink,
  BookOpen,
  Code,
  PieChart,
} from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { useRouter } from "next/navigation";

export const NodeContent = ({ node, onClose, onComplete, nodeTypes }) => {
  const router = useRouter();
  const nodeType = nodeTypes[node.type] || nodeTypes.BASICS;
  const { content } = node;
  const { changeCategory, changeAlgorithm } = useAppContext(); // Get context functions

  // Handle visualization redirect
  const handleVisualizationClick = () => {
    if (content.visualization) {
      changeCategory(content.visualization.category);
      changeAlgorithm(content.visualization.algorithm);
      onClose(); // Close modal after setting visualization
      // Open in new tab and switch to it automatically
      const newTab = window.open("/", "_blank");
      if (newTab) {
        newTab.focus(); // Automatically switch to the new tab
      }
    }
  };

  // Set video start time
  useEffect(() => {
    if (content.video && content.video.time) {
      const iframe = document.getElementById("content-video");
      if (iframe) {
        // Append start time parameter to YouTube URL
        const currentSrc = iframe.src;
        if (!currentSrc.includes("start=")) {
          iframe.src = `${currentSrc}${currentSrc.includes("?") ? "&" : "?"}start=${content.video.time}`;
        }
      }
    }
  }, [content.video]);

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-auto">
      <div className="border border-gray-200 shadow-md h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex flex-col sticky top-0 bg-white z-10">
          {/* Title and Tags Row */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-black">
                {content.title || content.video?.title || "Learning Content"}
              </h1>
              {/* Tags and Metadata */}
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm font-medium ${nodeType.color}`}
                >
                  {nodeType.name}
                </span>
                <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full font-medium">
                  {node.difficulty.charAt(0).toUpperCase() +
                    node.difficulty.slice(1)}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Main content area with 80/20 split */}
        <div className="flex flex-grow h-full overflow-hidden">
          {/* Video area (80%) */}
          {content.video && (
            <div className="w-4/5 h-full bg-black flex items-center justify-center p-4">
              <div className="w-full h-full max-h-full">
                <iframe
                  id="content-video"
                  className="w-full h-full"
                  src={content.video.url}
                  title={content.video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {/* Right sidebar (20%) */}
          <div className="w-1/5 border-l border-gray-200 p-4 overflow-y-auto text-black">
            <div className="space-y-6">
              {/* Notes section */}
              {content.video?.notes && (
                <div className="pb-4 border-b border-gray-200">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <BookOpen size={18} /> Notes
                  </h3>
                  <a
                    href={content.video.notes}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center gap-1 px-3 py-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <ExternalLink size={16} /> View detailed notes
                  </a>
                </div>
              )}

              {/* LeetCode Problems */}
              {content.leetcode && content.leetcode.length > 0 && (
                <div className="pb-4 border-b border-gray-200">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Code size={18} /> Practice Problems
                  </h3>
                  <ul className="space-y-2">
                    {content.leetcode.map((problem, index) => (
                      <li key={index}>
                        <a
                          href={problem.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center gap-1 px-3 py-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <ExternalLink size={16} /> {problem.id}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Visualization */}
              {content.visualization && (
                <div className="pb-4 border-b border-gray-200">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <PieChart size={18} /> Visualization
                  </h3>
                  <button
                    onClick={handleVisualizationClick}
                    className="w-full text-left px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-2"
                  >
                    <ExternalLink size={16} />
                    View {content.visualization.algorithm}{" "}
                    {content.visualization.category.toLowerCase()}
                  </button>
                </div>
              )}

              {/* Complete button */}
              <div className="pt-4">
                {node.status !== "COMPLETED" ? (
                  <button
                    onClick={() => onComplete(node.id)}
                    className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center justify-center gap-2 transition-colors"
                  >
                    <CheckCircle size={20} /> Complete Challenge
                  </button>
                ) : (
                  <div className="w-full py-3 bg-gray-100 text-gray-700 rounded-md flex items-center justify-center gap-2">
                    <CheckCircle size={20} /> Challenge Completed
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
