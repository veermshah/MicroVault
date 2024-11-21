// src/pages/Dashboard.jsx

import React, { useState } from 'react';
import DashboardSidebar from '../components/dashboardSidebar';
import Trading from '../components/trading';
import Lend from '../components/lend';
import Borrow from '../components/borrow';
import MyWallet from '../components/myWallet';

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('trading');

  const renderContent = () => {
    switch (activeComponent) {
      case 'trading':
        return <Trading />;
      case 'lend':
        return <Lend />;
      case 'borrow':
        return <Borrow />;
      case 'myWallet':
        return <MyWallet />;
      default:
        return <Trading />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-[1248px] w-full mx-auto pt-[30px]">
        <div className="flex flex-row h-full relative z-10">
          <div className="w-[13%] pr-4"> {/* Added right padding to sidebar */}
            <DashboardSidebar
              activeComponent={activeComponent}
              setActiveComponent={setActiveComponent}
            />
          </div>
          <div className="w-[87%]"> 
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;