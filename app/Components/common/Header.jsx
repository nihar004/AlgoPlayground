"use client";

import { useTheme } from "../../context/ThemeContext";
import Image from "next/image";
import DarkModeToggle from "./DarkModeToggle";
import { useAppContext } from "../../context/AppContext";
import { algorithms } from "@/app/algorithms/registry/algo.js";
import LayoutSelector from "./LayoutSelector";

const Header = () => {
  const { isDarkMode } = useTheme();
  const { currentCategory, currentAlgorithm, changeAlgorithm, changeTab } =
    useAppContext();
  const algoNames = Object.values(algorithms[currentCategory]);

  const handleAlgorithmChange = (event) => {
    const selectedAlgoId = event.target.value;
    changeAlgorithm(selectedAlgoId);
  };

  return (
    <>
      <nav
        className={`border-b p-4 shadow-sm ${
          !isDarkMode
            ? "border-zinc-100 shadow-zinc-200/50"
            : "border-zinc-700 shadow-zinc-600/20"
        }`}
      >
        <div className="w-full px-1 mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center">
              <Image
                src="/logo.png"
                alt="logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
            </a>
            <h1 className="text-2xl font-bold">{currentCategory}</h1>
            {algoNames.length > 0 && (
              <select
                value={currentAlgorithm}
                className={`px-3 py-1 outline-none rounded-sm border ${
                  !isDarkMode
                    ? "bg-white border-zinc-200"
                    : "bg-zinc-700 border-zinc-700"
                }`}
                onChange={handleAlgorithmChange}
              >
                {algoNames.map((algo) => (
                  <option key={algo.id} value={algo.id}>
                    {algo.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="flex items-center space-x-6">
            <nav className="space-x-8 mr-8 flex items-center justify-center">
              <a
                href="/category"
                className={`
                  font-medium text-lg relative transition-all duration-200
                  ${
                    isDarkMode
                      ? "text-zinc-300 hover:text-white"
                      : "text-zinc-600 hover:text-zinc-900"
                  }
                  hover:scale-107
                `}
                onClick={(e) => {
                  e.preventDefault();
                  changeTab("Algorithms", "/category");
                }}
              >
                Algorithms
              </a>
              <LayoutSelector />
            </nav>
            <DarkModeToggle />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
