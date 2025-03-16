"use client";

import { useTheme } from "../../context/ThemeContext";
import Image from "next/image";
import DarkModeToggle from "./DarkModeToggle";
import { useAppContext } from "../../context/AppContext";
import { algorithms } from "@/app/algorithms/registry/algo.js";

const Header = () => {
  const { isDarkMode } = useTheme();
  const { currentCategory } = useAppContext();
  const algoNames = Object.values(algorithms[currentCategory]);

  return (
    <>
      {/* Header */}
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
              {/* <img src={logo} alt="logo" className="h-10 w-auto" /> */}
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
                className={`px-3 py-1 outline-none rounded-sm border ${
                  !isDarkMode
                    ? "bg-white border-zinc-200"
                    : "bg-zinc-700 border-zinc-700"
                }`}
              >
                {algoNames.map((algo) => (
                  <option key={algo.id} value={algo.id}>
                    {algo.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <DarkModeToggle />
        </div>
      </nav>
    </>
  );
};

export default Header;
