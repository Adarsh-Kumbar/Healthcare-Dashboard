import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`bg-gradient-to-b from-white to-gray-100 h-full shadow-lg transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Header with Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-gray-300">
        <button onClick={() => setIsOpen(!isOpen)}>
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
        {isOpen && (
          <span className="font-bold text-gray-800 text-lg">Menu</span>
        )}
      </div>

      {/* Navigation */}
      <ul className="p-4 space-y-4 text-sm font-medium text-gray-700">
        <li>
          <Link
            to="/"
            className="flex items-center space-x-2 hover:text-blue-600 transition-colors duration-200"
          >
            <span>🏠</span>
            {isOpen && <span>Home</span>}
          </Link>
        </li>

        {isOpen && (
          <li className="text-xs uppercase text-gray-400 tracking-widest mt-4">
            Graphs
          </li>
        )}

        <ul className={`ml-2 space-y-3 ${!isOpen && "hidden"}`}>
          <li>
            <Link
              to="/pie-chart"
              className="flex items-center space-x-2 hover:text-blue-600 transition-colors duration-200"
            >
              <span>🥧</span>
              <span>Pie Chart</span>
            </Link>
          </li>
          <li>
            <Link
              to="/tree-graph"
              className="flex items-center space-x-2 hover:text-blue-600 transition-colors duration-200"
            >
              <span>🌳</span>
              <span>Tree Graph</span>
            </Link>
          </li>
        </ul>
      </ul>
    </div>
  );
};

export default Sidebar;
