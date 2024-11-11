// src/components/dashboardHeader.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import MicroVaultLogo from "../assets/MicroVault.png";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import Button from "@mui/material/Button";

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
        <nav className="flex items-center space-x-4 pr-4">
          <Button
            variant="outlined" // Use outlined to have a border similar to the icon
            sx={{
              backgroundImage: 'linear-gradient(109.6deg, rgba(24,138,141,1) 11.2%, rgba(96,221,142,1) 91.1%)',
              color: 'white',
              fontWeight: 'bold', // Make text bold
              textTransform: 'none',
              padding: '8px 16px',
              borderRadius: '0.75rem', // Equivalent to rounded-2xl
              border: '1px solid #D3D3D3', // Set border color to #D3D3D3
              height: '32px', // Set height to match the icon
              '&:hover': {
                opacity: 0.9,
              },
            }}
          >
            Connect wallet
          </Button>
          <IconButton 
            aria-label="settings"
            sx={{
              width: '32px',
              height: '32px',
              borderRadius: '0.75rem', // Equivalent to rounded-2xl
              backgroundColor: 'white',
              border: '1px solid #D3D3D3', // Set border color to #D3D3D3
              padding: '0',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <SettingsIcon fontSize="small" />
          </IconButton>
        </nav>
      </div>
    </header>
  );
};

export default DashboardHeader;