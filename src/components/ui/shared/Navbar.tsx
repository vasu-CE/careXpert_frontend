import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo or Title */}
      <div className="text-2xl font-bold text-blue-600">
        CareXpert
      </div>

      {/* Navigation Links (if needed in future) */}
      <div className="space-x-4 hidden md:flex">
        <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
        {/* <Link to="/about" className="text-gray-600 hover:text-blue-600">About</Link> */}
      </div>

      {/* Right Side Buttons */}
      <div className="space-x-4">
        <Link to="/login">
          <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
