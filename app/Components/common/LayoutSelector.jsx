import { useState, useEffect, useRef } from "react";
import { LayoutDashboard } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useAppContext } from "../../context/AppContext";

const LayoutSelector = () => {
  const { isDarkMode } = useTheme();
  const { layoutMode, setLayoutMode } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const layouts = [
    {
      id: "default",
      name: "Default",
      preview: (
        <div className="w-full h-full flex">
          <div className="w-2/3 h-full bg-current rounded-l-sm"></div>
          <div className="w-1/3 h-full flex flex-col gap-1 pl-1">
            <div className="h-1/4 bg-current rounded-sm"></div>
            <div className="h-2/3 bg-current rounded-sm"></div>
          </div>
        </div>
      ),
    },
    {
      id: "centered",
      name: "Centered",
      preview: (
        <div className="w-full h-full flex">
          <div className="w-2/3 h-full flex flex-col">
            <div className="h-1/4 bg-current rounded-sm mb-1"></div>
            <div className="h-3/4 bg-current rounded-sm"></div>
          </div>
          <div className="w-1/3 h-full pl-1">
            <div className="h-full bg-current rounded-sm"></div>
          </div>
        </div>
      ),
    },
    {
      id: "minimal",
      name: "Minimal",
      preview: (
        <div className="w-full h-full">
          <div className="h-1/4 bg-current rounded-sm mb-1"></div>
          <div className="h-3/4 bg-current rounded-sm"></div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-md transition-colors hover:scale-107 ${
          isDarkMode ? "hover:bg-zinc-700" : "hover:bg-zinc-100"
        }`}
      >
        <LayoutDashboard className="w-5 h-5" />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-64 rounded-lg shadow-lg p-3 z-50 ${
            isDarkMode
              ? "bg-zinc-800 border border-zinc-700"
              : "bg-white border border-zinc-200"
          }`}
        >
          <div className="grid grid-cols-1 gap-2">
            {layouts.map((layout) => (
              <button
                key={layout.id}
                onClick={() => {
                  setLayoutMode(layout.id);
                  setIsOpen(false);
                }}
                className={`w-full p-2 rounded-md transition-all ${
                  layoutMode === layout.id
                    ? isDarkMode
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-blue-50 text-blue-600"
                    : isDarkMode
                      ? "hover:bg-zinc-700"
                      : "hover:bg-zinc-100"
                }`}
              >
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium">{layout.name}</span>
                  <div className="w-full h-12 p-1">
                    <div
                      className={`w-full h-full ${
                        layoutMode === layout.id
                          ? isDarkMode
                            ? "text-blue-400"
                            : "text-blue-600"
                          : isDarkMode
                            ? "text-zinc-400"
                            : "text-zinc-400"
                      }`}
                    >
                      {layout.preview}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LayoutSelector;
