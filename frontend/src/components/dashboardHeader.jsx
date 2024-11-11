// src/components/dashboardHeader.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import MicroVaultLogo from '../assets/MicroVault.png';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';

const DashboardHeader = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="w-full flex items-center justify-between relative z-20">
        <div className="flex items-center">
          <Link to="/">
            <img 
              src={MicroVaultLogo} 
              alt="MicroVault Logo" 
              className="h-16 w-auto block" // Logo height: 64px
            />
          </Link>
        </div>
        <nav className="flex items-center pr-4">
          <IconButton 
            aria-label="settings"
            sx={{
              width: '32px', // Set width to 32px
              height: '32px', // Set height to 32px
              borderRadius: '0.75rem', // Equivalent to rounded-2xl
              backgroundColor: 'white', // Background color
              border: '1px solid rgba(156, 163, 175, 1)', // Gray border
              padding: '0', // Remove default padding
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)', // Light hover effect
              },
            }}
          >
            <SettingsIcon fontSize="small" /> {/* Use small size for the icon */}
          </IconButton>
        </nav>
      </div>
    </header>
  );
};

export default DashboardHeader;