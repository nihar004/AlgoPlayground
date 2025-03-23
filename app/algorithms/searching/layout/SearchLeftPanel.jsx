// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X } from "lucide-react";
// import { useTheme } from "../../../context/ThemeContext";
// import GenerateArrayMenu from "./GenerateArrayMenu";
// import { useSearching } from "../SearchingContext";
// import { useAppContext } from "@/app/context/AppContext";

// const SearchLeftPanel = () => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const { isDarkMode } = useTheme();
//   const {
//     speed,
//     setSpeed,
//     pause,
//     play,
//     size,
//     setSize,
//     array,
//     setArray,
//     target,
//     setTarget,
//   } = useSearching();
//   const [showGenerateMenu, setShowGenerateMenu] = useState(false);
//   const isSliderChange = useRef(false);
//   const [bgColor, setBgColor] = useState("");
//   const { currentAlgorithm } = useAppContext();

//   // State for input fields to avoid controlled/uncontrolled switches
//   const [sizeInput, setSizeInput] = useState(size.toString());
//   const [speedInput, setSpeedInput] = useState(speed.toString());
//   const [targetInput, setTargetInput] = useState(target.toString());

//   // Generate new array based on current algorithm
//   const generateNewArray = () => {
//     const min = -100;
//     const max = 100;
//     let newArray = [];

//     if (currentAlgorithm === "binary") {
//       // Create a sorted array for binary search
//       // First generate random numbers
//       newArray = Array.from(
//         { length: size },
//         () => Math.floor(Math.random() * (max - min + 1)) + min
//       );
//       // Then sort them
//       newArray.sort((a, b) => a - b);
//     } else {
//       // Create a random unsorted array for linear search
//       newArray = Array.from(
//         { length: size },
//         () => Math.floor(Math.random() * (max - min + 1)) + min
//       );
//     }

//     setArray(newArray);
//     setRandomTarget(newArray);
//     return newArray;
//   };

//   // Regenerate array when size changes
//   useEffect(() => {
//     if (isSliderChange.current) {
//       generateNewArray();
//       isSliderChange.current = false;
//     }
//   }, [size, currentAlgorithm]);

//   // Update input states when context values change
//   useEffect(() => {
//     setSizeInput(size.toString());
//   }, [size]);

//   useEffect(() => {
//     setSpeedInput(speed.toString());
//   }, [speed]);

//   useEffect(() => {
//     setTargetInput(target.toString());
//   }, [target]);

//   const handlePanelClick = () => {
//     if (!isExpanded) {
//       setIsExpanded(true);
//       pause();
//     }
//   };

//   useEffect(() => {
//     if (isExpanded) {
//       // Save the current scroll position
//       const scrollY = window.scrollY;
//       // Prevent scrolling by fixing the body
//       document.body.style.position = "fixed";
//       document.body.style.width = "100%";
//       document.body.style.top = `-${scrollY}px`;
//     } else {
//       // Restore scrolling
//       const scrollY = document.body.style.top;
//       document.body.style.position = "";
//       document.body.style.width = "";
//       document.body.style.top = "";
//       // Restore scroll position
//       window.scrollTo(0, parseInt(scrollY || "0") * -1);
//     }

//     // Cleanup on unmount
//     return () => {
//       document.body.style.position = "";
//       document.body.style.width = "";
//       document.body.style.top = "";
//     };
//   }, [isExpanded]);

//   useEffect(() => {
//     setBgColor(!isDarkMode ? "#ffffff" : "#52525B");
//   }, [isDarkMode]);

//   const setRandomTarget = (arr) => {
//     // Select a random value from the array
//     if (arr && arr.length > 0) {
//       const randomValue = arr[Math.floor(Math.random() * arr.length)];
//       // Clamp the target within the range -1000 to 1000
//       setTarget(randomValue);
//     }
//   };

//   // Handle size input change
//   const handleSizeInputChange = (e) => {
//     const value = e.target.value;
//     setSizeInput(value);

//     if (value === "") {
//       // Don't update the actual size yet
//     } else {
//       const numValue = parseInt(value, 10);
//       if (!isNaN(numValue)) {
//         const clampedValue = Math.max(5, Math.min(numValue, 20));
//         isSliderChange.current = true;
//         setSize(clampedValue);
//       }
//     }
//   };

