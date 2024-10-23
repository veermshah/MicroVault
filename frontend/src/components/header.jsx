import React from 'react';
import { Link } from 'react-router-dom';
import MicroVaultLogo from '../assets/MicroVault.png'; 

const Header = () => {
  return (
    <header className="bg-transparent my-8 mx-4 md:mx-12 lg:mx-20 relative overflow-visible">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between relative z-20">
        <div className="flex items-center">
          <Link to="/">
            <img src={MicroVaultLogo} alt="MicroVault Logo" className="h-16 w-auto" />
          </Link>
        </div>
        <nav className="flex items-center space-x-6">
          <ul className="flex space-x-6">
            <li><Link to="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link></li>
            <li><Link to="/faq" className="text-gray-600 hover:text-gray-900">FAQ</Link></li>
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