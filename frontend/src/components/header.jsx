import React from 'react';
import { Link } from 'react-router-dom';
import MicroVaultLogo from '../assets/MicroVault.png'; 

const Header = () => {
  return (
    <div className="pt-4">
      <header className="bg-transparent my-0 mx-4 md:mx-12 lg:mx-20 relative overflow-visible">
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="max-w-[1248px] w-full mx-auto flex items-center relative z-20">
            {/* Adjusted logo position without padding and tight fit */}
            <div className="flex items-center"> {/* Removed padding */}
              <Link to="/">
                <img 
                  src={MicroVaultLogo} 
                  alt="MicroVault Logo" 
                  className="h-16 w-auto block" // Set display to block for tight fit
                  style={{ margin: 0 }} // Ensure no margin
                />
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
                {/* Login Button with Animated Gradient Text */}
                <Link
                  to="/login"
                  className="relative inline-block px-4 py-2 border border-[#48BF84] rounded-[50px] transition duration-300"
                >
                  <span className="bg-gradient-to-r from-[#38ef7d] to-[#11998e] bg-clip-text text-transparent">
                    Login
                  </span>
                </Link>

                {/* Get Started Button with Animated Gradient */}
                <Link
                  to="/get-started"
                  className="animated-gradient text-white rounded-[50px] px-4 py-2 transition duration-300"
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