//   // Handle size input blur
//   const handleSizeInputBlur = () => {
//     if (sizeInput === "" || isNaN(parseInt(sizeInput, 10))) {
//       setSizeInput(size.toString());
//     } else {
//       const numValue = parseInt(sizeInput, 10);
//       const clampedValue = Math.max(5, Math.min(numValue, 20));
//       if (clampedValue !== size) {
//         isSliderChange.current = true;
//         setSize(clampedValue);
//       }
//       setSizeInput(clampedValue.toString());
//     }
//   };

//   // Handle speed input change
//   const handleSpeedInputChange = (e) => {
//     const value = e.target.value;
//     setSpeedInput(value);

//     if (value === "") {
//       // Don't update the actual speed yet
//     } else {
//       const numValue = parseInt(value, 10);
//       if (!isNaN(numValue)) {
//         const clampedValue = Math.max(1, Math.min(numValue, 10));
//         setSpeed(clampedValue);
//       }
//     }
//   };

//   // Handle speed input blur
//   const handleSpeedInputBlur = () => {
//     if (speedInput === "" || isNaN(parseInt(speedInput, 10))) {
//       setSpeedInput(speed.toString());
//     } else {
//       const numValue = parseInt(speedInput, 10);
//       const clampedValue = Math.max(1, Math.min(numValue, 10));
//       setSpeed(clampedValue);
//       setSpeedInput(clampedValue.toString());
//     }
//   };

//   // Handle target input change
//   const handleTargetInputChange = (e) => {
//     const value = e.target.value;
//     setTargetInput(value);

//     if (value === "") {
//       // Don't update the actual target yet
//     } else {
//       const numValue = parseInt(value, 10);
//       if (!isNaN(numValue)) {
//         const clampedValue = Math.max(-1000, Math.min(numValue, 1000));
//         setTarget(clampedValue);
//       }
//     }
//   };

//   // Handle target input blur
//   const handleTargetInputBlur = () => {
//     if (targetInput === "" || isNaN(parseInt(targetInput, 10))) {
//       setTargetInput(target.toString());
//     } else {
//       const numValue = parseInt(targetInput, 10);
//       const clampedValue = Math.max(-1000, Math.min(numValue, 1000));
//       setTarget(clampedValue);
//       setTargetInput(clampedValue.toString());
//     }
//   };

//   return (
//     <>
//       <AnimatePresence>
//         {isExpanded && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 0.4 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/20 backdrop-blur-sm"
//             onClick={() => {
//               setIsExpanded(false);
//               setShowGenerateMenu(false);
//             }}
//           />
//         )}
//       </AnimatePresence>

//       <div className="relative">
//         <motion.div
//           initial={false}
//           className={
//             "relative left-4 top-4 overflow-hidden shadow-lg h-auto cursor-pointer"
//           }
//           animate={{
//             borderRadius: isExpanded ? "16px" : "10px",
//             width: isExpanded ? "min(90vw, 300px)" : "70px",
//             backgroundColor: bgColor,
//           }}
//           transition={{
//             type: "spring",
//             damping: 20,
//             stiffness: 200,
//           }}
//           onClick={handlePanelClick}
//         >
//           <div className={`${isExpanded ? "p-4" : "p-2"}`}>
//             {isExpanded && (
//               <motion.button
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className={`absolute top-2 right-2 p-1 rounded-full ${
//                   !isDarkMode ? "hover:bg-gray-100" : "hover:bg-gray-500"
//                 }`}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setIsExpanded(false);
//                   setShowGenerateMenu(false);
//                 }}
//               >
//                 <X size={20} />
//               </motion.button>
//             )}

//             <h3
//               className={`font-medium text-center ${
//                 isExpanded ? "" : "text-sm"
//               }`}
//             >
//               Control Panel
//             </h3>

//             {isExpanded && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="mt-4 space-y-6"
//               >
//                 {currentAlgorithm === "linear" && (
//                   <button
//                     className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 hover:scale-101"
//                     onClick={() => setShowGenerateMenu(!showGenerateMenu)}
//                   >
//                     Create New Array
//                   </button>
//                 )}
//                 <button
//                   className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-400 hover:scale-101"
//                   onClick={() => {
//                     setIsExpanded(false);
//                     setShowGenerateMenu(false);
//                     play();
//                   }}
//                 >
//                   Start Searching
//                 </button>

