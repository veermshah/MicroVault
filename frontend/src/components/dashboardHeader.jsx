import React from 'react';
import { Link } from 'react-router-dom';
import MicroVaultLogo from "../assets/MicroVault.png";
import SettingsIcon from "@mui/icons-material/Settings";

// Custom hook for Intersection Observer
const useIntersectionObserver = (options) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
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

const DashboardHeader = () => {
  const [headerRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown if clicked outside or scrolled
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownOpen &&
        !event.target.closest('.settings-dropdown') &&
        !event.target.closest('.settings-icon')
      ) {
        setDropdownOpen(false);
      }
    };

    const handleScroll = () => {
      if (dropdownOpen) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dropdownOpen]);

  return (
    <div className="pt-4" ref={headerRef}>
      <header
        className={`bg-white my-0 mx-4 md:mx-12 lg:mx-20 relative transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ zIndex: 100 }} // Ensure header is above other content
      >
        <div className="max-w-[1248px] w-full mx-auto flex items-center relative">
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
          <nav className="flex items-center space-x-4 ml-auto relative">
            <Link
              to="/login"
              className="relative inline-flex items-center justify-center px-4 py-2 border border-[#48BF84] rounded-[50px] transition duration-300"
              style={{ height: '40px' }}
            >
              <span className="bg-gradient-to-r from-[#38ef7d] to-[#11998e] bg-clip-text text-transparent">
                Connect Wallet
              </span>
            </Link>
            <div
              className="relative flex items-center justify-center transition-colors duration-200 hover:bg-gray-100 cursor-pointer settings-icon"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '2rem',
                backgroundColor: 'white',
                border: '1px solid #D1D5DB',
              }}
              onClick={toggleDropdown}
            >
              <SettingsIcon style={{ fontSize: '20px', color: '#666' }} />
              {dropdownOpen && (
                <div
                  className="absolute mt-2 bg-white rounded-lg border border-gray-300 z-50 settings-dropdown"
                  style={{
                    top: '100%',
                    right: '0', // Aligns dropdown with the right edge of the settings icon
                    minWidth: '160px',
                    boxShadow: 'none', // Remove shadow
                  }}
                >
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/get-started" // Link to the Help page
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Help
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default DashboardHeader;