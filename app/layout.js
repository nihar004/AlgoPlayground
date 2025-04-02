import "./globals.css";
import { ThemeProvider } from "@/app/context/ThemeContext";
import { AppProvider } from "@/app/context/AppContext";

export const metadata = {
  title: "AlgoPlayground",
  description:
    "AlgoPlayground: An interactive platform for visualizing and learning data structures and algorithms. Explore sorting, searching, and other algorithms through engaging 2D and 3D visualizations. Features multiple language implementations, customizable inputs, and step-by-step explanations to make DSA learning intuitive and enjoyable.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen transition-colors duration-500 ease-in-out">
        <AppProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
