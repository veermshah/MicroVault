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
            <nav className="flex items-center space-x-4 ml-auto">
              <Link
                to="/login" // Changed to /login
                className="relative inline-flex items-center justify-center px-4 py-2 border border-[#48BF84] rounded-[50px] transition duration-300"
                style={{ height: '40px' }} // Set a fixed height
              >
                <span className="bg-gradient-to-r from-[#38ef7d] to-[#11998e] bg-clip-text text-transparent">
                  Connect Wallet
                </span>
              </Link>
              <div 
                className="flex items-center justify-center transition-colors duration-200 hover:bg-gray-100"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '2rem',
                  backgroundColor: 'white',
                  border: '1px solid #D1D5DB',
                }}
              >
                <SettingsIcon style={{ fontSize: '20px', color: '#666' }} />
              </div>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default DashboardHeader;