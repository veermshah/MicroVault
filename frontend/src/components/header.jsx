import React from 'react';
import { Link } from 'react-router-dom';
import MicroVaultLogo from '../assets/MicroVault.png'; 

const Header = () => {
  return (
    <div className="pt-4">
      <header className="bg-transparent my-0 mx-4 md:mx-12 lg:mx-20 relative overflow-visible">
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="max-w-[1248px] w-full mx-auto flex items-center relative z-20">
            {/* Adjusted logo position */}
            <div className="flex items-center pr-6"> {/* Padding on right for spacing */}
              <Link to="/">
                <img src={MicroVaultLogo} alt="MicroVault Logo" className="h-16 w-auto" />
              </Link>
            </div>
            <nav className="flex items-center space-x-6 ml-auto"> {/* Added ml-auto to push nav to the right */}
              <ul className="flex space-x-6">
                <li>
                  <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
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
                  className="px-4 py-2 text-[#48BF84] border border-[#48BF84] rounded-[50px] hover:bg-[#48BF84] hover:text-white transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/getstarted"
                  className="px-4 py-2 bg-[#48BF84] text-white rounded-[50px] hover:bg-[#3da46f] transition duration-300"
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;