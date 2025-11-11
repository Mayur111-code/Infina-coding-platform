import React from "react";
import { Menu, Sun, Moon } from "lucide-react";

function Header({ toggleSidebar, isDarkMode, toggleDarkMode }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-white dark:bg-gray-900 px-5 py-3 shadow-sm border-b border-gray-200 dark:border-gray-700">
      {/* Left: Sidebar Toggle (mobile) */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Menu size={22} />
      </button>

      {/* Center: Page Title */}
      <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        Dashboard
      </h1>

      {/* Right: Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
      </button>
    </header>
  );
}

export default Header;