//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-sm">Array Size:</span>
//                     <input
//                       type="text"
//                       value={sizeInput}
//                       onChange={handleSizeInputChange}
//                       onBlur={handleSizeInputBlur}
//                       className="w-16 text-right bg-transparent outline-none"
//                     />
//                   </div>
//                   <input
//                     type="range"
//                     min="5"
//                     max="20"
//                     value={size}
//                     onChange={(e) => {
//                       isSliderChange.current = true;
//                       const newSize = parseInt(e.target.value);
//                       setSize(newSize);
//                       setSizeInput(newSize.toString());
//                     }}
//                     className="w-full"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-sm">Animation Speed:</span>
//                     <input
//                       type="text"
//                       value={speedInput}
//                       onChange={handleSpeedInputChange}
//                       onBlur={handleSpeedInputBlur}
//                       className="w-16 text-right bg-transparent outline-none"
//                     />
//                   </div>
//                   <input
//                     type="range"
//                     min="1"
//                     max="10"
//                     value={speed}
//                     onChange={(e) => {
//                       const newSpeed = parseInt(e.target.value);
//                       setSpeed(newSpeed);
//                       setSpeedInput(newSpeed.toString());
//                     }}
//                     className="w-full"
//                   />
//                 </div>

//                 {/* Target Number Control */}
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-sm">Target Number:</span>
//                     <input
//                       type="text"
//                       value={targetInput}
//                       onChange={handleTargetInputChange}
//                       onBlur={handleTargetInputBlur}
//                       className="w-16 text-right bg-transparent outline-none"
//                     />
//                   </div>
//                   <button
//                     className="w-full py-2 bg-violet-500 text-white rounded hover:bg-violet-600"
//                     onClick={() => setRandomTarget(array)}
//                   >
//                     Randomize Target
//                   </button>
//                 </div>

//                 {array.length > 0 && (
//                   <div
//                     className={`mt-4 p-2 rounded-xl shadow-lg ${
//                       !isDarkMode ? "bg-zinc-100" : "bg-zinc-500"
//                     }`}
//                   >
//                     <div className="text-sm font-medium mb-1">
//                       Current Array:
//                     </div>
//                     <div className="text-sm overflow-x-auto">
//                       {array.join(", ")}
//                     </div>
//                   </div>
//                 )}
//               </motion.div>
//             )}
//           </div>
//         </motion.div>

//         {/* Generate Menu - Now appears on the right */}
//         {showGenerateMenu && (
//           <GenerateArrayMenu
//             setShowGenerateMenu={setShowGenerateMenu}
//             setIsExpanded={setIsExpanded}
//           />
//         )}
//       </div>
//     </>
//   );
// };

