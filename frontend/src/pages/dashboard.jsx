// src/pages/Dashboard.jsx

import React, { useState } from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
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
    <section className="bg-gray-100 min-h-screen">
      <div className="max-w-[1248px] mx-auto px-4 py-8">
        <div className="flex">
          {/* Left-side menu */}
          <div className="w-[13%] mr-8">
            <DashboardSidebar
              activeComponent={activeComponent}
              setActiveComponent={setActiveComponent}
            />
          </div>

          {/* Right-side content */}
          <div className="w-[87%]">
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;