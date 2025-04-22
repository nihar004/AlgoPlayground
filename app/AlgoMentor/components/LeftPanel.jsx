import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useArray } from "./ArrayContext";
import GenerateArrayMenu from "./GenerateArrayMenu";
import { useWarnings } from "@/app/context/WarningContext";

const LeftPanel = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isDarkMode } = useTheme();
  const {
    array,
    setArray,
    size,
    setSize,
    speed,
    setSpeed,
    play,
    pause,
    isPlaying,
    reset,
    updateStatesWithNewArray, // Add this
  } = useArray();
  const { showWarning } = useWarnings();
  const [showGenerateMenu, setShowGenerateMenu] = useState(false);
  const isSliderChange = useRef(false);
  const [bgColor, setBgColor] = useState("");

  // Regenerate array when size changes
  useEffect(() => {
    if (isSliderChange.current) {
      const min = 1;
      const max = 50;
      const newArray = Array.from(
        { length: size },
        () => Math.floor(Math.random() * (max - min + 1)) + min
      );
      setArray(newArray);
      updateStatesWithNewArray(newArray); // Use stored function to generate new states
      isSliderChange.current = false;
    }
  }, [size]);

  useEffect(() => {
    if (isExpanded) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [isExpanded]);

  useEffect(() => {
    setBgColor(!isDarkMode ? "#ffffff" : "#52525B");
  }, [isDarkMode]);

  const handlePanelClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      pause();
    }
  };

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => {
              setIsExpanded(false);
              setShowGenerateMenu(false);
            }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-50">
        <motion.div
          initial={false}
          className="relative left-4 top-4 overflow-hidden shadow-lg h-auto cursor-pointer"
          animate={{
            borderRadius: isExpanded ? "16px" : "10px",
            width: isExpanded ? "min(90vw, 300px)" : "70px",
            backgroundColor: bgColor,
          }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 200,
          }}
          onClick={handlePanelClick}
        >
          <div className={`${isExpanded ? "p-4" : "p-2"}`}>
            {isExpanded && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`absolute top-2 right-2 p-1 rounded-full ${
                  !isDarkMode ? "hover:bg-gray-100" : "hover:bg-gray-500"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(false);
                  setShowGenerateMenu(false);
                }}
              >
                <X size={20} />
              </motion.button>
            )}

            <h3
              className={`font-medium text-center ${isExpanded ? "" : "text-sm"}`}
            >
              Control Panel
            </h3>

            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 space-y-6"
              >
                <button
                  className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 hover:scale-101"
                  onClick={() => setShowGenerateMenu(!showGenerateMenu)}
                >
                  Create New Array
                </button>
                <button
                  className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-400 hover:scale-101"
                  onClick={() => {
                    setIsExpanded(false);
                    setShowGenerateMenu(false);
                    play();
                  }}
                >
                  Start Sorting
                </button>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Array Size:</span>
                    <input
                      type="number"
                      value={size}
                      onChange={(e) => {
                        isSliderChange.current = true;
                        let val = e.target.value;
                        if (val === "") {
                          setSize("");
                        } else {
                          let val_local = parseInt(val, 10) || 1;
                          setSize(Math.max(3, Math.min(val_local, 30)));
                        }
                      }}
                      className="w-16 text-right bg-transparent outline-none"
                    />
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="30"
                    value={size}
                    onChange={(e) => {
                      isSliderChange.current = true;
                      setSize(parseInt(e.target.value));
                    }}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Animation Speed:</span>
                    <input
                      type="number"
                      value={speed}
                      onChange={(e) => {
                        let val = e.target.value;
                        if (val === "") {
                          setSpeed("");
                        } else {
                          let val_local = parseInt(val, 10) || 1;
                          setSpeed(Math.max(1, Math.min(10, val_local)));
                        }
                      }}
                      className="w-16 text-right bg-transparent outline-none"
                    />
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={speed}
                    onChange={(e) => setSpeed(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                {array.length > 0 && (
                  <div
                    className={`mt-4 p-2 rounded-xl shadow-lg ${
                      !isDarkMode ? "bg-zinc-100" : "bg-zinc-500"
                    }`}
                  >
                    <div className="text-sm font-medium mb-1">
                      Current Array:
                    </div>
                    <div className="text-sm overflow-x-auto">
                      {array.join(", ")}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Generate Menu */}
        {showGenerateMenu && (
          <div className="relative">
            <GenerateArrayMenu
              setShowGenerateMenu={setShowGenerateMenu}
              setIsExpanded={setIsExpanded}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default LeftPanel;
