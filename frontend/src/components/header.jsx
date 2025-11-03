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
  const [mobileOpen, setMobileOpen] = useState(false);

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
            <nav className="ml-auto">
              {/* Desktop nav */}
              <div className="hidden md:flex items-center space-x-6">
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
              </div>

              {/* Mobile nav button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  aria-label="Open menu"
                  className="p-2 rounded-md bg-gray-100"
                >
                  ☰
                </button>
              </div>

              {/* Mobile full-screen split overlay (gradient | white) */}
              {mobileOpen && (
                <div className="md:hidden fixed inset-0 z-50 flex">
                  {/* Backdrop to close when clicking outside main panel */}
                  <button
                    aria-label="Close menu"
                    className="absolute inset-0 bg-black/30"
                    onClick={() => setMobileOpen(false)}
                  />

                  <div className="relative w-full h-full flex">
                    {/* Left: gradient half */}
                    <div className="w-1/2 min-w-[200px] bg-gradient-to-br from-[#38ef7d] to-[#11998e] text-white p-6 flex flex-col items-center justify-center">
                      <img src={MicroVaultLogo} alt="MicroVault" className="h-14 mb-4" />
                      <h3 className="text-xl font-bold mb-2">Welcome to MicroVault</h3>
                      <p className="text-sm mb-6 text-white/90 text-center">Borrow against your crypto without selling — quick and secure.</p>
                      <div className="flex flex-col space-y-3 w-full max-w-xs">
                        <Link
                          to="/get-started"
                          onClick={() => setMobileOpen(false)}
                          className="text-center animated-gradient px-4 py-3 rounded-full text-white font-semibold"
                        >
                          Get Started
                        </Link>
                        <Link
                          to="/login"
                          onClick={() => setMobileOpen(false)}
                          className="text-center bg-white text-[#11998e] px-4 py-3 rounded-full font-semibold"
                        >
                          Login
                        </Link>
                      </div>
                    </div>

                    {/* Right: white half with links */}
                    <div className="w-1/2 min-w-[200px] bg-white p-6 overflow-auto">
                      <div className="flex justify-end">
                        <button onClick={() => setMobileOpen(false)} aria-label="Close" className="p-2 rounded-md text-gray-600">✕</button>
                      </div>
                      <nav className="mt-6">
                        <ul className="space-y-4 text-lg">
                          <li>
                            <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="text-gray-800">Dashboard</Link>
                          </li>
                          <li>
                            <Link to="/faq" onClick={() => setMobileOpen(false)} className="text-gray-800">FAQ</Link>
                          </li>
                          <li>
                            <Link to="/smart-contracts" onClick={() => setMobileOpen(false)} className="text-gray-800">Smart Contracts</Link>
                          </li>
                          <li>
                            <Link to="/get-started" onClick={() => setMobileOpen(false)} className="text-gray-800">Get Started</Link>
                          </li>
                          <li>
                            <Link to="/login" onClick={() => setMobileOpen(false)} className="text-gray-800">Login</Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;