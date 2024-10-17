import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/placeholder-logo.png" alt="Logo" className="h-8 w-auto" />
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#" className="text-gray-600 hover:text-gray-900">Lend</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900">Borrow</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900">Resources</a></li>
          </ul>
        </nav>
        <div className="flex space-x-4">
          <button className="px-4 py-2 text-gray-600 hover:text-gray-900">Login</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Sign Up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;