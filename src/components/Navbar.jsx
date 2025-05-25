import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-100 shadow-md">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <div className="space-x-6">
        <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
          Home
        </Link>
        <Link
          to="/contact"
          className="text-gray-700 hover:text-blue-600 font-medium"
        >
          Contact
        </Link>
        <Link
          to="/login"
          className="text-gray-700 hover:text-blue-600 font-medium"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