// export default SearchLeftPanel;

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

  // State for input fields to avoid controlled/uncontrolled switches
  const [sizeInput, setSizeInput] = useState(size.toString());
  const [speedInput, setSpeedInput] = useState(speed.toString());
  const [targetInput, setTargetInput] = useState(target.toString());

  // Generate new array based on current algorithm
  const generateNewArray = () => {
    const min = -100;
    const max = 100;
    let newArray = [];

    if (currentAlgorithm === "binary") {
      // Create a sorted array for binary search
      // First generate random numbers
      newArray = Array.from(
        { length: size },
        () => Math.floor(Math.random() * (max - min + 1)) + min
      );
      // Then sort them
      newArray.sort((a, b) => a - b);
    } else {
      // Create a random unsorted array for linear search
      newArray = Array.from(
        { length: size },
        () => Math.floor(Math.random() * (max - min + 1)) + min
      );
    }

    setArray(newArray);
    setRandomTarget(newArray);
    return newArray;
  };

  // Regenerate array when size changes
  useEffect(() => {
    if (isSliderChange.current) {
      generateNewArray();
      isSliderChange.current = false;
    }
  }, [size, currentAlgorithm]);

  // Regenerate array when algorithm changes
  useEffect(() => {
    generateNewArray();
  }, [currentAlgorithm]);

  // Update input states when context values change
  useEffect(() => {
    setSizeInput(size.toString());
  }, [size]);

  useEffect(() => {
    setSpeedInput(speed.toString());
  }, [speed]);

  useEffect(() => {
    setTargetInput(target.toString());
  }, [target]);

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
    if (arr && arr.length > 0) {
      const randomValue = arr[Math.floor(Math.random() * arr.length)];
      // Clamp the target within the range -1000 to 1000
      setTarget(randomValue);
    }
  };

  // Handle size input change
  const handleSizeInputChange = (e) => {
    const value = e.target.value;
    setSizeInput(value);

    if (value === "") {
      // Don't update the actual size yet
    } else {
      const numValue = parseInt(value, 10);
      if (!isNaN(numValue)) {
        const clampedValue = Math.max(5, Math.min(numValue, 20));
        isSliderChange.current = true;
        setSize(clampedValue);
      }
    }
  };

  // Handle size input blur
  const handleSizeInputBlur = () => {
    if (sizeInput === "" || isNaN(parseInt(sizeInput, 10))) {
      setSizeInput(size.toString());
    } else {
      const numValue = parseInt(sizeInput, 10);
      const clampedValue = Math.max(5, Math.min(numValue, 20));
      if (clampedValue !== size) {
        isSliderChange.current = true;
        setSize(clampedValue);
      }
      setSizeInput(clampedValue.toString());
    }
  };

  // Handle speed input change
  const handleSpeedInputChange = (e) => {
    const value = e.target.value;
    setSpeedInput(value);

    if (value === "") {
      // Don't update the actual speed yet
    } else {
      const numValue = parseInt(value, 10);
      if (!isNaN(numValue)) {
        const clampedValue = Math.max(1, Math.min(numValue, 10));
        setSpeed(clampedValue);
      }
    }
  };

  // Handle speed input blur
  const handleSpeedInputBlur = () => {
    if (speedInput === "" || isNaN(parseInt(speedInput, 10))) {
      setSpeedInput(speed.toString());
    } else {
      const numValue = parseInt(speedInput, 10);
      const clampedValue = Math.max(1, Math.min(numValue, 10));
      setSpeed(clampedValue);
      setSpeedInput(clampedValue.toString());
    }
  };

  // Handle target input change
  const handleTargetInputChange = (e) => {
    const value = e.target.value;
    setTargetInput(value);

    if (value === "") {
      // Don't update the actual target yet
    } else {
      const numValue = parseInt(value, 10);
      if (!isNaN(numValue)) {
        const clampedValue = Math.max(-1000, Math.min(numValue, 1000));
        setTarget(clampedValue);
      }
    }
  };

  // Handle target input blur
  const handleTargetInputBlur = () => {
    if (targetInput === "" || isNaN(parseInt(targetInput, 10))) {
      setTargetInput(target.toString());
    } else {
      const numValue = parseInt(targetInput, 10);
      const clampedValue = Math.max(-1000, Math.min(numValue, 1000));
      setTarget(clampedValue);
      setTargetInput(clampedValue.toString());
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
                <button
                  className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 hover:scale-101"
                  onClick={() => {
                    if (currentAlgorithm === "linear") {
                      setShowGenerateMenu(!showGenerateMenu);
                    } else {
                      generateNewArray();
                    }
                  }}
                >
                  {currentAlgorithm === "binary"
                    ? "Generate New Sorted Array"
                    : "Create New Array"}
                </button>

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
                      type="text"
                      value={sizeInput}
                      onChange={handleSizeInputChange}
                      onBlur={handleSizeInputBlur}
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
                      const newSize = parseInt(e.target.value);
                      setSize(newSize);
                      setSizeInput(newSize.toString());
                    }}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Animation Speed:</span>
                    <input
                      type="text"
                      value={speedInput}
                      onChange={handleSpeedInputChange}
                      onBlur={handleSpeedInputBlur}
                      className="w-16 text-right bg-transparent outline-none"
                    />
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={speed}
                    onChange={(e) => {
                      const newSpeed = parseInt(e.target.value);
                      setSpeed(newSpeed);
                      setSpeedInput(newSpeed.toString());
                    }}
                    className="w-full"
                  />
                </div>

                {/* Target Number Control */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Target Number:</span>
                    <input
                      type="text"
                      value={targetInput}
                      onChange={handleTargetInputChange}
                      onBlur={handleTargetInputBlur}
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
                      Current Array
                      {currentAlgorithm === "binary" ? " (Sorted)" : ""}:
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
