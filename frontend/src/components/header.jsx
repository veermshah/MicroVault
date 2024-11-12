import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import MicroVaultLogo from '../assets/MicroVault.png';

// Custom hook for Intersection Observer
const useIntersectionObserver = (options) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isVisible];
};

const Header = () => {
  const [headerRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
  });

  return (
    <div className="pt-4" ref={headerRef}>
      <header 
        className={`bg-transparent my-0 mx-4 md:mx-12 lg:mx-20 relative overflow-visible transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="max-w-[1248px] w-full mx-auto flex items-center relative z-20">
            <div className="flex items-center">
              <Link to="/">
                <img 
                  src={MicroVaultLogo} 
                  alt="MicroVault Logo" 
                  className="h-16 w-auto block"
                  style={{ margin: 0 }}
                />
              </Link>
            </div>
            <nav className="flex items-center space-x-6 ml-auto">
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
                  className="relative inline-block px-4 py-2 border border-[#48BF84] rounded-[50px] transition duration-300"
                >
                  <span className="bg-gradient-to-r from-[#38ef7d] to-[#11998e] bg-clip-text text-transparent">
                    Login
                  </span>
                </Link>
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