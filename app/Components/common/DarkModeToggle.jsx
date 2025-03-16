import React from "react";
import { motion } from "framer-motion";
import { Sun, MoonStar } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const DarkModeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <>
      <motion.button
        initial={false}
        onClick={toggleTheme}
        className={`w-25 h-10 rounded-full flex items-center relative bg-cover bg-right`}
        animate={{
          backgroundImage: !isDarkMode
            ? "url('/cloud.png')"
            : "url('/night.webp')",
          backgroundColor: !isDarkMode ? "#E4E4E7" : "#3F3F47",
        }}
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.02 }}
      >
        <motion.div
          initial={false}
          className="h-9 w-9 rounded-full bg-white absolute shadow-md "
          animate={{
            right: isDarkMode ? "0.25rem" : "auto",
            left: isDarkMode ? "auto" : "0.25rem",
            backgroundColor: !isDarkMode ? "#ffffff" : "#27272A",
            boxShadow: isDarkMode
              ? "0 0 3px 1.5px rgba(229, 231, 235, 0.3)" // Moon glow
              : "",
          }}
        >
          {/* The Sun icon for day mode */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-zinc-900"
            animate={{ opacity: isDarkMode ? 0 : 1 }}
          >
            <Sun className="w-5 h-5"></Sun>
          </motion.div>

          {/* The Moon icon for night mode */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-zinc-50"
            animate={{ opacity: isDarkMode ? 1 : 0 }}
          >
            <MoonStar className="w-5 h-5 "></MoonStar>
          </motion.div>
        </motion.div>
      </motion.button>
    </>
  );
};

export default DarkModeToggle;
