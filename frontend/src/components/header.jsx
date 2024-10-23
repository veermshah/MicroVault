// src/components/header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-transparent relative">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between relative z-20">
        <div className="flex items-center">
          <img src="/Image 1.png" alt="Logo" className="h-8 w-auto" />
        </div>
        <nav className="flex items-center space-x-6">
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-gray-900"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-gray-600 hover:text-gray-900">
                FAQ
              </Link>
            </li>
          </ul>
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;