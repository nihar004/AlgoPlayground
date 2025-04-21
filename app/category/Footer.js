import { useTheme } from "../context/ThemeContext";
import { Linkedin } from "lucide-react";
import Image from "next/image";

function Footer() {
  const { isDarkMode } = useTheme();

  return (
    <>
      {/* Enhanced footer with gradients and better organization */}
      <footer
        className={`py-16 ${
          isDarkMode
            ? "bg-gradient-to-br from-zinc-900 to-zinc-800 text-zinc-300"
            : "bg-gradient-to-br from-zinc-100 to-blue-50 text-zinc-700"
        }`}
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={40}
                  height={40}
                  className="h-9 w-auto relative z-10"
                />
                <h3 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
                  AlgoPlayground
                </h3>
              </div>
              <p
                className={`text-sm mb-6 ${
                  isDarkMode ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                Interactive algorithm visualization platform for students,
                developers, and educators.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/nihar004"
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isDarkMode
                      ? "bg-zinc-800 hover:bg-zinc-700"
                      : "bg-white hover:bg-zinc-100"
                  } ${
                    isDarkMode ? "text-zinc-300" : "text-zinc-700"
                  } transition-colors`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://x.com/Nihar_Lemon"
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isDarkMode
                      ? "bg-zinc-800 hover:bg-zinc-700"
                      : "bg-white hover:bg-zinc-100"
                  } ${
                    isDarkMode ? "text-zinc-300" : "text-zinc-700"
                  } transition-colors`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/nihar-singla001/"
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isDarkMode
                      ? "bg-zinc-800 hover:bg-zinc-700"
                      : "bg-white hover:bg-zinc-100"
                  } ${
                    isDarkMode ? "text-zinc-300" : "text-zinc-700"
                  } transition-colors`}
                >
                  <Linkedin width="16" height="16" />
                </a>
              </div>
            </div>

            <div>
              <h4
                className={`font-semibold mb-6 ${
                  isDarkMode ? "text-white" : "text-zinc-800"
                }`}
              >
                Algorithm Categories
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className={`text-sm hover:underline ${
                      isDarkMode
                        ? "text-zinc-400 hover:text-blue-400"
                        : "text-zinc-600 hover:text-blue-600"
                    } transition-colors`}
                  >
                    Sorting Algorithms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`text-sm hover:underline ${
                      isDarkMode
                        ? "text-zinc-400 hover:text-blue-400"
                        : "text-zinc-600 hover:text-blue-600"
                    } transition-colors`}
                  >
                    Graph Algorithms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`text-sm hover:underline ${
                      isDarkMode
                        ? "text-zinc-400 hover:text-blue-400"
                        : "text-zinc-600 hover:text-blue-600"
                    } transition-colors`}
                  >
                    Search Algorithms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`text-sm hover:underline ${
                      isDarkMode
                        ? "text-zinc-400 hover:text-blue-400"
                        : "text-zinc-600 hover:text-blue-600"
                    } transition-colors`}
                  >
                    Dynamic Programming
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`text-sm hover:underline ${
                      isDarkMode
                        ? "text-zinc-400 hover:text-blue-400"
                        : "text-zinc-600 hover:text-blue-600"
                    } transition-colors`}
                  >
                    Greedy Algorithms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`text-sm hover:underline ${
                      isDarkMode
                        ? "text-zinc-400 hover:text-blue-400"
                        : "text-zinc-600 hover:text-blue-600"
                    } transition-colors`}
                  >
                    Data Structures
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4
                className={`font-semibold mb-6 ${
                  isDarkMode ? "text-white" : "text-zinc-800"
                }`}
              >
                Learning Resources
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className={`text-sm hover:underline ${
                      isDarkMode
                        ? "text-zinc-400 hover:text-blue-400"
                        : "text-zinc-600 hover:text-blue-600"
                    } transition-colors`}
                  >
                    Learning Paths
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`text-sm hover:underline ${
                      isDarkMode
                        ? "text-zinc-400 hover:text-blue-400"
                        : "text-zinc-600 hover:text-blue-600"
                    } transition-colors`}
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`text-sm hover:underline ${
                      isDarkMode
                        ? "text-zinc-400 hover:text-blue-400"
                        : "text-zinc-600 hover:text-blue-600"
                    } transition-colors`}
                  >
                    API Reference
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`text-sm hover:underline ${
                      isDarkMode
                        ? "text-zinc-400 hover:text-blue-400"
                        : "text-zinc-600 hover:text-blue-600"
                    } transition-colors`}
                  >
                    Video Tutorials
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`text-sm hover:underline ${
                      isDarkMode
                        ? "text-zinc-400 hover:text-blue-400"
                        : "text-zinc-600 hover:text-blue-600"
                    } transition-colors`}
                  >
                    Blog &amp; Articles
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`text-sm hover:underline ${
                      isDarkMode
                        ? "text-zinc-400 hover:text-blue-400"
                        : "text-zinc-600 hover:text-blue-600"
                    } transition-colors`}
                  >
                    Cheat Sheets
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4
                className={`font-semibold mb-6 ${
                  isDarkMode ? "text-white" : "text-zinc-800"
                }`}
              >
                About & Support
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className={`text-sm hover:underline ${
                      isDarkMode
                        ? "text-zinc-400 hover:text-blue-400"
                        : "text-zinc-600 hover:text-blue-600"
                    } transition-colors`}
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`text-sm hover:underline ${
                      isDarkMode
                        ? "text-zinc-400 hover:text-blue-400"
                        : "text-zinc-600 hover:text-blue-600"
                    } transition-colors`}
                  >
                    Our Team
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`text-sm hover:underline ${
                      isDarkMode
                        ? "text-zinc-400 hover:text-blue-400"
                        : "text-zinc-600 hover:text-blue-600"
                    } transition-colors`}
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`text-sm hover:underline ${
                      isDarkMode
                        ? "text-zinc-400 hover:text-blue-400"
                        : "text-zinc-600 hover:text-blue-600"
                    } transition-colors`}
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`text-sm hover:underline ${
                      isDarkMode
                        ? "text-zinc-400 hover:text-blue-400"
                        : "text-zinc-600 hover:text-blue-600"
                    } transition-colors`}
                  >
                    Feedback
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={`text-sm hover:underline ${
                      isDarkMode
                        ? "text-zinc-400 hover:text-blue-400"
                        : "text-zinc-600 hover:text-blue-600"
                    } transition-colors`}
                  >
                    Report a Bug
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            className={`pt-8 border-t ${
              isDarkMode ? "border-zinc-700" : "border-zinc-300"
            } flex flex-col md:flex-row justify-between items-center`}
          >
            <p
              className={`text-sm mb-4 md:mb-0 ${
                isDarkMode ? "text-zinc-500" : "text-zinc-500"
              }`}
            >
              © 2025 AlgoPlayground. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className={`text-sm hover:underline ${
                  isDarkMode
                    ? "text-zinc-500 hover:text-zinc-400"
                    : "text-zinc-500 hover:text-zinc-700"
                } transition-colors`}
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className={`text-sm hover:underline ${
                  isDarkMode
                    ? "text-zinc-500 hover:text-zinc-400"
                    : "text-zinc-500 hover:text-zinc-700"
                } transition-colors`}
              >
                Terms of Service
              </a>
              <a
                href="#"
                className={`text-sm hover:underline ${
                  isDarkMode
                    ? "text-zinc-500 hover:text-zinc-400"
                    : "text-zinc-500 hover:text-zinc-700"
                } transition-colors`}
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
