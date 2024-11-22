// src/pages/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import DashboardSidebar from '../components/dashboardSidebar';
import DashboardHome from '../components/dashboardHome';
import Lend from '../components/lend';
import Borrow from '../components/borrow';
import MyWallet from '../components/myWallet';

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('home');

  useEffect(() => {
    console.log('Active component changed to:', activeComponent);
  }, [activeComponent]);

  const renderContent = () => {
    console.log('Rendering content for:', activeComponent);
    switch (activeComponent) {
      case 'home':
        return <DashboardHome />;
      case 'lend':
        return <Lend />;
      case 'borrow':
        return <Borrow />;
      case 'myWallet':
        console.log('Attempting to render MyWallet component');
        return <MyWallet />;
      default:
        console.log('Default case: rendering DashboardHome component');
        return <DashboardHome />;
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1248px] w-full mx-auto pt-[30px]">
        <div className="flex flex-row h-full relative z-10">
          <div className="w-[13%] pr-4">
            <DashboardSidebar
              activeComponent={activeComponent}
              setActiveComponent={setActiveComponent}
            />
          </div>
          <div className="w-[87%]"> 
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;