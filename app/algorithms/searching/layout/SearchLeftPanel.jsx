import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import GenerateArrayMenu from "./GenerateArrayMenu";
import { useSearching } from "../SearchingContext";
import { useAppContext } from "@/app/context/AppContext";

const SearchLeftPanel = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isDarkMode } = useTheme();
  const {
    speed,
    setSpeed,
    pause,
    play,
    size,
    setSize,
    array,
    setArray,
    target,
    setTarget,
  } = useSearching();
  const [showGenerateMenu, setShowGenerateMenu] = useState(false);
  const isSliderChange = useRef(false);
  const [bgColor, setBgColor] = useState("");
  const { currentAlgorithm } = useAppContext();

  // Regenerate array when size changes
  useEffect(() => {
    if (isSliderChange.current) {
      const min = -100;
      const max = 100;
      const newArray = Array.from(
        { length: size },
        () => Math.floor(Math.random() * (max - min + 1)) + min
      );
      setArray(newArray);
      isSliderChange.current = false;
      setRandomTarget(newArray);
    }
  }, [size]);

  const handlePanelClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      pause();
    }
  };

  useEffect(() => {
    if (isExpanded) {
      // Save the current scroll position
      const scrollY = window.scrollY;
      // Prevent scrolling by fixing the body
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${scrollY}px`;
    } else {
      // Restore scrolling
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      // Restore scroll position
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    // Cleanup on unmount
    return () => {
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [isExpanded]);

  useEffect(() => {
    setBgColor(!isDarkMode ? "#ffffff" : "#52525B");
  }, [isDarkMode]);

  const setRandomTarget = (arr) => {
    // Select a random value from the array
    const randomValue = arr[Math.floor(Math.random() * array.length)];

    // Clamp the target within the range -1000 to 1000
    setTarget(randomValue);
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

      <div className="relative">
        <motion.div
          initial={false}
          className={
            "relative left-4 top-4 overflow-hidden shadow-lg h-auto cursor-pointer"
          }
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
              className={`font-medium text-center ${
                isExpanded ? "" : "text-sm"
              }`}
            >
              Control Panel
            </h3>

            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 space-y-6"
              >
                {currentAlgorithm === "linear" && (
                  <button
                    className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 hover:scale-101"
                    onClick={() => setShowGenerateMenu(!showGenerateMenu)}
                  >
                    Create New Array
                  </button>
                )}
                <button
                  className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-400 hover:scale-101"
                  onClick={() => {
                    setIsExpanded(false);
                    setShowGenerateMenu(false);
                    play();
                  }}
                >
                  Start Searching
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
                          setSize(""); // Allow empty input for smooth typing
                        } else {
                          let val_local = parseInt(val, 10) || 1;
                          setSize(Math.max(5, Math.min(val_local, 20)));
                        }
                      }}
                      className="w-16 text-right bg-transparent outline-none"
                    />
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="20"
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
                          setSpeed(""); // Allow empty input for smooth typing
                        } else {
                          let val_local = parseInt(val, 10) || 1; // Ensure it's at least 1
                          setSpeed(Math.max(1, Math.min(10, val_local))); // Clamps between 1 and 10
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

                {/* Target Number Control */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Target Number:</span>
                    <input
                      type="number"
                      value={target}
                      onChange={(e) => {
                        let val = e.target.value;
                        if (val === "") {
                          setTarget(""); // Allow empty input for smooth typing
                        } else {
                          let val_local = parseInt(val, 10) || -1000; // Ensure it's at least -1000
                          setTarget(Math.max(-1000, Math.min(1000, val_local))); // Clamps between -1000 and 1000
                        }
                      }}
                      className="w-16 text-right bg-transparent outline-none"
                    />
                  </div>
                  <button
                    className="w-full py-2 bg-violet-500 text-white rounded hover:bg-violet-600"
                    onClick={() => setRandomTarget(array)}
                  >
                    Randomize Target
                  </button>
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

        {/* Generate Menu - Now appears on the right */}
        {showGenerateMenu && (
          <GenerateArrayMenu
            setShowGenerateMenu={setShowGenerateMenu}
            setIsExpanded={setIsExpanded}
          />
        )}
      </div>
    </>
  );
};

export default SearchLeftPanel;
