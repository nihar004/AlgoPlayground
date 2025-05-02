import { useTheme } from "../context/ThemeContext";
import { useAppContext } from "../context/AppContext";
import Image from "next/image";
import DarkModeToggle from "../Components/common/DarkModeToggle";
import React, { useState, useEffect } from "react";

function Header({ title }) {
  const { isDarkMode } = useTheme();
  const { activeTab, changeTab } = useAppContext();
  const [scrolled, setScrolled] = useState(false);

  const getTabStyles = (tabName) => {
    const isActive = activeTab === tabName;
    return `font-medium text-md relative transition-all duration-200 ${
      isActive
        ? isDarkMode
          ? "text-blue-400 font-extrabold scale-105 text-lg"
          : "text-blue-600 font-extrabold scale-105 text-lg"
        : isDarkMode
          ? "text-zinc-300 hover:text-white"
          : "text-zinc-600 hover:text-zinc-900"
    } ${
      isActive
        ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:transform after:scale-x-100 " +
          (isDarkMode
            ? "after:bg-gradient-to-r after:from-blue-400 after:via-purple-400 after:to-blue-400"
            : "after:bg-gradient-to-r after:from-blue-600 after:via-indigo-500 after:to-blue-600")
        : "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 " +
          (isDarkMode
            ? "after:bg-gradient-to-r after:from-blue-400/50 after:to-purple-400/50"
            : "after:bg-gradient-to-r after:from-blue-600/50 after:to-indigo-600/50")
    }`;
  };

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Check initial scroll position when component mounts
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`py-4 px-6 flex justify-between items-center sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? isDarkMode
              ? "bg-zinc-900/90 backdrop-blur-md"
              : "bg-white/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center space-x-3">
          <a href="#" className="flex items-center group">
            <div
              className={`relative overflow-hidden transition-all duration-300 group-hover:scale-105 p-2`}
            >
              <Image
                src="/logo.png"
                alt="logo"
                width={40}
                height={40}
                className="h-10 w-auto relative z-10"
              />
            </div>
          </a>
          <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
            {title}
          </h1>
        </div>
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex space-x-8 mr-8">
            <a
              href="#"
              className={getTabStyles("Home")}
              onClick={(e) => {
                e.preventDefault();
                changeTab("Home", "/");
              }}
            >
              Home
            </a>

            <a
              href="/category"
              className={getTabStyles("Algorithms")}
              onClick={(e) => {
                e.preventDefault();
                changeTab("Algorithms", "/category");
              }}
            >
              Algorithms
            </a>
            <a
              href="/LearningPath"
              className={getTabStyles("LearningPath")}
              onClick={(e) => {
                e.preventDefault();
                changeTab("LearningPath", "/LearningPath");
              }}
            >
              Learning Path
            </a>
            <a
              href="/AlgoMentor"
              className={getTabStyles("AlgoMentor")}
              onClick={(e) => {
                e.preventDefault();
                changeTab("AlgoMentor", "/AlgoMentor");
              }}
            >
              AlgoMentor
            </a>
            <a
              href="#"
              className={getTabStyles("About Us")}
              onClick={(e) => {
                e.preventDefault();
                changeTab("About Us", "/about");
              }}
            >
              About Us
            </a>
          </nav>
          <DarkModeToggle />
        </div>
      </header>
    </>
  );
}

export default Header;
