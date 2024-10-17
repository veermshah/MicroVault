import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/placeholder-logo.png" alt="Logo" className="h-8 w-auto" />
        </div>
        <nav className="flex items-center space-x-6">
          <ul className="flex space-x-6">
            <li><a href="#" className="text-gray-600 hover:text-gray-900">Lend</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900">Borrow</a></li>
            <li><a href="#" className="text-gray-600 hover:text-gray-900">Resources</a></li>
          </ul>
          <div className="flex space-x-4">
            <button className="px-4 py-2 text-[#48BF84] border border-[#48BF84] rounded hover:bg-[#48BF84] hover:text-white transition duration-300">Login</button>
            <button className="px-4 py-2 bg-[#48BF84] text-white rounded hover:bg-[#3da46f] transition duration-300">Sign Up</button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;